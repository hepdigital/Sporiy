'use client';

import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FilterState } from './explore-view';

type Props = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
};

export function SearchHeader({ filters, setFilters, showFilters, setShowFilters }: Props) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
            <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Spor dalı, kulüp veya eğitmen ara..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-500"
            />
          </div>

          {/* Location Input */}
          <div className="sm:w-64 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
            <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Konum"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-500"
            />
          </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filtreler</span>
          {filters.category.length > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-[#d6ff00] text-black rounded-full text-xs font-semibold">
              {filters.category.length}
            </span>
          )}
        </Button>

        {/* Search Button */}
        <Button size="sm" className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-semibold">
          Ara
        </Button>
      </div>
    </div>
  );
}
