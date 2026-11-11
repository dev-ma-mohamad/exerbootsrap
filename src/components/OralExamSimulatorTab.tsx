import React, { useState } from 'react';
import { 
  GraduationCap, 
  Send, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Lightbulb, 
  RotateCcw, 
  Sparkles,
  ArrowLeft,
  UserCheck
} from 'lucide-react';
import { teacherQuestionsList, TeacherQuestion } from '../data/teacherQuestions';

interface AnswerEvaluation {
  score: number;
  isCorrect: boolean;
  verdict: string;
  feedback: string;
  missingPoints: string[];
  darijaCorrection: string;
}

export const OralExamSimulatorTab: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answerMode, setAnswerMode] = useState<'qcm' | 'text'>('qcm');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [evaluation, setEvaluation] = useState<AnswerEvaluation | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [examFinished, setExamFinished] = useState<boolean>(false);

  const examQuestions = teacherQuestionsList.slice(0, 10);
  const currentQuestion = examQuestions[currentQuestionIndex];

  // Evaluate typed answer using intelligent keyword matching
  const evaluateTypedAnswer = (text: string, question: TeacherQuestion): AnswerEvaluation => {
    const lower = text.toLowerCase();
    let score = 0;
    const missing: string[] = [];

    // Question-specific keyword checks
    if (question.id === 1) { // BS4 vs BS5
      if (lower.includes('jquery')) score += 35; else missing.push("ذكر الاستغناء التام عن مكتبة jQuery");
      if (lower.includes('vanilla') || lower.includes('natif') || lower.includes('pur') || lower.includes('جافاسكريبت') || lower.includes('js')) score += 35; else missing.push("الاعتماد على Vanilla JavaScript نقي وخفيف");
      if (lower.includes('rtl') || lower.includes('start') || lower.includes('end') || lower.includes('variable') || lower.includes('dark') || lower.includes('يمين')) score += 30;
    } else if (question.id === 2) { // 12 columns
      if (lower.includes('divis') || lower.includes('diviseur') || lower.includes('partager') || lower.includes('قسمة') || lower.includes('يقبل')) score += 50; else missing.push("قابلية العدد 12 للقسمة على أعداد متعددة (1، 2، 3، 4، 6)");
      if (lower.includes('2') || lower.includes('3') || lower.includes('4')) score += 30; else missing.push("إعطاء أمثلة تقسيم الكروت (2 أو 3 أو 4 كروت)");
      if (lower.includes('flexible') || lower.includes('flexibilité') || lower.includes('مرونة')) score += 20;
    } else if (question.id === 3) { // Container vs Fluid
      if (lower.includes('max-width') || lower.includes('fixe') || lower.includes('centre') || lower.includes('وسط') || lower.includes('توسيط') || lower.includes('أقصى')) score += 50; else missing.push("أن .container يحدد عرضاً أقصى (max-width) ويتوسط الشاشة");
      if (lower.includes('100%') || lower.includes('total') || lower.includes('كامل')) score += 50; else missing.push("أن .container-fluid يأخذ 100% دائماً");
    } else if (question.id === 5) { // Bundle vs min.js
      if (lower.includes('popper')) score += 60; else missing.push("ضرورة وجود مكتبة Popper.js المدمجة");
      if (lower.includes('modal') || lower.includes('dropdown') || lower.includes('نافذة') || lower.includes('قائمة')) score += 40; else missing.push("حساب مواقع النوافذ المنبثقة والقوائم");
    } else {
      if (lower.length > 15) score += 40;
      if (lower.includes('bootstrap') || lower.includes('css') || lower.includes('js') || lower.includes('responsive')) score += 30;
      if (lower.includes('class') || lower.includes('كلاس') || lower.includes('grille') || lower.includes('col') || lower.includes('شبكة')) score += 30;
    }

    if (score < 40 && lower.trim().length > 15) score = 55;
    if (score > 100) score = 100;

    const isCorrect = score >= 60;

    let verdict = "";
    let feedback = "";

    if (score >= 85) {
      verdict = "ممتاز جداً! جواب دقيق واحترافي.";
      feedback = "تبارك الله عليك، راك جاوبتي بحال شي مطور محترف وضبطتي المصطلحات التقنية الأساسية لمشروعك.";
    } else if (score >= 60) {
      verdict = "جيد! الفكرة العامة صحيحة ولكن نقصوك بعض التفاصيل.";
      feedback = "الأستاذ غادي يقبل جوابك، ولكن من الأفضل تزيد تأكد على الكلمات التقنية المفتاحية.";
    } else {
      verdict = "الجواب ناقص أو مازال ما واضحش مزيان.";
      feedback = "نسيتي تذكر النقطة الجوهرية لي كيتسناها الأستاذ في هاد السؤال.";
    }

    return {
      score,
      isCorrect,
      verdict,
      feedback,
      missingPoints: missing,
      darijaCorrection: question.darijaExplanation
    };
  };

  const handleSubmitAnswer = () => {
    if (answerMode === 'qcm') {
      if (selectedOption === null) return;
      const isCorrect = selectedOption === (currentQuestion.correctOptionIndex ?? 0);
      const score = isCorrect ? 100 : 25;
      
      setEvaluation({
        score,
        isCorrect,
        verdict: isCorrect ? "إجابة صحيحة 100% وممتازة !" : "إجابة غير صحيحة، انتبه !",
        feedback: isCorrect 
          ? "اختيار صائب ودقيق! هاد الجواب هو لي باغي يسمع الأستاذ بالضبط." 
          : `الجواب الصحيح كان هو الاختيار رقم ${(currentQuestion.correctOptionIndex ?? 0) + 1}.`,
        missingPoints: isCorrect ? [] : [currentQuestion.shortAnswerAr],
        darijaCorrection: currentQuestion.darijaExplanation
      });

      setTotalScore(prev => prev + score);
      setQuestionsAnswered(prev => prev + 1);
    } else {
      if (!typedAnswer.trim()) return;
      const evalResult = evaluateTypedAnswer(typedAnswer, currentQuestion);
      setEvaluation(evalResult);
      setTotalScore(prev => prev + evalResult.score);
      setQuestionsAnswered(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setTypedAnswer('');
      setEvaluation(null);
    } else {
      setExamFinished(true);
    }
  };

  const handleRestartExam = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setTypedAnswer('');
    setEvaluation(null);
    setTotalScore(0);
    setQuestionsAnswered(0);
    setExamFinished(false);
  };

  const averageScore = questionsAnswered > 0 ? Math.round(totalScore / questionsAnswered) : 0;

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Teacher Persona Banner */}
      <div className="bg-gradient-to-l from-slate-900 via-indigo-950 to-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-indigo-800/50 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-blue-600/30 border-2 border-blue-400/40 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-inner">
            👨‍🏫
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-bold border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>أستاذ تطوير الويب الافتراضي</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              محاكي الامتحان الشفهي لمشروعي
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              الأستاذ غادي يطرح عليك أسئلة مباشرة على مشروعك. جاوب وشوف واش النقطة ديالك كافية باش تمشي مرتاح لمناقشة المشروع!
            </p>
          </div>
        </div>

        {/* Live Score Widget */}
        <div className="bg-slate-800/90 p-5 sm:p-6 rounded-2xl border border-slate-700/80 text-center min-w-[170px] shadow-lg shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            معدل النقاط الحالي
          </span>
          <span className="text-4xl sm:text-5xl font-mono font-black text-amber-400 block" dir="ltr">
            {averageScore} / 100
          </span>
          <span className="text-xs text-slate-400 font-bold block mt-1">
            أجبت على {questionsAnswered} من {examQuestions.length}
          </span>
        </div>

      </div>

      {!examFinished ? (
        /* Active Question Card */
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700 shadow-sm space-y-8">
          
          {/* Question Header & Modes */}
          <div className="space-y-4 border-b border-slate-100 dark:border-slate-700/80 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm font-bold font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-4 py-1.5 rounded-xl">
                السؤال رقم {currentQuestionIndex + 1} من {examQuestions.length} · {currentQuestion.category}
              </span>

              {/* Mode switch (QCM vs Libre) */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-700/60 p-1.5 rounded-2xl text-base font-bold">
                <button
                  onClick={() => { setAnswerMode('qcm'); setEvaluation(null); }}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    answerMode === 'qcm' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  اختيار من متعدد (QCM)
                </button>
                <button
                  onClick={() => { setAnswerMode('text'); setEvaluation(null); }}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    answerMode === 'text' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  كتابة الجواب بحرية (نص)
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
                « {currentQuestion.questionAr} »
              </h2>
              {currentQuestion.questionFr && (
                <p className="text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400 italic" dir="ltr">
                  Français : « {currentQuestion.questionFr} »
                </p>
              )}
            </div>
          </div>

          {/* Answer Input: Mode QCM */}
          {answerMode === 'qcm' && currentQuestion.sampleOptionsAr && (
            <div className="space-y-4">
              <span className="text-base sm:text-lg font-extrabold text-slate-700 dark:text-slate-300 block">
                اختار الجواب الصحيح لي غاتقولو للأستاذ :
              </span>
              <div className="space-y-3">
                {currentQuestion.sampleOptionsAr.map((opt, oIdx) => {
                  const isSelected = selectedOption === oIdx;
                  return (
                    <button
                      key={oIdx}
                      disabled={evaluation !== null}
                      onClick={() => setSelectedOption(oIdx)}
                      className={`w-full p-5 rounded-2xl text-right text-base sm:text-lg font-bold transition-all flex items-start gap-4 border cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-950 dark:text-blue-100 shadow-md shadow-blue-600/10'
                          : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {oIdx + 1}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Answer Input: Mode Libre (Saisie de texte) */}
          {answerMode === 'text' && (
            <div className="space-y-3">
              <label className="text-base sm:text-lg font-extrabold text-slate-700 dark:text-slate-300 block">
                اكتب جوابك هنا (بالعربية أو الدارجة أو الفرنسية بحال يلا كتهضر مع الأستاذ) :
              </label>
              <textarea
                disabled={evaluation !== null}
                rows={4}
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                placeholder="اكتب فكرتك هنا بكل راحة، مثلاً: في بوتستراب 5 كنستعملو... حيت كيعطينا..."
                className="w-full p-5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-base sm:text-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          )}

          {/* Submit Button (if not yet evaluated) */}
          {evaluation === null && (
            <div className="flex justify-end pt-3">
              <button
                disabled={answerMode === 'qcm' ? selectedOption === null : !typedAnswer.trim()}
                onClick={handleSubmitAnswer}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-extrabold text-lg rounded-2xl transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
              >
                <span>تأكيد إجابتي وتقييمها</span>
                <Send className="w-5 h-5 ml-1" />
              </button>
            </div>
          )}

          {/* Teacher Feedback & Evaluation Result */}
          {evaluation && (
            <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-700/80 animate-fadeIn">
              
              {/* Verdict Banner */}
              <div className={`p-6 sm:p-7 rounded-3xl border flex items-start gap-4 ${
                evaluation.isCorrect 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800' 
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
              }`}>
                {evaluation.isCorrect ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-7 h-7 text-rose-600 dark:text-rose-400 shrink-0 mt-1" />
                )}
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h3 className={`font-black text-xl sm:text-2xl ${
                      evaluation.isCorrect ? 'text-emerald-900 dark:text-emerald-200' : 'text-rose-900 dark:text-rose-200'
                    }`}>
                      {evaluation.verdict}
                    </h3>
                    <span className={`text-base font-mono font-black px-4 py-1.5 rounded-full ${
                      evaluation.score >= 70 ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                    }`}>
                      النقطة : {evaluation.score} / 100
                    </span>
                  </div>
                  <p className={`text-base sm:text-lg leading-relaxed font-bold ${
                    evaluation.isCorrect ? 'text-emerald-900 dark:text-emerald-200' : 'text-rose-900 dark:text-rose-200'
                  }`}>
                    {evaluation.feedback}
                  </p>
                </div>
              </div>

              {/* Exact Answer */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2 text-base">
                <span className="font-extrabold text-slate-900 dark:text-white block text-lg">
                  🎯 الإجابة النموذجية المباشرة :
                </span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-bold text-lg sm:text-xl">
                  « {currentQuestion.shortAnswerAr} »
                </p>
                {currentQuestion.shortAnswerFr && (
                  <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 italic pt-2 border-t border-slate-200 dark:border-slate-700" dir="ltr">
                    Français : « {currentQuestion.shortAnswerFr} »
                  </p>
                )}
              </div>

              {/* Darija Conceptual Explanation (ARABIC SCRIPT, 18px-20px) */}
              <div className="p-6 sm:p-7 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 space-y-2">
                <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-300 font-extrabold text-lg">
                  <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  <span>فهم علاش وكيفاش بالدارجة المغربية :</span>
                </div>
                <p className="text-lg sm:text-xl text-amber-950 dark:text-amber-100 leading-relaxed font-bold">
                  « {evaluation.darijaCorrection} »
                </p>
              </div>

              {/* Next Question CTA */}
              <div className="flex justify-end pt-3">
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg rounded-2xl transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
                >
                  <span>{currentQuestionIndex < examQuestions.length - 1 ? 'السؤال الموالي' : 'عرض النتيجة النهائية'}</span>
                  <ArrowLeft className="w-5 h-5 mr-1" />
                </button>
              </div>

            </div>
          )}

        </div>
      ) : (
        /* Final Exam Report Card */
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-10 sm:p-14 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-7 max-w-2xl mx-auto animate-fadeIn">
          <div className="w-24 h-24 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto text-5xl shadow-inner">
            🏆
          </div>

          <div className="space-y-3">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-400 block">
              تقرير نهاية الامتحان التجريبي الشفهي
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {averageScore >= 80 ? 'تبارك الله عليك ! راك واجد 100% للمناقشة !' : 'عمل جيد ! عاود راجع شوية وغاتكون ممتاز.'}
            </h2>
            <div className="my-5 inline-block px-7 py-3 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900 font-mono text-4xl font-black text-blue-600 dark:text-blue-400" dir="ltr">
              {averageScore} / 100
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-lg sm:text-xl max-w-lg mx-auto leading-relaxed font-medium">
              {averageScore >= 80 
                ? "عندك فهم ممتاز لمشروعك وقواعد بوتستراب 5، شبكة الـ 12 عمود، والتجاوب مع شاشات الهواتف. تقدر تمشي للمناقشة وتجاوب الأستاذ بثقة وابتسامة!" 
                : "الفكرة العامة عندك، ولكن عاود راجع الأسئلة والشروحات بالدارجة باش تزيد تثبت المصطلحات في عقلك."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-right text-base space-y-2">
            <span className="font-extrabold text-blue-950 dark:text-blue-300 block text-lg">
              💡 وصايا الكوتش الأخيرة :
            </span>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              1. خليك هادئ ومبتسم قدام الأستاذ وزملائك، راك نتا لي صاوبتي هاد المشروع.
              <br />
              2. ما تزربش: خذ 2 ثواني باش تفكر عاد جاوب.
              <br />
              3. إلا حرتي، وريه التطبيق مباشرة في الشاشة ولا في inspecteur (F12) !
            </p>
          </div>

          <button
            onClick={handleRestartExam}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg rounded-2xl transition-all shadow-lg shadow-blue-600/25 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 ml-1" />
            <span>إعادة الامتحان التجريبي من البداية</span>
          </button>
        </div>
      )}

    </div>
  );
};
