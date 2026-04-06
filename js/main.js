/* ============================================================
   PORTEURS DE VIE - Zoom Fond Virtuel Guide
   Script principal
   ============================================================ */

// ============================================================
// CONFIGURATION PERSONNALISABLE
// ============================================================
const CONFIG = {
  school: {
    name: "École Porteurs de Vie",
    shortName: "PDVie",
    tagline: "Vases d'Honneur — Campus Afrique",
    logo: "images/logo.png",
    backgroundImage: null, // Sera défini dynamiquement selon la classe
    supportWhatsApp: null, // À configurer : ex. "+33612345678"
    supportEmail: "support@porteursdvie.fr",
    supportEmailLabel: "support@porteursdvie.fr"
  },
  classes: [
    { name: "Classe 1 — Campus Afrique", campus: "Campus Afrique", image: "images/classe1.jpg" },
    { name: "Classe 2 — Campus Afrique", campus: "Campus Afrique", image: "images/classe2.jpg" },
    { name: "Classe 3 — Campus Afrique", campus: "Campus Afrique", image: "images/classe3.jpg" },
    { name: "Classe 4 — Campus Afrique", campus: "Campus Afrique", image: "images/classe4.jpg" },
    { name: "Stagiaire — Campus Afrique", campus: "Campus Afrique", image: "images/classestagiaire.jpg" }
  ]
};

// ============================================================
// INITIALISATION
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initConfig();
  initCompatibilityTest();
  initDeviceTabs();
  initGuideTabs();
  initFAQ();
  initCustomization();
  initAdminPanel();
  initDownloadSection();
});

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const toggle = document.getElementById('navbarToggle');
  const menu = document.getElementById('navbarMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.textContent = menu.classList.contains('open') ? '✕' : '☰';
    });

    // Fermer le menu au clic sur un lien
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // Scroll actif
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 20
        ? '0 4px 20px rgba(0,0,0,0.2)'
        : '0 4px 20px rgba(0,0,0,0.12)';
    }
  });
}

// ============================================================
// CONFIGURATION INITIALE
// ============================================================
function initConfig() {
  // Charger la config sauvegardée
  const saved = localStorage.getItem('pdvie_config');
  if (saved) {
    try {
      const savedConfig = JSON.parse(saved);
      Object.assign(CONFIG.school, savedConfig.school || {});
      if (savedConfig.classes) CONFIG.classes = savedConfig.classes;
    } catch (e) {}
  }

  applyConfig();
}

function applyConfig() {
  // Nom de l'école
  document.querySelectorAll('[data-school-name]').forEach(el => {
    el.textContent = CONFIG.school.name;
  });

  // Tagline
  document.querySelectorAll('[data-school-tagline]').forEach(el => {
    el.textContent = CONFIG.school.tagline;
  });

  // Logo
  if (CONFIG.school.logo) {
    // Hero logo
    const heroLogo = document.getElementById('heroLogo');
    const heroPlaceholder = document.getElementById('heroLogoPlaceholder');
    if (heroLogo) { heroLogo.src = CONFIG.school.logo; heroLogo.style.display = 'block'; }
    if (heroPlaceholder) heroPlaceholder.style.display = 'none';

    // Navbar logo
    const navLogo = document.getElementById('navLogo');
    const navPlaceholder = document.getElementById('navLogoPlaceholder');
    if (navLogo) { navLogo.src = CONFIG.school.logo; navLogo.style.display = 'block'; }
    if (navPlaceholder) navPlaceholder.style.display = 'none';
  }

  // Image de fond officielle
  if (CONFIG.school.backgroundImage) {
    document.querySelectorAll('[data-bg-preview]').forEach(el => {
      el.style.backgroundImage = `url(${CONFIG.school.backgroundImage})`;
    });
    const downloadImg = document.getElementById('downloadPreviewImg');
    if (downloadImg) {
      downloadImg.src = CONFIG.school.backgroundImage;
      downloadImg.style.display = 'block';
      const placeholder = document.getElementById('downloadPlaceholder');
      if (placeholder) placeholder.style.display = 'none';
    }
  }

  // WhatsApp
  const waCard = document.getElementById('whatsappCard');
  if (waCard) {
    if (CONFIG.school.supportWhatsApp) {
      waCard.style.display = 'block';
      const waLink = document.getElementById('whatsappLink');
      if (waLink) {
        waLink.href = `https://wa.me/${CONFIG.school.supportWhatsApp.replace(/[^0-9]/g, '')}`;
        waLink.textContent = CONFIG.school.supportWhatsApp;
      }
    } else {
      waCard.style.display = 'none';
    }
  }

  // Email
  const emailLink = document.getElementById('emailLink');
  if (emailLink) {
    emailLink.href = `mailto:${CONFIG.school.supportEmail}`;
    emailLink.textContent = CONFIG.school.supportEmailLabel || CONFIG.school.supportEmail;
  }

  // Classes dans le sélecteur
  updateClassSelector();
}

