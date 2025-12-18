'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EventSearchResults } from '@/components/search/event-search-results';

function EventSearchContent() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';

  return <EventSearchResults location={location} />;
}

export default function EventSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Yükleniyor...</div>}>
      <EventSearchContent />
    </Suspense>
  );
}
