import { firstRow } from '@blms/database';
import type { JoinedEvent } from '@blms/types';

import type { Dependencies } from '../../dependencies.js';
import { computeAssetCdnUrl } from '../../utils.js';
import { getEventQuery } from '../queries/get-event.js';

export const createGetEvent = (dependencies: Dependencies) => {
  return async (id: string): Promise<JoinedEvent> => {
    const { postgres } = dependencies;

    const event = await postgres.exec(getEventQuery(id)).then(firstRow);

    if (!event) {
      throw new Error(`Event ${id} not found`);
    }

    return {
      ...event,
      picture: event.id
        ? computeAssetCdnUrl(event.lastCommit, event.path, 'thumbnail.webp')
        : undefined,
    };
  };
};