function updateClassSelector() {
  const select = document.getElementById('classSelect');
  if (!select) return;
  const current = select.value;
  select.innerHTML = '<option value="">-- Sélectionner votre classe --</option>';
  CONFIG.classes.forEach((cls, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = cls.name;
    select.appendChild(opt);
  });
  if (current) select.value = current;
}

function updateClassImage(idx) {
  if (idx === '' || !CONFIG.classes[idx]) return;
  const cls = CONFIG.classes[idx];
  // Aperçu Zoom
  const bgPreview = document.getElementById('zoomPreviewBg');
  if (bgPreview && cls.image) bgPreview.style.backgroundImage = `url(${cls.image})`;
  // Libellé classe
  const classLabel = document.getElementById('zoomPreviewClassLabel');
  if (classLabel) classLabel.textContent = cls.name;
  // Section téléchargement
  if (cls.image) {
    const downloadImg = document.getElementById('downloadPreviewImg');
    const placeholder = document.getElementById('downloadPlaceholder');
    const downloadBtn = document.getElementById('downloadBgBtn');
    if (downloadImg) { downloadImg.src = cls.image; downloadImg.style.display = 'block'; }
    if (placeholder) placeholder.style.display = 'none';
    if (downloadBtn) downloadBtn.dataset.classImage = cls.image;
    // Mettre à jour le titre de téléchargement
    const dlTitle = document.getElementById('downloadTitle');
    if (dlTitle) dlTitle.textContent = cls.name;
  }
}

// ============================================================
// TEST DE COMPATIBILITÉ
// ============================================================
const testQuestions = [
  {
    id: 'device',
    question: 'Quel type d\'appareil utilisez-vous ?',
    options: [
      { value: 'iphone', label: 'iPhone', icon: '📱' },
      { value: 'ipad', label: 'iPad / Tablette Apple', icon: '📲' },
      { value: 'android_phone', label: 'Téléphone Android', icon: '📱' },
      { value: 'android_tablet', label: 'Tablette Android', icon: '📲' },
      { value: 'windows', label: 'Ordinateur Windows', icon: '💻' },
      { value: 'mac', label: 'Mac (macOS)', icon: '🖥️' }
    ]
  },
  {
    id: 'model',
    question: 'Quel est votre modèle / système d\'exploitation ?',
    options: [] // Dynamique selon la réponse précédente
  },
  {
    id: 'ram',
    question: 'Quelle est la RAM de votre appareil Android ?',
    options: [
      { value: 'less_3', label: 'Moins de 3 Go', icon: '⚠️' },
      { value: '3_or_more', label: '3 Go ou plus', icon: '✅' },
      { value: 'unknown', label: 'Je ne sais pas', icon: '❓' }
    ]
  }
];

