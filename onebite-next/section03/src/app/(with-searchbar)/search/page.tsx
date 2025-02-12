import BookItem from '@/components/book-item';
import BookItemSkeleton from '@/components/skeleton/book-item-skeleton';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { BookData } from '@/types';
import { Metadata } from 'next';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: 'force-cache' }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return {
    title: `검색 결과 : ${q}`,
    description: '한입 북스에 등록된 도서를 만나보세요!',
    openGraph: {
      title: `'검색 결과 : ${q}`,
      description: '한입 북스에 등록된 도서를 만나보세요!',
      images: ['/thumbnail.png'],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  return (
    <Suspense
      key={(await searchParams).q || ''}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={(await searchParams).q || ''} />
    </Suspense>
  );
}
