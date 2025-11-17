'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  Users, 
  Heart, 
  TrendingUp,
  Calendar,
  Award,
  ArrowRight,
  Star
} from 'lucide-react';

export function SocialLanding() {
  const features = [
    {
      icon: MessageCircle,
      title: 'Paylaşım Yap',
      description: 'Antrenmanlarını, başarılarını ve deneyimlerini topluluğunla paylaş',
    },
    {
      icon: Users,
      title: 'Bağlantı Kur',
      description: 'Sporcular, kulüpler ve eğitmenlerle tanış, takip et',
    },
    {
      icon: Calendar,
      title: 'Etkinliklere Katıl',
      description: 'Yarışmalar, antrenmanlar ve sosyal etkinlikleri keşfet',
    },
    {
      icon: Award,
      title: 'İlham Al',
      description: 'Başarı hikayelerini oku, motivasyon bul',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Aktif Kullanıcı' },
    { value: '50K+', label: 'Paylaşım' },
    { value: '200+', label: 'Kulüp & Eğitmen' },
    { value: '1000+', label: 'Etkinlik' },
  ];

  const testimonials = [
    {
      name: 'Ayşe Yılmaz',
      role: 'Yüzme Sporcusu',
      text: 'Sporiy sayesinde aynı hedeflere sahip sporcularla tanıştım. Motivasyonum arttı!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    },
    {
      name: 'Mehmet Kaya',
      role: 'Kano Antrenörü',
      text: 'Öğrencilerimle kolayca iletişim kuruyorum. Harika bir platform!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    },
    {
      name: 'Elif Demir',
      role: 'Triatlon Sporcusu',
      text: 'Antrenman programlarımı paylaşıyorum ve geri bildirim alıyorum. Çok faydalı!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d6ff00]/20 border border-[#d6ff00] rounded-full mb-6">
              <MessageCircle className="h-5 w-5 text-[#d6ff00]" />
              <span className="text-[#d6ff00] font-semibold">Su Sporları Topluluğu</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Spor Tutkunu
              <br />
              <span className="text-[#d6ff00]">Topluluğuna Katıl</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Binlerce sporcu, kulüp ve eğitmenle bağlantı kur. Deneyimlerini paylaş, 
              ilham al ve hedeflerine ulaş.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/kayit">
                <Button size="lg" className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-semibold gap-2 text-lg px-8">
                  Ücretsiz Başla
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/giris">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  Giriş Yap
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-800">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-[#d6ff00] mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neler Yapabilirsin?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sporiy ile spor deneyimini sosyalleştir
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 bg-[#d6ff00] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Preview Section - Organized Layout */}
      <div className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Topluluğun Nabzını Tut
            </h2>
            <p className="text-xl text-gray-600">
              Kulüpler, eğitmenler ve binlerce paylaşım
            </p>
          </div>

          {/* Profile Cards - Top Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {/* Club Card 1 */}
            <Link href="/kulupler" className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
              {/* Cover Image */}
              <div className="h-24 bg-gradient-to-br from-gray-800 to-black relative">
                <img 
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400" 
                  alt="Cover"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  {/* Profile Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=100" 
                    alt="Anka Yıldız SK"
                    className="w-14 h-14 rounded-full border-4 border-white -mt-10 shadow-lg object-cover relative z-10"
                  />
                  <div className="flex-1 mt-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#d6ff00] transition-colors text-sm">
                      Anka Yıldız SK
                    </h3>
                    <p className="text-xs text-gray-600">Yüzme Kulübü</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="font-bold text-gray-900">127</div>
                    <div className="text-gray-500">Gönderi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">3.4K</div>
                    <div className="text-gray-500">Takipçi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">234</div>
                    <div className="text-gray-500">Takip</div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Trainer Card 1 */}
            <Link href="/egitmenler" className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
              {/* Cover Image */}
              <div className="h-24 bg-gradient-to-br from-gray-800 to-black relative">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a1e5a3?w=400" 
                  alt="Cover"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="p-4 relative">
                <div className="flex items-start gap-3 mb-3">
                  {/* Profile Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100" 
                    alt="Umut Diner"
                    className="w-14 h-14 rounded-full border-4 border-white -mt-10 shadow-lg object-cover relative z-10"
                  />
                  <div className="flex-1 mt-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#d6ff00] transition-colors text-sm">
                      Umut Diner
                    </h3>
                    <p className="text-xs text-gray-600">Kano Eğitmeni</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">5.0</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="font-bold text-gray-900">89</div>
                    <div className="text-gray-500">Gönderi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">1.2K</div>
                    <div className="text-gray-500">Takipçi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">156</div>
                    <div className="text-gray-500">Takip</div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Club Card 2 */}
            <Link href="/kulupler" className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
              {/* Cover Image */}
              <div className="h-24 bg-gradient-to-br from-gray-800 to-black relative">
                <img 
                  src="https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400" 
                  alt="Cover"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="p-4 relative">
                <div className="flex items-start gap-3 mb-3">
                  {/* Profile Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100" 
                    alt="Mavi Dalga SK"
                    className="w-14 h-14 rounded-full border-4 border-white -mt-10 shadow-lg object-cover relative z-10"
                  />
                  <div className="flex-1 mt-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#d6ff00] transition-colors text-sm">
                      Mavi Dalga SK
                    </h3>
                    <p className="text-xs text-gray-600">Sutopu Kulübü</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="font-bold text-gray-900">203</div>
                    <div className="text-gray-500">Gönderi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">4.5K</div>
                    <div className="text-gray-500">Takipçi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">312</div>
                    <div className="text-gray-500">Takip</div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Trainer Card 2 */}
            <Link href="/egitmenler" className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
              {/* Cover Image */}
              <div className="h-24 bg-gradient-to-br from-gray-800 to-black relative">
                <img 
                  src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400" 
                  alt="Cover"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              <div className="p-4 relative">
                <div className="flex items-start gap-3 mb-3">
                  {/* Profile Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" 
                    alt="Elif Kaya"
                    className="w-14 h-14 rounded-full border-4 border-white -mt-10 shadow-lg object-cover relative z-10"
                  />
                  <div className="flex-1 mt-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#d6ff00] transition-colors text-sm">
                      Elif Kaya
                    </h3>
                    <p className="text-xs text-gray-600">Sualtı Sporları</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">4.9</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="font-bold text-gray-900">156</div>
                    <div className="text-gray-500">Gönderi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">2.3K</div>
                    <div className="text-gray-500">Takipçi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">189</div>
                    <div className="text-gray-500">Takip</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Blur Posts - Bottom Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Post 1 */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent z-10" />
              <div className="blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-3 w-24 bg-gray-200 rounded mb-1" />
                    <div className="h-2 w-16 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
                <div className="h-40 bg-gray-200 rounded-lg mb-3" />
                <div className="flex gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-gray-300" />
                    <span className="text-gray-400">124</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-gray-300" />
                    <span className="text-gray-400">18</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post 2 - With CTA */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent z-10" />
              <div className="blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-3 w-24 bg-gray-200 rounded mb-1" />
                    <div className="h-2 w-16 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
                <div className="h-40 bg-gray-200 rounded-lg mb-3" />
                <div className="flex gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-gray-300" />
                    <span className="text-gray-400">89</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-gray-300" />
                    <span className="text-gray-400">12</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Link href="/kayit">
                  <Button className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-semibold shadow-xl">
                    Devamını Gör
                  </Button>
                </Link>
              </div>
            </div>

            {/* Post 3 */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent z-10" />
              <div className="blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-3 w-24 bg-gray-200 rounded mb-1" />
                    <div className="h-2 w-16 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
                <div className="h-40 bg-gray-200 rounded-lg mb-3" />
                <div className="flex gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-gray-300" />
                    <span className="text-gray-400">156</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4 text-gray-300" />
                    <span className="text-gray-400">24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Ve daha fazlası seni bekliyor...
            </p>
            <Link href="/kayit">
              <Button size="lg" className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-semibold">
                Hemen Katıl
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Kullanıcılarımız Ne Diyor?
            </h2>
            <p className="text-gray-600">Binlerce mutlu kullanıcıdan bazıları</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#d6ff00] transition-all hover:shadow-lg"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="h-16 w-16 text-[#d6ff00] mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Topluluğa Katılmaya Hazır Mısın?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Binlerce sporcu seni bekliyor. Hemen ücretsiz hesap oluştur!
          </p>
          <Link href="/kayit">
            <Button size="lg" className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-semibold gap-2 text-lg px-12">
              Ücretsiz Başla
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
