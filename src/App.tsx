import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ProjectAnalysisTab } from './components/ProjectAnalysisTab';
import { CodeExplanationTab } from './components/CodeExplanationTab';
import { LivePreviewTab } from './components/LivePreviewTab';
import { PracticalWorkshopTab } from './components/PracticalWorkshopTab';
import { PresentationPlanTab } from './components/PresentationPlanTab';
import { PresentationScriptTab } from './components/PresentationScriptTab';
import { TeacherQuestionsTab } from './components/TeacherQuestionsTab';
import { OralExamSimulatorTab } from './components/OralExamSimulatorTab';
import { ProjectSourceModal } from './components/ProjectSourceModal';

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
      <ProjectSourceModal
        isOpen={isFilesModalOpen}
        onClose={() => setIsFilesModalOpen(false)}
      />

    </div>
  );
}
