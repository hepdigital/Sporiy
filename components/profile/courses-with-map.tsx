'use client';

import { useState } from 'react';
import { CoursesSection } from './courses-section';
import { LocationMap } from './location-map';

type Profile = {
  name: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

export function CoursesWithMap({ profile }: { profile: Profile }) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Courses Section */}
      <div className="lg:col-span-2">
        <CoursesSection 
          profile={profile} 
          onScheduleHover={setHoveredLocation}
        />
      </div>

      {/* Location Map */}
      <div className="lg:col-span-1">
        <LocationMap 
          profile={profile} 
          hoveredLocation={hoveredLocation}
        />
      </div>
    </div>
  );
}
