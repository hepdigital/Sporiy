'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Calendar,
  Heart,
  Users,
  MessageCircle,
  Bell,
  CreditCard,
  Settings,
  X,
  Menu,
  BookOpen,
  BarChart3,
  Wallet,
  HelpCircle,
  Crown,
  Bookmark,
} from 'lucide-react';

type UserType = 'sporcu' | 'profesyonel' | 'admin';

type Props = {
  userType: UserType;
};

type MenuItem = {
  icon: any;
  label: string;
  href: string;
  badge?: number;
  highlight?: boolean;
};

// Menü yapılandırması
const menuConfig: Record<UserType, MenuItem[]> = {
  sporcu: [
    { icon: LayoutDashboard, label: 'Sosyal', href: '/sosyal' },
    { icon: User, label: 'Profilim', href: '/panel/sporcu/profil' },
    { icon: Calendar, label: 'Rezervasyonlarım', href: '/panel/sporcu/rezervasyonlar' },
    { icon: Heart, label: 'Favorilerim', href: '/panel/sporcu/favoriler' },
    { icon: Users, label: 'Takip Ettiklerim', href: '/panel/sporcu/takip' },
    { icon: Bookmark, label: 'Kaydedilenler', href: '/panel/sporcu/kaydedilenler' },
    { icon: MessageCircle, label: 'Mesajlar', href: '/panel/sporcu/mesajlar', badge: 3 },
    { icon: Bell, label: 'Bildirimler', href: '/panel/sporcu/bildirimler', badge: 5 },
    { icon: CreditCard, label: 'Ödemeler', href: '/panel/sporcu/odemeler' },
    { icon: Settings, label: 'Ayarlar', href: '/panel/sporcu/ayarlar' },
  ],
  profesyonel: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/panel/profesyonel' },
    { icon: User, label: 'Profilim', href: '/panel/profesyonel/profil' },
    { icon: BookOpen, label: 'Kurslarım', href: '/panel/profesyonel/kurslar' },
    { icon: Calendar, label: 'Rezervasyonlar', href: '/panel/profesyonel/rezervasyonlar', badge: 2 },
    { icon: Users, label: 'Öğrencilerim', href: '/panel/profesyonel/ogrenciler' },
    { icon: MessageCircle, label: 'Mesajlar', href: '/panel/profesyonel/mesajlar', badge: 5 },
    { icon: BarChart3, label: 'İstatistikler', href: '/panel/profesyonel/istatistikler' },
    { icon: HelpCircle, label: 'Soru & Cevap', href: '/panel/profesyonel/soru-cevap' },
    { icon: Wallet, label: 'Finansal', href: '/panel/profesyonel/finansal' },
    { icon: Bell, label: 'Bildirimler', href: '/panel/profesyonel/bildirimler' },
    { icon: Crown, label: 'Premium', href: '/panel/profesyonel/premium', highlight: true },
    { icon: Settings, label: 'Ayarlar', href: '/panel/profesyonel/ayarlar' },
  ],
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Kullanıcılar', href: '/admin/kullanicilar' },
    { icon: BookOpen, label: 'İçerik Yönetimi', href: '/admin/icerik' },
    { icon: BarChart3, label: 'Raporlar', href: '/admin/raporlar' },
    { icon: Settings, label: 'Ayarlar', href: '/admin/ayarlar' },
  ],
};

export function PanelSidebar({ userType }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuItems = menuConfig[userType];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-black text-white rounded-lg"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-black text-white transform transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#d6ff00] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">S</span>
              </div>
              <span className="font-semibold text-lg">sporiy</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-800 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${
                        isActive
                          ? 'bg-[#d6ff00] text-black'
                          : item.highlight
                          ? 'bg-[#d6ff00]/10 text-[#d6ff00] hover:bg-[#d6ff00]/20'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`ml-auto px-2 py-0.5 text-xs font-semibold rounded-full ${
                          isActive ? 'bg-black text-[#d6ff00]' : 'bg-[#d6ff00] text-black'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <Link
              href="/"
              className="block text-center text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
