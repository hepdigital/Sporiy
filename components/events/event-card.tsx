'use client';

import Link from 'next/link';
import { Calendar, MapPin, Users, Star, Clock, TrendingUp } from 'lucide-react';
import { Event, eventLevelLabels } from '@/lib/events-data';
import { ImageWithFallback } from '@/components/image-with-fallback';

type Props = {
  event: Event;
};

export function EventCard({ event }: Props) {
  const spotsLeft = event.capacity - event.registered;
  const fillPercentage = (event.registered / event.capacity) * 100;
  const isAlmostFull = fillPercentage >= 80;
  const isFull = spotsLeft === 0;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  };

  const formatDateRange = () => {
    if (event.startDate === event.endDate) {
      return formatDate(event.startDate);
    }
    return `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`;
  };

  return (
    <Link
      href={`/etkinlikler/${event.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <ImageWithFallback
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {event.type === 'free' && (
            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
              Ücretsiz
            </span>
          )}
          {event.certificate && (
            <span className="px-3 py-1 bg-[#d6ff00] text-black rounded-full text-xs font-semibold">
              Sertifikalı
            </span>
          )}
          {isAlmostFull && !isFull && (
            <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold">
              Son Yerler
            </span>
          )}
          {isFull && (
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
              Dolu
            </span>
          )}
        </div>

        {/* Category */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white rounded-full text-xs font-medium">
            {event.category}
          </span>
        </div>

        {/* Level */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full text-xs font-medium flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {eventLevelLabels[event.level]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.description}
        </p>

        {/* Organizer */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={event.organizerAvatar}
              alt={event.organizerName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-gray-600 truncate">{event.organizerName}</span>
        </div>

        {/* Meta Info */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{formatDateRange()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{event.startTime} - {event.endTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{event.registered} / {event.capacity} katılımcı</span>
            </div>
            <span className={spotsLeft <= 5 && spotsLeft > 0 ? 'text-orange-600 font-medium' : ''}>
              {spotsLeft > 0 ? `${spotsLeft} yer kaldı` : 'Dolu'}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                isFull ? 'bg-red-500' : isAlmostFull ? 'bg-orange-500' : 'bg-[#d6ff00]'
              }`}
              style={{ width: `${Math.min(fillPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {event.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-900">{event.rating}</span>
              <span className="text-xs text-gray-500">({event.reviews})</span>
            </div>
          )}
          
          <div className="text-right">
            {event.type === 'free' ? (
              <span className="text-lg font-bold text-green-600">Ücretsiz</span>
            ) : (
              <div>
                <span className="text-lg font-bold text-gray-900">{event.price.toLocaleString('tr-TR')} ₺</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
