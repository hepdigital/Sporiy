'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ClubSearchResults } from '@/components/search/club-search-results';

function ClubSearchContent() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';

  return <ClubSearchResults location={location} />;
}

export default function ClubSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Yükleniyor...</div>}>
      <ClubSearchContent />
    </Suspense>
  );
}
