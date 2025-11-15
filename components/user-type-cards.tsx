import { Button } from './ui/button';
import { ImageWithFallback } from './image-with-fallback';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function UserTypeCards() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Antrenör Card */}
          <div className="group relative bg-black rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d6ff00] rounded-full blur-3xl" />
            </div>

            <div className="relative p-8 md:p-10 lg:p-12">
              {/* Image Section */}
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-40 z-10" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80"
                  alt="Antrenör"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Badge */}
                <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-[#d6ff00] text-black rounded-full text-sm font-medium">
                  Antrenörler
                </div>
              </div>

              {/* Content */}
              <div className="text-white">
                <h2 className="mb-4 text-white text-3xl font-bold">Antrenör Müsün?</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Binlerce yeni öğrenciye ulaş, kendi derslerini ve programlarını oluştur. 
                  Profil güçlendır, spor kariyerine dijital dokunuş katma fırsatı yakalayabilirsin.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {['Profesyonel Profil Oluştur', 'Kendi Kurslarını Yönet', 'Gelir Elde Et'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-[#d6ff00] flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00] group/btn font-semibold"
                >
                  <span>KAYIT OL</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sporcu Card */}
          <div className="group relative bg-black rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d6ff00] rounded-full blur-3xl" />
            </div>

            <div className="relative p-8 md:p-10 lg:p-12">
              {/* Image Section */}
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-40 z-10" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80"
                  alt="Sporcu"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Badge */}
                <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-[#d6ff00] text-black rounded-full text-sm font-medium">
                  Sporcular
                </div>
              </div>

              {/* Content */}
              <div className="text-white">
                <h2 className="mb-4 text-white text-3xl font-bold">Sporcu Musun?</h2>
                <p className="text-gray-300 mb-6 text-lg">
                  İster yüzme, ister yelken, istersen kano... Uzman eğitmenlerin hazırladığı kursları keşfet. 
                  Tek tıkla randevuna al, hepsinden de alsana.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {['En İyi Kulüpleri Keşfet', 'Hızlı Rezervasyon Yap', 'İlerleme Takibi'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-[#d6ff00] flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00] group/btn font-semibold"
                >
                  <span>KAYIT OL</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
