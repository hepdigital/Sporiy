import { Users, Building2, GraduationCap, MapPin, Calendar, MessageCircle, Shield, Zap } from 'lucide-react';

const userTypes = [
  {
    icon: Users,
    title: 'Sporcular İçin',
    description: 'Size en uygun kulüp ve eğitmenleri bulun, derslerinizi planlayın.',
    features: ['Kolay Arama', 'Hızlı Rezervasyon', 'Güvenli İletişim']
  },
  {
    icon: Building2,
    title: 'Kulüpler İçin',
    description: 'Kulübünüzü tanıtın, yeni sporcular kazanın, etkinliklerinizi duyurun.',
    features: ['Profesyonel Profil', 'Kurs Yönetimi', 'İstatistikler']
  },
  {
    icon: GraduationCap,
    title: 'Eğitmenler İçin',
    description: 'Uzmanlığınızı sergileyin, özel dersler verin, gelir elde edin.',
    features: ['Kişisel Marka', 'Esnek Çalışma', 'Gelişmiş Özellikler']
  }
];

const platformFeatures = [
  {
    icon: MapPin,
    title: 'Harita Üzerinde Keşif',
    description: 'Konumunuza en yakın kulüp ve eğitmenleri harita üzerinde görün'
  },
  {
    icon: Calendar,
    title: 'Kolay Rezervasyon',
    description: 'Derslere anında kayıt olun, takvim entegrasyonu ile planınızı yapın'
  },
  {
    icon: MessageCircle,
    title: 'Site İçi Mesajlaşma',
    description: 'Eğitmenlerle güvenli bir şekilde direkt iletişim kurun'
  },
  {
    icon: Shield,
    title: 'Güvenli Platform',
    description: 'Doğrulanmış profiller ve güvenli ödeme altyapısı'
  }
];

export function Features() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* User Types */}
        <div className="text-center mb-16">
          <h2 className="mb-4">Herkes İçin Sporiy</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sporcular, kulüpler ve eğitmenler için tasarlanmış özel çözümler
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.title}
                className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#d6ff00] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#d6ff00] transition-colors">
                  <Icon className="h-7 w-7 text-[#d6ff00] group-hover:text-black transition-colors" />
                </div>
                
                <h3 className="text-gray-900 mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                
                <ul className="space-y-3">
                  {type.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-[#d6ff00] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-[#d6ff00] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Platform Features */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d6ff00]/10 border border-[#d6ff00]/30 rounded-full mb-6">
            <Zap className="h-4 w-4 text-[#d6ff00]" />
            <span className="text-sm text-gray-900">Platform Özellikleri</span>
          </div>
          <h2 className="mb-4">Modern Spor Deneyimi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Teknolojiyi spor dünyasıyla buluşturan akıllı özellikler
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-gray-900" />
                </div>
                <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}