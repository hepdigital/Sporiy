import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d6ff00] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d6ff00] rounded-full blur-3xl" />
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d6ff00]/20 backdrop-blur-sm border border-[#d6ff00]/40 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-[#d6ff00]" />
              <span className="text-sm text-white font-medium">Şimdi Başla</span>
            </div>

            <h2 className="mb-6 text-white text-4xl sm:text-5xl font-bold">
              Spor Yolculuğunuza Bugün Başlayın
            </h2>
            
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Binlerce kulüp ve eğitmen arasından size en uygun olanı bulun. 
              Ücretsiz hesap oluşturun ve spor dünyasına adım atın.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] gap-2 group font-semibold"
              >
                <span>Ücretsiz Kayıt Ol</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black font-semibold"
              >
                Platform Turunu İzle
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Ücretsiz Başlangıç</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Kredi Kartı Gerektirmez</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>İstediğiniz Zaman İptal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
