import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';

export const metadata: Metadata = {
  title: 'Şifremi Unuttum - Sporiy',
  description: 'Şifrenizi sıfırlayın',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-6">
          <Image 
            src="/logo.svg" 
            alt="Sporiy" 
            width={150}
            height={48}
            className="h-12 w-auto"
          />
        </Link>

        <h2 className="text-center text-3xl font-bold text-gray-900">
          Şifremi Unuttum
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          E-posta adresinize şifre sıfırlama bağlantısı göndereceğiz
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10 border border-gray-200">
          <ForgotPasswordForm />
          
          <div className="mt-6 text-center">
            <Link
              href="/giris"
              className="text-sm font-medium text-black hover:text-[#d6ff00] transition-colors"
            >
              ← Giriş sayfasına dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
