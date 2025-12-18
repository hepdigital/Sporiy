'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchResults } from '@/components/search/search-results';
import { SearchHeader } from '@/components/search/search-header';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="min-h-screen bg-white">
      <SearchHeader query={query} />
      <SearchResults query={query} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Yükleniyor...</div>}>
      <SearchContent />
    </Suspense>
  );
}
