import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Kayıt Ol - Sporiy',
  description: 'Sporiy\'e ücretsiz kayıt olun',
};

export default function RegisterPage() {
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
          Hesap Oluştur
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Zaten hesabın var mı?{' '}
          <Link href="/giris" className="font-medium text-black hover:text-[#d6ff00] transition-colors">
            Giriş Yap
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10 border border-gray-200">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
