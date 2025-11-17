'use client';

import { Menu, X, User, Search, ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isProfilePage = pathname !== '/';

  return (
    <header className={`${isProfilePage ? '' : 'sticky top-0'} z-[9999] bg-white border-b border-gray-100`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-[#d6ff00] font-bold">S</span>
              </div>
              <span className="text-black font-semibold">sporiy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <Link 
              href="/sosyal" 
              className="flex items-center gap-2 px-4 py-2 bg-[#d6ff00] text-black hover:bg-[#c5ee00] rounded-lg font-semibold transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Sosyal
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-900 hover:text-[#d6ff00] transition-colors py-2">
                Keşfet
                <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mega Menu Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[10000]">
                  <div className="w-[600px] bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Column 1 - Spor Dalları */}
                      <div>
                        <h3 className="text-gray-900 mb-4 text-sm uppercase tracking-wide font-semibold">Spor Dalları</h3>
                        <div className="space-y-2">
                        {[
                          { name: 'Yüzme', slug: 'yuzme' },
                          { name: 'Kano', slug: 'kano' },
                          { name: 'Kürek', slug: 'kurek' },
                          { name: 'Yelken', slug: 'yelken' },
                          { name: 'Sutopu', slug: 'sutopu' },
                          { name: 'Sualtı Sporları', slug: 'sualti-sporlari' }
                        ].map((sport) => (
                          <Link
                            key={sport.slug}
                            href={`/kategori/${sport.slug}`}
                            className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#d6ff00] rounded-lg transition-colors text-sm"
                          >
                            {sport.name}
                          </Link>
                        ))}
                        </div>
                      </div>

                      {/* Column 2 - Hızlı Erişim */}
                      <div>
                        <h3 className="text-gray-900 mb-4 text-sm uppercase tracking-wide font-semibold">Hızlı Erişim</h3>
                        <div className="space-y-2">
                        <Link href="/kesfet" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#d6ff00] rounded-lg transition-colors text-sm">
                          Harita Görünümü
                        </Link>
                        <Link href="/kesfet?yakin=true" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#d6ff00] rounded-lg transition-colors text-sm">
                          Yakınımdakiler
                        </Link>
                        <Link href="/kesfet?siralama=populer" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#d6ff00] rounded-lg transition-colors text-sm">
                          En Popüler
                        </Link>
                        <Link href="/kesfet?siralama=yeni" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#d6ff00] rounded-lg transition-colors text-sm">
                          En Yeni İlanlar
                        </Link>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <Link href="/kesfet" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="w-10 h-10 bg-[#d6ff00] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Search className="h-5 w-5 text-black" />
                        </div>
                        <div>
                          <div className="text-gray-900 text-sm font-medium">Gelişmiş Arama</div>
                          <div className="text-gray-500 text-xs">Filtrelerle detaylı arama yapın</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link href="/kulupler" className="text-gray-900 hover:text-[#d6ff00] transition-colors m-0">
              Kulüpler
            </Link>
            <Link href="/egitmenler" className="text-gray-900 hover:text-[#d6ff00] transition-colors m-0">
              Eğitmenler
            </Link>
            <Link href="/etkinlikler" className="text-gray-900 hover:text-[#d6ff00] transition-colors m-0">
              Etkinlikler
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Search className="h-4 w-4" />
              <span>Ara</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span>Giriş Yap</span>
            </Button>
            <Button size="sm" className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
              Kayıt Ol
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/sosyal" 
                className="flex items-center gap-2 px-4 py-2 bg-[#d6ff00] text-black hover:bg-[#c5ee00] rounded-lg font-semibold transition-colors w-fit"
              >
                <MessageCircle className="h-4 w-4" />
                Sosyal
              </Link>
              <Link href="/kesfet" className="text-gray-900 hover:text-[#d6ff00] transition-colors">
                Keşfet
              </Link>
              <Link href="/kulupler" className="text-gray-900 hover:text-[#d6ff00] transition-colors">
                Kulüpler
              </Link>
              <Link href="/egitmenler" className="text-gray-900 hover:text-[#d6ff00] transition-colors">
                Eğitmenler
              </Link>
              <Link href="/etkinlikler" className="text-gray-900 hover:text-[#d6ff00] transition-colors">
                Etkinlikler
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <User className="h-4 w-4" />
                  <span>Giriş Yap</span>
                </Button>
                <Button size="sm" className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
                  Kayıt Ol
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
