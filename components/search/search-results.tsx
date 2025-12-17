'use client';

import { Building2, Users, BookOpen, Calendar, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

type Props = {
  query: string;
};

type SearchCategory = {
  id: string;
  title: string;
  icon: React.ReactNode;
  total: number;
  items: {
    name: string;
    count: number;
  }[];
  link: string;
};

export function SearchResults({ query }: Props) {
  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-gray-500">Arama yapmak için bir şehir adı girin</p>
        </div>
      </div>
    );
  }

  // Mock data - Backend'den gelecek
  const totalResults = query ? 1200 : 0;
  
  const categories: SearchCategory[] = [
    {
      id: 'clubs',
      title: 'Kulüpler',
      icon: <Building2 className="h-6 w-6" />,
      total: 123,
      items: [
        { name: 'Yüzme Kulübü', count: 37 },
        { name: 'Kano Kulübü', count: 7 },
        { name: 'Kürek Kulübü', count: 4 },
      ],
      link: '/kulupler',
    },
    {
      id: 'trainers',
      title: 'Eğitmenler',
      icon: <Users className="h-6 w-6" />,
      total: 7200,
      items: [
        { name: 'Antrenör', count: 1615 },
        { name: 'Diyetisyen', count: 160 },
        { name: 'Kondisyoner', count: 28 },
      ],
      link: '/egitmenler',
    },
    {
      id: 'courses',
      title: 'Kurslar',
      icon: <BookOpen className="h-6 w-6" />,
      total: 42,
      items: [
        { name: 'Yüzme Kursu', count: 19 },
        { name: 'Kano Kursu', count: 12 },
        { name: 'Yelken Kursu', count: 23 },
      ],
      link: '/kesfet',
    },
    {
      id: 'events',
      title: 'Etkinlikler',
      icon: <Calendar className="h-6 w-6" />,
      total: 129,
      items: [
        { name: 'Yüzme Etkinlikleri', count: 19 },
        { name: 'Kürek Etkinlikleri', count: 22 },
        { name: 'Kano Etkinlikleri', count: 17 },
      ],
      link: '/etkinlikler',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Results Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          &quot;{query}&quot; aramanız için {totalResults.toLocaleString('tr-TR')} sonuç bulundu!
        </h1>
        <p className="text-gray-600">
          Aşağıdaki kategorilerde sonuçlar bulundu
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-[#d6ff00]"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#d6ff00] rounded-xl flex items-center justify-center">
                {category.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">{category.title}</h2>
                <p className="text-sm text-gray-600">
                  {category.total.toLocaleString('tr-TR')} {category.title.toLowerCase()}
                </p>
              </div>
            </div>

            {/* Category Items */}
            <div className="space-y-3 mb-4">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    ({item.count})
                  </span>
                </div>
              ))}
            </div>

            {/* View All Link */}
            <Link
              href={
                category.id === 'clubs'
                  ? `/arama/kulupler?location=${encodeURIComponent(query)}`
                  : category.id === 'trainers'
                  ? `/arama/egitmenler?location=${encodeURIComponent(query)}`
                  : category.id === 'courses'
                  ? `/arama/kurslar?location=${encodeURIComponent(query)}`
                  : `/arama/etkinlikler?location=${encodeURIComponent(query)}`
              }
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-900 transition-colors group"
            >
              Tümünü Gör
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Card>
        ))}
      </div>

      {/* No Results Message */}
      {totalResults === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sonuç bulunamadı
          </h2>
          <p className="text-gray-600">
            &quot;{query}&quot; için herhangi bir sonuç bulunamadı. Lütfen farklı bir arama yapın.
          </p>
        </div>
      )}
    </div>
  );
}
