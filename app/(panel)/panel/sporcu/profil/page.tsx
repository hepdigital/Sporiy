import { Metadata } from 'next';
import { SporcuProfile } from '@/components/panel/sporcu/profile';

export const metadata: Metadata = {
  title: 'Profilim - Sporcu Paneli',
  description: 'Profil bilgilerinizi görüntüleyin ve düzenleyin',
};

export default function SporcuProfilePage() {
  return <SporcuProfile />;
}
