import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Profil Bulunamadı</h1>
          <p className="text-gray-600 text-lg mb-8">
            Aradığınız profil mevcut değil veya kaldırılmış olabilir.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Ana Sayfaya Dön
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/kesfet">
              <Search className="h-5 w-5 mr-2" />
              Profil Ara
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
