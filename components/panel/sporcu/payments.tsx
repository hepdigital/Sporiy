'use client';

import { useState } from 'react';
import { CreditCard, Download, Calendar, CheckCircle, XCircle, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PaymentStatus = 'completed' | 'pending' | 'failed';

type Payment = {
  id: number;
  description: string;
  provider: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  method: string;
  invoiceUrl?: string;
};

type SavedCard = {
  id: number;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
};

export function SporcuPayments() {
  const [activeTab, setActiveTab] = useState<'history' | 'cards'>('history');

  const payments: Payment[] = [
    {
      id: 1,
      description: 'Yüzme Dersi',
      provider: 'Anka Yıldız Spor Kulübü',
      amount: 250,
      date: '15 Kasım 2024',
      status: 'completed',
      method: 'Kredi Kartı (**** 1234)',
      invoiceUrl: '#',
    },
    {
      id: 2,
      description: 'Kano Eğitimi',
      provider: 'Umut Diner',
      amount: 350,
      date: '10 Kasım 2024',
      status: 'completed',
      method: 'Kredi Kartı (**** 1234)',
      invoiceUrl: '#',
    },
    {
      id: 3,
      description: 'Yelken Kursu',
      provider: 'Deniz Yıldızı Akademi',
      amount: 500,
      date: '5 Kasım 2024',
      status: 'pending',
      method: 'Banka Transferi',
    },
  ];

  const savedCards: SavedCard[] = [
    {
      id: 1,
      last4: '1234',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: 2,
      last4: '5678',
      brand: 'Mastercard',
      expiryMonth: 6,
      expiryYear: 2026,
      isDefault: false,
    },
  ];

  const getStatusBadge = (status: PaymentStatus) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
    };

    const labels = {
      completed: 'Tamamlandı',
      pending: 'Beklemede',
      failed: 'Başarısız',
    };

    const icons = {
      completed: CheckCircle,
      pending: Clock,
      failed: XCircle,
    };

    const Icon = icons[status];

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        <Icon className="h-3 w-3" />
        {labels[status]}
      </span>
    );
  };

  const totalSpent = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ödemeler</h1>
        <p className="text-gray-600 mt-1">Ödeme geçmişinizi ve kayıtlı kartlarınızı yönetin</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Toplam Harcama</p>
          <p className="text-2xl font-bold text-gray-900">{totalSpent} ₺</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Bu Ay</p>
          <p className="text-2xl font-bold text-gray-900">600 ₺</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Bekleyen Ödeme</p>
          <p className="text-2xl font-bold text-gray-900">500 ₺</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-1 inline-flex">
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-black text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Ödeme Geçmişi
        </button>
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'cards'
              ? 'bg-black text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Kayıtlı Kartlar
        </button>
      </div>

      {/* Payment History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {payment.description}
                      </h3>
                      <p className="text-sm text-gray-600">{payment.provider}</p>
                    </div>
                    {getStatusBadge(payment.status)}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {payment.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {payment.method}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">{payment.amount} ₺</span>
                    </div>
                  </div>
                </div>

                {payment.invoiceUrl && payment.status === 'completed' && (
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Fatura İndir
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Saved Cards */}
      {activeTab === 'cards' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Kart Ekle
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {savedCards.map((card) => (
              <div
                key={card.id}
                className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl p-6 text-white relative overflow-hidden"
              >
                {card.isDefault && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-[#d6ff00] text-black text-xs font-semibold rounded">
                      Varsayılan
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <p className="text-sm text-gray-400 mb-1">{card.brand}</p>
                  <p className="text-xl font-mono">**** **** **** {card.last4}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Son Kullanma</p>
                    <p className="font-mono">
                      {String(card.expiryMonth).padStart(2, '0')}/{card.expiryYear}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!card.isDefault && (
                      <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/10">
                        Varsayılan Yap
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/10">
                      Sil
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
