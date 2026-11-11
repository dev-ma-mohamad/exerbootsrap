import React, { useState } from 'react';
import { 
  Code2, 
  Copy, 
  Check, 
  HelpCircle, 
  Lightbulb, 
  Sparkles, 
  Grid3X3, 
  Layout, 
  Sliders,
  Smartphone
} from 'lucide-react';
import { codeConceptsList, CodeConcept } from '../data/codeExplanations';

export const CodeExplanationTab: React.FC = () => {
  const [selectedConceptId, setSelectedConceptId] = useState<string>('container-vs-fluid');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive 12-Column Grid Simulation State
  const [col1Width, setCol1Width] = useState<number>(4);
  const [col2Width, setCol2Width] = useState<number>(4);
  const [col3Width, setCol3Width] = useState<number>(4);

  const categories = [
    { id: 'all', label: 'جميع المفاهيم (10)' },
    { id: 'layout', label: 'تقسيم الشاشة والشبكة' },
    { id: 'components', label: 'المكونات والعناصر (UI)' },
    { id: 'forms', label: 'النماذج والتأكد من الصحة' },
    { id: 'utilities', label: 'أدوات التوزيع والمسافات' },
    { id: 'architecture', label: 'تكامل التقنيات وهندسة الكود' }
  ];

  const filteredConcepts = activeCategory === 'all' 
    ? codeConceptsList 
    : codeConceptsList.filter(c => c.category === activeCategory);

  const selectedConcept = codeConceptsList.find(c => c.id === selectedConceptId) || codeConceptsList[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalCols = col1Width + col2Width + col3Width;

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-sm font-bold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>شرح خطوة بخطوة بالدارجة المغربية · بلا حفيظة</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            فهم كل كلاس وكل سطر في مشروع SkillUp Academy
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            باش تدوز السوتنانس وتجيب نقطة ممتازة، خاصك تفهم الخدمة ماشي تحفظ الكود. هنا غادي تلقى لكل مفهوم: 
            <strong> الاسم ديالو</strong>، <strong>شنو كيدير</strong>، <strong>علاش استعملناه</strong>، 
            <strong> كيفاش خدام تقنياً</strong>، والأهم 
            <span className="text-blue-600 dark:text-blue-400 font-extrabold"> الشرح بالدارجة المغربية بحروف عربية واضحة</span> مع الأسئلة لي كيحطها الأستاذ ديما!
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 text-base sm:text-[17px] font-bold rounded-xl whitespace-nowrap transition-colors shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Concepts List & Active Concept Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left list of concepts (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            قائمة المفاهيم ({filteredConcepts.length})
          </h2>
          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pl-1">
            {filteredConcepts.map(concept => {
              const isSelected = concept.id === selectedConceptId;
              return (
                <button
                  key={concept.id}
                  onClick={() => setSelectedConceptId(concept.id)}
                  className={`w-full text-right p-4 rounded-2xl border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-600 shadow-md shadow-blue-600/10'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white line-clamp-1">
                      {concept.name}
                    </span>
                    <span className="text-xs uppercase font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 shrink-0">
                      {concept.category}
                    </span>
                  </div>
                  <code className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400 text-left line-clamp-1" dir="ltr">
                    {concept.bootstrapClass}
                  </code>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right detail card (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-8">
          
          {/* Header of Concept */}
          <div className="border-b border-slate-100 dark:border-slate-700/80 pb-6 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300">
                {selectedConcept.category}
              </span>
              <code className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/60 px-3 py-1 rounded-xl" dir="ltr">
                {selectedConcept.bootstrapClass}
              </code>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {selectedConcept.name}
            </h2>
          </div>

          {/* Special Box: Explication en Darija Marocaine (ARABIC CHARACTERS, 18px-20px) */}
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-300 font-extrabold text-lg">
              <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>شرح المفهوم بالدارجة المغربية المبسطة :</span>
            </div>
            <p className="text-lg sm:text-xl text-amber-950 dark:text-amber-100 leading-relaxed font-bold">
              {selectedConcept.darijaExplanation}
            </p>
          </div>

          {/* 3 Detail Cards (What, Why, How) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400">
                1. شنو هو هاد العنصر؟
              </h3>
              <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {selectedConcept.whatItDoesFr}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400">
                2. علاش درناه في SkillUp؟
              </h3>
              <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {selectedConcept.whyWeUsedItFr}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="text-sm font-bold uppercase text-slate-500 dark:text-slate-400">
                3. كيفاش كيخدم تقنياً؟
              </h3>
              <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {selectedConcept.howItWorksFr}
              </p>
            </div>

          </div>

          {/* Code Example Snippet */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-slate-700 dark:text-slate-300">
                مثال مبسط في الكود :
              </span>
              <button
                onClick={() => handleCopy(selectedConcept.simpleExampleFr, selectedConcept.id)}
                className="inline-flex items-center gap-1.5 text-base font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copiedId === selectedConcept.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">تم النسخ بنجاح !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ الكود</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-sm overflow-x-auto leading-relaxed border border-slate-800 text-left" dir="ltr">
              {selectedConcept.simpleExampleFr}
            </pre>
          </div>

          {/* Ce que le prof attend / Question Piège */}
          <div className="p-5 sm:p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-4">
            <HelpCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0 mt-1" />
            <div className="space-y-1">
              <h4 className="font-extrabold text-base uppercase text-rose-900 dark:text-rose-300">
                السؤال الفخ لي كيحطو الأستاذ ديما :
              </h4>
              <p className="text-base sm:text-lg text-rose-950 dark:text-rose-100 font-bold leading-relaxed">
                {selectedConcept.teacherKeyPoint}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Visual 12-Column Grid Simulator */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/80 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <Grid3X3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                محاكي تفاعلي لشبكة الـ 12 عمود (Grid Simulator)
              </h2>
            </div>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
              جرّب بيديك وشوف كيفاش بوتستراب كيقسم السطر <code className="font-mono text-blue-600 dark:text-blue-400 font-bold">.row</code> إلى 12 جزء.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-slate-700 dark:text-slate-300">مجموع الأعمدة:</span>
            <span className={`px-4 py-1.5 rounded-full text-base font-extrabold ${
              totalCols === 12 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300' 
                : totalCols < 12 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300' 
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
            }`}>
              {totalCols} / 12 {totalCols > 12 && '(العنصر الزايد غايهبط لتحت أوتوماتيك)'}
            </span>
          </div>
        </div>

        {/* Sliders for 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between text-base font-bold">
              <span>الكتلة 1 : <code className="text-blue-600 dark:text-blue-400 font-mono">col-{col1Width}</code></span>
              <span className="text-slate-500">{(col1Width / 12 * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="12" 
              value={col1Width}
              onChange={(e) => setCol1Width(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2"
            />
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between text-base font-bold">
              <span>الكتلة 2 : <code className="text-emerald-600 dark:text-emerald-400 font-mono">col-{col2Width}</code></span>
              <span className="text-slate-500">{(col2Width / 12 * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="12" 
              value={col2Width}
              onChange={(e) => setCol2Width(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2"
            />
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between text-base font-bold">
              <span>الكتلة 3 : <code className="text-purple-600 dark:text-purple-400 font-mono">col-{col3Width}</code></span>
              <span className="text-slate-500">{(col3Width / 12 * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="12" 
              value={col3Width}
              onChange={(e) => setCol3Width(parseInt(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer h-2"
            />
          </div>
        </div>

        {/* Visual 12-Column Grid Representation */}
        <div className="space-y-3">
          <div className="text-base font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span>التمثيل المرئي في السطر <code className="font-mono text-blue-600 dark:text-blue-400">.row</code> :</span>
            <span className="text-sm">12 عمود افتراضي</span>
          </div>

          {/* 12 background guide ticks */}
          <div className="relative p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 overflow-hidden" dir="ltr">
            <div className="grid grid-cols-12 gap-1.5 mb-2.5 opacity-40 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-6 bg-slate-400 dark:bg-slate-600 rounded text-[11px] flex items-center justify-center font-mono font-bold text-slate-800 dark:text-slate-200">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Simulated Row with flex-wrap */}
            <div className="flex flex-wrap gap-2">
              <div 
                style={{ width: `calc(${(col1Width / 12) * 100}% - 8px)` }}
                className="h-20 rounded-xl bg-blue-600 text-white font-bold text-sm flex flex-col items-center justify-center transition-all p-2 shadow-sm"
              >
                <span>الكتلة 1</span>
                <span className="text-xs opacity-90 font-mono">col-{col1Width} ({(col1Width / 12 * 100).toFixed(0)}%)</span>
              </div>

              <div 
                style={{ width: `calc(${(col2Width / 12) * 100}% - 8px)` }}
                className="h-20 rounded-xl bg-emerald-600 text-white font-bold text-sm flex flex-col items-center justify-center transition-all p-2 shadow-sm"
              >
                <span>الكتلة 2</span>
                <span className="text-xs opacity-90 font-mono">col-{col2Width} ({(col2Width / 12 * 100).toFixed(0)}%)</span>
              </div>

              <div 
                style={{ width: `calc(${(col3Width / 12) * 100}% - 8px)` }}
                className="h-20 rounded-xl bg-purple-600 text-white font-bold text-sm flex flex-col items-center justify-center transition-all p-2 shadow-sm"
              >
                <span>الكتلة 3</span>
                <span className="text-xs opacity-90 font-mono">col-{col3Width} ({(col3Width / 12 * 100).toFixed(0)}%)</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl text-base text-blue-950 dark:text-blue-200 border border-blue-200/60 dark:border-blue-900/40 leading-relaxed">
            <strong>شرح تقني للأستاذ :</strong> فاش كيكون مجموع الكولونات كبر من 12 (مثلاً 6 + 6 + 4 = 16)، خاصية <code className="font-mono font-bold">flex-wrap: wrap</code> لي كاينة في الكلاس <code className="font-mono font-bold">.row</code> كتهبط العنصر الزايد أوتوماتيك للسطر التحتاني بلا مايخسر الإطار ديال الصفحة.
          </div>
        </div>

      </div>

    </div>
  );
};