const modelOptions = {
  iphone: [
    { value: 'iphone_old', label: 'iPhone 7 ou antérieur', icon: '❌' },
    { value: 'iphone_8_x', label: 'iPhone 8, 8 Plus ou X', icon: '✅' },
    { value: 'iphone_new', label: 'iPhone XS ou plus récent', icon: '✅' }
  ],
  ipad: [
    { value: 'ipad_old', label: 'iPad Air 1, Mini 1-4, ou iPad 1-4', icon: '❌' },
    { value: 'ipad_pro', label: 'iPad Pro (tous modèles)', icon: '✅' },
    { value: 'ipad_new', label: 'iPad 9.7" 5e/6e génération ou plus récent', icon: '✅' }
  ],
  android_phone: [
    { value: 'android_old', label: 'Android 7 ou inférieur', icon: '❌' },
    { value: 'android_8_plus', label: 'Android 8 ou supérieur', icon: '⚠️' }
  ],
  android_tablet: [
    { value: 'android_tablet_old', label: 'Android 7 ou inférieur', icon: '❌' },
    { value: 'android_tablet_new', label: 'Android 8 ou supérieur', icon: '⚠️' }
  ],
  windows: [
    { value: 'win_old', label: 'Windows 7 ou inférieur', icon: '❌' },
    { value: 'win_10_11', label: 'Windows 10 ou 11', icon: '✅' }
  ],
  mac: [
    { value: 'mac_old', label: 'macOS 10.13 ou inférieur', icon: '⚠️' },
    { value: 'mac_new', label: 'macOS 10.14 (Mojave) ou supérieur', icon: '✅' }
  ]
};

let testAnswers = {};
let currentQuestion = 0;
let testFlow = ['device'];

function initCompatibilityTest() {
  const startBtn = document.getElementById('startTestBtn');
  if (startBtn) {
    startBtn.addEventListener('click', startTest);
  }

  const restartBtn = document.getElementById('restartTestBtn');
  if (restartBtn) {
    restartBtn.addEventListener('click', resetTest);
  }
}

function startTest() {
  testAnswers = {};
  currentQuestion = 0;
  testFlow = ['device'];

  const intro = document.getElementById('testIntro');
  const questions = document.getElementById('testQuestions');
  if (intro) intro.style.display = 'none';
  if (questions) {
    questions.style.display = 'block';
    questions.classList.add('active');
  }

  renderQuestion();
}

