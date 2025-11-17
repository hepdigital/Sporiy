'use client';

import { useState } from 'react';
import { Search, Bell, User, LogOut, Settings, HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function PanelHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mock user data
  const user = {
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    avatar: null,
  };

  const notifications = [
    { id: 1, text: 'Yeni rezervasyon talebi', time: '5 dk önce', unread: true },
    { id: 2, text: 'Profiliniz görüntülendi', time: '1 saat önce', unread: true },
    { id: 3, text: 'Yeni mesajınız var', time: '2 saat önce', unread: false },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[9999]">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left - Navigation Links */}
        <div className="flex items-center gap-6">
          {/* Sosyal Link */}
          <Link 
            href="/sosyal" 
            className="flex items-center gap-2 px-3 py-1.5 bg-[#d6ff00] text-black hover:bg-[#c5ee00] rounded-lg font-semibold transition-colors text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            Sosyal
          </Link>

          {/* Navigation with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors m-0 py-2">
              Keşfet
              <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Mega Menu Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 pt-2 z-[10000]">
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

          <Link href="/kulupler" className="text-sm font-medium text-gray-700 hover:text-black transition-colors m-0">
            Kulüpler
          </Link>
          <Link href="/egitmenler" className="text-sm font-medium text-gray-700 hover:text-black transition-colors m-0">
            Eğitmenler
          </Link>
          <Link href="/etkinlikler" className="text-sm font-medium text-gray-700 hover:text-black transition-colors m-0">
            Etkinlikler
          </Link>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-lg mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ara... (Cmd+K)"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Bildirimler</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <button
                      key={notif.id}
                      className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-start gap-3">
                        {notif.unread && (
                          <div className="w-2 h-2 bg-[#d6ff00] rounded-full mt-2 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{notif.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <Link
                    href="/panel/sporcu/bildirimler"
                    className="text-sm text-black hover:text-[#d6ff00] font-medium"
                  >
                    Tümünü Gör →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-900">
                {user.name}
              </span>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                </div>
                
                <div className="py-2">
                  <Link
                    href="/panel/sporcu/profil"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="h-4 w-4" />
                    Profilim
                  </Link>
                  <Link
                    href="/panel/sporcu/ayarlar"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4" />
                    Ayarlar
                  </Link>
                  <Link
                    href="/yardim"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Yardım
                  </Link>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  <button
                    onClick={() => {
                      // TODO: Logout logic
                      window.location.href = '/giris';
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    Çıkış Yap
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
