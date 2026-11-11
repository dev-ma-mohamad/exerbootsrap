import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Copy, 
  Check, 
  Sparkles, 
  Play, 
  Pause, 
  Lightbulb, 
  BookOpen,
  Languages
} from 'lucide-react';
import { presentationScriptSections, ScriptSection } from '../data/presentationScript';

export const PresentationScriptTab: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [speechLanguage, setSpeechLanguage] = useState<'arabic' | 'french'>('arabic');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [autoScroll, setAutoScroll] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeSection = presentationScriptSections.find(s => s.stepNumber === selectedStep) || presentationScriptSections[0];

  // Auto-scroll effect when in rehearsal mode
  useEffect(() => {
    let scrollInterval: any = null;
    if (autoScroll && contentRef.current) {
      scrollInterval = setInterval(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop += 1;
        }
      }, 50);
    }
    return () => clearInterval(scrollInterval);
  }, [autoScroll]);

  const handleCopyFullScript = () => {
    const fullText = presentationScriptSections.map(s => {
      const speech = speechLanguage === 'arabic' ? s.arabicSpeech : s.frenchSpeech;
      return `=== ${s.sectionTitle} (${s.timeSlot}) ===\n${s.actionCue}\n\n${speech}\n`;
    }).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const getTextSizeClass = () => {
    switch (fontSize) {
      case 'xlarge':
        return 'text-xl sm:text-2xl leading-relaxed';
      case 'large':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'normal':
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Header & Controls */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-sm font-bold">
              <Mic className="w-4 h-4" />
              <span>خطاب العرض الشفهي لمشروعي كلمة بكلمة</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              شنو غادي نقول قدام الأستاذ وزملائي في القسم
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed">
              هاد النص يوضح ليك بالتفصيل شنو تشرح في كل دقيقة من دقائق العرض. يمكنك قراءته <strong>بالعربية والدارجة المغربية</strong> أو <strong>بالفرنسية</strong> مع إشارات الحركات والعمل المباشر على الشاشة.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            
            {/* Language Switcher */}
            <div className="flex items-center bg-blue-50 dark:bg-blue-950/60 p-1.5 rounded-2xl border border-blue-200 dark:border-blue-900 text-base">
              <button
                onClick={() => setSpeechLanguage('arabic')}
                className={`px-4 py-2 rounded-xl font-extrabold transition-all ${
                  speechLanguage === 'arabic'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                العربية / الدارجة
              </button>
              <button
                onClick={() => setSpeechLanguage('french')}
                className={`px-4 py-2 rounded-xl font-extrabold transition-all ${
                  speechLanguage === 'french'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
              >
                الفرنسية (Français)
              </button>
            </div>

            {/* Font Size Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-700/60 p-1.5 rounded-2xl text-base">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                  fontSize === 'normal' ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                خط عادي
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                  fontSize === 'large' ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                خط كبير (موصى به)
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                  fontSize === 'xlarge' ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                خط عريض جداً
              </button>
            </div>

            {/* Auto-scroll rehearsal button */}
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-[17px] font-bold border transition-all ${
                autoScroll 
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/25' 
                  : 'bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
              title="نزول تلقائي للشاشة للتدرب على الإلقاء"
            >
              {autoScroll ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{autoScroll ? 'توقيف النزول التلقائي' : 'وضع التدريب التلقائي'}</span>
            </button>

            {/* Copy full script */}
            <button
              onClick={handleCopyFullScript}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-[17px] font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/25 transition-colors cursor-pointer"
            >
              {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span>{isCopied ? 'تم نسخ الخطاب كاملاً !' : 'نسخ النص الكامل'}</span>
            </button>

          </div>
        </div>

        {/* Step Navigation Pill Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 pt-4">
          {presentationScriptSections.map((sec) => {
            const isCurrent = sec.stepNumber === selectedStep;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedStep(sec.stepNumber)}
                className={`px-4 py-3 rounded-2xl text-[17px] font-bold transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="font-mono text-sm opacity-80 ml-1.5">المرحلة {sec.stepNumber}</span>
                <span>{sec.sectionTitle.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Spoken Text Card & Sidebar Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Spoken Text Prompter (8 cols) */}
        <div 
          ref={contentRef}
          className="lg:col-span-8 bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700 shadow-sm space-y-7 max-h-[780px] overflow-y-auto"
        >
          {/* Header of Section */}
          <div className="border-b border-slate-100 dark:border-slate-700/80 pb-5">
            <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
              المرحلة {activeSection.stepNumber} من 7 · التوقيت: {activeSection.timeSlot}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {activeSection.sectionTitle}
            </h2>
          </div>

          {/* Action Cue Highlight Box */}
          <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0 mt-1" />
            <div className="space-y-1">
              <span className="text-sm font-extrabold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 block">
                الحركة المطلوبة منك وتوجيه الشاشة في هاد المرحلة :
              </span>
              <p className="text-base sm:text-lg text-indigo-950 dark:text-indigo-100 font-bold leading-relaxed">
                {activeSection.actionCue}
              </p>
            </div>
          </div>

          {/* Spoken Speech Prose */}
          <div 
            className={`space-y-5 font-normal ${getTextSizeClass()}`}
            dir={speechLanguage === 'arabic' ? 'rtl' : 'ltr'}
          >
            {(speechLanguage === 'arabic' ? activeSection.arabicSpeech : activeSection.frenchSpeech).split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('[حركة') || paragraph.startsWith('[Action')) {
                return (
                  <p key={pIdx} className="text-base sm:text-lg font-bold text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/50 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                    {paragraph}
                  </p>
                );
              }
              return (
                <p key={pIdx} className="leading-relaxed text-slate-800 dark:text-slate-100 font-medium">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Step Pagination Footer */}
          <div className="flex justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-700/80">
            <button
              disabled={selectedStep === 1}
              onClick={() => setSelectedStep(selectedStep - 1)}
              className="px-5 py-3 text-base font-bold rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-30 cursor-pointer"
            >
              المرحلة السابقة
            </button>
            <span className="text-base font-mono font-bold text-slate-400">
              {selectedStep} / 7
            </span>
            <button
              disabled={selectedStep === presentationScriptSections.length}
              onClick={() => setSelectedStep(selectedStep + 1)}
              className="px-5 py-3 text-base font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-30 shadow-md shadow-blue-600/20 cursor-pointer"
            >
              المرحلة الموالية
            </button>
          </div>

        </div>

        {/* Sidebar: Vocabulary & Darija Confidence Tips (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Darija Advice */}
          <div className="bg-amber-50 dark:bg-amber-950/40 rounded-3xl p-7 border border-amber-200 dark:border-amber-900/50 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-extrabold text-base">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>نصيحة الكوتش بالدارجة المغربية :</span>
            </div>
            <p className="text-lg sm:text-xl text-amber-950 dark:text-amber-100 leading-relaxed font-bold">
              « {activeSection.coachAdviceDarija} »
            </p>
          </div>

          {/* Key Vocabulary */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-base">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>المصطلحات التقنية الأساسية في هاد المرحلة :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeSection.keyVocabulary.map((vocab, vIdx) => (
                <span 
                  key={vIdx}
                  className="text-sm sm:text-base font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                >
                  {vocab}
                </span>
              ))}
            </div>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed pt-2">
              استعمال هاد المصطلحات كيبيّن للأستاذ باللي راك فاهم المعايير الهندسية لمشروعك.
            </p>
          </div>

          {/* Quick Memory Aid */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-extrabold text-slate-900 dark:text-white block text-lg">
              💡 حيلة للتخلص من التوتر :
            </span>
            <p>
              إلا تبلوكات ليك شي فكرة ولا نسيتي شي تفصيل، ما تقلقش. سكت جوج ثواني وشوف في الشاشة وابتسم، وبدا بكل هدوء بجملة: <em>«كما كتلاحظوا معايا هنا في الصفحة...»</em> وكمل الشرح بكل راحة.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
