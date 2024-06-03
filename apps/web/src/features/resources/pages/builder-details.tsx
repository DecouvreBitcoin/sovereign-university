/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Link, useParams } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BsGithub, BsTwitterX } from 'react-icons/bs';
import { SlGlobe } from 'react-icons/sl';

import { Button, cn } from '@sovereign-university/ui';

import Flag from '#src/atoms/Flag/index.js';
import { useGreater } from '#src/hooks/use-greater.js';

import Nostr from '../../../assets/icons/nostr.svg?react';
import { useNavigateMisc } from '../../../hooks/index.ts';
import { trpc } from '../../../utils/index.ts';
import { BuilderEvents } from '../components/builder-events.tsx';
import { BuilderCard } from '../components/Cards/builder-card.tsx';
import { ResourceLayout } from '../layout.tsx';

export const Builder = () => {
  const { navigateTo404 } = useNavigateMisc();
  const { t, i18n } = useTranslation();
  const { builderId } = useParams({
    from: '/resources/builder/$builderId',
  });
  const isScreenMd = useGreater('sm');
  const { data: builder, isFetched } = trpc.content.getBuilder.useQuery({
    id: Number(builderId),
    language: i18n.language ?? 'en',
  });

  const { data: communities } = trpc.content.getBuilders.useQuery({
    language: i18n.language ?? 'en',
  });

  const { data: events } = trpc.content.getEvents.useQuery();

  const filteredCommunities = communities
    ? communities
        .filter(
          (el) =>
            el.category.toLowerCase() === 'communities' &&
            el.name !== builder?.name,
        )
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const filteredEvents = events
    ? events.filter(
        (event) =>
          event.builder === builder?.name &&
          new Date(event.startDate) > new Date(),
      )
    : [];

  const navigateTo404Called = useRef(false);

  useEffect(() => {
    if (!builder && isFetched && !navigateTo404Called.current) {
      navigateTo404();
      navigateTo404Called.current = true;
    }
  }, [builder, isFetched, navigateTo404]);

  return (
    <ResourceLayout
      title={t('builders.pageTitle')}
      tagLine={t('builders.pageSubtitle')}
      link={'/resources/builders'}
      activeCategory="builders"
      backToCategoryButton
    >
      {builder && (
        <article className="w-full border-2 border-darkOrange-5 bg-darkOrange-10 rounded-[1.25rem] mb-7 md:mb-24">
          <section className="flex p-2 md:p-[30px]">
            <div className="flex flex-col gap-3">
              <img
                src={builder?.logo}
                className="rounded-2xl md:rounded-3xl size-[84px] md:size-[276px] shadow-card-items-dark"
                alt={t('imagesAlt.sthRepresentingCompany')}
              />
              <div className="flex justify-center gap-2.5 md:hidden">
                {builder.languages &&
                  builder.languages
                    .slice(0, 2)
                    .map((language) => (
                      <Flag
                        code={language}
                        key={language}
                        className="!w-[26px] !h-[18px] shadow-card-items-dark"
                      />
                    ))}
              </div>
            </div>
            <div className="flex flex-col md:gap-6 ml-4 md:ml-10">
              <h2 className="text-2xl md:text-5xl md:font-medium leading-none md:leading-[116%] text-white">
                {builder.name}
              </h2>

              {/* Links */}
              <div className="flex gap-4 md:gap-5 text-white max-md:mt-2">
                {builder.twitterUrl && (
                  <a
                    href={builder.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsTwitterX size={isScreenMd ? 32 : 16} />
                  </a>
                )}
                {builder.nostr && (
                  <a
                    href={builder.nostr}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Nostr className={cn(isScreenMd ? 'size-8' : 'size-4')} />
                  </a>
                )}
                {builder.githubUrl && (
                  <a
                    href={builder.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsGithub size={isScreenMd ? 32 : 16} />
                  </a>
                )}
                {builder.websiteUrl && (
                  <a
                    href={builder.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SlGlobe size={isScreenMd ? 32 : 16} />
                  </a>
                )}
              </div>
              {(builder.addressLine1 ||
                builder.addressLine2 ||
                builder.addressLine3) && (
                <div className="flex flex-col mobile-caption1 max-md:leading-tight md:desktop-h6 text-white max-md:mt-2">
                  {/* This information was not required according to Ajelex*/}
                  <span>{builder.addressLine1}</span>
                </div>
              )}
              <div className="flex gap-2.5 md:gap-4 items-center flex-wrap max-md:mt-1.5">
                {builder.tags?.map((tag) => (
                  <Button
                    variant="newSecondary"
                    mode="colored"
                    key={tag}
                    className="cursor-default capitalize shadow-card-items-dark"
                    size={isScreenMd ? 'm' : 'xs'}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
            <div className="ml-auto flex flex-col gap-3 max-md:hidden">
              {builder.category === 'communities' && (
                <>
                  <span className="text-xs font-medium text-white text-center mb-1">
                    {t('builders.languages')}
                  </span>
                  <div className="flex justify-center flex-col gap-2.5 ">
                    {builder.languages &&
                      builder.languages
                        .slice(0, 3)
                        .map((language) => (
                          <Flag
                            code={language}
                            key={language}
                            className="!w-[70px] !h-[49px] shadow-card-items-dark"
                          />
                        ))}
                  </div>
                </>
              )}
            </div>

            {/* <div className="ml-auto flex flex-col gap-3 max-md:hidden">
              <span className="text-xs font-medium text-white text-center">
                {t('builders.languages')}
              </span>
              {builder.languages &&
                builder.languages
                  .slice(0, 3)
                  .map((language) => (
                    <Flag
                      code={language}
                      key={language}
                      className="!w-[70px] !h-[49px] shadow-card-items-dark"
                    />
                  ))}
            </div> */}
          </section>
          <p className="mobile-body2 md:desktop-h8 whitespace-pre-line text-white p-2.5 md:p-5">
            {builder.description}
          </p>
        </article>
      )}
      {filteredEvents.length > 0 && <BuilderEvents events={filteredEvents} />}
      {builder?.category === 'communities' && (
        <div className="flex flex-col items-center gap-4 md:gap-14">
          <div className="max-md:hidden h-px bg-newGray-1 w-full" />
          <div className="text-center">
            <span className="text-darkOrange-5 max-md:text-xs max-md:font-medium max-md:leading-normal md:desktop-h7">
              {t('builders.networkStrength')}
            </span>
            <h3 className="text-white mobile-h3 md:desktop-h3">
              {t('builders.otherCommunities')}
            </h3>
          </div>
          <div className="max-w-[1017px] flex flex-row flex-wrap justify-center items-center gap-4 md:gap-11">
            {filteredCommunities.map((community) => (
              <Link
                to={'/resources/builder/$builderId'}
                params={{
                  builderId: community.id.toString(),
                }}
                key={community.id}
              >
                <BuilderCard
                  name={community.name}
                  logo={community.logo}
                  cardWidth="w-[50px] md:w-[90px]"
                />
              </Link>
            ))}
          </div>
          <div className="max-md:hidden h-px bg-newGray-1 w-full" />
        </div>
      )}
    </ResourceLayout>
  );
};
