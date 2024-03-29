// @generated
// This file is automatically generated from our schemas by the command `pnpm types:generate`. Do not modify manually.

import type { z } from 'zod';

import {
  courseCompletedChaptersSchema,
  coursePaymentSchema,
  courseProgressExtendedSchema,
  courseProgressSchema,
  courseQuizAttemptsSchema,
} from '@sovereign-university/schemas';

export type CourseCompletedChapters = z.infer<
  typeof courseCompletedChaptersSchema
>;
export type CoursePayment = z.infer<typeof coursePaymentSchema>;
export type CourseProgressExtended = z.infer<
  typeof courseProgressExtendedSchema
>;
export type CourseProgress = z.infer<typeof courseProgressSchema>;
export type CourseQuizAttempts = z.infer<typeof courseQuizAttemptsSchema>;
