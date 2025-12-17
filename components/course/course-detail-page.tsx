'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  CheckCircle, 
  Award,
  Shield,
  BookOpen,
  Camera,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/image-with-fallback';
import { CourseBookingModal } from '@/components/profile/course-booking-modal';
import { MapWrapper } from '@/components/map-wrapper';
import { locationData } from '@/components/profile/location-map';
import dynamic from 'next/dynamic';
import '@/lib/leaflet-config';

const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

type Props = {
  course: any;
};

export function CourseDetailPage({ course }: Props) {
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorited, setIsFavorited] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(() => {
    // İlk çalışma günü olarak bugünü veya bir sonraki çalışma gününü seç
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=Pazar, 1=Pazartesi, ..., 6=Cumartesi
    
    if (dayOfWeek === 0) { // Eğer bugün Pazar ise, Pazartesi'yi seç
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }
    
    return today.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const handleBooking = (schedule: any) => {
    setSelectedSchedule(schedule);
    setBookingModal(true);
  };

  const tabs = [
    { id: 'overview', label: 'Genel Bakış' },
    { id: 'curriculum', label: 'Müfredat' },
    { id: 'instructor', label: 'Eğitmen' },
    { id: 'location', label: 'Konum' },
    { id: 'reviews', label: 'Yorumlar' }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 mb-4">
              <Link 
                href="/arama/kurslar" 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Link href="/arama" className="hover:text-gray-900">Arama</Link>
                <span>/</span>
                <Link href="/arama/kurslar" className="hover:text-gray-900">Kurslar</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{course.title}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Course Info */}
              <div className="lg:col-span-2">
                {/* Course Image */}
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-6">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`p-2 backdrop-blur-sm rounded-full transition-colors ${
                        isFavorited 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/70 text-gray-700 hover:bg-white'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white rounded-full transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Course Title & Basic Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.type === 'Grup' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {course.type}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {course.level}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl text-gray-900 mb-4">
                    <span className="font-bold">{course.instructor.name}</span> adlı eğitmenden <span className="font-bold">{course.title}</span>
                  </h1>

                  {/* Instructor Info */}
                  <Link 
                    href={`/${course.instructor.slug}`}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors mb-4"
                  >
                    <ImageWithFallback
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{course.instructor.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.instructor.rating}</span>
                        <span>•</span>
                        <span>{course.instructor.experience} deneyim</span>
                      </div>
                    </div>
                  </Link>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">{course.duration}</div>
                      <div className="text-xs text-gray-600">Süre</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Users className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">{course.students}</div>
                      <div className="text-xs text-gray-600">Öğrenci</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Star className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">{course.rating}</div>
                      <div className="text-xs text-gray-600">Puan</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-900">{course.district}</div>
                      <div className="text-xs text-gray-600">Konum</div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-[#d6ff00] text-gray-900'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="mb-8">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Kurs Hakkında</h3>
                        <p className="text-gray-600 leading-relaxed">{course.description}</p>
                      </div>

                      {/* Features */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Kurs Özellikleri</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {course.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Requirements & Included */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Gereksinimler</h3>
                          <ul className="space-y-2">
                            {course.requirements.map((req: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 text-sm">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Dahil Olanlar</h3>
                          <ul className="space-y-2">
                            {course.included.map((item: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <Award className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'curriculum' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">8 Haftalık Müfredat</h3>
                      <div className="space-y-4">
                        {course.curriculum.map((week: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-[#d6ff00] rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-black">{week.week}</span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1">{week.title}</h4>
                                <p className="text-gray-600 text-sm">{week.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'instructor' && (
                    <div>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <ImageWithFallback
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{course.instructor.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{course.instructor.rating}</span>
                              <span className="text-gray-600">({course.instructor.totalReviews} değerlendirme)</span>
                            </div>
                            <p className="text-gray-600">{course.instructor.experience} deneyim</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Uzmanlık Alanları</h4>
                          <div className="flex flex-wrap gap-2">
                            {course.instructor.specialties.map((specialty: string, index: number) => (
                              <span key={index} className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4">
                          <Link href={`/${course.instructor.slug}`}>
                            <Button variant="outline" className="w-full">
                              Eğitmen Profilini Görüntüle
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'location' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Kurs Konumu</h3>
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-5 w-5 text-gray-600" />
                          <span className="font-semibold text-gray-900">{course.location}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{course.address}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Öğrenci Yorumları</h3>
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                        <p>Henüz yorum bulunmuyor.</p>
                        <p className="text-sm">İlk yorumu siz yazın!</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Booking Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {course.type === 'Bireysel' 
                          ? `${course.price} ₺/Saat`
                          : `${course.price.toLocaleString('tr-TR')} ₺`
                        }
                      </div>
                      <div className="text-sm text-gray-600">
                        {course.type === 'Bireysel' ? 'Esnek saatler' : `${course.duration} kurs`}
                      </div>
                    </div>

                    {/* Available Schedules */}
                    <div className="mb-6">
                      {course.type === 'Bireysel' ? (
                        <>
                          <h4 className="font-semibold text-gray-900 mb-3">Ders Takvimi</h4>
                          {/* Individual Course Calendar */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            {/* Calendar Header - Month/Year Navigation */}
                            <div className="flex items-center justify-between mb-6">
                              <button
                                onClick={() => {
                                  const newDate = new Date(currentDate);
                                  newDate.setMonth(newDate.getMonth() - 1);
                                  setCurrentDate(newDate);
                                }}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </button>
                              
                              <div className="text-center">
                                <div className="text-lg font-semibold text-gray-900">
                                  {currentDate.toLocaleDateString('tr-TR', { 
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </div>
                              </div>
                              
                              <button
                                onClick={() => {
                                  const newDate = new Date(currentDate);
                                  newDate.setMonth(newDate.getMonth() + 1);
                                  setCurrentDate(newDate);
                                }}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Days Header with Navigation */}
                            <div className="flex items-center justify-between mb-4">
                              <button
                                onClick={() => setWeekOffset(weekOffset - 1)}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </button>
                              
                              <div className="flex-1 grid grid-cols-7 gap-1 mx-4">
                                {['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'].map((day, index) => {
                                  // Bugünden başlayarak haftaları hesapla
                                  const today = new Date();
                                  const targetDate = new Date(today);
                                  targetDate.setDate(today.getDate() + (weekOffset * 7) + index);
                                  
                                  const dayKey = targetDate.toISOString().split('T')[0];
                                  const isSelected = selectedDay === dayKey;
                                  
                                  // Özel ders programı için çalışma günleri (Pazartesi-Cumartesi, Pazar kapalı)
                                  const dayOfWeek = targetDate.getDay(); // 0=Pazar, 1=Pazartesi, ..., 6=Cumartesi
                                  const isWorkingDay = dayOfWeek !== 0; // Pazar günü çalışmıyor
                                  
                                  // Geçmiş tarihler de seçilemesin
                                  const isPastDate = targetDate < new Date(new Date().setHours(0, 0, 0, 0));
                                  const isDisabled = !isWorkingDay || isPastDate;
                                  
                                  return (
                                    <button
                                      key={`${day}-${index}`}
                                      disabled={isDisabled}
                                      onClick={() => {
                                        if (!isDisabled) {
                                          setSelectedDay(isSelected ? null : dayKey);
                                          setSelectedTimeSlot(null); // Reset time selection when day changes
                                        }
                                      }}
                                      className={`text-center py-2 border rounded-lg transition-colors ${
                                        isDisabled
                                          ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
                                          : isSelected 
                                            ? 'border-[#d6ff00] bg-[#d6ff00]/10' 
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                      }`}
                                    >
                                      <div className={`text-xs font-medium mb-1 ${
                                        isDisabled 
                                          ? 'text-gray-400' 
                                          : isSelected 
                                            ? 'text-gray-900' 
                                            : 'text-gray-900'
                                      }`}>
                                        {day}
                                      </div>
                                      <div className={`text-xs ${
                                        isDisabled 
                                          ? 'text-gray-400' 
                                          : isSelected 
                                            ? 'text-gray-700' 
                                            : 'text-gray-600'
                                      }`}>
                                        {targetDate.getDate()} {targetDate.toLocaleDateString('tr-TR', { month: 'short' })}
                                      </div>
                                      {!isWorkingDay && (
                                        <div className="text-xs text-red-500 font-medium">Kapalı</div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                              
                              <button
                                onClick={() => setWeekOffset(weekOffset + 1)}
                                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Time Slots Grid */}
                            <div className="space-y-1">
                            {/* Time Slots - Only show when a day is selected */}
                            {selectedDay ? (
                              <div className="space-y-2">
                                <div className="text-sm font-medium text-gray-900 mb-3">
                                  {(() => {
                                    const selectedDate = new Date(selectedDay);
                                    return `${selectedDate.toLocaleDateString('tr-TR', { 
                                      weekday: 'long', 
                                      day: 'numeric', 
                                      month: 'long' 
                                    })} - Müsait Saatler`;
                                  })()}
                                </div>
                                
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  {[
                                    { time: '15:00-16:00', available: true },
                                    { time: '16:00-17:00', available: false },
                                    { time: '17:00-18:00', available: true },
                                    { time: '18:00-19:00', available: true },
                                    { time: '19:00-20:00', available: false },
                                    { time: '20:00-21:00', available: true },
                                  ].map((slot) => {
                                    const slotKey = `${selectedDay}-${slot.time}`;
                                    const isSelected = selectedTimeSlot === slotKey;
                                    
                                    return (
                                      <button
                                        key={slot.time}
                                        disabled={!slot.available}
                                        onClick={() => {
                                          if (slot.available) {
                                            setSelectedTimeSlot(isSelected ? null : slotKey);
                                          }
                                        }}
                                        className={`
                                          p-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2
                                          ${isSelected 
                                            ? 'bg-[#d6ff00] text-black border-2 border-black' 
                                            : slot.available 
                                              ? 'bg-white border border-gray-300 hover:border-[#d6ff00] hover:bg-[#d6ff00]/10 text-gray-700' 
                                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                          }
                                        `}
                                      >
                                        {slot.available ? (
                                          <CheckCircle className="h-4 w-4 text-green-600" />
                                        ) : (
                                          <X className="h-4 w-4 text-red-500" />
                                        )}
                                        <span>{slot.time}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">Önce bir gün seçin</p>
                                <p className="text-xs">Yukarıdaki günlerden birini tıklayın</p>
                              </div>
                            )}
                            </div>
                            
                            {/* Legend */}
                            <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span>Müsait</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <X className="h-4 w-4 text-red-500" />
                                <span>Dolu</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <span className="w-4 h-4 bg-[#d6ff00] border-2 border-black rounded flex items-center justify-center">
                                  <CheckCircle className="h-3 w-3 text-black" />
                                </span>
                                <span>Seçili</span>
                              </div>
                            </div>
                          </div>

                          {selectedTimeSlot && selectedDay && (
                            <div className="mt-4 p-4 bg-[#d6ff00]/10 border border-[#d6ff00] rounded-lg">
                              <div className="text-sm font-medium text-gray-900 mb-3">
                                Seçili Randevu
                              </div>
                              <div className="mb-4">
                                {(() => {
                                  const slotDate = new Date(selectedDay);
                                  const time = selectedTimeSlot.split('-').slice(-2).join('-'); // Get time part
                                  const dayName = slotDate.toLocaleDateString('tr-TR', { weekday: 'long' });
                                  const dateDisplay = slotDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
                                  
                                  return (
                                    <div className="bg-white border border-gray-300 rounded-lg p-3">
                                      <div className="text-sm font-semibold text-gray-900">
                                        {dayName}
                                      </div>
                                      <div className="text-xs text-gray-600 mb-1">
                                        {dateDisplay}
                                      </div>
                                      <div className="text-sm font-medium text-[#d6ff00] bg-black px-2 py-1 rounded inline-block">
                                        {time}
                                      </div>
                                    </div>
                                  );
                                })()}
                              </div>
                              <Button 
                                onClick={() => handleBooking({ 
                                  selectedDay: selectedDay,
                                  selectedTime: selectedTimeSlot.split('-').slice(-2).join('-'),
                                  type: 'Bireysel'
                                })}
                                className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-medium"
                                size="sm"
                              >
                                Randevuyu Onayla
                              </Button>
                            </div>
                          )}

                          {!selectedDay && (
                            <div className="text-center py-2 text-sm text-gray-600 mt-4">
                              Önce bir gün seçin, sonra müsait saati seçerek rezervasyon yapın
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <h4 className="font-semibold text-gray-900 mb-3">Müsait Gruplar</h4>
                          <div className="space-y-3">
                            {course.groupSchedules.map((schedule: any) => (
                          <div 
                            key={schedule.id}
                            className="border border-gray-200 rounded-lg p-3 hover:border-[#d6ff00] transition-colors"
                            onMouseEnter={() => setHoveredLocation(schedule.location || course.location)}
                            onMouseLeave={() => setHoveredLocation(null)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-medium text-gray-900">
                                {schedule.days.join(' - ')}
                              </div>
                              <div className="text-sm text-gray-600">{schedule.time}</div>
                            </div>
                            
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Users className="h-3 w-3" />
                                <span>{schedule.enrolled}/{schedule.capacity}</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                {schedule.capacity - schedule.enrolled} yer kaldı
                              </div>
                            </div>

                            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-3">
                              <div
                                className="h-full bg-[#d6ff00] transition-all"
                                style={{ width: `${(schedule.enrolled / schedule.capacity) * 100}%` }}
                              />
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                              <MapPin className="h-3 w-3" />
                              <span>{schedule.location || course.location}</span>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                              <span>Başlangıç: {new Date(schedule.startDate).toLocaleDateString('tr-TR')}</span>
                              <span>Bitiş: {new Date(schedule.endDate).toLocaleDateString('tr-TR')}</span>
                            </div>

                            <Button 
                              onClick={() => handleBooking(schedule)}
                              className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-medium"
                              size="sm"
                              disabled={schedule.enrolled >= schedule.capacity}
                            >
                              {schedule.enrolled >= schedule.capacity ? 'Grup Dolu' : 'Bu Gruba Kayıt Ol'}
                            </Button>
                          </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Course Locations Map - Only for Group Courses */}
                    {course.type !== 'Bireysel' && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Kurs Konumları</h4>
                      
                      {/* Location List */}
                      <div className="space-y-2 mb-4">
                        {course.groupSchedules.map((schedule: any, index: number) => {
                          const isHovered = hoveredLocation === (schedule.location || course.location);
                          const locationInfo = locationData[schedule.location || course.location];
                          return (
                            <div 
                              key={schedule.id} 
                              className={`flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer ${
                                isHovered ? 'bg-gray-100' : 'hover:bg-gray-50'
                              }`}
                              onMouseEnter={() => setHoveredLocation(schedule.location || course.location)}
                              onMouseLeave={() => setHoveredLocation(null)}
                            >
                              <div 
                                className={`w-3 h-3 rounded-full flex-shrink-0 transition-transform ${
                                  isHovered ? 'scale-125' : ''
                                }`}
                                style={{ backgroundColor: locationInfo?.color || '#3B82F6' }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {schedule.location || course.location}
                                </div>
                                <div className="text-xs text-gray-600">
                                  Grup {index + 1} • {schedule.days.join(' - ')} • {schedule.time}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Map */}
                      <div className="h-48 rounded-xl overflow-hidden bg-gray-100">
                        <MapWrapper
                          center={[course.coordinates.lat, course.coordinates.lng]}
                          zoom={11}
                          scrollWheelZoom={false}
                        >
                          {course.groupSchedules.map((schedule: any, index: number) => {
                            const coords = schedule.coordinates || course.coordinates;
                            const isHovered = hoveredLocation === (schedule.location || course.location);
                            const locationInfo = locationData[schedule.location || course.location];
                            return (
                              <CircleMarker 
                                key={schedule.id} 
                                center={[coords.lat, coords.lng]}
                                radius={isHovered ? 12 : 8}
                                pathOptions={{
                                  color: 'white',
                                  weight: 2,
                                  fillColor: locationInfo?.color || '#3B82F6',
                                  fillOpacity: 1,
                                }}
                                eventHandlers={{
                                  mouseover: () => setHoveredLocation(schedule.location || course.location),
                                  mouseout: () => setHoveredLocation(null),
                                }}
                              >
                                <Popup>
                                  <div className="p-2 min-w-[180px]">
                                    <h4 className="font-semibold text-gray-900 mb-2">
                                      {schedule.location || course.location}
                                    </h4>
                                    <div className="space-y-1 text-sm text-gray-600">
                                      <div>Grup {index + 1}</div>
                                      <div>{schedule.days.join(' - ')}</div>
                                      <div>{schedule.time}</div>
                                      <div>{schedule.enrolled}/{schedule.capacity} kişi</div>
                                    </div>
                                    {schedule.capacity > schedule.enrolled && (
                                      <div className="mt-2 text-xs text-green-600 font-medium">
                                        {schedule.capacity - schedule.enrolled} yer kaldı
                                      </div>
                                    )}
                                  </div>
                                </Popup>
                              </CircleMarker>
                            );
                          })}
                        </MapWrapper>
                      </div>
                    </div>
                    )}

                    {/* Contact Instructor */}
                    <div className="border-t border-gray-200 pt-4">
                      <Link href={`/${course.instructor.slug}`}>
                        <Button variant="outline" className="w-full">
                          Eğitmenle İletişime Geç
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <CourseBookingModal
        isOpen={bookingModal}
        onClose={() => setBookingModal(false)}
        course={course}
        trainerName={course.instructor.name}
        selectedSlot={selectedSchedule ? {
          day: selectedSchedule.days ? new Date().getDay() : 0,
          time: selectedSchedule.time || selectedSchedule.selectedTime || ''
        } : undefined}
      />
    </>
  );
}