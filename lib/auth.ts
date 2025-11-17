import { useState, useEffect } from 'react';

// Authentication helper functions
// TODO: Gerçek authentication sistemi ile değiştirilecek

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Şimdilik localStorage kontrolü
  // Gerçek uygulamada JWT token, session vb. kontrol edilecek
  const token = localStorage.getItem('auth_token');
  return !!token;
}

// React hook for authentication
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'sporcu' | 'club' | 'trainer' | null>(null);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      if (typeof window === 'undefined') return;
      
      const token = localStorage.getItem('auth_token');
      const type = localStorage.getItem('user_type') as 'sporcu' | 'club' | 'trainer' | null;
      
      setIsAuthenticated(!!token);
      setUserType(type);
    };

    checkAuth();

    // Listen for storage changes (for multi-tab support)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return {
    isAuthenticated,
    userType,
  };
}

export function setAuthToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

export function removeAuthToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
}

export function getUserType(): 'sporcu' | 'club' | 'trainer' | null {
  if (typeof window === 'undefined') return null;
  
  // Şimdilik localStorage'dan user type al
  const userType = localStorage.getItem('user_type');
  return userType as 'sporcu' | 'club' | 'trainer' | null;
}

// Test için - geliştirme sırasında kullanılabilir
export function mockLogin(userType: 'sporcu' | 'club' | 'trainer' = 'sporcu') {
  setAuthToken('mock_token_' + Date.now());
  localStorage.setItem('user_type', userType);
}

export function mockLogout() {
  removeAuthToken();
  localStorage.removeItem('user_type');
}
