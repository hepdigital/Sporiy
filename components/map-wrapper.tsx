'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

type MapWrapperProps = {
  center: [number, number];
  zoom: number;
  scrollWheelZoom?: boolean;
  children?: React.ReactNode;
  className?: string;
};

let mapIdCounter = 0;

export function MapWrapper({ 
  center, 
  zoom, 
  scrollWheelZoom = true, 
  children,
  className = ''
}: MapWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const [mapId] = useState(() => `map-${++mapIdCounter}-${Date.now()}`);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    
    return () => {
      // Cleanup: Remove any existing map instance
      if (containerRef.current) {
        const container = containerRef.current.querySelector('.leaflet-container');
        if (container && (container as any)._leaflet_id) {
          try {
            // Force remove the map
            delete (container as any)._leaflet_id;
          } catch (e) {
            // Ignore cleanup errors
          }
        }
      }
    };
  }, []);

  if (!isClient) {
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
    <div ref={containerRef} className="w-full h-full">
      <MapContainer
        key={mapId}
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className={className}
        scrollWheelZoom={scrollWheelZoom}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </div>
  );
}
