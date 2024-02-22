import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express, { Router, json } from 'express';

import type { Dependencies } from './dependencies.js';
import { createCorsMiddleware } from './middlewares/cors.js';
import { createCookieSessionMiddleware } from './middlewares/session/cookie.js';
import { createRestRouter } from './routers/rest-router.js';
import { trpcRouter } from './routers/trpc-router.js';
import { createContext } from './trpc/index.js';

export const startServer = async (dependencies: Dependencies, port = 3000) => {
  const app = express();
  const router = Router();

  // Parse JSON bodies
  app.use(json());

  // Enable cors
  app.use(createCorsMiddleware());

  app.use(createCookieSessionMiddleware(dependencies));

  // Basic request logger
  app.use((req, _res, next) => {
    console.log('➡️', req.method, req.path);
    next();
  });

  // Register tRPC routes
  router.use(
    '/trpc',
    createExpressMiddleware({
      router: trpcRouter,
      createContext: (opts) => createContext(opts, dependencies),
    }),
  );

  const restRouter = createRestRouter(dependencies);

  const baseRoute = process.env.NODE_ENV === 'development' ? '/api' : '/';
  app.use(baseRoute, router);
  app.use(baseRoute, restRouter);

  const server = app.listen(port, '0.0.0.0');

  server.on('error', console.error);

  return new Promise<typeof server>((resolve, reject) => {
    server.on('listening', () => {
      console.log(`[ ready ] listening on port ${port}`);
      resolve(server);
    });

    server.on('error', (err) => {
      reject(err);
    });
  });
};
