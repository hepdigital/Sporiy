import { HashtagPage } from '@/components/panel/social/hashtag-page';

type HashtagParams = Promise<{ tag: string }>;

export default async function HashtagPageRoute({ params }: { params: HashtagParams }) {
  const { tag } = await params;
  return <HashtagPage tag={tag} />;
}
