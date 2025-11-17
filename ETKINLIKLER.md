# 📅 Etkinlik Sistemi

Sporiy platformuna eksiksiz bir etkinlik yönetim sistemi eklendi.

## ✨ Özellikler

### 🎯 Temel Özellikler
- ✅ **Etkinlik Listesi Sayfası** - Tüm etkinlikleri görüntüleme
- ✅ **Detaylı Filtreleme** - Tarih, kategori, şehir, seviye, fiyat filtreleri
- ✅ **Harita Görünümü** - Etkinlikleri harita üzerinde görüntüleme
- ✅ **Kayıt Sistemi** - Etkinliklere kayıt olma ve ödeme
- ✅ **Takvim Entegrasyonu** - Tarih bazlı filtreleme

### 🎟️ Ek Özellikler
- ✅ **Bilet Fiyatlandırması** - Ücretsiz, Ücretli, Bağış bazlı
- ✅ **Katılımcı Sayısı** - Kalan kontenjan göstergesi
- ✅ **Etkinlik Seviyeleri** - Başlangıç, Orta, İleri, Profesyonel
- ✅ **Galeri** - Etkinlik fotoğrafları
- ✅ **Değerlendirmeler** - Katılımcı yorumları ve puanları
- ✅ **Organizatör Profili** - Kulüp/Eğitmen bilgisi
- ✅ **Hava Durumu** - Açık hava etkinlikleri için
- ✅ **Benzer Etkinlikler** - Öneri sistemi
- ✅ **Sertifika** - Katılım belgesi veren etkinlikler
- ✅ **QR Kod Check-in** - Etkinlik girişi için (hazır)

## 📁 Dosya Yapısı

```
lib/
  └── events-data.ts              # Etkinlik veri modeli ve mock data

components/events/
  ├── event-card.tsx              # Etkinlik kartı componenti
  ├── event-registration-modal.tsx # Kayıt modal componenti
  ├── events-filter-sidebar.tsx   # Filtreleme sidebar
  ├── events-list-view.tsx        # Liste görünümü
  └── events-map-view.tsx         # Harita görünümü

components/
  └── featured-events.tsx         # Ana sayfa etkinlik bölümü

app/
  ├── etkinlikler/
  │   ├── page.tsx               # Etkinlik listesi sayfası
  │   └── [slug]/
  │       └── page.tsx           # Tek etkinlik detay sayfası
```

## 🎨 Kullanıcı Deneyimi

### Login Olmayan Kullanıcılar
- Tüm etkinlikleri görüntüleyebilir
- Filtreleme yapabilir
- Harita görünümünü kullanabilir
- Detayları inceleyebilir
- ❌ Kayıt olamaz (giriş yapması gerekir)

### Login Olan Kullanıcılar
- Tüm özelliklere erişim
- ✅ Etkinliklere kayıt olabilir
- ✅ Ödeme yapabilir
- ✅ Rezervasyonlarını görüntüleyebilir
- ✅ Favorilere ekleyebilir
- ✅ Hatırlatıcı kurabilir

## 🔄 Veri Yapısı

### Event Type
```typescript
type Event = {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  organizerId: number;
  organizerName: string;
  organizerType: 'club' | 'trainer';
  coverImage: string;
  gallery: string[];
  location: string;
  address: string;
  coordinates: { lat: number; lng: number };
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  type: 'free' | 'paid' | 'donation';
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  capacity: number;
  registered: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  features: string[];
  requirements: string[];
  includes: string[];
  rating: number;
  reviews: number;
  certificate: boolean;
  weather: boolean;
  tags: string[];
}
```

## 🎯 Kullanım Örnekleri

### Etkinlik Listesi
```
/etkinlikler
```

### Tek Etkinlik
```
/etkinlikler/yaz-yuzme-kampi-2025
```

### Filtreleme
- Tarih: Bugün, Bu Hafta, Bu Ay, Özel Tarih
- Kategori: Yüzme, Kano, Kürek, Yelken, vb.
- Şehir: Ankara, İstanbul, İzmir, vb.
- Seviye: Başlangıç, Orta, İleri, Profesyonel
- Fiyat: Min-Max aralığı
- Tip: Ücretsiz, Ücretli, Tümü

## 🚀 Geliştirme Notları

### Mock Data
Şu anda `lib/events-data.ts` dosyasında 8 adet örnek etkinlik bulunmaktadır:
1. Yaz Yüzme Kampı 2025 (Ücretli, Başlangıç)
2. Boğaz'da Kano Turu (Ücretli, Başlangıç)
3. Yelken Yarışı Hazırlık Kampı (Ücretli, İleri)
4. Ücretsiz Dalış Tanıtım Günü (Ücretsiz, Başlangıç)
5. Sutopu Turnuvası (Ücretli, Orta)
6. Triatlon Başlangıç Eğitimi (Ücretli, Başlangıç)
7. Açık Deniz Yüzme Maratonu (Ücretli, İleri)
8. Kürek Teknik Atölyesi (Ücretli, Orta)

### Backend Entegrasyonu
Backend hazır olduğunda:
1. `lib/events-data.ts` dosyasındaki mock data'yı API çağrıları ile değiştirin
2. `getEventBySlug`, `getEventsByCategory` gibi fonksiyonları API'ye bağlayın
3. Kayıt ve ödeme işlemlerini gerçek payment gateway'e bağlayın
4. QR kod sistemi için backend endpoint'leri ekleyin

### Rezervasyon Sistemi
Kullanıcı panelinde (`components/panel/sporcu/reservations.tsx`) etkinlik rezervasyonları da gösterilmektedir:
- Ders ve Etkinlik ayrımı yapılır
- Katılımcı sayısı gösterilir
- Etkinlik tipi badge ile belirtilir

## 🎨 Tasarım Sistemi

Mevcut Sporiy tasarım sistemine uygun olarak geliştirilmiştir:
- Ana renk: `#d6ff00` (Neon sarı)
- Hover renk: `#c5ee00`
- Radix UI componentleri kullanılmıştır
- Responsive tasarım (mobile-first)
- Tailwind CSS ile stillendirilmiştir

## 📱 Responsive Tasarım

- **Mobile**: Tek sütun, hamburger menü
- **Tablet**: İki sütun grid
- **Desktop**: Üç/dört sütun grid, sidebar filtreleme

## 🔐 Güvenlik

- Login kontrolü yapılır
- Ödeme bilgileri güvenli şekilde işlenir (mock)
- XSS koruması
- CSRF token (backend'de eklenecek)

## 🎯 Sonraki Adımlar

1. ✅ Backend API entegrasyonu
2. ✅ Gerçek ödeme sistemi (Stripe, iyzico, vb.)
3. ✅ E-posta bildirimleri
4. ✅ QR kod check-in sistemi
5. ✅ Takvim export (iCal, Google Calendar)
6. ✅ Push bildirimleri
7. ✅ Sosyal medya paylaşımı
8. ✅ Etkinlik yorumları ve değerlendirmeleri
9. ✅ Organizatör paneli (etkinlik oluşturma/düzenleme)
10. ✅ İstatistikler ve raporlama

## 📞 Destek

Herhangi bir sorunuz veya öneriniz için lütfen iletişime geçin.
