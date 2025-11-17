'use client';

import { useEffect, useState } from 'react';
import { SporcuDashboard } from '@/components/panel/sporcu/dashboard';
import { SocialLanding } from './social-landing';

export function SocialFeed() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d6ff00]"></div>
      </div>
    );
  }

  // Giriş yaptıysa dashboard göster
  if (isAuthenticated) {
    return <SporcuDashboard />;
  }

  // Giriş yapmadıysa landing page göster
  return <SocialLanding />;
}
