import React from 'react';
import { 
  CheckCircle2, 
  Layers, 
  Cpu, 
  FileCode, 
  Sparkles, 
  ArrowLeft, 
  Compass, 
  ShieldCheck, 
  Palette,
  LayoutGrid
} from 'lucide-react';
import { ActiveTab } from './Navbar';

interface ProjectAnalysisTabProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenFiles: () => void;
}

export const ProjectAnalysisTab: React.FC<ProjectAnalysisTabProps> = ({
  setActiveTab,
  onOpenFiles
}) => {
  const componentCategories = [
    {
      title: "1. تنظيم الصفحة والشبكة (Layout & Grid)",
      badge: "6 كلاسات أساسية",
      classes: [
        { name: ".container", desc: "الحاوية الرئيسية لي كتجمع السيت في الوسط مع هوامش أوتوماتيكية وعرض محدد حسب الشاشة." },
        { name: ".row", desc: "السطر الأفقي بنظام الفليكس (Flexbox) مع هوامش سلبية لتعويض حواف الأعمدة." },
        { name: ".col-12 .col-md-6 .col-lg-4", desc: "العمود المتجاوب: 100% في التيليفون، 50% في الطابليت، و 33.3% في البيسي." },
        { name: ".g-4", desc: "المسافة العازلة (Gutter): 24 بيكسل بين الأعمدة والكروت طولاً وعرضاً." },
        { name: ".row-cols-1 .row-cols-md-2 .row-cols-lg-3", desc: "اختصار ذكي لتقسيم الكروت بالتساوي أوتوماتيك بلا مانبقاو نكررو كلاس col في كل كارت." }
      ]
    },
    {
      title: "2. شريط التنقل المتجاوب (Navbar)",
      badge: "4 كلاسات أساسية",
      classes: [
        { name: ".navbar", desc: "الشريط العلوي المتجاوب لي جامع اللوجو والروابط وأزرار التفاعل." },
        { name: ".navbar-expand-lg", desc: "النقطة فاش كيتسرح المنيو بالعرض (ملي كتكون الشاشة أكبر من 992 بيكسل)." },
        { name: ".navbar-toggler", desc: "زر ميني برغر لي كيبان في شاشات التيليفون باش يفتح المنيو." },
        { name: ".sticky-top", desc: "كيخلي المنيو ديما لاصق في أعلى الشاشة فاش كتهبط تقرا السيت." }
      ]
    },
    {
      title: "3. بطاقات الدورات (Cards)",
      badge: "5 كلاسات أساسية",
      classes: [
        { name: ".card", desc: "إطار الكارت العصري بخلفية بيضاء نقية وحواف مدورة وضباب خفيف." },
        { name: ".card-img-top", desc: "الصورة العلوية للكارت لي كتاخد شكل الحواف المدورة الفوقانية بلا تشويه." },
        { name: ".card-body", desc: "منطقة المحتوى الداخلي مع مساحة داخلية مريحة (16 بيكسل)." },
        { name: ".h-100", desc: "كيفرض على جميع الكروت في نفس السطر يكون عندهم نفس العلو والارتفاع بالضبط." },
        { name: ".flex-grow-1", desc: "كيخلي نص الوصف يشد المساحة المتبقية باش أزرار التسجيل يجيو مقادين في خط واحد تحت." }
      ]
    },
    {
      title: "4. النماذج والتأكد من المدخلات (Forms)",
      badge: "5 كلاسات أساسية",
      classes: [
        { name: ".form-control", desc: "تنسيق حقول الكتابة مع إطار أنيق وإضاءة زرقاء واضحة فاش كتكليكي فيها." },
        { name: ".form-select", desc: "قائمة الاختيار المنسدلة بتصميم عصري كيتوافق مع جميع المتصفحات." },
        { name: ".needs-validation", desc: "كلاس كيعلم الجافاسكريبت باللي هاد الفورمولير فيه فاليديشن مخصصة." },
        { name: ".was-validated", desc: "كيزيدها كود الجافاسكريبت أوتوماتيك باش يصبغ الحقول بالأخضر أو الأحمر." },
        { name: ".invalid-feedback", desc: "رسالة التنبيه بالخطأ لي كتكون مخبية ومكتبان غير إلا كان الحقل خاوي." }
      ]
    },
    {
      title: "5. المكونات التفاعلية (Modals & Toasts)",
      badge: "3 مكونات رئيسية",
      classes: [
        { name: ".modal & .modal-dialog-centered", desc: "النافذة المنبثقة للتسجيل السريع لي كتجي موسطة فوق خلفية معتمة." },
        { name: ".toast & .toast-container", desc: "إشعار النجاح الصغير لي كيطلع في أسفل الشاشة على اليمين بعد التسجيل." },
        { name: ".accordion & .accordion-collapse", desc: "الأسئلة الشائعة (FAQ) القابلة للطي والفتح بنقرة واحدة." }
      ]
    },
    {
      title: "6. أدوات المسافات والفليكس (Spacing & Flex)",
      badge: "6 أدوات متكررة",
      classes: [
        { name: ".py-5 & .my-4", desc: "مسافات وهوامش عمودية (48 بيكسل و 24 بيكسل) باش الأقسام ترتاح في الشوفة." },
        { name: ".d-flex & .align-items-center", desc: "تفعيل نظام Flexbox ومحاذاة الأيقونة مع النص عمودياً في الوسط." },
        { name: ".justify-content-between", desc: "توزيع الثمن والزر في أقصى اليمين وأقصى اليسار." },
        { name: ".rounded-pill", desc: "حواف دائرية كاملة بشكل حبة دواء للأزرار والشارات الحديثة." }
      ]
    }
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Hero Banner / Pitch du Projet */}
      <div className="bg-gradient-to-l from-blue-950 via-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-blue-800/50">
        <div className="max-w-4xl relative z-10 space-y-5">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-sm font-bold">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>مشروع مدرسي تطبيقي · Bootstrap 5 & JavaScript</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            مشروعي المصغر: سكيلاپ أكاديمي (SkillUp Academy)
            <span className="block text-2xl sm:text-3xl font-extrabold text-blue-300 mt-2">
              مشروعي الشخصي لتحليل الكود، شرح المفاهيم بالدارجة، والاستعداد للمناقشة
            </span>
          </h1>

          <p className="text-blue-100 text-lg sm:text-xl leading-relaxed max-w-3xl">
            الأستاذ طلب مني مشروع كيجمع بين <strong>HTML</strong> وتقنية أو فريموورك عصري، وأنا اختاريت <strong>Bootstrap 5</strong>. هاد المنصة صممتها وطورتها بنفسي بالدارجة المغربية باش نراجع كل سطر وكل كلاس ونشرح مشروعي للأستاذ وزملائي بثقة واحترافية وبلا ما نحتاج نحفظ!
          </p>

          <div className="flex flex-wrap gap-4 pt-3">
            <button
              onClick={() => setActiveTab('code')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-900 font-extrabold text-[17px] rounded-2xl hover:bg-blue-50 transition-all shadow-lg shadow-white/10 cursor-pointer"
            >
              <span>شرح كود مشروعي بالدارجة سطر بسطر</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-800/80 hover:bg-blue-800 text-white font-bold text-[17px] rounded-2xl transition-colors border border-blue-400/40 cursor-pointer"
            >
              <span>تجربة مشروعي مباشرة في المتصفح</span>
            </button>
            <button
              onClick={onOpenFiles}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900/80 hover:bg-slate-900 text-blue-200 font-bold text-[17px] rounded-2xl transition-colors border border-blue-400/30 cursor-pointer"
            >
              <FileCode className="w-5 h-5 text-blue-400" />
              <span>معاينة وتحميل ملفات الكود الثلاثة</span>
            </button>
          </div>
        </div>

        {/* Decorative Grid SVG Background */}
        <div className="absolute left-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
          <div className="w-full h-full border-r border-white/20 grid grid-cols-4 grid-rows-6" />
        </div>
      </div>

      {/* Rôle & Objectif du Projet (Cards avec texte de 18px-20px) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-7 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              الهدف من مشروعي
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              « SkillUp Academy » هو موقع تفاعلي صممته وطورته بنفسي كنموذج تطبيقي لمنصة تكوينات في مجالات التكنولوجيا والرقمنة بالمغرب (تطوير المواقع، الداتا، والتصميم).
            </p>
          </div>
          <div className="p-4 bg-blue-50/70 dark:bg-blue-950/40 rounded-xl text-base text-blue-950 dark:text-blue-200 font-medium border border-blue-200/60 dark:border-blue-900/40">
            <strong>بالدارجة :</strong> صاوبت سيت كيبان بحال شركة حقيقية، فيه بانر ترحيبي، دليل الدورات بالفلتر السريع، الأسئلة الشائعة، وفورمولير التسجيل مع إشعارات تاكيد.
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-7 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              احترام طلب الأستاذ
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              الأستاذ طلب HTML وزيادة فريموورك. حنا اختارينا <strong>Bootstrap 5</strong> مع كود CSS مخصص وجافاسكريبت نقي بلا مكتبات زايدة، وهادشي هو المعيار المعتمد في الشركات دابا.
            </p>
          </div>
          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl text-base text-emerald-950 dark:text-emerald-200 font-medium border border-emerald-200/60 dark:border-emerald-900/40">
            <strong>بالدارجة :</strong> خدمنا بالنسخة الأخيرة ديال بوتستراب 5، وحيدنا jQuery بمرة، وكتبنا كود جافاسكريبت أصلي باش السيت يجي خفيف وسريع.
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-7 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              متجاوب 100% مع الشاشات
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              السيت كيتقاد راسو براسو: 3 كروت في البيسي، كارتين في الطابليت، وكارت وحدة في شاشة التيليفون مع ميني برغر كيتحل ويتسد بسلاسة وبلا ما يخرج أي سكرول أفقي عوج.
            </p>
          </div>
          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl text-base text-amber-950 dark:text-amber-200 font-medium border border-amber-200/60 dark:border-amber-900/40">
            <strong>بالدارجة :</strong> فاش تحل السيت في التيليفون كيبان كولشي نقي ومقروء تحت الإبهام، وبلا ما تعذب تكتب ميديا كويريز في CSS.
          </div>
        </div>

      </div>

      {/* Synergie des 4 Technologies */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              كيفاش كيتعاونو التقنيات الأربعة في المشروع؟
            </h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            هاد المخطط هو الجواب لي خاصك تقولو إلا سولك الأستاذ: <em>«شنو هو الدور ديال كل فيشي في المشروع ديالك؟»</em>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-xl text-orange-600 dark:text-orange-400">HTML5</span>
              <span className="text-xs uppercase font-bold px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300">الساس والهيكل</span>
            </div>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              كيعطي البنية والدلالة لكل عنصر: العناوين، الفقرات، الأقسام، والقوائم.
            </p>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong>بالدارجة :</strong> هو الياجور والساس ديال الدار لي شاد كلشي.
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-xl text-purple-600 dark:text-purple-400">Bootstrap 5</span>
              <span className="text-xs uppercase font-bold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">الهندسة والشبكة</span>
            </div>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              كيجيب شبكة الـ 12 عمود، الكروت الجاهزة، شريط التنقل، والمودال المتجاوب.
            </p>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong>بالدارجة :</strong> هو الهندسة المعمارية لي كتقاد العبارات في كل شاشة.
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-xl text-blue-600 dark:text-blue-400">CSS مخصص</span>
              <span className="text-xs uppercase font-bold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">الهوية والجمالية</span>
            </div>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              فيشي <code className="font-mono text-sm">style.css</code> كيزيد تدرجات الألوان، الارتفاع ثلاثي الأبعاد، وتنعيم الخطوط.
            </p>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong>بالدارجة :</strong> الصباغة والديكور الخاص لي كيعطي هوية زوينة للسيت.
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-xl text-emerald-600 dark:text-emerald-400">JavaScript</span>
              <span className="text-xs uppercase font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">الحيوية والتفاعل</span>
            </div>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              فيشي <code className="font-mono text-sm">script.js</code> كيدير فلترة الكروت، البحث الحي، والتأكد من صحة الفورمولير.
            </p>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong>بالدارجة :</strong> هو الضو والما، كيخلي السيت حي وكيجاوب عند الكليك.
            </div>
          </div>

        </div>
      </div>

      {/* Inventaire Complet des Classes et Composants Bootstrap 5 */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              دليل جميع كلاسات ومكونات بوتستراب المستخدمة في المشروع
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mt-1">
              جميع هاد الكلاسات تم فحصها وتأكيدها في الأكواد الرسمية لسكيلاپ أكاديمي.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('code')}
            className="self-start sm:self-auto text-base font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
          >
            <span>شوف الشرح المفصل سطر بسطر</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {componentCategories.map((cat, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-700 pb-3">
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                    {cat.title}
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                    {cat.badge}
                  </span>
                </div>
                <div className="space-y-3.5">
                  {cat.classes.map((item, cIdx) => (
                    <div key={cIdx} className="space-y-1">
                      <code className="font-mono font-bold text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded inline-block" dir="ltr">
                        {item.name}
                      </code>
                      <p className="text-base text-slate-700 dark:text-slate-300 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
