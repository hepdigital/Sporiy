import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Profile = {
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export function LocationMap({ profile }: { profile: Profile }) {
  // Google Maps static image URL
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${profile.coordinates.lat},${profile.coordinates.lng}&zoom=14&size=600x400&markers=color:red%7C${profile.coordinates.lat},${profile.coordinates.lng}&key=YOUR_API_KEY`;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Konum</h3>
      
      <div className="mb-4">
        <div className="flex items-start gap-2 text-gray-700">
          <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{profile.location}</span>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Harita Görünümü</p>
            <p className="text-xs text-gray-400 mt-1">
              {profile.coordinates.lat.toFixed(4)}, {profile.coordinates.lng.toFixed(4)}
            </p>
          </div>
        </div>
      </div>

      <Button className="w-full gap-2" variant="outline">
        <Navigation className="h-4 w-4" />
        Yol Tarifi Al
      </Button>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Ulaşım</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span>Metro: 5 dk yürüme mesafesinde</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Otobüs: Durağa 2 dk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            <span>Ücretsiz otopark mevcut</span>
          </div>
        </div>
      </div>
    </div>
  );
}
