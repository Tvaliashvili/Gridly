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

  /* ==========================================================================
     Translations (Georgian default, English toggle)
     ========================================================================== */
  const translations = {
    ge: {
      'banner.testMode': 'საიტი მუშაობს სატესტო რეჟიმში - ინფორმაცია შეიძლება შეიცვალოს',
      'page.title': 'Gridly - თანამედროვე საიტები ადგილობრივი ბიზნესებისთვის',
      'page.desc': 'Gridly აშენებს სწრაფ, თანამედროვე და მაღალკონვერტირებად ვებგვერდებს ადგილობრივი ბიზნესებისთვის. მორგებული დიზაინი, ადმინ პანელები, SEO და Google Maps.',
      'nav.services': 'სერვისები',
      'nav.portfolio': 'პორტფოლიო დემოები',
      'nav.faq': 'კითხვები',
      'nav.cta': 'უფასო შეთავაზება',
      'hero.eyebrow': 'ვებ-გვერდები პატარა და საშუალო ბიზნესებისთვის',
      'hero.title': 'გაზარდეთ თქვენი ბიზნესი <span class="text-gradient">Gridly</span>-სთან ერთად',
      'hero.sub': 'სწრაფი, თანამედროვე და მაღალკონვერტირებადი ვებ-გვერდები',
      'hero.cta1': 'უფასო შეთავაზების მიღება',
      'hero.cta2': 'დემოების ნახვა',
      'hero.stat1': 'მზადყოფნა',
      'hero.stat2': 'მობილური ადაპტაცია',
      'hero.chip1': 'გაშვება დღეებში, არა თვეებში',
      'hero.chip2': '+150% მეტი მოთხოვნა',
      'ps.tag': 'რატომ არის მნიშვნელოვანი',
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
      'services.tag': 'რას ვაკეთებთ',
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
      'estimator.tag': 'გამოთვალეთ ღირებულება',
      'estimator.title': 'ფასის კალკულატორი',
      'estimator.desc': 'აირჩიეთ საჭირო ფუნქციები და მიიღეთ სავარაუდო ფასი და ვადა მყისიერად.',
      'estimator.free': 'უფასო',
      'estimator.hours': 'საათი',
      'estimator.days': 'დღე',
      'estimator.mode.title': 'მოთხოვნის ტიპი',
      'estimator.mode.consult': 'კონსულტაცია',
      'estimator.mode.quote': 'პროექტის შეფასება',
      'estimator.pages.title': 'გვერდები',
      'estimator.base': 'საბაზისო პაკეტი',
      'estimator.pages.landing': 'ერთ გვერდიანი',
      'estimator.pages.multi': 'მრავალგვერდიანი საიტი',
      'estimator.lang.title': 'ენა',
      'estimator.lang.ge': 'მხოლოდ ქართული',
      'estimator.lang.dual': 'ორენოვანი (ქართ./ინგლ.)',
      'estimator.features.title': 'ფუნქციები',
      'estimator.features.contact': 'საკონტაქტო ფორმა',
      'estimator.features.hosting': 'ჰოსტინგი',
      'estimator.features.animations': 'მორგებული ანიმაციები',
      'estimator.features.calculator': 'ინტერაქტიული კალკულატორი',
      'estimator.features.cms': 'CMS / ბლოგი',
      'estimator.features.domain': 'დომენი',
      'estimator.features.seo': 'SEO ოპტიმიზაცია',
      'estimator.urgency.title': 'მიწოდების სისწრაფე',
      'estimator.urgency.standard': 'სტანდარტული',
      'estimator.urgency.express': 'ექსპრესი',
      'estimator.summary.title': 'სავარაუდო ღირებულება',
      'estimator.timeframe': 'სავარაუდო მზადყოფნა:',
      'estimator.send': 'მოთხოვნის გაგზავნა',
      'estimator.disclaimer': 'საბოლოო ფასი შეიძლება ოდნავ განსხვავდებოდეს პროექტის დეტალების მიხედვით.',
      'lead.error': 'შეცდომა მოთხოვნის გაგზავნისას. სცადეთ თავიდან.',
      'portfolio.tag': 'ნახეთ საქმეში',
      'portfolio.title': 'დემო პორტფოლიო',
      'portfolio.desc': 'რამდენიმე მაგალითი იმისა, თუ როგორი საიტები გვაქვს აშენებული ისეთი ბიზნესებისთვის, როგორიც თქვენია.',
      'portfolio.c1.tag': 'სილამაზე და სალონი',
      'portfolio.c1.title': 'სალონი Luxe Hair',
      'portfolio.c1.desc': 'ჯავშანზე ორიენტირებული საიტი გალერეით და მომსახურების ფასებით.',
      'portfolio.c2.tag': 'რესტორანი',
      'portfolio.c2.title': 'რესტორანი Tavola',
      'portfolio.c2.desc': 'მენიუ, ჯავშნის ფორმა და მდებარეობის რუკა.',
      'portfolio.c3.tag': 'ავტოსერვისი',
      'portfolio.c3.title': 'ავტოსერვისი ProFix',
      'portfolio.c3.desc': 'სერვისების სია, შეთავაზების მოთხოვნის ფორმა და მომხმარებელთა შეფასებები.',
      'portfolio.demoBtn': 'დემოს ნახვა',
      'faq.tag': 'კითხვები',
      'faq.title': 'ხშირად დასმული კითხვები',
      'faq.desc': 'გაქვთ კითხვები? აქ არის პასუხები ყველაზე ხშირად დასმულ კითხვებზე.',
      'faq.q1': 'რამდენ ხანში მზადდება საიტი?',
      'faq.a1': 'სტარტერი პაკეტი მზადდება 3-5 დღეში, ბიზნესი - 1-2 კვირაში, ხოლო პრო/ადმინ პანელით - 2-3 კვირაში, პროექტის სირთულის მიხედვით.',
      'faq.q2': 'შემიძლია მოგვიანებით ცვლილებების შეტანა?',
      'faq.a2': 'რა თქმა უნდა. თუ გაქვთ ადმინ პანელი, თავად შეგიძლიათ განაახლოთ კონტენტი. ასევე გვაქვს ყოველთვიური მოვლის პაკეტი მცირე ცვლილებებისთვის.',
      'faq.q3': 'რა ღირს ჰოსტინგი და დომენი?',
      'faq.a3': 'ჰოსტინგი და მოვლა შედის ჩვენს ყოველთვიურ 30-50 ლარიან პაკეტში. დომენის ფასი დამოკიდებულია რეგისტრატორზე და ჩვეულებრივ შეადგენს 15-40 ლარს წელიწადში.',
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
      'footer.navTitle': 'ნავიგაცია',
      'footer.contactTitle': 'დაგვიკავშირდით',
      'footer.copyright': 'ყველა უფლება დაცულია.',
      'toast.demo': 'დემო მალე იქნება ხელმისაწვდომი - დაგვიკავშირდით საცნობებელი ვერსიის სანახავად.',
    },
    en: {
      'banner.testMode': 'This website is running in test mode - content may change',
      'page.title': 'Gridly - Modern Websites for Local Businesses',
      'page.desc': 'Gridly builds fast, modern, high-converting websites for local businesses. Custom design, admin panels, SEO & Google Maps setup.',
      'nav.services': 'Services',
      'nav.portfolio': 'Portfolio Demos',
      'nav.faq': 'FAQ',
      'nav.cta': 'Get a Free Quote',
      'hero.eyebrow': 'Websites for small and medium businesses',
      'hero.title': 'Boost Your Business with <span class="text-gradient">Gridly</span>',
      'hero.sub': 'Fast, modern, and high-converting websites.',
      'hero.cta1': 'Get a Free Quote',
      'hero.cta2': 'View Demos',
      'hero.stat1': 'Ready',
      'hero.stat2': 'Mobile-ready design',
      'hero.chip1': 'Live in days, not months',
      'hero.chip2': '+150% more inquiries',
      'ps.tag': 'Why it matters',
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
      'services.tag': 'What we do',
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
      'estimator.tag': 'Calculate your cost',
      'estimator.title': 'Price Estimator',
      'estimator.desc': 'Pick the features you need and get an instant estimated price and delivery timeframe.',
      'estimator.free': 'Free',
      'estimator.hours': 'hours',
      'estimator.days': 'days',
      'estimator.mode.title': 'Request type',
      'estimator.mode.consult': 'Free consultation',
      'estimator.mode.quote': 'Build a project estimate',
      'estimator.pages.title': 'Pages',
      'estimator.base': 'Base package',
      'estimator.pages.landing': 'One Page',
      'estimator.pages.multi': 'Multi-page site',
      'estimator.lang.title': 'Language',
      'estimator.lang.ge': 'Georgian only',
      'estimator.lang.dual': 'Dual language (GE/EN)',
      'estimator.features.title': 'Features',
      'estimator.features.contact': 'Contact Form',
      'estimator.features.hosting': 'Hosting',
      'estimator.features.animations': 'Custom Animations',
      'estimator.features.calculator': 'Interactive Calculator',
      'estimator.features.cms': 'CMS / Blog',
      'estimator.features.domain': 'Domain',
      'estimator.features.seo': 'SEO Optimization',
      'estimator.urgency.title': 'Delivery Urgency',
      'estimator.urgency.standard': 'Standard',
      'estimator.urgency.express': 'Express',
      'estimator.summary.title': 'Estimated total',
      'estimator.timeframe': 'Estimated delivery:',
      'estimator.send': 'Send request',
      'estimator.disclaimer': 'Final pricing may vary slightly based on project details.',
      'lead.error': 'Something went wrong sending your request. Please try again.',
      'portfolio.tag': 'See it in action',
      'portfolio.title': 'Demo Portfolio',
      'portfolio.desc': 'A few examples of the kind of sites we build for local businesses like yours.',
      'portfolio.c1.tag': 'Beauty & Salon',
      'portfolio.c1.title': 'Luxe Hair Salon',
      'portfolio.c1.desc': 'Booking-focused site with gallery & service pricing.',
      'portfolio.c2.tag': 'Restaurant',
      'portfolio.c2.title': 'Tavola Restaurant',
      'portfolio.c2.desc': 'Menu, reservations form & map location.',
      'portfolio.c3.tag': 'Auto Service',
      'portfolio.c3.title': 'ProFix Auto Service',
      'portfolio.c3.desc': 'Service list, quote request form & customer reviews.',
      'portfolio.demoBtn': 'View Demo',
      'faq.tag': 'Questions',
      'faq.title': 'Frequently Asked Questions',
      'faq.desc': "Got questions? Here are answers to the ones we hear most.",
      'faq.q1': 'How long does it take to build a website?',
      'faq.a1': 'The Starter package is ready in 3-5 days, Business takes 1-2 weeks, and Pro/Admin Panel projects take 2-3 weeks depending on complexity.',
      'faq.q2': 'Can I make changes later?',
      'faq.a2': 'Absolutely. If you have an Admin Panel you can update content yourself. We also offer a monthly maintenance package for smaller changes.',
      'faq.q3': 'What does hosting and a domain cost?',
      'faq.a3': 'Hosting and maintenance are included in our monthly 30-50 GEL package. Domain cost depends on the registrar and is usually 15-40 GEL per year.',
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
      'footer.navTitle': 'Navigate',
      'footer.contactTitle': 'Get in touch',
      'footer.copyright': 'All rights reserved.',
      'toast.demo': 'demo coming soon - contact us to see a live preview.',
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
      const isCard = el.classList.contains('portfolio-card');
      const maxTilt = isCard ? 8 : 4;

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

  /* ---------------- Demo portfolio buttons ---------------- */
  const toast = document.getElementById('demo-toast');
  let toastTimer = null;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  const demoNames = {
    salon: { ge: 'Luxe Hair Salon', en: 'Luxe Hair Salon' },
    restaurant: { ge: 'Tavola Restaurant', en: 'Tavola Restaurant' },
    auto: { ge: 'ProFix Auto Service', en: 'ProFix Auto Service' },
  };

  document.querySelectorAll('.demo-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.demo;
      const name = (demoNames[key] && demoNames[key][currentLang]) || 'this project';
      showToast(`"${name}" ${t('toast.demo')}`);
    });
  });

  /* ---------------- Price Estimator + request form ---------------- */
  const estimatorForm = document.getElementById('estimator-form');

  if (estimatorForm) {
    // Overwritten by pricing_config on load (values set in /admin.html) —
    // these are just the offline/fallback defaults so the calculator still
    // works if Supabase is unreachable.
    let BASE_PRICE_GEL = 350;
    const USD_RATE = 2.7;
    const CUR_KEY = 'gridly-estimator-currency';

    const currencySwitch = document.getElementById('est-currency-switch');
    const totalAmountEl = document.getElementById('est-total-amount');
    const totalCurrencyEl = document.getElementById('est-total-currency');
    const timeframeEl = document.getElementById('est-timeframe');
    const timeframeValueEl = document.getElementById('est-timeframe-value');
    const timeframeUnitEl = document.getElementById('est-timeframe-unit');
    const selectedListEl = document.getElementById('est-selected-list');
    const quoteFieldsEl = document.getElementById('est-quote-fields');

    let currentCurrency = localStorage.getItem(CUR_KEY) === 'USD' ? 'USD' : 'GEL';
    let lastConsultState = null;

    function setQuoteFieldsOpen(open, animate) {
      quoteFieldsEl.removeEventListener('transitionend', quoteFieldsEl._onTransitionEnd || (() => {}));

      if (!animate) {
        quoteFieldsEl.style.transition = 'none';
        if (open) {
          quoteFieldsEl.hidden = false;
          quoteFieldsEl.style.maxHeight = 'none';
          quoteFieldsEl.style.opacity = '1';
        } else {
          quoteFieldsEl.hidden = true;
          quoteFieldsEl.style.maxHeight = '0px';
          quoteFieldsEl.style.opacity = '0';
        }
        void quoteFieldsEl.offsetHeight;
        quoteFieldsEl.style.transition = '';
        return;
      }

      if (open) {
        quoteFieldsEl.hidden = false;
        quoteFieldsEl.style.maxHeight = '0px';
        quoteFieldsEl.style.opacity = '0';
        void quoteFieldsEl.offsetHeight;
        quoteFieldsEl.style.maxHeight = `${quoteFieldsEl.scrollHeight}px`;
        quoteFieldsEl.style.opacity = '1';
        const onEnd = (e) => {
          if (e.propertyName !== 'max-height') return;
          quoteFieldsEl.style.maxHeight = 'none';
          quoteFieldsEl.removeEventListener('transitionend', onEnd);
        };
        quoteFieldsEl._onTransitionEnd = onEnd;
        quoteFieldsEl.addEventListener('transitionend', onEnd);
      } else {
        quoteFieldsEl.style.maxHeight = `${quoteFieldsEl.scrollHeight}px`;
        void quoteFieldsEl.offsetHeight;
        quoteFieldsEl.style.maxHeight = '0px';
        quoteFieldsEl.style.opacity = '0';
        const onEnd = (e) => {
          if (e.propertyName !== 'max-height') return;
          quoteFieldsEl.hidden = true;
          quoteFieldsEl.removeEventListener('transitionend', onEnd);
        };
        quoteFieldsEl._onTransitionEnd = onEnd;
        quoteFieldsEl.addEventListener('transitionend', onEnd);
      }
    }

    function toDisplay(gelAmount) {
      return currentCurrency === 'USD' ? Math.round(gelAmount / USD_RATE) : gelAmount;
    }

    function isConsultMode() {
      const mode = estimatorForm.querySelector('input[name="mode"]:checked');
      return !mode || mode.value === 'consult';
    }

    function checkedInputs() {
      return Array.from(estimatorForm.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked'))
        .filter((input) => input.name !== 'mode');
    }

    function computeTotalGel() {
      if (isConsultMode()) return 0;
      let total = BASE_PRICE_GEL;
      checkedInputs().forEach((input) => { total += Number(input.dataset.price || 0); });
      return total;
    }

    function computeTimeframe() {
      const pages = estimatorForm.querySelector('input[name="pages"]:checked').value;
      const lang = estimatorForm.querySelector('input[name="lang"]:checked').value;
      const urgency = estimatorForm.querySelector('input[name="urgency"]:checked').value;
      const features = Array.from(estimatorForm.querySelectorAll('input[name="feature"]:checked')).map((i) => i.value);

      let extraDays = 0;
      if (pages === 'multi') extraDays += 3;
      if (lang === 'dual') extraDays += 1;
      if (features.includes('animations')) extraDays += 2;
      if (features.includes('calculator')) extraDays += 2;
      if (features.includes('cms')) extraDays += 4;

      if (urgency === 'express') {
        return { min: 24, max: extraDays > 3 ? 48 : 24 };
      }
      return { min: 48 + extraDays * 24, max: 72 + extraDays * 24 };
    }

    function formatTimeframe(tf) {
      if (tf.max <= 96) {
        return { value: `${tf.min}-${tf.max}`, unit: t('estimator.hours') };
      }
      return { value: `${Math.round(tf.min / 24)}-${Math.round(tf.max / 24)}`, unit: t('estimator.days') };
    }

    function selectedLabelText(input) {
      const text = input.closest('.est-pill').querySelector('.est-pill-text');
      return text ? text.textContent : input.value;
    }

    function getReceiptItems() {
      if (isConsultMode()) {
        return [{ label: t('estimator.mode.consult'), priceDisplay: toDisplay(0) }];
      }
      return [
        { label: t('estimator.base'), priceDisplay: toDisplay(BASE_PRICE_GEL) },
        ...checkedInputs()
          .filter((input) => Number(input.dataset.price || 0) > 0)
          .map((input) => ({
            label: selectedLabelText(input),
            priceDisplay: toDisplay(Number(input.dataset.price)),
          })),
      ];
    }

    function updateEstimate() {
      const consult = isConsultMode();
      const modeChanged = lastConsultState !== null && lastConsultState !== consult;
      setQuoteFieldsOpen(!consult, modeChanged);
      lastConsultState = consult;
      timeframeEl.hidden = consult;

      document.querySelectorAll('.est-price-tag[data-price]').forEach((el) => {
        const gel = Number(el.dataset.price);
        el.textContent = `+${toDisplay(gel)} ${currentCurrency}`;
      });

      const totalGel = computeTotalGel();
      totalAmountEl.textContent = toDisplay(totalGel);
      totalCurrencyEl.textContent = currentCurrency;

      let timeframeText = '';
      if (!consult) {
        const tfRaw = computeTimeframe();
        const tf = formatTimeframe(tfRaw);
        timeframeValueEl.textContent = tf.value;
        timeframeUnitEl.textContent = tf.unit;
        timeframeText = `${tf.value} ${tf.unit}`;
      }

      const items = consult ? [t('estimator.mode.consult')] : checkedInputs().map(selectedLabelText);

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
        timeframeText,
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

    setCurrencyUI();
    estimatorForm.addEventListener('change', updateEstimate);
    refreshEstimate = updateEstimate;
    updateEstimate();

    // Pull live prices set from /admin.html. Maps each priced input to its
    // pricing_config column, then re-renders with whatever loaded.
    const PRICE_FIELD_SELECTORS = {
      multi_page: 'input[name="pages"][value="multi"]',
      dual_language: 'input[name="lang"][value="dual"]',
      feature_animations: 'input[name="feature"][value="animations"]',
      feature_calculator: 'input[name="feature"][value="calculator"]',
      feature_cms: 'input[name="feature"][value="cms"]',
      feature_domain: 'input[name="feature"][value="domain"]',
      feature_seo: 'input[name="feature"][value="seo"]',
      express_delivery: 'input[name="urgency"][value="express"]',
    };

    if (supabase) {
      supabase
        .from('pricing_config')
        .select('base_price, multi_page, dual_language, feature_animations, feature_calculator, feature_cms, feature_domain, feature_seo, express_delivery')
        .eq('id', 'default')
        .single()
        .then(({ data: pricing, error }) => {
          if (error || !pricing) return;
          if (Number.isFinite(Number(pricing.base_price))) BASE_PRICE_GEL = Number(pricing.base_price);
          Object.entries(PRICE_FIELD_SELECTORS).forEach(([field, selector]) => {
            if (!Number.isFinite(Number(pricing[field]))) return;
            const input = estimatorForm.querySelector(selector);
            if (input) input.dataset.price = String(Math.round(Number(pricing[field])));
          });
          updateEstimate();
        })
        .catch(() => { /* offline fallback: keep the defaults already on the page */ });
    }

    /* ---- Request form (built into the estimate summary card) ---- */
    const form = document.getElementById('estimator-contact-form');
    const formSuccess = document.getElementById('est-form-success');

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
        showToast(t('lead.error'));
        submitBtn.disabled = false;
        label.textContent = originalText;
        return;
      }

      supabase
        .from('leads')
        .insert(payload)
        .then(({ error }) => {
          if (error) throw error;
          formSuccess.classList.add('show');
          form.reset();
          setTimeout(() => formSuccess.classList.remove('show'), 5000);
        })
        .catch(() => {
          showToast(t('lead.error'));
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
