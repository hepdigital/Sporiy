'use client';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Award, 
  Target,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

type Course = {
  id: number;
  title: string;
  type: 'Grup' | 'Bireysel';
  price: string;
  duration: string;
  schedule: string;
  capacity: string;
  enrolled: number;
  level: string;
  startDate: string;
  description: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onBooking: () => void;
};

export function CourseDetailsModal({ isOpen, onClose, course, onBooking }: Props) {
  if (!course) return null;

  const isGroupCourse = course.type === 'Grup';
  const availableSpots = parseInt(course.capacity) - course.enrolled;

  const courseDetails = {
    location: 'Eymir Gölü, Ankara',
    equipment: 'Tüm ekipman dahil (Kano, kürek, can yeleği)',
    requirements: 'Yüzme bilmek zorunlu değil',
    includes: [
      'Profesyonel eğitmen rehberliği',
      'Tüm güvenlik ekipmanları',
      'Sigorta dahil',
      'Sertifika (kurs sonunda)',
      'Fotoğraf ve video çekimi',
    ],
    objectives: [
      'Temel kano teknikleri',
      'Güvenlik kuralları ve acil durum prosedürleri',
      'Denge ve koordinasyon geliştirme',
      'Su üzerinde özgüven kazanma',
      'Takım çalışması ve iletişim',
    ],
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Kurs Detayları"
      size="xl"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                course.type === 'Grup' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {course.type}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                {course.level}
              </span>
            </div>
            <p className="text-gray-600">{course.description}</p>
          </div>
          <div className="text-right ml-6">
            <div className="text-3xl font-bold text-gray-900">{course.price}</div>
            <div className="text-sm text-gray-500">{course.duration}</div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-600 mb-2" />
            <div className="text-sm text-gray-600">Başlangıç</div>
            <div className="font-semibold text-gray-900">{course.startDate}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-gray-600 mb-2" />
            <div className="text-sm text-gray-600">Program</div>
            <div className="font-semibold text-gray-900">{course.schedule}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Users className="h-5 w-5 text-gray-600 mb-2" />
            <div className="text-sm text-gray-600">Kontenjan</div>
            <div className="font-semibold text-gray-900">{course.enrolled}/{course.capacity}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-gray-600 mb-2" />
            <div className="text-sm text-gray-600">Lokasyon</div>
            <div className="font-semibold text-gray-900">{courseDetails.location}</div>
          </div>
        </div>

        {/* Availability */}
        {isGroupCourse && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">Doluluk Oranı</span>
              <span className="text-sm font-semibold text-blue-900">
                {availableSpots} kişilik yer kaldı
              </span>
            </div>
            <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${(course.enrolled / parseInt(course.capacity)) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* What's Included */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Award className="h-5 w-5" />
            Kurs Kapsamı
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {courseDetails.includes.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Objectives */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Öğrenme Hedefleri
          </h3>
          <div className="space-y-2">
            {courseDetails.objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-2">
                <TrendingUp className="h-5 w-5 text-[#d6ff00] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{objective}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Ekipman</h4>
            <p className="text-sm text-gray-600">{courseDetails.equipment}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Gereksinimler</h4>
            <p className="text-sm text-gray-600">{courseDetails.requirements}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            onClick={() => {
              onClose();
              onBooking();
            }}
            className="flex-1 bg-[#d6ff00] text-black hover:bg-[#c5ee00] font-semibold"
            size="lg"
          >
            Kayıt Ol
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1" size="lg">
            Kapat
          </Button>
        </div>
      </div>
    </Modal>
  );
}
