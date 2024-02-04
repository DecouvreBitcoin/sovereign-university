import { TRPCError } from '@trpc/server';

import { UserRole } from '@sovereign-university/types';

import { createMiddleware } from '../trpc';

import { publicProcedure } from './public';

// Defining middlewares in line for now, until the standalone middlewares feature is no longer experimental
// https://trpc.io/docs/server/middlewares#experimental-standalone-middlewares

export const protectedProcedure = publicProcedure.use(
  createMiddleware(({ ctx, next }) => {
    const { req } = ctx;

    if (!req.session.uid || !req.session.role) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
      ctx: { user: { uid: req.session.uid, role: req.session.role } },
    });
  }),
);

export const protectedProcedureWithRole = (role: UserRole) =>
  protectedProcedure.use(({ ctx, next }) => {
    if (!ctx.user || ctx.user.role !== role) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
  });
