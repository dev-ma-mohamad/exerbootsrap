/**
 * ==========================================================================
 * Bootstrap 5 Interactive Academy - Main JavaScript Engine (Vanilla JS)
 * Enhanced with Supabase PostgreSQL & Auth Integration
 * ==========================================================================
 */

import {
  supabase,
  isSupabaseConfigured,
  signUpWithEmail,
  signInWithEmail,
  signOutUser,
  requestPasswordReset,
  updatePassword,
  fetchProfile,
  upsertProfile,
  fetchProgress,
  saveProgress,
  recordQuizResult,
} from '/src/lib/supabase.ts';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial State & LocalStorage Management
  const STATE = {
    theme: localStorage.getItem('bs_academy_theme') || 'light',
    completedLessons: JSON.parse(localStorage.getItem('bs_academy_completed') || '[]'),
    quizScore: parseInt(localStorage.getItem('bs_academy_quiz_score') || '0', 10),
    activeSection: 'dashboard',
    activeLessonId: 1,
    activeGridCols: 3, // 3 columns of col-4
    currentBreakpoint: 'lg',
    currentUser: null,
    userProfile: null,
    isSupabaseReady: isSupabaseConfigured,
  };

  // 2. Initialize Dark/Light Theme
  const htmlElem = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(theme) {
    STATE.theme = theme;
    htmlElem.setAttribute('data-bs-theme', theme);
    localStorage.setItem('bs_academy_theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill text-warning' : 'bi bi-moon-stars-fill text-primary';
    }
  }
  applyTheme(STATE.theme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      applyTheme(STATE.theme === 'dark' ? 'light' : 'dark');
    });
  }

  // 3. User Progress Calculator
  function updateProgressUI() {
    const totalLessons = 20;
    const completedCount = STATE.completedLessons.length;
    const percent = Math.round((completedCount / totalLessons) * 100);

    const progressBars = document.querySelectorAll('.user-progress-bar');
    progressBars.forEach(bar => {
      bar.style.width = `${percent}%`;
      bar.setAttribute('aria-valuenow', percent);
    });

    const progressTexts = document.querySelectorAll('.user-progress-text');
    progressTexts.forEach(el => {
      el.textContent = `${percent}% مكتمل (${completedCount}/${totalLessons} درس)`;
    });

    // Update node states in Roadmap
    document.querySelectorAll('.roadmap-node').forEach(node => {
      const id = parseInt(node.getAttribute('data-lesson-id'), 10);
      if (STATE.completedLessons.includes(id)) {
        node.classList.add('completed');
        const check = node.querySelector('.completion-icon');
        if (check) check.className = 'bi bi-check-circle-fill text-success fs-5 completion-icon';
      } else {
        node.classList.remove('completed');
        const check = node.querySelector('.completion-icon');
        if (check) check.className = 'bi bi-circle text-muted fs-5 completion-icon';
      }
    });

    // Update profile modal counters if present
    const profileLessons = document.getElementById('profile-lessons-count');
    if (profileLessons) profileLessons.textContent = `${completedCount} / ${totalLessons}`;
    const profileScore = document.getElementById('profile-quiz-score');
    if (profileScore) profileScore.textContent = `${STATE.quizScore}%`;
  }

  // ========================================================================
  // SUPABASE & AUTHENTICATION MANAGEMENT ENGINE
  // ========================================================================

  function showToast(message, type = 'primary') {
    const container = document.getElementById('app-toast-container');
    if (!container) return;
    const toastId = 'toast-' + Date.now();
    const icon = type === 'success' ? 'bi-check-circle-fill' : type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill';
    const html = `
      <div id="${toastId}" class="toast align-items-center text-bg-${type} border-0 show shadow-lg mb-2" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi ${icon} fs-5"></i>
            <span>${message}</span>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
    setTimeout(() => {
      const el = document.getElementById(toastId);
      if (el) el.remove();
    }, 4500);
  }

  function setAuthAlert(msg, type = 'danger') {
    const alertBox = document.getElementById('auth-alert-box');
    const alertText = document.getElementById('auth-alert-text');
    if (!alertBox || !alertText) return;
    if (!msg) {
      alertBox.classList.add('d-none');
      return;
    }
    alertBox.className = `alert alert-${type} alert-dismissible fade show rounded-3 small mb-3`;
    alertText.textContent = msg;
    alertBox.classList.remove('d-none');
  }

  function updateSupabaseStatusBadges() {
    const pill = document.getElementById('supabase-status-pill');
    const text = document.getElementById('supabase-status-text');
    const modalAlert = document.getElementById('supabase-modal-status-alert');
    const modalTitle = document.getElementById('supabase-modal-status-title');
    const modalDesc = document.getElementById('supabase-modal-status-desc');
    const statusVarUrl = document.getElementById('status-var-url');
    const statusVarKey = document.getElementById('status-var-key');

    if (isSupabaseConfigured) {
      if (pill) {
        pill.className = 'btn btn-sm rounded-pill d-none d-sm-flex align-items-center gap-1.5 px-3 py-1 btn-success text-white shadow-sm';
      }
      if (text) {
        text.innerHTML = '<i class="bi bi-cloud-check-fill me-1"></i> متصل بسحابة Supabase';
      }
      if (modalAlert) {
        modalAlert.className = 'p-3 rounded-4 mb-4 bg-success bg-opacity-10 border border-success-subtle';
      }
      if (modalTitle) modalTitle.textContent = 'الاتصال بقاعدة بيانات Supabase نشط ومفعل 100%';
      if (modalDesc) modalDesc.textContent = 'حسابات المستخدمين، التقدم الأكاديمي، نتائج الاختبارات، وسياسات RLS متزامنة لحظياً.';
      if (statusVarUrl) statusVarUrl.innerHTML = '<span class="badge bg-success">متصل ومفعل ✔</span>';
      if (statusVarKey) statusVarKey.innerHTML = '<span class="badge bg-success">مضبوط وصحيح ✔</span>';
    } else {
      if (pill) {
        pill.className = 'btn btn-sm rounded-pill d-none d-sm-flex align-items-center gap-1.5 px-3 py-1 btn-outline-warning text-warning-emphasis';
      }
      if (text) {
        text.innerHTML = '<i class="bi bi-cloud-slash me-1"></i> الوضع المحلي (Offline)';
      }
      if (modalAlert) {
        modalAlert.className = 'p-3 rounded-4 mb-4 bg-warning bg-opacity-10 border border-warning-subtle';
      }
      if (modalTitle) modalTitle.textContent = 'الموقع يعمل حالياً بالوضع المحلي التلقائي';
      if (modalDesc) modalDesc.textContent = 'لتفعيل المزامنة السحابية وقاعدة البيانات PostgreSQL الحقيقية، أضف مفاتيح Supabase في لوحة Vercel أو ملف .env.';
      if (statusVarUrl) statusVarUrl.innerHTML = '<span class="badge bg-warning text-dark">بانتظار الإعداد (Local Mode)</span>';
      if (statusVarKey) statusVarKey.innerHTML = '<span class="badge bg-warning text-dark">بانتظار الإعداد (Local Mode)</span>';
    }
  }

  function renderAuthUI() {
    const authControls = document.getElementById('auth-controls');
    if (!authControls) return;

    if (STATE.currentUser) {
      const displayName = STATE.userProfile?.full_name || STATE.currentUser.user_metadata?.full_name || STATE.currentUser.email.split('@')[0];
      const initial = (displayName || 'U')[0].toUpperCase();

      authControls.innerHTML = `
        <div class="dropdown">
          <button class="btn btn-outline-primary rounded-pill btn-sm px-3 d-flex align-items-center gap-2 dropdown-toggle shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 24px; height: 24px; font-size: 11px;">
              ${initial}
            </div>
            <span class="d-none d-md-inline fw-semibold">${escapeHtml(displayName)}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-lg rounded-4 p-2 border-0 animate__animated animate__fadeIn">
            <li class="px-3 py-2 border-bottom mb-1">
              <div class="fw-bold">${escapeHtml(displayName)}</div>
              <small class="text-muted text-truncate d-block" style="max-width: 180px;">${escapeHtml(STATE.currentUser.email)}</small>
            </li>
            <li>
              <a class="dropdown-item rounded-3 d-flex align-items-center gap-2 py-2" href="#" data-bs-toggle="modal" data-bs-target="#userProfileModal">
                <i class="bi bi-person-circle text-primary"></i>
                <span>الملف الشخصي والإحصائيات</span>
              </a>
            </li>
            <li>
              <a class="dropdown-item rounded-3 d-flex align-items-center gap-2 py-2" href="#" id="menu-btn-sync">
                <i class="bi bi-arrow-repeat text-success"></i>
                <span>مزامنة التقدم مع السحابة</span>
              </a>
            </li>
            <li>
              <a class="dropdown-item rounded-3 d-flex align-items-center gap-2 py-2" href="#" data-bs-toggle="modal" data-bs-target="#certificateModal">
                <i class="bi bi-award text-warning"></i>
                <span>عرض الشهادة</span>
              </a>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <a class="dropdown-item rounded-3 d-flex align-items-center gap-2 py-2 text-danger" href="#" id="menu-btn-logout">
                <i class="bi bi-box-arrow-right"></i>
                <span>تسجيل الخروج</span>
              </a>
            </li>
          </ul>
        </div>
      `;

      // Update User Profile Modal Contents
      const avatarDisplay = document.getElementById('profile-avatar-display');
      if (avatarDisplay) avatarDisplay.textContent = initial;
      const nameDisplay = document.getElementById('profile-name-display');
      if (nameDisplay) nameDisplay.textContent = displayName;
      const emailDisplay = document.getElementById('profile-email-display');
      if (emailDisplay) emailDisplay.textContent = STATE.currentUser.email;
      const inputName = document.getElementById('profile-input-name');
      if (inputName) inputName.value = displayName;
      const cloudStatus = document.getElementById('profile-cloud-status');
      if (cloudStatus) cloudStatus.textContent = isSupabaseConfigured ? 'متزامن مع Supabase' : 'الوضع المحلي';

      // Event listener for dropdown logout & sync
      const logoutBtn = document.getElementById('menu-btn-logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          handleLogout();
        });
      }
      const syncBtn = document.getElementById('menu-btn-sync');
      if (syncBtn) {
        syncBtn.addEventListener('click', (e) => {
          e.preventDefault();
          handleManualSync();
        });
      }
    } else {
      authControls.innerHTML = `
        <button class="btn btn-primary rounded-pill btn-sm px-3 d-flex align-items-center gap-1.5 shadow-sm" id="open-auth-modal-btn" data-bs-toggle="modal" data-bs-target="#authModal">
          <i class="bi bi-box-arrow-in-right"></i>
          <span>تسجيل الدخول</span>
        </button>
      `;
    }
  }

  async function handleLogout() {
    await signOutUser();
    STATE.currentUser = null;
    STATE.userProfile = null;
    renderAuthUI();
    updateProgressUI();
    
    // Close user profile modal if open
    const profileModalEl = document.getElementById('userProfileModal');
    if (profileModalEl) {
      const modal = bootstrap.Modal.getInstance(profileModalEl);
      if (modal) modal.hide();
    }

    showToast('تم تسجيل الخروج بنجاح. بياناتك محفوظة.', 'info');
  }

  async function handleManualSync() {
    if (!STATE.currentUser) {
      showToast('يرجى تسجيل الدخول أولاً للمزامنة السحابية.', 'warning');
      return;
    }
    const percent = Math.round((STATE.completedLessons.length / 20) * 100);
    const res = await saveProgress(STATE.currentUser.id, {
      completed_lessons: STATE.completedLessons,
      current_lesson_id: STATE.activeLessonId || 1,
      progress_percent: percent,
    });
    if (res.success) {
      showToast('تمت مزامنة تقدمك الأكاديمي بنجاح مع قاعدة البيانات!', 'success');
    } else {
      showToast('تعذرت المزامنة: تحقق من اتصال الإنترنت أو مفاتيح Supabase.', 'danger');
    }
  }

  async function initAuthSystem() {
    updateSupabaseStatusBadges();

    // Check for password recovery hash in URL (#access_token=...&type=recovery)
    const hash = window.location.hash || '';
    if (hash.includes('type=recovery')) {
      const resetTabItem = document.getElementById('tab-item-reset');
      const resetTabBtn = document.getElementById('tab-btn-reset');
      if (resetTabItem && resetTabBtn) {
        resetTabItem.classList.remove('d-none');
        const tab = new bootstrap.Tab(resetTabBtn);
        tab.show();
        const authModalEl = document.getElementById('authModal');
        if (authModalEl) {
          const modal = new bootstrap.Modal(authModalEl);
          modal.show();
        }
      }
    }

    // Get initial session
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        STATE.currentUser = session.user;
        const profile = await fetchProfile(session.user.id);
        if (profile) STATE.userProfile = profile;

        // Fetch remote progress and merge
        const remoteProgress = await fetchProgress(session.user.id);
        if (remoteProgress?.completed_lessons && remoteProgress.completed_lessons.length > 0) {
          const merged = Array.from(new Set([...STATE.completedLessons, ...remoteProgress.completed_lessons]));
          STATE.completedLessons = merged;
          localStorage.setItem('bs_academy_completed', JSON.stringify(merged));
        }
      }
    } catch (err) {
      console.warn('[Auth] getSession error:', err);
    }

    // Render Auth UI in Topbar
    renderAuthUI();
    updateProgressUI();

    // Listen to Supabase auth state changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        STATE.currentUser = session.user;
        const profile = await fetchProfile(session.user.id);
        if (profile) STATE.userProfile = profile;
        renderAuthUI();
        updateProgressUI();
      } else if (event === 'SIGNED_OUT') {
        STATE.currentUser = null;
        STATE.userProfile = null;
        renderAuthUI();
        updateProgressUI();
      } else if (event === 'PASSWORD_RECOVERY') {
        const resetTabItem = document.getElementById('tab-item-reset');
        const resetTabBtn = document.getElementById('tab-btn-reset');
        if (resetTabItem && resetTabBtn) {
          resetTabItem.classList.remove('d-none');
          const tab = new bootstrap.Tab(resetTabBtn);
          tab.show();
          const authModalEl = document.getElementById('authModal');
          if (authModalEl) {
            const modal = new bootstrap.Modal(authModalEl);
            modal.show();
          }
        }
      }
    });

    // Wire Login Form
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
      formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        setAuthAlert(null);
        const email = document.getElementById('login-email')?.value.trim();
        const password = document.getElementById('login-password')?.value;
        const spinner = document.getElementById('login-spinner');
        const submitBtn = document.getElementById('btn-login-submit');

        if (!email || !password) {
          setAuthAlert('يرجى ملء جميع الحقول المطلوبة.');
          return;
        }

        if (spinner) spinner.classList.remove('d-none');
        if (submitBtn) submitBtn.disabled = true;

        try {
          const { data, error } = await signInWithEmail(email, password);
          if (error) {
            let msg = error.message;
            if (msg.includes('Invalid login credentials')) {
              msg = 'بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور.';
            } else if (msg.includes('Email not confirmed')) {
              msg = 'يرجى تأكيد بريدك الإلكتروني أولاً عبر الرابط المرسل إليك.';
            }
            setAuthAlert(msg);
          } else if (data?.user) {
            STATE.currentUser = data.user;
            const profile = await fetchProfile(data.user.id);
            if (profile) STATE.userProfile = profile;

            // Load user progress
            const progress = await fetchProgress(data.user.id);
            if (progress?.completed_lessons) {
              STATE.completedLessons = Array.from(new Set([...STATE.completedLessons, ...progress.completed_lessons]));
              localStorage.setItem('bs_academy_completed', JSON.stringify(STATE.completedLessons));
            }

            renderAuthUI();
            updateProgressUI();

            const authModalEl = document.getElementById('authModal');
            if (authModalEl) {
              const modal = bootstrap.Modal.getInstance(authModalEl);
              if (modal) modal.hide();
            }

            const name = STATE.userProfile?.full_name || data.user.email.split('@')[0];
            showToast(`أهلاً بك مجدداً يا ${name}! تم تسجيل الدخول بنجاح.`, 'success');
          }
        } catch (err) {
          setAuthAlert('حدث خطأ غير متوقع أثناء تسجيل الدخول.');
        } finally {
          if (spinner) spinner.classList.add('d-none');
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }

    // Wire Register Form
    const formRegister = document.getElementById('form-register');
    if (formRegister) {
      formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        setAuthAlert(null);
        const fullName = document.getElementById('register-name')?.value.trim();
        const email = document.getElementById('register-email')?.value.trim();
        const password = document.getElementById('register-password')?.value;
        const confirmPassword = document.getElementById('register-confirm-password')?.value;
        const spinner = document.getElementById('register-spinner');
        const submitBtn = document.getElementById('btn-register-submit');

        if (!fullName || !email || !password || !confirmPassword) {
          setAuthAlert('يرجى ملء جميع الحقول المطلوبة.');
          return;
        }

        if (password.length < 6) {
          setAuthAlert('كلمة المرور يجب أن لا تقل عن 6 أحرف.');
          return;
        }

        if (password !== confirmPassword) {
          setAuthAlert('كلمة المرور وتأكيدها غير متطابقين.');
          return;
        }

        if (spinner) spinner.classList.remove('d-none');
        if (submitBtn) submitBtn.disabled = true;

        try {
          const { data, error } = await signUpWithEmail(email, password, fullName);
          if (error) {
            let msg = error.message;
            if (msg.includes('already registered')) {
              msg = 'هذا البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول.';
            }
            setAuthAlert(msg);
          } else {
            if (data?.session?.user) {
              STATE.currentUser = data.session.user;
              STATE.userProfile = { id: data.session.user.id, email, full_name: fullName };
              renderAuthUI();
              updateProgressUI();

              const authModalEl = document.getElementById('authModal');
              if (authModalEl) {
                const modal = bootstrap.Modal.getInstance(authModalEl);
                if (modal) modal.hide();
              }

              showToast(`تم إنشاء حسابك بنجاح! مرحباً بك يا ${fullName}.`, 'success');
            } else {
              setAuthAlert('تم إنشاء الحساب بنجاح! تم إرسال رابط تأكيد إلى بريدك الإلكتروني، يرجى الضغط عليه لتفعيل الحساب.', 'success');
            }
          }
        } catch (err) {
          setAuthAlert('حدث خطأ غير متوقع أثناء إنشاء الحساب.');
        } finally {
          if (spinner) spinner.classList.add('d-none');
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }

    // Wire Forgot Password Form
    const formForgot = document.getElementById('form-forgot');
    if (formForgot) {
      formForgot.addEventListener('submit', async (e) => {
        e.preventDefault();
        setAuthAlert(null);
        const email = document.getElementById('forgot-email')?.value.trim();
        const spinner = document.getElementById('forgot-spinner');
        const submitBtn = document.getElementById('btn-forgot-submit');

        if (!email) {
          setAuthAlert('يرجى إدخال البريد الإلكتروني.');
          return;
        }

        if (spinner) spinner.classList.remove('d-none');
        if (submitBtn) submitBtn.disabled = true;

        try {
          const { error } = await requestPasswordReset(email);
          if (error) {
            setAuthAlert(error.message);
          } else {
            setAuthAlert('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح! يرجى مراجعة صندوق الوارد.', 'success');
          }
        } catch (err) {
          setAuthAlert('حدث خطأ أثناء طلب استعادة كلمة المرور.');
        } finally {
          if (spinner) spinner.classList.add('d-none');
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }

    // Wire Reset Password Form
    const formReset = document.getElementById('form-reset');
    if (formReset) {
      formReset.addEventListener('submit', async (e) => {
        e.preventDefault();
        setAuthAlert(null);
        const newPassword = document.getElementById('reset-password')?.value;
        const confirmNewPassword = document.getElementById('reset-confirm-password')?.value;
        const spinner = document.getElementById('reset-spinner');
        const submitBtn = document.getElementById('btn-reset-submit');

        if (!newPassword || newPassword.length < 6) {
          setAuthAlert('كلمة المرور يجب أن لا تقل عن 6 أحرف.');
          return;
        }

        if (newPassword !== confirmNewPassword) {
          setAuthAlert('كلمتا المرور غير متطابقتين.');
          return;
        }

        if (spinner) spinner.classList.remove('d-none');
        if (submitBtn) submitBtn.disabled = true;

        try {
          const { error } = await updatePassword(newPassword);
          if (error) {
            setAuthAlert(error.message);
          } else {
            setAuthAlert('تم تغيير كلمة المرور بنجاح! يمكنك الآن تسجيل الدخول بها.', 'success');
            showToast('تم تحديث كلمة المرور بنجاح!', 'success');
            setTimeout(() => {
              const loginTabBtn = document.getElementById('tab-btn-login');
              if (loginTabBtn) {
                const tab = new bootstrap.Tab(loginTabBtn);
                tab.show();
              }
            }, 1500);
          }
        } catch (err) {
          setAuthAlert('حدث خطأ أثناء تحديث كلمة المرور.');
        } finally {
          if (spinner) spinner.classList.add('d-none');
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }

    // Forgot / Back to login button switches
    const btnShowForgot = document.getElementById('btn-show-forgot-pane');
    if (btnShowForgot) {
      btnShowForgot.addEventListener('click', () => {
        setAuthAlert(null);
        const paneLogin = document.getElementById('pane-login');
        const paneForgot = document.getElementById('pane-forgot');
        if (paneLogin && paneForgot) {
          paneLogin.classList.remove('show', 'active');
          paneForgot.classList.add('show', 'active');
        }
      });
    }

    const btnBackToLogin = document.getElementById('btn-back-to-login');
    if (btnBackToLogin) {
      btnBackToLogin.addEventListener('click', () => {
        setAuthAlert(null);
        const paneLogin = document.getElementById('pane-login');
        const paneForgot = document.getElementById('pane-forgot');
        if (paneLogin && paneForgot) {
          paneForgot.classList.remove('show', 'active');
          paneLogin.classList.add('show', 'active');
        }
      });
    }

    // Profile form: update name
    const formUpdateProfile = document.getElementById('form-update-profile');
    if (formUpdateProfile) {
      formUpdateProfile.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newName = document.getElementById('profile-input-name')?.value.trim();
        if (!newName || !STATE.currentUser) return;

        const updated = await upsertProfile({
          id: STATE.currentUser.id,
          email: STATE.currentUser.email,
          full_name: newName,
        });

        if (updated) {
          STATE.userProfile = updated;
        } else {
          STATE.userProfile = { ...STATE.userProfile, full_name: newName, id: STATE.currentUser.id, email: STATE.currentUser.email };
        }

        renderAuthUI();
        showToast('تم تحديث اسمك بنجاح!', 'success');
      });
    }

    // Profile modal logout button
    const btnProfileLogout = document.getElementById('btn-profile-logout');
    if (btnProfileLogout) {
      btnProfileLogout.addEventListener('click', () => {
        handleLogout();
      });
    }

    // Profile modal manual sync
    const btnSyncManual = document.getElementById('btn-sync-cloud-manual');
    if (btnSyncManual) {
      btnSyncManual.addEventListener('click', () => {
        handleManualSync();
      });
    }
  }

  // 4. Section Navigation & View Switcher
  const navLinks = document.querySelectorAll('[data-section-target]');
  const contentSections = document.querySelectorAll('.academy-section');
  const sidebar = document.getElementById('app-sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');

  function switchSection(targetId) {
    STATE.activeSection = targetId;
    contentSections.forEach(sec => {
      if (sec.id === `section-${targetId}`) {
        sec.classList.remove('d-none');
      } else {
        sec.classList.add('d-none');
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('data-section-target') === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile sidebar if open
    if (sidebar && sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
      if (sidebarBackdrop) sidebarBackdrop.classList.remove('show');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-section-target');
      switchSection(target);
    });
  });

  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      if (sidebarBackdrop) sidebarBackdrop.classList.toggle('show');
    });
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('show');
      sidebarBackdrop.classList.remove('show');
    });
  }

  // 5. DATA STORE: 20 Detailed Lessons (The 6 Pillars)
  const LESSONS_DATA = [
    {
      id: 1,
      title: "1. Introduction to Bootstrap",
      titleAr: "مقدمة شاملة في إطار العمل Bootstrap 5",
      badge: "الأساسيات",
      definition: {
        what: "بوتستراب 5 هو أشهر وأقوى إطار عمل (Front-end Framework) مفتوح المصدر في العالم لتصميم واجهات ويب عصرية وسريعة ومتجاوبة تماماً مع مختلف الشاشات.",
        why: "يحل مشكلة إعادة اختراع العجلة (Don't Repeat Yourself)؛ فبدل كتابة آلاف أسطر CSS للشبكة والأزرار والقوائم لكل مشروع، يوفر مكتبة جاهزة ومختبرة على مليارات الأجهزة.",
        when: "نستخدمه في كل مشروع يحتاج واجهة سريعة، احترافية، تدعم الهواتف والتابلت، وتلتزم بأعلى معايير سهولة الوصول (Accessibility)."
      },
      visualDiagram: `
        <div class="row g-3 align-items-center text-center">
          <div class="col-md-3">
            <div class="p-3 bg-primary bg-opacity-10 border border-primary rounded-3">
              <i class="bi bi-filetype-html fs-1 text-primary"></i>
              <h6 class="fw-bold mt-2">1. هيكل HTML5</h6>
              <small class="text-muted">العظام والوسوم الدلالية</small>
            </div>
          </div>
          <div class="col-md-1 d-none d-md-block text-primary fs-3"><i class="bi bi-plus-lg"></i></div>
          <div class="col-md-4">
            <div class="p-3 bg-purple bg-opacity-10 border border-purple rounded-3 shadow-sm">
              <i class="bi bi-bootstrap-fill fs-1 text-purple" style="color: #7952b3;"></i>
              <h6 class="fw-bold mt-2">2. مكتبة Bootstrap 5</h6>
              <small class="text-muted">نظام الشبكة + كلاسات جاهزة + تفاعل Vanilla JS</small>
            </div>
          </div>
          <div class="col-md-1 d-none d-md-block text-primary fs-3"><i class="bi bi-arrow-left"></i></div>
          <div class="col-md-3">
            <div class="p-3 bg-success bg-opacity-10 border border-success rounded-3">
              <i class="bi bi-phone-flip fs-1 text-success"></i>
              <h6 class="fw-bold mt-2">3. موقع متجاوب 100%</h6>
              <small class="text-muted">جاهز لجميع الشاشات فوراً</small>
            </div>
          </div>
        </div>
      `,
      code: `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>مشروعي الأول في Bootstrap 5</title>
    <!-- تضمين ملف Bootstrap CSS (RTL) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css">
  </head>
  <body class="bg-light p-5">
    <div class="container text-center py-4 bg-white rounded-4 shadow-sm">
      <h1 class="text-primary fw-bold">أهلاً بك في عالم Bootstrap 5!</h1>
      <p class="lead text-muted">صُممت هذه الواجهة بكلاسات جاهزة بدون سطر CSS واحد مخصص.</p>
      <button class="btn btn-primary btn-lg rounded-pill px-4">ابدأ الآن</button>
    </div>
    <!-- تضمين ملف Bootstrap JS Bundle في آخر الصفحة -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>`,
      codeExplanation: [
        { line: 'lang="ar" dir="rtl"', desc: 'تحديد لغة الوثيقة كعربية وتفعيل الاتجاه من اليمين لليسار.' },
        { line: 'bootstrap.rtl.min.css', desc: 'استدعاء نسخة بوتستراب المجهزة للغات RTL لتنعكس الهوامش والمحاذاة تلقائياً.' },
        { line: 'class="container text-center py-4 ..."', desc: 'كلاسات الحاوية، توسيط النص، وهوامش داخلية عمودية بقيمة 1.5rem مع زوايا ناعمة وظل.' },
        { line: 'bootstrap.bundle.min.js', desc: 'ملف الجافاسكريبت المجمع الذي يشمل مكتبة Popper.js المسؤولة عن النوافذ المنبثقة والقوائم.' }
      ],
      previewHtml: `
        <div class="container text-center py-4 bg-body rounded-4 shadow-sm border">
          <span class="badge bg-primary-subtle text-primary mb-2 px-3 py-2 rounded-pill fw-bold">درس 1 · الانطلاقة</span>
          <h2 class="text-primary fw-bold">أهلاً بك في عالم Bootstrap 5!</h2>
          <p class="lead text-body-secondary">صُممت هذه الواجهة بكلاسات جاهزة بدون سطر CSS واحد مخصص.</p>
          <button class="btn btn-primary btn-lg rounded-pill px-4 shadow-sm">ابدأ الآن <i class="bi bi-arrow-left me-1"></i></button>
        </div>
      `,
      analysis: `
        <p><strong>التحليل التقني:</strong> يتميز Bootstrap 5 بحذف مكتبة jQuery القديمة تماماً، والاعتماد على Vanilla JavaScript خالص. هذا قلص حجم التحميل بأكثر من 85 كيلوبايت وحسّن درجة أداء Core Web Vitals.</p>
        <p><strong>مقارنة مع CSS العادي:</strong> لإنشاء الحاوية، الزوايا المستديرة، الظلال، وتوسيط النصوص والزر بكود CSS خالص، كنت ستحتاج لكتابة ما لا يقل عن 25 سطراً من CSS وحسابات الهوامش. في بوتستراب، استعملنا 4 كلاسات سريعة ومعيارية.</p>
      `,
      practice: {
        question: "ما هو التغيير الجوهري الأكبر الذي تم في بنية JavaScript بين Bootstrap 4 و Bootstrap 5؟",
        options: [
          "الاستغناء التام عن مكتبة jQuery واستخدام Vanilla JS",
          "إلغاء نظام الشبكة (Grid System)",
          "فرض استخدام لغة TypeScript إجبارياً",
          "منع استخدام أيقونات الويب"
        ],
        correctIndex: 0,
        explanation: "في Bootstrap 5 تم حذف الاعتماد على jQuery نهائياً، مما جعل المكونات أسرع وأخف، وجعل دمج Bootstrap مع أطر العمل الحديثة أو استخدامه منفرداً أمراً غاية في السلاسة."
      }
    },
    {
      id: 2,
      title: "2. Installation & Setup",
      titleAr: "طرق التثبيت والتهيئة (CDN مقابل npm)",
      badge: "التهيئة",
      definition: {
        what: "طرق جلب ملفات Bootstrap واستدعائها داخل مشروع الويب، سواء عبر شبكات توزيع المحتوى العالمية CDN أو التثبيت المحلي بواسطة مدير الحزم npm.",
        why: "اختيار طريقة الربط الصحيحة يحدد سرعة تحميل موقعك وسهولة صيانته وتخصيصه بالألوان والمتغيرات الخاصة.",
        when: "نستخدم CDN في المشاريع السريعة والتعليمية، ونستخدم npm مع Sass في المشاريع الاحترافية التي تحتاج تخصيص الألوان الأساسية والمتغيرات."
      },
      visualDiagram: `
        <div class="row g-3 text-center">
          <div class="col-md-6">
            <div class="p-3 border rounded-3 bg-body shadow-sm">
              <span class="badge bg-success mb-2">طريقة 1: سريعة وبسيطة</span>
              <h6 class="fw-bold">شبكة CDN (jsDelivr)</h6>
              <p class="small text-muted mb-2">سيرفرات عالمية توزع الملف جاهزاً ومخزناً مؤقتاً.</p>
              <code>&lt;link rel="stylesheet" href="...cdn..."&gt;</code>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 border rounded-3 bg-body shadow-sm">
              <span class="badge bg-purple mb-2 text-white" style="background-color: #7952b3;">طريقة 2: احترافية متقدمة</span>
              <h6 class="fw-bold">مدير الحزم npm & Sass</h6>
              <p class="small text-muted mb-2">تحميل الملفات المصدرية وتعديل المتغيرات وإعادة تجميعها.</p>
              <code>npm install bootstrap@5.3.3</code>
            </div>
          </div>
        </div>
      `,
      code: `<!-- 1. رابط الـ CSS في رأس الصفحة <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<!-- 2. رابط الـ JS Bundle في نهاية الـ <body> قبل الإغلاق مباشرة -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>`,
      codeExplanation: [
        { line: 'bootstrap.rtl.min.css', desc: 'ملف التنسيق الأساسي المضغوط الداعم لليمين لليسار.' },
        { line: 'bootstrap-icons.min.css', desc: 'مكتبة الأيقونات الرسمية التي تحتوي على أكثر من 2000 أيقونة متجهية SVG.' },
        { line: 'bootstrap.bundle.min.js', desc: 'يشمل محرك Bootstrap للجافاسكريبت مع مكتبة Popper.js لحساب موضع القوائم والنوافذ.' }
      ],
      previewHtml: `
        <div class="p-4 border rounded-3 bg-body text-center">
          <div class="d-inline-flex p-3 bg-success-subtle text-success rounded-circle mb-3">
            <i class="bi bi-cloud-check-fill fs-2"></i>
          </div>
          <h5 class="fw-bold">تم ربط Bootstrap 5 و Bootstrap Icons بنجاح!</h5>
          <p class="text-muted small">كل الأيقونات ومكونات التفاعل أصبحت جاهزة للاستخدام الفوري.</p>
        </div>
      `,
      analysis: `
        <p><strong>لماذا نضع ملف JS في أسفل الصفحة؟</strong> عند وضع السكربتات في الـ &lt;head&gt; بدون defer، يتوقف المتصفح عن إظهار محتوى الصفحة حتى يكتمل تحميل وتحليل ملف الجافاسكريبت. وضع السكربت قبل إغلاق &lt;/body&gt; يضمن ظهور الصفحة أولاً أمام المستخدم (Fast First Contentful Paint).</p>
      `,
      practice: {
        question: "ما الفرق بين تحميل bootstrap.bundle.min.js وتحميل bootstrap.min.js منفرداً؟",
        options: [
          "نسخة bundle تحتوي بداخلها على مكتبة Popper.js المدمجة الضرورية للقوائم والنوافذ",
          "نسخة bundle مخصصة فقط لنظام التشغيل ماك",
          "نسخة bundle تحتوي على كود PHP مدمج",
          "لا يوجد أي فرق إطلاقاً"
        ],
        correctIndex: 0,
        explanation: "مكتبة Popper.js مسؤولة عن حساب إحداثيات ومواقع النوافذ المنبثقة والقوائم التفاعلية حتى لا تخرج عن حواف الشاشة. نسخة الباندل تشملها مسبقاً وتوفر عليك عناء ربطها يدوياً."
      }
    },
    {
      id: 3,
      title: "3. Containers",
      titleAr: "الحاويات (Container مقابل Container-fluid)",
      badge: "الهيكلة",
      definition: {
        what: "الحاوية (Container) هي العنصر الأساسي الأهم في بوتستراب الذي يحوي كل محتويات الصفحة أو القسم ويضبط هوامشها وعرضها الأقصى.",
        why: "تمنع المحتوى من التمدد بشكل عريض ومشوه على الشاشات الكبيرة، وتضمن وجود هوامش مريحة للعينين على جانبي الصفحة.",
        when: "يجب أن تبدأ أي صفحة أو قسم في بوتستراب بوضع وسم حاوية إما .container أو .container-fluid قبل وضع أي سطر (.row)."
      },
      visualDiagram: `
        <div class="p-3 border rounded-3 bg-body">
          <div class="border border-primary border-2 p-3 rounded-2 mb-3 bg-primary bg-opacity-10 text-center">
            <span class="badge bg-primary mb-1">.container (عرض أقصى محدد متمركز في الوسط)</span>
            <div class="text-muted small">له max-width محدد يتغير حسب الشاشة (مثلاً 1140px في xl) ومحاذاة margin: auto</div>
          </div>
          <div class="border border-success border-2 p-3 rounded-2 bg-success bg-opacity-10 text-center">
            <span class="badge bg-success mb-1">.container-fluid (عرض 100% مستمر دائماً)</span>
            <div class="text-muted small">يمتد بعرض 100% من أقصى اليمين لأقصى اليسار في كل أنواع الشاشات بدون توقف</div>
          </div>
        </div>
      `,
      code: `<!-- 1. حاوية متجاوبة ذات عرض أقصى متدرج -->
<div class="container bg-primary text-white p-4 rounded-3 text-center mb-3">
  <h4>حاوية .container عادية</h4>
  <p class="mb-0">عرضها محدد (Max-width) وتتوسط الصفحة تلقائياً في الشاشات الكبيرة.</p>
</div>

<!-- 2. حاوية سائلة تغطي كامل عرض الشاشة دائماً -->
<div class="container-fluid bg-dark text-white p-4 rounded-3 text-center">
  <h4>حاوية .container-fluid سائلة</h4>
  <p class="mb-0">تشغل 100% من عرض الشاشة مهما كبر حجمها من الحافة إلى الحافة.</p>
</div>`,
      codeExplanation: [
        { line: '.container', desc: 'يضبط max-width مدروساً بدقة حسب حجم الشاشة ويضيف هوامش تلقائية جانبية للتوسيط.' },
        { line: '.container-fluid', desc: 'يفرض width: 100% مع padding داخلي جانبي بقيمة 0.75rem بدون حد أقصى للعرض.' }
      ],
      previewHtml: `
        <div class="container bg-primary text-white p-3 rounded-3 text-center mb-3 shadow-sm">
          <h6 class="fw-bold mb-1">.container (عرض متمركز محدد)</h6>
          <small>جرب تصغير وتكبير النافذة لمشاهدة الهوامش الجانبية المتناسقة.</small>
        </div>
        <div class="container-fluid bg-secondary text-white p-3 rounded-3 text-center shadow-sm">
          <h6 class="fw-bold mb-1">.container-fluid (100% عرض الشاشة)</h6>
          <small>يمتد من أقصى الحافة اليمنى إلى أقصى الحافة اليسرى.</small>
        </div>
      `,
      analysis: `
        <p><strong>الفرق الجوهري:</strong> كلاس <code>.container</code> يطبق خاصية <code>margin-left: auto; margin-right: auto;</code> لتوسيط المحتوى، ويطبق Media Queries متدرجة: في شاشة md يصبح عرضه الأقصى 720px، وفي lg يصبح 960px، وفي xl يصبح 1140px. بينما <code>.container-fluid</code> لا يضع أي سقف للعرض نهائياً.</p>
      `,
      practice: {
        question: "إذا أردت إنشاء شريط تنقل يمتد على كامل عرض الشاشة بدون أي مسافات بيضاء جانبية، ما الحاوية الأنسب؟",
        options: [
          ".container-fluid",
          ".container",
          ".container-sm فقط",
          ".container-grid"
        ],
        correctIndex: 0,
        explanation: "كلاس .container-fluid يضمن ملء 100% من عرض النافذة بدون هوامش خارجية جانبية، وهو الخيار القياسي لشرائط التنقل والفوتر المتصل بالحواف."
      }
    },
    {
      id: 4,
      title: "4. Grid System",
      titleAr: "نظام الشبكة الرياضي (12 عموداً)",
      badge: "العمود الفقري",
      definition: {
        what: "نظام تقسيم هندسي افتراضي يقسم كل سطر أفقي في الصفحة إلى 12 عموداً متساوياً باستخدام تقنية CSS Flexbox.",
        why: "لماذا 12؟ لأن الرقم 12 يقبل القسمة على (1، 2، 3، 4، 6، 12)، مما يتيح لك تقسيم الصفحة لنصفين، ثلاثة أثلاث، أربعة أرباع، أو ستة أسداس بحرية تامة.",
        when: "يُستخدم لتوزيع البطاقات، تخطيط الأعمدة، القوائم الجانبية ومحتوى المقالات في كل صفحات الموقع."
      },
      visualDiagram: `
        <div class="p-3 border rounded-3 bg-body">
          <div class="text-center text-muted small mb-2 fw-bold">السطر الواحد (.row) مقسم إلى 12 جزءاً هندسياً:</div>
          <div class="row g-1 text-center mb-2">
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">1</div></div>
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">2</div></div>
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">3</div></div>
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">4</div></div>
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">5</div></div>
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">6</div></div>
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">7</div></div>
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">8</div></div>
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">9</div></div>
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">10</div></div>
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">11</div></div>
            <div class="col-1"><div class="p-1 bg-primary text-white small rounded">12</div></div>
          </div>
          <div class="row g-2 text-center text-white">
            <div class="col-6"><div class="p-2 bg-success rounded fw-bold">col-6 (نصف السطر 50%)</div></div>
            <div class="col-6"><div class="p-2 bg-success rounded fw-bold">col-6 (نصف السطر 50%)</div></div>
          </div>
          <div class="row g-2 text-center text-white mt-1">
            <div class="col-4"><div class="p-2 bg-purple rounded fw-bold" style="background-color: #7952b3;">col-4 (الثلث)</div></div>
            <div class="col-4"><div class="p-2 bg-purple rounded fw-bold" style="background-color: #7952b3;">col-4 (الثلث)</div></div>
            <div class="col-4"><div class="p-2 bg-purple rounded fw-bold" style="background-color: #7952b3;">col-4 (الثلث)</div></div>
          </div>
        </div>
      `,
      code: `<div class="container">
  <div class="row g-3">
    <!-- عمود يأخذ الثلثين (8 أعمدة) -->
    <div class="col-8">
      <div class="p-3 bg-primary text-white rounded">المحتوى الرئيسي (col-8)</div>
    </div>
    <!-- عمود يأخذ الثلث (4 أعمدة) -->
    <div class="col-4">
      <div class="p-3 bg-secondary text-white rounded">القائمة الجانبية (col-4)</div>
    </div>
  </div>
</div>`,
      codeExplanation: [
        { line: 'class="row"', desc: 'الحاوية الأفقية التي تعتمد على display: flex مع هوامش سلبية لمعادلة تباعد الأعمدة.' },
        { line: 'class="col-8"', desc: 'يأخذ 8 أجزاء من 12 أي ما يعادل 66.66% من العرض الإجمالي.' },
        { line: 'class="col-4"', desc: 'يأخذ 4 أجزاء من 12 أي ما يعادل 33.33% من العرض الإجمالي.' },
        { line: 'class="g-3"', desc: 'Gutter: مسافة عازلة فاصلة بين الأعمدة رأسياً وأفقياً بقيمة 1rem (16px).' }
      ],
      previewHtml: `
        <div class="row g-2 text-center text-white">
          <div class="col-8"><div class="p-3 bg-primary rounded fw-bold">col-8 (المحتوى 66.6%)</div></div>
          <div class="col-4"><div class="p-3 bg-secondary rounded fw-bold">col-4 (الشريط 33.3%)</div></div>
        </div>
      `,
      analysis: `
        <p><strong>القاعدة الذهبية:</strong> لا تضع نصوصاً أو عناصر مباشرة داخل <code>.row</code> دون تغليفها بوسم <code>.col</code>! لأن <code>.row</code> يحمل هوامش سلبية (Negative Margins) تعادل -12px أو -15px. وسم <code>.col</code> هو المسؤول عن إضافة الـ padding الداخلي ليعيد التوازن الهندسي للشبكة ويمنع ظهور شريط التمرير الأفقي المشوه.</p>
      `,
      practice: {
        question: "ماذا يحدث إذا تجاوز مجموع أرقام كلاسات col في سطر .row واحد الرقم 12 (مثلاً col-8 مع col-6 = 14)؟",
        options: [
          "ينتقل العمود الزائد تلقائياً إلى سطر جديد بسبب خاصية flex-wrap: wrap",
          "يعرض المتصفح خطأ برمجياً في الكونسول",
          "تتداخل الأعمدة فوق بعضها وتتلف الصفحة",
          "يتم حذف العمود الثاني تلقائياً"
        ],
        correctIndex: 0,
        explanation: "كلاس .row مزود افتراضياً بخاصية CSS flex-wrap: wrap؛ وبالتالي عندما يتجاوز المجموع 12 عموداً، ينزل العنصر الثاني إلى سطر جديد تلقائياً وسلاسة."
      }
    },
    {
      id: 5,
      title: "5. Responsive Design",
      titleAr: "التصميم المتجاوب ونقاط التوقف (Breakpoints)",
      badge: "التجاوب الذكي",
      definition: {
        what: "نقاط التوقف (Breakpoints) هي مقاسات عرض الشاشة التي يبدأ عندها التصميم في التغير والتكيف مع نوع الجهاز (هاتف، تابلت، حاسوب).",
        why: "تتيح لك كوداً واحداً يتصرف بذكاء: يظهر عموداً واحداً في الهاتف حتى يسهل قراءته بالإبهام، ويتحول إلى 3 أو 4 أعمدة على شاشات الحواسيب الواسعة.",
        when: "نستخدمها في كل كلاس أعمدة عبر الجمع بين البوادئ مثل: col-12 col-md-6 col-lg-4."
      },
      visualDiagram: `
        <div class="table-responsive">
          <table class="table table-bordered text-center align-middle">
            <thead class="table-primary">
              <tr>
                <th>نقطة التوقف</th>
                <th>البادئة</th>
                <th>الأبعاد بالبيكسل</th>
                <th>نوع الجهاز المعتاد</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Extra small</td><td><code>xs</code> (افتراضي)</td><td>&lt; 576px</td><td>الهواتف الذكية في الوضع الرأسي</td></tr>
              <tr><td>Small</td><td><code>sm</code></td><td>&ge; 576px</td><td>الهواتف العريضة والأفقية</td></tr>
              <tr><td>Medium</td><td><code>md</code></td><td>&ge; 768px</td><td>أجهزة التابلت والآيباد</td></tr>
              <tr><td>Large</td><td><code>lg</code></td><td>&ge; 992px</td><td>الحواسيب المحمولة القياسية</td></tr>
              <tr><td>Extra large</td><td><code>xl</code></td><td>&ge; 1200px</td><td>شاشات الحواسيب المكتبية</td></tr>
              <tr><td>Extra extra large</td><td><code>xxl</code></td><td>&ge; 1400px</td><td>الشاشات العريضة والتلفزيونات</td></tr>
            </tbody>
          </table>
        </div>
      `,
      code: `<div class="container">
  <div class="row g-3">
    <!-- بطاقة متجاوبة: 12 في الهاتف، 6 في التابلت، 4 في الحاسوب -->
    <div class="col-12 col-md-6 col-lg-4">
      <div class="p-3 bg-primary text-white rounded text-center">دورة تطوير الويب</div>
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <div class="p-3 bg-success text-white rounded text-center">دورة الذكاء الاصطناعي</div>
    </div>
    <div class="col-12 col-md-12 col-lg-4">
      <div class="p-3 bg-purple text-white rounded text-center" style="background-color: #7952b3;">دورة تصميم الواجهات</div>
    </div>
  </div>
</div>`,
      codeExplanation: [
        { line: 'col-12', desc: 'في شاشات الموبايل (xs)، تأخذ البطاقة 12 عموداً كاملاً (عرض 100%).' },
        { line: 'col-md-6', desc: 'انطلاقاً من مقاس التابلت (768px فما فوق)، تأخذ البطاقة 6 أعمدة (عرض 50% كارتان بالسطر).' },
        { line: 'col-lg-4', desc: 'انطلاقاً من مقاس شاشات الحواسيب (992px فما فوق)، تأخذ البطاقة 4 أعمدة (عرض 33.3% 3 كروت بالسطر).' }
      ],
      previewHtml: `
        <div class="row g-2 text-center text-white">
          <div class="col-12 col-md-6 col-lg-4"><div class="p-3 bg-primary rounded fw-bold">1. دورة الويب (col-12 / md-6 / lg-4)</div></div>
          <div class="col-12 col-md-6 col-lg-4"><div class="p-3 bg-success rounded fw-bold">2. دورة الذكاء الاصطناعي</div></div>
          <div class="col-12 col-md-12 col-lg-4"><div class="p-3 bg-danger rounded fw-bold">3. دورة التصميم</div></div>
        </div>
      `,
      analysis: `
        <p><strong>فلسفة Mobile-First:</strong> في بوتستراب، يتم تصميم وتطبيق التنسيقات للشاشات الصغيرة أولاً بدون بادئة، ثم يتم استخدام Media Queries تعتمد على <code>min-width</code> وليس <code>max-width</code>. هذا يعني أن كلاس <code>col-md-6</code> سيطبق على التابلت (md) ويستمر في الانطباق على كل ما هو أكبر منه (lg, xl, xxl) ما لم نقم بتخصيص كلاس أعلى مثل <code>col-lg-4</code>.</p>
      `,
      practice: {
        question: "إذا كتبت الكلاس 'col-md-4' فقط على عنصر، كيف سيعرض هذا العنصر على شاشة الهاتف الذكي العادي (عرض 380px)؟",
        options: [
          "سيأخذ عرض 100% تلقائياً كسطر كامل (col-12)",
          "سيأخذ ثلث الشاشة ويصبح صغيراً جداً",
          "سيختفي تماماً من شاشة الهاتف",
          "سيتسبب في خطأ تصميمي"
        ],
        correctIndex: 0,
        explanation: "بما أن الهاتف أصغر من نقطة التوقف md (768px)، فإن قاعدة col-md-4 لا تنطبق عليه، ويعود العنصر للقاعدة الافتراضية لعناصر الكتلة في بوتستراب وهي أخذ 100% من العرض."
      }
    },
    {
      id: 6,
      title: "6. Typography",
      titleAr: "الطباعة وتنسيقات النصوص والعناوين",
      badge: "النصوص",
      definition: {
        what: "مجموعة أدوات لتنسيق العناوين والفقرات، التحكم في سُمك الخط، المحاذاة، والتأكيد البصري.",
        why: "تضمن تناسقاً هرمياً (Typographic Scale) مريحاً لعين القارئ ومتوافقاً مع كل قياسات الشاشات.",
        when: "نستخدمها في صياغة العناوين الرئيسية، الفقرات التمهيدية، والاقتباسات."
      },
      visualDiagram: `
        <div class="p-3 border rounded-3 bg-body">
          <div class="display-4 fw-black text-primary mb-2">Display 4 (عنوان ضخم ملفت)</div>
          <h2 class="fw-bold">عنوان رئيسي H2 مع كلاس fw-bold</h2>
          <p class="lead text-muted">فقرة تمهيدية بارزة بكلاس .lead لجذب انتباه القارئ في مقدمة الصفحة.</p>
          <p class="text-body-secondary small">نص توضيحي فرعي بحجم صغير ولون هادئ عبر كلاس .small.</p>
        </div>
      `,
      code: `<!-- عناوين عملاقة للعروض الترويجية والواجهات -->
<h1 class="display-3 fw-bold text-primary">عنوان رئيسي عملاق</h1>

<!-- فقرة افتتاحية بارزة -->
<p class="lead text-secondary">هذه فقرة تمهيدية تستخدم كلاس .lead لتظهر بحجم أكبر وأوضح من النص العادي.</p>

<!-- كلاسات محاذاة وسُمك النصوص -->
<p class="text-start fw-bold">نص بمحاذاة اليمين (في RTL) وسُمك عريض.</p>
<p class="text-center text-uppercase">نص متمركز في الوسط.</p>
<p class="text-decoration-underline text-danger">نص تحته خط بلون التحذير الأحمر.</p>`,
      codeExplanation: [
        { line: 'class="display-3"', desc: 'عناوين استعراضية أكبر بكثير من h1 القياسي مناسبة لصفحات الهبوط (Hero Sections).' },
        { line: 'class="lead"', desc: 'يرفع حجم خط الفقرة قليلاً مع تخفيف الوزن ليجعلها افتتاحية أنيقة.' },
        { line: 'class="fw-bold"', desc: 'Font-weight: 700 لجعل النص عريضاً وبارزاً.' }
      ],
      previewHtml: `
        <div>
          <h2 class="display-6 fw-bold text-primary">العناوين الاستعراضية Display</h2>
          <p class="lead text-muted">تستخدم كلاس .lead لإبراز أهمية الفكرة في مقدمة الفقرة.</p>
          <div class="d-flex gap-2 flex-wrap">
            <span class="badge bg-primary">fw-bold</span>
            <span class="badge bg-secondary">fw-normal</span>
            <span class="badge bg-success">text-decoration-underline</span>
          </div>
        </div>
      `,
      analysis: `
        <p><strong>الدعم التلقائي للخطوط العربية:</strong> يدعم Bootstrap نظام الخطوط الأصلي لكل نظام، ولكن في تطبيقنا قمنا بربط خط <code>Cairo</code> و <code>Tajawal</code> لضمان ترابط الحروف العربية وظهورها بأجمل حلة ووضوح طباعي.</p>
      `,
      practice: {
        question: "أي كلاس يُستخدم في Bootstrap لجعل الفقرة الافتتاحية بارزة بحجم أكبر قليلاً عن باقي الفقرات؟",
        options: [
          ".lead",
          ".font-big",
          ".paragraph-bold",
          ".text-large"
        ],
        correctIndex: 0,
        explanation: "كلاس .lead مصمم خصيصاً في بوتستراب للفقرات التمهيدية والرئيسية ليعطيها وزناً ووضوحاً بصرياً مريحاً."
      }
    },
    {
      id: 7,
      title: "7. Colors & Backgrounds",
      titleAr: "الألوان والخلفيات الدلالية الموحدة",
      badge: "الألوان",
      definition: {
        what: "نظام ألوان دلالي (Semantic Colors) يعبر عن المعنى الوظيفي للعنصر (نجاح، تحذير، خطأ، معلومة).",
        why: "يوحد التجربة البصرية ويسهل على المستخدم فهم دلالة كل زر أو تنبيه فورياً دون الحاجة لقراءة الكلمات.",
        when: "نستخدمه في تلوين الأزرار، الشارات، البطاقات، التنبيهات، والخلفيات."
      },
      visualDiagram: `
        <div class="row g-2 text-center text-white fw-bold">
          <div class="col-4 col-md-2"><div class="p-2 bg-primary rounded">primary (الأساسي)</div></div>
          <div class="col-4 col-md-2"><div class="p-2 bg-secondary rounded">secondary (الثانوي)</div></div>
          <div class="col-4 col-md-2"><div class="p-2 bg-success rounded">success (النجاح)</div></div>
          <div class="col-4 col-md-2"><div class="p-2 bg-danger rounded">danger (الخطر)</div></div>
          <div class="col-4 col-md-2"><div class="p-2 bg-warning text-dark rounded">warning (التحذير)</div></div>
          <div class="col-4 col-md-2"><div class="p-2 bg-info text-dark rounded">info (المعلومة)</div></div>
        </div>
      `,
      code: `<!-- خلفيات دلالية كاملة -->
<div class="p-3 bg-primary text-white rounded mb-2">أزرق رئيسي (.bg-primary)</div>
<div class="p-3 bg-success text-white rounded mb-2">أخضر نجاح (.bg-success)</div>
<div class="p-3 bg-danger text-white rounded mb-2">أحمر تنبيه أو خطأ (.bg-danger)</div>

<!-- خلفيات ناعمة حديثة في بوتستراب 5.3 (Subtle Backgrounds) -->
<div class="p-3 bg-primary-subtle text-primary border border-primary-subtle rounded mb-2">
  خلفية زرقاء ناعمة مريحة للعين (.bg-primary-subtle)
</div>
<div class="p-3 bg-success-subtle text-success border border-success-subtle rounded">
  خلفية خضراء ناعمة (.bg-success-subtle)
</div>`,
      codeExplanation: [
        { line: '.bg-primary & .text-white', desc: 'تطبيق اللون الأزرق الأساسي كخلفية مع تحويل لون النص للأبيض للتباين العالي.' },
        { line: '.bg-primary-subtle', desc: 'ميزة جديدة في Bootstrap 5.3 تقدم ألوان خلفيات هادئة وناعمة جداً مع نص غامق متناسق تلقائياً.' }
      ],
      previewHtml: `
        <div class="d-flex flex-wrap gap-2">
          <span class="badge bg-primary px-3 py-2 fs-6">Primary</span>
          <span class="badge bg-success px-3 py-2 fs-6">Success</span>
          <span class="badge bg-danger px-3 py-2 fs-6">Danger</span>
          <span class="badge bg-warning text-dark px-3 py-2 fs-6">Warning</span>
          <span class="badge bg-info text-dark px-3 py-2 fs-6">Info</span>
        </div>
      `,
      analysis: `
        <p><strong>ميزة المتغيرات CSS في 5.3:</strong> تعتمد ألوان Bootstrap 5.3 على CSS Custom Properties مثل <code>--bs-primary-rgb</code> مما يسمح بتعديل الشفافية بسهولة، مثل: <code>bg-opacity-50</code> بدون الحاجة لكتابة أكواد إضافية.</p>
      `,
      practice: {
        question: "ما هو الكلاس الذي تم إدخاله في Bootstrap 5.3 لإنشاء خلفية هادئة ناعمة مريحة للعين مثل الأزرق الفاتح جداً؟",
        options: [
          ".bg-primary-subtle",
          ".bg-primary-light",
          ".bg-soft-blue",
          ".bg-transparent-primary"
        ],
        correctIndex: 0,
        explanation: "عائلة كلاسات *-subtle أضيفت رسمياً في 5.3 لدعم التصاميم الحديثة والوضع المظلم تلقائياً دون وهج لوني."
      }
    },
    {
      id: 8,
      title: "8. Spacing & Utilities",
      titleAr: "المسافات والهوامش (Margin & Padding)",
      badge: "المسافات",
      definition: {
        what: "نظام رياضي سريع للتحكم في الهوامش الخارجية (Margin) والهوامش الداخلية (Padding) على مقياس من 0 إلى 5.",
        why: "يعطي تنفساً بصرياً بين العناصر والأقسام ويغنيك عن كتابة قيم مثل margin: 15px في كل كلاس مخصص.",
        when: "نستخدمه في كل عنصر على الصفحة لضبط التباعد رأسياً وأفقياً."
      },
      visualDiagram: `
        <div class="p-3 border rounded-3 bg-body text-center">
          <div class="p-3 bg-danger bg-opacity-10 border border-danger rounded mb-2">
            <span class="badge bg-danger mb-1">الهامش الخارجي: Margin (m-*)</span>
            <div class="small text-muted">يبعد العنصر عن جيرانه في الصفحة</div>
            <div class="p-3 bg-success bg-opacity-10 border border-success rounded mt-2">
              <span class="badge bg-success mb-1">الهامش الداخلي: Padding (p-*)</span>
              <div class="small text-muted">المسافة بين حافة العنصر ومحتواه الداخلي</div>
            </div>
          </div>
        </div>
      `,
      code: `<!-- m = margin (خارجي) | p = padding (داخلي) -->
<!-- الاتجاهات: t = top, b = bottom, s = start, e = end, x = أفقي, y = رأسي -->

<div class="p-4 bg-light border rounded">
  <!-- هامش داخلي شامل 1.5rem (24px) -->
  <h5 class="mb-3">عنوان مع هامش سفلي بقيمة 1rem (.mb-3)</h5>
  <p class="py-2 px-3 bg-white border rounded">
    هامش رأسي داخلي 0.5rem وهامش أفقي داخلي 1rem (.py-2 .px-3)
  </p>
  <button class="btn btn-primary mt-2 me-3">زر بهامش علوي وبداية</button>
</div>`,
      codeExplanation: [
        { line: 'p-4', desc: 'Padding في الجهات الأربع بقيمة 1.5rem (24 بيكسل).' },
        { line: 'py-2 & px-3', desc: 'py = مسافة علوية وسفلية، px = مسافة يمنى ويسرى.' },
        { line: 'ms-* & me-*', desc: 'start و end: في لغة RTL العربية، start تعني اليمين و end تعني اليسار تلقائياً!' }
      ],
      previewHtml: `
        <div class="p-3 bg-body-tertiary border rounded">
          <div class="p-3 bg-primary text-white rounded mb-2">عنصر بهامش داخلي p-3 وهامش سفلي mb-2</div>
          <div class="py-2 px-4 bg-success text-white rounded d-inline-block">عنصر بهامش py-2 px-4</div>
        </div>
      `,
      analysis: `
        <p><strong>لماذا تم استبدال ml و mr بـ ms و me؟</strong> في Bootstrap 4 كان استخدام <code>ml-auto</code> يعني margin-left، وعند تحويل الموقع إلى العربية كان يتطلب إعادة كتابة كل الكود. في Bootstrap 5 تم اعتماد مصطلحي Start و End، ليصبح الكود محايداً اتجاهياً ويدعم الـ RTL بنسبة 100% بدون أي تعديل.</p>
      `,
      practice: {
        question: "في لغة عربية (RTL)، ما هو الكلاس المسؤول عن إضافة هامش على يمين العنصر؟",
        options: [
          "ms-* (Margin Start)",
          "me-* (Margin End)",
          "mr-* (Margin Right)",
          "ml-* (Margin Left)"
        ],
        correctIndex: 0,
        explanation: "في نظام RTL، البداية (Start) هي اليمين دائماً، لذا كلاس ms-* يطبق الهامش على اليمين مباشرة وبطريقة قياسية."
      }
    },
    {
      id: 9,
      title: "9. Buttons & Badges",
      titleAr: "الأزرار التفاعلية والشارات التنبيهية",
      badge: "التفاعل",
      definition: {
        what: "عناصر التفاعل والنداء للعمل (Call to Action) والشارات الصغيرة لعرض الأرقام والحالات.",
        why: "توفر زوايا ناعمة وتأثيرات Hover متقنة وتدرجات لونية معيارية بجهد صفري.",
        when: "في نماذج التسجيل، أزرار الشراء، شارات الإشعارات، ووسوم الفئات."
      },
      visualDiagram: `
        <div class="d-flex flex-wrap gap-2 align-items-center justify-content-center p-3 border rounded bg-body">
          <button class="btn btn-primary">btn-primary</button>
          <button class="btn btn-outline-success">btn-outline-success</button>
          <button class="btn btn-danger rounded-pill px-4">rounded-pill</button>
          <button class="btn btn-primary position-relative">
            الرسائل
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">9+</span>
          </button>
        </div>
      `,
      code: `<!-- أزرار معبأة وأزرار مفرغة الإطار -->
<button class="btn btn-primary">زر أساسي</button>
<button class="btn btn-outline-success">زر بإطار فقط</button>

<!-- أزرار دائرية الأطراف وبأحجام مختلفة -->
<button class="btn btn-danger btn-lg rounded-pill px-4">زر كبير دائري</button>
<button class="btn btn-secondary btn-sm">زر صغير</button>

<!-- شارة تنبيه وإشعارات فوق زر -->
<button type="button" class="btn btn-primary position-relative">
  صندوق الوارد
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    5+
  </span>
</button>`,
      codeExplanation: [
        { line: '.btn & .btn-primary', desc: 'كلاس الزر الأساسي يضبط الحواف والـ padding ويزيل الإطارات البدائية للمتصفح.' },
        { line: '.btn-outline-*', desc: 'يعطي زراً بدون خلفية مع إطار ملون وخلفية تظهر عند تمرير الفأرة (Hover).' },
        { line: '.rounded-pill', desc: 'يجعل زوايا الزر أو الشارة مستديرة بالكامل بشكل حبة دواء عصرية.' }
      ],
      previewHtml: `
        <div class="d-flex flex-wrap gap-2 align-items-center">
          <button class="btn btn-primary shadow-sm">تأكيد التسجيل</button>
          <button class="btn btn-outline-secondary">إلغاء</button>
          <button class="btn btn-success rounded-pill px-4">مكتمل <i class="bi bi-check-lg"></i></button>
          <span class="badge bg-info-subtle text-info-emphasis border px-3 py-2 rounded-pill">جديد</span>
        </div>
      `,
      analysis: `
        <p><strong>سهولة الوصول (Focus Ring):</strong> تتميز أزرار بوتستراب 5 بوجود هالة تركيز زرقاء شبه شفافة عند التنقل بلوحة المفاتيح (Tab)، مما يجعل الموقع صديقاً لذوي الاحتياجات الخاصة ومعايير WCAG 2.1.</p>
      `,
      practice: {
        question: "كيف نحول زراً عادياً في بوتستراب ليكون بأطراف نصف دائرية ناعمة تماماً (شكل كبسولة)؟",
        options: [
          "بإضافة كلاس .rounded-pill",
          "بإضافة كلاس .btn-circle",
          "بإضافة كلاس .border-radius-100",
          "بإضافة كلاس .pill-shape"
        ],
        correctIndex: 0,
        explanation: "كلاس .rounded-pill يطبق border-radius: 50rem مما يمنح أي زر أو شارة شكل حبة الدواء الدائرية فورياً."
      }
    },
    {
      id: 10,
      title: "10. Cards",
      titleAr: "البطاقات الحديثة وتنسيق المحتوى (Cards)",
      badge: "العرض",
      definition: {
        what: "حاويات محتوى عصرية ومرنة تضم صورة، عنواناً، نصاً، وأزرار عمل مجمعة في إطار واحد أنيق.",
        why: "البطاقة هي أهم وحدة بناء في واجهات الويب اليوم لعرض الدورات، المنتجات، المنشورات، وملفات المستخدمين.",
        when: "تُستخدم في صفحات المتاجر الإلكترونية، مقالات المدونات، وكتالوجات التكوين."
      },
      visualDiagram: `
        <div class="card mx-auto shadow-sm" style="max-width: 320px;">
          <div class="bg-secondary bg-opacity-25 text-center py-4 rounded-top">
            <i class="bi bi-image fs-1 text-muted"></i>
            <div class="small text-muted">.card-img-top (صورة الغلاف)</div>
          </div>
          <div class="card-body">
            <span class="badge bg-primary mb-2">تصنيف</span>
            <h5 class="card-title fw-bold">عنوان البطاقة (.card-title)</h5>
            <p class="card-text text-muted small">هذا هو نص الوصف داخل .card-body مع تباعد متناسق.</p>
            <a href="#" class="btn btn-primary btn-sm w-100">زر الإجراء</a>
          </div>
        </div>
      `,
      code: `<div class="card shadow-sm border-0 rounded-4 overflow-hidden" style="max-width: 22rem;">
  <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500" class="card-img-top" alt="دورة">
  <div class="card-body p-4">
    <span class="badge bg-primary-subtle text-primary mb-2">برمجة</span>
    <h5 class="card-title fw-bold">دورة تطوير الويب الشاملة</h5>
    <p class="card-text text-muted small">تعلم HTML5 و CSS3 و Bootstrap 5 خطوة بخطوة من الصفر.</p>
    <div class="d-flex justify-content-between align-items-center pt-2 border-top">
      <span class="fw-bold text-primary fs-5">مجاناً</span>
      <button class="btn btn-primary rounded-pill px-3 btn-sm">سجل الآن</button>
    </div>
  </div>
</div>`,
      codeExplanation: [
        { line: '.card', desc: 'الإطار الرئيسي بصندوق خلفية بيضاء وحواف ناعمة.' },
        { line: '.card-img-top', desc: 'يضبط أبعاد الصورة العلوية لتطابق زوايا البطاقة العلوية بدون تشوه.' },
        { line: '.card-body', desc: 'المنطقة الداخلية الحاوية للنصوص بهوامش داخلية مريحة بقيمة 1rem.' }
      ],
      previewHtml: `
        <div class="card shadow-sm border-0 rounded-4 overflow-hidden mx-auto" style="max-width: 20rem;">
          <div class="p-4 bg-primary text-white text-center">
            <i class="bi bi-laptop fs-1"></i>
          </div>
          <div class="card-body p-3">
            <span class="badge bg-primary-subtle text-primary mb-1">دورة احترافية</span>
            <h6 class="card-title fw-bold">دورة Bootstrap 5 المتقدمة</h6>
            <p class="card-text text-muted small mb-2">أتقن بناء الواجهات المتجاوبة وسجل إعجاب الأساتذة بمشروعك.</p>
            <button class="btn btn-primary btn-sm w-100 rounded-pill">ابدأ الدورة</button>
          </div>
        </div>
      `,
      analysis: `
        <p><strong>تساوي الارتفاع (Equal Heights):</strong> عند وضع عدة بطاقات في سطر واحد، أضف كلاس <code>.h-100</code> على كل <code>.card</code> لتجعل جميع البطاقات تتساوى تلقائياً في الارتفاع الرأسي مهما اختلف طول نص كل منها.</p>
      `,
      practice: {
        question: "كيف نجعل كل البطاقات في نفس السطر تمتلك نفس الارتفاع الرأسي تماماً؟",
        options: [
          "بإضافة كلاس .h-100 على كل وسم .card",
          "بإضافة كلاس .same-height على السطر",
          "بإعطاء كل صورة طول 500 بيكسل",
          "لا يمكن ذلك في بوتستراب"
        ],
        correctIndex: 0,
        explanation: "كلاس .h-100 يطبق height: 100%، وبما أن .row يستخدم Flexbox ممتداً رأسياً، فإن كل البطاقات تصبح متساوية في القامة والجمالية."
      }
    },
    {
      id: 11,
      title: "11. Navbar",
      titleAr: "شريط التنقل المتجاوب مع زر الهامبرغر",
      badge: "القوائم",
      definition: {
        what: "شريط التنقل العلوي المتجاوب الذي يعرض اللوجو والروابط على الشاشات الكبيرة، ويتحول إلى زر هامبرغر قابل للطي في الهواتف.",
        why: "يوفر وصولاً سهلاً لأهم أقسام الموقع مع توفير مساحة الشاشة على الموبايل.",
        when: "ضروري في أعلى كل موقع وتطبيق ويب."
      },
      visualDiagram: `
        <div class="p-3 border rounded bg-body">
          <div class="d-flex justify-content-between align-items-center p-2 bg-primary text-white rounded mb-2">
            <span class="fw-bold"><i class="bi bi-bootstrap me-1"></i> الشعار</span>
            <div class="d-none d-md-flex gap-3 small">
              <span>الرئيسية</span>
              <span>الدروس</span>
              <span>المشاريع</span>
            </div>
            <button class="btn btn-sm btn-light d-md-none"><i class="bi bi-list"></i></button>
          </div>
          <small class="text-muted text-center d-block">يتحول المنيو إلى زر في الهواتف (&lt;992px) ويظهر مبسوطاً في الحواسيب (.navbar-expand-lg)</small>
        </div>
      `,
      code: `<nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm rounded-3">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold text-primary" href="#">أكاديمية بوتستراب</a>
    <!-- زر الموبايل (الهامبرغر) -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- الروابط القابلة للطي -->
    <div class="collapse navbar-collapse" id="myNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link active" href="#">الرئيسية</a></li>
        <li class="nav-item"><a class="nav-link" href="#">المسار</a></li>
        <li class="nav-item"><a class="nav-link" href="#">المكونات</a></li>
      </ul>
      <button class="btn btn-primary rounded-pill btn-sm px-3">تسجيل الدخول</button>
    </div>
  </div>
</nav>`,
      codeExplanation: [
        { line: 'navbar-expand-lg', desc: 'يحدد نقطة الانبساط: يكون منيو عريض في الشاشات الكبيرة (lg)، ومطوياً تحت زر الهامبرغر في الشاشات الأصغر.' },
        { line: 'data-bs-toggle="collapse"', desc: 'يربط الزر بمحرك الجافاسكريبت لفتح وغلق القائمة المحددة بالمعرف target.' },
        { line: 'collapse navbar-collapse', desc: 'الحاوية التي تتكفل بالاختفاء والظهور التلقائي.' }
      ],
      previewHtml: `
        <nav class="navbar navbar-expand bg-body-tertiary border rounded p-2">
          <div class="container-fluid">
            <span class="navbar-brand fw-bold text-primary fs-6">شعار الموقع</span>
            <div class="navbar-nav me-auto">
              <a class="nav-link active small" href="#">الرئيسية</a>
              <a class="nav-link small" href="#">الدروس</a>
            </div>
            <button class="btn btn-primary btn-sm rounded-pill">دخول</button>
          </div>
        </nav>
      `,
      analysis: `
        <p><strong>تثبيت النافبار في الأعلى:</strong> لإبقاء شريط التنقل ظاهراً أمام الزائر طوال تصفحه للأسفل، يكفي إضافة كلاس <code>.sticky-top</code> دون الحاجة لكتابة كود جافاسكريبت لتتبع موضع التمرير (Scroll spy).</p>
      `,
      practice: {
        question: "ما هو الكلاس المسؤول عن تحديد متى ينبسط شريط التنقل (Navbar) ليصبح أفقياً بدل أن يكون زراً في الهواتف؟",
        options: [
          ".navbar-expand-lg (أو أي مقاس آخر مثل md)",
          ".navbar-horizontal",
          ".navbar-wide",
          ".nav-desktop"
        ],
        correctIndex: 0,
        explanation: "عائلة .navbar-expand-* هي المسؤولة عن نقطة التحول؛ فمثلاً expand-lg يعني ابسط القائمة في شاشات lg واطوها فيما دون ذلك."
      }
    },
    {
      id: 12,
      title: "12. Forms",
      titleAr: "النماذج والتحقق من صحة المدخلات (Forms & Validation)",
      badge: "النماذج",
      definition: {
        what: "حقول إدخال النصوص، القوائم المنسدلة، مربعات الاختيار، ونظام تلوين الأخطاء والنجاح.",
        why: "يوحد شكل الحقول على ويندوز وماك وأندرويد ويعطي إضاءة زرقاء متجاوبة وتنبيهات أخطاء واضحة فورياً.",
        when: "في نماذج تسجيل الحسابات، تسجيل الدورات، ونماذج التواصل."
      },
      visualDiagram: `
        <div class="p-3 border rounded bg-body">
          <div class="mb-2">
            <label class="form-label small fw-bold">حقل عادي: .form-control</label>
            <input type="text" class="form-control form-control-sm" placeholder="اكتب هنا...">
          </div>
          <div class="mb-2">
            <label class="form-label small fw-bold text-danger">حقل بحالة خطأ: is-invalid</label>
            <input type="text" class="form-control form-control-sm is-invalid" value="بريد غير صحيح">
            <div class="invalid-feedback small">الرجاء إدخال بريد إلكتروني صحيح!</div>
          </div>
        </div>
      `,
      code: `<form class="needs-validation" novalidate>
  <div class="mb-3">
    <label for="userEmail" class="form-label">البريد الإلكتروني</label>
    <input type="email" class="form-control" id="userEmail" required placeholder="name@example.com">
    <div class="invalid-feedback">يرجى كتابة بريد إلكتروني صحيح.</div>
  </div>
  <div class="mb-3">
    <label for="userCourse" class="form-label">اختر الدورة</label>
    <select class="form-select" id="userCourse" required>
      <option value="">اختر من القائمة...</option>
      <option value="1">تطوير المواقع بـ Bootstrap 5</option>
      <option value="2">علوم البيانات والذكاء الاصطناعي</option>
    </select>
  </div>
  <button class="btn btn-primary" type="submit">إرسال البيانات</button>
</form>`,
      codeExplanation: [
        { line: '.form-control', desc: 'يضبط عرض الحقل 100% مع هوامش مريحة وزوايا ناعمة وهالة تركيز عند النقر.' },
        { line: '.form-select', desc: 'تنسيق أنيق للقوائم المنسدلة مع سهم مخصص متوافق مع كل الأنظمة.' },
        { line: '.invalid-feedback', desc: 'رسالة الخطأ التي تظل مخفية ولا تظهر إلا عندما يضاف كلاس was-validated للنموذج.' }
      ],
      previewHtml: `
        <form onsubmit="event.preventDefault(); this.classList.add('was-validated');" class="p-3 border rounded bg-body needs-validation" novalidate>
          <div class="mb-2">
            <label class="form-label small fw-bold">الاسم الكامل</label>
            <input type="text" class="form-control form-control-sm" required placeholder="محمد علي">
            <div class="invalid-feedback small">هذا الحقل إجباري!</div>
          </div>
          <button class="btn btn-primary btn-sm rounded-pill" type="submit">اختبر التحقق (Validation)</button>
        </form>
      `,
      analysis: `
        <p><strong>طريقة عمل الفاليديشن:</strong> نضع الخاصية <code>novalidate</code> على وسم <code>&lt;form&gt;</code> لتعطيل رسائل المتصفح الافتراضية القبيحة. ثم بواسطة الجافاسكريبت نفحص <code>form.checkValidity()</code>، فإذا وجد خطأ يضيف كلاس <code>was-validated</code>، وهنا يتكفل بوتستراب بتلوين الحواف بالأحمر وإظهار رسائل <code>.invalid-feedback</code>.</p>
      `,
      practice: {
        question: "ما هو الكلاس المسؤول عن تنسيق حقول الإدخال النصية في بوتستراب وجعلها بعرض كامل وتنسيق أنيق؟",
        options: [
          ".form-control",
          ".input-field",
          ".bootstrap-input",
          ".text-input"
        ],
        correctIndex: 0,
        explanation: "كلاس .form-control هو الكلاس الأساسي المعتمد في بوتستراب لجميع حقول الإدخال مثل text و email و password و textarea."
      }
    },
    {
      id: 13,
      title: "13. Modals",
      titleAr: "النوافذ المنبثقة التفاعلية (Modals)",
      badge: "النوافذ",
      definition: {
        what: "صناديق حوار تطفو فوق محتوى الصفحة مع تعتيم الخلفية لتركيز انتباه المستخدم على مهمة معينة (تسجيل، تأكيد حذف، معاينة).",
        why: "تغنيك عن مغادرة الصفحة أو فتح صفحات جديدة، مما يجعل تجربة الاستخدام سلسة وسريعة.",
        when: "في نوافذ تسجيل الدخول السريع، رسائل التأكيد، وتفاصيل البطاقات."
      },
      visualDiagram: `
        <div class="p-3 border rounded bg-body text-center">
          <div class="p-3 border border-2 border-primary rounded-3 bg-body shadow mx-auto" style="max-width: 300px;">
            <div class="d-flex justify-content-between border-bottom pb-2 mb-2">
              <span class="fw-bold small">.modal-header</span>
              <button class="btn-close btn-sm"></button>
            </div>
            <div class="py-2 text-muted small">.modal-body (محتوى النافذة)</div>
            <div class="border-top pt-2 mt-2 d-flex justify-content-end gap-1">
              <span class="badge bg-secondary">إغلاق</span>
              <span class="badge bg-primary">حفظ</span>
            </div>
          </div>
        </div>
      `,
      code: `<!-- الزر الذي يفتح النافذة المنبثقة -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#demoModal">
  افتح النافذة المنبثقة
</button>

<!-- هيكل النافذة المنبثقة -->
<div class="modal fade" id="demoModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content rounded-4 border-0 shadow">
      <div class="modal-header border-0">
        <h5 class="modal-title fw-bold">تأكيد التسجيل في الدورة</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-muted">
        هل أنت متأكد من رغبتك في الانضمام إلى مسار Bootstrap 5 الشامل؟
      </div>
      <div class="modal-footer border-0">
        <button type="button" class="btn btn-light rounded-pill" data-bs-dismiss="modal">إلغاء</button>
        <button type="button" class="btn btn-primary rounded-pill px-4">تأكيد الانضمام</button>
      </div>
    </div>
  </div>
</div>`,
      codeExplanation: [
        { line: 'data-bs-toggle="modal"', desc: 'السمة التي تخبر محرك بوتستراب أن هذا الزر مخصص لفتح نافذة منبثقة.' },
        { line: 'data-bs-target="#demoModal"', desc: 'معرف الـ ID الخاص بالنافذة المراد فتحها.' },
        { line: 'modal-dialog-centered', desc: 'يجعل النافذة تتمركز في المنتصف رأسياً وأفقياً فوق الشاشة.' }
      ],
      previewHtml: `
        <div class="text-center p-3">
          <button type="button" class="btn btn-primary rounded-pill shadow-sm" onclick="alert('في بيئة العرض، المودال يفتح بسلاسة عبر data-bs-toggle=modal');">
            معاينة تجربة المودال <i class="bi bi-window-stack"></i>
          </button>
        </div>
      `,
      analysis: `
        <p><strong>تجنب تكرار المودال (مبدأ DRY):</strong> بدل إنشاء 10 مودال لـ 10 بطاقات دورات مختلفة، ننشئ مودالاً واحداً فقط في الصفحة، وباستخدام سطرين من JavaScript نغير عنوانه ونص الدورة ديناميكياً بحسب الزر الذي تم النقر عليه.</p>
      `,
      practice: {
        question: "أي كلاس يُضاف إلى .modal-dialog لكي تظهر النافذة المنبثقة موسطة رأسياً في قلب الشاشة بالضبط؟",
        options: [
          ".modal-dialog-centered",
          ".modal-center",
          ".modal-vertical-align",
          ".modal-middle"
        ],
        correctIndex: 0,
        explanation: "كلاس .modal-dialog-centered يحسب الهوامش الرأسية تلقائياً ليضع المودال في وسط الشاشة مباشرة."
      }
    },
    {
      id: 14,
      title: "14. Alerts & Toasts",
      titleAr: "التنبيهات والإشعارات العائمة (Alerts & Toasts)",
      badge: "الإشعارات",
      definition: {
        what: "صناديق تنبيه للمستخدم داخل الصفحة (Alerts) وإشعارات منبثقة عائمة تظهر في الزاوية وتختفي تلقائياً (Toasts).",
        why: "تخبر الزائر بنجاح العملية (تم الحفظ!) أو تنبهه لحدوث خطأ دون مقاطعة تصفحه.",
        when: "بعد إرسال النموذج، عند إضافة عنصر إلى السلة، أو عند حدوث انقطاع في الاتصال."
      },
      visualDiagram: `
        <div class="p-3 border rounded bg-body">
          <div class="alert alert-success d-flex align-items-center mb-2" role="alert">
            <i class="bi bi-check-circle-fill me-2 fs-5"></i>
            <div>تم تسجيل اشتراكك بنجاح! تفقد بريدك الإلكتروني.</div>
          </div>
          <div class="p-2 border rounded bg-body shadow-sm d-inline-block small">
            <div class="d-flex justify-content-between fw-bold border-bottom pb-1 mb-1">
              <span><i class="bi bi-bell-fill text-primary"></i> إشعار Toast</span>
              <span class="text-muted">الآن</span>
            </div>
            <div>تم نسخ الكود بنجاح إلى الحافظة!</div>
          </div>
        </div>
      `,
      code: `<!-- تنبيه نجاح قابل للإغلاق -->
<div class="alert alert-success alert-dismissible fade show rounded-3" role="alert">
  <i class="bi bi-check-circle-fill me-2"></i>
  <strong>رائع جداً!</strong> تم إرسال رسالتك بنجاح إلى فريق الأكاديمية.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`,
      codeExplanation: [
        { line: '.alert-success', desc: 'يطبق خلفية خضراء ناعمة مع نص داكن متناسق.' },
        { line: '.alert-dismissible', desc: 'يجهز التنبيه لاستقبال زر إغلاق (X) لحذفه بسلاسة.' }
      ],
      previewHtml: `
        <div class="alert alert-info alert-dismissible fade show rounded-3 mb-0" role="alert">
          <i class="bi bi-info-circle-fill me-2"></i>
          مرحباً بك! يمكنك تجربة الأكواد التفاعلية مباشرة في قسم المختبر.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `,
      analysis: `
        <p><strong>Toasts مقابل Alerts:</strong> التنبيه Alert يظل ثابتاً في مكانه داخل تدفق الصفحة. بينما الـ Toast يوضع غالباً داخل حاوية عائمة <code>.toast-container position-fixed bottom-0 end-0</code> ويختفي تلقائياً بعد 3 ثوانٍ.</p>
      `,
      practice: {
        question: "ما هو الكلاس المسؤول عن إضافة زر إغلاق (X) لتنبيه Alert وجعله يختفي عند النقر عليه؟",
        options: [
          ".alert-dismissible مع زر يحمل data-bs-dismiss='alert'",
          ".alert-closable",
          ".close-alert-btn",
          ".alert-remove"
        ],
        correctIndex: 0,
        explanation: "الدمج بين كلاس .alert-dismissible وزر يحمل السمة data-bs-dismiss='alert' هو الطريقة القياسية المدمجة في بوتستراب."
      }
    },
    {
      id: 15,
      title: "15. Carousel",
      titleAr: "شريط التمرير الدوار التفاعلي (Carousel)",
      badge: "الوسائط",
      definition: {
        what: "مكون دوار لعرض شرائح من الصور والنصوص بشكل متتالي وتلقائي مع أزرار التحكم بالمؤشرات.",
        why: "يعرض أكبر قدر من العروض والبانرات في مساحة واحدة دون الحاجة لتمرير الصفحة لأسفل.",
        when: "في واجهات المتاجر لعرض أحدث المنتجات، وأعلى صفحات الهبوط للترويج للفعاليات."
      },
      visualDiagram: `
        <div class="p-3 border rounded bg-body text-center">
          <div class="p-4 bg-dark text-white rounded position-relative">
            <div class="lead fw-bold">الشريحة 1 من 3: دورات جديدة لعام 2025</div>
            <div class="d-flex justify-content-center gap-1 mt-3">
              <span class="badge bg-light text-dark">●</span>
              <span class="badge bg-secondary">○</span>
              <span class="badge bg-secondary">○</span>
            </div>
          </div>
        </div>
      `,
      code: `<div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner rounded-4 shadow">
    <div class="carousel-item active">
      <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800" class="d-block w-100" alt="سلايد 1">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
        <h5>انطلاقة قوية في البرمجة</h5>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>`,
      codeExplanation: [
        { line: 'data-bs-ride="carousel"', desc: 'يبدأ التمرير التلقائي للشرائح بمجرد تحميل الصفحة.' },
        { line: 'carousel-item active', desc: 'تحديد الشريحة التي سيبدأ العرض منها أولاً.' }
      ],
      previewHtml: `
        <div class="p-4 bg-primary text-white rounded-3 text-center">
          <i class="bi bi-images fs-2 mb-2"></i>
          <h6 class="fw-bold">شريط Carousel التفاعلي</h6>
          <p class="small mb-0">يتيح التبديل السلس بين الشرائح مع أزرار التحكم والتمرير التلقائي.</p>
        </div>
      `,
      analysis: `
        <p><strong>تأثير التلاشي (Crossfade):</strong> إذا أردت أن تنتقل الصور عبر التلاشي الناعم بدلاً من الانزلاق الأفقي، يكفي إضافة كلاس <code>.carousel-fade</code> إلى الوسم الرئيسي.</p>
      `,
      practice: {
        question: "ما الكلاس الذي يجعل شرائح الكاروسيل تتلاشى بنعومة بدلاً من الانزلاق الأفقي السريع؟",
        options: [
          ".carousel-fade",
          ".carousel-smooth",
          ".fade-effect",
          ".carousel-transition"
        ],
        correctIndex: 0,
        explanation: "كلاس .carousel-fade يغير تأثير CSS الانتقالي إلى opacity fade لتصبح الحركة هادئة وفخمة."
      }
    },
    {
      id: 16,
      title: "16. Flexbox Utilities",
      titleAr: "أدوات الفليكس بوكس والتوزيع (Flexbox)",
      badge: "المحاذاة",
      definition: {
        what: "كلاسات جاهزة لتفعيل وتوجيه ومحاذاة عناصر CSS Flexible Box Layout.",
        why: "تتيح محاذاة العناصر رأسياً وأفقياً بدقة (مثل توسيط أيقونة مع نص، أو توزيع الأزرار يميناً ويساراً) بكلمة واحدة.",
        when: "في شرائط الأدوات، بطاقات المستخدمين، وتوسيط المحتويات في وسط الصفحة تماماً."
      },
      visualDiagram: `
        <div class="p-3 border rounded bg-body">
          <div class="d-flex justify-content-between align-items-center p-2 bg-light border rounded mb-2">
            <span class="badge bg-primary">بداية</span>
            <span class="small text-muted">justify-content-between</span>
            <span class="badge bg-success">نهاية</span>
          </div>
        </div>
      `,
      code: `<!-- تفعيل فليكس ومحاذاة عمودية في الوسط وتوزيع في الأطراف -->
<div class="d-flex justify-content-between align-items-center p-3 bg-light border rounded">
  <div class="d-flex align-items-center gap-2">
    <i class="bi bi-person-circle fs-3 text-primary"></i>
    <span class="fw-bold">محمد أمين</span>
  </div>
  <button class="btn btn-outline-primary btn-sm">عرض الملف</button>
</div>`,
      codeExplanation: [
        { line: '.d-flex', desc: 'display: flex لتفعيل نظام المرونة.' },
        { line: '.justify-content-between', desc: 'يضع المسافة الكاملة في الوسط ويدفع العنصر الأول لليمين والأخير لليسار.' },
        { line: '.align-items-center', desc: 'يحاذي العناصر عمودياً في الوسط بالضبط.' }
      ],
      previewHtml: `
        <div class="d-flex justify-content-between align-items-center p-3 bg-body border rounded">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-star-fill text-warning"></i>
            <span class="fw-bold small">تقييم الدورة</span>
          </div>
          <span class="badge bg-success">4.9 / 5</span>
        </div>
      `,
      analysis: `
        <p><strong>كلاس gap:</strong> في السابق كنا نضع هوامش margin على كل عنصر. في بوتستراب 5 نستخدم كلاس <code>gap-1</code> إلى <code>gap-5</code> مباشرة على الحاوية الفليكس لإنشاء فراغات متساوية بين الأبناء دون هوامش زائدة في الأطراف.</p>
      `,
      practice: {
        question: "أي كلاس يُستخدم لدفع عنصر إلى أقصى اليمين وعنصر آخر إلى أقصى اليسار داخل حاوية d-flex؟",
        options: [
          ".justify-content-between",
          ".justify-content-center",
          ".align-content-split",
          ".flex-split"
        ],
        correctIndex: 0,
        explanation: "كلاس justify-content-between يوزع الفراغات المتبقية بين العناصر بالتساوي دافعاً الأول والآخر للأطراف."
      }
    },
    {
      id: 17,
      title: "17. Bootstrap Icons",
      titleAr: "مكتبة الأيقونات الرسمية (Bootstrap Icons)",
      badge: "الأيقونات",
      definition: {
        what: "مكتبة متجهية SVG ضخمة ومجانية تضم أكثر من 2000 أيقونة عالية الجودة صممها نفس فريق Bootstrap.",
        why: "لا تحتاج صوراً خارجية ثقيلة، يمكن تلوينها وتكبيرها بنقاء تام عبر كلاسات الخطوط والألوان العادية.",
        when: "في الأزرار، القوائم، مؤشرات الحالة، وبطاقات الميزات."
      },
      visualDiagram: `
        <div class="d-flex gap-4 justify-content-center fs-2 text-primary p-3 border rounded bg-body">
          <i class="bi bi-heart-fill text-danger"></i>
          <i class="bi bi-lightning-charge-fill text-warning"></i>
          <i class="bi bi-shield-check text-success"></i>
          <i class="bi bi-code-slash text-primary"></i>
          <i class="bi bi-palette text-purple" style="color: #7952b3;"></i>
        </div>
      `,
      code: `<!-- استخدام وسم <i> مع كلاس الأيقونة والحجم واللون -->
<i class="bi bi-check2-circle text-success fs-3"></i>
<i class="bi bi-star-fill text-warning"></i>
<button class="btn btn-primary">
  <i class="bi bi-download me-2"></i> تحميل الملف
</button>`,
      codeExplanation: [
        { line: 'bi bi-check2-circle', desc: 'اسم الأيقونة من المكتبة الرسمية.' },
        { line: 'fs-3 & text-success', desc: 'التحكم في حجم الأيقونة ولونها بنفس كلاسات النصوص العادية.' }
      ],
      previewHtml: `
        <div class="d-flex gap-3 align-items-center justify-content-center">
          <span class="text-success"><i class="bi bi-check-circle-fill fs-4"></i> مكتمل</span>
          <span class="text-primary"><i class="bi bi-gear-fill fs-4"></i> إعدادات</span>
          <span class="text-danger"><i class="bi bi-heart-fill fs-4"></i> مفضلة</span>
        </div>
      `,
      analysis: `
        <p><strong>لماذا تفوق الأيقونات المتجهية؟</strong> أيقونات Bootstrap Icons بصيغة SVG Font لا تفقد جودتها إطلاقاً مهما قمت بتكبير الشاشة حتى على شاشات Retina العالية، وحجمها خفيف جداً في التنزيل.</p>
      `,
      practice: {
        question: "كيف نغير لون أيقونة Bootstrap Icons إلى اللون الأخضر؟",
        options: [
          "بإضافة كلاس الألوان النصي العادي .text-success",
          "بكتابة كود CSS مخصص icon-color: green",
          "بتحميل أيقونة خضراء جديدة من الموقع",
          "لا يمكن تلوين الأيقونات"
        ],
        correctIndex: 0,
        explanation: "أيقونات Bootstrap Icons تعامل كخط طباعي (Icon Font)، وتأخذ ألوانها تلقائياً من خاصية color عبر كلاسات text-*."
      }
    },
    {
      id: 18,
      title: "18. Customization",
      titleAr: "التخصيص الاحترافي وتعديل الهوية البصرية",
      badge: "التخصيص",
      definition: {
        what: "طريقة إضافة لمستك الشخصية وهوية الموقع عبر ملف CSS خارجي دون المساس بملفات Bootstrap الأصلية.",
        why: "حتى لا يبدو موقعك قالباً مكرراً شبيهاً بآلاف المواقع، مع الحفاظ على سهولة تحديث إطار العمل مستقبلاً.",
        when: "عند إضافة خطوط جديدة (مثل Cairo)، تدرجات لونية، ومؤثرات تحويم 3D للبطاقات."
      },
      visualDiagram: `
        <div class="p-3 border rounded bg-body text-center">
          <div class="row g-2">
            <div class="col-6">
              <div class="p-2 border border-danger text-danger rounded small">
                ❌ تعديل ملف bootstrap.min.css الأصلي (خطأ جسيم!)
              </div>
            </div>
            <div class="col-6">
              <div class="p-2 border border-success text-success rounded small fw-bold">
                ✔ إنشاء style.css خارجي واستدعاؤه بعد بوتستراب (الطريقة الصحيحة)
              </div>
            </div>
          </div>
        </div>
      `,
      code: `/* في ملفك الخارجي css/style.css */
:root {
  /* تعديل المتغيرات الرسمية */
  --bs-primary: #0d6efd;
  --bs-border-radius: 1rem;
}

/* إضافة مؤثر الرفع ثلاثي الأبعاد للبطاقات */
.custom-card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.custom-card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(13, 110, 253, 0.15) !important;
}`,
      codeExplanation: [
        { line: ':root', desc: 'تعديل متغيرات CSS في أعلى الشجرة ليطبق التغيير على كل المكونات تلقائياً.' },
        { line: '.custom-card-hover:hover', desc: 'تأثير ارتقاء أنيق عند تمرير الفأرة يعطي حيوية للتطبيق.' }
      ],
      previewHtml: `
        <div class="p-3 border rounded-3 bg-body text-center shadow-sm">
          <span class="badge bg-purple text-white mb-2" style="background-color: #7952b3;">تخصيص ناجح</span>
          <p class="mb-0 small fw-bold">تم تطبيق خط Cairo وتدرج الظلال بدون المساس بالأصل.</p>
        </div>
      `,
      analysis: `
        <p><strong>قاعدة التتالي في الـ CSS (Cascading):</strong> المتصفح يقرأ ملفات الـ CSS من الأعلى للأسفل. لذلك نستدعي ملف Bootstrap أولاً، ثم نستدعي <code>style.css</code> بعده مباشرة حتى تأخذ قواعدنا المخصصة الأولوية دون الحاجة لاستعمال <code>!important</code> بشكل عشوائي.</p>
      `,
      practice: {
        question: "أين يجب أن نربط ملف التنسيقات المخصص style.css في وسم head بالنسبة لملف بوتستراب؟",
        options: [
          "بعد ملف بوتستراب مباشرة لكي يتمكن من التعديل عليه بنظام التتالي",
          "قبل ملف بوتستراب",
          "في نهاية وسم body",
          "لا يهم الترتيب"
        ],
        correctIndex: 0,
        explanation: "في لغة CSS، القواعد المستدعاة لاحقاً هي التي تعلو وتطغى على ما قبلها، لذا نضعه بعد بوتستراب لنتحكم في التعديلات باحترافية."
      }
    },
    {
      id: 19,
      title: "19. Mini Projects",
      titleAr: "بناء النماذج والمشاريع المصغرة",
      badge: "التطبيق",
      definition: {
        what: "تجميع كل المكونات والشبكات التي تعلمتها لبناء أقسام حقيقية متكاملة: شريط علوي، صفحة هبوط، فورمولير، وبطاقات.",
        why: "الانتقال من مرحلة حفظ أسماء الكلاسات إلى مرحلة المهندس الذي يربط القطع لينتج موقعاً يعمل بسلاسة.",
        when: "الخطوة العملية الأساسية قبل البدء في المشروع النهائي."
      },
      visualDiagram: `
        <div class="p-3 border rounded bg-body text-center">
          <div class="d-flex justify-content-around flex-wrap gap-2">
            <span class="badge bg-primary p-2">1. Navbar متجاوب</span>
            <span class="badge bg-success p-2">2. Hero Banner</span>
            <span class="badge bg-info text-dark p-2">3. شبكة بطاقات</span>
            <span class="badge bg-warning text-dark p-2">4. نموذج تسجيل</span>
          </div>
        </div>
      `,
      code: `<!-- نموذج مصغر لصفحة هبوط سريعة -->
