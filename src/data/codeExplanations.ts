export interface CodeConcept {
  id: string;
  category: 'layout' | 'components' | 'forms' | 'utilities' | 'architecture';
  name: string;
  bootstrapClass: string;
  whatItDoesFr: string;
  whyWeUsedItFr: string;
  howItWorksFr: string;
  simpleExampleFr: string;
  darijaExplanation: string;
  teacherKeyPoint: string;
  relatedLines?: string;
}

export const codeConceptsList: CodeConcept[] = [
  {
    id: 'container-vs-fluid',
    category: 'layout',
    name: 'Container و Container-fluid (الحاوية وتوسيط المحتوى)',
    bootstrapClass: '.container & .container-fluid',
    whatItDoesFr: "Le container est l'élément racine indispensable de Bootstrap. Il encadre le contenu avec des marges automatiques (centrage horizontal) et applique une largeur maximale fixe (max-width) qui change selon la taille de l'écran. À l'inverse, .container-fluid prend toujours 100% de la largeur.",
    whyWeUsedItFr: "Pour que le site ne s'étale pas de manière illisible sur les très grands écrans (écrans 27 pouces ou 4K). Il garantit un alignement propre et centré avec un padding interne de sécurité (gutter) à gauche et à droite.",
    howItWorksFr: "Bootstrap lui applique 'margin-left: auto; margin-right: auto;' ainsi qu'un padding horizontal de 12px ou 15px. Selon le breakpoint actif (sm: 540px, md: 720px, lg: 960px, xl: 1140px, xxl: 1320px), la propriété 'max-width' s'adapte.",
    simpleExampleFr: `<div class="container">
  <!-- محتوى منظم وموسط مع عرض محدد كيتغير على حساب الشاشة -->
</div>

<div class="container-fluid">
  <!-- كياخد 100% من عرض الشاشة كاملة من القنت للقنت -->
</div>`,
    darijaExplanation: "شوف أخويا/أختي، الـ Container هو الكادر اللي كيجمع محتوى السيت كامل في الوسط. إلى مادرتيش .container، الكتيبات والتصاور غادي يخرجو لاصقين في قنت الشاشة والمنظر يجي مشتت ومامقادش في الشاشات الكبار. الـ .container كيدير توسيط أوتوماتيكي ويعطي حد أقصى للعرض (max-width) على حساب حجم الشاشة. أما إلى بغيتي شي قسم يشد العرض كامل من القنت للقنت بحال البانر الفوقاني كنديرو .container-fluid.",
    teacherKeyPoint: "الأستاذ كيسول ديما: 'شنو هو الفرق الدقيق بين .container و .container-fluid؟' الجواب المباشر: .container عندو حد أقصى للعرض (max-width) كيتوسط في الشاشة، بينما .container-fluid كياخد 100% دايماً بدون توقف."
  },
  {
    id: 'grid-12-columns',
    category: 'layout',
    name: 'نظام الشبكة المقسمة على 12 عمود (12 Columns Grid)',
    bootstrapClass: '.row & .col-*',
    whatItDoesFr: "C'est le cœur absolu de Bootstrap 5. Il divise horizontalement l'espace disponible en 12 colonnes virtuelles équitables grâce à CSS Flexbox.",
    whyWeUsedItFr: "Pour structurer la page de manière mathématique et responsive sans écrire une seule ligne de CSS avec float ou flexbox personnalisé. Par exemple : 3 cartes de cours = 12 / 3 = 4 colonnes chacune (.col-4).",
    howItWorksFr: "La classe '.row' est un conteneur flex ('display: flex; flex-wrap: wrap;') avec des marges négatives pour compenser le padding des colonnes. Chaque '.col-*' reçoit un 'width' en pourcentage : col-6 = 50%, col-4 = 33.333%, col-12 = 100%. La somme des colonnes sur une même ligne doit idéalement faire 12.",
    simpleExampleFr: `<div class="row">
  <div class="col-md-4">العمود 1 (كياخد 4 من 12 = 33%)</div>
  <div class="col-md-4">العمود 2 (كياخد 4 من 12 = 33%)</div>
  <div class="col-md-4">العمود 3 (كياخد 4 من 12 = 33%)</div>
</div>`,
    darijaExplanation: "نظام التقسيم (Grid System) في بوتستراب مبني على الحساب ديال 12 عمود. علاش 12 بالضبط؟ حيت 12 كتقبل القسمة على بزاف ديال الأعداد بسهولة: تقدر تقسم السطر على 2 (col-6 و col-6)، ولا على 3 كروت (col-4 مضروبة في 3)، ولا على 4 كروت (col-3 مضروبة في 4). ديما خاص المجموع يكون 12 باش السطر يجي عامر ومقاد. وإلى فات 12، العنصر الزايد كيهبط أوتوماتيك للسطر اللي موراها بلا مايخسر الترتيب.",
    teacherKeyPoint: "القاعدة الذهبية التي لا يجب نسيانها: Container ثم Row ثم Col. لا تضع نصوصاً أبداً داخل row مباشرة دون وضعها داخل col!"
  },
  {
    id: 'responsive-breakpoints',
    category: 'layout',
    name: 'نقاط التجاوب والشاشات المختلفة (Breakpoints & Mobile First)',
    bootstrapClass: 'col-, col-sm-, col-md-, col-lg-, col-xl-, col-xxl-',
    whatItDoesFr: "Les breakpoints sont des points d'arrêt basés sur des Media Queries CSS (min-width). Ils permettent de modifier la disposition d'un élément selon la taille de l'écran (Mobile First).",
    whyWeUsedItFr: "Sur smartphone, un écran est trop étroit pour afficher 3 cartes côte à côte. Grâce aux breakpoints, une carte prend toute la largeur sur mobile (.col-12), se met en 2 colonnes sur tablette (.col-md-6), et en 3 colonnes sur PC (.col-lg-4).",
    howItWorksFr: "Bootstrap fonctionne en 'Mobile First'. Si on écrit 'col-12 col-md-6 col-lg-4' : par défaut (téléphone < 768px), la colonne fait 12/12 (100%). À partir de 768px (md), elle passe à 6/12 (50%). À partir de 992px (lg), elle passe à 4/12 (33.3%).",
    simpleExampleFr: `<div class="col-12 col-md-6 col-lg-4">
  <!-- 100% في الهاتف، 50% في الطابليت، 33% في البيسي -->
</div>`,
    darijaExplanation: "هاد التقنية كتسمى 'Mobile First' يعني التفكير في التصميم كيبدا من شاشة التيليفون الصغيرة هي الأولى. في التيليفون الشاشة مضيقة، إلى درنا 3 كروت في سطر واحد غادي يخرجو مكمشين ومامقروئينش. داكشي علاش كنقولو لبوتستراب: في التيليفون دير ليا كارت وحدة في كل سطر (col-12)، ملي نوصلو للطابليت دير 2 كروت في السطر (col-md-6)، وملي نكونو في البيسي دير 3 كروت (col-lg-4). هادشي كلو كيخدم متجاوب بلا ماتكتب حتى سطر ديال Media Queries في CSS!",
    teacherKeyPoint: "مقاسات الشاشات الست في بوتستراب 5: أصغر من 576px (xs)، ثم sm (أكبر من 576px)، ثم md (أكبر من 768px)، ثم lg (أكبر من 992px)، ثم xl (أكبر من 1200px)، وأخيراً xxl (أكبر من 1400px)."
  },
  {
    id: 'navbar-component',
    category: 'components',
    name: 'شريط التنقل المتجاوب (Responsive Navbar & Burger Menu)',
    bootstrapClass: '.navbar, .navbar-expand-lg, .navbar-toggler, .collapse',
    whatItDoesFr: "La Navbar est le menu supérieur interactif. Sur grand écran, les liens sont étalés horizontalement. Sur mobile, ils sont automatiquement masqués dans un panneau repliable accessible via le bouton 'hamburger' (.navbar-toggler).",
    whyWeUsedItFr: "Pour offrir une navigation standard, fluide et intuitive qui s'adapte immédiatement sans casser l'affichage sur smartphone.",
    howItWorksFr: "La classe '.navbar-expand-lg' indique à quel moment la navbar s'étale (à partir de 992px). En dessous, le menu se replie (.collapse). L'attribut 'data-bs-toggle=\"collapse\"' et 'data-bs-target=\"#mainNavbar\"' permet au fichier JS de Bootstrap d'ouvrir et fermer le menu au clic sans code custom.",
    simpleExampleFr: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">SkillUp</a>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#">الرئيسية</a></li>
      </ul>
    </div>
  </div>
</nav>`,
    darijaExplanation: "الـ Navbar في بوتستراب فيها ذكاء كبير: فاش كتكون في البيسي كتبان ليك قائمة عادية ومسرحة بجميع الروابط. ولكن غير كتحل السيت من التيليفون، دوك الروابط كيتخباو وكيطلع بلاصتهم بوطون صغير فيه 3 شريطات (كيتسمى Burger Menu). باش خدام؟ خدام بـ 'data-bs-toggle=\"collapse\"' لي كيعطي أمر للجافاسكريبت ديال بوتستراب باش يحل ويسد القائمة ملي اليوزر يكليكي على البوطون بلا مانحتاجو نبرمجوه يدوي.",
    teacherKeyPoint: "علاش ضروري نديرو bootstrap.bundle.min.js؟ حيت بلا بيه زر الهمبرغر ماغاديش يتحل نهائياً فاش تكليكي عليه في التيليفون!"
  },
  {
    id: 'cards-component',
    category: 'components',
    name: 'بطاقات الدورات والمحتوى (Cards & Equal Heights)',
    bootstrapClass: '.card, .card-img-top, .card-body, .card-title, .card-text',
    whatItDoesFr: "Le composant Card est un conteneur flexible et élégant doté d'une bordure subtile, d'un fond blanc et d'une structure modulaire pour afficher du contenu hétérogène (image, titre, description, prix, bouton).",
    whyWeUsedItFr: "Pour présenter les cours de manière uniforme dans le catalogue avec une hauteur identique (.h-100) et des boutons d'inscription parfaitement alignés en bas grâce à Flexbox (.mt-auto ou d-flex flex-column).",
    howItWorksFr: "Une carte standard se compose de : .card (conteneur), .card-img-top (image qui épouse les coins supérieurs arrondis), .card-body (zone de contenu avec padding interne de 16px), .card-title et .card-text.",
    simpleExampleFr: `<div class="card h-100 shadow-sm">
  <img src="course.jpg" class="card-img-top" alt="دورة">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">Bootstrap 5</h5>
    <p class="card-text flex-grow-1">وصف الدورة التدريبية...</p>
    <a href="#" class="btn btn-primary mt-auto">تسجيل الآن</a>
  </div>
</div>`,
    darijaExplanation: "الـ Card هي أحسن وأسهل طريقة باش تعرض دورات التكوين ولا المنتوجات. كتعطيك إطار نقي بحواف مدورة وضباب خفيف كيعطي فخامة. وزدنا ليها كلاس '.h-100' باش إلى كانت كارت فيها كتيبة طويلة وكارت فيها كتيبة قصيرة، يجيو بجوجهم في نفس العلو والارتفاع. ودرنا 'flex-column' مع '.mt-auto' في زر 'تسجيل' باش يجي ديما لاصق في التحت ومقاد مع باقي الكروت في نفس الخط.",
    teacherKeyPoint: "لتوحيد ارتفاع جميع الكروت في السطر الواحد: ندمج .h-100 على عنصر الكارت الأساسي و .flex-grow-1 على النص أو .mt-auto على الزر."
  },
  {
    id: 'buttons-badges',
    category: 'components',
    name: 'الأزرار والشارات الدلالية (Buttons & Semantic Badges)',
    bootstrapClass: '.btn, .btn-primary, .btn-outline-*, .badge, .rounded-pill',
    whatItDoesFr: "Bootstrap fournit des styles de boutons et de badges pré-conçus basés sur une palette de couleurs sémantique : primary (bleu), secondary (gris), success (vert), danger (rouge), warning (jaune), info (cyan), light et dark.",
    whyWeUsedItFr: "Pour donner un repère visuel clair aux utilisateurs (ex: vert pour un cours gratuit, jaune pour l'évaluation par étoiles, bleu pour l'action principale) avec des états interactifs (hover, focus, active).",
    howItWorksFr: "La classe '.btn' définit la structure de base (padding, font-size, cursor: pointer, border-radius). Les modificateurs comme '.btn-primary' ajoutent les couleurs d'arrière-plan. '.rounded-pill' donne la forme pilule (border-radius: 50rem).",
    simpleExampleFr: `<button class="btn btn-primary rounded-pill px-4">زر رئيسي أزرق</button>
<button class="btn btn-outline-primary btn-sm">زر ثانوي بإطار شفاف</button>
<span class="badge bg-success">دورة مجانية</span>`,
    darijaExplanation: "في بوتستراب، أي بوطون خاصو يبدا إجباري بالكلاس الأساسي '.btn'، ومن بعد كتختار اللون المناسب بحال '.btn-primary' (الأزرق الرسمي) ولا '.btn-outline-primary' (كيكون شفاف وفيه غير كادر، وكيتبدل لونو فاش كتحط لافوري عليه). والشارات بحال '.badge bg-primary' كنستعملوهم في التصنيفات بحال 'Web' ولا 'Data' باش يعطيو منظر عصري وساهل في القراءة.",
    teacherKeyPoint: "خطأ شائع عند المبتدئين: كتابة class='btn-primary' وحدها بدون كتابة .btn قبلها. الكلاس .btn هو المسؤول عن أبعاد الزر والمؤشر وتأثيرات الضغط."
  },
  {
    id: 'forms-validation',
    category: 'forms',
    name: 'النماذج والتأكد من صحة المدخلات (Forms & Validation)',
    bootstrapClass: '.form-control, .form-select, .form-check, .needs-validation, .invalid-feedback',
    whatItDoesFr: "Stylise les champs de saisie HTML avec des bordures douces, des ombres au focus (halo bleu) et gère l'affichage des messages d'erreur et de succès via la validation HTML5 et la classe '.was-validated'.",
    whyWeUsedItFr: "Pour le formulaire d'inscription et de contact afin que l'utilisateur sache immédiatement si son email est incorrect ou s'il a oublié de cocher la case sans recharger la page.",
    howItWorksFr: "En ajoutant 'class=\"needs-validation\" novalidate' sur le <form>, notre script JavaScript intercepte l'événement 'submit'. Si le formulaire est invalide (champs requis vides), JS ajoute la classe '.was-validated' sur la balise <form>, ce qui déclenche automatiquement le CSS de Bootstrap affichant les messages '.invalid-feedback' en rouge.",
    simpleExampleFr: `<form class="needs-validation" novalidate>
  <div class="mb-3">
    <label for="email" class="form-label">البريد الإلكتروني</label>
    <input type="email" class="form-control" id="email" required>
    <div class="invalid-feedback">عافاك دخل بريد إلكتروني صحيح.</div>
  </div>
  <button type="submit" class="btn btn-primary">إرسال الطلب</button>
</form>`,
    darijaExplanation: "الفورمولير العادي في HTML كيجي شكلو قديم ومربع. الكلاس '.form-control' كيعطيه منظر عصري بحواف مريحة وإضاءة زوينة فاش كتكليكي عليه. وزدنا الفاليديشن الذكية: فاش شي واحد كيكليكي على 'إرسال' وهو مازال ماعمرش السمية ولا الإيميل، الجافاسكريبت كيزيد كلاس '.was-validated'، وبوتستراب كيبين الحقول باللون الأحمر مع ميساج واضح كيشرح ليه شنو خاصو يعمر.",
    teacherKeyPoint: "كيف تعمل عملية التحقق؟ عبر خاصية HTML5 novalidate التي تمنع النوافذ المنبثقة الافتراضية للمتصفح، ثم كود JS الذي يفحص checkValidity() ويضيف كلاس .was-validated."
  },
  {
    id: 'spacing-utilities',
    category: 'utilities',
    name: 'أدوات ضبط المسافات والهوامش (Spacing Utilities: m-*, p-*, g-*)',
    bootstrapClass: 'm-*, p-*, mx-auto, my-*, py-5, g-4',
    whatItDoesFr: "Permet de gérer tous les espacements sans écrire de règles CSS. 'm' = margin (externe), 'p' = padding (interne). Les lettres : t (top), b (bottom), s (start/left), e (end/right), x (horizontal), y (vertical). Échelle de 0 à 5 (où 1 = 0.25rem, 3 = 1rem, 5 = 3rem).",
    whyWeUsedItFr: "Pour aérer harmonieusement les sections (py-5 pour espacer haut/bas), séparer les cartes dans la grille (g-4 pour le gutter/espace entre colonnes), et centrer des blocs (mx-auto).",
    howItWorksFr: "Bootstrap génère des classes utilitaires basées sur la variable $spacer (16px). Ainsi 'py-5' applique 'padding-top: 3rem; padding-bottom: 3rem;' (48px). 'g-4' applique un espacement horizontal et vertical entre les colonnes du row.",
    simpleExampleFr: `<section class="py-5 bg-light"> <!-- مسافة داخلية مريحة الفوق والتحت 48 بيكسل -->
  <div class="row g-4"> <!-- مسافة 24 بيكسل بين الأعمدة والكروت -->
    <div class="col-md-6 mb-3">...</div> <!-- هامش في الأسفل 16 بيكسل -->
  </div>
</section>`,
    darijaExplanation: "عوض ماتبقى كل مرة ترجع لملف CSS وتكتب margin-top و padding، بوتستراب كيعطيك اختصارات ساهلة: حرف 'm' كيعني الهامش الخارجي، و 'p' كيعني الهامش الداخلي. 'y' كتعني الفوق والتحت، و 'x' كتعني اليمين واليسار. مثلاً: 'py-5' كتعطي وساع مريح للأقسام الفوق والتحت (48 بيكسل)، و 'g-4' كيدير مسافة نقية بين الأعمدة والكروت باش مايتلاصقوش.",
    teacherKeyPoint: "في بوتستراب 5، تم استبدال l (left) و r (right) بحرفي s (start) و e (end) لدعم اللغات التي تُكتب من اليمين إلى اليسار (RTL مثل العربية) بشكل مثالي."
  },
  {
    id: 'flexbox-utilities',
    category: 'utilities',
    name: 'أدوات الفليكس وتوزيع العناصر (Flexbox Utilities)',
    bootstrapClass: 'd-flex, justify-content-between, align-items-center, gap-3',
    whatItDoesFr: "Applique instantanément les propriétés CSS Flexbox pour aligner, distribuer et ordonner les éléments enfants.",
    whyWeUsedItFr: "Indispensable pour centrer le logo avec son icône (align-items-center), espacer le prix et le bouton aux extrémités de la carte (justify-content-between), ou empiler verticalement les contenus (flex-column).",
    howItWorksFr: "'d-flex' active 'display: flex;'. 'justify-content-between' répartit le premier élément au début et le dernier à la fin. 'align-items-center' centre verticalement sur l'axe secondaire. 'gap-3' ajoute 1rem d'espace entre chaque enfant flex.",
    simpleExampleFr: `<div class="d-flex justify-content-between align-items-center p-3">
  <span>ثمن الدورة التكوينية</span>
  <span class="badge bg-primary">450 درهم</span>
</div>`,
    darijaExplanation: "فليكس بوكس (Flexbox) هو أقوى أداة لتنظيم وتوزيع العناصر في صفحة الويب. مثلاً: فاش كنديرو 'd-flex justify-content-between'، كيحط لينا الثمن في القنت والزر في القنت لاخر مباعدين ومقادين في نفس الخط. و 'align-items-center' كتجيب الأيقونة والنص متوازيين في الوسط عمودياً بلا تعقيد.",
    teacherKeyPoint: "لماذا نفضل Flexbox على Float القديم؟ لأن Float صُمم قديماً لالتفاف النصوص حول الصور، بينما Flexbox نظام حديث ذو بعد واحد مخصص لمحاذاة العناصر بدقة."
  },
  {
    id: 'how-they-work-together',
    category: 'architecture',
    name: 'تكامل اللغات الأربع (HTML5 + CSS3 + Bootstrap 5 + JavaScript)',
    bootstrapClass: 'Architecture globale',
    whatItDoesFr: "Explique l'articulation entre le squelette (HTML5), la bibliothèque de styles et grille (Bootstrap 5), les retouches d'identité visuelle (CSS3 personnalisé), et le dynamisme/logique métier (JavaScript).",
    whyWeUsedItFr: "C'est la question fondamentale que tout professeur pose en soutenance pour vérifier que l'étudiant ne s'est pas contenté de copier-coller des bouts de code sans comprendre qui fait quoi.",
    howItWorksFr: "1. HTML5 fournit la sémantique (<nav>, <header>, <section>, <article>, <footer>).\n2. Bootstrap 5 apporte 90% du design, du responsive et des composants pré-testés via CDN.\n3. style.css affine l'identité (gradients hero, effets d'élévation hover, variables de couleurs).\n4. script.js rend le site vivant (écouteurs d'événements pour le filtre de cours, la recherche en direct, la validation et l'affichage de Modales/Toasts).",
    simpleExampleFr: `<!-- HTML : البنية الأساسية -->
<button class="btn btn-primary" id="btnTest">كليكي هنا</button>

/* CSS : تحسين وتجميل إضافي */
#btnTest { transition: transform 0.2s ease; }
#btnTest:hover { transform: scale(1.05); }

// JS : التفاعل والحدث */
document.getElementById('btnTest').addEventListener('click', () => alert('مبروك!'));`,
    darijaExplanation: "كيفاش كيتعاونو هاد 4 د الحوايج؟ تخيل بحال يلا كتبني دار:\n- HTML5: هو الساس والياجور، كيعطي المعنى والمحتوى (العناوين، الفقرات، القوائم).\n- Bootstrap 5: هو الفينيسيون والهندسة المعمارية الجاهزة، كيقاد السيت على 12 عمود وكيخليه متناسق وسريع في كل الشاشات.\n- CSS مخصص (style.css): هو الصباغة والديكور الخاص بيك، فيه التدرجات ديال الألوان والتأثيرات 3D فاش كتحط لافوري على الكارت.\n- JavaScript: هو الضو والما، كيخلي السيت حي وتفاعلي (فاش كتكليكي على فلتر 'ويب' كيعزلو بوحدو، وفاش كتدير بحث كيصفي النتائج ديك الساع).",
    teacherKeyPoint: "سؤال كلاسيكي من الأستاذ: 'إلى حيدنا Bootstrap شنو يوقع للسيت؟' الجواب: المحتوى والنصوص غادي يبقاو حيت كاينين في HTML، ولكن التنسيق والألوان وتقسيم الأعمدة والشاشات غادي يضيع تماماً."
  }
];
