'use client';

import { useState } from 'react';
import { Lock, Bell, Shield, Eye, Globe, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SporcuSettings() {
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy' | 'security'>('account');

  const tabs = [
    { id: 'account', label: 'Hesap', icon: Lock },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'privacy', label: 'Gizlilik', icon: Eye },
    { id: 'security', label: 'Güvenlik', icon: Shield },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
        <p className="text-gray-600 mt-1">Hesap ayarlarınızı ve tercihlerinizi yönetin</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Hesap Bilgileri</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta Adresi
                    </label>
                    <Input defaultValue="ahmet@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon Numarası
                    </label>
                    <Input defaultValue="+90 555 123 4567" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dil
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6ff00]">
                      <option>Türkçe</option>
                      <option>English</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
                    <Save className="h-4 w-4 mr-2" />
                    Kaydet
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Şifre Değiştir</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mevcut Şifre
                    </label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yeni Şifre
                    </label>
                    <Input type="password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yeni Şifre (Tekrar)
                    </label>
                    <Input type="password" />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
                    Şifreyi Güncelle
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Bildirim Tercihleri</h2>
              
              <div className="space-y-4">
                {[
                  { label: 'E-posta Bildirimleri', description: 'Önemli güncellemeler için e-posta alın' },
                  { label: 'Push Bildirimleri', description: 'Tarayıcı bildirimleri alın' },
                  { label: 'Rezervasyon Bildirimleri', description: 'Rezervasyon güncellemeleri' },
                  { label: 'Mesaj Bildirimleri', description: 'Yeni mesajlar için bildirim' },
                  { label: 'Sosyal Bildirimler', description: 'Beğeni, yorum ve takip bildirimleri' },
                  { label: 'Pazarlama E-postaları', description: 'Kampanya ve özel teklifler' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#d6ff00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d6ff00]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Gizlilik Ayarları</h2>
              
              <div className="space-y-4">
                {[
                  { label: 'Profil Görünürlüğü', description: 'Profilinizi herkes görebilir' },
                  { label: 'Aktivite Durumu', description: 'Çevrimiçi durumunuzu göster' },
                  { label: 'Mesaj İzinleri', description: 'Herkes size mesaj gönderebilir' },
                  { label: 'Arama Motoru İndeksleme', description: 'Profiliniz arama motorlarında görünsün' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#d6ff00]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d6ff00]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Güvenlik</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">İki Faktörlü Doğrulama</p>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                        Kapalı
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Hesabınızı ekstra bir güvenlik katmanı ile koruyun
                    </p>
                    <Button size="sm" variant="outline">
                      Etkinleştir
                    </Button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">Aktif Oturumlar</p>
                    <p className="text-sm text-gray-600 mb-3">
                      Diğer cihazlardaki oturumlarınızı yönetin
                    </p>
                    <Button size="sm" variant="outline">
                      Oturumları Görüntüle
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Tehlikeli Bölge</h3>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">Hesabı Sil</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Hesabınızı kalıcı olarak silmek istiyorsanız, bu işlem geri alınamaz.
                  </p>
                  <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hesabı Sil
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
