import { firstRow } from '@sovereign-university/database';

import type { Dependencies } from '../../dependencies.js';
import { formatProfessor } from '../../professors/services/utils.js';
import { omitWithTypes } from '../../utils.js';
import { getCreditsQuery, getTutorialQuery } from '../queries/index.js';

export const createGetTutorial =
  (dependencies: Dependencies) =>
  async ({
    category,
    name,
    language,
  }: {
    category: string;
    name: string;
    language: string;
  }) => {
    const { postgres } = dependencies;

    const tutorial = await postgres
      .exec(getTutorialQuery(category, name, language))
      .then(firstRow);

    if (!tutorial) throw new Error(`Tutorial not found`);

    const credits = await postgres
      .exec(getCreditsQuery(tutorial.id))
      .then(firstRow);

    if (!credits)
      return {
        ...tutorial,
        credits: undefined,
      };

    return {
      ...tutorial,
      credits: {
        ...omitWithTypes(credits, [
          'tutorialId',
          'contributorId',
          'lightningAddress',
          'lnurlPay',
          'paynym',
          'silentPayment',
          'tipsUrl',
        ]),
        professor: credits.professor
          ? formatProfessor(credits.professor)
          : undefined,
        tips: {
          lightningAddress: credits.lightningAddress,
          lnurlPay: credits.lnurlPay,
          paynym: credits.paynym,
          silentPayment: credits.silentPayment,
          url: credits.tipsUrl,
        },
      },
    };
  };
