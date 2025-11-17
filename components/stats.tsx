import { Users, Building2, Calendar, Trophy } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Aktif Sporcu'
  },
  {
    icon: Building2,
    value: '250+',
    label: 'Spor Kulübü'
  },
  {
    icon: Trophy,
    value: '500+',
    label: 'Profesyonel Eğitmen'
  },
  {
    icon: Calendar,
    value: '5,000+',
    label: 'Aylık Etkinlik'
  }
];

export function Stats() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-white text-4xl sm:text-5xl font-bold">Türkiye&apos;nin Büyüyen Spor Topluluğu</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Her gün binlerce sporcu ve eğitmen Sporiy&apos;de buluşuyor
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 bg-white/10 hover:bg-[#d6ff00] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all">
                      <Icon className="h-8 w-8 text-white group-hover:text-black transition-colors" />
                    </div>
                    <div className="text-white mb-1 group-hover:text-[#d6ff00] transition-colors text-3xl font-bold">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
