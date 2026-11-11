import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb
} from 'lucide-react';
import { teacherQuestionsList, TeacherQuestion } from '../data/teacherQuestions';

export const TeacherQuestionsTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const categories = [
    { id: 'all', label: 'جميع الأسئلة الـ 20' },
    { id: 'grid', label: 'الشبكة والـ 12 عمود' },
    { id: 'bootstrap_vs_css', label: 'بوتستراب مقارنة مع CSS' },
    { id: 'javascript', label: 'الجافاسكريبت والأحداث' },
    { id: 'forms', label: 'النماذج والفاليديشن' },
    { id: 'best_practices', label: 'المعايير وقواعد الويب' }
  ];

  const filteredQuestions = teacherQuestionsList.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch = 
      q.questionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.questionFr && q.questionFr.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.shortAnswerAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.darijaExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
        <div className="max-w-4xl space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-sm font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>بنك أسئلة المناقشة والامتحان الشفهي</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            20 سؤالاً محتملاً يطرحها الأستاذ مع الإجابات النموذجية
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            في مرحلة المناقشة، الأستاذ كيبغي يتأكد واش نتا فاهم المنطق البرمجي ديال مشروعك ولا غير نقلتي الكود. 
            هنا جمعنا ليك <strong>الإجابة العربية المركزة</strong>، مع <strong>الشرح المفصل بالدارجة المغربية</strong> والصيغة الفرنسية المحتملة إذا طرح الأستاذ السؤال بالفرنسية.
          </p>
        </div>

        {/* Search Bar */}
        <div className="pt-2">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="قلب في الأسئلة (مثال: jQuery، Popper، container، viewport، modal، RTL، شبكة...)"
              className="w-full pr-12 pl-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-base sm:text-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 text-base sm:text-[17px] font-bold rounded-xl whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 text-center text-lg text-slate-500 font-medium">
            ما كاين حتى سؤال كيتطابق مع هاد البحث.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all"
              >
                {/* Clickable Header */}
                <button
                  onClick={() => toggleExpand(q.id)}
                  className="w-full p-6 sm:p-7 text-right flex items-start justify-between gap-5 hover:bg-slate-50/70 dark:hover:bg-slate-750 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 font-mono text-base font-bold flex items-center justify-center shrink-0 mt-0.5" dir="ltr">
                      سؤال {q.id}
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white leading-snug">
                        {q.questionAr}
                      </h3>
                      {q.questionFr && (
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 italic" dir="ltr">
                          Français : « {q.questionFr} »
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded Answer Content */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 pt-0 space-y-6 border-t border-slate-100 dark:border-slate-700/80 animate-fadeIn">
                    
                    {/* Model Answer in Arabic (Primary) */}
                    <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-extrabold text-base sm:text-lg">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span>الإجابة النموذجية المباشرة :</span>
                      </div>
                      <p className="text-lg sm:text-xl text-emerald-950 dark:text-emerald-100 font-bold leading-relaxed">
                        « {q.shortAnswerAr} »
                      </p>
                      {q.shortAnswerFr && (
                        <p className="text-sm sm:text-base text-emerald-800 dark:text-emerald-300/80 pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 italic" dir="ltr">
                          الصيغة بالفرنسية إذا طلب الأستاذ: {q.shortAnswerFr}
                        </p>
                      )}
                    </div>

                    {/* Darija Conceptual Explanation (ARABIC SCRIPT, 18px-20px) */}
                    <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-2">
                      <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-extrabold text-base sm:text-lg">
                        <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        <span>فهم المعنى بالدارجة المغربية باش ترسخ في ذهنك :</span>
                      </div>
                      <p className="text-lg sm:text-xl text-amber-950 dark:text-amber-100 leading-relaxed font-bold">
                        « {q.darijaExplanation} »
                      </p>
                    </div>

                    {/* Detailed Answer & Trap to Avoid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                      
                      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
                        <span className="font-extrabold text-slate-900 dark:text-white block text-base sm:text-lg">
                          📖 توضيح مفصل إضافي (إذا أراد الأستاذ تعمقاً أكثر) :
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium text-base sm:text-lg">
                          {q.detailedAnswerAr}
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 space-y-2">
                        <span className="font-extrabold text-rose-900 dark:text-rose-300 block text-base sm:text-lg flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                          <span>الفخ الذي يقع فيه أغلب الطلاب :</span>
                        </span>
                        <p className="text-rose-950 dark:text-rose-200 leading-relaxed font-bold text-base sm:text-lg">
                          {q.trapToAvoidAr}
                        </p>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
