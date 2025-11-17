export type SportCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  heroImage: string;
  stats: {
    clubs: number;
    trainers: number;
    totalProfiles: number;
  };
  seoContent: {
    title: string;
    content: string;
  };
};

export const sportCategories: SportCategory[] = [
  {
    id: 'yuzme',
    name: 'Yüzme',
    slug: 'yuzme',
    description: 'Profesyonel yüzme eğitmenleri ve kulüpleri ile tanışın. Başlangıçtan olimpik seviyeye kadar tüm seviyelerde eğitim.',
    icon: '🏊',
    heroImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1920&q=80',
    stats: {
      clubs: 45,
      trainers: 128,
      totalProfiles: 173,
    },
    seoContent: {
      title: 'Türkiye\'nin En İyi Yüzme Kulüpleri ve Eğitmenleri',
      content: 'Yüzme, hem sağlıklı yaşam hem de profesyonel spor kariyeri için mükemmel bir seçenektir. Sporiy platformunda Türkiye\'nin dört bir yanından 45\'ten fazla yüzme kulübü ve 128 profesyonel yüzme eğitmeni ile tanışabilirsiniz. İster çocuğunuz için yüzme kursu arıyor olun, ister kendiniz için profesyonel antrenman programı, Sporiy\'de size en uygun seçeneği bulabilirsiniz. Platformumuzda yer alan tüm kulüp ve eğitmenler, deneyimli, sertifikalı ve kullanıcı değerlendirmeleriyle onaylanmış profesyonellerdir. Harita üzerinde konumunuza en yakın yüzme havuzlarını keşfedin, fiyatları karşılaştırın ve hemen rezervasyon yapın.',
    },
  },
  {
    id: 'kano',
    name: 'Kano',
    slug: 'kano',
    description: 'Kano sporunda uzman eğitmenler ve kulüplerle buluşun. Sprint kanodan maraton kanoya tüm disiplinler.',
    icon: '🛶',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?auto=format&fit=crop&w=1920&q=80',
    stats: {
      clubs: 23,
      trainers: 67,
      totalProfiles: 90,
    },
    seoContent: {
      title: 'Kano Eğitmenleri ve Kulüpleri',
      content: 'Kano sporu, doğayla iç içe olmayı seven ve fiziksel dayanıklılığını geliştirmek isteyen sporcular için ideal bir branştır. Sporiy\'de 23 kano kulübü ve 67 profesyonel kano eğitmeni ile tanışabilirsiniz. Sprint kano, maraton kano veya rekreasyonel kano - hangi disiplini tercih ederseniz edin, size uygun eğitmeni bulabilirsiniz.',
    },
  },
  {
    id: 'kurek',
    name: 'Kürek',
    slug: 'kurek',
    description: 'Kürek sporunda deneyimli antrenörler ve kulüplerle tanışın. Teknik ve kondisyon odaklı eğitimler.',
    icon: '🚣',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a1e5a3?auto=format&fit=crop&w=1920&q=80',
    stats: {
      clubs: 18,
      trainers: 52,
      totalProfiles: 70,
    },
    seoContent: {
      title: 'Kürek Sporu Eğitmenleri ve Kulüpleri',
      content: 'Kürek sporu, üst vücut gücü ve dayanıklılık gerektiren olimpik bir branştır. Sporiy platformunda 18 kürek kulübü ve 52 deneyimli antrenör ile tanışabilirsiniz. Teknik analiz, kondisyon programları ve yarış hazırlığı konusunda uzman eğitmenlerle çalışın.',
    },
  },
  {
    id: 'yelken',
    name: 'Yelken',
    slug: 'yelken',
    description: 'Yelken sporunda uzman eğitmenler ve okullarla buluşun. Başlangıçtan yarış seviyesine kadar eğitim.',
    icon: '⛵',
    heroImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1920&q=80',
    stats: {
      clubs: 31,
      trainers: 89,
      totalProfiles: 120,
    },
    seoContent: {
      title: 'Yelken Okulları ve Eğitmenleri',
      content: 'Yelken sporu, denizcilik bilgisi ve teknik beceri gerektiren muhteşem bir branştır. Türkiye\'nin en iyi yelken okulları ve 89 profesyonel eğitmen Sporiy\'de. Başlangıç seviyesinden yarış yelkenciliğine kadar tüm seviyelerde eğitim alabilirsiniz.',
    },
  },
  {
    id: 'sutopu',
    name: 'Sutopu',
    slug: 'sutopu',
    description: 'Sutopu kulüpleri ve eğitmenleriyle tanışın. Takım sporları ve bireysel gelişim programları.',
    icon: '🤽',
    heroImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1920&q=80',
    stats: {
      clubs: 27,
      trainers: 73,
      totalProfiles: 100,
    },
    seoContent: {
      title: 'Sutopu Kulüpleri ve Antrenörleri',
      content: 'Sutopu, takım ruhu ve bireysel yetenek gerektiren dinamik bir su sporudur. Sporiy\'de 27 sutopu kulübü ve 73 profesyonel antrenör bulabilirsiniz. Çocuk gruplarından profesyonel takımlara kadar her seviyede eğitim programları mevcuttur.',
    },
  },
  {
    id: 'sualti-sporlari',
    name: 'Sualtı Sporları',
    slug: 'sualti-sporlari',
    description: 'Dalış, apne ve sualtı sporlarında uzman eğitmenlerle tanışın. PADI, SSI sertifikalı eğitimler.',
    icon: '🤿',
    heroImage: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1920&q=80',
    stats: {
      clubs: 34,
      trainers: 95,
      totalProfiles: 129,
    },
    seoContent: {
      title: 'Dalış ve Sualtı Sporları Eğitmenleri',
      content: 'Sualtı dünyasını keşfetmek için PADI ve SSI sertifikalı 95 profesyonel dalış eğitmeni Sporiy\'de sizleri bekliyor. Tüplü dalış, apne, sualtı fotoğrafçılığı ve daha fazlası için 34 dalış merkezi ve eğitmen ile tanışın.',
    },
  },
  {
    id: 'triatlon',
    name: 'Triatlon',
    slug: 'triatlon',
    description: 'Triatlon ve dayanıklılık sporlarında uzman antrenörlerle tanışın. Yüzme, bisiklet ve koşu eğitimleri.',
    icon: '🏃',
    heroImage: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1920&q=80',
    stats: {
      clubs: 19,
      trainers: 56,
      totalProfiles: 75,
    },
    seoContent: {
      title: 'Triatlon Antrenörleri ve Kulüpleri',
      content: 'Triatlon, yüzme, bisiklet ve koşuyu birleştiren zorlu ama ödüllendirici bir spor dalıdır. Sporiy platformunda 19 triatlon kulübü ve 56 uzman antrenör ile tanışabilirsiniz. Sprint mesafeden Ironman\'e kadar her seviyede eğitim programları bulabilirsiniz.',
    },
  },
  {
    id: 'modern-pentatlon',
    name: 'Modern Pentatlon',
    slug: 'modern-pentatlon',
    description: 'Modern pentatlon sporunda uzman eğitmenler ve kulüplerle buluşun. Beş disiplinde profesyonel eğitim.',
    icon: '🏅',
    heroImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1920&q=80',
    stats: {
      clubs: 12,
      trainers: 34,
      totalProfiles: 46,
    },
    seoContent: {
      title: 'Modern Pentatlon Eğitmenleri',
      content: 'Modern pentatlon, eskrim, yüzme, binicilik, atıcılık ve koşudan oluşan olimpik bir spor dalıdır. Sporiy\'de 12 modern pentatlon kulübü ve 34 uzman eğitmen ile beş farklı disiplinde profesyonel eğitim alabilirsiniz.',
    },
  },
];

export function getCategoryBySlug(slug: string): SportCategory | undefined {
  return sportCategories.find(cat => cat.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return sportCategories.map(cat => cat.slug);
}
