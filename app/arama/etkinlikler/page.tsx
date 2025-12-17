'use client';

import { useSearchParams } from 'next/navigation';
import { EventSearchResults } from '@/components/search/event-search-results';

export default function EventSearchPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';

  return <EventSearchResults location={location} />;
}
