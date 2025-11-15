'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { FilterState } from './explore-view';
import { mockProfiles } from '@/lib/mock-data';

// Leaflet'i client-side only olarak yükle
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

import Link from 'next/link';
import '@/lib/leaflet-config';
import { Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  filters: FilterState;
};

export function MapView({ filters }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter profiles based on filters
  const filteredProfiles = mockProfiles.filter((profile) => {
    if (filters.category.length > 0 && !filters.category.includes(profile.category)) {
      return false;
    }
    if (filters.rating > 0 && profile.rating < filters.rating) {
      return false;
    }
    if (filters.search && !profile.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d6ff00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Harita yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Türkiye merkez koordinatları
  const center: [number, number] = [39.9334, 32.8597];

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredProfiles.map((profile) => (
          <Marker
            key={profile.id}
            position={[profile.coordinates.lat, profile.coordinates.lng]}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                      {profile.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{profile.category}</p>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{profile.rating}</span>
                      <span className="text-gray-500">({profile.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>

                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {profile.description}
                </p>

                <Link href={`/${profile.slug}`}>
                  <Button size="sm" className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
                    Profili Görüntüle
                  </Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Results Counter */}
      <div className="absolute bottom-4 left-4 z-10 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-900">
          {filteredProfiles.length} sonuç bulundu
        </p>
      </div>
    </div>
  );
}
