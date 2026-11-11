import React, { useState, useRef } from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  RotateCcw, 
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { skillUpIndexHtml, skillUpStyleCss, skillUpScriptJs } from '../data/projectFiles';

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export const LivePreviewTab: React.FC = () => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [highlightComponents, setHighlightComponents] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Generate combined HTML document for srcdoc
  const generateSrcDoc = () => {
    const highlightCss = highlightComponents ? `
      <style id="bs-highlighter">
        .container, .container-fluid { outline: 2px dashed #06b6d4 !important; outline-offset: -2px; }
        .row { outline: 2px dashed #f97316 !important; outline-offset: -2px; }
        [class*="col-"] { outline: 1px dashed #8b5cf6 !important; outline-offset: -1px; }
        .navbar { outline: 3px solid #10b981 !important; }
        .card { outline: 2px solid #3b82f6 !important; }
        .badge { outline: 2px solid #eab308 !important; }
        .btn { outline: 1px dotted #ec4899 !important; }
      </style>
    ` : '';

    let html = skillUpIndexHtml.replace(
      '<link rel="stylesheet" href="css/style.css">',
      `<style>${skillUpStyleCss}</style>${highlightCss}`
    );

    html = html.replace(
      '<script src="js/script.js"></script>',
      `<script>${skillUpScriptJs}</script>`
    );

    return html;
  };

  const reloadIframe = () => {
    setIframeKey(prev => prev + 1);
  };

  const getDeviceWidthClass = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-[375px]';
      case 'tablet':
        return 'w-[768px]';
      case 'desktop':
      default:
        return 'w-full max-w-[1280px]';
    }
  };

  const getBreakpointLabel = () => {
    switch (deviceMode) {
      case 'mobile':
        return { 
          label: 'شاشة الهاتف (أقل من 576px - xs)', 
          badge: 'col-12 شغال', 
          desc: 'كارت وحدة في كل سطر مع ميني برغر Burger Menu' 
        };
      case 'tablet':
        return { 
          label: 'شاشة الطابليت (768px - md)', 
          badge: 'col-md-6 شغال', 
          desc: '2 كروت في السطر الواحد متناسقين' 
        };
      case 'desktop':
      default:
        return { 
          label: 'شاشة الحاسوب (أكبر من 992px - lg/xl)', 
          badge: 'col-lg-4 شغال', 
          desc: '3 كروت في السطر الواحد وشريط التنقل مسرح بالكامل' 
        };
    }
  };

  const breakpointInfo = getBreakpointLabel();

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Controls Toolbar */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        
        {/* Device Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-2xl">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold transition-all ${
              deviceMode === 'desktop'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Monitor className="w-5 h-5" />
            <span>حاسوب</span>
            <span className="text-xs opacity-75 font-mono" dir="ltr">(100%)</span>
          </button>

          <button
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold transition-all ${
              deviceMode === 'tablet'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Tablet className="w-5 h-5" />
            <span>طابليت</span>
            <span className="text-xs opacity-75 font-mono" dir="ltr">(768px)</span>
          </button>

          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold transition-all ${
              deviceMode === 'mobile'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <span>هاتف</span>
            <span className="text-xs opacity-75 font-mono" dir="ltr">(375px)</span>
          </button>
        </div>

        {/* Breakpoint Indicator */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <span className="text-base font-extrabold text-slate-800 dark:text-slate-200 block">
              {breakpointInfo.label}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 block font-medium">
              {breakpointInfo.desc}
            </span>
          </div>
          <span className="text-sm font-mono font-bold px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300">
            {breakpointInfo.badge}
          </span>
        </div>

        {/* Action Buttons: Highlight & Reload */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setHighlightComponents(!highlightComponents)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[17px] font-bold transition-all border ${
              highlightComponents
                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/25'
                : 'bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
            title="تحديد وإبراز كلاسات بوتستراب بإطارات ملونة"
          >
            <Layers className="w-5 h-5" />
            <span>{highlightComponents ? 'إخفاء الإطارات الملونة' : 'فحص عناصر بوتستراب'}</span>
          </button>

          <button
            onClick={reloadIframe}
            className="p-3 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors"
            title="إعادة تحميل المعاينة"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Highlighter Legend Bar (when active) */}
      {highlightComponents && (
        <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 rounded-2xl p-4 flex flex-wrap items-center gap-5 text-sm font-mono">
          <span className="font-extrabold text-purple-900 dark:text-purple-300">دليل ألوان بوتستراب :</span>
          <span className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 font-bold" dir="ltr">
            <span className="w-3.5 h-3.5 border-2 border-dashed border-cyan-500 rounded-xs"></span>
            .container
          </span>
          <span className="flex items-center gap-2 text-orange-700 dark:text-orange-300 font-bold" dir="ltr">
            <span className="w-3.5 h-3.5 border-2 border-dashed border-orange-500 rounded-xs"></span>
            .row
          </span>
          <span className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold" dir="ltr">
            <span className="w-3.5 h-3.5 border-2 border-dashed border-purple-500 rounded-xs"></span>
            .col-*
          </span>
          <span className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold" dir="ltr">
            <span className="w-3.5 h-3.5 border-2 border-emerald-500 rounded-xs"></span>
            .navbar
          </span>
          <span className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold" dir="ltr">
            <span className="w-3.5 h-3.5 border-2 border-blue-500 rounded-xs"></span>
            .card
          </span>
        </div>
      )}

      {/* Interactive Frame Container */}
      <div className="bg-slate-200/80 dark:bg-slate-950/80 rounded-3xl p-4 sm:p-8 flex justify-center items-center overflow-x-auto min-h-[740px] border border-slate-300/80 dark:border-slate-800">
        <div 
          className={`transition-all duration-300 ease-out bg-white dark:bg-slate-900 shadow-2xl rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 flex flex-col ${getDeviceWidthClass()}`}
          style={{ height: '780px' }}
        >
          {/* Fake Browser Window Top Bar */}
          <div className="bg-slate-100 dark:bg-slate-800 px-5 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between shrink-0" dir="ltr">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            
            <div className="flex-1 max-w-sm mx-4 bg-white dark:bg-slate-900 px-3.5 py-1 rounded-lg text-xs font-mono text-slate-500 dark:text-slate-400 text-center truncate border border-slate-200 dark:border-slate-700">
              https://skillup-academy.ma/index.html
            </div>

            <div className="text-xs font-mono text-slate-500 font-semibold">
              {deviceMode === 'desktop' ? '1280px' : deviceMode === 'tablet' ? '768px' : '375px'}
            </div>
          </div>

          {/* Real Live Iframe executing Bootstrap 5 */}
          <iframe
            key={iframeKey}
            ref={iframeRef}
            srcDoc={generateSrcDoc()}
            title="SkillUp Academy Live Preview"
            className="w-full flex-1 border-0"
            sandbox="allow-scripts allow-same-origin allow-modals"
          />
        </div>
      </div>

      {/* Practical Guide for Live Demo During Defense (18px-20px font) */}
      <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-3xl p-7 sm:p-9 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-900 dark:text-blue-300 font-extrabold text-xl">
          <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <span>شنو خاصك تورّي للأستاذ في العرض المباشر (Checklist) :</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-base sm:text-lg text-slate-800 dark:text-slate-200">
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-blue-100 dark:border-blue-900/50 space-y-2">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-lg">1. الفلترة والبحث المباشر :</span>
            كليكي على أزرار الفلتر «Web» و «Data» و «Design»، وجرّب تكتب كلمة «Bootstrap» في خانة البحث باش يشوف النتائج كتصفي في الحين.
          </div>
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-blue-100 dark:border-blue-900/50 space-y-2">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-lg">2. المودال والإشعار (Toast) :</span>
            كليكي على زر «تسجيل» في أي دورة، ووريه النافذة المنبثقة موسطة وعنوان الدورة فيها مكتوب أوتوماتيك، ومن بعد اضغط تأكيد باش يشوف الإشعار الأخضر تحت.
          </div>
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-blue-100 dark:border-blue-900/50 space-y-2">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-lg">3. التجاوب في الهاتف :</span>
            كليكي على زر «هاتف (375px)» الفوق، ووريه باللي الكروت كيهبطو لوحدة في السطر والمنيو كيرجع ميني برغر كيتحل بالنقرة.
          </div>
        </div>
      </div>

    </div>
  );
};