function renderQuestion() {
  const qId = testFlow[currentQuestion];
  const result = document.getElementById('testResult');
  if (result) {
    result.style.display = 'none';
    result.classList.remove('active');
  }

  let question, options;

  if (qId === 'device') {
    question = testQuestions[0].question;
    options = testQuestions[0].options;
  } else if (qId === 'model') {
    question = testQuestions[1].question;
    options = modelOptions[testAnswers.device] || [];
  } else if (qId === 'ram') {
    question = testQuestions[2].question;
    options = testQuestions[2].options;
  }

  const container = document.getElementById('questionContainer');
  if (!container) return;

  const total = testFlow.length;
  const progress = ((currentQuestion) / total) * 100;

  container.innerHTML = `
    <div class="test-progress">
      <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
      <span class="progress-text">Question ${currentQuestion + 1}/${total}</span>
    </div>
    <div class="question-block">
      <label>${question}</label>
      <div class="question-options">
        ${options.map(opt => `
          <button class="option-btn" onclick="selectOption('${qId}', '${opt.value}', this)">
            <span class="option-icon">${opt.icon}</span>
            <span>${opt.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function selectOption(qId, value, btn) {
  // Marquer la sélection
  btn.closest('.question-options').querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  testAnswers[qId] = value;

  // Déterminer le prochain flow
  setTimeout(() => {
    if (qId === 'device') {
      testFlow = ['device', 'model'];
      if (value === 'android_phone' || value === 'android_tablet') {
        testFlow.push('ram');
      }
      currentQuestion = 1;
      renderQuestion();
    } else if (qId === 'model' && testFlow.includes('ram')) {
      currentQuestion = 2;
      renderQuestion();
    } else {
      showTestResult();
    }
  }, 400);
}

function showTestResult() {
  const questions = document.getElementById('testQuestions');
  const result = document.getElementById('testResult');
  if (questions) questions.style.display = 'none';
  if (!result) return;

  result.style.display = 'block';
  result.classList.add('active');

  const { device, model, ram } = testAnswers;
  let status, title, details, tips;

  // Logique de compatibilité
  if (device === 'windows' || device === 'mac') {
    if (model === 'win_old') {
      status = 'partial';
      title = '⚠️ Compatibilité limitée';
      details = ['Windows 7 n\'est plus officiellement supporté par Zoom.', 'Mettez à jour vers Windows 10 ou 11 pour une compatibilité optimale.'];
      tips = ['Envisagez une mise à jour du système d\'exploitation.'];
    } else {
      status = 'supported';
      title = '✅ Appareil compatible !';
      details = ['Votre ordinateur supporte les fonds virtuels Zoom.', 'Assurez-vous d\'avoir la dernière version de Zoom installée.'];
      tips = ['Téléchargez Zoom depuis zoom.us/download', 'Activez le fond virtuel dans Paramètres > Arrière-plan et filtres'];
    }
  } else if (device === 'iphone') {
    if (model === 'iphone_old') {
      status = 'not-supported';
      title = '❌ Appareil non compatible';
      details = ['Votre iPhone ne supporte pas les fonds virtuels Zoom.', 'Les fonds virtuels nécessitent au minimum un iPhone 8.'];
      tips = ['Rejoignez la réunion sans fond virtuel.', 'Utilisez un fond physique (mur uni, tissu) comme alternative.'];
    } else {
      status = 'supported';
      title = '✅ Appareil compatible !';
      details = ['Votre iPhone supporte les fonds virtuels Zoom.', 'Assurez-vous d\'avoir iOS 14 minimum et Zoom version 5.6.6+.'];
      tips = ['Allez dans Paramètres Zoom > Arrière-plan virtuel', 'Téléchargez l\'image officielle de votre classe'];
    }
  } else if (device === 'ipad') {
    if (model === 'ipad_old') {
      status = 'not-supported';
      title = '❌ Tablette non compatible';
      details = ['Votre iPad ne supporte pas les fonds virtuels Zoom.', 'Les anciens modèles d\'iPad ne disposent pas de la puissance nécessaire.'];
      tips = ['Rejoignez la réunion sans fond virtuel.', 'Essayez depuis un ordinateur si possible.'];
    } else {
      status = 'supported';
      title = '✅ Tablette compatible !';
      details = ['Votre iPad supporte les fonds virtuels Zoom.', 'Assurez-vous d\'avoir iPadOS 14 minimum et Zoom version 5.6.6+.'];
      tips = ['Activez le fond virtuel dans les paramètres Zoom', 'Téléchargez l\'image officielle de votre classe'];
    }
  } else if (device === 'android_phone' || device === 'android_tablet') {
    const isOldAndroid = model === 'android_old' || model === 'android_tablet_old';
    const hasLowRam = ram === 'less_3';

    if (isOldAndroid) {
      status = 'not-supported';
      title = '❌ Appareil non compatible';
      details = ['Votre version d\'Android est trop ancienne (Android 7 ou inférieur).', 'Zoom requiert Android 8.0 minimum pour les fonds virtuels.'];
      tips = ['Mettez à jour Android si possible.', 'Rejoignez la réunion sans fond virtuel en attendant.'];
    } else if (hasLowRam) {
      status = 'not-supported';
      title = '❌ RAM insuffisante';
      details = ['Votre appareil a moins de 3 Go de RAM.', 'Zoom requiert au minimum 3 Go de RAM pour les fonds virtuels sur Android.'];
      tips = ['Rejoignez la réunion sans fond virtuel.', 'Essayez depuis un ordinateur ou un autre appareil.'];
    } else if (ram === 'unknown') {
      status = 'partial';
      title = '⚠️ Vérification nécessaire';
      details = ['Votre Android 8+ est potentiellement compatible.', 'La compatibilité dépend aussi du processeur (arm64, 8 cœurs+) et de la RAM (3 Go+).', 'Seuls certains fabricants sont supportés : Samsung, Xiaomi, Huawei, Google, OnePlus, Oppo, Redmi, Vivo.'];
      tips = ['Vérifiez votre RAM dans Paramètres > À propos du téléphone.', 'Essayez d\'activer le fond virtuel dans Zoom — si l\'option n\'apparaît pas, votre appareil n\'est pas compatible.'];
    } else {
      status = 'partial';
      title = '⚠️ Potentiellement compatible';
      details = ['Votre Android 8+ avec 3 Go+ de RAM est potentiellement compatible.', 'La compatibilité dépend aussi du processeur (arm64, 8 cœurs+).', 'Seuls certains fabricants sont supportés : Samsung, Xiaomi, Huawei, Google, OnePlus, Oppo, Redmi, Vivo.'];
      tips = ['Essayez d\'activer le fond virtuel dans Zoom.', 'Si l\'option n\'apparaît pas, votre appareil n\'est pas supporté.'];
    }
  }

  const badgeClass = status === 'supported' ? 'supported' : status === 'partial' ? 'partial' : 'not-supported';

  result.innerHTML = `
    <div class="result-badge ${badgeClass}">${title}</div>
    <div class="result-details">
      <h4>Détails :</h4>
      <ul>${details.map(d => `<li>${d}</li>`).join('')}</ul>
    </div>
    <div class="result-details">
      <h4>Que faire ?</h4>
      <ul>${tips.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>
    <div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <button class="btn btn-outline btn-sm" onclick="resetTest()">🔄 Refaire le test</button>
      ${status !== 'not-supported' ? '<a href="#guide" class="btn btn-primary btn-sm">📖 Voir le guide</a>' : ''}
      <a href="#support" class="btn btn-sm" style="background:#25d366;color:white;">💬 Contacter le support</a>
    </div>
  `;
}

function resetTest() {
  testAnswers = {};
  currentQuestion = 0;
  testFlow = ['device'];

  const intro = document.getElementById('testIntro');
  const questions = document.getElementById('testQuestions');
  const result = document.getElementById('testResult');

  if (intro) intro.style.display = 'block';
  if (questions) { questions.style.display = 'none'; questions.classList.remove('active'); }
  if (result) { result.style.display = 'none'; result.classList.remove('active'); }
}

// ============================================================
// ONGLETS APPAREILS
// ============================================================
function initDeviceTabs() {
  const tabs = document.querySelectorAll('.device-tab');
  const contents = document.querySelectorAll('.device-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const content = document.getElementById('device-' + target);
      if (content) content.classList.add('active');
    });
  });
}

