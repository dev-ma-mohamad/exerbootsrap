import React, { useState } from 'react';
import { 
  Palette, 
  PlusCircle, 
  Image as ImageIcon, 
  Layout, 
  Menu, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  ArrowLeft,
  HelpCircle
} from 'lucide-react';

export const PracticalWorkshopTab: React.FC = () => {
  const [activeWorkshop, setActiveWorkshop] = useState<'colors' | 'card' | 'images' | 'section' | 'navbar'>('card');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Card Generator State
  const [newTitle, setNewTitle] = useState('الأمن السيبراني وحماية المواقع (Cyber Security)');
  const [newCategory, setNewCategory] = useState<'web' | 'data' | 'design' | 'cyber'>('cyber');
  const [newDuration, setNewDuration] = useState('35 ساعة');
  const [newPrice, setNewPrice] = useState('650 درهم');
  const [newLevel, setNewLevel] = useState('مبتدئ');
  const [newDescription, setNewDescription] = useState('تعلم حماية المواقع من الثغرات الشائعة وفهم أساسيات اختبار الاختراق الأخلاقي بمشاريع عملية.');
  const [newImgUrl, setNewImgUrl] = useState('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80');

  // Color Theme State
  const [primaryColor, setPrimaryColor] = useState('#0d6efd');

  const colorPresets = [
    { name: 'الأزرق الملكي القياسي', hex: '#0d6efd' },
    { name: 'الأخضر الزمردي العصري', hex: '#059669' },
    { name: 'النيلي الأنيق (Indigo)', hex: '#4f46e5' },
    { name: 'البنفسجي السيبراني (Purple)', hex: '#7c3aed' },
    { name: 'البرتقالي الدافئ (Orange)', hex: '#ea580c' },
  ];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Generate Card HTML Snippet
  const generatedCardHtml = `<!-- دورة جديدة تم إنشاؤها لـ SkillUp Academy -->
<div class="col course-item" data-category="${newCategory}">
  <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden course-card">
    <div class="position-relative">
      <img src="${newImgUrl}" class="card-img-top course-img" alt="${newTitle}" loading="lazy">
      <span class="badge bg-primary position-absolute top-0 start-0 m-3 shadow-sm">${newCategory.toUpperCase()}</span>
      <span class="badge bg-dark bg-opacity-75 position-absolute bottom-0 end-0 m-3"><i class="bi bi-clock me-1"></i>${newDuration}</span>
    </div>
    <div class="card-body d-flex flex-column p-4">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="small text-muted"><i class="bi bi-bar-chart-steps me-1"></i>${newLevel}</span>
        <span class="text-warning small fw-bold"><i class="bi bi-star-fill me-1"></i>5.0 (جديد)</span>
      </div>
      <h5 class="card-title fw-bold text-dark">${newTitle}</h5>
      <p class="card-text text-muted small flex-grow-1">
        ${newDescription}
      </p>
      <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-3">
        <span class="fs-5 fw-bold text-primary">${newPrice}</span>
        <button class="btn btn-outline-primary btn-sm rounded-pill px-3 enroll-btn" data-course="${newTitle}">
          <i class="bi bi-person-plus me-1"></i>تسجيل
        </button>
      </div>
    </div>
  </div>
</div>`;

  // Generate Testimonials Section HTML Snippet
  const generatedSectionHtml = `<!-- ================= قسم آراء الطلاب (TÉMOIGNAGES) ================= -->
<section id="testimonials" class="py-5 bg-white">
  <div class="container py-lg-4">
    <div class="text-center mb-5">
      <span class="text-primary fw-bold text-uppercase small">آراء وتجارب</span>
      <h2 class="fw-bold mt-1">قصص نجاح خريجينا بالمغرب</h2>
      <p class="text-muted">شوف شنو قالو الطلبة لي تخرجو من سكيلاپ أكاديمي وبداو مسارهم المهني.</p>
    </div>

    <div class="row g-4">
      <!-- الرأي 1 -->
      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-4 rounded-4 bg-light">
          <div class="text-warning mb-3">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          </div>
          <p class="text-muted small flex-grow-1">
            "بفضل تكوين Bootstrap وHTML التطبيقي في سكيلاپ أكاديمي، خديت أول سطاج في الدار البيضاء كـ Front-End Developer في أقل من 3 شهور!"
          </p>
          <div class="d-flex align-items-center gap-3 pt-3 border-top">
            <div class="bg-primary text-white rounded-circle fw-bold d-flex align-items-center justify-content-center" style="width: 44px; height: 44px;">
              ي ع
            </div>
            <div>
              <h6 class="fw-bold mb-0">ياسين العمراني</h6>
              <small class="text-muted">دفعة 2024 · مطور واجهات ويب</small>
            </div>
          </div>
        </div>
      </div>

      <!-- الرأي 2 -->
      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-4 rounded-4 bg-light">
          <div class="text-warning mb-3">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          </div>
          <p class="text-muted small flex-grow-1">
            "المشاريع الحقيقية والتأطير خطوة بخطوة هو لي دار الفرق الكبير. ماشي غير كتتفرج، كتكودي بيديك وكتصحح أخطاءك."
          </p>
          <div class="d-flex align-items-center gap-3 pt-3 border-top">
            <div class="bg-success text-white rounded-circle fw-bold d-flex align-items-center justify-content-center" style="width: 44px; height: 44px;">
              س ب
            </div>
            <div>
              <h6 class="fw-bold mb-0">سلمى بن جلون</h6>
              <small class="text-muted">دفعة 2024 · مصممة UI/UX</small>
            </div>
          </div>
        </div>
      </div>

      <!-- الرأي 3 -->
      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm p-4 rounded-4 bg-light">
          <div class="text-warning mb-3">
            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
          </div>
          <p class="text-muted small flex-grow-1">
            "دورة بايثون وتحليل البيانات بدلات الطريقة باش كنخدم في مكتبي المالي. كنصح أي واحد باغي يزيد للقدام بهاد التكوين."
          </p>
          <div class="d-flex align-items-center gap-3 pt-3 border-top">
            <div class="bg-info text-dark rounded-circle fw-bold d-flex align-items-center justify-content-center" style="width: 44px; height: 44px;">
              ع ت
            </div>
            <div>
              <h6 class="fw-bold mb-0">عمر التازي</h6>
              <small class="text-muted">دفعة 2024 · محلل بيانات</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  return (
    <div className="space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-sm font-bold">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>ورشة التعديل والتطبيق المباشر · Practical Workshop</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            تعلم كيفاش تعدل وتزيد محتوى جديد في السيت ديالك
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            الأستاذ فاش كيكون جالس قدامك، ديما كيطلب منك اختبار تطبيقي مباشر: 
            <em> «ورّيني دابا كيفاش تقدر تزيد دورة جديدة، كيفاش تبدل اللون الرئيسي ديال السيت، ولا كيفاش تزيد قسم ديال آراء الزبناء».</em> 
            هنا درنا ليك أدوات ذكية كتخرج ليك الكود واجد مع الشرح بالدارجة.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center gap-2.5 pt-4">
          <button
            onClick={() => setActiveWorkshop('card')}
            className={`flex items-center gap-2 px-4 py-2.5 text-base sm:text-[17px] font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeWorkshop === 'card'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span>إضافة كارت دورة جديدة</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('colors')}
            className={`flex items-center gap-2 px-4 py-2.5 text-base sm:text-[17px] font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeWorkshop === 'colors'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Palette className="w-5 h-5" />
            <span>تغيير الألوان والثيم</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('section')}
            className={`flex items-center gap-2 px-4 py-2.5 text-base sm:text-[17px] font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeWorkshop === 'section'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Layout className="w-5 h-5" />
            <span>إضافة قسم كامل (آراء الطلاب)</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('images')}
            className={`flex items-center gap-2 px-4 py-2.5 text-base sm:text-[17px] font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeWorkshop === 'images'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span>تغيير وتعديل الصور</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('navbar')}
            className={`flex items-center gap-2 px-4 py-2.5 text-base sm:text-[17px] font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
              activeWorkshop === 'navbar'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Menu className="w-5 h-5" />
            <span>تخصيص شريط التنقل (Navbar)</span>
          </button>
        </div>
      </div>

      {/* Workshop 1: Ajouter une Carte de Cours (Générateur Interactif) */}
      {activeWorkshop === 'card' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-800/90 rounded-3xl p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <h2 className="font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <PlusCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>معلومات الدورة الجديدة :</span>
            </h2>

            <div className="space-y-4 text-base">
              <div>
                <label className="font-bold block mb-1 text-slate-800 dark:text-slate-200">عنوان الدورة</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-800 dark:text-slate-200">التصنيف</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base"
                  >
                    <option value="web">تطوير الويب (web)</option>
                    <option value="data">البيانات والذكاء الاصطناعي (data)</option>
                    <option value="design">التصميم وواجهات المستخدم (design)</option>
                    <option value="cyber">الأمن السيبراني (cyber)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1 text-slate-800 dark:text-slate-200">المستوى</label>
                  <input 
                    type="text" 
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-800 dark:text-slate-200">المدة (مثال: 35 ساعة)</label>
                  <input 
                    type="text" 
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1 text-slate-800 dark:text-slate-200">الثمن (مثال: 650 درهم)</label>
                  <input 
                    type="text" 
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-800 dark:text-slate-200">وصف مختصر للدورة</label>
                <textarea 
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium text-base"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-800 dark:text-slate-200">رابط الصورة (URL)</label>
                <input 
                  type="text" 
                  value={newImgUrl}
                  onChange={(e) => setNewImgUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Darija Instruction */}
            <div className="p-5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl text-base text-amber-950 dark:text-amber-200 space-y-2 leading-relaxed">
              <strong>فهم بالدارجة كيفاش تزيدها في السيت :</strong>
              <p>
                كوبي هاد الكود لي طلع ليك على اليسار، فتح فيشي <code className="font-mono font-bold" dir="ltr">index.html</code>، قلب على <code className="font-mono font-bold" dir="ltr">&lt;div id="coursesGrid"&gt;</code>، وحط هاد البلوك في الأخير مور الكروت لخرين. الجافاسكريبت غادي يتعرف عليها أوتوماتيك ويخدم مع الفلتر والبحث حيت فيها <code className="font-mono font-bold" dir="ltr">data-category</code> بلا ماتبدل حتى سطر في ملف script.js !
              </p>
            </div>
          </div>

          {/* Generated Code & Live Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Live Preview of the Card */}
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
              <span className="text-base font-bold text-slate-600 dark:text-slate-300 block">
                معاينة شكل الكارت الحقيقية في الموقع :
              </span>
              <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img src={newImgUrl} alt={newTitle} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {newCategory.toUpperCase()}
                  </span>
                  <span className="absolute bottom-3 left-3 bg-black/75 text-white text-xs px-2.5 py-1 rounded-lg">
                    {newDuration}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-bold">{newLevel}</span>
                    <span className="text-amber-500 font-black">★ 5.0 (جديد)</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white line-clamp-1">{newTitle}</h3>
                  <p className="text-base text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">{newDescription}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-black text-blue-600 dark:text-blue-400 text-lg">{newPrice}</span>
                    <span className="text-sm font-bold px-4 py-1.5 rounded-full border border-blue-600 text-blue-600 dark:text-blue-400">
                      تسجيل
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Code to Copy */}
            <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-700 dark:text-slate-300">
                  الكود المولد الجاهز للنسخ :
                </span>
                <button
                  onClick={() => handleCopy(generatedCardHtml, 'card-code')}
                  className="inline-flex items-center gap-1.5 text-base text-blue-600 dark:text-blue-400 font-bold hover:underline"
                >
                  {copiedCode === 'card-code' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">تم نسخ الكود !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>نسخ كود الكارت</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 max-h-72 text-left" dir="ltr">
                {generatedCardHtml}
              </pre>
            </div>

          </div>

        </div>
      )}

      {/* Workshop 2: Changer les Couleurs & Thème */}
      {activeWorkshop === 'colors' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-7">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              كيفاش تبدل الألوان الرئيسية لبوتستراب 5 بلا ما تقيس الملفات الأصلية؟
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              في بوتستراب 5، مانديروش خطأ المبتدئين بتعديل ملفات السورس ديال CDN! كنخدمو بالمتغيرات الحديثة ديال CSS (CSS Custom Properties) في ملف <code className="font-mono font-bold text-blue-600 dark:text-blue-400" dir="ltr">css/style.css</code>.
            </p>
          </div>

          {/* Palette Selector */}
          <div className="space-y-4">
            <label className="text-base font-extrabold text-slate-800 dark:text-slate-200 block">
              اختار لون جديد للسيت وشوف النتيجة :
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {colorPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrimaryColor(preset.hex)}
                  className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${
                    primaryColor === preset.hex 
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 shadow-sm' 
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="w-8 h-8 rounded-full shadow-md shrink-0" style={{ backgroundColor: preset.hex }} />
                  <div className="text-right">
                    <span className="text-base font-bold text-slate-900 dark:text-white block">{preset.name}</span>
                    <span className="text-xs font-mono text-slate-400" dir="ltr">{preset.hex}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CSS Code to insert into style.css */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-slate-700 dark:text-slate-300">
                الكود لي خاصك تحطو في ملف css/style.css :
              </span>
              <button
                onClick={() => handleCopy(`:root {
  --skillup-primary: ${primaryColor};
  --bs-primary: ${primaryColor};
  --bs-primary-rgb: ${parseInt(primaryColor.slice(1,3), 16)}, ${parseInt(primaryColor.slice(3,5), 16)}, ${parseInt(primaryColor.slice(5,7), 16)};
}

.btn-primary {
  background-color: ${primaryColor} !important;
  border-color: ${primaryColor} !important;
}`, 'color-code')}
                className="inline-flex items-center gap-1.5 text-base text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                {copiedCode === 'color-code' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>نسخ كود CSS</span>
              </button>
            </div>
            <pre className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-sm overflow-x-auto leading-relaxed border border-slate-800 text-left" dir="ltr">
{`:root {
  /* تغيير اللون الأساسي لـ SkillUp ولمتغيرات بوتستراب 5 */
  --skillup-primary: ${primaryColor};
  --bs-primary: ${primaryColor};
  --bs-primary-rgb: ${parseInt(primaryColor.slice(1,3), 16)}, ${parseInt(primaryColor.slice(3,5), 16)}, ${parseInt(primaryColor.slice(5,7), 16)};
}

/* تطبيق اللون على الأزرار */
.btn-primary {
  background-color: ${primaryColor} !important;
  border-color: ${primaryColor} !important;
}`}
            </pre>
          </div>

          <div className="p-5 bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl text-base text-blue-950 dark:text-blue-200 border border-blue-200/60 dark:border-blue-900/40 leading-relaxed">
            <strong>جواب ممتاز للأستاذ :</strong> «في بوتستراب 5، الاعتماد على CSS Variables مكننا من تغيير ألوان الموقع مباشرة في المتصفح وبلا ما نحتاجو نكومبيليو ملفات Sass من جديد!»
          </div>
        </div>
      )}

      {/* Workshop 3: Ajouter une Nouvelle Section */}
      {activeWorkshop === 'section' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              كيفاش تزيد قسم جديد كامل في السيت (مثال: آراء وتجارب الطلاب)؟
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              باش القسم يجيك منظم ومتناسق ومايخسرش الشبكة، ديما احترم الترتيب: 
              <code className="font-mono text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50" dir="ltr">&lt;section&gt; &gt; .container &gt; .row &gt; .col-md-4</code>.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-slate-700 dark:text-slate-300">
                كود HTML كامل لقسم آراء الطلاب :
              </span>
              <button
                onClick={() => handleCopy(generatedSectionHtml, 'section-code')}
                className="inline-flex items-center gap-1.5 text-base text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                {copiedCode === 'section-code' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>نسخ قسم HTML كامل</span>
              </button>
            </div>
            <pre className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 max-h-80 text-left" dir="ltr">
              {generatedSectionHtml}
            </pre>
          </div>

          <div className="p-5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl text-base text-amber-950 dark:text-amber-200 border border-amber-200 dark:border-amber-900/40 leading-relaxed">
            <strong>نصيحة بالدارجة :</strong> حط هاد البلوك بين قسم الأسئلة الشائعة (FAQ) وقسم اتصل بنا (Contact) في ملف <code className="font-mono font-bold" dir="ltr">index.html</code>. وماتنساش تزيد الرابط ديالو في المنيو الفوق: <code className="font-mono font-bold" dir="ltr">&lt;li class="nav-item"&gt;&lt;a class="nav-link" href="#testimonials"&gt;آراء الطلاب&lt;/a&gt;&lt;/li&gt;</code>.
          </div>
        </div>
      )}

      {/* Workshop 4: Changer les Images */}
      {activeWorkshop === 'images' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            كيفاش تبدل صور الموقع بلا ما يتشوهو في القياس؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">1. وضع صور محلية في المجلد :</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                أنشئ مجلد سميتو <code className="font-mono bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-bold" dir="ltr">images/</code> في قلب المشروع، وحط فيه تصاورك بصيغة WebP أو JPG.
              </p>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono text-left" dir="ltr">
{`<img src="images/cours-bootstrap.jpg" 
     class="card-img-top course-img" 
     alt="دورة بوتستراب 5">`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">2. منع تمدد الصورة وتشويهها :</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                باش الصور يخرجو كلهم في نفس القياس بلا ما يتجبدو، كلاس <code className="font-mono font-bold text-blue-600 dark:text-blue-400" dir="ltr">.course-img</code> في ملف style.css كيتحكم في الارتفاع وقص الزوائد:
              </p>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono text-left" dir="ltr">
{`.course-img {
  height: 200px;
  object-fit: cover; /* كيقص الجوانب بلا ما يشوه أبعاد الصورة */
}`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Workshop 5: Personnaliser la Navbar */}
      {activeWorkshop === 'navbar' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            تخصيص شريط التنقل وتوقيت تحوله إلى قائمة هاتف (Breakpoint)
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 space-y-2">
              <span className="font-extrabold text-blue-950 dark:text-blue-300 block text-lg">
                كيفاش نتحكم فاش يرجع المنيو زر همبرغر في الشاشة؟
              </span>
              <p>
                في السطر ديال <code className="font-mono font-bold text-blue-600 dark:text-blue-400" dir="ltr">&lt;nav class="navbar navbar-expand-lg ..."&gt;</code> :
              </p>
              <ul className="list-disc list-inside space-y-1.5 font-medium pr-2">
                <li><code className="font-mono font-bold" dir="ltr">navbar-expand-lg</code> : المنيو كيتسرح غير فاش كتفوت الشاشة 992 بيكسل (الحاسوب).</li>
                <li><code className="font-mono font-bold" dir="ltr">navbar-expand-md</code> : المنيو كيتسرح حتى في الطابليت (&gt;= 768 بيكسل).</li>
                <li><code className="font-mono font-bold" dir="ltr">navbar-expand-sm</code> : المنيو كيتسرح في التلفونات العريضة من 576 بيكسل.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-extrabold text-slate-900 dark:text-white block text-lg">
                تثبيت شريط التنقل أثناء النزول في الصفحة :
              </span>
              <p>
                استعملنا الكلاس الحديث <code className="font-mono text-purple-600 dark:text-purple-400 font-bold" dir="ltr">.sticky-top</code> لي كيخلي المنيو يتبعك بسلاسة فاش تسكرولي لتحت بلا ما يغطي على باقي الأقسام.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
