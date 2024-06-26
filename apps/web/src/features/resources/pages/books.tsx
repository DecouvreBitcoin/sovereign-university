import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { JoinedBook } from '@sovereign-university/types';

import Spinner from '#src/assets/spinner_orange.svg?react';

import { trpc } from '../../../utils/index.ts';
import { ResourceCard } from '../components/Cards/resource-card.tsx';
import { ResourceLayout } from '../layout.tsx';

export const Books = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: books, isFetched } = trpc.content.getBooks.useQuery(
    {
      language: i18n.language ?? 'en',
    },
    {
      staleTime: 300_000, // 5 minutes
    },
  );

  const sortedBooks: JoinedBook[] = books
    ? (books.sort((a, b) => a.title.localeCompare(b.title)) as JoinedBook[]) // Todo remove this as
    : [];

  return (
    <ResourceLayout
      title={t('library.pageTitle')}
      tagLine={t('library.pageSubtitle')}
      filterBar={{
        onChange: setSearchTerm,
        label: t('resources.filterBarLabel'),
      }}
      activeCategory="books"
    >
      <div className="flex flex-wrap justify-center gap-4 md:gap-10 mt-6 md:mt-12 mx-auto">
        {!isFetched && <Spinner className="size-48 md:size-64 mx-auto" />}
        {sortedBooks
          .filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((book) => (
            <Link
              to={'/resources/book/$bookId'}
              params={{
                bookId: book.id.toString(),
              }}
              key={book.id}
            >
              <ResourceCard
                name={book.title}
                author={book.author}
                imageSrc={book.cover}
                year={book.publicationYear}
              />
            </Link>
          ))}
      </div>
    </ResourceLayout>
  );
};
