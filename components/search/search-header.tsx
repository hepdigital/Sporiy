'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  query: string;
};

export function SearchHeader({ query: initialQuery }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/arama?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
            <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Şehrini Yaz"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-500"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-semibold gap-2"
          >
            <Search className="h-5 w-5" />
            Keşfet
          </Button>
        </div>
      </div>
    </div>
  );
}
