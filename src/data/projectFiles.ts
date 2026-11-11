export interface ProjectFile {
  name: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

export const skillUpIndexHtml = `<!DOCTYPE html>
<html lang="fr" data-bs-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillUp Academy - Formations en Ligne & Certifications</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Bootstrap 5.3.3 CSS via CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- Bootstrap Icons CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">

  <!-- Feuille de style personnalisée -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- ================= BARRE DE NAVIGATION (NAVBAR) ================= -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
    <div class="container">
      <!-- Logo et Nom -->
      <a class="navbar-brand d-flex align-items-center gap-2 fw-bold" href="#">
        <i class="bi bi-mortarboard-fill text-primary fs-3"></i>
        <span>Skill<span class="text-primary">Up</span> Academy</span>
      </a>

      <!-- Bouton Hamburger pour Mobile (Breakpoints < lg) -->
      <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu déroulant / Liens -->
      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#hero">Accueil</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#courses">Formations</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#why-us">Pourquoi Nous</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#faq">FAQ</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Contact</a>
          </li>
          
          <!-- Bouton Bascule Thème Sombre / Clair -->
          <li class="nav-item ms-lg-2">
            <button id="themeToggleBtn" class="btn btn-outline-light btn-sm rounded-pill px-3 py-1 d-flex align-items-center gap-1" title="Changer de thème">
              <i class="bi bi-moon-stars-fill" id="themeIcon"></i>
              <span class="d-lg-none ms-1">Mode Sombre</span>
            </button>
          </li>

          <!-- Bouton CTA principal -->
          <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
            <a href="#courses" class="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm">
              Explorer le Catalogue
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- ================= SECTION HERO ================= -->
  <header id="hero" class="hero-section text-white py-5 position-relative overflow-hidden">
    <div class="container py-lg-5">
      <div class="row align-items-center g-5">
        
        <!-- Texte de Présentation (7 colonnes sur grand écran) -->
        <div class="col-lg-7 text-center text-lg-start">
          <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-medium mb-3">
            <i class="bi bi-stars me-1"></i> Rentrée 2025 · Formations 100% Pratiques
          </span>
          <h1 class="display-4 fw-extrabold mb-3 lh-sm">
            Propulsez Votre Carrière dans le <span class="text-warning">Numérique</span>
          </h1>
          <p class="lead mb-4 text-light-emphasis opacity-90">
            SkillUp Academy vous propose des formations certifiantes en Web, Data, Design et Marketing, encadrées par des experts professionnels pour booster vos compétences.
          </p>
          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
            <a href="#courses" class="btn btn-warning btn-lg px-4 fw-bold shadow">
              <i class="bi bi-rocket-takeoff me-2"></i>Commencer Maintenant
            </a>
            <a href="#contact" class="btn btn-outline-light btn-lg px-4">
              <i class="bi bi-chat-dots me-2"></i>Demander un Conseil
            </a>
          </div>
        </div>

        <!-- Illustration / Carte Visuelle (5 colonnes sur grand écran) -->
        <div class="col-lg-5">
          <div class="card bg-white text-dark shadow-lg border-0 rounded-4 overflow-hidden hero-card">
            <div class="card-body p-4">
              <div class="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                <div class="bg-primary text-white p-3 rounded-circle">
                  <i class="bi bi-laptop fs-3"></i>
                </div>
                <div>
                  <h6 class="fw-bold mb-0">Apprentissage Interactif</h6>
                  <small class="text-muted">Projets réels & Mentorat personnalisé</small>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center p-3 bg-light rounded-3 mb-3">
                <span class="fw-semibold">Taux d'insertion professionnelle</span>
                <span class="badge bg-success fs-6 fw-bold">94%</span>
              </div>
              <div class="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                <span class="fw-semibold">Certifications reconnues</span>
                <span class="badge bg-primary fs-6 fw-bold">100% Vérifiées</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </header>

  <!-- ================= BANDE DE STATISTIQUES ================= -->
  <section class="py-4 bg-body-tertiary border-bottom">
    <div class="container">
      <div class="row text-center g-3">
        <div class="col-6 col-md-3">
          <h3 class="fw-bold text-primary mb-0">+3 500</h3>
          <p class="text-muted small mb-0">Étudiants formés</p>
        </div>
        <div class="col-6 col-md-3">
          <h3 class="fw-bold text-primary mb-0">28</h3>
          <p class="text-muted small mb-0">Formations disponibles</p>
        </div>
        <div class="col-6 col-md-3">
          <h3 class="fw-bold text-primary mb-0">98%</h3>
          <p class="text-muted small mb-0">Avis positifs</p>
        </div>
        <div class="col-6 col-md-3">
          <h3 class="fw-bold text-primary mb-0">12</h3>
          <p class="text-muted small mb-0">Mentors certifiés</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= SECTION POURQUOI NOUS (FEATURES) ================= -->
  <section id="why-us" class="py-5">
    <div class="container py-lg-4">
      <div class="text-center max-w-700 mx-auto mb-5">
        <span class="text-primary fw-bold text-uppercase small letter-spacing-1">Nos Avantages</span>
        <h2 class="fw-bold mt-1">Pourquoi Choisir SkillUp Academy ?</h2>
        <p class="text-muted">Une méthode d'apprentissage moderne pensée pour le marché du travail d'aujourd'hui.</p>
      </div>

      <div class="row g-4">
        <!-- Carte Avantage 1 -->
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm p-3 text-center feature-card rounded-4">
            <div class="card-body">
              <div class="feature-icon bg-primary-subtle text-primary mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-code-slash fs-2"></i>
              </div>
              <h5 class="fw-bold mb-2">Projets Concrets</h5>
              <p class="text-muted mb-0">
                Vous n'apprenez pas seulement la théorie : chaque cours aboutit à un projet complet à ajouter dans votre portfolio.
              </p>
            </div>
          </div>
        </div>

        <!-- Carte Avantage 2 -->
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm p-3 text-center feature-card rounded-4">
            <div class="card-body">
              <div class="feature-icon bg-success-subtle text-success mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-person-check-fill fs-2"></i>
              </div>
              <h5 class="fw-bold mb-2">Mentorat Individuel</h5>
              <p class="text-muted mb-0">
                Un coach expérimenté vous guide lors de sessions live hebdomadaires et corrige vos travaux pas à pas.
              </p>
            </div>
          </div>
        </div>

        <!-- Carte Avantage 3 -->
        <div class="col-md-4">
          <div class="card h-100 border-0 shadow-sm p-3 text-center feature-card rounded-4">
            <div class="card-body">
              <div class="feature-icon bg-warning-subtle text-warning mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-award-fill fs-2"></i>
              </div>
              <h5 class="fw-bold mb-2">Certificat de Réussite</h5>
              <p class="text-muted mb-0">
                Recevez une certification vérifiable sur LinkedIn valorisant vos nouvelles compétences techniques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= SECTION CATALOGUE DE COURS ================= -->
  <section id="courses" class="py-5 bg-body-tertiary">
    <div class="container py-lg-4">
      <div class="text-center mb-4">
        <span class="text-primary fw-bold text-uppercase small">Catalogue 2025</span>
        <h2 class="fw-bold mt-1">Nos Formations Phares</h2>
        <p class="text-muted">Sélectionnez votre domaine et découvrez nos cours intensifs.</p>
      </div>

      <!-- Filtres de Catégories & Barre de Recherche Dynamique (JavaScript) -->
      <div class="row g-3 justify-content-between align-items-center mb-4">
        <div class="col-lg-8">
          <div class="d-flex flex-wrap gap-2 filter-buttons" id="courseFilters">
            <button class="btn btn-primary active btn-sm rounded-pill px-3" data-filter="all">Tous</button>
            <button class="btn btn-outline-primary btn-sm rounded-pill px-3" data-filter="web">Développement Web</button>
            <button class="btn btn-outline-primary btn-sm rounded-pill px-3" data-filter="data">Data & IA</button>
            <button class="btn btn-outline-primary btn-sm rounded-pill px-3" data-filter="design">Design UI/UX</button>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="input-group">
            <span class="input-group-text bg-white border-end-0"><i class="bi bi-search text-muted"></i></span>
            <input type="text" id="courseSearchInput" class="form-control border-start-0" placeholder="Rechercher une formation...">
          </div>
        </div>
      </div>

      <!-- Grille des Cours (12 Colonnes : 1 col sur mobile, 2 sur tablette, 3 sur desktop) -->
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="coursesGrid">
        
        <!-- Cours 1 -->
        <div class="col course-item" data-category="web">
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden course-card">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" class="card-img-top course-img" alt="Développement Web Bootstrap 5" loading="lazy">
              <span class="badge bg-primary position-absolute top-0 start-0 m-3 shadow-sm">Web</span>
              <span class="badge bg-dark bg-opacity-75 position-absolute bottom-0 end-0 m-3"><i class="bi bi-clock me-1"></i>30h</span>
            </div>
            <div class="card-body d-flex flex-column p-4">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="small text-muted"><i class="bi bi-bar-chart-steps me-1"></i>Débutant</span>
                <span class="text-warning small fw-bold"><i class="bi bi-star-fill me-1"></i>4.9 (140 avis)</span>
              </div>
              <h5 class="card-title fw-bold text-dark">HTML5, CSS3 & Bootstrap 5 Complet</h5>
              <p class="card-text text-muted small flex-grow-1">
                Maîtrisez la création de sites web réactifs, la grille de 12 colonnes, les composants et le flexbox de Bootstrap.
              </p>
              <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-3">
                <span class="fs-5 fw-bold text-primary">Gratuit</span>
                <button class="btn btn-outline-primary btn-sm rounded-pill px-3 enroll-btn" data-course="HTML5, CSS3 & Bootstrap 5">
                  <i class="bi bi-person-plus me-1"></i>S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cours 2 -->
        <div class="col course-item" data-category="web">
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden course-card">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" class="card-img-top course-img" alt="JavaScript Moderne" loading="lazy">
              <span class="badge bg-primary position-absolute top-0 start-0 m-3 shadow-sm">Web</span>
              <span class="badge bg-dark bg-opacity-75 position-absolute bottom-0 end-0 m-3"><i class="bi bi-clock me-1"></i>45h</span>
            </div>
            <div class="card-body d-flex flex-column p-4">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="small text-muted"><i class="bi bi-bar-chart-steps me-1"></i>Intermédiaire</span>
                <span class="text-warning small fw-bold"><i class="bi bi-star-fill me-1"></i>4.8 (95 avis)</span>
              </div>
              <h5 class="card-title fw-bold text-dark">JavaScript ES6+ & Manipulation du DOM</h5>
              <p class="card-text text-muted small flex-grow-1">
                Rendez vos pages web dynamiques : événements, validation de formulaires, fetch API et animations interactives.
              </p>
              <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-3">
                <span class="fs-5 fw-bold text-primary">450 DH</span>
                <button class="btn btn-outline-primary btn-sm rounded-pill px-3 enroll-btn" data-course="JavaScript ES6+ & DOM">
                  <i class="bi bi-person-plus me-1"></i>S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cours 3 -->
        <div class="col course-item" data-category="data">
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden course-card">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" class="card-img-top course-img" alt="Python & Data Science" loading="lazy">
              <span class="badge bg-info text-dark position-absolute top-0 start-0 m-3 shadow-sm">Data & IA</span>
              <span class="badge bg-dark bg-opacity-75 position-absolute bottom-0 end-0 m-3"><i class="bi bi-clock me-1"></i>50h</span>
            </div>
            <div class="card-body d-flex flex-column p-4">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="small text-muted"><i class="bi bi-bar-chart-steps me-1"></i>Débutant</span>
                <span class="text-warning small fw-bold"><i class="bi bi-star-fill me-1"></i>4.9 (210 avis)</span>
              </div>
              <h5 class="card-title fw-bold text-dark">Python & Analyse de Données</h5>
              <p class="card-text text-muted small flex-grow-1">
                Découvrez Python, Pandas, Matplotlib et créez des visualisations percutantes pour guider les décisions business.
              </p>
              <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-3">
                <span class="fs-5 fw-bold text-primary">600 DH</span>
                <button class="btn btn-outline-primary btn-sm rounded-pill px-3 enroll-btn" data-course="Python & Analyse de Données">
                  <i class="bi bi-person-plus me-1"></i>S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cours 4 -->
        <div class="col course-item" data-category="design">
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden course-card">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80" class="card-img-top course-img" alt="UI UX Design avec Figma" loading="lazy">
              <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-3 shadow-sm">Design</span>
              <span class="badge bg-dark bg-opacity-75 position-absolute bottom-0 end-0 m-3"><i class="bi bi-clock me-1"></i>25h</span>
            </div>
            <div class="card-body d-flex flex-column p-4">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="small text-muted"><i class="bi bi-bar-chart-steps me-1"></i>Tous niveaux</span>
                <span class="text-warning small fw-bold"><i class="bi bi-star-fill me-1"></i>4.7 (80 avis)</span>
              </div>
              <h5 class="card-title fw-bold text-dark">UI/UX Design Moderne sur Figma</h5>
              <p class="card-text text-muted small flex-grow-1">
                Concevez des maquettes web et mobiles attrayantes, respectez les règles d'accessibilité et de hiérarchie visuelle.
              </p>
              <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-3">
                <span class="fs-5 fw-bold text-primary">350 DH</span>
                <button class="btn btn-outline-primary btn-sm rounded-pill px-3 enroll-btn" data-course="UI/UX Design Moderne sur Figma">
                  <i class="bi bi-person-plus me-1"></i>S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cours 5 -->
        <div class="col course-item" data-category="web">
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden course-card">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80" class="card-img-top course-img" alt="React JS" loading="lazy">
              <span class="badge bg-primary position-absolute top-0 start-0 m-3 shadow-sm">Web</span>
              <span class="badge bg-dark bg-opacity-75 position-absolute bottom-0 end-0 m-3"><i class="bi bi-clock me-1"></i>40h</span>
            </div>
            <div class="card-body d-flex flex-column p-4">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="small text-muted"><i class="bi bi-bar-chart-steps me-1"></i>Avancé</span>
                <span class="text-warning small fw-bold"><i class="bi bi-star-fill me-1"></i>4.9 (175 avis)</span>
              </div>
              <h5 class="card-title fw-bold text-dark">React JS & Applications SPA</h5>
              <p class="card-text text-muted small flex-grow-1">
                Passez au niveau supérieur : composants réutilisables, hooks (useState, useEffect), router et consommation d'APIs.
              </p>
              <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-3">
                <span class="fs-5 fw-bold text-primary">550 DH</span>
                <button class="btn btn-outline-primary btn-sm rounded-pill px-3 enroll-btn" data-course="React JS & Applications SPA">
                  <i class="bi bi-person-plus me-1"></i>S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cours 6 -->
        <div class="col course-item" data-category="data">
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden course-card">
            <div class="position-relative">
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80" class="card-img-top course-img" alt="Intelligence Artificielle" loading="lazy">
              <span class="badge bg-info text-dark position-absolute top-0 start-0 m-3 shadow-sm">Data & IA</span>
              <span class="badge bg-dark bg-opacity-75 position-absolute bottom-0 end-0 m-3"><i class="bi bi-clock me-1"></i>35h</span>
            </div>
            <div class="card-body d-flex flex-column p-4">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="small text-muted"><i class="bi bi-bar-chart-steps me-1"></i>Intermédiaire</span>
                <span class="text-warning small fw-bold"><i class="bi bi-star-fill me-1"></i>4.9 (110 avis)</span>
              </div>
              <h5 class="card-title fw-bold text-dark">Initiation à l'IA Générative & Prompts</h5>
              <p class="card-text text-muted small flex-grow-1">
                Comprenez les modèles de langage (LLM), maîtrisez l'art du prompting pour le code et automatisez vos flux de travail.
              </p>
              <div class="d-flex justify-content-between align-items-center pt-3 border-top mt-3">
                <span class="fs-5 fw-bold text-primary">500 DH</span>
                <button class="btn btn-outline-primary btn-sm rounded-pill px-3 enroll-btn" data-course="Initiation à l'IA Générative">
                  <i class="bi bi-person-plus me-1"></i>S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Message si aucun résultat de recherche -->
      <div id="noCoursesFound" class="text-center py-5 d-none">
        <i class="bi bi-search text-muted fs-1 mb-2 d-block"></i>
        <h5 class="fw-bold">Aucune formation trouvée</h5>
        <p class="text-muted small">Essayez avec d'autres mots-clés ou réinitialisez les filtres.</p>
      </div>

    </div>
  </section>

  <!-- ================= SECTION FAQ (ACCORDION BOOTSTRAP) ================= -->
  <section id="faq" class="py-5">
    <div class="container py-lg-4">
      <div class="text-center mb-5">
        <span class="text-primary fw-bold text-uppercase small">Questions Fréquentes</span>
        <h2 class="fw-bold mt-1">Tout ce que vous devez savoir</h2>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="accordion shadow-sm rounded-4 overflow-hidden" id="accordionFAQ">
            
            <!-- Question 1 -->
            <div class="accordion-item border-0 border-bottom">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <i class="bi bi-question-circle-fill text-primary me-2"></i> Les cours sont-ils adaptés aux débutants ?
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionFAQ">
                <div class="accordion-body text-muted">
                  Oui, absolument ! La majorité de nos formations, en particulier <strong>HTML5, CSS3 & Bootstrap 5</strong>, commence de zéro sans aucun prérequis en programmation.
                </div>
              </div>
            </div>

            <!-- Question 2 -->
            <div class="accordion-item border-0 border-bottom">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <i class="bi bi-award-fill text-primary me-2"></i> Vais-je recevoir une attestation après la formation ?
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionFAQ">
                <div class="accordion-body text-muted">
                  Oui. Dès que vous complétez 100% des modules et réalisez le mini-projet final, un certificat nominatif téléchargeable au format PDF vous est automatiquement délivré.
                </div>
              </div>
            </div>

            <!-- Question 3 -->
            <div class="accordion-item border-0">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  <i class="bi bi-cash-stack text-primary me-2"></i> Quels sont les modes de paiement acceptés au Maroc ?
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionFAQ">
                <div class="accordion-body text-muted">
                  Nous acceptons le paiement par carte bancaire marocaine (CMI), virement bancaire et paiement en espèces via nos agences partenaires (Wafacash, Cash Plus).
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ================= SECTION CONTACT & INSCRIPTION (FORMULAIRE) ================= -->
  <section id="contact" class="py-5 bg-body-tertiary">
    <div class="container py-lg-4">
      <div class="row g-5 align-items-center">
        
        <div class="col-lg-5">
          <span class="text-primary fw-bold text-uppercase small">Contactez-nous</span>
          <h2 class="fw-bold mt-1 mb-3">Besoin d'une orientation ?</h2>
          <p class="text-muted mb-4">
            Remplissez ce formulaire et notre conseiller pédagogique vous appellera sous 24 heures pour vous aider à choisir la bonne formation.
          </p>

          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="bg-primary-subtle text-primary p-3 rounded-circle">
              <i class="bi bi-geo-alt-fill fs-5"></i>
            </div>
            <div>
              <h6 class="fw-bold mb-0">Adresse</h6>
              <small class="text-muted">Boulevard Zerktouni, Casablanca, Maroc</small>
            </div>
          </div>

          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="bg-primary-subtle text-primary p-3 rounded-circle">
              <i class="bi bi-telephone-fill fs-5"></i>
            </div>
            <div>
              <h6 class="fw-bold mb-0">Téléphone</h6>
              <small class="text-muted">+212 5 22 00 11 22</small>
            </div>
          </div>

          <div class="d-flex align-items-center gap-3">
            <div class="bg-primary-subtle text-primary p-3 rounded-circle">
              <i class="bi bi-envelope-fill fs-5"></i>
            </div>
            <div>
              <h6 class="fw-bold mb-0">Email</h6>
              <small class="text-muted">contact@skillup-academy.ma</small>
            </div>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white text-dark">
            <h4 class="fw-bold mb-3">Formulaire d'inscription rapide</h4>
            
            <!-- Formulaire avec validation Bootstrap (needs-validation) -->
            <form id="contactForm" class="needs-validation" novalidate>
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="fullName" class="form-label small fw-semibold">Nom complet *</label>
                  <input type="text" class="form-control" id="fullName" placeholder="Ex: Mohamed Alami" required>
                  <div class="invalid-feedback">Veuillez renseigner votre nom complet.</div>
                </div>

                <div class="col-md-6">
                  <label for="email" class="form-label small fw-semibold">Adresse Email *</label>
                  <input type="email" class="form-control" id="email" placeholder="nom@exemple.com" required>
                  <div class="invalid-feedback">Veuillez entrer une adresse email valide.</div>
                </div>

                <div class="col-md-6">
                  <label for="phone" class="form-label small fw-semibold">Téléphone (WhatsApp)</label>
                  <input type="tel" class="form-control" id="phone" placeholder="06 12 34 56 78">
                </div>

                <div class="col-md-6">
                  <label for="courseSelect" class="form-label small fw-semibold">Formation souhaitée *</label>
                  <select class="form-select" id="courseSelect" required>
                    <option value="" selected disabled>Choisir un cours...</option>
                    <option value="bootstrap">HTML5, CSS3 & Bootstrap 5</option>
                    <option value="js">JavaScript ES6+ & DOM</option>
                    <option value="python">Python & Analyse de Données</option>
                    <option value="figma">UI/UX Design sur Figma</option>
                    <option value="react">React JS & SPA</option>
                  </select>
                  <div class="invalid-feedback">Veuillez sélectionner une formation.</div>
                </div>

                <div class="col-12">
                  <label for="message" class="form-label small fw-semibold">Message ou questions</label>
                  <textarea class="form-control" id="message" rows="3" placeholder="Parlez-nous de vos objectifs..."></textarea>
                </div>

                <div class="col-12">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="termsCheck" required>
                    <label class="form-check-label small text-muted" for="termsCheck">
                      J'accepte d'être recontacté(e) au sujet de ma candidature.
                    </label>
                    <div class="invalid-feedback">Vous devez accepter avant d'envoyer.</div>
                  </div>
                </div>

                <div class="col-12 mt-4">
                  <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold rounded-pill shadow-sm">
                    <i class="bi bi-send-fill me-2"></i>Envoyer ma demande
                  </button>
                </div>
              </div>
            </form>
            
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= PIED DE PAGE (FOOTER) ================= -->
  <footer class="bg-dark text-white pt-5 pb-4 border-top border-secondary">
    <div class="container">
      <div class="row g-4 mb-4">
        
        <div class="col-lg-4 col-md-6">
          <div class="d-flex align-items-center gap-2 fw-bold fs-4 mb-3">
            <i class="bi bi-mortarboard-fill text-primary"></i>
            <span>Skill<span class="text-primary">Up</span> Academy</span>
          </div>
          <p class="text-white-50 small pe-lg-4">
            Plateforme éducative d'excellence créée pour initier les étudiants et professionnels aux technologies du web moderne avec Bootstrap 5.
          </p>
          <div class="d-flex gap-2">
            <a href="#" class="btn btn-outline-secondary btn-sm rounded-circle social-icon"><i class="bi bi-facebook"></i></a>
            <a href="#" class="btn btn-outline-secondary btn-sm rounded-circle social-icon"><i class="bi bi-linkedin"></i></a>
            <a href="#" class="btn btn-outline-secondary btn-sm rounded-circle social-icon"><i class="bi bi-instagram"></i></a>
            <a href="#" class="btn btn-outline-secondary btn-sm rounded-circle social-icon"><i class="bi bi-github"></i></a>
          </div>
        </div>

        <div class="col-lg-2 col-md-6">
          <h6 class="fw-bold text-white mb-3">Navigation</h6>
          <ul class="list-unstyled text-white-50 small mb-0 d-flex flex-column gap-2">
            <li><a href="#hero" class="text-reset text-decoration-none hover-primary">Accueil</a></li>
            <li><a href="#courses" class="text-reset text-decoration-none hover-primary">Formations</a></li>
            <li><a href="#why-us" class="text-reset text-decoration-none hover-primary">Pourquoi nous</a></li>
            <li><a href="#faq" class="text-reset text-decoration-none hover-primary">FAQ</a></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6">
          <h6 class="fw-bold text-white mb-3">Filières Populaires</h6>
          <ul class="list-unstyled text-white-50 small mb-0 d-flex flex-column gap-2">
            <li><a href="#courses" class="text-reset text-decoration-none hover-primary">HTML & Bootstrap 5</a></li>
            <li><a href="#courses" class="text-reset text-decoration-none hover-primary">JavaScript Avancé</a></li>
            <li><a href="#courses" class="text-reset text-decoration-none hover-primary">Data Science Python</a></li>
            <li><a href="#courses" class="text-reset text-decoration-none hover-primary">Design Figma</a></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6">
          <h6 class="fw-bold text-white mb-3">Newsletter</h6>
          <p class="text-white-50 small">Recevez nos tutoriels gratuits chaque semaine.</p>
          <div class="input-group">
            <input type="email" class="form-control form-control-sm" placeholder="Votre email">
            <button class="btn btn-primary btn-sm" type="button"><i class="bi bi-arrow-right"></i></button>
          </div>
        </div>

      </div>

      <hr class="border-secondary my-4">

      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center small text-white-50">
        <p class="mb-2 mb-md-0">© 2025 SkillUp Academy · Projet Scolaire d'Initiation à Bootstrap 5.</p>
        <p class="mb-0">Développé avec <i class="bi bi-heart-fill text-danger"></i> & Bootstrap 5.3.3</p>
      </div>
    </div>
  </footer>

  <!-- ================= MODAL D'INSCRIPTION RAPIDE ================= -->
  <div class="modal fade" id="enrollModal" tabindex="-1" aria-labelledby="enrollModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded-4 border-0 shadow">
        <div class="modal-header border-bottom-0 pb-0">
          <h5 class="modal-title fw-bold" id="enrollModalLabel">Inscription Immédiate</h5>
          <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Fermer"></button>
        </div>
        <div class="modal-body p-4">
          <div class="alert alert-primary d-flex align-items-center gap-2 mb-3 py-2 small" role="alert">
            <i class="bi bi-info-circle-fill"></i>
            <div>Cours sélectionné : <strong id="modalCourseTitle">Formation</strong></div>
          </div>
          <div class="mb-3">
            <label class="form-label small fw-semibold">Votre Nom & Prénom</label>
            <input type="text" id="modalStudentName" class="form-control" placeholder="Mohamed Alami">
          </div>
          <div class="mb-3">
            <label class="form-label small fw-semibold">Votre Email</label>
            <input type="email" id="modalStudentEmail" class="form-control" placeholder="exemple@mail.com">
          </div>
        </div>
        <div class="modal-footer border-top-0 pt-0">
          <button type="button" class="btn btn-light rounded-pill px-3" data-bs-dismiss="modal">Annuler</button>
          <button type="button" id="confirmEnrollBtn" class="btn btn-primary rounded-pill px-4 fw-semibold">Confirmer</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ================= TOAST DE CONFIRMATION (NOTIFICATION) ================= -->
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="liveToast" class="toast align-items-center text-bg-success border-0 shadow-lg rounded-3" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi bi-check-circle-fill fs-5"></i>
          <div>
            <strong>Félicitations !</strong> Votre inscription a été enregistrée avec succès.
          </div>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto shadow-none" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>

  <!-- Bootstrap 5.3.3 JS Bundle (inclut Popper.js indispensable pour Dropdowns, Modals, Tooltips) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <!-- Script JavaScript personnalisé -->
  <script src="js/script.js"></script>
</body>
</html>`;

export const skillUpStyleCss = `/* ==========================================================
   SkillUp Academy - Feuille de style personnalisée (CSS3)
   Complète et surcharge Bootstrap 5 sans casser sa grille
   ========================================================== */

/* Variables CSS personnalisées pour la cohérence de la marque */
:root {
  --skillup-primary: #0d6efd;
  --skillup-primary-dark: #0a58ca;
  --skillup-warning: #ffc107;
  --skillup-dark: #1e293b;
  --skillup-transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Défilement fluide lors du clic sur les ancres (#courses, #contact...) */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  overflow-x: hidden;
}

/* ================= HERO SECTION ================= */
.hero-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1e40af 100%);
  min-height: 520px;
}

.hero-card {
  transition: var(--skillup-transition);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.hero-card:hover {
  transform: translateY(-4px);
}

/* ================= CARTES DE COURS ================= */
.course-card {
  transition: var(--skillup-transition);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

.course-img {
  height: 200px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.course-card:hover .course-img {
  transform: scale(1.04);
}

/* ================= CARTES D'AVANTAGES (FEATURES) ================= */
.feature-card {
  transition: var(--skillup-transition);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(13, 110, 253, 0.08) !important;
}

.feature-icon {
  width: 70px;
  height: 70px;
}

/* ================= COMPOSANTS & LIENS ================= */
.hover-primary:hover {
  color: var(--skillup-primary) !important;
  padding-left: 4px;
  transition: var(--skillup-transition);
}

.social-icon {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: var(--skillup-transition);
}

.social-icon:hover {
  background-color: var(--skillup-primary);
  border-color: var(--skillup-primary);
  color: #fff;
  transform: scale(1.1);
}

/* Style de l'accordéon au survol */
.accordion-button:not(.collapsed) {
  background-color: rgba(13, 110, 253, 0.08);
  color: var(--skillup-primary);
  box-shadow: none;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(13, 110, 253, 0.25);
}

/* Boutons de filtres actifs */
.filter-buttons .btn.active {
  box-shadow: 0 4px 10px rgba(13, 110, 253, 0.25);
}

/* Personnalisation du scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}`;

export const skillUpScriptJs = `/**
 * SkillUp Academy - Script JavaScript (Interactions dynamiques)
 * 1. Filtrage des cours par catégorie
 * 2. Recherche en direct dans les titres de cours
 * 3. Validation moderne du formulaire avec feedback Bootstrap
 * 4. Gestion de la modale d'inscription rapide et Toast de confirmation
 * 5. Bascule du thème sombre / clair avec data-bs-theme de Bootstrap 5
 */

document.addEventListener('DOMContentLoaded', function () {
  console.log("SkillUp Academy initialisé avec succès !");

  // ================= 1. FILTRAGE PAR CATÉGORIE =================
  const filterButtons = document.querySelectorAll('#courseFilters button');
  const courseItems = document.querySelectorAll('#coursesGrid .course-item');
  const noCoursesFound = document.getElementById('noCoursesFound');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach(btn => {
        btn.classList.remove('active', 'btn-primary');
        btn.classList.add('btn-outline-primary');
      });

      // Activer le bouton cliqué
      this.classList.add('active', 'btn-primary');
      this.classList.remove('btn-outline-primary');

      const filterValue = this.getAttribute('data-filter');
      let visibleCount = 0;

      courseItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('d-none');
          visibleCount++;
        } else {
          item.classList.add('d-none');
        }
      });

      // Afficher message si aucun cours visible
      if (visibleCount === 0) {
        noCoursesFound.classList.remove('d-none');
      } else {
        noCoursesFound.classList.add('d-none');
      }
    });
  });

  // ================= 2. RECHERCHE EN DIRECT (LIVE SEARCH) =================
  const searchInput = document.getElementById('courseSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase().trim();
      let visibleCount = 0;

      courseItems.forEach(item => {
        const title = item.querySelector('.card-title').textContent.toLowerCase();
        const description = item.querySelector('.card-text').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          item.classList.remove('d-none');
          visibleCount++;
        } else {
          item.classList.add('d-none');
        }
      });

      if (visibleCount === 0) {
        noCoursesFound.classList.remove('d-none');
      } else {
        noCoursesFound.classList.add('d-none');
      }
    });
  }

  // ================= 3. VALIDATION DU FORMULAIRE DE CONTACT =================
  const contactForm = document.getElementById('contactForm');
  const toastElement = document.getElementById('liveToast');
  const liveToast = toastElement ? new bootstrap.Toast(toastElement) : null;

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      // Bloquer l'envoi par défaut pour vérifier les champs en JS
      if (!contactForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault(); // Empêcher rechargement de page pour la démo
        
        // Afficher notification Toast de succès
        if (liveToast) {
          liveToast.show();
        }

        // Réinitialiser le formulaire
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        return;
      }

      // Ajouter la classe Bootstrap 'was-validated' qui colore les champs en vert/rouge
      contactForm.classList.add('was-validated');
    }, false);
  }

  // ================= 4. MODALE D'INSCRIPTION RAPIDE =================
  const enrollButtons = document.querySelectorAll('.enroll-btn');
  const modalCourseTitle = document.getElementById('modalCourseTitle');
  const enrollModalElement = document.getElementById('enrollModal');
  const enrollModal = enrollModalElement ? new bootstrap.Modal(enrollModalElement) : null;
  const confirmEnrollBtn = document.getElementById('confirmEnrollBtn');

  enrollButtons.forEach(button => {
    button.addEventListener('click', function () {
      const courseName = this.getAttribute('data-course') || "Formation Numérique";
      if (modalCourseTitle) {
        modalCourseTitle.textContent = courseName;
      }
      if (enrollModal) {
        enrollModal.show();
      }
    });
  });

  if (confirmEnrollBtn && enrollModal) {
    confirmEnrollBtn.addEventListener('click', function () {
      enrollModal.hide();
      if (liveToast) {
        liveToast.show();
      }
    });
  }

  // ================= 5. BASCULE DU THÈME SOMBRE / CLAIR (BOOTSTRAP 5.3) =================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = document.documentElement.getAttribute('data-bs-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-bs-theme', newTheme);

      if (newTheme === 'dark') {
        themeIcon.classList.remove('bi-moon-stars-fill');
        themeIcon.classList.add('bi-sun-fill');
      } else {
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-stars-fill');
      }
    });
  }
});`;

export const projectFilesList: ProjectFile[] = [
  {
    name: 'index.html',
    path: '/index.html',
    language: 'html',
    description: 'Structure HTML5 sémantique avec Bootstrap 5.3.3 (Navbar, Hero, Grid 12 colonnes, Cards, Modals, Forms, Accordion, Footer).',
    content: skillUpIndexHtml
  },
  {
    name: 'style.css',
    path: '/css/style.css',
    language: 'css',
    description: 'CSS personnalisé : dégradé Hero, effets hover 3D sur les cartes, variables CSS (--skillup-*), animations douces.',
    content: skillUpStyleCss
  },
  {
    name: 'script.js',
    path: '/js/script.js',
    language: 'javascript',
    description: 'Logique JavaScript : filtres par catégorie, recherche en temps réel, validation Bootstrap (.was-validated), modale & Toast, thème sombre.',
    content: skillUpScriptJs
  }
];
