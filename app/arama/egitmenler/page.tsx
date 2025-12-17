'use client';

import { useSearchParams } from 'next/navigation';
import { TrainerSearchResults } from '@/components/search/trainer-search-results';

export default function TrainerSearchPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';

  return <TrainerSearchResults location={location} />;
}
