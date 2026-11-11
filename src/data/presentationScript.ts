export interface ScriptSection {
  id: string;
  stepNumber: number;
  timeSlot: string;
  sectionTitle: string;
  actionCue: string;
  arabicSpeech: string;
  frenchSpeech: string;
  keyVocabulary: string[];
  coachAdviceDarija: string;
}

export const presentationScriptSections: ScriptSection[] = [
  {
    id: 'intro',
    stepNumber: 1,
    timeSlot: '00:00 - 02:00',
    sectionTitle: 'المقدمة وافتتاح العرض (Introduction)',
    actionCue: '[الوقوف باستقامة أمام الأستاذ وزملائك، ابتسامة هادئة، عرض واجهة مشروعي على الشاشة كاملة]',
    arabicSpeech: `السلام عليكم أستاذ، السلام عليكم زملائي الأعزاء.

اليوم عندي شرف كبير باش نقدم ليكم مشروعي المصغر في مجال تطوير الويب، واللي سميتو « SkillUp Academy ».

في إطار المادة والمطلوب منا، كانت الفكرة هي إنشاء وتطوير مشروع كامل كيدمج بين لغة HTML وتقنية أو إطار عمل حديث. وباش نحقق هاد الهدف على أكمل وجه، اختاريت نخدم بإطار العمل المعروف Bootstrap في أحدث نسخة رئيسية ديالو، وهي Bootstrap 5، مع إضافة لمستي الخاصة بـ CSS3 المخصص، وبرمجة تفاعلية بالجافاسكريبت الصافي (Vanilla JavaScript).

مشروعي « SkillUp Academy » صممتو وطورتو بنفسي كمنصة ويب تفاعلية حديثة كتعرض دورات تكوينية في مجالات الرقمنة: تطوير المواقع، علوم البيانات، وتصميم واجهات المستخدم.

العرض ديالي اليوم غادي يستغرق 20 دقيقة، وغادي نقسمو لأربعة محاور أساسية:
أولاً: شنو هو بوتستراب 5 وعلاش اختاريتو لمشروعي.
ثانياً: الهيكلة التقنية وكيفاش نظمت الملفات البرمجية ديالي.
ثالثاً: تجربة حية ومباشرة للموقع مع اختبار التجاوب مع شاشات الهواتف والحواسيب (Responsive Design).
ورابعاً: تفكيك وتحليل أسطر الكود البرمجي اللي كتبت والمكونات اللي طبقت.`,
    frenchSpeech: `Bonjour Monsieur, bonjour chers camarades.

Aujourd'hui, j'ai le plaisir de vous présenter mon mini-projet de développement web intitulé « SkillUp Academy ».

Dans le cadre de notre module, la consigne était de concevoir un projet complet combinant le langage HTML avec une autre technologie ou un framework moderne. Pour répondre à cette exigence, j'ai choisi d'intégrer le framework Bootstrap dans sa toute dernière version majeure, Bootstrap 5, associé à du CSS3 personnalisé et du JavaScript natif.

« SkillUp Academy » est un site vitrine interactif que j'ai développé pour présenter des formations aux métiers du numérique.

Notre présentation de 20 minutes s'articulera autour de quatre grands axes :
Premièrement, une mise au point sur ce qu'est Bootstrap 5 et la justification de ce choix technologique.
Deuxièmement, la structure et l'architecture technique des fichiers de mon projet.
Troisièmement, une démonstration pratique en direct avec un test approfondi du Responsive Design.
Et enfin, l'analyse du code source et les composants clés que j'ai implémentés.`,
    keyVocabulary: ['مشروعي المصغر (Mini-projet)', 'إطار عمل حديث (Framework moderne)', 'بوتستراب 5 (Bootstrap 5)', 'تنسيقات مخصصة (CSS3 personnalisé)', 'جافاسكريبت أصلي (Vanilla JS)', 'تصميم متجاوب (Responsive Design)'],
    coachAdviceDarija: "هضر بريتم هادئ وواضح، ماشي ضروري تزرب. شوف في الأستاذ مباشرة في عينيه وملي تقول 'SkillUp Academy' تقدر تشير بيدك للشاشة بكل ثقة وتبين بلي هاد المشروع نتا لي صاوبتيه بيدك."
  },
  {
    id: 'what-is-bootstrap',
    stepNumber: 2,
    timeSlot: '02:00 - 05:00',
    sectionTitle: 'ما هو بوتستراب 5؟ (Qu\'est-ce que Bootstrap 5 ?)',
    actionCue: '[إظهار شعار Bootstrap 5 ورسم توضيحي لشبكة الـ 12 عمود على الشاشة]',
    arabicSpeech: `قبل ما ندوز للتجربة الحية لمشروعي، بغيت نوضح باختصار شنو هو بوتستراب 5 والأساس النظري اللي اعتمدت عليه.

بوتستراب هو أشهر إطار عمل CSS مفتوح المصدر في العالم، صمموه مهندسي تويتر في الأصل لتسهيل وتسريع بناء واجهات الويب العصرية والمتجاوبة.

النسخة الخامسة (Bootstrap 5) اللي استعملت في مشروعي فيها تطور كبير بالمقارنة مع النسخ القديمة:
أولاً وقبل كل شيء: تم التخلي النهائي والكامل عن مكتبة jQuery، وأصبح كل المكونات التفاعلية مكتوبة بالجافاسكريبت الصافي (Vanilla JS)، وهادشي خلا الموقع ديالي خفيف وسريع بزاف في التحميل.

ثانياً: بوتستراب مبني على فلسفة مهمة جداً هي « الموبايل أولاً » (Mobile First). يعني التنسيقات كيبداو من الشاشات الصغيرة ديال الهواتف الذكية، ومن بعد كيتوسعوا تدريجياً للطابليت والبيسي باستعمال Media Queries.

وأخيراً: القلب النابض ديال بوتستراب هو نظام الشبكة (Grid System) المبني على 12 عموداً وهمياً وبتقنية CSS Flexbox. هاد النظام كيمكنني من وضع أي عنصر في الصفحة بدقة رياضية بفضل كلاسات .container و .row و .col.`,
    frenchSpeech: `Avant d'entrer dans la démonstration, permettez-moi de rappeler brièvement ce qu'est Bootstrap 5.

Bootstrap est un framework front-end open-source créé à l'origine par les ingénieurs de Twitter pour accélérer la création d'interfaces réactives.

La version 5, que j'ai utilisée dans mon projet, marque une évolution majeure :
Tout d'abord, elle a totalement abandonné la dépendance à jQuery pour du JavaScript pur natif, ce qui allège considérablement le chargement.
Ensuite, Bootstrap repose sur l'approche « Mobile First », pensée d'abord pour smartphones puis enrichie pour desktop.
Enfin, son cœur est le système de grille basé sur 12 colonnes et sur CSS Flexbox (.container, .row, .col).`,
    keyVocabulary: ['إطار عمل للواجهات (Front-end Framework)', 'مفتوح المصدر (Open-source)', 'حذف مكتبة jQuery بالكامل', 'فلسفة الموبايل أولاً (Mobile First)', 'نظام شبكة 12 عمود (Grid System 12)', 'تقنية فليكس بوكس (CSS Flexbox)'],
    coachAdviceDarija: "ماتنساش تأكد على هاد المعلومة: 'حذف مكتبة jQuery نهائياً'. هاد النقطة بالذات كتبين للأستاذ بلي راك فاهم التطور التقني ديال بوتستراب وعارف الفرق بين v4 و v5."
  },
  {
    id: 'why-bootstrap',
    stepNumber: 3,
    timeSlot: '05:00 - 08:00',
    sectionTitle: 'علاش اختاريت بوتستراب عوض CSS بوحدو؟ (Pourquoi Bootstrap ?)',
    actionCue: '[عرض جدول مقارنة سريع وإبراز الحجج المهنية والعملية]',
    arabicSpeech: `يقدر يطرح الأستاذ هاد السؤال المنطقي: علاش اختاريتي تخدم بـ Bootstrap 5 وما كتبتيش كود CSS كامل من الصفر من الألف إلى الياء؟

كاينين ثلاثة أسباب رئيسية ومقنعة خلاتني نختار هاد التقنية:

السبب الأول هو الإنتاجية ومعايير العمل في الشركات:
في الشركات التقنية وسوق الشغل، بناء نظام شبكة كامل وقائمة هاتف من الصفر في كل مشروع كيضيع وقت كبير. بوتستراب كيعطينا كود متين، مجرب وموثوق على آلاف المتصفحات والأنظمة.

السبب الثاني هو التناسق البصري وسهولة القراءة (Accessibility):
بوتستراب كيوفر مقياس متناسق للخطوط، ومكونات جاهزة كتحترم معايير التباين وسهولة الوصول، مع نظام ألوان دلالي معروف عالمياً (primary، success، warning).

والسبب الثالث هو المرونة وإمكانية التخصيص:
استعمال بوتستراب ما كيعنيش أن الموقع غايكون نسخة مكررة بحال المواقع الأخرى. كما غادي تشوفو معايا، صممت ملف مخصص سميتو 'css/style.css' اللي كيكمل بوتستراب وكيضيف الهوية الخاصة بي: تدرجات لونية، مؤثرات ثلاثية الأبعاد عند تمرير الفأرة (hover)، وخطوط Google الحديثة.`,
    frenchSpeech: `Pourquoi avoir choisi Bootstrap 5 plutôt que de tout coder en CSS pur à partir de zéro ?

Il y a trois raisons fondamentales à ce choix :
La première est la productivité et les standards de l'industrie : réécrire une grille ou un menu burger de zéro prend du temps, alors que Bootstrap offre une base robuste et éprouvée.
La deuxième est la cohérence graphique et l'accessibilité : typographie harmonieuse et palette sémantique universelle.
Enfin, la flexibilité : j'ai ajouté mon fichier personnalisé 'css/style.css' pour apporter ma propre identité visuelle avec des dégradés et animations soignées.`,
    keyVocabulary: ['الإنتاجية المهنية (Productivité)', 'معايير سوق الشغل (Standards)', 'التناسق البصري (Cohérence graphique)', 'سهولة الوصول (Accessibility)', 'تخصيص ملف CSS خارجي (Custom CSS override)'],
    coachAdviceDarija: "هادي نقطة حساسة باش الأستاذ مايقولش ليك 'علاش سهلتها على راسك'. قولو بلي في الشركات والخدمة الحقيقية، الوقت مهم بزاف وإعادة استعمال كود مجرب ومعياري هو اللي مطلوب، وزدتي عليه لمستك الخاصة بـ style.css."
  },
  {
    id: 'architecture',
    stepNumber: 4,
    timeSlot: '08:00 - 10:00',
    sectionTitle: 'هيكلة وتنظيم ملفات مشروعي (Architecture)',
    actionCue: '[فتح مجلد المشروع وعرض الملفات الثلاثة المنظمة بوضوح ونظافة]',
    arabicSpeech: `دابا غادي ننتقل لهيكلة وتنظيم الملفات في مشروعي.

باش نحترم أفضل الممارسات البرمجية، قسمت المشروع لبنية واضحة كتفصل تماماً بين الهيكل (HTML)، المظهر (CSS)، والتفاعل (JavaScript):

في البداية، عندنا ملف 'index.html'. هاد الملف هو نقطة الدخول الرئيسية، وكيحتوي على البنية الدلالية لـ HTML5 بحال الوسوم: <nav> و <header> و <section> و <footer>.
في رأس الصفحة (<head>)، قمت بربط مكتبة بوتستراب 5 عبر شبكة توزيع المحتوى (CDN) الموثوقة والسريعة، مع مكتبة الأيقونات Bootstrap Icons، وملف التنسيقات المخصصة ديالي 'style.css'.

في مجلد 'css'، وضعت ملف 'style.css' اللي فيه المتغيرات اللونية، تحسينات الانتقال، وتأثيرات التحويم للبطاقات.

وفي مجلد 'js'، وضعت سكربت التفاعل 'script.js'. وربطتو في أسفل الصفحة بالضبط، مباشرة بعد ملف 'bootstrap.bundle.min.js'.
وهاد الوضع في أسفل الصفحة مقصود ومهم جداً: حيت كيضمن أن المتصفح يكمل قراءة وعرض عناصر الصفحة كاملة قبل ما يشغل السكربت، وهادشي كيسرع ظهور الموقع للمستخدم.`,
    frenchSpeech: `Passons à l'architecture de mon projet.
J'ai opté pour une structure claire séparant le fond, la forme et le comportement :
Au sommet, le fichier 'index.html' avec les balises sémantiques HTML5 (<nav>, <header>, <section>, <footer>) et l'inclusion de Bootstrap 5 via CDN.
Dans le dossier 'css', mon fichier 'style.css' contenant mes variables et animations.
Et dans le dossier 'js', mon script 'script.js' placé tout en bas du document après 'bootstrap.bundle.min.js' pour optimiser la vitesse de chargement et le rendu initial du DOM.`,
    keyVocabulary: ['فصل المسؤوليات (Separation of concerns)', 'دلالية HTML5 (Semantic tags)', 'شبكة توزيع المحتوى (CDN)', 'أيقونات بوتستراب (Bootstrap Icons)', 'سرعة تحميل الصفحة (Performance)'],
    coachAdviceDarija: "وريه الدوسيات منظمين ومفروزين بنقاء. ملي تقول 'bootstrap.bundle.min.js' فكرو بلي فيه مكتبة Popper.js الضرورية باش النوافذ والمودال يتحطو في بلاصتهم الصحيحة."
  },
  {
    id: 'live-demo',
    stepNumber: 5,
    timeSlot: '10:00 - 14:00',
    sectionTitle: 'العرض والتجربة الحية المباشرة (Live Demo)',
    actionCue: '[الانتقال إلى المتصفح ملء الشاشة على موقع مشروعي وبدء التفاعل خطوة بخطوة]',
    arabicSpeech: `دابا اسمحو ليا نقدم ليكم تجربة حية ومباشرة لموقع « SkillUp Academy » من المتصفح.

[حركة: التمرير ببطء في الصفحة]
كنبداو بشريط التنقل العلوي (Navbar). جعلتو مثبت في أعلى الصفحة باستعمال كلاس .sticky-top، باش يبقى ديما ظاهر للمستخدم فاش يهبط يقرا الصفحة.

في قسم الواجهة الترحيبية (Hero Section)، درت عنوان بارز، شارة كترحب بالزوار، وبطاقة إحصائيات على الجانب. لاحظوا معايا: فاش كنحرك الفأرة فوق البطاقة، كترتفع للأعلى بسلاسة بفضل تأثيرات CSS اللي كتبتها.

ونهبطو لكتالوج الدورات التفاعلي. هنا كيبان التفاعل بالكامل:
[حركة: النقر على زر الفلتر 'البيانات والذكاء الاصطناعي']
فاش كنكليكي على زر 'Data & IA'، كتلاحظوا أن الدورات الخاصة بهذا المجال فقط هي اللي كتبقى ظاهرة، والأخرى كتختفي فوراً وبلا ما نحتاج ندير ريفريش (Reload) للصفحة!

[حركة: الكتابة في حقل البحث]
بنفس الطريقة، حقل البحث خدام في الوقت الفعلي (Real-time). إلا كتبت كلمة 'Bootstrap'، كود الجافاسكريبت كيصفي البطاقات اللي فيها هاد الكلمة في العنوان أو الوصف.

[حركة: النقر على زر 'تسجيل' لفتح النافذة]
وفاش كنكليكي على زر 'تسجيل'، كتفتح نافذة منبثقة (Modal) أنيقة في وسط الشاشة مع اسم الدورة مكتوب تلقائياً. وفاش كنأكد التسجيل، كيظهر إشعار نجاح (Toast) في أسفل الشاشة.

[حركة: النقر على زر الوضع الليلي]
وأخيراً، أضفت ميزة التبديل للوضع الليلي (Dark Mode) المدمجة في Bootstrap 5.3 باستعمال خاصية data-bs-theme، مما كيعطي راحة تامة للعين.`,
    frenchSpeech: `Démonstration en direct de mon site « SkillUp Academy » :
La barre de navigation reste fixée en haut grâce à .sticky-top.
Dans la section Hero, j'ai ajouté une carte d'indicateurs avec transition 3D au survol.
Dans le catalogue de cours :
Le filtrage par catégorie fonctionne instantanément sans recharger la page.
La barre de recherche filtre en temps réel grâce à mon code JavaScript natif.
Le clic sur 'S'inscrire' ouvre une modale Bootstrap pré-remplie et déclenche un Toast de confirmation.
Enfin, le mode sombre natif de Bootstrap 5.3 permet de basculer du thème clair au thème foncé d'un simple clic.`,
    keyVocabulary: ['شريط مثبت (.sticky-top)', 'فلترة فورية بدون إعادة تحميل (Dynamic filtering)', 'بحث فوري (Real-time search)', 'نافذة منبثقة (.modal)', 'إشعار عائم (.toast)', 'الوضع المظلم (Dark Mode data-bs-theme)'],
    coachAdviceDarija: "خليك رزين في العرض الحي. كليكي على الفلترات، كتب في خانة البحث، حل المودال، ووريه التبديل للثيم المظلم (Dark Mode). هاد التفاعلات كتبهر الأستاذ وتثبت أن السيت ديالك كلو خدام 100%."
  },
  {
    id: 'responsive-demo',
    stepNumber: 6,
    timeSlot: '14:00 - 18:00',
    sectionTitle: 'تفكيك الكود والتجاوب مع الهواتف (Responsive Design)',
    actionCue: '[فتح أداة الفحص F12 في المتصفح وتقليص حجم الشاشة بالتدريج أمام الأستاذ]',
    arabicSpeech: `دابا بغيت نركز على أهم جانب تقني في مشروعي: وهو التصميم المتجاوب (Responsive Design) وكيفاش كتبت الكود ديالو.

[حركة: تصغير نافذة المتصفح لحجم الطابليت 768 بيكسل]
شوفو معايا شنو كيوقع ملي كنصغرو الشاشة لحجم الطابليت:
الكروت ديال الدورات كينتاقلو تلقائياً من 3 كروت في السطر إلى كارتين فقط في السطر. علاش؟
حيت في كود HTML كتبت هاد الكلاسات: 'col-12 col-md-6 col-lg-4'.
في الشاشات الكبيرة (lg) كل كارت كتاخد 4 أعمدة من أصل 12، يعني الثلث.
وفي شاشات الطابليت (md) كتاخد 6 أعمدة من أصل 12، يعني النصف بالضبط.

[حركة: تصغير النافذة لحجم الهاتف 375 بيكسل]
ودابا كنشوفو حجم شاشة هاتف ذكي بحال الآيفون:
كل كارت ولات كتاخد 12 عمود، يعني 100% من عرض الشاشة، وهادشي كيعطي سهولة تامة للقراءة بإبهام اليد.

وشوفو معايا شريط التنقل الفوقاني (Navbar):
روابط القائمة اختفات كاملة، وظهر مكانها زر ميني برغر (Hamburger menu).
إلا كليكيت عليه، القائمة كتهبط بسلاسة عمودياً بفضل مكون .collapse ديال بوتستراب، وبلا ما نضطر نكتب 50 سطر ديال الكود باش ندير هاد الأنيميشن.

[حركة: الذهاب إلى نموذج التواصل والضغط على إرسال وهو فارغ]
وأخيراً في نموذج التواصل: إلا كليكيت على 'إرسال' والحقول خاوية، كود الجافاسكريبت كيوقف الإرسال عبر checkValidity()، وكيضيف كلاس 'was-validated'. ومباشرة بوتستراب كيدير إطار أحمر ورسائل تنبيه محددة تحت كل حقل.`,
    frenchSpeech: `Attirons l'attention sur le Responsive Design de mon projet :
Sur tablette (768px), les 3 cartes passent à 2 par ligne grâce aux classes 'col-12 col-md-6 col-lg-4' (4 colonnes sur 12 en lg, 6 sur 12 en md).
Sur mobile (375px), chaque carte prend 12 colonnes (100% de la largeur).
La Navbar transforme ses liens en bouton Hamburger via le composant .collapse.
Et dans le formulaire, JavaScript intercepte la soumission, vérifie form.checkValidity(), et ajoute 'was-validated' pour afficher les bordures d'erreur et messages d'alerte.`,
    keyVocabulary: ['نقاط التوقف (Breakpoints md, lg)', 'كلاسات التجاوب (col-12 col-md-6 col-lg-4)', 'قائمة ميني برغر (Hamburger Menu)', 'مكون القابلية للطي (.collapse)', 'التحقق من المدخلات (was-validated)'],
    coachAdviceDarija: "هادي هي اللحظة فاش كتاخد النقطة الكاملة! ملي كتصغر الشاشة قدام الأستاذ وكيشوف القائمة رجعات ميني برغر بلا حتى خطأ ولا سكرول أفقي، كيعرفك فاهم هندسة الموقع مزيان."
  },
  {
    id: 'conclusion',
    stepNumber: 7,
    timeSlot: '18:00 - 20:00',
    sectionTitle: 'الخاتمة وفتح باب الأسئلة (Conclusion & Questions)',
    actionCue: '[العودة لواجهة المشروع الرئيسية، شكر الأستاذ والزملاء، والاستعداد للأسئلة بثقة]',
    arabicSpeech: `وفي الختام، هذا المشروع المصغر « SkillUp Academy » كان فرصة تطبيقية ممتازة باش نرسخ المكتسبات والمهارات ديالي في تطوير الويب.

تعلمت فيه وطبقت عملياً:
أولاً: إتقان بيئة عمل Bootstrap 5 ونظام الشبكة المتقن بـ 12 عموداً.
ثانياً: التخصيص الاحترافي لإطار عمل عبر ملف CSS خارجي دون المساس بالأصل.
وثالثاً: إضافة وظائف تفاعلية ذكية عبر التحكم في عناصر الصفحة (DOM) بواسطة الجافاسكريبت الصافي.

وبالنسبة لآفاق تطوير مشروعي مستقبلاً، فهاد الموقع كيشكل قاعدة متينة نقدر نربط فيها نموذج التسجيل بقاعدة بيانات MySQL عبر PHP أو Node.js، أو نحول المكونات لتطبيق React متكامل.

كنشكركم بزاف أستاذي وزملائي على حسن الانتباه وحسن الاستماع، وأنا دابا رهن إشارتكم بكل سرور للإجابة على جميع أسئلتكم وملاحظاتكم.`,
    frenchSpeech: `Pour conclure, ce mini-projet « SkillUp Academy » a consolidé mes acquis :
1. La maîtrise de la grille 12 colonnes de Bootstrap 5.
2. La personnalisation propre via CSS externe.
3. L'interactivité dynamique en Vanilla JavaScript.
Comme perspectives, je pourrais relier ce site à une base de données MySQL via PHP ou le migrer vers React.
Je vous remercie pour votre attention et je suis à votre entière disposition pour vos questions.`,
    keyVocabulary: ['ترسيخ المكتسبات (Consolidation des acquis)', 'التحكم في عناصر الـ DOM', 'آفاق التطوير المستقبلية (Perspectives)', 'شكر الأستاذ والحضور (Remerciements)'],
    coachAdviceDarija: "سالي بهدوء وابتسامة: 'شكراً جزيلاً أستاذ على حسن الانتباه، وأنا دابا رهن إشارتكم للإجابة على أي سؤال'. وقف مرتاح وتسنى أسئلة الأستاذ بكل ثقة، راك موجد 100%!"
  }
];
