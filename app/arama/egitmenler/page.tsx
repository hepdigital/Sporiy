'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TrainerSearchResults } from '@/components/search/trainer-search-results';

function TrainerSearchContent() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';

  return <TrainerSearchResults location={location} />;
}

export default function TrainerSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Yükleniyor...</div>}>
      <TrainerSearchContent />
    </Suspense>
  );
}
