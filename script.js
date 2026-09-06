/* ==========================================================================
   Gridly - Landing Page Script
   ========================================================================== */
(() => {
  'use strict';

  /* ---------------- Supabase (static site, no backend server) ----------------
     The anon key is designed to be public/embedded in client code — actual
     access control lives in Supabase's Row Level Security policies
     (see sql/policies.sql), not in this key being secret. */
  const SUPABASE_URL = 'https://qjeurqfdbyfcmxtdgkjy.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZXVycWZkYnlmY214dGRna2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mzc3OTYsImV4cCI6MjEwNDExMzc5Nn0.hAPOmH3jdx3AgFv8w09lemoMe8QDSQ2aqFyAEqNEYMY';
  const supabase = window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

  // Toggled from /admin.html. The whole document stays hidden (see the
  // html:not(.gridly-ready) rule in styles.css) until this check resolves,
  // so a maintenance-mode visitor never sees the landing page flash before
  // being swapped to the notice. reveal() un-hides it either way; the
  // timeout is a safety net in case the request hangs or fails.
  let revealed = false;
  function reveal() {
    if (revealed) return;
    revealed = true;
    document.documentElement.classList.add('gridly-ready');
  }

  if (supabase) {
    const revealTimeout = setTimeout(reveal, 1500);
    supabase
      .from('site_config')
      .select('maintenance_mode')
      .eq('id', 'default')
      .single()
      .then(({ data }) => {
        clearTimeout(revealTimeout);
        if (data && data.maintenance_mode) showMaintenancePage();
        reveal();
      })
      .catch(() => {
        clearTimeout(revealTimeout);
        reveal();
      });
  } else {
    reveal();
  }

  function showMaintenancePage() {
    // No language switcher exists on this replaced page, so a visitor whose
    // saved/browser language doesn't match currentLang would otherwise be
    // stuck reading the wrong one - show both instead of picking one.
    document.title = `${translations.ge['maintenance.title']} / ${translations.en['maintenance.title']}`;
    document.body.innerHTML = `
      <div class="maintenance-screen">
        <div class="bg-glow bg-glow-1" aria-hidden="true"></div>
        <div class="bg-glow bg-glow-2" aria-hidden="true"></div>
        <button class="theme-toggle" id="maintenance-theme-toggle" aria-label="Toggle light and dark theme">
          <svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        </button>
        <div class="maintenance-card">
          <div class="girl-perch" aria-hidden="true">
            <svg viewBox="0 0 60 90" width="56" height="90" xmlns="http://www.w3.org/2000/svg">
              <g class="girl-leg girl-leg-left">
                <rect x="19" y="44" width="8" height="28" rx="4"/>
                <ellipse class="girl-shoe" cx="23" cy="74" rx="6" ry="4"/>
              </g>
              <g class="girl-leg girl-leg-right">
                <rect x="33" y="44" width="8" height="28" rx="4"/>
                <ellipse class="girl-shoe" cx="37" cy="74" rx="6" ry="4"/>
              </g>
              <ellipse class="girl-hair" cx="30" cy="16" rx="15" ry="16"/>
              <path class="girl-dress" d="M15 28 Q30 22 45 28 L49 50 Q30 58 11 50 Z"/>
              <rect class="girl-arm girl-arm-left" x="9" y="30" width="7" height="18" rx="3.5"/>
              <rect class="girl-arm girl-arm-right" x="44" y="30" width="7" height="18" rx="3.5"/>
              <g class="girl-laptop">
                <rect class="girl-laptop-base" x="15" y="48" width="30" height="5" rx="1.5"/>
                <rect class="girl-laptop-screen" x="17" y="31" width="26" height="18" rx="1.5"/>
                <rect class="girl-laptop-rim" x="17" y="31" width="26" height="18" rx="1.5" fill="none"/>
                <circle class="girl-laptop-logo" cx="30" cy="40" r="2.2"/>
              </g>
              <circle class="girl-head" cx="30" cy="16" r="12"/>
              <circle class="girl-pigtail" cx="15" cy="17" r="5"/>
              <circle class="girl-pigtail" cx="45" cy="17" r="5"/>
              <circle class="girl-eye" cx="25" cy="16.5" r="1.5"/>
              <circle class="girl-eye" cx="35" cy="16.5" r="1.5"/>
              <path class="girl-smile" d="M24 20 Q30 25 36 20" fill="none"/>
            </svg>
          </div>
          <div class="sky-icon" aria-hidden="true">
            <svg class="sky-stars" width="34" height="34" viewBox="0 0 34 34">
              <path class="sky-star sky-star-1" d="M8 2 L9.4 6.6 L14 8 L9.4 9.4 L8 14 L6.6 9.4 L2 8 L6.6 6.6 Z" fill="#e0e7ff"/>
              <circle class="sky-star sky-star-2" cx="26" cy="7" r="1.6" fill="#e0e7ff"/>
              <circle class="sky-star sky-star-3" cx="20" cy="24" r="1.3" fill="#e0e7ff"/>
              <circle class="sky-star sky-star-4" cx="29" cy="20" r="1.1" fill="#e0e7ff"/>
            </svg>
            <svg class="sky-icon-sun" width="40" height="40" viewBox="0 0 40 40">
              <defs>
                <radialGradient id="maintenanceSunGradient" cx="50%" cy="42%" r="60%">
                  <stop offset="0%" stop-color="#fff4cc"/>
                  <stop offset="55%" stop-color="#fbbf24"/>
                  <stop offset="100%" stop-color="#f59e0b"/>
                </radialGradient>
              </defs>
              <g fill="#fbbf24" opacity="0.9">
                <path d="M20 1 L22.6 8.4 L17.4 8.4 Z"/>
                <path d="M20 39 L22.6 31.6 L17.4 31.6 Z"/>
                <path d="M1 20 L8.4 17.4 L8.4 22.6 Z"/>
                <path d="M39 20 L31.6 22.6 L31.6 17.4 Z"/>
                <path d="M6.2 6.2 L12.5 10.2 L10.2 12.5 Z"/>
                <path d="M33.8 33.8 L27.5 29.8 L29.8 27.5 Z"/>
                <path d="M6.2 33.8 L10.2 27.5 L12.5 29.8 Z"/>
                <path d="M33.8 6.2 L29.8 12.5 L27.5 10.2 Z"/>
              </g>
              <circle cx="20" cy="20" r="10.5" fill="url(#maintenanceSunGradient)"/>
              <circle cx="17" cy="17" r="3" fill="#fff8e1" opacity="0.55"/>
            </svg>
            <svg class="sky-icon-moon" width="36" height="36" viewBox="0 0 40 40">
              <defs>
                <radialGradient id="maintenanceMoonGradient" cx="38%" cy="35%" r="70%">
                  <stop offset="0%" stop-color="#f5f3ff"/>
                  <stop offset="60%" stop-color="#c7d2fe"/>
                  <stop offset="100%" stop-color="#818cf8"/>
                </radialGradient>
              </defs>
              <path d="M25 5a14 14 0 1 0 10 22 11 11 0 0 1-10-22z" fill="url(#maintenanceMoonGradient)"/>
            </svg>
          </div>
          <div class="maintenance-icon">
            <svg width="46" height="46" viewBox="0 0 100 100" fill="currentColor">
              <defs>
                <g id="gearUnit">
                  <path fill-rule="evenodd" d="M -30,0 A 30,30 0 1,0 30,0 A 30,30 0 1,0 -30,0 Z M -14,0 A 14,14 0 1,0 14,0 A 14,14 0 1,0 -14,0 Z"/>
                  <rect x="-5" y="-42" width="10" height="14" rx="2"/>
                  <rect x="-5" y="-42" width="10" height="14" rx="2" transform="rotate(36)"/>
                  <rect x="-5" y="-42" width="10" height="14" rx="2" transform="rotate(72)"/>
                  <rect x="-5" y="-42" width="10" height="14" rx="2" transform="rotate(108)"/>
                  <rect x="-5" y="-42" width="10" height="14" rx="2" transform="rotate(144)"/>
                  <rect x="-5" y="-42" width="10" height="14" rx="2" transform="rotate(180)"/>
                  <rect x="-5" y="-42" width="10" height="14" rx="2" transform="rotate(216)"/>
                  <rect x="-5" y="-42" width="10" height="14" rx="2" transform="rotate(252)"/>
                  <rect x="-5" y="-42" width="10" height="14" rx="2" transform="rotate(288)"/>
                  <rect x="-5" y="-42" width="10" height="14" rx="2" transform="rotate(324)"/>
                </g>
              </defs>
              <g transform="translate(33,33) scale(0.72)"><g class="gear-spin gear-spin-cw"><use href="#gearUnit"/></g></g>
              <g transform="translate(70,68) scale(0.54)"><g class="gear-spin gear-spin-ccw"><use href="#gearUnit"/></g></g>
            </svg>
          </div>
          <h1>${translations.ge['maintenance.title']}</h1>
          <p>${translations.ge['maintenance.desc']}</p>
          <hr class="maintenance-divider">
          <h1>${translations.en['maintenance.title']}</h1>
          <p>${translations.en['maintenance.desc']}</p>
        </div>
        <div class="maintenance-contact">
          <a class="maintenance-email" href="mailto:info@gridly.ge">info@gridly.ge</a>
          <div class="social-links">
            <a href="https://www.facebook.com/people/%E1%83%92%E1%83%A0%E1%83%98%E1%83%93%E1%83%9A%E1%83%98-Gridly/61594259906901/" target="_blank" rel="noopener" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/></svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v6.85a6.5 6.5 0 1 1 -8 -6.326v4.077a2.5 2.5 0 1 0 4 2.25v-13.851h4.083a6.005 6.005 0 0 0 4.917 4.917z"/></svg>
            </a>
          </div>
        </div>
      </div>
    `;
    const maintenanceThemeToggle = document.getElementById('maintenance-theme-toggle');
    maintenanceThemeToggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
      if (typeof updateScrollColors === 'function') updateScrollColors();
    });
  }

  /* ---------------- Popup notification (success/error) ----------------
     A modal is much harder to miss than the old inline green banner, and
     doubles as the error path (which previously called an undefined
     showToast()). Closed via the OK button, the backdrop, or Escape. */
  const modalOverlay = document.getElementById('est-modal-overlay');
  const modalIcon = document.getElementById('est-modal-icon');
  const modalMessage = document.getElementById('est-modal-message');
  const modalOkBtn = document.getElementById('est-modal-ok');

  const MODAL_ICONS = {
    success: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    error: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>',
  };

  function hideModal() {
    modalOverlay.hidden = true;
    document.removeEventListener('keydown', onModalKeydown);
  }

  function onModalKeydown(e) {
    if (e.key === 'Escape') hideModal();
  }

  function showModal(message, type) {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('est-modal--success', 'est-modal--error');
    modalOverlay.classList.add(`est-modal--${type}`);
    modalIcon.innerHTML = MODAL_ICONS[type] || '';
    modalMessage.textContent = message;
    modalOverlay.hidden = false;
    modalOkBtn.focus();
    document.addEventListener('keydown', onModalKeydown);
  }

  if (modalOverlay) {
    modalOkBtn.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) hideModal();
    });
  }

  /* ==========================================================================
     Translations (Georgian default, English toggle)
     ========================================================================== */
  const translations = {
    ge: {
      'banner.testMode': 'საიტი მუშაობს სატესტო რეჟიმში - ინფორმაცია შეიძლება შეიცვალოს',
      'maintenance.title': 'საიტი დროებით მიუწვდომელია',
      'maintenance.desc': 'მალე დაგიბრუნდებით.',
      'page.title': 'Gridly - თანამედროვე საიტები ადგილობრივი ბიზნესებისთვის',
      'page.desc': 'Gridly აშენებს სწრაფ, თანამედროვე და მაღალკონვერტირებად ვებგვერდებს ადგილობრივი ბიზნესებისთვის. მორგებული დიზაინი, ადმინ პანელები, SEO და Google Maps.',
      'nav.services': 'სერვისები',
      'nav.faq': 'კითხვები',
      'hero.eyebrow': 'ვებ-გვერდები პატარა და საშუალო ბიზნესებისთვის',
      'hero.title': 'გაზარდეთ თქვენი ბიზნესი <span class="text-gradient">Gridly</span>-სთან ერთად',
      'hero.sub': 'სწრაფი, თანამედროვე და მაღალკონვერტირებადი ვებ-გვერდები',
      'hero.stat1': 'მზადყოფნა',
      'hero.stat2': 'მობილური ადაპტაცია',
      'hero.chip1': 'გაშვება დღეებში, არა თვეებში',
      'hero.chip2': '+150% მეტი მოთხოვნა',
      'ps.title': 'ვებგვერდის გარეშე ახალი კლიენტები არ გეყოლებათ',
      'ps.desc': 'ყოველ დღე, სანამ თქვენი ვებ-გვერდი არ არსებობს, კონკურენტები იზიდავენ იმ კლიენტებს, ვინც ზუსტად თქვენ გეძებდათ.',
      'ps.problem.title': 'Gridly-ს გარეშე',
      'ps.problem.li1': 'კლიენტები ვერ გპოულობენ Google-სა და Maps-ზე',
      'ps.problem.li2': 'მოძველებული ან არარსებული საიტი არაპროფესიონალურად გამოიყურება',
      'ps.problem.li3': 'არ იღებთ განაცხადებს 24/7-ზე',
      'ps.problem.li4': 'კარგავთ მომხმარებლებს კონკურენტებთან, რომლებიც უკვე ონლაინ არიან',
      'ps.solution.title': 'Gridly-სთან ერთად',
      'ps.solution.li1': 'დაიკავეთ ადგილი Google Maps-ზე და გახდით ადვილად საპოვნელი',
      'ps.solution.li2': 'სწრაფი, თანამედროვე საიტი, რომელიც მყისიერად იმსახურებს ნდობას',
      'ps.solution.li3': 'საკონტაქტო ფორმები, რომლებიც მუშაობს დღე-ღამის განმავლობაში',
      'ps.solution.li4': 'მიიღეთ საიტი, რომელიც ვიზიტორებს რეალურ კლიენტებად აქცევს',
      'services.title': 'სერვისები და შესაძლებლობები',
      'services.desc': 'ყველაფერი, რაც თქვენს ბიზნესს სჭირდება პროფესიონალურად გამოსაჩენად და ონლაინ საპოვნელად.',
      'services.c1.title': 'მორგებული საიტები',
      'services.c1.desc': 'ხელნაკეთი HTML, CSS და JavaScript-ით - არავითარი გადატვირთული შაბლონები, მხოლოდ სუფთა და სწრაფი კოდი.',
      'services.c2.title': 'მორგებული ადმინ პანელი',
      'services.c2.desc': 'მართეთ საკუთარი კონტენტი, ფოტოები და ფასები კოდის ცოდნის გარეშე.',
      'services.c3.title': 'მობილურთან თავსებადი',
      'services.c3.desc': 'იდეალურად გამოიყურება ნებისმიერ ეკრანზე - კლიენტების უმეტესობა მობილურით გპოულობთ.',
      'services.c4.title': 'SEO ოპტიმიზაცია',
      'services.c4.desc': 'სუფთა სტრუქტურა და მეტამონაცემები, რათა საიტი რეალურად გამოჩნდეს Google-ის ძიებაში.',
      'services.c5.title': 'Google Maps-ის დაყენება',
      'services.c5.desc': 'გამოჩნდით სწორ ადგილას რუკაზე, რომ ახლომახლო კლიენტებმა ადვილად გიპოვონ.',
      'services.c6.title': 'სწრაფი წარმადობა',
      'services.c6.desc': 'მსუბუქი, ხელით ოპტიმიზირებული კოდი უზრუნველყოფს თითქმის მყისიერ ჩატვირთვას ნებისმიერ კავშირზე.',
      'nav.estimator': 'კალკულატორი',
      'estimator.title': 'ფასის კალკულატორი',
      'estimator.desc': 'აირჩიეთ საჭირო ფუნქციები და მიიღეთ სავარაუდო ფასი მყისიერად.',
      'estimator.free': 'უფასო',
      'estimator.mode.title': 'მოთხოვნის ტიპი',
      'estimator.mode.consult': 'კონსულტაცია',
      'estimator.mode.quote': 'პროექტის შეფასება',
      'estimator.pages.title': 'ვებ-გვერდი',
      'estimator.base': 'საბაზისო პაკეტი',
      'estimator.pages.landing': 'სავიზიტო',
      'estimator.pages.multi': 'მრავალგვერდიანი',
      'estimator.pages.count.label': 'გვერდების რაოდენობა',
      'estimator.pages.extra': 'დამატებითი გვერდები',
      'estimator.features.maintenance.extra': 'მოვლის დამატებითი გვერდები',
      'estimator.features.seo.extra': 'SEO დამატებითი გვერდები',
      'estimator.lang.title': 'ენა',
      'estimator.lang.ge': 'მხოლოდ ქართული',
      'estimator.lang.multi': 'მრავალენოვანი',
      'estimator.lang.count.label': 'ენების რაოდენობა',
      'estimator.lang.extra': 'დამატებითი ენები',
      'estimator.features.title': 'ფუნქციები',
      'estimator.features.contact': 'საკონტაქტო ფორმა',
      'estimator.features.hosting': 'ჰოსტინგი',
      'estimator.features.animations': 'ანიმაციები',
      'estimator.features.animations.type.label': 'ანიმაციის ტიპი',
      'estimator.features.animations.simple': 'მარტივი ანიმაციები',
      'estimator.features.animations.complex': 'კომპლექსური ანიმაციები',
      'estimator.features.domain': 'დომენი',
      'estimator.features.email': 'ელ. ფოსტა',
      'estimator.features.seo': 'SEO ოპტიმიზაცია',
      'estimator.features.admin': 'ადმინ პანელი',
      'estimator.features.maintenance': 'ვებ-გვერდის მოვლა/პატრონობა',
      'estimator.summary.title': 'სავარაუდო ღირებულება',
      'estimator.send': 'მოთხოვნის გაგზავნა',
      'lead.error': 'შეცდომა მოთხოვნის გაგზავნისას. სცადეთ თავიდან.',
      'faq.title': 'ხშირად დასმული კითხვები',
      'faq.desc': 'გაქვთ კითხვები? აქ არის პასუხები ყველაზე ხშირად დასმულ კითხვებზე.',
      'faq.q2': 'შემიძლია მოგვიანებით ცვლილებების შეტანა?',
      'faq.a2': 'რა თქმა უნდა. თუ გაქვთ ადმინ პანელი, თავად შეგიძლიათ განაახლოთ კონტენტი. ასევე გვაქვს ყოველთვიური მოვლის პაკეტი მცირე ცვლილებებისთვის.',
      'faq.q4': 'გჭირდებათ თუ არა წინასწარგადახდა?',
      'faq.a4': 'დიახ, ჩვეულებრივ ვითხოვთ 50%-იან წინასწარგადახდას პროექტის დაწყებამდე და დარჩენილს - მზა საიტის ჩაბარებისას.',
      'faq.q5': 'შემიძლია საიტის ტესტირება მზადების პროცესში?',
      'faq.a5': 'აბსოლუტურად - მუშაობის განმავლობაში მუდმივად გაგიზიარებთ პროგრესს და მოგცემთ საშუალებას ნახოთ და შეაფასოთ საიტი მის საბოლოო გაშვებამდე.',
      'form.name.label': 'სრული სახელი',
      'form.name.placeholder': 'მაგ. ნინო ბერიძე',
      'form.contact.label': 'ტელეფონი ან ელფოსტა',
      'form.contact.placeholder': '+995 5xx xx xx xx ან you@email.com',
      'form.business.label': 'ბიზნესის ტიპი',
      'form.business.placeholder': 'აირჩიეთ ბიზნესის ტიპი',
      'form.business.opt.salon': 'სალონი / სილამაზე',
      'form.business.opt.restaurant': 'რესტორანი / კაფე',
      'form.business.opt.auto': 'ავტოსერვისი',
      'form.business.opt.retail': 'მაღაზია / საცალო ვაჭრობა',
      'form.business.opt.professional': 'პროფესიული სერვისები',
      'form.business.opt.other': 'სხვა',
      'form.message.label': 'შეტყობინება',
      'form.message.optional': '(არასავალდებულო)',
      'form.message.placeholder': 'მოგვიყევით ცოტა თქვენი პროექტის შესახებ...',
      'form.sending': 'იგზავნება...',
      'form.success': 'მადლობა! თქვენი მოთხოვნა მიღებულია - მალე დაგიკავშირდებით.',
      'form.error.name': 'გთხოვთ მიუთითოთ თქვენი სრული სახელი.',
      'form.error.contact': 'შეიყვანეთ სწორი ტელეფონის ნომერი ან ელფოსტა.',
      'form.error.business': 'გთხოვთ აირჩიოთ ბიზნესის ტიპი.',
      'footer.tagline': 'ვებ-გვერდები პატარა და საშუალო ბიზნესებისთვის.',
      'footer.contactTitle': 'დაგვიკავშირდით',
      'footer.copyright': 'ყველა უფლება დაცულია.',
    },
    en: {
      'banner.testMode': 'This website is running in test mode - content may change',
      'maintenance.title': 'The site is temporarily unavailable',
      'maintenance.desc': "We'll be back soon.",
      'page.title': 'Gridly - Modern Websites for Local Businesses',
      'page.desc': 'Gridly builds fast, modern, high-converting websites for local businesses. Custom design, admin panels, SEO & Google Maps setup.',
      'nav.services': 'Services',
      'nav.faq': 'FAQ',
      'hero.eyebrow': 'Websites for small and medium businesses',
      'hero.title': 'Boost Your Business with <span class="text-gradient">Gridly</span>',
      'hero.sub': 'Fast, modern, and high-converting websites.',
      'hero.stat1': 'Ready',
      'hero.stat2': 'Mobile-ready design',
      'hero.chip1': 'Live in days, not months',
      'hero.chip2': '+150% more inquiries',
      'ps.title': 'No website means no new customers',
      'ps.desc': "Every day your website doesn't exist, your competitors are capturing the customers who were searching for exactly you.",
      'ps.problem.title': 'Without Gridly',
      'ps.problem.li1': "Customers can't find you on Google or Maps",
      'ps.problem.li2': 'Outdated or no website looks unprofessional',
      'ps.problem.li3': "You're not capturing inquiries 24/7",
      'ps.problem.li4': "You're losing customers to competitors who are already online",
      'ps.solution.title': 'With Gridly',
      'ps.solution.li1': 'Rank on Google Maps & get discovered locally',
      'ps.solution.li2': 'A fast, modern site that builds instant trust',
      'ps.solution.li3': 'Contact forms & booking that work around the clock',
      'ps.solution.li4': 'Get a site that turns visitors into real clients',
      'services.title': 'Services & Features',
      'services.desc': 'Everything your business needs to look professional and get found online.',
      'services.c1.title': 'Custom Coded Websites',
      'services.c1.desc': 'Hand-built with HTML, CSS & JavaScript - no bloated templates, just clean, fast-loading code.',
      'services.c2.title': 'Custom Admin Panels',
      'services.c2.desc': 'Manage your own content, photos and prices without touching a line of code.',
      'services.c3.title': 'Mobile Compatible',
      'services.c3.desc': 'Pixel-perfect on every screen - most customers find you on their phone first.',
      'services.c4.title': 'SEO Optimization',
      'services.c4.desc': 'Clean structure and metadata so your site actually shows up in Google search results.',
      'services.c5.title': 'Google Maps Setup',
      'services.c5.desc': 'Get listed and pinned correctly so nearby customers can find and visit you easily.',
      'services.c6.title': 'Fast Performance',
      'services.c6.desc': 'Lightweight, hand-optimized code means near-instant load times on any connection.',
      'nav.estimator': 'Estimator',
      'estimator.title': 'Price Estimator',
      'estimator.desc': 'Pick the features you need and get an instant estimated price.',
      'estimator.free': 'Free',
      'estimator.mode.title': 'Request type',
      'estimator.mode.consult': 'Consultation',
      'estimator.mode.quote': 'Build a project estimate',
      'estimator.pages.title': 'Website',
      'estimator.base': 'Base package',
      'estimator.pages.landing': 'One Page',
      'estimator.pages.multi': 'Multi-page',
      'estimator.pages.count.label': 'Number of pages',
      'estimator.pages.extra': 'Extra pages',
      'estimator.features.maintenance.extra': 'Extra maintenance pages',
      'estimator.features.seo.extra': 'Extra SEO pages',
      'estimator.lang.title': 'Language',
      'estimator.lang.ge': 'Georgian only',
      'estimator.lang.multi': 'Multi-language',
      'estimator.lang.count.label': 'Number of languages',
      'estimator.lang.extra': 'Extra languages',
      'estimator.features.title': 'Features',
      'estimator.features.contact': 'Contact Form',
      'estimator.features.hosting': 'Hosting',
      'estimator.features.animations': 'Animations',
      'estimator.features.animations.type.label': 'Animation type',
      'estimator.features.animations.simple': 'Simple Animations',
      'estimator.features.animations.complex': 'Complex Animations',
      'estimator.features.domain': 'Domain',
      'estimator.features.email': 'Email',
      'estimator.features.seo': 'SEO Optimization',
      'estimator.features.admin': 'Admin Panel',
      'estimator.features.maintenance': 'Website Maintenance',
      'estimator.summary.title': 'Estimated total',
      'estimator.send': 'Send request',
      'lead.error': 'Something went wrong sending your request. Please try again.',
      'faq.title': 'Frequently Asked Questions',
      'faq.desc': "Got questions? Here are answers to the ones we hear most.",
      'faq.q2': 'Can I make changes later?',
      'faq.a2': 'Absolutely. If you have an Admin Panel you can update content yourself. We also offer a monthly maintenance package for smaller changes.',
      'faq.q4': 'Do you require an upfront payment?',
      'faq.a4': 'Yes, we typically ask for a 50% deposit before starting the project, with the remainder due on delivery of the finished site.',
      'faq.q5': 'Can I test the site while it is being built?',
      'faq.a5': 'Absolutely - we share progress throughout the build so you can review and give feedback before final launch.',
      'form.name.label': 'Full Name',
      'form.name.placeholder': 'e.g. Nino Beridze',
      'form.contact.label': 'Phone or Email',
      'form.contact.placeholder': '+995 5xx xx xx xx or you@email.com',
      'form.business.label': 'Business Type',
      'form.business.placeholder': 'Select your business type',
      'form.business.opt.salon': 'Salon / Beauty',
      'form.business.opt.restaurant': 'Restaurant / Cafe',
      'form.business.opt.auto': 'Auto Service',
      'form.business.opt.retail': 'Retail / Shop',
      'form.business.opt.professional': 'Professional Services',
      'form.business.opt.other': 'Other',
      'form.message.label': 'Message',
      'form.message.optional': '(optional)',
      'form.message.placeholder': 'Tell us a little about your project...',
      'form.sending': 'Sending...',
      'form.success': "Thanks! Your request has been received - we'll be in touch soon.",
      'form.error.name': 'Please enter your full name.',
      'form.error.contact': 'Enter a valid phone number or email.',
      'form.error.business': 'Please select your business type.',
      'footer.tagline': 'Websites for small and medium businesses.',
      'footer.contactTitle': 'Get in touch',
      'footer.copyright': 'All rights reserved.',
    },
  };

  const LANG_KEY = 'gridly-lang';
  let currentLang = localStorage.getItem(LANG_KEY) || 'ge';

  // Populated by the price estimator; read by the contact form submit handler.
  let lastEstimate = null;
  // Set once the estimator initializes; re-run on language change to refresh translated units.
  let refreshEstimate = null;

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || key;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang === 'ge' ? 'ka' : 'en';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key));
    });

    const titleEl = document.getElementById('page-title');
    const descEl = document.getElementById('page-desc');
    if (titleEl) titleEl.textContent = t('page.title');
    if (descEl) descEl.setAttribute('content', t('page.desc'));

    document.querySelectorAll('.lang-switch').forEach((langSwitch) => {
      langSwitch.setAttribute('data-active', currentLang);
      langSwitch.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.lang === currentLang));
      });
    });

    document.querySelectorAll('.counter').forEach((el) => {
      const num = (el.textContent.match(/-?\d+/) || [el.dataset.target || '0'])[0];
      el.textContent = num + counterSuffix(el);
    });
  }

  function setLang(lang) {
    if (lang !== 'ge' && lang !== 'en') return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyTranslations();
    if (refreshEstimate) refreshEstimate();
  }

  // Multiple lang-switch instances exist (desktop header + mobile drawer) - keep them in sync.
  document.querySelectorAll('.lang-switch').forEach((langSwitch) => {
    langSwitch.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-btn');
      if (!btn) return;
      setLang(btn.dataset.lang);
    });
  });

  applyTranslations();

  /* ---------------- Theme Toggle ---------------- */
  const root = document.documentElement;
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const THEME_KEY = 'gridly-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      applyTheme(saved);
      return;
    }
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }

  themeToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
      if (typeof updateScrollColors === 'function') updateScrollColors();
    });
  });

  initTheme();

  /* ---------------- Header scroll state ---------------- */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');

  function onScroll() {
    const scrolled = window.scrollY > 12;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Mobile nav toggle ---------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  function closeMenu() {
    header.classList.remove('nav-open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.addEventListener('click', (e) => {
    if (e.target.closest('.nav-link') || e.target.closest('.nav-tools a')) closeMenu();
  });

  document.addEventListener('click', (e) => {
    if (header.classList.contains('nav-open') &&
        !header.contains(e.target)) {
      closeMenu();
    }
  });

  /* ---------------- Scroll reveal animations ---------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  let revealObserver = null;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* ---------------- Animated counters ---------------- */
  const counters = document.querySelectorAll('.counter');

  function counterSuffix(el) {
    return (currentLang === 'ge' && el.dataset.suffixGe) || el.dataset.suffix || '';
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || '0');
    const suffix = counterSuffix(el);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = (el.dataset.target || '0') + counterSuffix(el);
    });
  }

  /* ---------------- Scroll-driven background color shift ---------------- */
  let bgTicking = false;

  function updateScrollColors() {
    bgTicking = false;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const isLight = root.getAttribute('data-theme') === 'light';
    const sat = isLight ? '75%' : '85%';
    const light = isLight ? '55%' : '62%';
    const alpha = isLight ? 0.12 : 0.18;
    const baseHue = 220 + progress * 360;

    [0, 55, 110].forEach((offset, i) => {
      const hue = (baseHue + offset) % 360;
      root.style.setProperty(`--glow-color-${i + 1}`, `hsla(${hue}, ${sat}, ${light}, ${alpha})`);
    });

    const glows = document.querySelectorAll('.bg-glow');
    glows.forEach((el, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      el.style.transform = `translate3d(0, ${dir * progress * 80}px, 0)`;
    });

    // Base page background gently darkens/lightens and tints as you scroll,
    // riding two overlapping waves so it doesn't just repeat once per page.
    const wave = Math.sin(progress * Math.PI * 2.4) * 0.6 + Math.sin(progress * Math.PI * 5.3) * 0.4;
    const bgSat = isLight ? 22 : 20;
    const bgLight = isLight ? 97 + wave * 2.5 : 6.5 + wave * 4;
    root.style.setProperty('--bg', `hsl(${baseHue.toFixed(1)}, ${bgSat}%, ${bgLight.toFixed(1)}%)`);
  }

  window.addEventListener('scroll', () => {
    if (!bgTicking) {
      bgTicking = true;
      requestAnimationFrame(updateScrollColors);
    }
  }, { passive: true });
  updateScrollColors();

  /* ---------------- Tilt + glow interactions ---------------- */
  const tiltEls = document.querySelectorAll('.tilt-glow');
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (supportsHover) {
    tiltEls.forEach((el) => {
      const maxTilt = 4;

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;

        el.style.setProperty('--mx', `${px}%`);
        el.style.setProperty('--my', `${py}%`);

        const rotateY = ((x / rect.width) - 0.5) * (maxTilt * 2);
        const rotateX = ((y / rect.height) - 0.5) * -(maxTilt * 2);
        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.removeProperty('--mx');
        el.style.removeProperty('--my');
      });
    });
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-question').forEach((other) => {
        if (other !== btn) other.setAttribute('aria-expanded', 'false');
      });

      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------------- Price Estimator + request form ---------------- */
  const estimatorForm = document.getElementById('estimator-form');

  if (estimatorForm) {
    // Overwritten by pricing_config on load (values set in /admin.html) —
    // these are just the offline/fallback defaults so the calculator still
    // works if Supabase is unreachable.
    let BASE_PRICE_GEL = 350;
    let PRICE_PER_PAGE_GEL = 100;
    let PRICE_PER_LANGUAGE_GEL = 150;
    let MAINTENANCE_PRICE_PER_PAGE_GEL = 20;
    let SEO_PRICE_PER_PAGE_GEL = 30;
    // The page-count field can never go below this (a "multi-page" site is
    // at least 2 pages), but the fee-free page count is one lower - so the
    // pre-selected default of 2 already carries one page's worth of fee.
    const MIN_PAGE_COUNT = 2;
    const FREE_PAGE_COUNT = 1;
    // Same logic as page count: at least 2 languages for "multi-language",
    // but only the first is fee-free, so the default of 2 already charges.
    const MIN_LANG_COUNT = 2;
    const FREE_LANG_COUNT = 1;
    const USD_RATE = 2.7;
    const CUR_KEY = 'gridly-estimator-currency';

    const currencySwitch = document.getElementById('est-currency-switch');
    const totalAmountEl = document.getElementById('est-total-amount');
    const totalCurrencyEl = document.getElementById('est-total-currency');
    const selectedListEl = document.getElementById('est-selected-list');
    const quoteFieldsEl = document.getElementById('est-quote-fields');
    const pageCountRow = document.getElementById('est-page-count');
    const pageCountInput = document.getElementById('est-pageCount');
    const pageCountPriceEl = document.getElementById('est-page-count-price');
    const langCountRow = document.getElementById('est-lang-count');
    const langCountInput = document.getElementById('est-langCount');
    const langCountPriceEl = document.getElementById('est-lang-count-price');
    const animationsTypeRow = document.getElementById('est-animations-type');

    let currentCurrency = localStorage.getItem(CUR_KEY) === 'USD' ? 'USD' : 'GEL';
    let lastConsultState = null;
    let lastMultiPageState = null;
    let lastMultiLangState = null;
    let lastAnimationsState = null;

    // Tracks the order options were selected in, so the receipt lists them
    // in that order instead of a fixed layout order - the map's insertion
    // order is what getReceiptItems sorts by.
    let selectionSeq = 0;
    const selectionOrder = new Map();

    // Smoothly reveals/hides a collapsible section by animating max-height
    // and opacity (plus margin/padding-top, for sections with a border-top
    // divider that would otherwise leave a visible sliver at 0 height).
    // Reused by the quote-mode fields, the page-count field, and the
    // language-count field so all of them expand/collapse the same way.
    function setCollapseOpen(el, open, animate) {
      el.removeEventListener('transitionend', el._onTransitionEnd || (() => {}));
      if (!el._collapseMetrics) {
        const cs = getComputedStyle(el);
        el._collapseMetrics = { marginTop: cs.marginTop, paddingTop: cs.paddingTop };
      }
      const { marginTop, paddingTop } = el._collapseMetrics;

      if (!animate) {
        el.style.transition = 'none';
        if (open) {
          el.hidden = false;
          el.style.maxHeight = 'none';
          el.style.opacity = '1';
          el.style.marginTop = '';
          el.style.paddingTop = '';
        } else {
          el.hidden = true;
          el.style.maxHeight = '0px';
          el.style.opacity = '0';
          el.style.marginTop = '0px';
          el.style.paddingTop = '0px';
        }
        void el.offsetHeight;
        el.style.transition = '';
        return;
      }

      if (open) {
        el.hidden = false;
        el.style.maxHeight = '0px';
        el.style.opacity = '0';
        el.style.marginTop = '0px';
        el.style.paddingTop = '0px';
        void el.offsetHeight;
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.opacity = '1';
        el.style.marginTop = marginTop;
        el.style.paddingTop = paddingTop;
        const onEnd = (e) => {
          if (e.propertyName !== 'max-height') return;
          el.style.maxHeight = 'none';
          el.removeEventListener('transitionend', onEnd);
        };
        el._onTransitionEnd = onEnd;
        el.addEventListener('transitionend', onEnd);
      } else {
        el.style.maxHeight = `${el.scrollHeight}px`;
        void el.offsetHeight;
        el.style.maxHeight = '0px';
        el.style.opacity = '0';
        el.style.marginTop = '0px';
        el.style.paddingTop = '0px';
        const onEnd = (e) => {
          if (e.propertyName !== 'max-height') return;
          el.hidden = true;
          el.removeEventListener('transitionend', onEnd);
        };
        el._onTransitionEnd = onEnd;
        el.addEventListener('transitionend', onEnd);
      }
    }

    function toDisplay(gelAmount) {
      return currentCurrency === 'USD' ? Math.round(gelAmount / USD_RATE) : gelAmount;
    }

    function isConsultMode() {
      const mode = estimatorForm.querySelector('input[name="mode"]:checked');
      return !mode || mode.value === 'consult';
    }

    function isAnimationsSelected() {
      const input = estimatorForm.querySelector('input[name="feature"][value="animations"]');
      return !!input && input.checked;
    }

    function checkedInputs() {
      const animationsOn = isAnimationsSelected();
      return Array.from(estimatorForm.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked'))
        .filter((input) => input.name !== 'mode')
        // The "ანიმაციები" checkbox itself is just a reveal toggle (free) - the
        // actual priced line item is whichever animationsType radio is picked,
        // and that radio only counts while the toggle is checked.
        .filter((input) => !(input.name === 'feature' && input.value === 'animations'))
        .filter((input) => input.name !== 'animationsType' || animationsOn);
    }

    function getInputPriceGel(input) {
      return Number(input.dataset.price || 0);
    }

    function isMultiPage() {
      const pagesInput = estimatorForm.querySelector('input[name="pages"]:checked');
      return !!pagesInput && pagesInput.value === 'multi';
    }

    function getPageCount() {
      if (!isMultiPage()) return FREE_PAGE_COUNT;
      const value = Math.round(Number(pageCountInput.value));
      return Number.isFinite(value) ? Math.max(MIN_PAGE_COUNT, value) : MIN_PAGE_COUNT;
    }

    function getExtraPagesCount() {
      return Math.max(0, getPageCount() - FREE_PAGE_COUNT);
    }

    function getExtraPagesPriceGel() {
      return getExtraPagesCount() * PRICE_PER_PAGE_GEL;
    }

    function isMaintenanceSelected() {
      const input = estimatorForm.querySelector('input[name="feature"][value="maintenance"]');
      return !!input && input.checked;
    }

    // Maintenance costs more to cover a multi-page site, scaling with the
    // same extra-page count the base multi-page pricing already uses.
    function getMaintenanceExtraPriceGel() {
      if (!isMaintenanceSelected()) return 0;
      return getExtraPagesCount() * MAINTENANCE_PRICE_PER_PAGE_GEL;
    }

    function isSeoSelected() {
      const input = estimatorForm.querySelector('input[name="feature"][value="seo"]');
      return !!input && input.checked;
    }

    // SEO takes more work to cover a multi-page site, scaling with the same
    // extra-page count the base multi-page pricing already uses.
    function getSeoExtraPriceGel() {
      if (!isSeoSelected()) return 0;
      return getExtraPagesCount() * SEO_PRICE_PER_PAGE_GEL;
    }

    function isMultiLang() {
      const langInput = estimatorForm.querySelector('input[name="lang"]:checked');
      return !!langInput && langInput.value === 'multi';
    }

    function getLangCount() {
      if (!isMultiLang()) return FREE_LANG_COUNT;
      const value = Math.round(Number(langCountInput.value));
      return Number.isFinite(value) ? Math.max(MIN_LANG_COUNT, value) : MIN_LANG_COUNT;
    }

    function getExtraLanguagesCount() {
      return Math.max(0, getLangCount() - FREE_LANG_COUNT);
    }

    function getExtraLanguagesPriceGel() {
      return getExtraLanguagesCount() * PRICE_PER_LANGUAGE_GEL;
    }

    function computeTotalGel() {
      if (isConsultMode()) return 0;
      let total = BASE_PRICE_GEL;
      checkedInputs().forEach((input) => { total += getInputPriceGel(input); });
      total += getExtraPagesPriceGel();
      total += getExtraLanguagesPriceGel();
      total += getMaintenanceExtraPriceGel();
      total += getSeoExtraPriceGel();
      return total;
    }

    function selectedLabelText(input) {
      const text = input.closest('.est-pill').querySelector('.est-pill-text');
      return text ? text.textContent : input.value;
    }

    // The key each priced option is tracked under in selectionOrder - an
    // extra-pages/languages/maintenance/seo surcharge line shares its
    // parent option's key, so it sorts right alongside it.
    function orderKeyFor(input) {
      if (input.name === 'animationsType') return 'feature:animations';
      if (input.name === 'feature') return `feature:${input.value}`;
      if (input.name === 'pages') return 'pages';
      if (input.name === 'lang') return 'lang';
      return input.name;
    }

    // Every option that can appear as its own receipt line, currently active.
    function getActiveOrderKeys() {
      const keys = new Set();
      checkedInputs()
        .filter((input) => getInputPriceGel(input) > 0)
        .forEach((input) => keys.add(orderKeyFor(input)));
      if (getExtraPagesCount() > 0) keys.add('pages');
      if (getExtraLanguagesCount() > 0) keys.add('lang');
      if (getMaintenanceExtraPriceGel() > 0) keys.add('feature:maintenance');
      if (getSeoExtraPriceGel() > 0) keys.add('feature:seo');
      return keys;
    }

    // Keeps selectionOrder in sync with what's currently selected, so the
    // receipt can sort by "when was this picked" instead of a fixed layout
    // order. Newly active options get the next sequence number; options no
    // longer active are forgotten (so re-picking one later re-queues it).
    function syncSelectionOrder() {
      const active = getActiveOrderKeys();
      Array.from(selectionOrder.keys()).forEach((key) => {
        if (!active.has(key)) selectionOrder.delete(key);
      });
      active.forEach((key) => {
        if (!selectionOrder.has(key)) selectionOrder.set(key, ++selectionSeq);
      });
    }

    function getReceiptItems() {
      if (isConsultMode()) {
        return [{ label: t('estimator.mode.consult'), priceDisplay: toDisplay(0) }];
      }
      const dynamicItems = checkedInputs()
        .filter((input) => getInputPriceGel(input) > 0)
        .map((input) => ({
          label: selectedLabelText(input),
          priceDisplay: toDisplay(getInputPriceGel(input)),
          orderKey: orderKeyFor(input),
        }));
      const extraPages = getExtraPagesCount();
      if (extraPages > 0) {
        dynamicItems.push({
          label: `${t('estimator.pages.extra')} (+${extraPages})`,
          priceDisplay: toDisplay(getExtraPagesPriceGel()),
          orderKey: 'pages',
        });
      }
      const extraLanguages = getExtraLanguagesCount();
      if (extraLanguages > 0) {
        dynamicItems.push({
          label: `${t('estimator.lang.extra')} (+${extraLanguages})`,
          priceDisplay: toDisplay(getExtraLanguagesPriceGel()),
          orderKey: 'lang',
        });
      }
      const maintenanceExtraGel = getMaintenanceExtraPriceGel();
      if (maintenanceExtraGel > 0) {
        dynamicItems.push({
          label: `${t('estimator.features.maintenance.extra')} (+${getExtraPagesCount()})`,
          priceDisplay: toDisplay(maintenanceExtraGel),
          orderKey: 'feature:maintenance',
        });
      }
      const seoExtraGel = getSeoExtraPriceGel();
      if (seoExtraGel > 0) {
        dynamicItems.push({
          label: `${t('estimator.features.seo.extra')} (+${getExtraPagesCount()})`,
          priceDisplay: toDisplay(seoExtraGel),
          orderKey: 'feature:seo',
        });
      }
      dynamicItems.sort((a, b) => (selectionOrder.get(a.orderKey) ?? 0) - (selectionOrder.get(b.orderKey) ?? 0));
      return [
        { label: t('estimator.base'), priceDisplay: toDisplay(BASE_PRICE_GEL) },
        ...dynamicItems,
      ];
    }

    function updateEstimate() {
      const consult = isConsultMode();
      const modeChanged = lastConsultState !== null && lastConsultState !== consult;
      setCollapseOpen(quoteFieldsEl, !consult, modeChanged);
      lastConsultState = consult;
      syncSelectionOrder();

      document.querySelectorAll('.est-price-tag[data-price]').forEach((el) => {
        const gel = Number(el.dataset.price);
        el.textContent = `+${toDisplay(gel)} ${currentCurrency}`;
      });

      const multiPage = isMultiPage();
      const multiPageChanged = lastMultiPageState !== null && lastMultiPageState !== multiPage;
      setCollapseOpen(pageCountRow, multiPage, multiPageChanged);
      lastMultiPageState = multiPage;
      if (pageCountPriceEl) {
        const extraGel = getExtraPagesPriceGel();
        pageCountPriceEl.textContent = extraGel > 0 ? `+${toDisplay(extraGel)} ${currentCurrency}` : '';
      }

      const multiLang = isMultiLang();
      const multiLangChanged = lastMultiLangState !== null && lastMultiLangState !== multiLang;
      setCollapseOpen(langCountRow, multiLang, multiLangChanged);
      lastMultiLangState = multiLang;
      if (langCountPriceEl) {
        const extraGel = getExtraLanguagesPriceGel();
        langCountPriceEl.textContent = extraGel > 0 ? `+${toDisplay(extraGel)} ${currentCurrency}` : '';
      }

      const animationsOn = isAnimationsSelected();
      const animationsChanged = lastAnimationsState !== null && lastAnimationsState !== animationsOn;
      setCollapseOpen(animationsTypeRow, animationsOn, animationsChanged);
      lastAnimationsState = animationsOn;

      const totalGel = computeTotalGel();
      totalAmountEl.textContent = toDisplay(totalGel);
      totalCurrencyEl.textContent = currentCurrency;

      const items = consult ? [t('estimator.mode.consult')] : checkedInputs().map((input) => {
        const label = selectedLabelText(input);
        if (input.name === 'pages' && input.value === 'multi') return `${label} (${getPageCount()})`;
        if (input.name === 'lang' && input.value === 'multi') return `${label} (${getLangCount()})`;
        return label;
      });

      // Receipt only lists priced line items (base + paid add-ons) - free/default
      // selections don't need a price row, keeping the summary uncluttered.
      const receiptItems = getReceiptItems();
      selectedListEl.innerHTML = '';
      receiptItems.forEach((item) => {
        const li = document.createElement('li');
        const labelSpan = document.createElement('span');
        labelSpan.className = 'est-receipt-label';
        labelSpan.textContent = item.label;
        const priceSpan = document.createElement('span');
        priceSpan.className = 'est-receipt-price';
        priceSpan.textContent = `${item.priceDisplay} ${currentCurrency}`;
        li.append(labelSpan, priceSpan);
        selectedListEl.appendChild(li);
      });

      lastEstimate = {
        items,
        totalGel,
        totalDisplay: toDisplay(totalGel),
        currency: currentCurrency,
        packageSummary: items.join(', '),
      };
    }

    function setCurrencyUI() {
      currencySwitch.setAttribute('data-active', currentCurrency);
      currencySwitch.querySelectorAll('.est-currency-btn').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.currency === currentCurrency));
      });
    }

    currencySwitch.addEventListener('click', (e) => {
      const btn = e.target.closest('.est-currency-btn');
      if (!btn) return;
      currentCurrency = btn.dataset.currency;
      localStorage.setItem(CUR_KEY, currentCurrency);
      setCurrencyUI();
      updateEstimate();
    });

    // Block the keys that would let someone type a negative or zero count
    // directly (the live total already clamps to the field's minimum via
    // getPageCount/getLangCount, but the field itself should never visibly
    // show 0/-), and snap back to that minimum once they're done typing.
    function guardCountInput(input, min) {
      input.addEventListener('keydown', (e) => {
        if (e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') e.preventDefault();
      });
      input.addEventListener('input', updateEstimate);
      input.addEventListener('blur', () => {
        const value = Math.round(Number(input.value));
        input.value = Number.isFinite(value) ? Math.max(min, value) : min;
        updateEstimate();
      });
    }

    setCurrencyUI();
    estimatorForm.addEventListener('change', updateEstimate);
    guardCountInput(pageCountInput, MIN_PAGE_COUNT);
    guardCountInput(langCountInput, MIN_LANG_COUNT);
    refreshEstimate = updateEstimate;
    updateEstimate();

    // Pull live prices set from /admin.html. Maps each priced input to its
    // pricing_config column, then re-renders with whatever loaded.
    const PRICE_FIELD_SELECTORS = {
      feature_animations_simple: 'input[name="animationsType"][value="simple"]',
      feature_animations_complex: 'input[name="animationsType"][value="complex"]',
      feature_domain: 'input[name="feature"][value="domain"]',
      feature_email: 'input[name="feature"][value="email"]',
      feature_seo: 'input[name="feature"][value="seo"]',
      feature_admin: 'input[name="feature"][value="admin"]',
      feature_maintenance: 'input[name="feature"][value="maintenance"]',
    };

    if (supabase) {
      supabase
        .from('pricing_config')
        .select('base_price, feature_animations_simple, feature_animations_complex, feature_domain, feature_email, feature_seo, feature_admin, feature_maintenance, price_per_page, price_per_language, feature_maintenance_per_page, feature_seo_per_page')
        .eq('id', 'default')
        .single()
        .then(({ data: pricing, error }) => {
          if (error || !pricing) return;
          if (Number.isFinite(Number(pricing.base_price))) BASE_PRICE_GEL = Number(pricing.base_price);
          if (Number.isFinite(Number(pricing.price_per_page))) PRICE_PER_PAGE_GEL = Number(pricing.price_per_page);
          if (Number.isFinite(Number(pricing.price_per_language))) PRICE_PER_LANGUAGE_GEL = Number(pricing.price_per_language);
          if (Number.isFinite(Number(pricing.feature_maintenance_per_page))) MAINTENANCE_PRICE_PER_PAGE_GEL = Number(pricing.feature_maintenance_per_page);
          if (Number.isFinite(Number(pricing.feature_seo_per_page))) SEO_PRICE_PER_PAGE_GEL = Number(pricing.feature_seo_per_page);
          Object.entries(PRICE_FIELD_SELECTORS).forEach(([field, selector]) => {
            if (!Number.isFinite(Number(pricing[field]))) return;
            const input = estimatorForm.querySelector(selector);
            if (!input) return;
            const priceStr = String(Math.round(Number(pricing[field])));
            input.dataset.price = priceStr;
            // The visible "+X GEL" pill badge carries its own data-price
            // (read by the .est-price-tag refresh in updateEstimate) rather
            // than reading the input's - keep it in sync too, or admin edits
            // never show up on the pill even though the total is correct.
            const priceTag = input.closest('.est-pill')?.querySelector('.est-price-tag');
            if (priceTag) priceTag.dataset.price = priceStr;
          });
          updateEstimate();
        })
        .catch(() => { /* offline fallback: keep the defaults already on the page */ });
    }

    /* ---- Request form (built into the estimate summary card) ---- */
    const form = document.getElementById('estimator-contact-form');

    const validators = {
      name: (value) => value.trim().length >= 2 || t('form.error.name'),
      contactMethod: (value) => {
        const v = value.trim();
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRe = /^[+\d][\d\s()-]{6,}$/;
        return emailRe.test(v) || phoneRe.test(v) || t('form.error.contact');
      },
      businessType: (value) => value !== '' || t('form.error.business'),
    };

    function validateField(field) {
      const validator = validators[field.name];
      if (!validator) return true;
      const row = field.closest('.form-row');
      const errorEl = row.querySelector('.field-error');
      const result = validator(field.value);

      if (result === true) {
        row.classList.remove('invalid');
        if (errorEl) errorEl.textContent = '';
        return true;
      }
      row.classList.add('invalid');
      if (errorEl) errorEl.textContent = result;
      return false;
    }

    form.querySelectorAll('input[required], select[required]').forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-row').classList.contains('invalid')) validateField(field);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const requiredFields = form.querySelectorAll('input[required], select[required]');
      let allValid = true;
      requiredFields.forEach((field) => {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) {
        const firstInvalid = form.querySelector('.form-row.invalid input, .form-row.invalid select');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const label = submitBtn.querySelector('.btn-label');
      const originalText = label.textContent;

      submitBtn.disabled = true;
      label.textContent = t('form.sending');

      const contactValue = form.contactMethod.value.trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRe.test(contactValue);

      // selected_package and calculated_price come straight from lastEstimate
      // (computed from the checked calculator inputs), never from a text
      // field the client could edit — the message below has no bearing on them.
      const payload = {
        name: form.name.value.trim(),
        email: isEmail ? contactValue : null,
        phone: isEmail ? null : contactValue,
        business_type: form.businessType.value || null,
        message: form.message.value.trim() || null,
        selected_package: lastEstimate ? lastEstimate.packageSummary : null,
        calculated_price: lastEstimate ? `${lastEstimate.totalDisplay} ${lastEstimate.currency}` : null,
        status: 'New',
      };

      if (!supabase) {
        showModal(t('lead.error'), 'error');
        submitBtn.disabled = false;
        label.textContent = originalText;
        return;
      }

      supabase
        .from('leads')
        .insert(payload)
        .then(({ error }) => {
          if (error) throw error;
          showModal(t('form.success'), 'success');
          form.reset();
          // Send the whole calculator back to its pre-selected "უფასო
          // კონსულტაცია" state too, not just the name/contact fields -
          // the popup alone is confirmation enough, the client shouldn't
          // see their old selections still sitting there.
          estimatorForm.reset();
          updateEstimate();
        })
        .catch(() => {
          showModal(t('lead.error'), 'error');
        })
        .finally(() => {
          submitBtn.disabled = false;
          label.textContent = originalText;
        });
    });
  }

  /* ---------------- Footer year ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

})();
