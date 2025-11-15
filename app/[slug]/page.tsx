import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileInfo } from '@/components/profile/profile-info';
import { ProfileStats } from '@/components/profile/profile-stats';
import { MediaGallery } from '@/components/profile/media-gallery';
import { CoursesSection } from '@/components/profile/courses-section';
import { LocationMap } from '@/components/profile/location-map';
import { ReviewsSection } from '@/components/profile/reviews-section';
import { QASection } from '@/components/profile/qa-section';

// Mock data - Backend'den gelecek
const profiles = {
  'umutdiner': {
    id: 2,
    type: 'trainer',
    name: 'Umut Diner',
    slug: 'umutdiner',
    category: 'Kano & Kürek',
    location: 'İstanbul, Türkiye',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    rating: 5.0,
    reviews: 89,
    followers: 1234,
    experience: '8 Yıl',
    description: 'Uluslararası sertifikalı kano eğitmeni. Olimpik seviye antrenman programları ve kişisel gelişim odaklı dersler veriyorum.',
    bio: 'Merhaba! Ben Umut, 8 yıldır profesyonel kano ve kürek eğitmenliği yapıyorum. Türkiye Milli Takımı\'nda sporcu olarak başladığım kariyerime, şimdi yeni nesil sporcular yetiştirerek devam ediyorum.\n\nUluslararası Kano Federasyonu (ICF) Level 3 sertifikam ve Olimpik Antrenörlük diplomam ile başlangıç seviyesinden profesyonel seviyeye kadar tüm sporculara özel programlar hazırlıyorum.',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?auto=format&fit=crop&w=1920&q=80',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80',
    phone: '+90 532 123 45 67',
    email: 'umut@sporiy.com',
    website: 'www.umutdiner.com',
    specialties: ['Kano', 'Kürek', 'Sprint Kano', 'Maraton Kano', 'Teknik Analiz'],
    certifications: ['ICF Level 3 Coach', 'Olimpik Antrenör', 'İlk Yardım Sertifikası'],
    languages: ['Türkçe', 'İngilizce', 'Almanca'],
    isPremium: true,
  },
  'ankayildizsporkulubu': {
    id: 1,
    type: 'club',
    name: 'Anka Yıldız Spor Kulübü',
    slug: 'ankayildizsporkulubu',
    category: 'Yüzme',
    location: 'Ankara, Türkiye',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    rating: 4.9,
    reviews: 127,
    followers: 3456,
    experience: '25 Yıl',
    description: 'Türkiye\'nin en köklü yüzme kulüplerinden biri. 25 yıllık deneyim ve başarı hikayesi.',
    bio: 'Anka Yıldız Spor Kulübü, 1998 yılından bu yana Ankara\'da yüzme sporuna hizmet vermektedir. Olimpik standartlarda havuzlarımız ve uzman kadromuzla 4 yaşından 60 yaşına kadar her seviyeden sporcu yetiştiriyoruz.\n\nKulübümüzden yetişen sporcular ulusal ve uluslararası yarışmalarda dereceler kazanmış, milli takıma sporcu yetiştirmiştir.',
    coverImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1920&q=80',
    avatar: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=400&q=80',
    phone: '+90 312 456 78 90',
    email: 'info@ankayildiz.com',
    website: 'www.ankayildiz.com',
    specialties: ['Yüzme', 'Senkronize Yüzme', 'Su Topu', 'Yüzme Kursu'],
    certifications: ['Türkiye Yüzme Federasyonu Onaylı', 'ISO 9001 Kalite Belgesi'],
    languages: ['Türkçe', 'İngilizce'],
    isPremium: true,
  },
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = profiles[params.slug as keyof typeof profiles];
  
  if (!profile) {
    return {
      title: 'Profil Bulunamadı - Sporiy',
    };
  }

  return {
    title: `${profile.name} - ${profile.category} | Sporiy`,
    description: profile.description,
    openGraph: {
      title: profile.name,
      description: profile.description,
      images: [profile.coverImage],
    },
  };
}

export default function ProfilePage({ params }: Props) {
  const profile = profiles[params.slug as keyof typeof profiles];

  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <ProfileHeader profile={profile} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <ProfileInfo profile={profile} />
            <MediaGallery profileId={profile.id} />
            <CoursesSection profile={profile} />
            <ReviewsSection profile={profile} />
            <QASection profile={profile} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <ProfileStats profile={profile} />
            <LocationMap profile={profile} />
          </div>
        </div>
      </div>
    </main>
  );
}
