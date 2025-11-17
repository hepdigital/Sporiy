'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { getFeaturedEvents } from '@/lib/events-data';
import { EventCard } from '@/components/events/event-card';
import { Button } from '@/components/ui/button';

export function FeaturedEvents() {
  const events = getFeaturedEvents();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-6 w-6 text-[#d6ff00]" />
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Etkinlikler
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Yaklaşan Etkinlikler
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Su sporları etkinliklerine katılın, yeni insanlarla tanışın ve deneyim kazanın
            </p>
          </div>
          <Link href="/etkinlikler" className="hidden md:block">
            <Button variant="outline" className="gap-2">
              Tümünü Gör
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden text-center">
          <Link href="/etkinlikler">
            <Button variant="outline" className="gap-2">
              Tüm Etkinlikleri Gör
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
