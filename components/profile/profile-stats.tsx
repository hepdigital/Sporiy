import { Users, Star, Calendar, TrendingUp } from 'lucide-react';

type Profile = {
  followers: number;
  rating: number;
  reviews: number;
  experience: string;
};

export function ProfileStats({ profile }: { profile: Profile }) {
  const stats = [
    {
      icon: Users,
      label: 'Takipçi',
      value: profile.followers.toLocaleString('tr-TR'),
    },
    {
      icon: Star,
      label: 'Ortalama Puan',
      value: profile.rating.toFixed(1),
    },
    {
      icon: Calendar,
      label: 'Deneyim',
      value: profile.experience,
    },
    {
      icon: TrendingUp,
      label: 'Değerlendirme',
      value: profile.reviews,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">İstatistikler</h3>
      
      <div className="space-y-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="h-6 w-6 text-gray-900" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Contact */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Hızlı İletişim</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Genellikle 2 saat içinde yanıt verir</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>%95 yanıt oranı</span>
          </div>
        </div>
      </div>
    </div>
  );
}
