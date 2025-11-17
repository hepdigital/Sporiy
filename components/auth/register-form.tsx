'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Users, Building2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type UserType = 'sporcu' | 'kulup' | 'egitmen';

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>('sporcu');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    terms: false,
  });

  const userTypes = [
    { value: 'sporcu', label: 'Sporcu', icon: User, description: 'Ders ve etkinlik aramak için' },
    { value: 'kulup', label: 'Kulüp', icon: Building2, description: 'Kulüp yönetimi için' },
    { value: 'egitmen', label: 'Eğitmen', icon: GraduationCap, description: 'Özel ders vermek için' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.passwordConfirm) {
      alert('Şifreler eşleşmiyor!');
      return;
    }

    if (!formData.terms) {
      alert('Kullanım koşullarını kabul etmelisiniz!');
      return;
    }

    setIsLoading(true);

    // TODO: Backend entegrasyonu
    setTimeout(() => {
      // Kayıt sonrası ilgili panele yönlendir
      if (userType === 'sporcu') {
        router.push('/panel/sporcu');
      } else {
        router.push('/panel/profesyonel');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* User Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Hesap Tipi Seçin
        </label>
        <div className="grid grid-cols-3 gap-3">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setUserType(type.value as UserType)}
                className={`relative p-3 rounded-xl border-2 transition-all ${
                  userType === type.value
                    ? 'border-[#d6ff00] bg-[#d6ff00]/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`h-6 w-6 mx-auto mb-1 ${
                  userType === type.value ? 'text-black' : 'text-gray-600'
                }`} />
                <p className={`text-xs font-medium ${
                  userType === type.value ? 'text-black' : 'text-gray-600'
                }`}>
                  {type.label}
                </p>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-gray-500 text-center">
          {userTypes.find(t => t.value === userType)?.description}
        </p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          {userType === 'kulup' ? 'Kulüp Adı' : 'Ad Soyad'}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {userType === 'kulup' ? (
              <Building2 className="h-5 w-5 text-gray-400" />
            ) : (
              <User className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="pl-10"
            placeholder={userType === 'kulup' ? 'Kulüp Adı' : 'Ad Soyad'}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          E-posta Adresi
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="pl-10"
            placeholder="ornek@email.com"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Şifre
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="pl-10 pr-10"
            placeholder="En az 8 karakter"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Password Confirm */}
      <div>
        <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-2">
          Şifre Tekrar
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.passwordConfirm}
            onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
            className="pl-10"
            placeholder="Şifrenizi tekrar girin"
          />
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={formData.terms}
          onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
          className="h-4 w-4 mt-0.5 text-black border-gray-300 rounded focus:ring-black accent-black"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          <a href="/kullanim-kosullari" className="font-medium text-black hover:text-[#d6ff00]">
            Kullanım Koşulları
          </a>
          {' '}ve{' '}
          <a href="/gizlilik-politikasi" className="font-medium text-black hover:text-[#d6ff00]">
            Gizlilik Politikası
          </a>
          'nı okudum ve kabul ediyorum.
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-semibold"
      >
        {isLoading ? 'Hesap Oluşturuluyor...' : 'Hesap Oluştur'}
      </Button>
    </form>
  );
}
