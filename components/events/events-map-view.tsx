'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Event } from '@/lib/events-data';
import '@/lib/leaflet-config';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

type Props = {
  events: Event[];
};

export function EventsMapView({ events }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.9334, 32.8597]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

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
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {events.map((event) => (
          <Marker
            key={event.id}
            position={[event.coordinates.lat, event.coordinates.lng]}
          >
            <Popup>
              <div className="p-2 min-w-[280px]">
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2">
                      {event.title}
                    </h3>
                    {event.type === 'free' && (
                      <span className="px-2 py-0.5 bg-green-500 text-white rounded text-xs font-semibold flex-shrink-0">
                        Ücretsiz
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{event.category}</p>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span>{formatDate(event.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span>{event.startTime} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Users className="h-3 w-3 text-gray-400" />
                    <span>{event.registered} / {event.capacity} katılımcı</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-600">Organizatör:</span>
                  <span className="text-xs font-medium text-gray-900">{event.organizerName}</span>
                </div>

                {event.type === 'paid' && (
                  <div className="mb-3 text-center">
                    <span className="text-lg font-bold text-gray-900">
                      {event.price.toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                )}

                <Link href={`/etkinlikler/${event.slug}`}>
                  <Button size="sm" className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
                    Detayları Gör
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
          {events.length} etkinlik
        </p>
      </div>
    </div>
  );
}
