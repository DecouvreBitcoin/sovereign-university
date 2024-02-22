import { z } from 'zod';

import {
  createCompleteChapter,
  createGetPayment,
  createGetProgress,
  createSavePayment,
  createSaveQuizAttempt,
} from '@sovereign-university/user';

import { protectedProcedure } from '../../procedures/index.js';
import { createTRPCRouter } from '../../trpc/index.js';

const completeChapterProcedure = protectedProcedure
  .input(
    z.object({
      courseId: z.string(),
      part: z.number(),
      chapter: z.number(),
    }),
  )

  .mutation(({ ctx, input }) =>
    createCompleteChapter(ctx.dependencies)({
      uid: ctx.user.uid,
      courseId: input.courseId,
      part: input.part,
      chapter: input.chapter,
    }),
  );

const getProgressProcedure = protectedProcedure
  .input(z.void())

  .query(({ ctx }) =>
    createGetProgress(ctx.dependencies)({ uid: ctx.user.uid }),
  );

const saveQuizAttemptProcedure = protectedProcedure
  .input(
    z.object({
      courseId: z.string(),
      partIndex: z.number(),
      chapterIndex: z.number(),
      questionsCount: z.number(),
      correctAnswersCount: z.number(),
    }),
  )

  .mutation(({ ctx, input }) =>
    createSaveQuizAttempt(ctx.dependencies)({
      uid: ctx.user.uid,
      courseId: input.courseId,
      partIndex: input.partIndex,
      chapterIndex: input.chapterIndex,
      questionsCount: input.questionsCount,
      correctAnswersCount: input.correctAnswersCount,
    }),
  );

const savePaymentProcedure = protectedProcedure
  .input(
    z.object({
      courseId: z.string(),
      amount: z.number(),
    }),
  )
  .output(
    z.object({
      id: z.string(),
      pr: z.string(),
      onChainAddr: z.string(),
      amount: z.number(),
      checkoutUrl: z.string(),
    }),
  )
  .mutation(({ ctx, input }) =>
    createSavePayment(ctx.dependencies)({
      uid: ctx.user.uid,
      courseId: input.courseId,
      amount: input.amount,
    }),
  );

const getPaymentProcedure = protectedProcedure
  .input(z.void())
  .query(({ ctx }) =>
    createGetPayment(ctx.dependencies)({ uid: ctx.user.uid }),
  );

export const userCoursesRouter = createTRPCRouter({
  completeChapter: completeChapterProcedure,
  getProgress: getProgressProcedure,
  getPayment: getPaymentProcedure,
  saveQuizAttempt: saveQuizAttemptProcedure,
  savePayment: savePaymentProcedure,
});