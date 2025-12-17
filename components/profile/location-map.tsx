'use client';

import { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

// Leaflet bileşenlerini dinamik olarak yükle
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

type Profile = {
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

// Lokasyon verileri (lokasyon adına göre)
export const locationData: Record<string, { coordinates: { lat: number; lng: number }; color: string }> = {
  'Sakarya Nehri Kıyısı': {
    coordinates: { lat: 40.7371, lng: 30.3925 },
    color: '#3B82F6', // blue
  },
  'Sapanca Gölü': {
    coordinates: { lat: 40.6917, lng: 30.2667 },
    color: '#8B5CF6', // purple
  },
};

export function LocationMap({ hoveredLocation }: { profile: Profile; hoveredLocation?: string | null }) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hover veya seçili lokasyonu belirle
  const activeLocationName = hoveredLocation || selectedLocation;

  // Tüm lokasyonların listesi
  const locations = Object.entries(locationData).map(([name, data]) => ({
    name,
    ...data,
  }));

  // Tüm lokasyonların merkezi
  const centerLat = locations.reduce((sum, loc) => sum + loc.coordinates.lat, 0) / locations.length;
  const centerLng = locations.reduce((sum, loc) => sum + loc.coordinates.lng, 0) / locations.length;

  // Aktif lokasyonun koordinatları
  const activeLocation = activeLocationName ? locationData[activeLocationName] : null;

  // Aktif lokasyon değiştiğinde haritayı yenile
  useEffect(() => {
    if (activeLocationName) {
      setMapKey(prev => prev + 1);
    }
  }, [activeLocationName]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Kurs Lokasyonları</h3>
      
      {/* Location List */}
      <div className="mb-4 space-y-2">
        {locations.map((loc) => (
          <button
            key={loc.name}
            onClick={() => setSelectedLocation(selectedLocation === loc.name ? null : loc.name)}
            className={`w-full flex items-start gap-2 p-2 rounded-lg transition-colors text-left ${
              activeLocationName === loc.name 
                ? 'bg-gray-100 border border-gray-300' 
                : 'hover:bg-gray-50 border border-transparent'
            }`}
          >
            <div 
              className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 transition-transform ${
                activeLocationName === loc.name ? 'scale-125' : ''
              }`}
              style={{ backgroundColor: loc.color }}
            />
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{loc.name}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
        {isClient ? (
          <MapContainer
            key={`map-${mapKey}`}
            center={activeLocation 
              ? [activeLocation.coordinates.lat, activeLocation.coordinates.lng] 
              : [centerLat, centerLng]
            }
            zoom={activeLocationName ? 12 : 10}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc) => (
              <CircleMarker
                key={loc.name}
                center={[loc.coordinates.lat, loc.coordinates.lng]}
                radius={activeLocationName === loc.name ? 12 : 8}
                pathOptions={{
                  color: 'white',
                  weight: 2,
                  fillColor: loc.color,
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  <div className="text-center">
                    <strong>{loc.name}</strong>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2 animate-pulse" />
              <p className="text-sm text-gray-500">Harita yükleniyor...</p>
            </div>
          </div>
        )}
      </div>

      {activeLocationName && activeLocation && (
        <Button 
          className="w-full gap-2 mb-4" 
          variant="outline"
          onClick={() => {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${activeLocation.coordinates.lat},${activeLocation.coordinates.lng}`, '_blank');
          }}
        >
          <Navigation className="h-4 w-4" />
          Yol Tarifi Al
        </Button>
      )}

      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Lokasyonlar</h4>
        <div className="space-y-2 text-sm text-gray-600">
          {locations.map((loc) => (
            <div key={loc.name} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0" 
                style={{ backgroundColor: loc.color }}
              />
              <span className="truncate">{loc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
