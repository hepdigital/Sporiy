import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  platform: {
    title: 'Platform',
    links: [
      { name: 'Keşfet', href: '/kesfet' },
      { name: 'Kulüpler', href: '/kulupler' },
      { name: 'Eğitmenler', href: '/egitmenler' },
      { name: 'Harita', href: '/kesfet?view=map' }
    ]
  },
  company: {
    title: 'Kurumsal',
    links: [
      { name: 'Hakkımızda', href: '/hakkimizda' },
      { name: 'Blog', href: '/blog' },
      { name: 'Kariyer', href: '/kariyer' },
      { name: 'İletişim', href: '/iletisim' }
    ]
  },
  support: {
    title: 'Destek',
    links: [
      { name: 'Yardım Merkezi', href: '/yardim' },
      { name: 'Sıkça Sorulanlar', href: '/sss' },
      { name: 'Gizlilik Politikası', href: '/gizlilik' },
      { name: 'Kullanım Koşulları', href: '/kullanim-kosullari' }
    ]
  },
  premium: {
    title: 'Premium',
    links: [
      { name: 'Premium Üyelik', href: '/premium' },
      { name: 'Fiyatlandırma', href: '/fiyatlandirma' },
      { name: 'İşletme Çözümleri', href: '/isletme' },
      { name: 'API', href: '/api' }
    ]
  }
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' }
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image 
                src="/logo-white.svg" 
                alt="Sporiy" 
                width={150} 
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6 text-sm max-w-xs">
              Spor kulüpleri, eğitmenler ve sporcuları bir araya getiren profesyonel platform.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a href="mailto:info@sporiy.com" className="flex items-center gap-2 text-gray-400 hover:text-[#d6ff00] transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@sporiy.com</span>
              </a>
              <a href="tel:+905001234567" className="flex items-center gap-2 text-gray-400 hover:text-[#d6ff00] transition-colors">
                <Phone className="h-4 w-4" />
                <span>+90 (500) 123 45 67</span>
              </a>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Ankara, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-white mb-4 text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#d6ff00] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © 2025 Sporiy. Tüm hakları saklıdır.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#d6ff00] hover:text-black transition-all"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
