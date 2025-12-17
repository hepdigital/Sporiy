'use client';

import { useSearchParams } from 'next/navigation';
import { ClubSearchResults } from '@/components/search/club-search-results';

export default function ClubSearchPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';

  return <ClubSearchResults location={location} />;
}
