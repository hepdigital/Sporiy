import { Metadata } from 'next';
import { SporcuFollowing } from '@/components/panel/sporcu/following';

export const metadata: Metadata = {
  title: 'Takip Ettiklerim - Sporcu Paneli',
  description: 'Takip ettiğiniz kulüp ve eğitmenler',
};

export default function SporcuFollowingPage() {
  return <SporcuFollowing />;
}
