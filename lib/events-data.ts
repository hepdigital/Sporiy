export type EventLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional';
export type EventType = 'free' | 'paid' | 'donation';
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export type EventReview = {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
};

export type Event = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  organizerId: number;
  organizerName: string;
  organizerType: 'club' | 'trainer';
  organizerSlug: string;
  organizerAvatar: string;
  coverImage: string;
  gallery: string[];
  location: string;
  address: string;
  coordinates: { lat: number; lng: number };
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  type: EventType;
  price: number;
  currency: string;
  level: EventLevel;
  capacity: number;
  registered: number;
  status: EventStatus;
  features: string[];
  requirements: string[];
  includes: string[];
  rating: number;
  reviews: number;
  certificate: boolean;
  weather: boolean;
  tags: string[];
  createdAt: string;
  reviewsList?: EventReview[];
};

export const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Yaz Yüzme Kampı 2025',
    slug: 'yaz-yuzme-kampi-2025',
    category: 'Yüzme',
    description: 'Çocuklar için 2 haftalık yoğun yüzme eğitim kampı. Temel tekniklerden ileri seviye tekniklere kadar.',
    longDescription: 'Bu yaz kampında çocuklarınız profesyonel eğitmenler eşliğinde yüzme tekniklerini öğrenecek ve geliştirecekler. Sabah ve öğleden sonra olmak üzere günde 2 seans antrenman yapılacaktır. Kamp süresince çocukların gelişimi düzenli olarak takip edilecek ve velilere raporlanacaktır.',
    organizerId: 1,
    organizerName: 'Anka Yıldız Spor Kulübü',
    organizerType: 'club',
    organizerSlug: 'ankayildizsporkulubu',
    organizerAvatar: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=800&q=80',
    ],
    location: 'Ankara',
    address: 'Çankaya Olimpik Yüzme Havuzu, Ankara',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    startDate: '2025-07-01',
    endDate: '2025-07-14',
    startTime: '09:00',
    endTime: '17:00',
    type: 'paid',
    price: 3500,
    currency: 'TRY',
    level: 'beginner',
    capacity: 30,
    registered: 18,
    status: 'upcoming',
    features: ['Profesyonel Eğitmenler', 'Öğle Yemeği Dahil', 'Sertifika', 'Fotoğraf & Video Çekimi'],
    requirements: ['7-14 yaş arası', 'Sağlık raporu', 'Yüzme kıyafeti'],
    includes: ['Günlük 2 seans antrenman', 'Öğle yemeği', 'Katılım sertifikası', 'Kamp tişörtü'],
    rating: 4.8,
    reviews: 45,
    certificate: true,
    weather: false,
    tags: ['Çocuklar', 'Yaz Kampı', 'Yüzme', 'Eğitim'],
    createdAt: '2025-01-15',
  },
  {
    id: 2,
    title: 'Boğaz\'da Kano Turu',
    slug: 'bogazda-kano-turu',
    category: 'Kano',
    description: 'İstanbul Boğazı\'nda unutulmaz bir kano deneyimi. Gün batımında özel tur.',
    longDescription: 'İstanbul Boğazı\'nın eşsiz manzarasında profesyonel rehberlik eşliğinde kano turu. Hem deneyimliler hem de başlangıç seviyesindekiler için uygun. Güvenlik ekipmanları ve temel eğitim dahildir.',
    organizerId: 2,
    organizerName: 'Umut Diner',
    organizerType: 'trainer',
    organizerSlug: 'umutdiner',
    organizerAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a1e5a3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    ],
    location: 'İstanbul',
    address: 'Bebek Sahili, İstanbul',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    startDate: '2025-06-15',
    endDate: '2025-06-15',
    startTime: '17:00',
    endTime: '19:30',
    type: 'paid',
    price: 450,
    currency: 'TRY',
    level: 'beginner',
    capacity: 12,
    registered: 8,
    status: 'upcoming',
    features: ['Profesyonel Rehber', 'Güvenlik Ekipmanları', 'Fotoğraf Çekimi', 'Sigorta'],
    requirements: ['Yüzme bilmek zorunlu', 'Minimum 16 yaş'],
    includes: ['Kano ve kürek', 'Can yeleği', 'Su geçirmez çanta', 'Rehberlik'],
    rating: 5.0,
    reviews: 23,
    certificate: false,
    weather: true,
    tags: ['Kano', 'Boğaz', 'Gün Batımı', 'Tur'],
    createdAt: '2025-02-01',
  },
  {
    id: 3,
    title: 'Yelken Yarışı Hazırlık Kampı',
    slug: 'yelken-yarisi-hazirlik-kampi',
    category: 'Yelken',
    description: 'Ulusal yelken yarışlarına hazırlık için yoğun antrenman kampı.',
    longDescription: 'Deneyimli yarışçılar için özel olarak tasarlanmış 5 günlük yoğun antrenman kampı. Yarış stratejileri, teknik analiz ve pratik uygulamalar.',
    organizerId: 3,
    organizerName: 'Deniz Yıldızı Akademi',
    organizerType: 'club',
    organizerSlug: 'denizyildiziakademi',
    organizerAvatar: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
    ],
    location: 'İzmir',
    address: 'Alaçatı Marina, İzmir',
    coordinates: { lat: 38.4237, lng: 27.1428 },
    startDate: '2025-05-20',
    endDate: '2025-05-24',
    startTime: '08:00',
    endTime: '18:00',
    type: 'paid',
    price: 5500,
    currency: 'TRY',
    level: 'advanced',
    capacity: 15,
    registered: 12,
    status: 'upcoming',
    features: ['Profesyonel Antrenörler', 'Video Analiz', 'Yarış Simülasyonu', 'Konaklama'],
    requirements: ['İleri seviye yelken bilgisi', 'Yarış deneyimi', 'Kendi ekipmanı'],
    includes: ['5 gün antrenman', 'Video analiz', 'Konaklama', '3 öğün yemek'],
    rating: 4.9,
    reviews: 18,
    certificate: true,
    weather: true,
    tags: ['Yelken', 'Yarış', 'İleri Seviye', 'Kamp'],
    createdAt: '2025-01-20',
  },
  {
    id: 4,
    title: 'Ücretsiz Dalış Tanıtım Günü',
    slug: 'ucretsiz-dalis-tanitim-gunu',
    category: 'Sualtı Sporları',
    description: 'Dalış sporunu tanımak isteyenler için ücretsiz deneme etkinliği.',
    longDescription: 'Dalış sporuna ilgi duyanlar için havuzda ücretsiz tanıtım etkinliği. Temel ekipman tanıtımı ve havuzda deneme dalışı yapılacaktır.',
    organizerId: 2,
    organizerName: 'Umut Diner',
    organizerType: 'trainer',
    organizerSlug: 'umutdiner',
    organizerAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80',
    ],
    location: 'Antalya',
    address: 'Konyaaltı Dalış Merkezi, Antalya',
    coordinates: { lat: 36.8969, lng: 30.7133 },
    startDate: '2025-04-12',
    endDate: '2025-04-12',
    startTime: '10:00',
    endTime: '16:00',
    type: 'free',
    price: 0,
    currency: 'TRY',
    level: 'beginner',
    capacity: 20,
    registered: 15,
    status: 'upcoming',
    features: ['Ücretsiz', 'Ekipman Dahil', 'Profesyonel Eğitmen', 'Havuz Dalışı'],
    requirements: ['Yüzme bilmek', 'Sağlık raporu'],
    includes: ['Temel eğitim', 'Ekipman kullanımı', 'Havuz dalışı', 'Sertifika indirimi'],
    rating: 4.7,
    reviews: 32,
    certificate: false,
    weather: false,
    tags: ['Dalış', 'Ücretsiz', 'Tanıtım', 'Başlangıç'],
    createdAt: '2025-02-10',
    reviewsList: [
      {
        id: 1,
        userId: 101,
        userName: 'Ayşe Yılmaz',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment: 'Harika bir deneyimdi! Umut hoca çok sabırlı ve bilgiliydi. Dalış ekipmanlarını tanıma fırsatı buldum ve havuzda ilk dalışımı yaptım. Kesinlikle tavsiye ederim.',
        date: '2024-11-10',
        helpful: 12,
      },
      {
        id: 2,
        userId: 102,
        userName: 'Mehmet Kaya',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment: 'Ücretsiz bir etkinlik olmasına rağmen çok profesyonelce organize edilmişti. Tüm ekipmanlar sağlandı ve güvenlik önlemleri mükemmeldi. Dalış sporuna başlamak için harika bir giriş.',
        date: '2024-11-09',
        helpful: 8,
      },
      {
        id: 3,
        userId: 103,
        userName: 'Zeynep Demir',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        rating: 4,
        comment: 'Çok güzel bir deneyimdi. Sadece havuz dalışı olduğu için biraz kısa geldi ama tanıtım için yeterli. Umut hocanın anlatımı çok açıklayıcıydı.',
        date: '2024-11-08',
        helpful: 5,
      },
      {
        id: 4,
        userId: 104,
        userName: 'Can Özkan',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment: 'Dalış sporuna merak salmıştım ama pahalı olduğunu düşünüyordum. Bu etkinlik sayesinde ücretsiz deneme fırsatı buldum ve çok beğendim. Artık sertifika programına kayıt olmayı düşünüyorum.',
        date: '2024-11-07',
        helpful: 15,
      },
      {
        id: 5,
        userId: 105,
        userName: 'Elif Arslan',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        rating: 4,
        comment: 'Organizasyon güzeldi, eğitmen çok yardımcı oldu. Tek eksi yanı çok kalabalıktı, biraz daha az katılımcı olsaydı daha iyi olurdu.',
        date: '2024-11-06',
        helpful: 3,
      },
    ],
  },
  {
    id: 5,
    title: 'Sutopu Turnuvası',
    slug: 'sutopu-turnuvasi',
    category: 'Sutopu',
    description: 'Amatör takımlar için hafta sonu sutopu turnuvası.',
    longDescription: 'Şehir içi amatör sutopu takımları için düzenlenen dostluk turnuvası. Kazanan takıma kupa ve madalya verilecektir.',
    organizerId: 5,
    organizerName: 'Mavi Dalga Spor Kulübü',
    organizerType: 'club',
    organizerSlug: 'mavidalgasporkulubu',
    organizerAvatar: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1920&q=80',
    gallery: [],
    location: 'Bursa',
    address: 'Nilüfer Olimpik Yüzme Havuzu, Bursa',
    coordinates: { lat: 40.1826, lng: 29.0665 },
    startDate: '2025-05-10',
    endDate: '2025-05-11',
    startTime: '09:00',
    endTime: '18:00',
    type: 'paid',
    price: 1200,
    currency: 'TRY',
    level: 'intermediate',
    capacity: 8,
    registered: 6,
    status: 'upcoming',
    features: ['Turnuva', 'Kupa & Madalya', 'Hakem Hizmeti', 'Canlı Skor'],
    requirements: ['Takım kaydı (7 kişi)', 'Amatör seviye'],
    includes: ['2 gün turnuva', 'Hakem hizmeti', 'Kupa & madalya', 'Fotoğraf çekimi'],
    rating: 4.6,
    reviews: 12,
    certificate: false,
    weather: false,
    tags: ['Sutopu', 'Turnuva', 'Takım', 'Yarışma'],
    createdAt: '2025-01-25',
  },
  {
    id: 6,
    title: 'Triatlon Başlangıç Eğitimi',
    slug: 'triatlon-baslangic-egitimi',
    category: 'Triatlon',
    description: 'Triatlon sporuna başlamak isteyenler için 8 haftalık eğitim programı.',
    longDescription: 'Yüzme, bisiklet ve koşu disiplinlerini birleştiren triatlon sporuna başlamak isteyenler için kapsamlı eğitim programı. Haftada 3 gün antrenman.',
    organizerId: 8,
    organizerName: 'Zeynep Demir',
    organizerType: 'trainer',
    organizerSlug: 'zeynepdemir',
    organizerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
    ],
    location: 'Adana',
    address: 'Adana Spor Kompleksi',
    coordinates: { lat: 37.0000, lng: 35.3213 },
    startDate: '2025-06-01',
    endDate: '2025-07-26',
    startTime: '18:00',
    endTime: '20:00',
    type: 'paid',
    price: 2800,
    currency: 'TRY',
    level: 'beginner',
    capacity: 15,
    registered: 9,
    status: 'upcoming',
    features: ['8 Hafta Program', 'Kişisel Takip', 'Beslenme Danışmanlığı', 'Sertifika'],
    requirements: ['Temel kondisyon', 'Yüzme bilmek', 'Bisiklet sahibi olmak'],
    includes: ['24 antrenman seansı', 'Kişisel program', 'Beslenme planı', 'Sertifika'],
    rating: 4.9,
    reviews: 28,
    certificate: true,
    weather: false,
    tags: ['Triatlon', 'Başlangıç', 'Eğitim', 'Program'],
    createdAt: '2025-02-05',
  },
  {
    id: 7,
    title: 'Açık Deniz Yüzme Maratonu',
    slug: 'acik-deniz-yuzme-maratonu',
    category: 'Yüzme',
    description: '5km açık deniz yüzme yarışması. Deneyimli yüzücüler için.',
    longDescription: 'Akdeniz\'in berrak sularında düzenlenen 5km açık deniz yüzme maratonu. Tüm güvenlik önlemleri alınmıştır.',
    organizerId: 7,
    organizerName: 'Akdeniz Yüzme Okulu',
    organizerType: 'club',
    organizerSlug: 'akdenizyuzmeokulu',
    organizerAvatar: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?auto=format&fit=crop&w=800&q=80',
    ],
    location: 'Mersin',
    address: 'Kızkalesi Plajı, Mersin',
    coordinates: { lat: 36.8121, lng: 34.6415 },
    startDate: '2025-08-15',
    endDate: '2025-08-15',
    startTime: '07:00',
    endTime: '12:00',
    type: 'paid',
    price: 350,
    currency: 'TRY',
    level: 'advanced',
    capacity: 100,
    registered: 67,
    status: 'upcoming',
    features: ['Güvenlik Ekibi', 'Medikal Destek', 'Zamanlama Sistemi', 'Madalya'],
    requirements: ['İleri seviye yüzme', 'Sağlık raporu', 'Açık deniz deneyimi'],
    includes: ['Yarış numarası', 'Zamanlama çipi', 'Finisher madalyası', 'Yemek'],
    rating: 4.8,
    reviews: 56,
    certificate: true,
    weather: true,
    tags: ['Yüzme', 'Maraton', 'Açık Deniz', 'Yarış'],
    createdAt: '2025-01-10',
  },
  {
    id: 8,
    title: 'Kürek Teknik Atölyesi',
    slug: 'kurek-teknik-atolyesi',
    category: 'Kürek',
    description: 'Kürek tekniğini geliştirmek isteyenler için özel atölye.',
    longDescription: 'Video analiz ve bireysel geri bildirim ile kürek tekniğinizi geliştirin. Deneyimli antrenörler eşliğinde.',
    organizerId: 6,
    organizerName: 'Ahmet Yılmaz',
    organizerType: 'trainer',
    organizerSlug: 'ahmetyilmaz',
    organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?auto=format&fit=crop&w=1920&q=80',
    gallery: [],
    location: 'Eskişehir',
    address: 'Porsuk Barajı, Eskişehir',
    coordinates: { lat: 39.7767, lng: 30.5206 },
    startDate: '2025-05-05',
    endDate: '2025-05-05',
    startTime: '09:00',
    endTime: '17:00',
    type: 'paid',
    price: 850,
    currency: 'TRY',
    level: 'intermediate',
    capacity: 10,
    registered: 7,
    status: 'upcoming',
    features: ['Video Analiz', 'Bireysel Geri Bildirim', 'Teknik Eğitim', 'Öğle Yemeği'],
    requirements: ['Temel kürek bilgisi', 'Kendi ekipmanı'],
    includes: ['Video analiz', 'Kişisel rapor', 'Öğle yemeği', 'Eğitim materyali'],
    rating: 4.7,
    reviews: 15,
    certificate: false,
    weather: true,
    tags: ['Kürek', 'Teknik', 'Atölye', 'Eğitim'],
    createdAt: '2025-02-15',
  },
];

export function getEventBySlug(slug: string): Event | undefined {
  return mockEvents.find(event => event.slug === slug);
}

export function getEventsByCategory(category: string): Event[] {
  return mockEvents.filter(event => event.category === category);
}

export function getUpcomingEvents(): Event[] {
  return mockEvents.filter(event => event.status === 'upcoming');
}

export function getFeaturedEvents(): Event[] {
  return mockEvents.slice(0, 4);
}

export const eventLevelLabels: Record<EventLevel, string> = {
  beginner: 'Başlangıç',
  intermediate: 'Orta',
  advanced: 'İleri',
  professional: 'Profesyonel',
};

export const eventTypeLabels: Record<EventType, string> = {
  free: 'Ücretsiz',
  paid: 'Ücretli',
  donation: 'Bağış Bazlı',
};
