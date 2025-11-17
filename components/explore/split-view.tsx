'use client';

import { useState, useEffect } from 'react';
import { MapView } from './map-view';
import { ListView } from './list-view';
import { FilterSidebar } from './filter-sidebar';
import { FilterState } from './explore-view';
import { mockProfiles } from '@/lib/mock-data';
import { Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  hoveredProfileId: number | null;
  setHoveredProfileId: (id: number | null) => void;
  setHandleUseLocation: (handler: () => void) => void;
};

export function SplitView({ 
  filters, 
  setFilters, 
  showFilters, 
  setShowFilters,
  hoveredProfileId,
  setHoveredProfileId,
  setHandleUseLocation
}: Props) {
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Filter profiles
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

  // Sort by distance if using current location
  const sortedProfiles = filters.useCurrentLocation && filters.userLocation
    ? [...filteredProfiles].sort((a, b) => {
        const distA = calculateDistance(
          filters.userLocation!.lat,
          filters.userLocation!.lng,
          a.coordinates.lat,
          a.coordinates.lng
        );
        const distB = calculateDistance(
          filters.userLocation!.lat,
          filters.userLocation!.lng,
          b.coordinates.lat,
          b.coordinates.lng
        );
        return distA - distB;
      })
    : filteredProfiles;

  // Get current location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Tarayıcınız konum özelliğini desteklemiyor.');
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFilters({
          ...filters,
          useCurrentLocation: true,
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          sortBy: 'distance',
        });
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Konum alınamadı:', error);
        alert('Konum bilgisi alınamadı. Lütfen tarayıcı izinlerini kontrol edin.');
        setIsLoadingLocation(false);
      }
    );
  };

  // Set handler for parent component
  useEffect(() => {
    setHandleUseLocation(() => handleUseCurrentLocation);
  }, [filters]);

  return (
    <div className="flex-1 flex overflow-hidden relative">
      {/* Filter Sidebar (Collapsible) */}
      {showFilters && (
        <div className="absolute left-0 top-0 bottom-0 z-20 w-80 bg-white shadow-xl">
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters}
            onClose={() => setShowFilters(false)}
          />
        </div>
      )}

      {/* List View - Left Side */}
      <div className={`${showFilters ? 'ml-80' : ''} w-full lg:w-2/5 border-r border-gray-200 overflow-hidden transition-all`}>
        <div className="h-full flex flex-col">
          {/* Results Header */}
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-gray-900">
                {sortedProfiles.length} Sonuç
              </h2>
              <Button
                size="sm"
                variant={filters.useCurrentLocation ? 'default' : 'outline'}
                onClick={handleUseCurrentLocation}
                disabled={isLoadingLocation}
                className={`font-semibold ${filters.useCurrentLocation ? 'bg-[#d6ff00] text-black hover:bg-[#c5ee00] border-[#d6ff00]' : 'border-2 border-gray-300 hover:border-[#d6ff00] hover:text-[#d6ff00]'}`}
              >
                <Navigation className={`h-4 w-4 mr-2 ${isLoadingLocation ? 'animate-spin' : ''}`} />
                {isLoadingLocation ? 'Konum Alınıyor...' : filters.useCurrentLocation ? 'Konumunuz Kullanılıyor' : 'Mevcut Konumum'}
              </Button>
            </div>
            {filters.useCurrentLocation && (
              <p className="text-sm text-gray-600">
                Konumunuza en yakın profiller gösteriliyor
              </p>
            )}
          </div>

          {/* List */}
          <ListView 
            filters={filters}
            profiles={sortedProfiles}
            hoveredProfileId={hoveredProfileId}
            setHoveredProfileId={setHoveredProfileId}
            selectedProfileId={selectedProfileId}
            setSelectedProfileId={setSelectedProfileId}
          />
        </div>
      </div>

      {/* Map View - Right Side */}
      <div className="hidden lg:block flex-1">
        <MapView 
          filters={filters}
          profiles={sortedProfiles}
          hoveredProfileId={hoveredProfileId}
          setHoveredProfileId={setHoveredProfileId}
          selectedProfileId={selectedProfileId}
          setSelectedProfileId={setSelectedProfileId}
        />
      </div>
    </div>
  );
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
