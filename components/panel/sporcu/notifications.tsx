'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  MessageCircle, 
  UserPlus, 
  Calendar, 
  Star,
  CheckCircle,
  Trash2,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type NotificationType = 'like' | 'comment' | 'follow' | 'reservation' | 'review' | 'system';

type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
  avatar?: string;
};

export function SporcuNotifications() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'reservation',
      title: 'Rezervasyon Onaylandı',
      message: 'Anka Yıldız Spor Kulübü rezervasyonunuzu onayladı',
      time: '5 dk önce',
      read: false,
      link: '/panel/sporcu/rezervasyonlar',
    },
    {
      id: 2,
      type: 'like',
      title: 'Gönderiniz Beğenildi',
      message: 'Umut Diner gönderinizi beğendi',
      time: '1 saat önce',
      read: false,
    },
    {
      id: 3,
      type: 'comment',
      title: 'Yeni Yorum',
      message: 'Deniz Yıldızı Akademi gönderinize yorum yaptı',
      time: '2 saat önce',
      read: false,
    },
    {
      id: 4,
      type: 'follow',
      title: 'Yeni Takipçi',
      message: 'Elif Kaya sizi takip etmeye başladı',
      time: '3 saat önce',
      read: true,
      link: '/panel/sporcu/profil',
    },
    {
      id: 5,
      type: 'review',
      title: 'Değerlendirme Talebi',
      message: 'Tamamlanan dersiniz için değerlendirme yapabilirsiniz',
      time: '1 gün önce',
      read: true,
      link: '/panel/sporcu/rezervasyonlar',
    },
    {
      id: 6,
      type: 'system',
      title: 'Profil Görüntüleme',
      message: 'Profiliniz bu hafta 24 kez görüntülendi',
      time: '2 gün önce',
      read: true,
    },
  ]);

  const getIcon = (type: NotificationType) => {
    const icons = {
      like: Heart,
      comment: MessageCircle,
      follow: UserPlus,
      reservation: Calendar,
      review: Star,
      system: CheckCircle,
    };
    return icons[type];
  };

  const getIconColor = (type: NotificationType) => {
    const colors = {
      like: 'text-red-500 bg-red-50',
      comment: 'text-blue-500 bg-blue-50',
      follow: 'text-green-500 bg-green-50',
      reservation: 'text-purple-500 bg-purple-50',
      review: 'text-yellow-500 bg-yellow-50',
      system: 'text-gray-500 bg-gray-50',
    };
    return colors[type];
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bildirimler</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount} okunmamış bildirim
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Tümünü Okundu İşaretle
          </Button>
          <Link href="/panel/sporcu/ayarlar">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Ayarlar
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-1 inline-flex">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-black text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Tümü ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-black text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Okunmamış ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.map((notification) => {
          const Icon = getIcon(notification.type);
          const iconColor = getIconColor(notification.type);

          return (
            <div
              key={notification.id}
              className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow ${
                !notification.read ? 'border-l-4 border-l-[#d6ff00]' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className={`font-semibold text-gray-900 ${!notification.read ? 'font-bold' : ''}`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {notification.message}
                  </p>

                  <div className="flex items-center gap-2">
                    {notification.link && (
                      <Link href={notification.link}>
                        <Button size="sm" variant="outline">
                          Görüntüle
                        </Button>
                      </Link>
                    )}
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Okundu İşaretle
                      </Button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="ml-auto p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'unread' ? 'Tüm Bildirimler Okundu' : 'Bildirim Yok'}
            </h3>
            <p className="text-gray-600">
              {filter === 'unread' 
                ? 'Harika! Tüm bildirimlerinizi okudunuz.'
                : 'Henüz bildiriminiz bulunmuyor.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
