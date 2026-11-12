# Bootstrap 5 Interactive Academy & Defense Coach
### أكاديمية بوتستراب 5 التفاعلية ومدرب المناقشة الشفوي الأكاديمي

مشروع ويب تعليمي متكامل وشامل يجمع بين:
1. **الأكاديمية التفاعلية الرئيسية (Bootstrap 5 + Vanilla JS)**: مسار تعلم من 20 مرحلة، محاكي شبكة الـ 12 عمود الحي، مكتبة المكونات التفاعلية، مستكشف أدوات CSS Utilities، المختبر البرمجي الحي (Playground)، ومحاكي الامتحان النهائي مع توليد شهادة إتقان معتمدة.
2. **مدرب المناقشة الشفوي المتقدم (React 19 + Tailwind + Lucide)**: تحليل هندسي عميق للمشروع، تفكيك الكود سطر بسطر بالدارجة المغربية والعربية، خطة عرض الـ 20 دقيقة، خطاب الإلقاء الشفهي أمام اللجنة، وأسئلة الأستاذ الـ 20 الأكثر شيوعاً مع إجابات نموذجية.
3. **تكامل كامل مع سحابة Supabase**:
   - مصادقة مستخدمين متكاملة (تسجيل دخول، إنشاء حساب، استعادة كلمة المرور، تحديث كلمة المرور، جلسات دائمة).
   - قاعدة بيانات PostgreSQL مع سياسات أمان Row Level Security (RLS).
   - مزامنة التقدم الأكاديمي والشهادات عبر السحابة.
   - وضع العمل المحلي (Offline Mode) تلقائي في حال عدم توفر المفاتيح لضمان عدم توقف الموقع نهائياً.

---

## 🚀 البدء والتشغيل المحلي (Local Setup)

### 1. تثبيت الحزم:
```bash
npm install
```

### 2. إعداد متغيرات البيئة:
قم بنسخ ملف `.env.example` إلى `.env`:
```bash
cp .env.example .env
```
وقم بملء بيانات Supabase الخاصة بك:
```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### 3. تشغيل خادم التطوير:
```bash
npm run dev
```
افتح المتصفح على: `http://localhost:3000`

### 4. بناء المشروع للإنتاج:
```bash
npm run build
```

---

## 🗄️ إعداد قاعدة بيانات Supabase (SQL Schema & Migrations)

1. سجل الدخول إلى [لوحة تحكم Supabase](https://supabase.com/dashboard).
2. افتح مشروعك وانتقل إلى **SQL Editor**.
3. انسخ وشغّل محتوى الملف الموجود في:
   ```
   supabase/migrations/20261112_initial_schema.sql
   ```
4. سيتم تلقائياً إنشاء:
   - جدول الملفات الشخصية `public.profiles`.
   - جدول تقدم الطالب `public.user_progress`.
   - جدول نتائج الاختبارات والشهادات `public.quiz_results`.
   - جدول المشاريع المحفوظة `public.saved_projects`.
   - مفاتيح وسياسات الأمان على مستوى الصفوف (Row Level Security - RLS).
   - المشغل التلقائي (Database Trigger) الذي ينشئ ملفاً شخصياً فور تسجيل أي مستخدم جديد.

---

## 🌐 النشر على Vercel (Vercel Deployment)

المشروع مهيأ بالكامل لـ Vercel مع ملف `vercel.json` لإعادة توجيه المسارات وحماية الرؤوس (Headers):

1. ادخل إلى لوحة Vercel واربط مستودع Git الخاص بالمشروع.
2. تأكد من الإعدادات:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. في قسم **Environment Variables** أضف:
   - `NEXT_PUBLIC_SUPABASE_URL`: رابط مشروع Supabase الخاص بك.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: المفتاح العام (anon public key).
4. اضغط **Deploy**.
