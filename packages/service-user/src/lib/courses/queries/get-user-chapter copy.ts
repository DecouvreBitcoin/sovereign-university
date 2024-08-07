import { sql } from '@blms/database';
import type { CourseUserChapter } from '@blms/types';

type UserChapter = Array<
  Pick<CourseUserChapter, 'courseId' | 'chapterId' | 'completedAt' | 'booked'>
>;

export const getUserChapterQuery = (uid: string, courseId: string) => {
  return sql<UserChapter>`
    SELECT course_id, chapter_id, completed_at, booked 
    FROM users.course_user_chapter
    WHERE uid = ${uid} AND course_id = ${courseId};
  `;
};
