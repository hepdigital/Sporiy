'use client';

import { useState } from 'react';
import { MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/image-with-fallback';

const mockQA = [
  {
    id: 1,
    question: 'Hiç deneyimim yok, başlangıç kursu bana uygun mu?',
    answer: 'Evet, kesinlikle! Başlangıç seviye kursum tam olarak hiç deneyimi olmayan sporcular için tasarlandı. İlk derste temel güvenlik kuralları ve ekipman kullanımı ile başlıyoruz.',
    author: 'Umut Diner',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=100&q=80',
    date: '3 gün önce',
    isExpanded: false,
  },
  {
    id: 2,
    question: 'Kurs ücretine ekipman dahil mi?',
    answer: 'Evet, kurs süresince kullanacağınız tüm ekipmanlar (kano, kürek, can yeleği) ücretsiz olarak sağlanmaktadır. Sadece kişisel eşyalarınızı (havlu, mayo vb.) getirmeniz yeterli.',
    author: 'Umut Diner',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=100&q=80',
    date: '1 hafta önce',
    isExpanded: false,
  },
  {
    id: 3,
    question: 'Özel ders saatleri nasıl belirleniyor?',
    answer: 'Özel dersler için hafta içi ve hafta sonu esnek saatler sunuyorum. İlk görüşmede müsaitlik durumunuzu değerlendirip size en uygun programı oluşturuyoruz.',
    author: 'Umut Diner',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=100&q=80',
    date: '2 hafta önce',
    isExpanded: false,
  },
];

export function QASection({ profile }: { profile: any }) {
  const [questions, setQuestions] = useState(mockQA);
  const [showAskForm, setShowAskForm] = useState(false);

  const toggleQuestion = (id: number) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, isExpanded: !q.isExpanded } : q))
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Soru & Cevap</h2>
        <Button
          onClick={() => setShowAskForm(!showAskForm)}
          className="gap-2 bg-[#d6ff00] text-black hover:bg-[#c5ee00]"
        >
          <MessageCircle className="h-4 w-4" />
          Soru Sor
        </Button>
      </div>

      {/* Ask Question Form */}
      {showAskForm && (
        <div className="mb-6 p-6 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-4">Yeni Soru Sor</h3>
          <textarea
            placeholder="Sorunuzu buraya yazın..."
            className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#d6ff00] focus:border-transparent"
          />
          <div className="flex gap-3 mt-4">
            <Button className="bg-[#d6ff00] text-black hover:bg-[#c5ee00]">
              Gönder
            </Button>
            <Button variant="outline" onClick={() => setShowAskForm(false)}>
              İptal
            </Button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((qa) => (
          <div
            key={qa.id}
            className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
          >
            <button
              onClick={() => toggleQuestion(qa.id)}
              className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{qa.question}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{qa.date}</span>
                </div>
              </div>
              {qa.isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
              )}
            </button>

            {qa.isExpanded && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="flex items-start gap-4 pt-6">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <ImageWithFallback
                      src={qa.avatar}
                      alt={qa.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{qa.author}</span>
                      <span className="px-2 py-0.5 bg-[#d6ff00] text-black text-xs rounded-full font-medium">
                        Eğitmen
                      </span>
                    </div>
                    <p className="text-gray-700">{qa.answer}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button variant="outline">Daha Fazla Soru Gör</Button>
      </div>
    </div>
  );
}
