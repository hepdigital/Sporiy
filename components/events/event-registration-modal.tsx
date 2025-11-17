'use client';

import { useState } from 'react';
import { X, Calendar, MapPin, Users, CreditCard, Check } from 'lucide-react';
import { Event } from '@/lib/events-data';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

type Props = {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
};

export function EventRegistrationModal({ event, isOpen, onClose }: Props) {
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [participants, setParticipants] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen) return null;

  const totalPrice = event.price * participants;
  const spotsLeft = event.capacity - event.registered;

  const handleRegister = () => {
    if (event.type === 'free') {
      setStep('success');
    } else {
      setStep('payment');
    }
  };

  const handlePayment = () => {
    // Simulate payment
    setTimeout(() => {
      setStep('success');
    }, 1000);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === 'info' && 'Etkinliğe Kayıt'}
            {step === 'payment' && 'Ödeme Bilgileri'}
            {step === 'success' && 'Kayıt Tamamlandı'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'info' && (
            <div className="space-y-6">
              {/* Event Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-3">{event.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{event.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{spotsLeft} yer kaldı</span>
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Katılımcı Sayısı
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    disabled={participants <= 1}
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-gray-900 w-12 text-center">
                    {participants}
                  </span>
                  <button
                    onClick={() => setParticipants(Math.min(spotsLeft, participants + 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    disabled={participants >= spotsLeft}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* What's Included */}
              {event.includes.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Dahil Olanlar</h4>
                  <ul className="space-y-2">
                    {event.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {event.requirements.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Gereksinimler</h4>
                  <ul className="space-y-2">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Terms */}
              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-black border-gray-300 rounded focus:ring-black accent-black"
                />
                <span className="text-sm text-gray-700">
                  Etkinlik katılım şartlarını ve iptal politikasını okudum, kabul ediyorum.
                </span>
              </label>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  {event.type === 'free' ? (
                    <span className="text-2xl font-bold text-green-600">Ücretsiz</span>
                  ) : (
                    <div>
                      <span className="text-sm text-gray-600">Toplam</span>
                      <div className="text-2xl font-bold text-gray-900">
                        {totalPrice.toLocaleString('tr-TR')} ₺
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleRegister}
                  disabled={!agreedToTerms || !isAuthenticated}
                  className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] px-8"
                >
                  {event.type === 'free' ? 'Kayıt Ol' : 'Ödemeye Geç'}
                </Button>
              </div>

              {!isAuthenticated && (
                <p className="text-sm text-center text-red-600">
                  Kayıt olmak için giriş yapmalısınız.
                </p>
              )}
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Etkinlik</span>
                  <span className="text-sm font-medium text-gray-900">{event.title}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Katılımcı</span>
                  <span className="text-sm font-medium text-gray-900">{participants} kişi</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-base font-semibold text-gray-900">Toplam</span>
                  <span className="text-xl font-bold text-gray-900">
                    {totalPrice.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Kart Üzerindeki İsim
                  </label>
                  <input
                    type="text"
                    placeholder="Ad Soyad"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Kart Numarası
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Son Kullanma
                    </label>
                    <input
                      type="text"
                      placeholder="AA/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('info')}
                  className="flex-1"
                >
                  Geri
                </Button>
                <Button
                  onClick={handlePayment}
                  className="flex-1 bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Ödemeyi Tamamla
                </Button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Kayıt Başarılı!
              </h3>
              <p className="text-gray-600 mb-6">
                Etkinliğe kaydınız başarıyla tamamlandı. Detaylar e-posta adresinize gönderildi.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Sonraki Adımlar</h4>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      E-postanızı kontrol edin ve QR kodunuzu kaydedin
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Etkinlik gününden önce hatırlatma alacaksınız
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      Rezervasyonlarım sayfasından detayları görüntüleyebilirsiniz
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Kapat
                </Button>
                <Button
                  onClick={() => window.location.href = '/panel/sporcu/rezervasyonlar'}
                  className="flex-1 bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
                >
                  Rezervasyonlarım
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
