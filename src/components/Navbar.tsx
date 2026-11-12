import React from 'react';
import { 
  BookOpen, 
  Code2, 
  MonitorPlay, 
  Wrench, 
  Clock, 
  Mic, 
  HelpCircle, 
  GraduationCap, 
  FolderDown, 
  Moon, 
  Sun 
} from 'lucide-react';

export type ActiveTab = 
  | 'analysis' 
  | 'code' 
  | 'preview' 
  | 'workshop' 
  | 'plan' 
  | 'script' 
  | 'questions' 
  | 'exam' 
  | 'files';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenFiles: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
  onOpenFiles
}) => {
  const tabs = [
    { id: 'analysis' as ActiveTab, num: '1', label: 'تحليل مشروعي', icon: BookOpen },
    { id: 'code' as ActiveTab, num: '2', label: 'شرح الكود بالدارجة', icon: Code2 },
    { id: 'preview' as ActiveTab, num: '3', label: 'تجربة السيت المباشرة', icon: MonitorPlay },
    { id: 'workshop' as ActiveTab, num: '4', label: 'ورشة التعديل والتطبيق', icon: Wrench },
    { id: 'plan' as ActiveTab, num: '5', label: 'خطة الـ 20 دقيقة', icon: Clock },
    { id: 'script' as ActiveTab, num: '6', label: 'خطاب الإلقاء الشفهي', icon: Mic },
    { id: 'questions' as ActiveTab, num: '7', label: 'أسئلة الأستاذ الـ 20', icon: HelpCircle },
    { id: 'exam' as ActiveTab, num: '8', label: 'أستاذك الافتراضي (امتحان)', icon: GraduationCap },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Bar */}
        <div className="flex items-center justify-between py-3.5 border-b border-slate-100 dark:border-slate-800/80 gap-4">
          
          {/* Logo & Project Title */}
          <button 
            onClick={() => setActiveTab('analysis')}
            className="flex items-center gap-3 text-right group focus:outline-none cursor-pointer"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/25 group-hover:bg-blue-700 transition-colors shrink-0">
              BS5
            </div>
            <div>
              <span className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight block">
                SkillUp Academy
              </span>
              <span className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 block">
                مشروعي المصغر · التحليل، شرح الكود والاستعداد للمناقشة
              </span>
            </div>
          </button>

          {/* Quick Action Tools: Dark Mode & Code Files */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="/"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs sm:text-sm font-bold border border-blue-200 dark:border-blue-800 transition-colors"
              title="العودة إلى الأكاديمية الرئيسية ومسار الـ 20 مرحلة"
            >
              <span>← الأكاديمية الرئيسية</span>
            </a>

            <button
              onClick={toggleDarkMode}
              className="p-2.5 sm:p-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
              title={isDarkMode ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي"}
              aria-label="تبديل الثيم"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            <button
              onClick={onOpenFiles}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors border border-slate-300 dark:border-slate-700 shadow-xs cursor-pointer"
              title="عرض وتحميل ملفات الكود الثلاثة"
            >
              <FolderDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              <span className="hidden xs:inline">ملفات الكود</span>
            </button>
          </div>

        </div>

        {/* Navigation Tabs Grid: 4 columns on desktop/tablet, 2 columns on mobile. NO HORIZONTAL SCROLLBAR! */}
        <nav className="py-2.5 sm:py-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:py-2.5 rounded-xl font-bold text-sm sm:text-[15px] lg:text-base transition-all text-right border cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25 ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 hover:border-slate-300'
                  }`}
                >
                  <span 
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg font-mono font-black text-xs sm:text-sm flex items-center justify-center shrink-0 transition-colors ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300'
                    }`}
                  >
                    {tab.num}
                  </span>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                  <span className="truncate leading-tight">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

      </div>
    </header>
  );
};
