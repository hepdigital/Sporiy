'use client';

import { useState, useEffect } from 'react';
import { LogIn, LogOut } from 'lucide-react';

// Sadece development için - production'da gösterilmeyecek
export function DevAuthToggle() {
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAuth(!!token);
  }, []);
  
  const toggleAuth = () => {
    if (isAuth) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_type');
      setIsAuth(false);
    } else {
      localStorage.setItem('auth_token', 'dev_token_' + Date.now());
      localStorage.setItem('user_type', 'sporcu');
      setIsAuth(true);
    }
    // Sayfayı yenile
    window.location.reload();
  };
  
  // Sadece development'ta göster
  // Geçici olarak her zaman göster (test için)
  // if (process.env.NODE_ENV === 'production') {
  //   return null;
  // }
  
  return (
    <button
      onClick={toggleAuth}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
      title={isAuth ? 'Çıkış Yap (Dev)' : 'Giriş Yap (Dev)'}
    >
      {isAuth ? (
        <>
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Çıkış (Dev)</span>
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4" />
          <span className="text-sm">Giriş (Dev)</span>
        </>
      )}
    </button>
  );
}