<section class="py-5 bg-light text-center">
  <div class="container py-4">
    <h1 class="display-5 fw-bold text-primary">ابدأ مسيرتك في عالم البرمجة</h1>
    <p class="lead text-muted col-lg-8 mx-auto">
      تعلم أحدث التقنيات مع مشاريع عملية وتوجيه مستمر يضمن تفوقك الأكاديمي والمهني.
    </p>
    <div class="d-flex justify-content-center gap-3">
      <button class="btn btn-primary btn-lg rounded-pill px-4">سجل الآن مجاناً</button>
      <button class="btn btn-outline-secondary btn-lg rounded-pill px-4">استكشف المسار</button>
    </div>
  </div>
</section>`,
      codeExplanation: [
        { line: 'py-5', desc: 'مسافة رأسية عملاقة للأقسام الترحيبية (3rem = 48px).' },
        { line: 'col-lg-8 mx-auto', desc: 'تقليص عرض الفقرة إلى 8 أعمدة مع توسيطها تلقائياً لراحة القراءة.' }
      ],
      previewHtml: `
        <div class="p-4 bg-body-tertiary border rounded text-center">
          <h5 class="fw-bold text-primary">واجهة قسم Landing Page مصغر</h5>
          <p class="text-muted small">جاهز للاستخدام ومبني بدمج الحاوية وأدوات التباعد والأزرار.</p>
          <button class="btn btn-primary btn-sm rounded-pill">تجربة حية</button>
        </div>
      `,
      analysis: `
        <p><strong>التفكير بالمكونات (Component Thinking):</strong> عند بناء أي صفحة، فككها إلى قطع: Header، Hero، Features، Form، Footer. كل قطعة تبدأ بـ <code>&lt;section class="py-5"&gt;</code> بداخلها <code>&lt;div class="container"&gt;</code> ثم <code>.row</code> و <code>.col</code>.</p>
      `,
      practice: {
        question: "ما هي الحاوية الأنسب للبدء بها لبناء قسم Hero Section يحتوي على عنوان في المنتصف وزرين؟",
        options: [
          "وسم section بهامش py-5 وبداخله container وتوسيط text-center",
          "وضع النصوص مباشرة في body",
          "استخدام وسم table قديم",
          "استخدام 20 وسم br متتالي"
        ],
        correctIndex: 0,
        explanation: "الهيكلة الدلالية السليمة هي section ثم container ثم التوسيط، لضمان مظهر متجاوب ومتناسق على كل الأجهزة."
      }
    },
    {
      id: 20,
      title: "20. Final Project",
      titleAr: "المشروع المتكامل واستراتيجية العرض والمناقشة",
      badge: "الاحتراف",
      definition: {
        what: "تتويج المسار ببناء موقع متكامل (مثل أكاديمية SkillUp) والاستعداد لتقديمه ومناقشته بثقة أمام الأستاذ في العرض الشفهي.",
        why: "لإثبات فهمك النظري والتطبيقي، وتحقيق العلامة الكاملة في المناقشة (Soutenance).",
        when: "المرحلة الختامية لتقديم المشروع ونيل الاعتماد."
      },
      visualDiagram: `
        <div class="p-3 border rounded bg-body text-center">
          <div class="row g-2">
            <div class="col-4"><div class="p-2 bg-success-subtle text-success rounded fw-bold">1. إتقان الكود</div></div>
            <div class="col-4"><div class="p-2 bg-primary-subtle text-primary rounded fw-bold">2. تجاوب الشاشات</div></div>
            <div class="col-4"><div class="p-2 bg-purple-subtle text-purple rounded fw-bold" style="color:#7952b3;">3. ثقة المناقشة</div></div>
          </div>
        </div>
      `,
      code: `// كود تفعيل فحص النماذج وإشعارات Toast في المشروع النهائي
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
});`,
      codeExplanation: [
        { line: 'form.checkValidity()', desc: 'دالة فحص صحة الحقول الإجبارية ونوع البيانات.' },
        { line: 'was-validated', desc: 'إضافة الكلاس الذي يطلق ألوان التنبيه الخضراء والحمراء.' }
      ],
      previewHtml: `
        <div class="p-4 bg-success bg-opacity-10 border border-success rounded text-center">
          <i class="bi bi-award-fill text-success fs-1 mb-2"></i>
          <h5 class="fw-bold text-success">مبروك! أتممت مسار Bootstrap 5 بالكامل</h5>
          <p class="small text-muted mb-0">أنت الآن جاهز لخوض الاختبار النهائي واستلام شهادة الإتقان.</p>
        </div>
      `,
      analysis: `
        <p><strong>نصيحة ذهبية للمناقشة:</strong> عندما يسألك الأستاذ، لا تسرد الكود كأنك تقرأ ورقة، بل افتح أداة الفحص (Inspect F12) وصغر الشاشة أمامه ليتحول النافبار إلى هامبرغر وتنزل الكروت بسلاسة. الشرح البصري العملي هو ما يقنع لجان التحكيم ويمنحك العلامات العالية.</p>
      `,
      practice: {
        question: "ما هو السلوك الأمثل أثناء عرض مشروعك أمام الأستاذ لإثبات قوة التجاوب (Responsive Design)؟",
        options: [
          "فتح أداة الفحص F12 في المتصفح وتصغير حجم الشاشة بالتدريج لإظهار تحول الشبكة عملياً",
          "التحدث بسرعة بدون فتح الموقع",
          "القول بأن الموقع يعمل على حاسوبك فقط",
          "إغلاق المتصفح وقراءة الشرائح فقط"
        ],
        correctIndex: 0,
        explanation: "العرض المباشر وتصغير الشاشة أمام أعين الأستاذ يثبت بالدليل القاطع أن كودك متجاوب ونظيف ويعمل بدون أخطاء."
      }
    }
  ];

  // 6. RENDER: 20 Roadmap Nodes
  const roadmapGrid = document.getElementById('roadmap-grid');
  if (roadmapGrid) {
    roadmapGrid.innerHTML = LESSONS_DATA.map((lesson, idx) => {
      const isCompleted = STATE.completedLessons.includes(lesson.id);
      return `
        <div class="roadmap-node ${isCompleted ? 'completed' : ''}" data-lesson-id="${lesson.id}">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="roadmap-badge ${isCompleted ? 'bg-success text-white' : 'bg-primary text-white'}">
              ${lesson.id}
            </span>
            <span class="badge bg-secondary-subtle text-secondary rounded-pill small">${lesson.badge}</span>
          </div>
          <div>
            <h6 class="fw-bold mb-1">${lesson.title}</h6>
            <p class="text-muted small mb-2">${lesson.titleAr}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center pt-2 border-top">
            <span class="small text-primary fw-bold">افتح الدرس <i class="bi bi-arrow-left"></i></span>
            <i class="${isCompleted ? 'bi bi-check-circle-fill text-success' : 'bi bi-circle text-muted'} completion-icon fs-5"></i>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events on nodes
    document.querySelectorAll('.roadmap-node').forEach(node => {
      node.addEventListener('click', () => {
        const id = parseInt(node.getAttribute('data-lesson-id'), 10);
        openLesson(id);
      });
    });
  }

  // 7. LESSON VIEWER ENGINE (Render the 6 Pillars)
  function openLesson(lessonId) {
    const lesson = LESSONS_DATA.find(l => l.id === lessonId);
    if (!lesson) return;
    STATE.activeLessonId = lessonId;

    const lessonViewer = document.getElementById('lesson-viewer-container');
    if (!lessonViewer) return;

    lessonViewer.innerHTML = `
      <div class="card custom-card border-0 p-4 p-md-5 mb-4 animate__animated animate__fadeIn">
        <!-- Lesson Header -->
        <div class="d-flex justify-content-between align-items-start flex-wrap gap-3 pb-4 border-bottom mb-4">
          <div>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="badge bg-primary px-3 py-2 rounded-pill fs-6">المرحلة ${lesson.id} من 20</span>
              <span class="badge bg-purple text-white px-3 py-2 rounded-pill fs-6" style="background-color: #7952b3;">${lesson.badge}</span>
            </div>
            <h2 class="fw-black mb-1">${lesson.title}</h2>
            <h4 class="text-primary fw-bold mb-0">${lesson.titleAr}</h4>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-success rounded-pill px-3" id="btn-toggle-complete">
              <i class="bi ${STATE.completedLessons.includes(lesson.id) ? 'bi-check-circle-fill' : 'bi-check-circle'} me-1"></i>
              <span>${STATE.completedLessons.includes(lesson.id) ? 'مكتمل بنجاح' : 'تحديد كمكتمل'}</span>
            </button>
          </div>
        </div>

        <!-- Pillar 1: Definition (التعريف) -->
        <div class="mb-5">
          <h4 class="fw-bold text-primary mb-3 d-flex align-items-center gap-2">
            <i class="bi bi-bookmark-star-fill"></i> أولاً: التعريف النظري والوظيفي
          </h4>
          <div class="row g-3">
            <div class="col-md-4">
              <div class="p-3 bg-body-tertiary border rounded-3 h-100">
                <h6 class="fw-bold text-primary"><i class="bi bi-question-circle me-1"></i> ما هو هذا المفهوم؟</h6>
                <p class="small text-muted mb-0 leading-relaxed">${lesson.definition.what}</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 bg-body-tertiary border rounded-3 h-100">
                <h6 class="fw-bold text-success"><i class="bi bi-lightbulb me-1"></i> لماذا نستخدمه؟</h6>
                <p class="small text-muted mb-0 leading-relaxed">${lesson.definition.why}</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 bg-body-tertiary border rounded-3 h-100">
                <h6 class="fw-bold text-purple" style="color: #7952b3;"><i class="bi bi-clock-history me-1"></i> متى نحتاجه؟</h6>
                <p class="small text-muted mb-0 leading-relaxed">${lesson.definition.when}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pillar 2: Visual Explanation (الشرح البصري والمخططات) -->
        <div class="mb-5">
          <h4 class="fw-bold text-primary mb-3 d-flex align-items-center gap-2">
            <i class="bi bi-diagram-3-fill"></i> ثانياً: الشرح البصري والمخطط التفاعلي
          </h4>
          <div class="flow-diagram-box">
            ${lesson.visualDiagram}
          </div>
        </div>

        <!-- Pillar 3: Code with Syntax & Line Explanation (الكود البرمجي وشرح الكلاسات) -->
        <div class="mb-5">
          <h4 class="fw-bold text-primary mb-3 d-flex align-items-center gap-2">
            <i class="bi bi-code-slash"></i> ثالثاً: الكود البرمجي مع تفكيك الكلاسات
          </h4>
          <div class="code-container mb-3">
            <div class="code-header">
              <span><i class="bi bi-file-earmark-code me-1"></i> HTML5 + Bootstrap 5.3</span>
              <button class="code-copy-btn" onclick="navigator.clipboard.writeText(this.getAttribute('data-code')); this.innerHTML='<i class=\\'bi bi-check\\'></i> تم النسخ!'; setTimeout(()=>this.innerHTML='<i class=\\'bi bi-copy\\'></i> نسخ الكود', 2000);" data-code="${escapeHtml(lesson.code)}">
                <i class="bi bi-copy"></i> نسخ الكود
              </button>
            </div>
            <pre class="p-3 m-0"><code class="language-html">${escapeHtml(lesson.code)}</code></pre>
          </div>

          <div class="card bg-body-tertiary border-0 p-3 rounded-3">
            <h6 class="fw-bold mb-2">تفكيك الكلاسات والوسوم سطر بسطر:</h6>
            <ul class="list-group list-group-flush bg-transparent">
              ${lesson.codeExplanation.map(item => `
                <li class="list-group-item bg-transparent d-flex align-items-start gap-2 py-2">
                  <code class="text-primary fw-bold" dir="ltr">${escapeHtml(item.line)}</code>
                  <span class="text-muted small">${item.desc}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Pillar 4: Live Result Preview (النتيجة الفعلية المباشرة) -->
        <div class="mb-5">
          <h4 class="fw-bold text-primary mb-3 d-flex align-items-center gap-2">
            <i class="bi bi-play-circle-fill"></i> رابعاً: المعاينة الحية المباشرة (Live Preview)
          </h4>
          <div class="live-preview-box">
            ${lesson.previewHtml}
          </div>
        </div>

        <!-- Pillar 5: Deep Technical Analysis (التحليل التقني والعلاقة مع CSS) -->
        <div class="mb-5">
          <h4 class="fw-bold text-primary mb-3 d-flex align-items-center gap-2">
            <i class="bi bi-cpu-fill"></i> خامساً: التحليل التقني المعمق ومقارنة CSS
          </h4>
          <div class="p-4 bg-primary bg-opacity-10 border border-primary-subtle rounded-3 leading-relaxed">
            ${lesson.analysis}
          </div>
        </div>

        <!-- Pillar 6: Practice & Assessment (التطبيق والتمرين العملي) -->
        <div class="mb-4">
          <h4 class="fw-bold text-primary mb-3 d-flex align-items-center gap-2">
            <i class="bi bi-patch-question-fill"></i> سادساً: التحقق من الفهم والتمرين العملي
          </h4>
          <div class="card p-4 border rounded-3 bg-body shadow-sm">
            <h5 class="fw-bold mb-3">${lesson.practice.question}</h5>
            <div class="d-flex flex-column gap-2 mb-3" id="lesson-quiz-options">
              ${lesson.practice.options.map((opt, oIdx) => `
                <button class="quiz-option-btn" data-opt-index="${oIdx}">
                  <span class="badge bg-secondary-subtle text-secondary me-2">${oIdx + 1}</span>
                  <span>${opt}</span>
                </button>
              `).join('')}
            </div>
            <div id="lesson-quiz-feedback" class="d-none p-3 rounded-3 mt-2"></div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="d-flex justify-content-between align-items-center pt-4 border-top mt-4">
          <button class="btn btn-outline-secondary rounded-pill px-4" ${lesson.id === 1 ? 'disabled' : ''} id="btn-prev-lesson">
            <i class="bi bi-arrow-right me-1"></i> الدرس السابق
          </button>
          <span class="fw-bold text-muted">${lesson.id} / 20</span>
          <button class="btn btn-primary rounded-pill px-4" ${lesson.id === 20 ? 'disabled' : ''} id="btn-next-lesson">
            الدرس الموالي <i class="bi bi-arrow-left ms-1"></i>
          </button>
        </div>

      </div>
    `;

    // Handle Practice Option Click
    const optionBtns = document.querySelectorAll('#lesson-quiz-options .quiz-option-btn');
    const feedbackBox = document.getElementById('lesson-quiz-feedback');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = parseInt(btn.getAttribute('data-opt-index'), 10);
        optionBtns.forEach(b => b.classList.remove('selected', 'correct', 'incorrect'));
        if (selected === lesson.practice.correctIndex) {
          btn.classList.add('correct');
          feedbackBox.className = 'p-3 rounded-3 mt-2 bg-success-subtle text-success border border-success d-block';
          feedbackBox.innerHTML = `<strong>إجابة ممتازة وصحيحة! ✔</strong><br><small>${lesson.practice.explanation}</small>`;
        } else {
          btn.classList.add('incorrect');
          feedbackBox.className = 'p-3 rounded-3 mt-2 bg-danger-subtle text-danger border border-danger d-block';
          feedbackBox.innerHTML = `<strong>إجابة غير صحيحة، حاول مجدداً! ✖</strong><br><small>${lesson.practice.explanation}</small>`;
        }
      });
    });

    // Handle Toggle Complete with Supabase Cloud Sync
    const completeBtn = document.getElementById('btn-toggle-complete');
    if (completeBtn) {
      completeBtn.addEventListener('click', async () => {
        if (STATE.completedLessons.includes(lesson.id)) {
          STATE.completedLessons = STATE.completedLessons.filter(id => id !== lesson.id);
        } else {
          STATE.completedLessons.push(lesson.id);
        }
        localStorage.setItem('bs_academy_completed', JSON.stringify(STATE.completedLessons));
        updateProgressUI();
        openLesson(lesson.id); // Re-render button state

        // Auto sync with Supabase if logged in
        if (STATE.currentUser) {
          const percent = Math.round((STATE.completedLessons.length / 20) * 100);
          await saveProgress(STATE.currentUser.id, {
            completed_lessons: STATE.completedLessons,
            current_lesson_id: lesson.id,
            progress_percent: percent,
          });
        }
      });
    }

    // Handle Next/Prev
    const prevBtn = document.getElementById('btn-prev-lesson');
    const nextBtn = document.getElementById('btn-next-lesson');
    if (prevBtn) prevBtn.addEventListener('click', () => openLesson(lesson.id - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => openLesson(lesson.id + 1));

    switchSection('lessons');
  }

  // 8. INTERACTIVE 12-COLUMN GRID SIMULATOR
  function initGridSimulator() {
    const colSlider = document.getElementById('grid-col-slider');
    const colCountDisplay = document.getElementById('grid-col-count-display');
    const visualRow = document.getElementById('grid-visual-row');
    const generatedCode = document.getElementById('grid-generated-code');
    const bpButtons = document.querySelectorAll('[data-bp-btn]');

    if (!colSlider || !visualRow) return;

    function renderGrid() {
      const count = parseInt(colSlider.value, 10);
      const span = Math.floor(12 / count);
      STATE.activeGridCols = count;

      if (colCountDisplay) colCountDisplay.textContent = `${count} أعمدة (كل عمود يستهلك col-${span})`;

      let boxesHtml = '';
      for (let i = 1; i <= count; i++) {
        boxesHtml += `
          <div class="col-${span}">
            <div class="grid-col-box">
              <span>col-${span}</span>
              <div class="small opacity-75">عمود ${i}</div>
            </div>
          </div>
        `;
      }
      visualRow.innerHTML = boxesHtml;

      if (generatedCode) {
        generatedCode.textContent = `<div class="container">\n  <div class="row g-3">\n${Array(count).fill(0).map((_, i) => `    <div class="col-${span}">العمود ${i + 1}</div>`).join('\n')}\n  </div>\n</div>`;
      }
    }

    colSlider.addEventListener('input', renderGrid);
    renderGrid();

    bpButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        bpButtons.forEach(b => b.classList.remove('btn-primary'));
        bpButtons.forEach(b => b.classList.add('btn-outline-primary'));
        btn.classList.remove('btn-outline-primary');
        btn.classList.add('btn-primary');
        const bp = btn.getAttribute('data-bp-btn');
        STATE.currentBreakpoint = bp;
        const container = document.getElementById('grid-simulation-viewport');
        if (container) {
          if (bp === 'xs') container.style.maxWidth = '375px';
          else if (bp === 'md') container.style.maxWidth = '768px';
          else container.style.maxWidth = '100%';
        }
      });
    });
  }
  initGridSimulator();

  // 9. INTERACTIVE COMPONENTS LIBRARY DATA
  const COMPONENTS_DATA = [
    {
      id: 'navbar',
      name: 'Navbar (شريط التنقل)',
      desc: 'شريط تصفح متجاوب يضم شعار الموقع، الروابط، زر البحث، ومفتاح الوضع المظلم.',
      classes: '.navbar, .navbar-expand-lg, .navbar-toggler, .collapse',
      code: `<nav class="navbar navbar-expand-lg bg-body-tertiary rounded-3 shadow-sm p-3">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold text-primary" href="#">أكاديمية بوتستراب</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navDemo">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navDemo">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link active" href="#">الرئيسية</a></li>
        <li class="nav-item"><a class="nav-link" href="#">الدروس</a></li>
        <li class="nav-item"><a class="nav-link" href="#">المشاريع</a></li>
      </ul>
      <button class="btn btn-primary btn-sm rounded-pill px-3">تسجيل الدخول</button>
    </div>
  </div>
</nav>`,
      preview: `<nav class="navbar navbar-expand bg-body-tertiary border rounded p-2">
  <span class="navbar-brand fw-bold text-primary fs-6">أكاديمية بوتستراب</span>
  <div class="navbar-nav me-auto">
    <a class="nav-link active small" href="#">الرئيسية</a>
    <a class="nav-link small" href="#">المشاريع</a>
  </div>
  <button class="btn btn-primary btn-sm rounded-pill">دخول</button>
</nav>`
    },
    {
      id: 'cards',
      name: 'Cards (البطاقات التفاعلية)',
      desc: 'حاويات محتوى مرنة مع ترويسة، صورة، جسم البطاقة، وأزرار النداء للعمل.',
      classes: '.card, .card-body, .card-title, .card-img-top, .card-footer',
      code: `<div class="card shadow-sm border-0 rounded-4 overflow-hidden" style="max-width: 20rem;">
  <div class="p-4 bg-primary text-white text-center"><i class="bi bi-code-slash fs-1"></i></div>
  <div class="card-body">
    <span class="badge bg-primary-subtle text-primary mb-2">جديد</span>
    <h5 class="card-title fw-bold">دورة Bootstrap 5 المتقدمة</h5>
    <p class="card-text text-muted small">شرح شامل لنظام الـ 12 عمود والمكونات التفاعلية.</p>
    <a href="#" class="btn btn-primary btn-sm rounded-pill w-100">سجل الآن</a>
  </div>
</div>`,
      preview: `<div class="card shadow-sm border-0 rounded-4 overflow-hidden mx-auto" style="max-width: 18rem;">
  <div class="p-3 bg-primary text-white text-center"><i class="bi bi-laptop fs-2"></i></div>
  <div class="card-body p-3">
    <span class="badge bg-primary-subtle text-primary mb-1">دورة احترافية</span>
    <h6 class="card-title fw-bold">تطوير واجهات الويب</h6>
    <p class="card-text text-muted small mb-2">أتقن بناء الواجهات المتجاوبة وسجل إعجاب الجميع بمشروعك.</p>
    <button class="btn btn-primary btn-sm w-100 rounded-pill">ابدأ الدورة</button>
  </div>
</div>`
    },
    {
      id: 'buttons',
      name: 'Buttons (الأزرار والشارات)',
      desc: 'أزرار بألوان دلالية وأشكال مستديرة وإطارات مفرغة وتأثيرات تركيز متناسقة.',
      classes: '.btn, .btn-primary, .btn-outline-*, .btn-lg, .rounded-pill',
      code: `<button class="btn btn-primary">أساسي</button>
<button class="btn btn-outline-success">مفرغ إطار</button>
<button class="btn btn-danger rounded-pill px-4">دائري كبسولة</button>`,
      preview: `<div class="d-flex flex-wrap gap-2 justify-content-center">
  <button class="btn btn-primary shadow-sm">تأكيد التسجيل</button>
  <button class="btn btn-outline-secondary">إلغاء</button>
  <button class="btn btn-success rounded-pill px-3">مكتمل <i class="bi bi-check"></i></button>
</div>`
    },
    {
      id: 'alerts',
      name: 'Alerts & Toasts (التنبيهات والإشعارات)',
      desc: 'رسائل ملفتة بألوان دلالية لإشعار المستخدم بنجاح العملية أو التحذير من خطأ.',
      classes: '.alert, .alert-success, .alert-dismissible, .toast',
      code: `<div class="alert alert-success alert-dismissible fade show rounded-3" role="alert">
  <i class="bi bi-check-circle-fill me-2"></i> تم حفظ التعديلات بنجاح!
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>`,
      preview: `<div class="alert alert-success alert-dismissible fade show rounded-3 mb-0" role="alert">
  <i class="bi bi-check-circle-fill me-2"></i> تم حفظ التعديلات بنجاح!
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>`
    },
    {
      id: 'modals',
      name: 'Modals (النوافذ المنبثقة)',
      desc: 'نوافذ حوارية تطفو في وسط الشاشة لتسجيل الدخول أو تأكيد الحذف.',
      classes: '.modal, .modal-dialog, .modal-content, .modal-dialog-centered',
      code: `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mDemo">فتح النافذة</button>`,
      preview: `<div class="p-3 bg-body-tertiary border rounded text-center">
  <button class="btn btn-primary rounded-pill btn-sm" onclick="alert('في بيئة العرض المودال يفتح عبر كود Bootstrap الرسمي');">معاينة زر المودال</button>
</div>`
    },
    {
      id: 'forms',
      name: 'Forms (النماذج والمدخلات)',
      desc: 'حقول نصوص وقوائم منسدلة ومربعات اختيار مع الفحص والتأكد التلقائي.',
      classes: '.form-control, .form-select, .form-check-input, .needs-validation',
      code: `<input type="text" class="form-control" placeholder="اكتب اسمك...">`,
      preview: `<input type="text" class="form-control form-control-sm" placeholder="اكتب اسمك هنا...">`
    },
    {
      id: 'accordion',
      name: 'Accordion (القوائم المطوية والأسئلة الشائعة)',
      desc: 'عنصر لطي وفتح الأقسام والأسئلة الشائعة بنقرة واحدة لتوفير مساحة الصفحة.',
      classes: '.accordion, .accordion-item, .accordion-header, .accordion-collapse',
      code: `<div class="accordion" id="accExample">
  <div class="accordion-item">
    <h2 class="accordion-header"><button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#c1">سؤال 1</button></h2>
    <div id="c1" class="accordion-collapse collapse show"><div class="accordion-body">جواب السؤال...</div></div>
  </div>
</div>`,
      preview: `<div class="accordion" id="accPrev">
  <div class="accordion-item">
    <h2 class="accordion-header"><button class="accordion-button py-2 small" data-bs-toggle="collapse" data-bs-target="#cp1">ما هو نظام الـ 12 عمود؟</button></h2>
    <div id="cp1" class="accordion-collapse collapse show"><div class="accordion-body small text-muted">هو نظام تقسيم رياضي يقسم السطر لـ 12 جزءاً متساوياً.</div></div>
  </div>
</div>`
    },
    {
      id: 'pagination',
      name: 'Pagination (ترقيم الصفحات)',
      desc: 'أزرار ترقيم تتيح للزائر التنقل بين صفحات المقالات والمنتجات الطويلة.',
      classes: '.pagination, .page-item, .page-link',
      code: `<ul class="pagination">
  <li class="page-item disabled"><a class="page-link" href="#">السابق</a></li>
  <li class="page-item active"><a class="page-link" href="#">1</a></li>
  <li class="page-item"><a class="page-link" href="#">2</a></li>
  <li class="page-item"><a class="page-link" href="#">التالي</a></li>
</ul>`,
      preview: `<ul class="pagination pagination-sm justify-content-center mb-0">
  <li class="page-item disabled"><a class="page-link" href="#">السابق</a></li>
  <li class="page-item active"><a class="page-link" href="#">1</a></li>
  <li class="page-item"><a class="page-link" href="#">2</a></li>
  <li class="page-item"><a class="page-link" href="#">التالي</a></li>
</ul>`
    },
    {
      id: 'progress',
      name: 'Progress Bars (أشرطة التقدم)',
      desc: 'أشرطة توضح نسبة الإنجاز والتحميل بدقة وألوان دلالية.',
      classes: '.progress, .progress-bar, .progress-bar-striped, .progress-bar-animated',
      code: `<div class="progress" style="height: 20px;">
  <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" style="width: 75%;">75%</div>
</div>`,
      preview: `<div class="progress" style="height: 18px;">
  <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" style="width: 80%;">80% مكتمل</div>
</div>`
    }
  ];

  const componentsGrid = document.getElementById('components-showcase-grid');
  if (componentsGrid) {
    componentsGrid.innerHTML = COMPONENTS_DATA.map(comp => `
      <div class="col-md-6 col-lg-4">
        <div class="card custom-card h-100 p-4 border">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="fw-bold text-primary mb-0">${comp.name}</h5>
            <span class="badge bg-primary-subtle text-primary">جاهز</span>
          </div>
          <p class="text-muted small mb-3">${comp.desc}</p>
          <div class="p-3 bg-body-tertiary border rounded mb-3">
            <span class="text-muted small d-block mb-1">المعاينة الحية:</span>
            ${comp.preview}
          </div>
          <div class="code-container mb-2">
            <div class="code-header py-1">
              <span class="small font-monospace">${comp.classes}</span>
              <button class="code-copy-btn py-0 px-2" onclick="navigator.clipboard.writeText(this.getAttribute('data-c')); this.textContent='تم!'; setTimeout(()=>this.textContent='نسخ', 1500);" data-c="${escapeHtml(comp.code)}">نسخ</button>
            </div>
            <pre class="p-2 m-0" style="max-height: 120px;"><code class="small language-html">${escapeHtml(comp.code)}</code></pre>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 10. INTERACTIVE PLAYGROUND ENGINE
  const playgroundEditor = document.getElementById('playground-code-input');
  const playgroundPreview = document.getElementById('playground-live-frame');
  const playgroundTemplateSelect = document.getElementById('playground-template-select');
  const playgroundRunBtn = document.getElementById('playground-run-btn');
  const playgroundResetBtn = document.getElementById('playground-reset-btn');
  const playgroundCopyBtn = document.getElementById('playground-copy-btn');

  const PLAYGROUND_TEMPLATES = {
    hero: `<div class="p-5 text-center bg-body-tertiary rounded-4 shadow-sm border">
  <span class="badge bg-primary px-3 py-2 rounded-pill mb-3">مرحباً بك</span>
  <h1 class="display-5 fw-bold text-primary">واجهة استعراضية متجاوبة</h1>
  <p class="lead text-muted col-lg-8 mx-auto">
    عدل هذا الكود مباشرة وشاهد التغيير فوراً في المعاينة الحية!
  </p>
  <button class="btn btn-primary btn-lg rounded-pill px-4">جرب الآن</button>
</div>`,
    cards: `<div class="row g-3">
  <div class="col-md-6">
    <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
      <div class="p-4 bg-primary text-white text-center"><i class="bi bi-lightning-charge fs-1"></i></div>
      <div class="card-body">
        <h5 class="fw-bold">البطاقة الأولى</h5>
        <p class="text-muted small">كود متجاوب يتكيف مع الشاشات.</p>
        <button class="btn btn-primary btn-sm rounded-pill w-100">تفاصيل</button>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
      <div class="p-4 bg-success text-white text-center"><i class="bi bi-shield-check fs-1"></i></div>
      <div class="card-body">
        <h5 class="fw-bold">البطاقة الثانية</h5>
        <p class="text-muted small">تصميم عصري بدون سطر CSS خارجي.</p>
        <button class="btn btn-success btn-sm rounded-pill w-100">تفاصيل</button>
      </div>
    </div>
  </div>
</div>`,
    form: `<div class="card p-4 border-0 shadow-sm rounded-4" style="max-width: 400px; margin: auto;">
  <h4 class="fw-bold text-center text-primary mb-3">تسجيل الدخول</h4>
  <div class="mb-3">
    <label class="form-label small fw-bold">البريد الإلكتروني</label>
    <input type="email" class="form-control" placeholder="name@example.com">
  </div>
  <div class="mb-3">
    <label class="form-label small fw-bold">كلمة المرور</label>
    <input type="password" class="form-control" placeholder="••••••••">
  </div>
  <button class="btn btn-primary rounded-pill w-100 py-2 fw-bold">دخول الآن</button>
</div>`
  };

  function runPlaygroundCode() {
    if (!playgroundEditor || !playgroundPreview) return;
    const code = playgroundEditor.value;
    playgroundPreview.innerHTML = code;
  }

  if (playgroundEditor && playgroundPreview) {
    playgroundEditor.value = PLAYGROUND_TEMPLATES.hero;
    runPlaygroundCode();

    if (playgroundRunBtn) playgroundRunBtn.addEventListener('click', runPlaygroundCode);
    playgroundEditor.addEventListener('input', runPlaygroundCode);

    if (playgroundTemplateSelect) {
      playgroundTemplateSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (PLAYGROUND_TEMPLATES[val]) {
          playgroundEditor.value = PLAYGROUND_TEMPLATES[val];
          runPlaygroundCode();
        }
      });
    }

    if (playgroundResetBtn) {
      playgroundResetBtn.addEventListener('click', () => {
        playgroundEditor.value = PLAYGROUND_TEMPLATES.hero;
        if (playgroundTemplateSelect) playgroundTemplateSelect.value = 'hero';
        runPlaygroundCode();
      });
    }

    if (playgroundCopyBtn) {
      playgroundCopyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(playgroundEditor.value);
        playgroundCopyBtn.innerHTML = '<i class="bi bi-check-lg"></i> تم النسخ!';
        setTimeout(() => {
          playgroundCopyBtn.innerHTML = '<i class="bi bi-copy"></i> نسخ الكود';
        }, 2000);
      });
    }
  }

  // 11. GUIDED MINI PROJECTS DATA
  const PROJECTS_DATA = [
    {
      id: 1,
      title: "1. إنشاء شريط تنقل احترافي متجاوب (Navbar)",
      desc: "بناء شريط علوي كامل مع شعار، روابط، وزر قائمة الهاتف المحمول القابل للطي.",
      features: ["يدعم الشاشات الصغيرة والكبيرة", "ثابت في الأعلى عبر .sticky-top", "متوافق 100% مع RTL"],
      code: `<nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold text-primary" href="#">
      <i class="bi bi-bootstrap-fill me-1"></i> أكاديميتي
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#projNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="projNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link active" href="#">الرئيسية</a></li>
        <li class="nav-item"><a class="nav-link" href="#">المسارات</a></li>
        <li class="nav-item"><a class="nav-link" href="#">تواصل معنا</a></li>
      </ul>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary rounded-pill btn-sm px-3">تسجيل الدخول</button>
        <button class="btn btn-primary rounded-pill btn-sm px-3">حساب جديد</button>
      </div>
    </div>
  </div>
</nav>`
    },
    {
      id: 2,
      title: "2. صفحة هبوط عصرية (Landing Page)",
      desc: "تصميم واجهة متكاملة مع Hero Section، إحصائيات، وبطاقات مميزات ثلاثية الأبعاد.",
      features: ["بانر ترحيبي عالي التباين", "شبكة 3 أعمدة للمميزات", "أزرار نداء للعمل جذابة"],
      code: `<section class="py-5 bg-primary bg-opacity-10 text-center">
  <div class="container py-4">
    <span class="badge bg-primary px-3 py-2 rounded-pill mb-3">الجيل الجديد من التعليم</span>
    <h1 class="display-4 fw-black text-primary">طور مهاراتك في بناء الواجهات</h1>
    <p class="lead text-muted col-lg-8 mx-auto mb-4">
      منصة تفاعلية تدمج بين النظرية والتطبيق العملي لتمكينك من احتراف Bootstrap 5.
    </p>
    <div class="d-flex justify-content-center gap-3">
      <button class="btn btn-primary btn-lg rounded-pill px-4 shadow">ابدأ التعلم الآن</button>
      <button class="btn btn-outline-secondary btn-lg rounded-pill px-4">مشاهدة الفيديو</button>
    </div>
  </div>
</section>`
    },
    {
      id: 3,
      title: "3. بطاقات متجاوبة لكتالوج المنتجات أو الدورات",
      desc: "توزيع بطاقات متساوية الارتفاع مع صور وعناوين وتصفية سريعة.",
      features: ["3 بطاقات في الحاسوب واثنتان في التابلت وواحدة في الهاتف", "تساوي الارتفاع عبر .h-100", "أزرار تسجيل مباشرة"],
      code: `<div class="container py-4">
  <div class="row g-4">
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
        <div class="p-4 bg-primary text-white text-center"><i class="bi bi-laptop fs-1"></i></div>
        <div class="card-body">
          <span class="badge bg-primary-subtle text-primary mb-2">دورة</span>
          <h5 class="fw-bold">تطوير الويب الشامل</h5>
          <p class="text-muted small">تعلم لغات الويب الأساسية من الصفر.</p>
        </div>
      </div>
    </div>
    <!-- كرر الأعمدة بنفس الطريقة -->
  </div>
</div>`
    },
    {
      id: 4,
      title: "4. نموذج تسجيل متكامل مع التحقق (Validation)",
      desc: "فورمولير احترافي لحساب جديد مع فحص البريد وكلمة المرور وحالة الخطأ والنجاح.",
      features: ["فحص فوري HTML5 + JS", "رسائل توجيهية خضراء وحمراء", "تصميم بطاقة مريحة للعين"],
      code: `<form class="needs-validation p-4 bg-body rounded-4 shadow-sm border" novalidate>
  <h4 class="fw-bold text-center text-primary mb-4">إنشاء حساب جديد</h4>
  <div class="mb-3">
    <label class="form-label small fw-bold">الاسم الكامل</label>
    <input type="text" class="form-control" required placeholder="أحمد محمد">
    <div class="invalid-feedback">يرجى إدخال اسمك.</div>
  </div>
  <div class="mb-3">
    <label class="form-label small fw-bold">البريد الإلكتروني</label>
    <input type="email" class="form-control" required placeholder="name@example.com">
    <div class="invalid-feedback">يرجى إدخال بريد إلكتروني صحيح.</div>
  </div>
  <button class="btn btn-primary rounded-pill w-100 py-2 fw-bold" type="submit">تسجيل الحساب</button>
</form>`
    },
    {
      id: 5,
      title: "5. لوحة تحكم تفاعلية (Dashboard)",
      desc: "واجهة إدارية تضم بطاقات إحصائيات، جدول بيانات مع كلاسات Bootstrap، ورسوم بيانية.",
      features: ["شريط جانبي وإحصائيات مجمعة", "جداول متجاوبة .table-responsive", "ألوان حالة المبيعات والمستخدمين"],
      code: `<div class="row g-3 mb-4">
  <div class="col-sm-6 col-xl-3">
    <div class="card p-3 border-0 bg-primary text-white rounded-4 shadow-sm">
      <div class="small">المستخدمين النشطين</div>
      <div class="fs-3 fw-bold">1,420</div>
    </div>
  </div>
  <div class="col-sm-6 col-xl-3">
    <div class="card p-3 border-0 bg-success text-white rounded-4 shadow-sm">
      <div class="small">نسبة الإكمال</div>
      <div class="fs-3 fw-bold">89.4%</div>
    </div>
  </div>
</div>`
    },
    {
      id: 6,
      title: "6. معرض أعمال وسيرة ذاتية (Portfolio)",
      desc: "صفحة شخصية للمطور لعرض مهاراته ومعرض أعماله ووسائل التواصل معه.",
      features: ["نبذة شخصية مع صورة دائرية", "أشرطة تقدم المهارات Progress Bars", "معرض صور للمشاريع المنفذة"],
      code: `<section class="py-5 text-center">
  <div class="container">
    <div class="w-25 mx-auto mb-3">
      <div class="p-4 bg-primary text-white rounded-circle"><i class="bi bi-person-fill fs-1"></i></div>
    </div>
    <h2 class="fw-bold">محمد أمين · مهندس واجهات أمامية</h2>
    <p class="text-muted col-md-6 mx-auto">متخصص في بناء واجهات وتطبيقات تفاعلية متجاوبة بـ Bootstrap و Vanilla JS.</p>
  </div>
</section>`
    },
    {
      id: 7,
      title: "7. متجر إلكتروني مصغر (Mini E-Commerce)",
      desc: "صفحة متجر مصغر مع بطاقات منتجات، سلة مشتريات منبثقة، وتصفية حسب الفئة.",
      features: ["عرض الأسعار والشارات", "إشعار Toast عند إضافة منتج", "متجاوب مع كل الأجهزة"],
      code: `<div class="container py-4">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h3 class="fw-bold">متجر الأدوات الرقمية</h3>
    <button class="btn btn-outline-primary position-relative rounded-pill px-3">
      <i class="bi bi-cart3 me-1"></i> السلة
      <span class="badge bg-danger rounded-pill">3</span>
    </button>
  </div>
</div>`
    }
  ];

  const projectsContainer = document.getElementById('projects-container');
  if (projectsContainer) {
    projectsContainer.innerHTML = PROJECTS_DATA.map(proj => `
      <div class="card custom-card p-4 p-md-5 mb-4 border">
        <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
          <h4 class="fw-bold text-primary mb-0">${proj.title}</h4>
          <span class="badge bg-success-subtle text-success px-3 py-2 rounded-pill">مشروع تطبيقي</span>
        </div>
        <p class="text-muted leading-relaxed mb-3">${proj.desc}</p>
        <div class="d-flex flex-wrap gap-2 mb-3">
          ${proj.features.map(f => `<span class="badge bg-secondary-subtle text-secondary"><i class="bi bi-check2 text-success me-1"></i> ${f}</span>`).join('')}
        </div>
        <div class="code-container mb-3">
          <div class="code-header py-1">
            <span class="small font-monospace">كود المشروع الكامل</span>
            <button class="code-copy-btn py-0 px-2" onclick="navigator.clipboard.writeText(this.getAttribute('data-c')); this.textContent='تم النسخ!'; setTimeout(()=>this.textContent='نسخ الكود', 2000);" data-c="${escapeHtml(proj.code)}">نسخ الكود</button>
          </div>
          <pre class="p-3 m-0" style="max-height: 220px;"><code class="language-html">${escapeHtml(proj.code)}</code></pre>
        </div>
      </div>
    `).join('');
  }

  // 12. COMPREHENSIVE QUIZ ENGINE & CERTIFICATE
  const QUIZ_QUESTIONS = [
    {
      q: "ما هو إطار العمل Bootstrap؟",
      opts: ["مكتبة CSS و JS مفتوحة المصدر لتصميم واجهات ويب متجاوبة", "لغة برمجة جديدة تنافس بايثون", "نظام إدارة قواعد بيانات", "خادم ويب محلي"],
      correct: 0,
      exp: "بوتستراب هو أشهر إطار عمل مفتوح المصدر للواجهات الأمامية Front-end."
    },
    {
      q: "كم عدد الأعمدة الافتراضية في سطر واحد (.row) في شبكة بوتستراب؟",
      opts: ["12 عموداً", "10 أعمدة", "8 أعمدة", "16 عموداً"],
      correct: 0,
      exp: "نظام الشبكة الرياضي مبني على 12 عموداً لتسهيل القسمة على 2 و 3 و 4 و 6."
    },
    {
      q: "ما هو الكلاس الذي يضبط عرض الحاوية ليكون 100% دائماً في كل الشاشات؟",
      opts: [".container-fluid", ".container", ".container-max", ".full-container"],
      correct: 0,
      exp: ".container-fluid يأخذ دائماً 100% من عرض الشاشة دون حد أقصى."
    },
    {
      q: "ماذا تعني الحروف 'ms' في كلاس 'ms-auto' في Bootstrap 5؟",
      opts: ["Margin Start (الهامش من جهة البداية)", "Margin Size", "Microsoft Style", "Main Screen"],
      correct: 0,
      exp: "الحرف 's' يعني Start لدعم لغات اليمين لليسار (RTL) تلقائياً."
    },
    {
      q: "أي كلاس يُستخدم لجعل الصورة تتطابق مع حواف البطاقة العلوية بدون تشوه؟",
      opts: [".card-img-top", ".card-photo", ".img-header", ".image-top"],
      correct: 0,
      exp: ".card-img-top ينسق الصورة العلوية ويمنحها استدارة تطابق زوايا البطاقة."
    },
    {
      q: "ما هي نقطة التوقف المسؤولة عن أجهزة التابلت (Tablet) في بوتستراب؟",
      opts: ["md (768px)", "sm (576px)", "lg (992px)", "xs (320px)"],
      correct: 0,
      exp: "نقطة التوقف md تبدأ من 768px وهي المقياس القياسي للتابلت."
    },
    {
      q: "لماذا تخلت Bootstrap 5 عن مكتبة jQuery؟",
      opts: ["لتقليل حجم الملفات وزيادة سرعة الأداء والاعتماد على Vanilla JS", "لأن jQuery أصبحت لغة مدفوعة", "لأنه تم حظرها من المتصفحات", "لأسباب أمنية فقط"],
      correct: 0,
      exp: "التخلي عن jQuery خفف وزن التحميل بأكثر من 85KB وجعل الموقع أسرع بكثير."
    },
    {
      q: "أي كلاس يُستخدم لجعل الزاوية مستديرة بالكامل بشكل حبة دواء أو كبسولة؟",
      opts: [".rounded-pill", ".rounded-circle", ".border-oval", ".pill-button"],
      correct: 0,
      exp: ".rounded-pill يعطي استدارة قصوى لتبدو الأزرار والشارات بشكل كبسولة عصرية."
    },
    {
      q: "ما هو الكلاس الذي يثبت شريط التنقل في أعلى الشاشة أثناء النزول بالصفحة؟",
      opts: [".sticky-top", ".navbar-fixed", ".top-pin", ".float-top"],
      correct: 0,
      exp: ".sticky-top يبقي الشريط مثبتاً في الأعلى بسلاسة فور بدء التمرير."
    },
    {
      q: "ما هو الدور الرئيسي لخاصية 'g-4' على عنصر .row؟",
      opts: ["تحديد المسافة العازلة (Gutter) بين الأعمدة أفقياً ورأسياً", "تقسيم السطر إلى 4 أعمدة إجبارية", "وضع إطار رمادي بسُمك 4 بيكسل", "تعتيم السطر بنسبة 4%"],
      correct: 0,
      exp: "الحرف g يعني Gutter ويضبط التباعد بين الأعمدة رأسياً وأفقياً."
    }
  ];

  let currentQuizIndex = 0;
  let currentQuizScore = 0;
  const quizCard = document.getElementById('quiz-active-card');

  function renderQuizQuestion() {
    if (!quizCard) return;
    if (currentQuizIndex >= QUIZ_QUESTIONS.length) {
      // Quiz Finished!
      const finalPercent = Math.round((currentQuizScore / QUIZ_QUESTIONS.length) * 100);
      STATE.quizScore = finalPercent;
      localStorage.setItem('bs_academy_quiz_score', finalPercent.toString());

      quizCard.innerHTML = `
        <div class="text-center p-4 p-md-5">
          <div class="display-1 text-warning mb-3">🏆</div>
          <h2 class="fw-black mb-2">أحسنت! أكملت الاختبار النهائي</h2>
          <div class="display-4 fw-black text-primary my-3">${finalPercent}%</div>
          <p class="lead text-muted mb-4">
            ${finalPercent >= 70 ? 'تهانينا! لقد حققت درجة ممتازة تثبت تمكنك من أساسيات ومفاهيم Bootstrap 5.' : 'عمل جيد، نوصي بمراجعة بعض الدروس وإعادة المحاولة لتحقيق 100%.'}
          </p>
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <button class="btn btn-primary rounded-pill px-4 py-2" id="btn-show-certificate">
              <i class="bi bi-award-fill me-1"></i> عرض شهادة الإتقان
            </button>
            <button class="btn btn-outline-secondary rounded-pill px-4 py-2" id="btn-retry-quiz">
              <i class="bi bi-arrow-repeat me-1"></i> إعادة الاختبار
            </button>
          </div>
        </div>
      `;

      const certBtn = document.getElementById('btn-show-certificate');
      if (certBtn) {
        certBtn.addEventListener('click', () => {
          const studentName = prompt('اكتب اسمك الكامل الذي تريده على الشهادة:', 'الطالب المتميز') || 'الطالب المتميز';
          showCertificate(studentName, finalPercent);
        });
      }

      const retryBtn = document.getElementById('btn-retry-quiz');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          currentQuizIndex = 0;
          currentQuizScore = 0;
          renderQuizQuestion();
        });
      }
      return;
    }

    const q = QUIZ_QUESTIONS[currentQuizIndex];
    quizCard.innerHTML = `
      <div class="p-4 p-md-5">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="badge bg-primary px-3 py-2 rounded-pill">السؤال ${currentQuizIndex + 1} من ${QUIZ_QUESTIONS.length}</span>
          <span class="fw-bold text-muted">النقاط: ${currentQuizScore} / ${QUIZ_QUESTIONS.length}</span>
        </div>
        <h4 class="fw-bold mb-4">${q.q}</h4>
        <div class="d-flex flex-column gap-2 mb-4" id="quiz-options-list">
          ${q.opts.map((opt, idx) => `
            <button class="quiz-option-btn" data-q-opt="${idx}">
              <span class="badge bg-secondary-subtle text-secondary me-2">${idx + 1}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div id="quiz-question-feedback" class="d-none p-3 rounded-3 mb-3"></div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-primary rounded-pill px-4 d-none" id="btn-quiz-next">
            السؤال التالي <i class="bi bi-arrow-left ms-1"></i>
          </button>
        </div>
      </div>
    `;

    const btns = quizCard.querySelectorAll('[data-q-opt]');
    const feedback = document.getElementById('quiz-question-feedback');
    const nextBtn = document.getElementById('btn-quiz-next');

    btns.forEach(b => {
      b.addEventListener('click', () => {
        btns.forEach(btnEl => btnEl.disabled = true);
        const chosen = parseInt(b.getAttribute('data-q-opt'), 10);
        if (chosen === q.correct) {
          b.classList.add('correct');
          currentQuizScore++;
          feedback.className = 'p-3 rounded-3 mb-3 bg-success-subtle text-success border border-success d-block';
          feedback.innerHTML = `<strong>إجابة صحيحة! ✔</strong><br><small>${q.exp}</small>`;
        } else {
          b.classList.add('incorrect');
          btns[q.correct].classList.add('correct');
          feedback.className = 'p-3 rounded-3 mb-3 bg-danger-subtle text-danger border border-danger d-block';
          feedback.innerHTML = `<strong>إجابة خاطئة! ✖</strong><br><small>${q.exp}</small>`;
        }
        if (nextBtn) {
          nextBtn.classList.remove('d-none');
          nextBtn.onclick = () => {
            currentQuizIndex++;
            renderQuizQuestion();
          };
        }
      });
    });
  }

  async function showCertificate(name, score) {
    const certModalEl = document.getElementById('certificateModal');
    if (!certModalEl) return;
    const nameEl = document.getElementById('cert-student-name');
    const dateEl = document.getElementById('cert-date');
    const scoreEl = document.getElementById('cert-score');

    const resolvedName = STATE.userProfile?.full_name || name || 'طالب الأكاديمية';
    if (nameEl) nameEl.textContent = resolvedName;
    if (dateEl) dateEl.textContent = new Date().toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' });
    if (scoreEl) scoreEl.textContent = `${score}%`;

    STATE.quizScore = score;
    localStorage.setItem('bs_academy_quiz_score', String(score));
    updateProgressUI();

    const certId = 'CERT-BS5-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    if (STATE.currentUser) {
      await recordQuizResult({
        user_id: STATE.currentUser.id,
        score,
        total_questions: 20,
        passed: score >= 70,
        certificate_id: certId,
      });
    }

    const modal = new bootstrap.Modal(certModalEl);
    modal.show();
  }

  renderQuizQuestion();

  // Helper Escape HTML
  function escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Update progress UI on start
  updateProgressUI();

  // Initialize Supabase & Authentication System
  initAuthSystem();
});
