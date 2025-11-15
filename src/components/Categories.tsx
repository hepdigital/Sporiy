import { Waves, Ship, Anchor, Trophy, Fish, Users, Activity, Target } from 'lucide-react';

const categories = [
  { name: 'Yüzme', icon: Waves },
  { name: 'Kano', icon: Ship },
  { name: 'Kürek', icon: Anchor },
  { name: 'Yelken', icon: Activity },
  { name: 'Sutopu', icon: Trophy },
  { name: 'Sualtı Sporları', icon: Fish },
  { name: 'Triatlon', icon: Users },
  { name: 'Modern Pentatlon', icon: Target },
];

export function Categories() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-4xl sm:text-5xl">Spor Dalları</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Su sporları dünyasında uzmanlaşmış kulüp ve eğitmenlerle tanışın
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                className="group relative p-6 bg-white rounded-2xl border border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gray-50 group-hover:bg-black rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon className="h-7 w-7 text-gray-900 group-hover:text-[#d6ff00] transition-colors" />
                </div>
                <h3 className="text-gray-900 transition-colors">
                  {category.name}
                </h3>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-black opacity-0 group-hover:opacity-5 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}