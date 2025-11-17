'use client';

import { useState, useEffect } from 'react';
import { FilterState } from '@/components/explore/explore-view';
import { SplitView } from '@/components/explore/split-view';
import { SearchHeader } from '@/components/explore/search-header';

type Props = {
  categoryName: string;
};

const initialFilters = (category: string): FilterState => ({
  search: '',
  location: '',
  category: [category], // Pre-select category as array
  priceRange: [0, 10000],
  rating: 0,
  availability: 'all',
  sortBy: 'relevance',
  useCurrentLocation: false,
  userLocation: null,
});

export function CategoryExploreView({ categoryName }: Props) {
  const [filters, setFilters] = useState<FilterState>(initialFilters(categoryName));
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProfileId, setHoveredProfileId] = useState<number | null>(null);
  const [handleUseLocation, setHandleUseLocation] = useState<(() => void) | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);

  // Set initial filter state after mount (client-side only)
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setShowFilters(true);
    }
  }, []);

  // Keep category locked
  useEffect(() => {
    if (!filters.category.includes(categoryName)) {
      setFilters(prev => ({
        ...prev,
        category: [categoryName]
      }));
    }
  }, [filters.category, categoryName]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Search Header */}
      <SearchHeader 
        filters={filters} 
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onUseCurrentLocation={() => handleUseLocation && handleUseLocation()}
        categoryLocked={true}
      />

      {/* Split View: List + Map */}
      <SplitView 
        filters={filters}
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        hoveredProfileId={hoveredProfileId}
        setHoveredProfileId={setHoveredProfileId}
        setHandleUseLocation={setHandleUseLocation}
        showMapModal={showMapModal}
        setShowMapModal={setShowMapModal}
        categoryLocked={true}
      />
    </div>
  );
}
