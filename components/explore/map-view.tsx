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

type Profile = {
  id: number;
  name: string;
  slug: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  reviews: number;
  description: string;
  coverImage: string;
  isPremium?: boolean;
};

type Props = {
  filters: FilterState;
  profiles: Profile[];
  hoveredProfileId: number | null;
  setHoveredProfileId: (id: number | null) => void;
  selectedProfileId: number | null;
  setSelectedProfileId: (id: number | null) => void;
};

export function MapView({ 
  filters, 
  profiles,
  hoveredProfileId,
  setHoveredProfileId,
  selectedProfileId,
  setSelectedProfileId
}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.9334, 32.8597]);
  const [mapZoom, setMapZoom] = useState(6);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update map center when user location is available
  useEffect(() => {
    if (filters.userLocation) {
      setMapCenter([filters.userLocation.lat, filters.userLocation.lng]);
      setMapZoom(10);
    }
  }, [filters.userLocation]);

  // Center map on hovered profile
  useEffect(() => {
    if (hoveredProfileId) {
      const profile = profiles.find(p => p.id === hoveredProfileId);
      if (profile) {
        setMapCenter([profile.coordinates.lat, profile.coordinates.lng]);
        setMapZoom(12);
      }
    }
  }, [hoveredProfileId, profiles]);

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

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        {filters.userLocation && (
          <Marker
            position={[filters.userLocation.lat, filters.userLocation.lng]}
          >
            <Popup>
              <div className="p-2 text-center">
                <p className="font-semibold text-gray-900">Konumunuz</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Profile Markers */}
        {profiles.map((profile) => {
          const isHovered = hoveredProfileId === profile.id;
          const isSelected = selectedProfileId === profile.id;
          
          return (
            <Marker
              key={profile.id}
              position={[profile.coordinates.lat, profile.coordinates.lng]}
              eventHandlers={{
                mouseover: () => setHoveredProfileId(profile.id),
                mouseout: () => setHoveredProfileId(null),
                click: () => setSelectedProfileId(profile.id),
              }}
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
          );
        })}
      </MapContainer>

      {/* Results Counter */}
      <div className="absolute bottom-4 left-4 z-10 bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-900">
          {profiles.length} sonuç
        </p>
      </div>

      {/* Legend */}
      {filters.userLocation && (
        <div className="absolute top-4 left-4 z-10 bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>Konumunuz</span>
          </div>
        </div>
      )}
    </div>
  );
}
