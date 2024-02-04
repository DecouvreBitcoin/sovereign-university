import { cacheMiddleware } from '../middlewares';
import { createProcedure } from '../trpc';

export const publicProcedure = createProcedure().use(cacheMiddleware);
