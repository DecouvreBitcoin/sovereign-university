import { sql } from '@blms/database';
import type { CalendarEvent } from '@blms/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getCalendarEventsQuery = (uid: string, language: string) => {
  return sql<CalendarEvent[]>`
  SELECT 
    e.id as id,
    '' as sub_id,
    e.type,
    e.name,
    e.builder as organiser,
    e.start_date,
    e.end_date,
    e.timezone,
    e.builder,
    e.book_online as is_online,
    e.address_line_1,
    e.address_line_2,
    e.address_line_3
  FROM content.events e
  JOIN users.user_event ue on e.id = ue.event_id
  WHERE uid = ${uid} AND ue.booked = true
  
  UNION

  SELECT
    e.id,
    '' as sub_id,
    e.type,
    e.name,
    e.builder as organiser,
    e.start_date,
    e.end_date,
    e.timezone,
    e.builder,
    e.book_online as is_online,
    e.address_line_1,
    e.address_line_2,
    e.address_line_3
  FROM content.events e
  JOIN users.event_payment ep ON e.id = ep.event_id
  WHERE ep.uid = ${uid} AND ep.payment_status = 'paid'

  UNION

    SELECT 
      cl.course_id as id,
      cl.chapter_id::text as sub_id,
      'course' as type,
      CONCAT(UPPER(cl.course_id),' ',cl.title) as name,
      COALESCE(array_to_string(cp_agg.professors, ', '), '') as organiser,
      cl.start_date,
      cl.end_date,
      cl.timezone,
      'TODO' as builder,
      cl.is_online,
      cl.address_line_1,
      cl.address_line_2,
      cl.address_line_3
    FROM content.course_chapters_localized cl
    JOIN users.course_payment cp on cl.course_id = cp.course_id
    LEFT JOIN LATERAL (
      SELECT ARRAY_AGG(pr.name) as professors
      FROM content.course_professors cp
      JOIN content.professors pr on cp.contributor_id = pr.contributor_id
      WHERE cp.course_id = cl.course_id
    ) AS cp_agg ON TRUE
    WHERE cp.uid = ${uid} AND cp.payment_status = 'paid'
  `;
};
