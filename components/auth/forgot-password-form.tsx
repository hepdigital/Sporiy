'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Backend entegrasyonu
    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#d6ff00]/20 mb-4">
          <CheckCircle className="h-8 w-8 text-[#d6ff00]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          E-posta Gönderildi!
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          <span className="font-medium">{email}</span> adresine şifre sıfırlama bağlantısı gönderdik.
          Lütfen e-postanızı kontrol edin.
        </p>
        <p className="text-xs text-gray-500">
          E-posta gelmedi mi? Spam klasörünü kontrol edin veya birkaç dakika sonra tekrar deneyin.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            placeholder="ornek@email.com"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-semibold"
      >
        {isLoading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}
      </Button>
    </form>
  );
}
