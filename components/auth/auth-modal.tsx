'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
};

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title=""
      size="sm"
    >
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <Image 
            src="/logo.svg" 
            alt="Sporiy" 
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'login' ? 'Hesabına Giriş Yap' : 'Hesap Oluştur'}
          </h2>
          <p className="text-sm text-gray-600">
            {mode === 'login' ? (
              <>
                Henüz hesabın yok mu?{' '}
                <button 
                  onClick={() => switchMode('register')}
                  className="font-medium text-black hover:text-[#d6ff00] transition-colors"
                >
                  Kayıt Ol
                </button>
              </>
            ) : (
              <>
                Zaten hesabın var mı?{' '}
                <button 
                  onClick={() => switchMode('login')}
                  className="font-medium text-black hover:text-[#d6ff00] transition-colors"
                >
                  Giriş Yap
                </button>
              </>
            )}
          </p>
        </div>

        {/* Form Content */}
        <div className="mt-6">
          {mode === 'login' ? (
            <LoginForm onSuccess={onClose} />
          ) : (
            <RegisterForm onSuccess={onClose} />
          )}
        </div>
      </div>
    </Modal>
  );
}