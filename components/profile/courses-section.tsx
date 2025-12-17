'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Users, Clock, CheckCircle, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseBookingModal } from './course-booking-modal';
import { CourseDetailsModal } from './course-details-modal';

const mockCourses = [
  {
    id: 1,
    title: 'Grup Kursları',
    description: 'Farklı seviyeler için grup halinde verilen kano kursları.',
    type: 'Grup',
    groupCourses: [
      {
        id: 11,
        title: 'Başlangıç Seviye Kano Kursu',
        slug: 'baslangic-seviye-kano-kursu',
        description: 'Kano sporuna yeni başlayanlar için temel teknikler ve güvenlik eğitimi.',
        price: '2.500 ₺',
        duration: '8 Hafta',
        location: 'Sakarya Nehri Kıyısı',
        level: 'Başlangıç',
        weeklySchedule: [
          { 
            days: ['Pazartesi', 'Çarşamba'], 
            time: '18:00-20:00', 
            capacity: 12, 
            enrolled: 8,
            groupId: 'paz-car-1800',
            location: 'Sakarya Nehri Kıyısı'
          },
        ]
      },
      {
        id: 12,
        title: 'İleri Seviye Sprint Kano',
        slug: 'ileri-seviye-sprint-kano',
        description: 'Yarışma odaklı sprint teknikleri ve performans geliştirme programı.',
        price: '4.000 ₺',
        duration: '12 Hafta',
        location: 'Sapanca Gölü',
        level: 'İleri',
        weeklySchedule: [
          { 
            days: ['Salı', 'Perşembe'], 
            time: '17:00-19:00', 
            capacity: 8, 
            enrolled: 6,
            groupId: 'sal-per-1700',
            location: 'Sapanca Gölü'
          },
          { 
            days: ['Cumartesi'], 
            time: '10:00-12:00', 
            capacity: 10, 
            enrolled: 7,
            groupId: 'cum-1000',
            location: 'Sakarya Nehri Kıyısı'
          },
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Özel Ders Programı',
    slug: 'ozel-ders-programi',
    description: 'Kişiye özel hazırlanan antrenman programı ve birebir koçluk.',
    price: '500 ₺/Saat',
    duration: 'Esnek',
    location: 'Çeşitli Lokasyonlar',
    capacity: '1 Kişi',
    enrolled: 0,
    level: 'Tüm Seviyeler',
    type: 'Bireysel',
  },
];

export function CoursesSection({ profile, onScheduleHover }: { profile: any; onScheduleHover?: (location: string | null) => void }) {
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; course: any | null; selectedSlot?: any }>({ 
    isOpen: false, 
    course: null 
  });
  const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; course: any | null }>({ 
    isOpen: false, 
    course: null 
  });
  
  // Individual course calendar states
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

  const handleBooking = (course: any, selectedSlot?: any) => {
    setBookingModal({ isOpen: true, course, selectedSlot });
  };

  const handleDetails = (course: any) => {
    setDetailsModal({ isOpen: true, course });
  };

  return (
    <>
      <div id="courses-section" className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 scroll-mt-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mt-5">Açılan Kurslar</h2>
          <Button variant="outline" size="sm">
            Tümünü Gör
          </Button>
        </div>

      <div className="space-y-6">
        {mockCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-xl p-6 hover:border-[#d6ff00] hover:shadow-lg transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.type === 'Grup' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {course.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
              </div>
              {course.type === 'Bireysel' && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{course.price}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1 justify-end">
                    <Clock className="h-3 w-3" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1 justify-end mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{course.location}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Course Content */}
            {course.type === 'Grup' ? (
              // Group Courses
              <div className="space-y-4">
                {course.groupCourses?.map((groupCourse: any) => (
                  <div 
                    key={groupCourse.id} 
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h4 className="text-lg font-semibold text-gray-900">{groupCourse.title}</h4>
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                            {groupCourse.level}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{groupCourse.description}</p>
                        
                        {/* Course Info */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{groupCourse.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">{groupCourse.price}</div>
                      </div>
                    </div>

                    {/* Weekly Schedule */}
                    <div className="mb-4 space-y-3">
                      {groupCourse.weeklySchedule?.map((schedule: any, index: number) => (
                        <div 
                          key={index} 
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white rounded-lg border border-gray-200 hover:border-[#d6ff00] transition-colors gap-3"
                          onMouseEnter={() => onScheduleHover?.(schedule.location || groupCourse.location)}
                          onMouseLeave={() => onScheduleHover?.(null)}
                        >
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0 hidden sm:block" />
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-gray-900">
                                {schedule.days.join(' - ')}
                              </div>
                              <div className="text-xs text-gray-600">{schedule.time}</div>
                            </div>
                            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                              <span className="truncate">{schedule.location || groupCourse.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{schedule.enrolled}/{schedule.capacity}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 justify-between sm:justify-end">
                            <div className="text-right">
                              <div className="text-xs text-gray-500">
                                {schedule.capacity - schedule.enrolled} yer kaldı
                              </div>
                              <div className="w-16 sm:w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                                <div
                                  className="h-full bg-[#d6ff00] transition-all"
                                  style={{ width: `${(schedule.enrolled / schedule.capacity) * 100}%` }}
                                />
                              </div>
                            </div>
                            <Button 
                              onClick={() => handleBooking(groupCourse, { 
                                selectedDays: schedule.days,
                                selectedTime: schedule.time,
                                groupId: schedule.groupId,
                                capacity: schedule.capacity,
                                enrolled: schedule.enrolled,
                                location: schedule.location || groupCourse.location
                              })}
                              className="bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-medium text-xs sm:text-sm"
                              size="sm"
                              disabled={schedule.enrolled >= schedule.capacity}
                            >
                              {schedule.enrolled >= schedule.capacity ? 'Dolu' : 'Kayıt Ol'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Course Details Button */}
                    <div className="flex justify-center gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => handleDetails(groupCourse)}
                        className="hover:bg-gray-100 transition-colors"
                        size="sm"
                      >
                        Hızlı Görünüm
                      </Button>
                      <Link href={`/kurs/${groupCourse.slug}`}>
                        <Button 
                          variant="outline" 
                          className="hover:bg-black hover:text-white hover:border-black transition-colors"
                          size="sm"
                        >
                          Detayları Gör
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Individual Course
              <>
                {/* Individual Course Calendar */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Ders Takvimi</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {/* Calendar Header - Month/Year Navigation */}
                    <div className="flex items-center justify-between mb-4">
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
                        <div className="text-sm font-semibold text-gray-900">
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
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </button>
                      
                      <div className="flex-1 grid grid-cols-7 gap-1 mx-2">
                        {['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'].map((day, index) => {
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
                                  setSelectedTimeSlot(null);
                                }
                              }}
                              className={`text-center py-1 border rounded text-xs transition-colors ${
                                isDisabled
                                  ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
                                  : isSelected 
                                    ? 'border-[#d6ff00] bg-[#d6ff00]/10' 
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div className={`font-medium ${
                                isDisabled ? 'text-gray-400' : 'text-gray-900'
                              }`}>
                                {day}
                              </div>
                              <div className={`text-xs ${
                                isDisabled ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {targetDate.getDate()}
                              </div>
                              {!isWorkingDay && (
                                <div className="text-xs text-red-500 font-medium">×</div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => setWeekOffset(weekOffset + 1)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                    
                    {/* Time Slots - Only show when a day is selected */}
                    {selectedDay ? (
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-gray-900 mb-2">
                          {(() => {
                            const selectedDate = new Date(selectedDay);
                            return `${selectedDate.toLocaleDateString('tr-TR', { 
                              weekday: 'long', 
                              day: 'numeric', 
                              month: 'long' 
                            })} - Müsait Saatler`;
                          })()}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-1">
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
                                  p-2 rounded text-xs font-medium transition-all flex items-center justify-center gap-1
                                  ${isSelected 
                                    ? 'bg-[#d6ff00] text-black border-2 border-black' 
                                    : slot.available 
                                      ? 'bg-white border border-gray-300 hover:border-[#d6ff00] hover:bg-[#d6ff00]/10 text-gray-700' 
                                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                  }
                                `}
                              >
                                {slot.available ? (
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                ) : (
                                  <X className="h-3 w-3 text-red-500" />
                                )}
                                <span className="text-xs">{slot.time}</span>
                              </button>
                            );
                          })}
                        </div>
                        
                        {selectedTimeSlot && (
                          <div className="mt-3 p-2 bg-[#d6ff00]/10 border border-[#d6ff00] rounded">
                            <div className="text-xs font-medium text-gray-900 mb-1">Seçili Randevu</div>
                            <div className="text-xs text-gray-600 mb-2">
                              {(() => {
                                const slotDate = new Date(selectedDay);
                                const time = selectedTimeSlot.split('-').slice(-2).join('-');
                                return `${slotDate.toLocaleDateString('tr-TR', { 
                                  weekday: 'short', 
                                  day: 'numeric', 
                                  month: 'short' 
                                })} ${time}`;
                              })()}
                            </div>
                            <button
                              onClick={() => handleBooking(course, { 
                                selectedDay: selectedDay,
                                selectedTime: selectedTimeSlot.split('-').slice(-2).join('-'),
                                type: 'Bireysel'
                              })}
                              className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-medium text-xs py-1 rounded"
                            >
                              Rezerve Et
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <Calendar className="h-8 w-8 mx-auto mb-1 text-gray-300" />
                        <p className="text-xs">Önce bir gün seçin</p>
                      </div>
                    )}
                  </div>
                </div>

                {!selectedDay && (
                  <div className="text-center py-2 text-sm text-gray-600 mb-4">
                    Önce bir gün seçin, sonra müsait saati seçerek rezervasyon yapın
                  </div>
                )}

                {/* Individual Course Details Button */}
                <div className="flex justify-center gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleDetails(course)}
                    className="hover:bg-gray-100 transition-colors"
                    size="sm"
                  >
                    Hızlı Görünüm
                  </Button>
                  <Link href={`/kurs/${course.slug}`}>
                    <Button 
                      variant="outline" 
                      className="hover:bg-black hover:text-white hover:border-black transition-colors"
                      size="sm"
                    >
                      Detayları Gör
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Modals */}
    <CourseBookingModal
      isOpen={bookingModal.isOpen}
      onClose={() => setBookingModal({ isOpen: false, course: null })}
      course={bookingModal.course}
      trainerName={profile.name}
      selectedSlot={bookingModal.selectedSlot}
    />

    <CourseDetailsModal
      isOpen={detailsModal.isOpen}
      onClose={() => setDetailsModal({ isOpen: false, course: null })}
      course={detailsModal.course}
      onBooking={() => {
        setDetailsModal({ isOpen: false, course: null });
        setBookingModal({ isOpen: true, course: detailsModal.course });
      }}
    />
  </>
  );
}
