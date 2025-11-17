'use client';

import { useState } from 'react';
import { Calendar, Users, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseBookingModal } from './course-booking-modal';
import { CourseDetailsModal } from './course-details-modal';

const mockCourses = [
  {
    id: 1,
    title: 'Başlangıç Seviye Kano Kursu',
    description: 'Kano sporuna yeni başlayanlar için temel teknikler ve güvenlik eğitimi.',
    price: '2.500 ₺',
    duration: '8 Hafta',
    schedule: 'Pazartesi & Çarşamba, 18:00-20:00',
    capacity: '12 Kişi',
    enrolled: 8,
    level: 'Başlangıç',
    type: 'Grup',
    startDate: '15 Mart 2025',
  },
  {
    id: 2,
    title: 'İleri Seviye Sprint Kano',
    description: 'Yarışma odaklı sprint teknikleri ve performans geliştirme programı.',
    price: '4.000 ₺',
    duration: '12 Hafta',
    schedule: 'Salı & Perşembe, 17:00-19:00',
    capacity: '8 Kişi',
    enrolled: 6,
    level: 'İleri',
    type: 'Grup',
    startDate: '20 Mart 2025',
  },
  {
    id: 3,
    title: 'Özel Ders Programı',
    description: 'Kişiye özel hazırlanan antrenman programı ve birebir koçluk.',
    price: '500 ₺/Saat',
    duration: 'Esnek',
    schedule: 'Randevuya Göre',
    capacity: '1 Kişi',
    enrolled: 0,
    level: 'Tüm Seviyeler',
    type: 'Bireysel',
    startDate: 'Hemen Başla',
  },
];

export function CoursesSection({ profile }: { profile: any }) {
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; course: any | null }>({ 
    isOpen: false, 
    course: null 
  });
  const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; course: any | null }>({ 
    isOpen: false, 
    course: null 
  });

  const handleBooking = (course: any) => {
    setBookingModal({ isOpen: true, course });
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
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {course.level}
                  </span>
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
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-1">{course.price}</div>
                <div className="text-sm text-gray-500">{course.duration}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{course.startDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{course.schedule}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{course.enrolled}/{course.capacity}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>%{Math.round((course.enrolled / parseInt(course.capacity)) * 100)} Dolu</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#d6ff00] transition-all"
                  style={{ width: `${(course.enrolled / parseInt(course.capacity)) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => handleBooking(course)}
                className="flex-1 bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-semibold"
              >
                Kayıt Ol
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleDetails(course)}
                className="flex-1 hover:bg-black hover:text-white hover:border-black transition-colors"
              >
                Detayları Gör
              </Button>
            </div>
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
