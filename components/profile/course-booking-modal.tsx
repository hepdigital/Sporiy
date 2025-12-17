'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

// Add scrollbar hide styles
const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

type Course = {
  id: number;
  title: string;
  type: 'Grup' | 'Bireysel';
  price: string;
  duration: string;
  schedule: string;
  capacity: string;
  enrolled: number;
  startDate: string;
  description: string;
  location?: string;
};

type SelectedSlot = {
  day?: number;
  time: string;
  selectedDays?: string[];
  selectedDay?: string;
  selectedTime?: string;
  location?: string;
  capacity?: number;
  enrolled?: number;
  groupId?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  trainerName: string;
  selectedSlot?: SelectedSlot;
};

export function CourseBookingModal({ isOpen, onClose, course, trainerName, selectedSlot }: Props) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: selectedSlot ? '' : '',
    time: selectedSlot ? selectedSlot.time : '',
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (!course) return null;

  const isGroupCourse = course.type === 'Grup';
  const availableSpots = parseInt(course.capacity) - course.enrolled;

  // Generate dates for selected month
  const generateAvailableDates = () => {
    const dates = [];
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Mock availability - Bu backend'den gelecek
    const unavailableDates = ['2025-01-20', '2025-01-23', '2025-01-27']; // Örnek dolu günler
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('tr-TR', { weekday: 'short' });
      const isPast = date < today;
      
      dates.push({
        date: dateString,
        dayName,
        day: i,
        available: !isPast && !unavailableDates.includes(dateString),
        isPast,
      });
    }
    
    return dates;
  };

  // Month navigation
  const goToPreviousMonth = () => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(selectedMonth.getMonth() - 1);
    setSelectedMonth(newMonth);
    setBookingData({ ...bookingData, date: '', time: '' });
  };

  const goToNextMonth = () => {
    const newMonth = new Date(selectedMonth);
    newMonth.setMonth(selectedMonth.getMonth() + 1);
    setSelectedMonth(newMonth);
    setBookingData({ ...bookingData, date: '', time: '' });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const slider = e.currentTarget;
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const slider = e.currentTarget;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Get available time slots for selected date
  const getAvailableTimeSlotsForDate = (selectedDate: string) => {
    // Mock availability - Bu backend'den gelecek
    const allSlots = [
      '09:00', '10:00', '11:00', '12:00', 
      '14:00', '15:00', '16:00', '17:00', 
      '18:00', '19:00', '20:00'
    ];
    
    // Örnek: Bazı saatler dolu
    const bookedSlots: { [key: string]: string[] } = {
      [new Date().toISOString().split('T')[0]]: ['09:00', '10:00', '14:00'], // Bugün
      [new Date(Date.now() + 86400000).toISOString().split('T')[0]]: ['11:00', '15:00'], // Yarın
    };
    
    const unavailableForDate = bookedSlots[selectedDate] || [];
    
    return allSlots.map(time => ({
      time,
      available: !unavailableForDate.includes(time),
    }));
  };

  const handleSubmit = () => {
    // TODO: Submit booking
    console.log('Booking submitted:', { course, selectedSlot, bookingData });
    setStep(2); // Success step
  };



  return (
    <>
      <style>{scrollbarHideStyles}</style>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        title={step === 2 ? 'Rezervasyon Onaylandı!' : course.title}
        size="lg"
      >
        {step === 1 && (
        <div className="space-y-6">
          {/* Course Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-600">{trainerName}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">{course.price}</div>
                <div className="text-xs text-gray-500">{course.duration}</div>
              </div>
            </div>
            
            {isGroupCourse && (
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{course.startDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{availableSpots} kişilik yer</span>
                </div>
              </div>
            )}
          </div>

          {/* Booking Form */}
          {isGroupCourse ? (
            // Group Course - Direct Booking
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Grup Kursu</p>
                    <p>Bu grup kursuna katılım talebiniz eğitmene iletilecektir.</p>
                  </div>
                </div>
              </div>

              {/* Reservation Summary */}
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <h3 className="font-semibold text-gray-900 mb-3">Rezervasyon Detayları</h3>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Kurs</span>
                  <span className="font-medium text-gray-900">{course.title}</span>
                </div>
                
                {selectedSlot && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Gün</span>
                      <span className="font-medium text-gray-900">
                        {selectedSlot.selectedDays ? selectedSlot.selectedDays.join(' - ') : selectedSlot.selectedDay}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Saat</span>
                      <span className="font-medium text-gray-900">{selectedSlot.selectedTime}</span>
                    </div>
                    {selectedSlot.location && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Konum</span>
                        <span className="font-medium text-gray-900 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {selectedSlot.location}
                        </span>
                      </div>
                    )}
                    {selectedSlot.capacity && selectedSlot.enrolled !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Grup Durumu</span>
                        <span className="font-medium text-gray-900">
                          {selectedSlot.enrolled}/{selectedSlot.capacity} Kişi ({selectedSlot.capacity - selectedSlot.enrolled} yer kaldı)
                        </span>
                      </div>
                    )}
                  </>
                )}
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Ücret</span>
                    <span className="text-xl font-bold text-gray-900">{course.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
                >
                  Katılım Talebi Gönder
                </Button>
                <Button variant="outline" onClick={onClose} className="flex-1">
                  İptal
                </Button>
              </div>
            </div>
          ) : (
            // Individual Course - Direct Booking
            <div className="space-y-6">
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-purple-800">
                    <p className="font-medium mb-1">Bireysel Ders</p>
                    <p>Rezervasyon talebiniz eğitmene iletilecektir.</p>
                  </div>
                </div>
              </div>

              {/* Date Selector - Only show if no slot pre-selected */}
              {!selectedSlot && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Ders Tarihi Seçin *
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={goToPreviousMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        type="button"
                      >
                        <ChevronLeft className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="text-sm font-semibold text-gray-900 min-w-[120px] text-center">
                        {selectedMonth.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                      </span>
                      <button
                        onClick={goToNextMonth}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        type="button"
                      >
                        <ChevronRight className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    {/* Gradient overlays for scroll indication */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                    
                    <div 
                      className={`flex gap-2 overflow-x-auto pb-2 scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseLeave}
                    >
                      {generateAvailableDates().map((dateInfo) => (
                        <button
                          key={dateInfo.date}
                          onClick={() => !isDragging && setBookingData({ ...bookingData, date: dateInfo.date, time: '' })}
                          disabled={!dateInfo.available}
                          type="button"
                          className={`flex-shrink-0 w-20 p-3 rounded-lg border-2 transition-all select-none ${
                            bookingData.date === dateInfo.date
                              ? 'border-[#d6ff00] bg-[#d6ff00]/10'
                              : dateInfo.available
                              ? 'border-gray-200 hover:border-gray-300 bg-white'
                              : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-center pointer-events-none">
                            <div className="text-xs text-gray-500 mb-1">{dateInfo.dayName}</div>
                            <div className="text-lg font-bold text-gray-900">{dateInfo.day}</div>
                            {!dateInfo.available && !dateInfo.isPast && (
                              <div className="text-xs text-red-500 mt-1">Dolu</div>
                            )}
                            {dateInfo.isPast && (
                              <div className="text-xs text-gray-400 mt-1">Geçti</div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      💡 Tarihleri kaydırmak için sürükleyin veya ok tuşlarını kullanın
                    </p>
                  </div>
                </div>
              )}

              {/* Time Slots - Only show if no slot pre-selected and date is selected */}
              {!selectedSlot && bookingData.date && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Ders Saati Seçin *
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {getAvailableTimeSlotsForDate(bookingData.date).map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setBookingData({ ...bookingData, time: slot.time })}
                        disabled={!slot.available}
                        className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                          bookingData.time === slot.time
                            ? 'border-[#d6ff00] bg-[#d6ff00]/10 text-gray-900'
                            : slot.available
                            ? 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed line-through'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  {bookingData.date && getAvailableTimeSlotsForDate(bookingData.date).filter(s => s.available).length === 0 && (
                    <p className="text-sm text-red-600 mt-2">Bu tarihte müsait saat bulunmamaktadır.</p>
                  )}
                </div>
              )}

              {/* Reservation Summary for Individual Course */}
              {(selectedSlot || (bookingData.date && bookingData.time)) && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-3">Rezervasyon Detayları</h3>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kurs</span>
                    <span className="font-medium text-gray-900">{course.title}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tarih</span>
                    <span className="font-medium text-gray-900">
                      {selectedSlot 
                        ? (selectedSlot.day !== undefined 
                            ? `${['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'][selectedSlot.day]}`
                            : selectedSlot.selectedDay || 'Seçili tarih'
                          )
                        : new Date(bookingData.date).toLocaleDateString('tr-TR', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Saat</span>
                    <span className="font-medium text-gray-900">
                      {selectedSlot ? selectedSlot.time : bookingData.time}
                    </span>
                  </div>
                  {course.location && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Konum</span>
                      <span className="font-medium text-gray-900 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {course.location}
                      </span>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Ücret</span>
                      <span className="text-xl font-bold text-gray-900">{course.price}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={selectedSlot ? false : !bookingData.date || !bookingData.time}
                  className="flex-1 bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
                >
                  Rezervasyon Talebi Gönder
                </Button>
                <Button variant="outline" onClick={onClose} className="flex-1">
                  İptal
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {isGroupCourse ? 'Talebiniz Alındı!' : 'Rezervasyon Oluşturuldu!'}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {isGroupCourse 
              ? 'Katılım talebiniz eğitmene iletildi.'
              : 'Rezervasyon talebiniz eğitmene iletildi.'
            }
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => {
                setStep(1);
                setBookingData({ date: '', time: '' });
                onClose();
              }}
              className="w-full bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
            >
              Tamam
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/panel/sporcu/rezervasyonlar'}
              className="w-full"
            >
              Rezervasyonlarım
            </Button>
          </div>
        </div>
      )}
      </Modal>
    </>
  );
}
