'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CourseSearchResults } from '@/components/search/course-search-results';

function CourseSearchContent() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || '';

  return <CourseSearchResults location={location} />;
}

export default function CourseSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Yükleniyor...</div>}>
      <CourseSearchContent />
    </Suspense>
  );
}
