'use server';
export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId');
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return;
  }
  try {
    const respose = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(respose.status);
  } catch (err) {
    console.log(err);
    return;
  }
}
