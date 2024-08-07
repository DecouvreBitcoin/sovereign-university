import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import {
  contentResourceTags,
  contentResources,
  contentTags,
} from '@blms/database';

export const resourceSchema = createSelectSchema(contentResources);
export const resourceTagSchema = createSelectSchema(contentResourceTags);
export const tagsSchema = createSelectSchema(contentTags);

export const levelSchema = z.enum([
  'beginner',
  'intermediate',
  'advanced',
  'expert',
  'wizard',
  'developer',
]);
