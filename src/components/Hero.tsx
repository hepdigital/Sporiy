import { Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    { icon: '🏊', text: `${searchQuery} Kulüpler` },
    { icon: '👨‍🏫', text: `${searchQuery} Antrenörler` },
    { icon: '📚', text: `${searchQuery} Kurslar` },
    { icon: '⭐', text: `${searchQuery} Etkinlikler` },
  ];

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-[#d6ff00] rounded-full animate-pulse" />
            <span className="text-sm">Su Sporları Dünyasının Yeni Platformu</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-bold">
            <span className="block">Spor Tutkunuzu</span>
            <span className="block">
              <span className="text-[#d6ff00]">Profesyonellerle</span> Buluşturun
            </span>
          </h1>

          <p className="mb-10 text-gray-300 max-w-2xl mx-auto">
            Türkiye&apos;nin en iyi spor kulüpleri ve eğitmenleriyle tanışın. 
            Yüzme, kano, kürek, yelken ve daha fazlası için size özel dersleri keşfedin.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 relative">
            <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-2xl shadow-2xl">
              <div className="flex-1 relative">
                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                  <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <Input 
                    type="text" 
                    placeholder="Spor dalı veya eğitmen ara..." 
                    className="border-0 bg-transparent p-0 focus-visible:ring-0 text-black placeholder:text-gray-500"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                </div>
                
                {/* Suggestions Dropdown */}
                {showSuggestions && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-900"
                        onClick={() => {
                          setSearchQuery(suggestion.text);
                          setShowSuggestions(false);
                        }}
                      >
                        <span className="text-xl">{suggestion.icon}</span>
                        <span className="text-sm">{suggestion.text}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl sm:w-48">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <Input 
                  type="text" 
                  placeholder="Konum" 
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 text-black placeholder:text-gray-500"
                />
              </div>
              <Button 
                size="lg" 
                className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] rounded-xl px-8"
              >
                Ara
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-gray-400">Popüler:</span>
            {['Yüzme', 'Kano', 'Yelken', 'Kürek', 'Sutopu'].map((sport) => (
              <button
                key={sport}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm transition-colors"
              >
                {sport}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 80L60 73.3C120 67 240 53 360 48C480 43 600 47 720 53.3C840 60 960 69 1080 69.3C1200 69 1320 60 1380 55.3L1440 50.7V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}