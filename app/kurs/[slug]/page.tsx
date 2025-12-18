import { notFound } from 'next/navigation';
import { CourseDetailPage } from '@/components/course/course-detail-page';

// Mock data - gerçek uygulamada API'den gelecek
const mockCourses = [
  {
    id: 1,
    title: 'Yüzme Başlangıç Kursu',
    slug: 'yuzme-baslangic-kursu',
    category: 'Yüzme',
    city: 'Sakarya',
    district: 'Adapazarı',
    instructor: {
      name: 'Zeynep Demir',
      slug: 'zeynepdemir',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      rating: 4.9,
      totalReviews: 127,
      experience: '8 yıl',
      specialties: ['Yüzme', 'Su Güvenliği', 'Çocuk Eğitimi']
    },
    rating: 4.9,
    reviews: 127,
    students: 234,
    duration: '8 Hafta',
    level: 'Başlangıç',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    description: 'Çocuklar ve yetişkinler için temel yüzme teknikleri öğrenin. Bu kurs, su güvenliği ile başlayarak temel yüzme stillerini kapsar.',
    schedule: 'Haftada 3 gün',
    type: 'Grup',
    location: 'Sakarya Aqua Center',
    address: 'Adapazarı Merkez, Sakarya',
    coordinates: { lat: 40.7569, lng: 30.3781 },
    features: [
      'Sertifikalı eğitmen',
      'Küçük grup eğitimi (max 8 kişi)',
      'Tüm ekipmanlar dahil',
      'Su güvenliği eğitimi',
      'Kurs sonu sertifikası'
    ],
    curriculum: [
      { week: 1, title: 'Su Güvenliği ve Temel Teknikler', description: 'Havuz güvenliği, nefes alma teknikleri' },
      { week: 2, title: 'Serbest Stil Temelleri', description: 'Kol ve bacak hareketleri koordinasyonu' },
      { week: 3, title: 'Sırtüstü Yüzme', description: 'Sırtüstü pozisyon ve teknik geliştirme' },
      { week: 4, title: 'Kurbağalama Temelleri', description: 'Kurbağalama kol ve bacak teknikleri' },
      { week: 5, title: 'Teknik Geliştirme', description: 'Stil düzeltmeleri ve hız çalışması' },
      { week: 6, title: 'Dayanıklılık Antrenmanı', description: 'Uzun mesafe yüzme teknikleri' },
      { week: 7, title: 'Yarışma Teknikleri', description: 'Start, dönüş ve finiş teknikleri' },
      { week: 8, title: 'Değerlendirme ve Sertifika', description: 'Final değerlendirmesi ve sertifika töreni' }
    ],
    groupSchedules: [
      {
        id: 'grup-1',
        days: ['Pazartesi', 'Çarşamba', 'Cuma'],
        time: '18:00-19:00',
        capacity: 8,
        enrolled: 6,
        startDate: '2025-01-20',
        endDate: '2025-03-14'
      },
      {
        id: 'grup-2',
        days: ['Salı', 'Perşembe', 'Cumartesi'],
        time: '10:00-11:00',
        capacity: 8,
        enrolled: 4,
        startDate: '2025-01-21',
        endDate: '2025-03-15'
      }
    ],
    requirements: [
      'Yüzme bilgisi gerekmez',
      'Sağlık raporu (kurs başında)',
      'Yüzme kıyafeti ve bone',
      'Minimum yaş: 6'
    ],
    included: [
      'Tüm ders materyalleri',
      'Yüzme tahtası ve noodle',
      'Su güvenliği ekipmanları',
      'Kurs sonu sertifikası',
      'Fotoğraf ve video çekimi'
    ]
  },
  {
    id: 11,
    title: 'Başlangıç Seviye Kano Kursu',
    slug: 'baslangic-seviye-kano-kursu',
    category: 'Kano',
    city: 'Sakarya',
    district: 'Adapazarı',
    instructor: {
      name: 'Umut Diner',
      slug: 'umutdiner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 4.8,
      totalReviews: 89,
      experience: '6 yıl',
      specialties: ['Kano', 'Sprint Teknikleri', 'Su Güvenliği']
    },
    rating: 4.8,
    reviews: 89,
    students: 156,
    duration: '8 Hafta',
    level: 'Başlangıç',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=800',
    description: 'Kano sporuna yeni başlayanlar için temel teknikler ve güvenlik eğitimi. Su güvenliği ile başlayarak temel kano teknikleri öğrenilir.',
    schedule: 'Haftada 2 gün',
    type: 'Grup',
    location: 'Sakarya Nehri Kıyısı',
    address: 'Sakarya Nehri Kıyısı, Adapazarı',
    coordinates: { lat: 40.7569, lng: 30.3781 },
    features: [
      'Sertifikalı eğitmen',
      'Küçük grup eğitimi (max 12 kişi)',
      'Tüm ekipmanlar dahil',
      'Su güvenliği eğitimi',
      'Kurs sonu sertifikası'
    ],
    curriculum: [
      { week: 1, title: 'Su Güvenliği ve Temel Bilgiler', description: 'Kano güvenliği, ekipman tanıtımı' },
      { week: 2, title: 'Temel Kürek Teknikleri', description: 'İleri kürek, geri kürek, dönüş teknikleri' },
      { week: 3, title: 'Denge ve Kontrol', description: 'Kano dengesini koruma, yön kontrolü' },
      { week: 4, title: 'İleri Teknikler', description: 'Hızlı dönüşler, acil durumlar' },
      { week: 5, title: 'Nehir Okuma', description: 'Su akıntılarını anlama, güvenli geçiş' },
      { week: 6, title: 'Grup Seyri', description: 'Takım halinde kano kullanımı' },
      { week: 7, title: 'Yarışma Teknikleri', description: 'Sprint teknikleri, hız çalışması' },
      { week: 8, title: 'Değerlendirme ve Sertifika', description: 'Final değerlendirmesi ve sertifika töreni' }
    ],
    groupSchedules: [
      {
        id: 'grup-1',
        days: ['Pazartesi', 'Çarşamba'],
        time: '18:00-20:00',
        capacity: 12,
        enrolled: 8,
        startDate: '2025-01-20',
        endDate: '2025-03-14',
        location: 'Sakarya Nehri Kıyısı',
        coordinates: { lat: 40.7569, lng: 30.3781 }
      }
    ],
    requirements: [
      'Yüzme bilgisi gerekli',
      'Sağlık raporu (kurs başında)',
      'Su sporları kıyafeti',
      'Minimum yaş: 12'
    ],
    included: [
      'Kano ve kürek',
      'Can yeleği',
      'Su güvenliği ekipmanları',
      'Kurs sonu sertifikası',
      'Fotoğraf çekimi'
    ]
  },
  {
    id: 12,
    title: 'İleri Seviye Sprint Kano',
    slug: 'ileri-seviye-sprint-kano',
    category: 'Kano',
    city: 'Sakarya',
    district: 'Serdivan',
    instructor: {
      name: 'Umut Diner',
      slug: 'umutdiner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 4.9,
      totalReviews: 89,
      experience: '6 yıl',
      specialties: ['Kano', 'Sprint Teknikleri', 'Yarışma Hazırlığı']
    },
    rating: 4.9,
    reviews: 67,
    students: 89,
    duration: '12 Hafta',
    level: 'İleri',
    price: 4000,
    image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=800',
    description: 'Yarışma odaklı sprint teknikleri ve performans geliştirme programı. İleri seviye sporcular için özel hazırlanmış program.',
    schedule: 'Haftada 3 gün',
    type: 'Grup',
    location: 'Sapanca Gölü',
    address: 'Sapanca Gölü, Serdivan',
    coordinates: { lat: 40.7669, lng: 30.3881 },
    features: [
      'Profesyonel eğitmen',
      'Küçük grup (max 8 kişi)',
      'Yarışma ekipmanları',
      'Video analiz',
      'Performans takibi'
    ],
    curriculum: [
      { week: 1, title: 'Teknik Değerlendirme', description: 'Mevcut seviye tespiti ve hedef belirleme' },
      { week: 2, title: 'Sprint Teknikleri', description: 'Hızlı başlangıç ve ivmelenme' },
      { week: 3, title: 'Güç Geliştirme', description: 'Kuvvet ve dayanıklılık antrenmanları' },
      { week: 4, title: 'Teknik Mükemmelleştirme', description: 'Kürek tekniği optimizasyonu' },
      { week: 5, title: 'Taktik Eğitimi', description: 'Yarışma stratejileri' },
      { week: 6, title: 'Mental Hazırlık', description: 'Konsantrasyon ve motivasyon' },
      { week: 7, title: 'Simülasyon Yarışları', description: 'Gerçek yarışma koşulları' },
      { week: 8, title: 'Performans Analizi', description: 'Video analiz ve geri bildirim' },
      { week: 9, title: 'İleri Teknikler', description: 'Profesyonel seviye teknikleri' },
      { week: 10, title: 'Kondisyon Zirvesi', description: 'Maksimum performans hazırlığı' },
      { week: 11, title: 'Yarışma Simülasyonu', description: 'Tam yarışma deneyimi' },
      { week: 12, title: 'Final Değerlendirme', description: 'Gelişim raporu ve sertifika' }
    ],
    groupSchedules: [
      {
        id: 'grup-1',
        days: ['Salı', 'Perşembe'],
        time: '17:00-19:00',
        capacity: 8,
        enrolled: 6,
        startDate: '2025-01-21',
        endDate: '2025-04-15',
        location: 'Sapanca Gölü',
        coordinates: { lat: 40.7669, lng: 30.3881 }
      },
      {
        id: 'grup-2',
        days: ['Cumartesi'],
        time: '10:00-12:00',
        capacity: 8,
        enrolled: 7,
        startDate: '2025-01-25',
        endDate: '2025-04-19',
        location: 'Sakarya Nehri Kıyısı',
        coordinates: { lat: 40.7569, lng: 30.3781 }
      }
    ],
    requirements: [
      'İyi seviye yüzme bilgisi',
      'Temel kano deneyimi',
      'Sağlık raporu',
      'Minimum yaş: 16'
    ],
    included: [
      'Profesyonel kano ve kürek',
      'Yarışma ekipmanları',
      'Video analiz sistemi',
      'Performans raporu',
      'Sertifika'
    ]
  },
  {
    id: 2,
    title: 'Özel Ders Programı',
    slug: 'ozel-ders-programi',
    category: 'Kano',
    city: 'Sakarya',
    district: 'Adapazarı',
    instructor: {
      name: 'Umut Diner',
      slug: 'umutdiner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 4.9,
      totalReviews: 89,
      experience: '6 yıl',
      specialties: ['Kano', 'Bireysel Koçluk', 'Teknik Geliştirme']
    },
    rating: 4.9,
    reviews: 45,
    students: 78,
    duration: 'Esnek',
    level: 'Tüm Seviyeler',
    price: 500,
    image: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?w=800',
    description: 'Kişiye özel hazırlanan antrenman programı ve birebir koçluk. Kendi hızınızda öğrenin ve gelişin.',
    schedule: 'Esnek saatler',
    type: 'Bireysel',
    location: 'Çeşitli Lokasyonlar',
    address: 'Sakarya çevresindeki çeşitli su sporları merkezleri',
    coordinates: { lat: 40.7569, lng: 30.3781 },
    features: [
      'Birebir eğitim',
      'Kişiye özel program',
      'Esnek saatler',
      'Hızlı gelişim',
      'Özel ekipman'
    ],
    curriculum: [
      { week: 1, title: 'Kişisel Değerlendirme', description: 'Seviye tespiti ve hedef belirleme' },
      { week: 2, title: 'Özel Program Hazırlığı', description: 'Kişiye özel antrenman planı' },
      { week: 3, title: 'Teknik Odaklı Çalışma', description: 'Bireysel teknik geliştirme' },
      { week: 4, title: 'İlerleme Takibi', description: 'Sürekli değerlendirme ve düzeltme' }
    ],
    groupSchedules: [
      {
        id: 'bireysel-1',
        days: ['Esnek'],
        time: 'Randevuya göre',
        capacity: 1,
        enrolled: 0,
        startDate: '2025-01-15',
        endDate: '2025-12-31',
        location: 'Çeşitli Lokasyonlar',
        coordinates: { lat: 40.7569, lng: 30.3781 }
      }
    ],
    requirements: [
      'Yaş sınırı yok',
      'Sağlık raporu',
      'Yüzme bilgisi (temel seviye)',
      'Önceden randevu'
    ],
    included: [
      'Birebir eğitim',
      'Kişiye özel ekipman',
      'Esnek zamanlama',
      'İlerleme raporu',
      'Sürekli destek'
    ]
  }
];

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = mockCourses.find(c => c.slug === slug);

  if (!course) {
    notFound();
  }

  return <CourseDetailPage course={course} />;
}

export async function generateStaticParams() {
  return mockCourses.map((course) => ({
    slug: course.slug,
  }));
}