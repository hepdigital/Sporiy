# Spor İkonları

Bu dosya, kategori sayfalarında kullanılacak SVG iconları içerir.

## Kullanım

```tsx
import { SwimmingIcon, CanoeIcon } from '@/components/icons/sport-icons';

<SwimmingIcon className="h-8 w-8 text-black" />
```

## İkon Listesi

- `SwimmingIcon` - Yüzme
- `CanoeIcon` - Kano
- `RowingIcon` - Kürek
- `SailingIcon` - Yelken
- `WaterPoloIcon` - Sutopu
- `DivingIcon` - Sualtı Sporları
- `TriathlonIcon` - Triatlon
- `PentathlonIcon` - Modern Pentatlon

## SVG Ekleme

Her icon fonksiyonunun içindeki `{/* SVG içeriğini buraya ekleyin */}` kısmına SVG path'lerini ekleyebilirsiniz.

Örnek:
```tsx
export function SwimmingIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C13.1 2 14 2.9..." fill="currentColor"/>
    </svg>
  );
}
```

## Not

Şu anda placeholder olarak basit circle kullanılıyor. Gerçek SVG iconları eklendiğinde otomatik olarak güncellenecektir.
