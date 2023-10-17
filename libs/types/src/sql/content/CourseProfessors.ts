// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { CoursesId } from './Courses';
import type { ContributorsId } from './Contributors';

/** Represents the table content.course_professors */
export default interface CourseProfessors {
  course_id: CoursesId;

  contributor_id: ContributorsId;
}

/** Represents the initializer for the table content.course_professors */
export interface CourseProfessorsInitializer {
  course_id: CoursesId;

  contributor_id: ContributorsId;
}

/** Represents the mutator for the table content.course_professors */
export interface CourseProfessorsMutator {
  course_id?: CoursesId;

  contributor_id?: ContributorsId;
}