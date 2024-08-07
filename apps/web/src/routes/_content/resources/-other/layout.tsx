import type { ToPathOption } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { cn } from '@blms/ui';

import { MainLayout } from '#src/components/MainLayout/index.js';
import { PageHeader } from '#src/components/PageHeader/index.tsx';

import { CategoryTabs } from '../-components/CategoryTabs/index.tsx';
import { ResourcesDropdownMenu } from '../-components/DropdownMenu/resources-category-dropdown-menu.tsx';
import { FilterBar } from '../-components/FilterBar/index.tsx';
import { Pagination } from '../-components/Pagination/index.tsx';

interface Props {
  title: string;
  tagLine?: string;
  children: ReactNode;
  filterBar?: {
    label?: string;
    value?: string;
    onChange: (v: string) => void;
  };
  pagination?: boolean;
  className?: string;
  // TODO fix this build issue
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link?: ToPathOption<any>;
  // link?: ToPathOption<RegisteredRouter['routeTree']>;
  showPageHeader?: boolean;
  hidePageHeaderMobile?: boolean;
  addCredits?: boolean;
  backToCategoryButton?: boolean;
  activeCategory?: string;
  maxWidth?: '1152' | '1360';
  marginTopChildren?: boolean;
}

export const ResourceLayout = ({
  title,
  tagLine,
  children,
  filterBar,
  pagination,
  className,
  link,
  showPageHeader = true,
  hidePageHeaderMobile,
  addCredits,
  activeCategory,
  backToCategoryButton,
  maxWidth,
  marginTopChildren = true,
}: Props) => {
  return (
    <MainLayout footerVariant="dark">
      <div className={cn('flex h-fit justify-center p-2 md:p-10', className)}>
        <div
          className={cn(
            'w-full text-black',
            maxWidth === '1360' ? 'max-w-[1360px]' : 'max-w-6xl',
          )}
        >
          <CategoryTabs resourceActiveCategory={activeCategory} />
          <ResourcesDropdownMenu
            resourceActiveCategory={activeCategory}
            backToCategoryButton={backToCategoryButton}
          />

          {showPageHeader && (
            <PageHeader
              title={title}
              description={tagLine || ''}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              link={link ? link : ''}
              hasGithubDescription={true}
              addedCredits={addCredits}
              hideOnMobile={hidePageHeaderMobile}
              increaseHorizontalPadding={maxWidth === '1360'}
            />
          )}

          {filterBar && (
            <div className="flex justify-center my-3 sm:my-6 md:my-8">
              <FilterBar {...filterBar} />
            </div>
          )}

          <div className={cn(marginTopChildren && 'mt-4 md:mt-[60px]')}>
            {children}
          </div>

          {pagination && (
            <div className="mx-auto w-max">
              <Pagination />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
