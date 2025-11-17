'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Building2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ReservationStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';
type ReservationType = 'course' | 'event';

type Reservation = {
  id: number;
  type: ReservationType;
  title: string;
  provider: string;
  providerType: 'club' | 'trainer';
  date: string;
  time: string;
  location: string;
  status: ReservationStatus;
  price: number;
  participants?: number;
};

export function SporcuReservations() {
  const [activeTab, setActiveTab] = useState<'active' | 'past' | 'cancelled'>('active');

  const reservations: Reservation[] = [
    {
      id: 1,
      type: 'course',
      title: 'Yüzme Dersi',
      provider: 'Anka Yıldız Spor Kulübü',
      providerType: 'club',
      date: '25 Kasım 2024',
      time: '14:00',
      location: 'Ankara',
      status: 'confirmed',
      price: 250,
    },
    {
      id: 2,
      type: 'course',
      title: 'Kano Eğitimi',
      provider: 'Umut Diner',
      providerType: 'trainer',
      date: '27 Kasım 2024',
      time: '10:00',
      location: 'İstanbul',
      status: 'pending',
      price: 350,
    },
    {
      id: 3,
      type: 'event',
      title: 'Yaz Yüzme Kampı 2025',
      provider: 'Anka Yıldız Spor Kulübü',
      providerType: 'club',
      date: '1 Temmuz 2025',
      time: '09:00',
      location: 'Ankara',
      status: 'confirmed',
      price: 3500,
      participants: 2,
    },
    {
      id: 4,
      type: 'course',
      title: 'Yelken Kursu',
      provider: 'Deniz Yıldızı Akademi',
      providerType: 'club',
      date: '30 Kasım 2024',
      time: '09:00',
      location: 'İzmir',
      status: 'confirmed',
      price: 500,
    },
  ];

  const pastReservations: Reservation[] = [
    {
      id: 5,
      type: 'course',
      title: 'Yüzme Dersi',
      provider: 'Anka Yıldız Spor Kulübü',
      providerType: 'club',
      date: '15 Kasım 2024',
      time: '14:00',
      location: 'Ankara',
      status: 'completed',
      price: 250,
    },
    {
      id: 6,
      type: 'event',
      title: 'Boğaz\'da Kano Turu',
      provider: 'Umut Diner',
      providerType: 'trainer',
      date: '10 Kasım 2024',
      time: '17:00',
      location: 'İstanbul',
      status: 'completed',
      price: 450,
      participants: 1,
    },
  ];

  const cancelledReservations: Reservation[] = [
    {
      id: 7,
      type: 'course',
      title: 'Sualtı Dalış',
      provider: 'Elif Kaya',
      providerType: 'trainer',
      date: '20 Kasım 2024',
      time: '11:00',
      location: 'Antalya',
      status: 'cancelled',
      price: 400,
    },
  ];

  const getStatusBadge = (status: ReservationStatus) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    const labels = {
      confirmed: 'Onaylandı',
      pending: 'Beklemede',
      completed: 'Tamamlandı',
      cancelled: 'İptal Edildi',
    };

    const icons = {
      confirmed: CheckCircle,
      pending: AlertCircle,
      completed: CheckCircle,
      cancelled: XCircle,
    };

    const Icon = icons[status];

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        <Icon className="h-3 w-3" />
        {labels[status]}
      </span>
    );
  };

  const currentReservations = 
    activeTab === 'active' ? reservations :
    activeTab === 'past' ? pastReservations :
    cancelledReservations;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rezervasyonlarım</h1>
        <p className="text-gray-600 mt-1">Tüm rezervasyonlarınızı buradan yönetin</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-1 inline-flex">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'active'
              ? 'bg-black text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Aktif ({reservations.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'past'
              ? 'bg-black text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Geçmiş ({pastReservations.length})
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'cancelled'
              ? 'bg-black text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          İptal Edilenler ({cancelledReservations.length})
        </button>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {currentReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {reservation.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      {reservation.providerType === 'club' ? (
                        <Building2 className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                      <span className="text-sm">{reservation.provider}</span>
                    </div>
                  </div>
                  {getStatusBadge(reservation.status)}
                </div>

                <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {reservation.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {reservation.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {reservation.location}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-semibold text-gray-900">
                      Ücret: {reservation.price} ₺
                    </p>
                    {reservation.participants && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {reservation.participants} Katılımcı
                      </span>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    reservation.type === 'event' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {reservation.type === 'event' ? 'Etkinlik' : 'Ders'}
                  </span>
                </div>
              </div>

              <div className="flex lg:flex-col gap-2">
                {reservation.status === 'confirmed' && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 lg:flex-none"
                    >
                      Detaylar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 lg:flex-none text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      İptal Et
                    </Button>
                  </>
                )}
                {reservation.status === 'pending' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 lg:flex-none"
                  >
                    Detaylar
                  </Button>
                )}
                {reservation.status === 'completed' && (
                  <Button
                    size="sm"
                    className="flex-1 lg:flex-none bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
                  >
                    Değerlendir
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {currentReservations.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Rezervasyon Bulunamadı
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'active' && 'Henüz aktif rezervasyonunuz yok'}
              {activeTab === 'past' && 'Geçmiş rezervasyonunuz bulunmuyor'}
              {activeTab === 'cancelled' && 'İptal edilmiş rezervasyonunuz yok'}
            </p>
            {activeTab === 'active' && (
              <Button className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
                Ders Ara
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
