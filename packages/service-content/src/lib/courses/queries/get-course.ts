import { sql } from '@blms/database';
import type { JoinedCourseWithAll } from '@blms/types';

export const getCourseQuery = (id: string, language?: string) => {
  return sql<JoinedCourseWithAll[]>`
    SELECT 
      c.id, 
      cl.language, 
      c.level, 
      c.hours,
      c.topic,
      c.subtopic, 
      c.requires_payment,
      c.paid_price_dollars,
      c.paid_description,
      c.paid_video_link,
      c.paid_start_date,
      c.paid_end_date,
      c.contact,
      cl.name, 
      cl.goal,
      cl.objectives, 
      cl.raw_description, 
      c.last_updated, 
      c.last_commit,
      COALESCE(cp_agg.professors, ARRAY[]::varchar[20]) as professors
    FROM content.courses c
    JOIN content.courses_localized cl ON c.id = cl.course_id

    -- Lateral join for aggregating professors
    LEFT JOIN LATERAL (
      SELECT ARRAY_AGG(cp.contributor_id) as professors
      FROM content.course_professors cp
      WHERE cp.course_id = c.id
    ) AS cp_agg ON TRUE

    WHERE c.id = ${id} 
    ${language ? sql`AND cl.language = ${language}` : sql``}

    GROUP BY 
      c.id, 
      cl.language, 
      c.level, 
      c.hours,
      c.topic,
      c.subtopic,
      c.requires_payment,
      c.paid_price_dollars,
      c.paid_description,
      c.paid_video_link,
      c.paid_start_date,
      c.paid_end_date,
      c.contact,
      cl.name, 
      cl.goal,
      cl.objectives, 
      cl.raw_description, 
      c.last_updated, 
      c.last_commit,
      cp_agg.professors
  `;
};
