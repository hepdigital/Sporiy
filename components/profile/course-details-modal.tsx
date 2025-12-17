'use client';

import { X, Clock, Users, MapPin, Calendar, CheckCircle, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  course: any;
  onBooking: () => void;
};

export function CourseDetailsModal({ isOpen, onClose, course, onBooking }: Props) {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Kurs Detayları</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Course Title & Type */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  course.type === 'Grup' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {course.type}
                </span>
                {course.level && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>
            </div>

            {/* Course Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              {course.location && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{course.location}</span>
                </div>
              )}
              {course.capacity && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Maksimum {course.capacity} kişi</span>
                </div>
              )}
              {course.price && (
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{course.price}</span>
                </div>
              )}
            </div>

            {/* Group Schedules (if applicable) */}
            {course.groupCourses && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Alt Kurslar</h4>
                <div className="space-y-3">
                  {course.groupCourses.map((subCourse: any) => (
                    <div key={subCourse.id} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">{subCourse.title}</h5>
                      <p className="text-sm text-gray-600 mb-3">{subCourse.description}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{subCourse.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{subCourse.location}</span>
                        </div>
                      </div>

                      {subCourse.weeklySchedule && (
                        <div className="space-y-2">
                          {subCourse.weeklySchedule.map((schedule: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-3 w-3" />
                                <span>{schedule.days.join(' - ')} • {schedule.time}</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                {schedule.enrolled}/{schedule.capacity}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="text-right mt-3">
                        <span className="font-bold text-gray-900">{subCourse.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Weekly Schedule (for individual courses) */}
            {course.weeklySchedule && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Haftalık Program</h4>
                <div className="space-y-2">
                  {course.weeklySchedule.map((schedule: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">{schedule.days.join(' - ')}</span>
                        <span className="text-sm text-gray-600">{schedule.time}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {schedule.enrolled}/{schedule.capacity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {course.features && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Kurs Özellikleri</h4>
                <div className="grid grid-cols-1 gap-2">
                  {course.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {course.requirements && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Gereksinimler</h4>
                <div className="grid grid-cols-1 gap-2">
                  {course.requirements.map((req: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <Button variant="outline" onClick={onClose}>
              Kapat
            </Button>
            <Button 
              onClick={onBooking}
              className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
            >
              Kayıt Ol
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}