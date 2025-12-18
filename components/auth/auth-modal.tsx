'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { X, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
};

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    userType: 'sporcu' as 'sporcu' | 'egitmen' | 'kulup'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Auth logic burada implement edilecek
    console.log('Auth submit:', { mode, formData });
    
    // Başarılı işlem sonrası modal'ı kapat
    onClose();
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      userType: 'sporcu'
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    resetForm();
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hesap Türü
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'sporcu', label: 'Sporcu' },
                    { value: 'egitmen', label: 'Eğitmen' },
                    { value: 'kulup', label: 'Kulüp' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, userType: type.value as any })}
                      className={`p-2 text-sm font-medium rounded-lg border-2 transition-colors ${
                        formData.userType === type.value
                          ? 'border-[#d6ff00] bg-[#d6ff00]/10 text-black'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Soyad
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
                    placeholder="Soyadınız"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
                  placeholder="0555 123 45 67"
                />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-posta
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
              placeholder="ornek@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
                placeholder="••••••••"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Şifre Tekrar
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
                  placeholder="••••••••"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Şifreler eşleşmiyor</p>
              )}
            </div>
          )}

          {/* Forgot Password Link (Login only) */}
          {mode === 'login' && (
            <div className="text-right">
              <Link 
                href="/sifremi-unuttum" 
                onClick={onClose}
                className="text-sm text-gray-600 hover:text-black transition-colors"
              >
                Şifremi Unuttum
              </Link>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-medium py-2.5"
            disabled={mode === 'register' && formData.password !== formData.confirmPassword}
          >
            {mode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
          </Button>

          {/* Terms (Register only) */}
          {mode === 'register' && (
            <p className="text-xs text-gray-500 text-center">
              Kayıt olarak{' '}
              <Link href="/kullanim-kosullari" className="text-black hover:underline">
                Kullanım Koşulları
              </Link>
              {' '}ve{' '}
              <Link href="/gizlilik-politikasi" className="text-black hover:underline">
                Gizlilik Politikası
              </Link>
              &apos;nı kabul etmiş olursunuz.
            </p>
          )}
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">veya</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => console.log('Google login')}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google ile {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}