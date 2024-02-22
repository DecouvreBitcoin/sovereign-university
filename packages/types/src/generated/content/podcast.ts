// @generated
// This file is automatically generated from our schemas by the command `pnpm types:generate`. Do not modify manually.

import type { z } from 'zod';

import {
  joinedPodcastSchema,
  podcastSchema,
} from '@sovereign-university/schemas';

export type JoinedPodcast = z.infer<typeof joinedPodcastSchema>;
export type Podcast = z.infer<typeof podcastSchema>;
