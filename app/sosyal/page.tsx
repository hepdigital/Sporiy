import { Metadata } from 'next';
import { SocialFeed } from '@/components/social/social-feed';

export const metadata: Metadata = {
  title: 'Sosyal - Sporiy',
  description: 'Su sporları topluluğu. Sporcular, kulüpler ve eğitmenlerle bağlantı kurun.',
};

export default function SocialPage() {
  return <SocialFeed />;
}
