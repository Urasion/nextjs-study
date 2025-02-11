import { notFound } from 'next/navigation';
import style from './page.module.css';
import { ReviewData } from '@/types';
import ReviewItem from '@/components/review-item';
import { ReviewEditor } from '@/components/review-editer';
/* generateStaticParams로 지정한 값이 아니면 NotFound페이지로..
export const dynamicParams = false; */
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }
  const book = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
    <section className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } }
  );
  if (!response.ok) {
    throw new Error(`Review fecth failed : ,  ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();
  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </section>
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className={style.container}>
      <BookDetail bookId={(await params).id} />
      <ReviewEditor bookId={(await params).id} />
      <ReviewList bookId={(await params).id} />
    </div>
  );
}
