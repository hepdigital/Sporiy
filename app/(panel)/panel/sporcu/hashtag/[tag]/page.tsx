import { HashtagPage } from '@/components/panel/social/hashtag-page';

type Props = {
  params: {
    tag: string;
  };
};

export default function HashtagPageRoute({ params }: Props) {
  return <HashtagPage tag={params.tag} />;
}
