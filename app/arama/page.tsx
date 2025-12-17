'use client';

import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchResults } from '@/components/search/search-results';
import { SearchHeader } from '@/components/search/search-header';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="min-h-screen bg-white">
      <SearchHeader query={query} />
      <SearchResults query={query} />
    </div>
  );
}
