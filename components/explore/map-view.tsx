'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { FilterState } from './explore-view';

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
import { MapWrapper } from '@/components/map-wrapper';

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
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.9334, 32.8597]);
  const [mapZoom, setMapZoom] = useState(6);
  const markerRefs = useRef<Map<number, any>>(new Map());

  // Update map center when user location is available
  useEffect(() => {
    if (filters.userLocation) {
      setMapCenter([filters.userLocation.lat, filters.userLocation.lng]);
      setMapZoom(10);
    }
  }, [filters.userLocation]);

  // Center map on hovered or selected profile
  useEffect(() => {
    const profileId = selectedProfileId || hoveredProfileId;
    if (profileId) {
      const profile = profiles.find(p => p.id === profileId);
      if (profile) {
        setMapCenter([profile.coordinates.lat, profile.coordinates.lng]);
        setMapZoom(selectedProfileId ? 14 : 12);
      }
    }
  }, [hoveredProfileId, selectedProfileId, profiles]);

  // Open popup on hover
  useEffect(() => {
    if (hoveredProfileId && markerRefs.current.has(hoveredProfileId)) {
      const marker = markerRefs.current.get(hoveredProfileId);
      if (marker) {
        marker.openPopup();
      }
    }
  }, [hoveredProfileId]);

  return (
    <div className="w-full h-full relative">
      <MapWrapper
        center={mapCenter}
        zoom={mapZoom}
        className="z-0"
        scrollWheelZoom={true}
      >

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
          return (
            <Marker
              key={profile.id}
              position={[profile.coordinates.lat, profile.coordinates.lng]}
              ref={(ref) => {
                if (ref) {
                  markerRefs.current.set(profile.id, ref);
                } else {
                  markerRefs.current.delete(profile.id);
                }
              }}
              eventHandlers={{
                mouseover: () => setHoveredProfileId(profile.id),
                mouseout: () => setHoveredProfileId(null),
                click: () => {
                  setSelectedProfileId(profile.id);
                  setHoveredProfileId(profile.id);
                },
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
      </MapWrapper>

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
