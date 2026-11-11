import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Tv, 
  UserCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { presentationPlanPhases, PresentationPhase } from '../data/presentationPlan';

export const PresentationPlanTab: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Determine active phase based on elapsed seconds (total 20 min = 1200 sec)
  useEffect(() => {
    const minutes = seconds / 60;
    if (minutes < 2) setActivePhaseIndex(0);
    else if (minutes < 5) setActivePhaseIndex(1);
    else if (minutes < 8) setActivePhaseIndex(2);
    else if (minutes < 10) setActivePhaseIndex(3);
    else if (minutes < 14) setActivePhaseIndex(4);
    else if (minutes < 18) setActivePhaseIndex(5);
    else setActivePhaseIndex(6);
  }, [seconds]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
    setActivePhaseIndex(0);
  };

  const jumpToPhase = (index: number) => {
    setActivePhaseIndex(index);
    const phaseStartMinutes = [0, 2, 5, 8, 10, 14, 18];
    setSeconds(phaseStartMinutes[index] * 60);
  };

  const progressPercent = Math.min(100, (seconds / 1200) * 100);

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Chrono & Timing Dashboard */}
      <div className="bg-gradient-to-l from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-slate-700/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-sm font-bold">
              <Clock className="w-4 h-4" />
              <span>الكرونومتر الرسمي لتدريب العرض (20 دقيقة)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              خطة إلقاء العرض موزعة بالدقائق · 20 Min Chrono
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl max-w-2xl leading-relaxed">
              تدرب على احترام الوقت المحدد لكل مرحلة باش ما يقاطعكش الأستاذ وباش توريه كل الميزات بلا ما يداهمك الوقت.
            </p>
          </div>

          {/* Stopwatch Controls */}
          <div className="flex items-center gap-5 bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 self-start md:self-auto shrink-0 shadow-lg">
            <div className="text-center min-w-[120px]" dir="ltr">
              <span className="text-4xl sm:text-5xl font-mono font-black tracking-wider text-blue-400 block tabular-nums">
                {formatTime(seconds)}
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mt-1">
                / 20:00 الحد الأقصى
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`p-4 rounded-2xl font-bold flex items-center justify-center transition-all ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                }`}
                title={isRunning ? "إيقاف مؤقت" : "بدء العد التنازلي"}
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              <button
                onClick={resetTimer}
                className="p-4 rounded-2xl bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
                title="إعادة التصفير"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="mt-8 pt-6 border-t border-slate-700/80 space-y-3">
          <div className="flex justify-between text-base font-bold text-slate-300">
            <span>التقدم في مدة العرض الشفهي :</span>
            <span className="font-mono" dir="ltr">{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700" dir="ltr">
            <div 
              className={`h-full transition-all duration-300 ${
                progressPercent > 90 
                  ? 'bg-rose-500' 
                  : progressPercent > 70 
                    ? 'bg-amber-500' 
                    : 'bg-blue-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* Timeline Steps Interactive Bar */}
      <div className="flex flex-wrap items-center gap-2.5 pb-2">
        {presentationPlanPhases.map((phase, idx) => {
          const isCurrent = activePhaseIndex === idx;
          return (
            <button
              key={phase.id}
              onClick={() => jumpToPhase(idx)}
              className={`px-4 py-3 rounded-2xl text-[17px] font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border ${
                isCurrent
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/25'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="font-mono text-sm opacity-90" dir="ltr">{phase.timeRange}</span>
              <span>·</span>
              <span>{phase.titleAr.split('.')[1] || phase.titleAr}</span>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive Card */}
      {(() => {
        const currentPhase = presentationPlanPhases[activePhaseIndex];
        return (
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-7">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/80 pb-6">
              <div className="space-y-1.5">
                <span className="text-sm font-bold font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-xl">
                  المرحلة {currentPhase.id} من 7 · التوقيت: {currentPhase.timeRange} ({currentPhase.durationMinutes} دقائق)
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
                  {currentPhase.titleAr}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-base font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-600">
                <Tv className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>ما يُعرض على الشاشة : {currentPhase.whatToShowAr}</span>
              </div>
            </div>

            {/* Objective */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
              <span className="font-extrabold text-lg text-slate-900 dark:text-white block">🎯 الهدف الرئيسي من هاد المرحلة :</span>
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {currentPhase.objectiveAr}
              </p>
            </div>

            {/* Key points to say */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                النقاط الأساسية لي خاصك تهضر عليها :
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentPhase.keyPointsAr.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-base">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-slate-900 dark:text-slate-100 leading-relaxed font-bold">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="space-y-3">
              <h3 className="text-base font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span>الأخطاء والفخاخ لي خاصك تجنبها :</span>
              </h3>
              <ul className="list-disc list-inside text-base sm:text-lg text-rose-950 dark:text-rose-200 space-y-2 bg-rose-50 dark:bg-rose-950/40 p-6 rounded-2xl border border-rose-200 dark:border-rose-900/50 leading-relaxed font-medium">
                {currentPhase.mistakesToAvoidAr.map((err, eIdx) => (
                  <li key={eIdx}>{err}</li>
                ))}
              </ul>
            </div>

            {/* Coach Darija Advice */}
            <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-start gap-4">
              <Lightbulb className="w-7 h-7 text-amber-600 dark:text-amber-400 shrink-0 mt-1" />
              <div className="space-y-1.5">
                <h4 className="text-base font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  نصيحة الكوتش بالدارجة المغربية :
                </h4>
                <p className="text-lg sm:text-xl text-amber-950 dark:text-amber-100 font-bold leading-relaxed">
                  « {currentPhase.speakerTipDarija} »
                </p>
              </div>
            </div>

            {/* Next / Previous Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-700/80">
              <button
                disabled={activePhaseIndex === 0}
                onClick={() => jumpToPhase(activePhaseIndex - 1)}
                className="inline-flex items-center gap-2 px-5 py-3 text-base font-bold rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 disabled:opacity-40"
              >
                <span>المرحلة السابقة</span>
              </button>
              <button
                disabled={activePhaseIndex === presentationPlanPhases.length - 1}
                onClick={() => jumpToPhase(activePhaseIndex + 1)}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 shadow-md shadow-blue-600/20"
              >
                <span>المرحلة الموالية</span>
              </button>
            </div>

          </div>
        );
      })()}

      {/* Defense Day Physical Checklist */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <UserCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            وصايا يوم المناقشة (قبل ما تطلع قدام الأستاذ)
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-base">
          <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-blue-600 dark:text-blue-400 block text-lg">1. تفقّد الشاشة :</strong> 
            فتح السيت في المتصفح ودير ملء الشاشة (F11) قبل ما يبدا الدور ديالك.
          </div>
          <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-blue-600 dark:text-blue-400 block text-lg">2. تكبير الخط (Zoom) :</strong> 
            دير زوم 100% ولا 110% باش الناس لي جالسين في اللور يشوفو الكود واضح.
          </div>
          <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-blue-600 dark:text-blue-400 block text-lg">3. تجربة F12 :</strong> 
            تدرب دير Ctrl+Shift+M باش تصغر الشاشة بسرعة وتوريه الهاتف.
          </div>
          <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <strong className="text-blue-600 dark:text-blue-400 block text-lg">4. تنفس وثقة :</strong> 
            تنفس بعمق وابتسم، نتا فاهم مشروعك مزيان وغادي تبهر الأستاذ إن شاء الله!
          </div>
        </div>
      </div>

    </div>
  );
};
