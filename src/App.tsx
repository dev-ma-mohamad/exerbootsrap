import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ProjectAnalysisTab } from './components/ProjectAnalysisTab';

// Code splitting: Lazy-load non-initial tabs and heavy modals to keep the initial page load instant and lean
const CodeExplanationTab = lazy(() => import('./components/CodeExplanationTab').then(m => ({ default: m.CodeExplanationTab })));
const LivePreviewTab = lazy(() => import('./components/LivePreviewTab').then(m => ({ default: m.LivePreviewTab })));
const PracticalWorkshopTab = lazy(() => import('./components/PracticalWorkshopTab').then(m => ({ default: m.PracticalWorkshopTab })));
const PresentationPlanTab = lazy(() => import('./components/PresentationPlanTab').then(m => ({ default: m.PresentationPlanTab })));
const PresentationScriptTab = lazy(() => import('./components/PresentationScriptTab').then(m => ({ default: m.PresentationScriptTab })));
const TeacherQuestionsTab = lazy(() => import('./components/TeacherQuestionsTab').then(m => ({ default: m.TeacherQuestionsTab })));
const OralExamSimulatorTab = lazy(() => import('./components/OralExamSimulatorTab').then(m => ({ default: m.OralExamSimulatorTab })));
const ProjectSourceModal = lazy(() => import('./components/ProjectSourceModal').then(m => ({ default: m.ProjectSourceModal })));

const TabLoadingFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[420px] p-8 text-center animate-pulse" aria-busy="true" aria-live="polite">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
    <p className="text-slate-600 dark:text-slate-300 font-bold text-base">جاري تحميل المحتوى...</p>
    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">يتم استدعاء المكونات البرمجية عند الطلب لتحسين سرعة وأداء التطبيق</p>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('analysis');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isFilesModalOpen, setIsFilesModalOpen] = useState<boolean>(false);

  // Sync dark class on documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenFiles={() => setIsFilesModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Suspense fallback={<TabLoadingFallback />}>
          {activeTab === 'analysis' && (
            <ProjectAnalysisTab 
              setActiveTab={setActiveTab} 
              onOpenFiles={() => setIsFilesModalOpen(true)} 
            />
          )}
          {activeTab === 'code' && <CodeExplanationTab />}
          {activeTab === 'preview' && <LivePreviewTab />}
          {activeTab === 'workshop' && <PracticalWorkshopTab />}
          {activeTab === 'plan' && <PresentationPlanTab />}
          {activeTab === 'script' && <PresentationScriptTab />}
          {activeTab === 'questions' && <TeacherQuestionsTab />}
          {activeTab === 'exam' && <OralExamSimulatorTab />}
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12 text-sm sm:text-base text-slate-600 dark:text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">أكاديمية سكيل آب (SkillUp Academy)</span>
            <span className="hidden sm:inline">·</span>
            <span>المدرب البيداغوجي الشامل ومحاكي العرض الشفوي لمشروع Bootstrap 5 بالدارجة المغربية</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <button
              onClick={() => setIsFilesModalOpen(true)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-bold text-sm sm:text-base cursor-pointer"
            >
              ملفات المشروع (index.html, style.css, script.js)
            </button>
            <span className="hidden sm:inline">·</span>
            <span className="font-medium text-slate-500 dark:text-slate-400">100% متوافق مع الهواتف و Bootstrap 5.3</span>
          </div>
        </div>
      </footer>

      {/* Source Files Modal */}
      {isFilesModalOpen && (
        <Suspense fallback={null}>
          <ProjectSourceModal
            isOpen={isFilesModalOpen}
            onClose={() => setIsFilesModalOpen(false)}
          />
        </Suspense>
      )}

    </div>
  );
}
