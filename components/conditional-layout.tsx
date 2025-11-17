'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { PanelSidebar } from './panel/panel-sidebar';
import { PanelHeader } from './panel/panel-header';
import { ReactNode, useState, useEffect } from 'react';

export function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Authentication kontrolü
  useEffect(() => {
    // Client-side'da auth durumunu kontrol et
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        setIsAuthenticated(!!token);
      }
    };
    
    checkAuth();
    
    // Storage event listener - başka tab'da login/logout olursa
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);
  
  // Panel sayfaları her zaman panel layout
  const isPanelPage = pathname?.startsWith('/panel');
  
  // Auth sayfaları (giriş, kayıt) - sadece içerik
  const isAuthPage = pathname?.startsWith('/giris') || 
                     pathname?.startsWith('/kayit') || 
                     pathname?.startsWith('/sifremi-unuttum');
  
  // Ana landing page - her zaman normal layout
  const isLandingPage = pathname === '/';
  
  // Profil sayfaları (dinamik route: /[slug])
  const isProfilePage = pathname && 
                        !pathname.startsWith('/panel') && 
                        !pathname.startsWith('/kategori') &&
                        !pathname.startsWith('/kesfet') &&
                        !pathname.startsWith('/kulupler') &&
                        !pathname.startsWith('/egitmenler') &&
                        !isAuthPage &&
                        pathname !== '/' &&
                        pathname.split('/').length === 2; // /username formatı
  
  // Diğer içerik sayfaları (sosyal, keşfet, kategoriler, kulüpler, eğitmenler, etkinlikler)
  // Giriş yaptıysa panel layout, yapmadıysa normal layout
  const isContentPage = pathname && (
    pathname.startsWith('/sosyal') ||
    pathname.startsWith('/kesfet') ||
    pathname.startsWith('/kategori') ||
    pathname.startsWith('/kulupler') ||
    pathname.startsWith('/egitmenler') ||
    pathname.startsWith('/etkinlikler')
  );
  
  // Panel sayfaları - her zaman panel layout
  if (isPanelPage) {
    return <>{children}</>;
  }
  
  // Auth sayfaları - sadece içerik
  if (isAuthPage) {
    return <>{children}</>;
  }
  
  // Landing page - her zaman normal layout
  if (isLandingPage) {
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    );
  }
  
  // İçerik sayfaları (keşfet, kategoriler, kulüpler, eğitmenler) - giriş durumuna göre
  if (isContentPage && isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PanelSidebar userType="sporcu" />
        <div className="lg:pl-64">
          <PanelHeader />
          <main className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    );
  }
  
  // Profil sayfaları - giriş durumuna göre
  if (isProfilePage && isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PanelSidebar userType="sporcu" />
        <div className="lg:pl-64">
          <PanelHeader />
          <main className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    );
  }
  
  // Diğer tüm sayfalar - normal layout
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
