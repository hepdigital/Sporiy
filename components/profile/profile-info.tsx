import { Award, Languages, Briefcase } from 'lucide-react';

type Profile = {
  bio: string;
  specialties: string[];
  certifications: string[];
  languages: string[];
  experience: string;
};

export function ProfileInfo({ profile }: { profile: Profile }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Hakkında</h2>
      
      <div className="prose prose-gray max-w-none mb-8">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {profile.bio}
        </p>
      </div>

      {/* Specialties */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Uzmanlık Alanları</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-4 py-2 bg-gray-100 text-gray-900 rounded-full text-sm font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Sertifikalar & Belgeler</h3>
        </div>
        <ul className="space-y-2">
          {profile.certifications.map((cert) => (
            <li key={cert} className="flex items-center gap-2 text-gray-700">
              <div className="w-1.5 h-1.5 bg-[#d6ff00] rounded-full" />
              {cert}
            </li>
          ))}
        </ul>
      </div>

      {/* Languages */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Languages className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Diller</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.languages.map((language) => (
            <span
              key={language}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