// ============================================================
// ONGLETS GUIDE
// ============================================================
function initGuideTabs() {
  const tabs = document.querySelectorAll('.guide-tab');
  const contents = document.querySelectorAll('.guide-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.guide;
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const content = document.getElementById('guide-' + target);
      if (content) content.classList.add('active');
    });
  });
}

// ============================================================
// FAQ
// ============================================================
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });
}

// ============================================================
// PERSONNALISATION
// ============================================================
function initCustomization() {
  // Aperçu en temps réel
  const classSelect = document.getElementById('classSelect');
  const studentName = document.getElementById('previewStudentName');

  if (classSelect) {
    classSelect.addEventListener('change', () => {
      const idx = classSelect.value;
      updateClassImage(idx);
    });
  }

  if (studentName) {
    studentName.addEventListener('input', () => {
      const nameDisplay = document.getElementById('zoomPreviewName');
      if (nameDisplay) nameDisplay.textContent = studentName.value || 'Votre Nom';
    });
  }
}

// ============================================================
// SECTION TÉLÉCHARGEMENT
// ============================================================
function initDownloadSection() {
  const downloadBtn = document.getElementById('downloadBgBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Priorité : image de la classe sélectionnée, sinon image générale
      const classImage = downloadBtn.dataset.classImage;
      const imageUrl = classImage || CONFIG.school.backgroundImage;
      if (imageUrl) {
        const a = document.createElement('a');
        a.href = imageUrl;
        // Nom du fichier basé sur la classe sélectionnée
        const classSelect = document.getElementById('classSelect');
        let filename = 'fond-virtuel-zoom-pdvie.jpg';
        if (classSelect && classSelect.value !== '' && CONFIG.classes[classSelect.value]) {
          const className = CONFIG.classes[classSelect.value].name
            .replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
          filename = `fond-zoom-${className}.jpg`;
        }
        a.download = filename;
        a.click();
        showToast('✅ Téléchargement démarré !', 'success');
      } else {
        showToast('⚠️ Sélectionnez d’abord votre classe dans la section Aperçu.', 'warning');
      }
    });
  }
}

