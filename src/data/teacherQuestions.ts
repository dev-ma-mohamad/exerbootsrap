export interface TeacherQuestion {
  id: number;
  category: 'grid' | 'bootstrap_vs_css' | 'javascript' | 'forms' | 'best_practices';
  questionAr: string;
  shortAnswerAr: string;
  detailedAnswerAr: string;
  darijaExplanation: string;
  trapToAvoidAr: string;
  sampleOptionsAr: string[];
  correctOptionIndex: number;
  // Bilingual references
  questionFr?: string;
  shortAnswerFr?: string;
  trapToAvoidFr?: string;
}

export const teacherQuestionsList: TeacherQuestion[] = [
  {
    id: 1,
    category: 'bootstrap_vs_css',
    questionAr: "ما هو الفرق الجوهري والأساسي بين Bootstrap 4 و Bootstrap 5؟",
    shortAnswerAr: "بوتستراب 5 تخلص نهائياً من مكتبة jQuery واعتمد على Vanilla JavaScript خالص، وأدخل دعم اللغات من اليمين لليسار (RTL) بتغيير start/end، وأضاف الوضع المظلم والمتغيرات CSS.",
    detailedAnswerAr: "في Bootstrap 4 كانت مكتبة jQuery إجبارية لتشغيل النوافذ والقوائم. أما Bootstrap 5 فأصبح أخف بكثير وأسرع لأنه مبرمج بالجافاسكريبت الحديث الأصلي. كما أضاف تحكماً بالمتغيرات CSS في وقت التشغيل ودعماً مدمجاً للثيم الليلي.",
    darijaExplanation: "الفرق الكبير هو: في بوتستراب 4 كان ضروري ومفروض تخدم بمكتبة jQuery باش يخدمو النوافذ والقوائم. في بوتستراب 5 حيدو jQuery نهائياً وولا كود خفيف بالـ Vanilla JS (الجافاسكريبت العادي الأصلي). وزادو المود المظلم (Dark Mode) وبدلو الكلمات ديال left و right بـ start و end باش العربية (RTL) تخدم مقادة بلا مشاكل.",
    trapToAvoidAr: "إياك أن تقول إن بوتستراب 5 ما زال يستعمل jQuery! هذا أكبر فخ يختبر به الأساتذة انتباه الطلاب.",
    sampleOptionsAr: [
      "بوتستراب 5 تخلى نهائياً عن jQuery واعتمد على Vanilla JS ودعم RTL عبر start و end",
      "بوتستراب 5 يتطلب بالضرورة تثبيت مكتبة React JS لكي يشتغل",
      "بوتستراب 5 حذف نظام الشبكة المكون من 12 عموداً",
      "بوتستراب 5 لا يعمل إلا مع لغة PHP فقط"
    ],
    correctOptionIndex: 0,
    questionFr: "Quelle est la différence fondamentale entre Bootstrap 4 et Bootstrap 5 ?"
  },
  {
    id: 2,
    category: 'grid',
    questionAr: "لماذا تم بناء نظام شبكة بوتستراب على 12 عموداً بالضبط وليس 10 أعمدة؟",
    shortAnswerAr: "لأن الرقم 12 يقبل القسمة على أعداد كثيرة (1، 2، 3، 4، 6، 12)، مما يسمح بتقسيم الشاشة بسهولة إلى صفوف من نصفين، 3 أثلاث، 4 أرباع، أو 6 أجزاء متساوية.",
    detailedAnswerAr: "الرقم 10 لا يقبل القسمة سوى على 2 و 5، ولا يمكنك به وضع 3 أو 4 بطاقات متساوية في نفس السطر. أما 12 فهو أصغر رقم عملي عالي التركيب في تصميم الواجهات (col-6, col-4, col-3, col-2, col-1).",
    darijaExplanation: "علاش 12 ماشي 10؟ حيت رقم 12 كيقبل القسمة على بزاف: تقدر تقسمو على 2 (6 و 6)، على 3 (4 و 4 و 4)، على 4 (3x4)، وعلى 6. كون دارو 10، ماغاديش تقدر تدير 3 ديال الكروت متساويين في نفس السطر نهائياً!",
    trapToAvoidAr: "لا تقل 'إنه اختيار عشوائي من مطوري تويتر'، بل وضح أنه اختيار رياضي هندسي مرتبط بقابلية القسمة.",
    sampleOptionsAr: [
      "لأن الرقم 12 يقبل القسمة على 1 و 2 و 3 و 4 و 6 و 12 مما يتيح كل التوزيعات الشائعة",
      "لأن شاشات الحواسيب عرضها القياسي هو 1200 بيكسل دائماً",
      "لأن مواصفات HTML5 تمنع كتابة أكثر من 12 وسم div في سطر واحد",
      "لأن شركة تويتر كان لديها 12 موظفاً فقط وقت إطلاق بوتستراب"
    ],
    correctOptionIndex: 0,
    questionFr: "Pourquoi le système de grille de Bootstrap est-il basé exactement sur 12 colonnes et pas 10 ?"
  },
  {
    id: 3,
    category: 'grid',
    questionAr: "ما هو الفرق الدقيق بين كلاس .container وكلاس .container-fluid؟",
    shortAnswerAr: "كلاس .container له عرض أقصى محدد وثابت (max-width) يتغير حسب نوع الشاشة ويتوسط الصفحة، بينما .container-fluid يشغل دائماً 100% من عرض الشاشة بالكامل.",
    detailedAnswerAr: ".container يطبق max-width مدروساً (مثل 720px في الشاشات المتوسطة md، و 960px في lg، و 1140px في xl) مع هوامش جانبية تلقائية. أما .container-fluid فيمتد من الحافة إلى الحافة بدون حد أقصى للعرض.",
    darijaExplanation: ".container كيحبس المحتوى في واحد العرض محدد (max-width) وكيجيبو موسط في قلب الشاشة باش العين ترتاح في القراءة. أما .container-fluid فكياخد 100% ديال العرض كامل من القنت للقنت بلا ما يحبس.",
    trapToAvoidAr: "لا تخلط بين العرض الثابت والتجاوب، فكلاهما متجاوبان، ولكن الأول له سقف أقصى والثاني ممتد بنسبة 100% على الدوام.",
    sampleOptionsAr: [
      ".container له عرض أقصى متدرج ويتوسط الصفحة، بينما .container-fluid يأخذ دائماً 100% من العرض",
      ".container مخصص للهواتف فقط، بينما .container-fluid للحواسيب فقط",
      ".container كلاس قديم ملغى وتم استبداله بـ .container-fluid",
      ".container-fluid يتطلب بالضرورة تشغيل كود جافاسكريبت"
    ],
    correctOptionIndex: 0,
    questionFr: "Quelle est la différence exacte entre .container et .container-fluid ?"
  },
  {
    id: 4,
    category: 'grid',
    questionAr: "ماذا يعني عملياً وتطبيقياً مبدأ 'الموبايل أولاً' (Mobile First) في بوتستراب؟",
    shortAnswerAr: "يعني أن كود وتنسيقات CSS كُتبت أولاً للشاشات الصغيرة للهواتف، ثم يتم توسيعها وتكييفها للشاشات الكبرى تدريجياً عبر Media Queries باستخدام خاصية min-width.",
    detailedAnswerAr: "في منهجية Mobile First، التنسيقات الأساسية تطبق افتراضياً بدون بادئة (مثل col-12). وعندما نضيف col-md-6 فهذا يعني: انطلاقاً من مقاس 768px فما فوق اجعلها تأخذ 6 أعمدة. أما في الشاشات الأصغر فيبقى الحجم الافتراضي 100%.",
    darijaExplanation: "مفهوم 'Mobile First' كيعني باللي الخدمة كتبدا من الصغير للكبير. الكود كيتصاوب أولاً باش يجي نقي ومقروء في شاشات التيليفونات، ومن بعد بفضل الـ Media Queries (min-width) كنقولو للمتصفح إلا كانت الشاشة كبر من 768 بيكسل عاد زيد قاد الترتيب على جوج ولا تلاتة كروت.",
    trapToAvoidAr: "لا تقل 'الموقع مصمم للهاتف فقط'، بل وضح أنها استراتيجية هندسية تبدأ بالهاتف وتتدرج للأكبر.",
    sampleOptionsAr: [
      "الكود يستهدف الهاتف افتراضياً أولاً، ثم يتوسع للشاشات الأكبر عبر شروط min-width",
      "الموقع لا يمكن تصفحه إلا على الهواتف الذكية ولا يفتح على الحواسيب",
      "بوتستراب يقوم تلقائياً بتحويل الموقع إلى تطبيق أندرويد APK",
      "الصور تضغط إجبارياً بجودة الهاتف فقط"
    ],
    correctOptionIndex: 0,
    questionFr: "Que signifie concrètement l'approche 'Mobile First' dans Bootstrap ?"
  },
  {
    id: 5,
    category: 'javascript',
    questionAr: "لماذا قمنا بربط 'bootstrap.bundle.min.js' وليس فقط 'bootstrap.min.js'؟",
    shortAnswerAr: "لأن نسخة 'bundle' تتضمن بداخلها مكتبة Popper.js الضرورية جداً لحساب موضع النوافذ المنبثقة، القوائم المنسدلة، والتلميحات العائمة تلقائياً.",
    detailedAnswerAr: "عناصر مثل Modals و Dropdowns تحتاج لحساب رياضي لموضعها على الشاشة بالنسبة للعنصر الذي نقر عليه المستخدم حتى لا تخرج عن حواف الشاشة. مكتبة Popper.js هي المسؤولة عن هذا الحساب، وبدونها ستظهر أخطاء برمجية في الكونسول.",
    darijaExplanation: "الملف لي سميتو 'bundle' مجموع في كرشو واحد المكتبة مشهورة سميتها Popper.js. هاد المكتبة هي العقل لي كيحسب بلاصة النوافذ المنبثقة والقوائم في الشاشة باش ماتخرجش برا الكادر وتجي مسنترة مع الزر فاش تكليكي عليه.",
    trapToAvoidAr: "الاعتقاد بأن ملف الباندل مجرد ملف ثقيل بدون فائدة، بل أكد دائماً على وجود مكتبة Popper.js بداخله.",
    sampleOptionsAr: [
      "ملف الباندل يحتوي على Popper.js اللازمة لحساب مواضع القوائم والنوافذ المنبثقة بدقة",
      "ملف الباندل يحتوي على كود CSS مضغوط مع الجافاسكريبت",
      "الباندل إجباري لإظهار أيقونات بوتستراب",
      "الباندل يسمح بتشغيل لغة PHP مباشرة داخل المتصفح"
    ],
    correctOptionIndex: 0,
    questionFr: "Pourquoi a-t-on importé 'bootstrap.bundle.min.js' et pas seulement 'bootstrap.min.js' ?"
  },
  {
    id: 6,
    category: 'grid',
    questionAr: "ماذا يحدث إذا تجاوز مجموع أرقام الأعمدة 12 في عنصر .row واحد؟",
    shortAnswerAr: "الأعمدة الزائدة عن مجموع 12 تنزل تلقائياً إلى السطر الموالي (ظاهرة Column Wrapping) بفضل خاصية flex-wrap: wrap.",
    detailedAnswerAr: "بما أن كلاس .row يحمل خاصية CSS الافتراضية 'flex-wrap: wrap'، فإذا وضعنا مثلاً عمودين: col-8 و col-6 (المجموع = 14)، فإن العنصر الثاني سينتقل مباشرة إلى سطر جديد دون أن يكسر الصفحة.",
    darijaExplanation: "إلا درتي مثلاً عنصر واخد col-8 وزدتي حداه عنصر فيه col-6، المجموع هو 14 (أكبر من 12). حيت الكلاس row فيه خاصية 'flex-wrap: wrap'، العنصر التاني كيهبط أوتوماتيك للسطر الجديد بلا مايوقع حتى بلوكاج ولا خطأ.",
    trapToAvoidAr: "لا تظن أن ذلك يسبب خطأ برمجياً أو صفحة بيضاء، بل هو سلوك طبيعي ومتوقع في نظام Flexbox.",
    sampleOptionsAr: [
      "الأعمدة الزائدة تنزل تلقائياً إلى السطر الموالي بفضل خاصية flex-wrap: wrap",
      "يعرض المتصفح شاشة بيضاء مع رسالة خطأ في الصياغة",
      "تتراكب الأعمدة فوق بعضها البعض بشكل عشوائي",
      "يقوم بوتستراب بحذف الأعمدة الزائدة تلقائياً"
    ],
    correctOptionIndex: 0,
    questionFr: "Que se passe-t-il si la somme des colonnes dépasse 12 dans une balise .row ?"
  },
  {
    id: 7,
    category: 'grid',
    questionAr: "لماذا يُمنع منعاً باتاً وضع نص أو محتوى داخل .row مباشرة دون وسم .col؟",
    shortAnswerAr: "لأن كلاس .row له هوامش جانبية سالبة (-12px أو -15px). وبدون عمود .col يعوض المساحة الداخلية (Padding)، سيتجاوز النص حدود الصفحة ويسبب شريط تمرير أفقي مشوهاً.",
    detailedAnswerAr: "الهيكل الإجباري في بوتستراب هو: Container ثم Row ثم Column. الحاوية تضيف padding، والسطر row يطبق margin سالباً مكافئاً لتلتصق الأعمدة بالحواف، والأعمدة col تعيد ضخ الـ padding الداخلي. تجاوز الـ col يدمر هذا التوازن الهندسي.",
    darijaExplanation: "القاعدة الذهبية هي: Container موراه Row موراه Col. الكلاس .row فيه هوامش سلبية (-15px). إلا حطيتي التيكست ديريكت في .row بلا col، غادي يخرج على الإطار ويدير سكرول أفقي عوج يخسر السيت.",
    trapToAvoidAr: "هذا خطأ هندسي شائع يحاسب عليه الأساتذة بصرامة، فأظهر دائماً معرفتك بالقاعدة الثلاثية: Container > Row > Col.",
    sampleOptionsAr: [
      "لأن .row له هوامش سلبية ويحتاج حتماً لعمود .col بهوامش داخلية لإعادة توازن الشبكة",
      "لأن المتصفح يرفض عرض النصوص داخل عناصر الفليكس",
      "لأن كلاس .row يحذف وسوم الفقرات <p> تلقائياً",
      "لأن النصوص لا يمكن تلوينها إلا إذا كانت داخل كلاس .col"
    ],
    correctOptionIndex: 0,
    questionFr: "Pourquoi ne faut-il JAMAIS placer de texte directement dans un .row sans passer par un .col ?"
  },
  {
    id: 8,
    category: 'best_practices',
    questionAr: "ما هو دور وسم <meta name='viewport'> في الـ <head> بملف index.html؟",
    shortAnswerAr: "يخبر متصفحات الهواتف بجعل عرض نافذة العرض مساوياً للعرض الفيزيائي الحقيقي للجهاز (width=device-width) مع مقياس أولي بنسبة 1:1 بدون تصغير افتراضي.",
    detailedAnswerAr: "بدون هذا الوسم، تفترض الهواتف الذكية أنك تتصفح موقع كمبيوتر مكتبي قديم عرضه 980 بيكسل وتقوم بتصغير الصفحة كاملة (Zoom out)، مما يجعل التصميم المتجاوب في بوتستراب معطلاً تماماً على الهاتف.",
    darijaExplanation: "هاد الباليز هي الساروت ديال التيليفون. بلا بيها، المتصفح كيحسب باللي راك كتشوف من بيسي كبير وكيصغر الصفحة (dézoom)، وبالتالي كاع الخدمة ديال التجاوب (Responsive) مابانش في التليفون.",
    trapToAvoidAr: "لا تقل إنه لتحسين محركات البحث (SEO)، فدوره الحصري هو تحديد مقاييس العرض الفيزيائية على شاشات الهواتف.",
    sampleOptionsAr: [
      "يضبط عرض الصفحة ليتطابق مع العرض الحقيقي لشاشة الجهاز (width=device-width)",
      "يضيف أيقونة الفافيكون في تبويب المتصفح",
      "يستخدم لأرشفة الموقع في نتائج بحث جوجل فقط",
      "يقوم بتفعيل بروتوكول التشفير الآمن HTTPS"
    ],
    correctOptionIndex: 0,
    questionFr: "À quoi sert la balise <meta name='viewport'> dans le <head> de votre index.html ?"
  },
  {
    id: 9,
    category: 'forms',
    questionAr: "كيف يعمل التحقق من صحة مدخلات النموذج عبر 'needs-validation' و 'was-validated'؟",
    shortAnswerAr: "خاصية novalidate تعطل فحص المتصفح الافتراضي. وعند النقر على إرسال، يفحص الجافاسكريبت form.checkValidity()، فإذا كان ناقصاً يمنع الإرسال ويضيف كلاس .was-validated لإظهار الحواف الحمراء والرسائل.",
    detailedAnswerAr: "بوتستراب يستغل خاصيتي CSS: :valid و :invalid. لكن لتفادي إظهار اللون الأحمر قبل أن يكتب المستخدم، ينتظر وجود كلاس .was-validated على النموذج لكي يظهر ألوان النجاح والخطأ ورسائل .invalid-feedback.",
    darijaExplanation: "ملي اليوزر كيكليكي على إرسال، الجافاسكريبت كيتأكد واش الحقول الإجبارية عامرة (checkValidity). إلى كانت خاوية، كيمنع الإرسال ويزيد كلاس سميتو 'was-validated'. هاد الكلاس هو السينيال اللي كيخلي بوتستراب يصبغ الحقل بالحمر ويطلع ميساج الخطأ.",
    trapToAvoidAr: "لا تنس ذكر دالة checkValidity() في الجافاسكريبت، ولا تظن أن بوتستراب يفحص المدخلات بدون كود JS.",
    sampleOptionsAr: [
      "يفحص JS دالة checkValidity() ويضيف .was-validated لتفعيل حدود الخطأ ورسائل التنبيه",
      "يقوم بوتستراب بإرسال البيانات مباشرة إلى خادم PHP دون فحص",
      "يقوم HTML5 بإعادة تحميل الصفحة لإظهار الأخطاء من قاعدة البيانات",
      "كلاس .needs-validation يقوم بتشفير كلمات المرور تلقائياً"
    ],
    correctOptionIndex: 0,
    questionFr: "Comment fonctionne la validation du formulaire avec 'needs-validation' et 'was-validated' ?"
  },
  {
    id: 10,
    category: 'bootstrap_vs_css',
    questionAr: "في بوتستراب 5، لماذا نستعمل 'ms-auto' و 'me-2' بدلاً من 'ml-auto' و 'mr-2'؟",
    shortAnswerAr: "لأن الحرف s يعني Start (البداية) و e يعني End (النهاية). هذا التغيير يدعم اللغات المكتوبة من اليمين إلى اليسار كالعربية (RTL) تلقائياً دون تعديل الكود.",
    detailedAnswerAr: "في الفرنسية والإنجليزية (LTR)، البداية Start هي اليسار والنهاية End هي اليمين. أما في اللغة العربية (RTL)، فتصبح البداية هي اليمين والنهاية هي اليسار. استعمال s و e يجعل الكود محايداً اتجاهياً وقابلاً للتدويل.",
    darijaExplanation: "في بوتستراب 4 كانو كيقولو ml (margin-left) و mr (margin-right). في بوتستراب 5 بدلوهم بـ ms (البداية) و me (النهاية). علاش؟ باش إلى قلبتي السيت للغة العربية (RTL)، كولشي يتقلب لليمين واليسار أوتوماتيك بلا ماتعاود تكتب الكود!",
    trapToAvoidAr: "لا تقل إنه مجرد اختصار شكلي، بل هو مصمم خصيصاً لدعم اتجاهات القراءة المتعددة ونظام RTL.",
    sampleOptionsAr: [
      "لاستبدال Left/Right بمصطلحي Start/End لدعم لغات اليمين لليسار RTL كالعربية",
      "لتقليص حجم ملف الـ CSS بعدة بايتات فقط",
      "لأن كلمة left أصبحت كلمة محجوزة في الجافاسكريبت الحديث",
      "للتمييز بين النسخة المجانية والنسخة المدفوعة من بوتستراب"
    ],
    correctOptionIndex: 0,
    questionFr: "Dans Bootstrap 5, pourquoi utilise-t-on 'ms-auto' et 'me-2' au lieu de 'ml-auto' et 'mr-2' ?"
  },
  {
    id: 11,
    category: 'javascript',
    questionAr: "كيف قمت ببرمجة تصفية الدورات حسب المجال في ملف script.js؟",
    shortAnswerAr: "كل زر يحمل خاصية data-filter وكل بطاقة تحمل data-category. بالجافاسكريبت أستمع لحدث النقر، فإذا تطابقت الفئة أو كانت 'all' أزيل كلاس 'd-none'، وإلا أضيفه لإخفاء البطاقة.",
    detailedAnswerAr: "أستخدم document.querySelectorAll لتحديد الأزرار والبطاقات. وباستعمال addEventListener('click') أقارن قيمة data-filter مع data-category، ثم أطبق كلاس .d-none (display: none) لإخفاء ما لا يطابق الاختيار فورياً.",
    darijaExplanation: "كل بوطون عندو data-filter وكل كارت عندها data-category. فاش كيكليكي اليوزر على شي زر بحال 'Data'، الجافاسكريبت كيقارن بيناتهم: الكروت اللي كيتشابهو كيبقاو باينين، واللي مختالفين كنزيدو ليهم كلاس '.d-none' باش يتخباو في البلاصة.",
    trapToAvoidAr: "لا تقل إنك تعيد تحميل الصفحة أو تطلب بيانات من الخادم، بل هي تصفية فورية 100% في المتصفح (Client-side).",
    sampleOptionsAr: [
      "بمقارنة خواص data-filter و data-category في JS وإضافة أو إزالة كلاس .d-none",
      "عبر استدعاء خادم PHP خارجي يعيد كود HTML من جديد",
      "باستعمال قاعدة بيانات MongoDB متصلة مباشرة بالمتصفح",
      "بإعادة تحميل الصفحة بالكامل مع متغير في الرابط URL"
    ],
    correctOptionIndex: 0,
    questionFr: "Comment avez-vous implémenté le filtrage des cours par catégorie dans script.js ?"
  },
  {
    id: 12,
    category: 'javascript',
    questionAr: "كيف تعمل ميزة التبديل للوضع الليلي (Dark Mode) في بوتستراب 5.3؟",
    shortAnswerAr: "بوتستراب 5.3 يدعم الوضع الليلي مدمجاً عبر خاصية 'data-bs-theme'. وفي الجافاسكريبت يكفي تغيير قيمة هذه الخاصية على وسم <html> بين 'light' و 'dark'.",
    detailedAnswerAr: "على عكس النسخ القديمة التي كانت تتطلب ملف CSS منفصلاً للثيم الليلي، يعيد بوتستراب 5.3 تعريف متغيرات CSS للألوان (--bs-body-bg, --bs-body-color...) تلقائياً حسب قيمة html[data-bs-theme='dark'].",
    darijaExplanation: "في بوتستراب 5.3 دخلو المود المظلم بطريقة احترافية وساهلة بزاف: غير كتدير في balise html هاد الخاصية: data-bs-theme='dark'، بوتستراب كيقلب كاع الألوان للكحل أوتوماتيك. وحنا بالجافاسكريبت غير كنبدلو بين light و dark عند النقرة.",
    trapToAvoidAr: "لا تظن أنك كتبت كود CSS كاملاً بالألوان الداكنة، بل بين أنها ميزة مدمجة رسمية في Bootstrap 5.3.",
    sampleOptionsAr: [
      "بتغيير خاصية data-bs-theme على وسم <html> ديناميكياً بين 'light' و 'dark' بالجافاسكريبت",
      "بتطبيق فلتر CSS هو invert(100%) على كل الصفحة",
      "بتحميل ملف CSS بوتستراب منفصل خاص بالثيم الليلي",
      "بخفض إضاءة شاشة حاسوب الأستاذ"
    ],
    correctOptionIndex: 0,
    questionFr: "Comment fonctionne la bascule du thème sombre (Dark Mode) dans Bootstrap 5.3 ?"
  },
  {
    id: 13,
    category: 'grid',
    questionAr: "ما هو 'نقطة التوقف' (Breakpoint) وما هي النقاط المتوفرة في Bootstrap 5؟",
    shortAnswerAr: "نقطة التوقف هي مقاس شاشة محدد تفصل بين الأجهزة المختلفة عبر Media Queries. وبوتستراب 5 يحتوي على 6 مقاسات: xs، sm، md، lg، xl، و xxl.",
    detailedAnswerAr: "النقاط هي: xs (أقل من 576px للهواتف)، sm (أكبر من 576px)، md (أكبر من 768px للطابليت)، lg (أكبر من 992px للابتوب)، xl (أكبر من 1200px)، و xxl (أكبر من 1400px للشاشات الكبيرة جداً).",
    darijaExplanation: "الـ Breakpoint هو نقطة العبور بين حجم شاشة وشاشة أخرى. بوتستراب 5 فيه 6 مقاسات: xs للتيليفون العادي، sm للتيليفون العريض، md للطابليت، lg للبيسي البورطابل، xl لشاشات المكاتب، و xxl للشاشات الضخمة والتلفازات.",
    trapToAvoidAr: "لا تنس ذكر نقطة التوقف 'xxl' (1400px) لأنها ميزة جديدة أضيفت حصرياً في Bootstrap 5 ولم تكن موجودة في v4.",
    sampleOptionsAr: [
      "6 مقاسات: xs (<576px), sm (576px), md (768px), lg (992px), xl (1200px), xxl (1400px)",
      "3 مقاسات فقط: هاتف، طابليت، وتلفاز",
      "النقاط تحسب كنسبة مئوية من بطارية الجهاز",
      "لا توجد نقاط توقف ثابتة وتتغير حسب حالة الطقس"
    ],
    correctOptionIndex: 0,
    questionFr: "Qu'est-ce qu'un 'breakpoint' et quels sont ceux disponibles dans Bootstrap 5 ?"
  },
  {
    id: 14,
    category: 'best_practices',
    questionAr: "ما هي شبكة الـ CDN وما هي مميزاتها في مشروعك؟",
    shortAnswerAr: "شبكة CDN (Content Delivery Network) هي شبكة سيرفرات عالمية توزع الملفات الثابتة. مميزاتها: سرعة التحميل، تخفيف العبء على سيرفرنا، والتخزين المؤقت المشترك في متصفحات الزوار.",
    detailedAnswerAr: "عندما يفتح الزائر مشروعي، يتم تحميل بوتستراب من أقرب سيرفر جغرافي إليه (مثل الدار البيضاء أو باريس). وإذا كان قد زار موقعاً آخر يستعمل نفس الـ CDN، فالملف يكون محفوظاً مسبقاً في كاش المتصفح ويفتح فورياً.",
    darijaExplanation: "الـ CDN هو شبكة ديال السيرفورات مفرقة في العالم كامل. عوض ما السيت يتيليشارجا من سيرفور واحد بعيد، المتصفح كيجيب ملفات بوتستراب من أقرب نقطة جغرافية، وغالباً كيكون ديجا مسجل في الكاش ديال المتصفح وكيتفتح السيت بالزربة.",
    trapToAvoidAr: "قد يسألك الأستاذ عن العيب: العيب هو أنه إذا انقطع الاتصال بالإنترنت فلن يتم تحميل ملفات الـ CDN بدون سيرفر محلي.",
    sampleOptionsAr: [
      "شبكة خوادم عالمية تسرع تحميل الملفات بفضل القرب الجغرافي والكاش المشترك",
      "لغة برمجة جديدة منافسة للجافاسكريبت",
      "نوع من قواعد البيانات العلاقية المشفرة",
      "أداة خاصة بترجمة كود لغة C++"
    ],
    correctOptionIndex: 0,
    questionFr: "Qu'est-ce qu'un CDN et quels sont ses avantages dans votre projet ?"
  },
  {
    id: 15,
    category: 'bootstrap_vs_css',
    questionAr: "كيف قمت بتخصيص مظهر الموقع دون المساس بملفات بوتستراب الأصلية؟",
    shortAnswerAr: "بإنشاء ملف CSS خارجي مستقل 'css/style.css' تم ربطه بعد ملف بوتستراب، واستخدام محددات دقيقة ومتغيرات CSS دون الإفراط في استعمال !important.",
    detailedAnswerAr: "ترتيب الاستدعاء في الـ <head> حاسم جداً: بوتستراب أولاً ثم ملفنا style.css. وبفضل قواعد التتالي والخصوصية في CSS، تقوم كلاساتنا المخصصة (.hero-section، .course-card:hover...) بتعديل وإثراء المظهر بأمان.",
    darijaExplanation: "صاوبنا فيشي مستقل سميتو 'css/style.css' وحطيناه في الرابط مور بوتستراب. هكا القواعد لي كتبنا كتزيد وتكمل بوتستراب بلا ما نقيسو الكود الأصلي. درنا فيه تدرج الألوان الخاص والتأثيرات ديال الرفع فاش تدوز لافوري على الكارت.",
    trapToAvoidAr: "إياك أن تقول إنك عدلت داخل ملف bootstrap.min.css الأصلي، فهذه ممارسة خاطئة جداً برمجياً.",
    sampleOptionsAr: [
      "بإنشاء ملف style.css خارجي مستدعى بعد بوتستراب لتخصيص القواعد بأناقة وتدرج",
      "بالتعديل المباشر داخل ملف bootstrap.min.css الأصلي على الـ CDN",
      "بكتابة كل أكواد التنسيق داخل style='...' في كل عنصر HTML",
      "بتعطيل ذاكرة التخزين المؤقت في حاسوب الأستاذ"
    ],
    correctOptionIndex: 0,
    questionFr: "Comment avez-vous personnalisé le style de SkillUp Academy sans altérer Bootstrap ?"
  },
  {
    id: 16,
    category: 'forms',
    questionAr: "ما هو الفرق بين كلاس .form-control وحقل <input> العادي في HTML؟",
    shortAnswerAr: "كلاس .form-control يمنح الحقل عرضاً بنسبة 100%، وهوامش داخلية مريحة، وحوافاً دائرية ناعمة، وإضاءة تركيز زرقاء واضحة عند النقر تضمن سهولة الوصول.",
    detailedAnswerAr: "حقل input العادي بدون كلاس يظهر صغيراً ومربعاً ويختلف شكله من ويندوز إلى ماك وموبايل. أما .form-control فيوحد مظهره عبر جميع المتصفحات ويجعله عصرياً ومتناسقاً.",
    darijaExplanation: "الحقل العادي ديال HTML كيطلع مربع وصغير ومختلف من متصفح لمتصفح. ملي كتعطيه كلاس '.form-control' كياخد 100% من العرض المناسب، وكيولي عندو إطار أنيق وحواف مدورة وإضاءة زوينة فاش تكليكي فيه.",
    trapToAvoidAr: "لا تظن أن .form-control مجرد شكل جمالي فقط، بل يضمن التوافق وسهولة التركيز والتجاوب في العرض.",
    sampleOptionsAr: [
      "يوحد مظهر الحقل بعرض 100% وهوامش مريحة وهالة تركيز بصرية عند النقر",
      "يقوم بتشفير الحروف المدخلة حتى لا تظهر على الشاشة",
      "يجبر المستخدم على كتابة الحروف الكبيرة فقط (Majuscules)",
      "يمنع المستخدم من كتابة الأرقام داخل الحقل"
    ],
    correctOptionIndex: 0,
    questionFr: "Quelle est la différence entre .form-control et un champ <input> HTML ordinaire ?"
  },
  {
    id: 17,
    category: 'grid',
    questionAr: "ماذا يعني الكلاس 'g-4' المكتوب على عنصر .row؟",
    shortAnswerAr: "'g-4' يحدد المسافة العازلة (Gutter) أفقياً وعمودياً بين الأعمدة الداخلية، وتساوي هنا 1.5rem أي ما يعادل 24 بيكسل.",
    detailedAnswerAr: "في بوتستراب 5، الحرف 'g' يتحكم في gx (المسافة الأفقية) و gy (المسافة العمودية) معاً على سلم من 0 إلى 5. وهذا يمنع التصاق البطاقات ببعضها البعض عندما تنزل تحت بعضها.",
    darijaExplanation: "الحرف 'g' جاي من كلمة Gutter يعني المجرى أو الفراغ العازل. 'g-4' كتعني خلي مسافة نقية ديال 24 بيكسل بين الأعمدة والكروت أفقياً وعمودياً باش مايتلاصقوش ويجيو مريحين في الشوفة.",
    trapToAvoidAr: "لا تخلط بين g-4 و gap-4؛ فالأول مخصص لنظام شبكة بوتستراب .row، بينما gap-4 مخصص لـ Flexbox و Grid القياسي.",
    sampleOptionsAr: [
      "يحدد المسافة العازلة الأفقية والعمودية بقيمة 1.5rem (24px) بين أعمدة السطر",
      "يقسم السطر إجبارياً إلى 4 مجموعات من الأعمدة",
      "يضيف إطاراً رمادياً بسُمك 4 بيكسل حول السطر",
      "يدل على أن هذا القسم تم تصميمه في 4 ساعات"
    ],
    correctOptionIndex: 0,
    questionFr: "Que signifie la classe 'g-4' sur un élément .row ?"
  },
  {
    id: 18,
    category: 'javascript',
    questionAr: "كيف تعرف النافذة المنبثقة (Modal) أي دورة تدريبية اختارها المستخدم للتسجيل؟",
    shortAnswerAr: "كل زر يحمل خاصية data-course='اسم الدورة'. وفي الجافاسكريبت أقرأ هذه القيمة عند النقر وأحقنها في عنوان وحقل النافذة قبل فتحها.",
    detailedAnswerAr: "هذا هو الدمج بين خاصية HTML5 (Data Attribute) وكود JS: modalTitle.textContent = btn.getAttribute('data-course'). وهذا يتيح نافذة واحدة ذكية وقابلة لإعادة الاستخدام لجميع الدورات بدلاً من إنشاء نافذة لكل دورة.",
    darijaExplanation: "كل بوطون ديال تسجيل درنا فيه خاصية سميتها data-course فيها سمية الدورة. ملي كيكليكي عليها بنادم، الجافاسكريبت كيهز ديك السمية ويحطها في العنوان ديال النافذة المنبثقة (Modal). هكا عندنا نافذة وحدة خدامة لجميع الدورات بلا تكرار الكود.",
    trapToAvoidAr: "لا تنشئ 6 نوافذ منبثقة مختلفة لـ 6 دورات، بل وضح للأستاذ أنك طبقت مبدأ DRY (Don't Repeat Yourself) بنافذة واحدة ديناميكية.",
    sampleOptionsAr: [
      "بقراءة خاصية data-course من الزر المنقور وحقنها ديناميكياً داخل نص وحقل النافذة بالـ JS",
      "عبر ملفات تعريف الارتباط (Cookies) المخزنة في القرص الصلب",
      "بإنشاء 20 نافذة منبثقة مخفية داخل ملف HTML",
      "عبر التعرف الصوتي التلقائي لمتصفح المستخدم"
    ],
    correctOptionIndex: 0,
    questionFr: "Comment la boîte modale Bootstrap sait-elle quel cours l'utilisateur a sélectionné ?"
  },
  {
    id: 19,
    category: 'bootstrap_vs_css',
    questionAr: "ما هو الفرق بين كلاس '.d-none' وكلاس '.invisible' في بوتستراب؟",
    shortAnswerAr: "كلاس '.d-none' يطبق 'display: none' فيحذف العنصر تماماً من مساحة وتدفق الصفحة، بينما '.invisible' يطبق 'visibility: hidden' فيخفي العنصر مع حجز مكانه فارغاً.",
    detailedAnswerAr: "في تصفية الدورات نستعمل .d-none لكي لا تترك البطاقات المخفية فراغات بيضاء مشوهة في الشبكة، فتتراصف البطاقات المتبقية بسلاسة. أما .invisible فتحجز المساحة الأصلية كاملة.",
    darijaExplanation: "الكلاس '.d-none' كيمسح العنصر من الشاشة كلياً بحال يلا عمرو كان، والكروت لاخرين كيعمرو بلاصتو. أما '.invisible' فكتغبر العنصر ولكن كتخلي بلاصتو خاوية بحال شي ثقبة بيضاء في الصفحة.",
    trapToAvoidAr: "استعمال .invisible في تصفية عناصر الشبكة خطأ لأنه يخلق ثقوباً وفراغات بيضاء عملاقة في الكتالوج.",
    sampleOptionsAr: [
      ".d-none يحذف العنصر ومساحته من الصفحة، بينما .invisible يخفيه مع بقاء مكانه محجوزاً",
      ".d-none مخصص للنصوص فقط، بينما .invisible مخصص للصور فقط",
      ".d-none يشتغل في CSS فقط بينما .invisible يتطلب جافاسكريبت إجبارياً",
      "لا يوجد أي فرق بينهما وهما كلمتان مترادفتان تماماً"
    ],
    correctOptionIndex: 0,
    questionFr: "Quelle est la différence entre les classes '.d-none' et '.invisible' en Bootstrap ?"
  },
  {
    id: 20,
    category: 'best_practices',
    questionAr: "لو أردت تقديم هذا المشروع لجهة توظيف أو الاستمرار في تطويره، ما هي خطواتك القادمة؟",
    shortAnswerAr: "ربط نموذج التسجيل بخلفية برمجية (PHP أو Node.js) وقاعدة بيانات MySQL لحفظ الطلبات، إضافة حسابات مستخدمين مع تسجيل الدخول، وفحص الأداء عبر Google Lighthouse.",
    detailedAnswerAr: "تقنياً: تحويل الواجهة لتطبيق React متكامل الصفحة (SPA)، ربط بوابة دفع إلكتروني محلية (CMI/Stripe)، وتحسين معايير سهولة الوصول لذوي الاحتياجات الخاصة (WCAG AA).",
    darijaExplanation: "التطويرات المستقبلية: نربطو الفورمولير مع قاعدة بيانات حقيقية (MySQL) باش الطلبات يتسجلو، ونديرو فضاء خاص بكل طالب فيه دوراتو، ونزيدو خلاص أونلاين بالبطاقة البنكية المغربية (CMI).",
    trapToAvoidAr: "لا تقل 'المشروع كامل 100% ولا ينقصه شيء'، فالمطور الممتاز يعرف دائماً مجالات التحسين والتطوير المستقبلي.",
    sampleOptionsAr: [
      "ربط خادم وقاعدة بيانات لحفظ التسجيلات، وإضافة تسجيل الدخول، وتحسين سهولة الوصول والأداء",
      "حذف كود بوتستراب والعودة إلى كود HTML لسنة 1995",
      "إيقاف المشروع نهائياً لأنه مكتمل ولا يقبل أي تطوير",
      "بيع المشروع فوراً في السوق دون أي فحص أو اختبار"
    ],
    correctOptionIndex: 0,
    questionFr: "Si vous deviez présenter ce projet à un recruteur ou continuer son développement, que feriez-vous ?"
  }
];
