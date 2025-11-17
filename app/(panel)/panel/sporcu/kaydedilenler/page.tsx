import { Metadata } from 'next';
import { SavedPosts } from '@/components/panel/social/saved-posts';

export const metadata: Metadata = {
  title: 'Kaydedilenler - Sporcu Paneli',
  description: 'Kaydettiğiniz gönderiler',
};

export default function SavedPostsPage() {
  return <SavedPosts />;
}
