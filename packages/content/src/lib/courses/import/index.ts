import matter from 'gray-matter';
import type { Token } from 'marked';
import { marked } from 'marked';

import { firstRow, sql } from '@sovereign-university/database';
import type {
  ChangedFile,
  Course,
  ModifiedFile,
  RenamedFile,
} from '@sovereign-university/types';

import type { Language } from '../../const.js';
import type { Dependencies } from '../../dependencies.js';
import type { ChangedContent } from '../../types.js';
import {
  convertStringToTimestamp,
  getContentType,
  getRelativePath,
  separateContentFiles,
  yamlToObject,
} from '../../utils.js';

interface CourseDetails {
  id: string;
  path: string;
  language?: Language;
}

export interface ChangedCourse extends ChangedContent {
  id: string;
}

/**
 * Parse course details from path
 *
 * @param path - Path of the file
 * @returns Resource details
 */
const parseDetailsFromPath = (path: string): CourseDetails => {
  const pathElements = path.split('/');

  // Validate that the path has at least 3 elements (courses/name)
  if (pathElements.length < 2) throw new Error('Invalid resource path');

  return {
    id: pathElements[1],
    path: pathElements.slice(0, 2).join('/'),
    language: pathElements[2].replace(/\..*/, '') as Language,
  };
};

export const groupByCourse = (files: ChangedFile[], errors: string[]) => {
  const coursesFiles = files.filter(
    (item) => getContentType(item.path) === 'courses',
  );

  const groupedCourses = new Map<string, ChangedCourse>();

  for (const file of coursesFiles) {
    try {
      const {
        id,
        path: coursePath,
        language,
      } = parseDetailsFromPath(file.path);

      const course: ChangedCourse = groupedCourses.get(coursePath) || {
        type: 'courses',
        id,
        path: coursePath,
        files: [],
      };

      course.files.push({
        ...file,
        path: getRelativePath(file.path, coursePath),
        language,
      });

      groupedCourses.set(coursePath, course);
    } catch {
      errors.push(`Unsupported path ${file.path}, skipping file...`);
    }
  }

  return [...groupedCourses.values()];
};

interface CourseMain {
  level: string;
  hours: number;
  professors: string[];
  tags?: string[];
  requires_payment: boolean;
  paid_price_euros?: number;
  paid_description?: string;
  paid_video_link?: string;
  paid_start_date?: string;
  paid_end_date?: string;
}

interface CourseLocalized {
  name: string;
  goal: string;
  objectives?: string[];
}

interface Part {
  title: string;
  chapters: Chapter[];
}

interface Chapter {
  title: string;
  sections: string[];
  raw_content: string;
  professors: string[];
  releaseDate: string | null;
  releasePlace: string | null;
}

const extractData = (token: Token, type: string) => {
  if (token.type === 'paragraph' && token.tokens) {
    for (const [index, t] of token.tokens.entries()) {
      if (
        t.raw === `<${type}>` &&
        token.tokens.at(index + 2)?.raw === `</${type}>`
      ) {
        const res = token.tokens.at(index + 1)?.raw;
        if (res) {
          return res;
        }
      }
    }
  }

  return null;
};

const extractParts = (markdown: string): Part[] => {
  const tokens = marked.lexer(markdown);
  const parts: Part[] = [];

  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      parts.push({
        title: token.text as string,
        chapters: [],
      });
    } else if (parts.length > 0) {
      const currentPart = parts.at(-1)!;

      if (token.type === 'heading' && token.depth === 2) {
        currentPart.chapters.push({
          title: token.text as string,
          sections: [],
          raw_content: '',
          professors: [],
          releaseDate: '',
          releasePlace: '',
        });
      } else if (currentPart.chapters.length > 0) {
        const currentChapter = currentPart.chapters.at(-1)!;

        if (token.type === 'heading' && token.depth === 3) {
          currentChapter.sections.push(token.text as string);
        }

        if (token.raw.startsWith('<')) {
          currentChapter.releaseDate = extractData(token, 'releaseDate');
          currentChapter.releasePlace = extractData(token, 'releasePlace');

          const professor = extractData(token, 'professor');
          if (professor) {
            currentChapter.professors.push(professor);
          }

          const regex =
            /<professor>.*<\/professor>|<releaseDate>.*<\/releaseDate>|<releasePlace>.*<\/releasePlace>/gm;
          token.raw = token.raw.replaceAll(regex, '');
        }

        currentChapter.raw_content += token.raw;
      }
    }
  }

  return parts;
};