// ============================================================
// PANNEAU ADMIN
// ============================================================
function initAdminPanel() {
  const toggleBtn = document.getElementById('adminToggle');
  const modal = document.getElementById('adminModal');
  const closeBtn = document.getElementById('adminModalClose');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (modal) modal.classList.add('open');
      populateAdminForm();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  const saveBtn = document.getElementById('adminSaveBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveAdminConfig);
  }

  const addClassBtn = document.getElementById('addClassBtn');
  if (addClassBtn) {
    addClassBtn.addEventListener('click', addClassField);
  }

  // Upload logo admin
  const logoUpload = document.getElementById('adminLogoUpload');
  if (logoUpload) {
    logoUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          CONFIG.school.logo = ev.target.result;
          const preview = document.getElementById('adminLogoPreview');
          if (preview) { preview.src = ev.target.result; preview.style.display = 'block'; }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Upload image de fond admin
  const bgUpload = document.getElementById('adminBgUpload');
  if (bgUpload) {
    bgUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          CONFIG.school.backgroundImage = ev.target.result;
          const preview = document.getElementById('adminBgPreview');
          if (preview) { preview.src = ev.target.result; preview.style.display = 'block'; }
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function populateAdminForm() {
  const nameInput = document.getElementById('adminSchoolName');
  const taglineInput = document.getElementById('adminTagline');
  const waInput = document.getElementById('adminWhatsApp');
  const emailInput = document.getElementById('adminEmail');
  const classList = document.getElementById('adminClassList');

  if (nameInput) nameInput.value = CONFIG.school.name;
  if (taglineInput) taglineInput.value = CONFIG.school.tagline;
  if (waInput) waInput.value = CONFIG.school.supportWhatsApp || '';
  if (emailInput) emailInput.value = CONFIG.school.supportEmail || '';

  if (classList) {
    classList.innerHTML = '';
    CONFIG.classes.forEach((cls, i) => {
      classList.appendChild(createClassField(cls.name, i));
    });
  }
}

function createClassField(value, index) {
  const div = document.createElement('div');
  div.className = 'class-item';
  div.innerHTML = `
    <input type="text" value="${value}" placeholder="Nom de la classe - Campus" />
    <button class="btn-remove" onclick="this.parentElement.remove()" title="Supprimer">✕</button>
  `;
  return div;
}

function addClassField() {
  const classList = document.getElementById('adminClassList');
  if (classList) {
    classList.appendChild(createClassField('', classList.children.length));
  }
}

function saveAdminConfig() {
  const nameInput = document.getElementById('adminSchoolName');
  const taglineInput = document.getElementById('adminTagline');
  const waInput = document.getElementById('adminWhatsApp');
  const emailInput = document.getElementById('adminEmail');
  const classList = document.getElementById('adminClassList');

  if (nameInput) CONFIG.school.name = nameInput.value;
  if (taglineInput) CONFIG.school.tagline = taglineInput.value;
  if (waInput) CONFIG.school.supportWhatsApp = waInput.value || null;
  if (emailInput) CONFIG.school.supportEmail = emailInput.value;

  if (classList) {
    CONFIG.classes = Array.from(classList.querySelectorAll('input'))
      .map(input => ({ name: input.value, campus: input.value.split(' - ')[1] || '' }))
      .filter(cls => cls.name.trim());
  }

  // Sauvegarder dans localStorage
  localStorage.setItem('pdvie_config', JSON.stringify({
    school: CONFIG.school,
    classes: CONFIG.classes
  }));

  applyConfig();

  const modal = document.getElementById('adminModal');
  if (modal) modal.classList.remove('open');

  showToast('✅ Configuration sauvegardée avec succès !', 'success');
}

// ============================================================
// TOAST
// ============================================================
function showToast(message, type = '') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `toast ${type}`;

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3500);
}
