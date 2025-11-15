
# Sporiy - Su Sporları Platformu

Spor kulüpleri, eğitmenler ve sporcuları bir araya getiren profesyonel Next.js platformu.

## 🚀 Teknoloji Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Deployment:** Vercel Ready

## 📦 Kurulum

```bash
npm install
```

## 🛠️ Geliştirme

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Ana sayfa
│   └── globals.css        # Global styles
├── components/            # React bileşenleri
│   ├── ui/               # UI primitives (Button, Input, vb.)
│   ├── header.tsx        # Header component
│   ├── hero.tsx          # Hero section
│   ├── featured-profiles.tsx
│   └── ...
├── lib/                   # Utility fonksiyonlar
│   └── utils.ts          # cn() helper
└── public/               # Static assets
```

## 🎨 Tasarım Sistemi

- **Ana Renkler:** Siyah & Beyaz (80-90%)
- **Vurgu Rengi:** #d6ff00 (Neon Sarı/Yeşil) (10-20%)
- **Font:** Inter
- **Border Radius:** 0.5rem (8px)

## 📄 Sayfalar

### Mevcut
- ✅ Ana Sayfa (Landing)

### Planlanan
- 🔲 Profil Detay (`/[slug]`)
- 🔲 Keşfet & Harita (`/kesfet`)
- 🔲 Kategori Sayfası (`/kategori/[sport]`)
- 🔲 Kurs Detay (`/kurs/[id]`)
- 🔲 Dashboard (`/dashboard`)
- 🔲 Hakkımızda, İletişim, SSS, vb.

## 🔗 Clean URLs

- Kulüp: `sporiy.com/ankayildizsporkulubu`
- Eğitmen: `sporiy.com/umutdiner`
- Kategori: `sporiy.com/kategori/yuzme`

## 📝 Lisans

© 2025 Sporiy. Tüm hakları saklıdır.
  