export const createProcessChangedCourse =
  (dependencies: Dependencies, errors: string[]) =>
  async (course: ChangedCourse) => {
    const { postgres } = dependencies;

    const { main, files } = separateContentFiles(course, 'course.yml');

    return postgres
      .begin(async (transaction) => {
        try {
          if (main) {
            if (main.kind === 'removed') {
              // If course file was removed, delete the main course and all its translations (with cascade)
              await transaction`DELETE FROM content.courses WHERE id = ${course.id}`;
              return;
            }

            if (main.kind === 'renamed') {
              // If course file was moved, update the id
              await transaction`
                UPDATE content.courses
                SET id = ${course.id}
                WHERE id = ${main.previousPath.split('/')[1]}
              `;
            }

            if (
              main.kind === 'added' ||
              main.kind === 'modified' ||
              main.kind === 'renamed'
            ) {
              // If new or updated resource file, insert or update resource

              //Remove all translations, chapters and parts, reinsert them just after
              await transaction`
                DELETE FROM content.courses_localized
                WHERE course_id = ${course.id}
              `;

              await transaction`
                DELETE FROM content.course_chapters
                WHERE course_id = ${course.id}
              `;

              await transaction`
                DELETE FROM content.course_parts
                WHERE course_id = ${course.id}
              `;

              await transaction`
                DELETE FROM content.course_chapters_localized
                WHERE course_id = ${course.id}
              `;

              await transaction`
                DELETE FROM content.course_parts_localized
                WHERE course_id = ${course.id}
              `;

              // Only get the tags from the main resource file
              const parsedCourse = yamlToObject<CourseMain>(main.data);
              if (parsedCourse.requires_payment === null) {
                parsedCourse.requires_payment = false;
              }

              const startDateTimestamp = convertStringToTimestamp(
                parsedCourse.paid_start_date
                  ? parsedCourse.paid_start_date.toString()
                  : '20220101',
              );
              if (parsedCourse.requires_payment) {
                console.log('startDateTimestamp', startDateTimestamp);
              }
              const endDateTimestamp = convertStringToTimestamp(
                parsedCourse.paid_end_date
                  ? parsedCourse.paid_end_date.toString()
                  : '20220101',
              );

              const lastUpdated = course.files
                .filter(
                  (file): file is ModifiedFile | RenamedFile =>
                    file.kind !== 'removed',
                )
                .sort((a, b) => b.time - a.time)[0];

              const result = await transaction<Course[]>`
                INSERT INTO content.courses (id, level, hours, requires_payment, paid_price_euros,
                  paid_description, paid_video_link, paid_start_date, paid_end_date,
                  last_updated, last_commit, last_sync)
                VALUES (
                  ${course.id}, 
                  ${parsedCourse.level},
                  ${parsedCourse.hours},
                  ${parsedCourse.requires_payment === true ? true : false},
                  ${parsedCourse.paid_price_euros},
                  ${parsedCourse.paid_description},
                  ${parsedCourse.paid_video_link},
                  ${startDateTimestamp},
                  ${endDateTimestamp},
                  ${lastUpdated.time}, 
                  ${lastUpdated.commit},
                  NOW()
                )
                ON CONFLICT (id) DO UPDATE SET
                  level = EXCLUDED.level,
                  hours = EXCLUDED.hours,
                  requires_payment = EXCLUDED.requires_payment,
                  paid_price_euros = EXCLUDED.paid_price_euros,
                  paid_description = EXCLUDED.paid_description,
                  paid_video_link = EXCLUDED.paid_video_link,
                  paid_start_date = EXCLUDED.paid_start_date,
                  paid_end_date = EXCLUDED.paid_end_date,
                  last_updated = EXCLUDED.last_updated,
                  last_commit = EXCLUDED.last_commit,
                  last_sync = NOW()
                RETURNING *
              `.then(firstRow);

              if (!result) {
                throw new Error('Could not insert course');
              }

              await transaction`
                INSERT INTO content.contributors ${transaction(
                  parsedCourse.professors.map((professor) => ({
                    id: professor,
                  })),
                )}
                ON CONFLICT DO NOTHING
              `;

              await transaction`
                INSERT INTO content.course_professors (course_id, contributor_id)
                SELECT
                  ${result.id}, 
                  id FROM content.contributors WHERE id = ANY(${parsedCourse.professors})
                ON CONFLICT DO NOTHING
              `;

              // If the resource has tags, insert them into the tags table and link them to the resource
              if (parsedCourse.tags && parsedCourse.tags?.length > 0) {
                await transaction`
                  INSERT INTO content.tags ${transaction(
                    parsedCourse.tags.map((tag) => ({
                      name: tag.toLowerCase(),
                    })),
                  )}
                  ON CONFLICT (name) DO NOTHING
                `;

                await transaction`
                  INSERT INTO content.course_tags (course_id, tag_id)
                  SELECT
                    ${result.id}, 
                    id FROM content.tags WHERE name = ANY(${parsedCourse.tags})
                  ON CONFLICT DO NOTHING
                `;
              }
            }
          }
        } catch (error) {
          errors.push(`Error processing file ${course?.path}: ${error}`);
          return;
        }

        for (const file of files) {
          try {
            // TODO IMPOSSIBLE
            if (file.kind === 'removed') {
              await transaction`
                DELETE FROM content.courses_localized
                WHERE course_id = ${course.id} AND language = ${file.language}
              `;
              continue;
            }

            if (!file.language) {
              console.warn(
                `Course file ${file.path} does not have a language, skipping...`,
              );
              continue;
            }

            const header = matter(file.data, {
              excerpt: true,
              excerpt_separator: '+++',
            });

            const data = header.data as CourseLocalized;

            if (header.excerpt) {
              header.content = header.content.replace(
                `${header.excerpt}+++\n`,
                '',
              );
              header.excerpt = header.excerpt.trim();
            }

            const parts = extractParts(header.content);

            await transaction`
              INSERT INTO content.courses_localized (
                course_id, language, name, goal, objectives, raw_description
              )
              VALUES (
                ${course.id},
                ${file.language},
                ${data.name},
                ${data.goal?.trim()},
                ${data.objectives || []},
                ${header.excerpt}
              )
              ON CONFLICT (course_id, language) DO UPDATE SET
                name = EXCLUDED.name,
                goal = EXCLUDED.goal,
                objectives = EXCLUDED.objectives,
                raw_description = EXCLUDED.raw_description
              `;

            if (parts.length > 0) {
              await transaction`
                INSERT INTO content.course_parts ${transaction(
                  parts.map((_, index) => ({
                    course_id: course.id,
                    part: index + 1,
                  })),
                )}
                ON CONFLICT DO NOTHING
              `;

              await transaction`
                INSERT INTO content.course_parts_localized ${transaction(
                  parts.map((part, index) => ({
                    course_id: course.id,
                    part: index + 1,
                    language: file.language,
                    title: part.title,
                  })),
                  'course_id',
                  'part',
                  'language',
                  'title',
                )}
                ON CONFLICT (course_id, language, part)
                DO UPDATE SET title = EXCLUDED.title
              `;

              // if there is at least one chapter across all parts
              if (parts.some((part) => part.chapters.length > 0)) {
                await transaction`
                INSERT INTO content.course_chapters ${transaction(
                  parts.flatMap((part, partIndex) =>
                    part.chapters.map((_, chapterIndex) => ({
                      course_id: course.id,
                      part: partIndex + 1,
                      chapter: chapterIndex + 1,
                    })),
                  ),
                )}
                ON CONFLICT DO NOTHING
              `;

                const formatedChapters = parts.flatMap((part, partIndex) =>
                  part.chapters.map((chapter, chapterIndex) => {
                    const c = {
                      course_id: course.id,
                      part: partIndex + 1,
                      chapter: chapterIndex + 1,
                      language: file.language,
                      title: chapter.title,
                      sections: chapter.sections,
                      raw_content: chapter.raw_content.trim(),
                      release_place: chapter.releasePlace,
                      release_date: null as string | null,
                    };

                    if (chapter.releaseDate) {
                      c.release_date = chapter.releaseDate;
                    }

                    return c;
                  }),
                );

                await transaction`
                  INSERT INTO content.course_chapters_localized ${transaction(formatedChapters)}
                  ON CONFLICT (course_id, part, chapter, language) DO UPDATE SET
                    title = EXCLUDED.title,
                    sections = EXCLUDED.sections,
                    raw_content = EXCLUDED.raw_content,
                    release_date = EXCLUDED.release_date,
                    release_place = EXCLUDED.release_place
                `;

                const formatedChapters2 = parts.flatMap((part, partIndex) =>
                  part.chapters.map((chapter, chapterIndex) => ({
                    course_id: course.id,
                    part: partIndex + 1,
                    chapter: chapterIndex + 1,
                    language: file.language,
                    title: chapter.title,
                    sections: chapter.sections,
                    raw_content: chapter.raw_content.trim(),
                    professors: chapter.professors,
                  })),
                );

                for (const chapter of formatedChapters2) {
                  for (const professor of chapter.professors) {
                    await transaction`
                        INSERT INTO content.course_chapters_localized_professors (course_id, part, chapter, language, contributor_id)
                        VALUES (${course.id}, ${chapter.part}, ${chapter.chapter}, ${chapter.language}, ${professor})
                        ON CONFLICT DO NOTHING
                  `;
                  }
                }
              } else {
                console.warn(
                  `Course file ${course.id} ${file.path} does not have any chapters, skipping...`,
                );
              }
            }
          } catch (error) {
            errors.push(`Error processing file ${file?.path}: ${error}`);
          }
        }
      })
      .catch(() => {
        return;
      });
  };

export const createProcessDeleteCourses =
  (dependencies: Dependencies, errors: string[]) =>
  async (sync_date: number) => {
    const { postgres } = dependencies;

    try {
      await postgres.exec(
        sql`DELETE FROM content.courses WHERE last_sync < ${sync_date} 
      `,
      );
    } catch {
      errors.push(`Error deleting courses`);
    }
  };
