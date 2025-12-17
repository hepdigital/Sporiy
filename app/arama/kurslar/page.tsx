'use client';

import { useSearchParams } from 'next/navigation';
import { CourseSearchResults } from '@/components/search/course-search-results';

export default function CourseSearchPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';

  return <CourseSearchResults location={location} />;
}
