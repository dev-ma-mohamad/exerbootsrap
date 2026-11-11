import React, { useState } from 'react';
import { 
  X, 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Code2
} from 'lucide-react';
import { projectFilesList, ProjectFile } from '../data/projectFiles';

interface ProjectSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectSourceModal: React.FC<ProjectSourceModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentFile = projectFilesList[selectedFileIndex];

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const downloadFile = (file: ProjectFile) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAllFiles = () => {
    projectFilesList.forEach((file, index) => {
      setTimeout(() => {
        downloadFile(file);
      }, index * 300);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-7 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
              <FileCode className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h2 className="font-extrabold text-xl text-slate-900 dark:text-white leading-tight">
                الملفات المصدرية الكاملة لمشروع SkillUp Academy
              </h2>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                هيكل HTML5 سليم، ملف CSS3 مخصص، وملف JavaScript نقي
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadAllFiles}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md shadow-blue-600/20"
            >
              <Download className="w-4 h-4" />
              <span>تحميل الملفات الـ 3 معاً</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* File Tabs */}
        <div className="px-7 py-3 bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2.5 shrink-0">
          {projectFilesList.map((file, idx) => {
            const isActive = selectedFileIndex === idx;
            return (
              <button
                key={file.name}
                onClick={() => setSelectedFileIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-base font-mono font-bold transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700'
                    : 'text-slate-700 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span dir="ltr">{file.name}</span>
                <span className="text-xs opacity-75 font-sans font-medium" dir="ltr">({file.content.split('\n').length} سطر)</span>
              </button>
            );
          })}
        </div>

        {/* Current File Metadata & Actions */}
        <div className="px-7 py-3.5 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 text-base">
          <p className="text-slate-700 dark:text-slate-300 font-medium">
            <strong>المسار :</strong> <code className="font-mono text-blue-600 dark:text-blue-400 font-bold" dir="ltr">{currentFile.path}</code> — {currentFile.description}
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleCopy(currentFile.content, selectedFileIndex)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 font-bold text-sm"
            >
              {copiedIndex === selectedFileIndex ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">تم النسخ بنجاح !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ محتوى الملف</span>
                </>
              )}
            </button>
            <button
              onClick={() => downloadFile(currentFile)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 font-bold text-sm"
            >
              <Download className="w-4 h-4" />
              <span>تحميل</span>
            </button>
          </div>
        </div>

        {/* Code View Area */}
        <div className="flex-1 overflow-auto p-6 bg-slate-950 text-slate-100 font-mono text-sm leading-relaxed" dir="ltr">
          <pre className="overflow-x-auto text-left">
            <code>{currentFile.content}</code>
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-7 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-between items-center shrink-0 text-base text-slate-600 dark:text-slate-400">
          <span className="font-medium">المجموع : 3 ملفات جاهزة للتشغيل الفوري في المتصفح</span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold hover:bg-slate-300 transition-colors"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
