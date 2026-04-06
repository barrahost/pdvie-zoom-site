/**
 * Assistant IA - Diagnostic Fond Virtuel Zoom
 * École Porteurs de Vie
 * 
 * Assistant conversationnel pré-programmé qui demande uniquement
 * la marque, le modèle et l'année pour déduire la compatibilité.
 */

(function () {
  'use strict';

  // ─── Constantes ────────────────────────────────────────────────
  const BRAND_LIST = [
    'Samsung', 'Xiaomi', 'Redmi', 'POCO', 'Huawei', 'iPhone', 'iPad',
    'Google Pixel', 'OnePlus', 'Oppo', 'Realme', 'Vivo', 'Motorola',
    'Nokia', 'LG', 'Sony', 'Tecno', 'Itel', 'Infinix', 'Autre'
  ];

  const ZOOM_BRANDS_SUPPORTED = ['Samsung', 'Xiaomi', 'Redmi', 'POCO', 'Huawei', 'Google Pixel', 'OnePlus', 'Oppo', 'Realme', 'Vivo', 'iPhone', 'iPad'];

  // ─── État de la conversation ────────────────────────────────────
  let state = {
    step: 'welcome',
    brand: null,
    model: null,
    year: null,
    result: null
  };

  // ─── Création du widget HTML ────────────────────────────────────
  function createWidget() {
    const widget = document.createElement('div');
    widget.id = 'ai-assistant-widget';
    widget.innerHTML = `
      <button id="ai-toggle-btn" aria-label="Ouvrir l'assistant IA" title="Assistant Compatibilité">
        <span class="ai-btn-icon">🤖</span>
        <span class="ai-btn-label">Assistant</span>
        <span class="ai-notif-dot" id="ai-notif-dot"></span>
      </button>

      <div id="ai-chat-panel" role="dialog" aria-label="Assistant Compatibilité Zoom" hidden>
        <div id="ai-chat-header">
          <div class="ai-header-info">
            <span class="ai-header-avatar">🤖</span>
            <div>
              <strong>Assistant PDVie</strong>
              <small>Diagnostic Zoom</small>
            </div>
          </div>
          <button id="ai-close-btn" aria-label="Fermer l'assistant">✕</button>
        </div>

        <div id="ai-chat-messages" role="log" aria-live="polite"></div>

        <div id="ai-chat-input-area">
          <div id="ai-quick-btns"></div>
          <div id="ai-text-input-row" hidden>
            <input type="text" id="ai-text-input" placeholder="Tapez votre réponse..." autocomplete="off" />
            <button id="ai-send-btn" aria-label="Envoyer">➤</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(widget);
    injectStyles();
    bindEvents();
    setTimeout(() => {
      document.getElementById('ai-notif-dot').style.display = 'block';
    }, 3000);
  }

  // ─── Styles CSS du widget ───────────────────────────────────────
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #ai-assistant-widget {
        position: fixed;
        bottom: 28px;
        right: 28px;
        z-index: 9999;
        font-family: 'Montserrat', sans-serif;
      }

      #ai-toggle-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #1a5c3a;
        color: #fff;
        border: none;
        border-radius: 50px;
        padding: 14px 20px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(26,92,58,0.4);
        transition: transform 0.2s, box-shadow 0.2s;
        position: relative;
      }
      #ai-toggle-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 28px rgba(26,92,58,0.5);
      }
      .ai-btn-icon { font-size: 20px; }
      .ai-notif-dot {
        display: none;
        position: absolute;
        top: 6px;
        right: 6px;
        width: 10px;
        height: 10px;
        background: #c9a227;
        border-radius: 50%;
        border: 2px solid #fff;
      }

      #ai-chat-panel {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 360px;
        max-height: 520px;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 8px 40px rgba(0,0,0,0.18);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: aiSlideIn 0.25s ease;
      }
      @keyframes aiSlideIn {
        from { opacity: 0; transform: translateY(20px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      #ai-chat-panel[hidden] { display: none !important; }

      #ai-chat-header {
        background: #1a5c3a;
        color: #fff;
        padding: 14px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .ai-header-info { display: flex; align-items: center; gap: 10px; }
      .ai-header-avatar { font-size: 26px; }
      .ai-header-info strong { display: block; font-size: 14px; }
      .ai-header-info small { font-size: 11px; opacity: 0.8; }
      #ai-close-btn {
        background: none;
        border: none;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 6px;
        transition: background 0.2s;
      }
      #ai-close-btn:hover { background: rgba(255,255,255,0.2); }

      #ai-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: #f8f9fa;
      }

      .ai-msg {
        max-width: 88%;
        padding: 10px 14px;
        border-radius: 14px;
        font-size: 13px;
        line-height: 1.5;
        animation: aiFadeIn 0.2s ease;
      }
      @keyframes aiFadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .ai-msg-bot {
        background: #fff;
        border: 1px solid #e0e0e0;
        border-bottom-left-radius: 4px;
        align-self: flex-start;
        box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      }
      .ai-msg-user {
        background: #1a5c3a;
        color: #fff;
        border-bottom-right-radius: 4px;
        align-self: flex-end;
      }
      .ai-msg-result-ok    { background: #d4edda; border: 1px solid #28a745; color: #155724; }
      .ai-msg-result-no    { background: #f8d7da; border: 1px solid #dc3545; color: #721c24; }
      .ai-msg-result-partial { background: #fff3cd; border: 1px solid #c9a227; color: #856404; }
      .ai-msg-result-unknown { background: #e2e3e5; border: 1px solid #6c757d; color: #383d41; }
      .ai-msg strong { display: block; margin-bottom: 4px; font-size: 14px; }
      .ai-msg .ai-source { font-size: 11px; margin-top: 8px; opacity: 0.75; }
      .ai-msg .ai-source a { color: inherit; }

      .ai-typing {
        display: flex;
        gap: 4px;
        padding: 10px 14px;
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 14px;
        border-bottom-left-radius: 4px;
        align-self: flex-start;
        width: fit-content;
      }
      .ai-typing span {
        width: 7px; height: 7px;
        background: #1a5c3a;
        border-radius: 50%;
        animation: aiDot 1.2s infinite;
      }
      .ai-typing span:nth-child(2) { animation-delay: 0.2s; }
      .ai-typing span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes aiDot {
        0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
      }

      #ai-chat-input-area {
        padding: 12px;
        background: #fff;
        border-top: 1px solid #eee;
      }
      #ai-quick-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .ai-quick-btn {
        background: #f0f7f3;
        border: 1px solid #1a5c3a;
        color: #1a5c3a;
        border-radius: 20px;
        padding: 6px 12px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
      }
      .ai-quick-btn:hover {
        background: #1a5c3a;
        color: #fff;
      }
      #ai-text-input-row {
        display: flex;
        gap: 8px;
      }
      #ai-text-input {
        flex: 1;
        border: 1px solid #ddd;
        border-radius: 20px;
        padding: 8px 14px;
        font-size: 13px;
        outline: none;
        transition: border 0.2s;
      }
      #ai-text-input:focus { border-color: #1a5c3a; }
      #ai-send-btn {
        background: #1a5c3a;
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.2s;
      }
      #ai-send-btn:hover { background: #c9a227; }

      @media (max-width: 480px) {
        #ai-chat-panel { width: calc(100vw - 40px); right: -10px; }
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Événements ─────────────────────────────────────────────────
  function bindEvents() {
    document.getElementById('ai-toggle-btn').addEventListener('click', togglePanel);
    document.getElementById('ai-close-btn').addEventListener('click', closePanel);
    document.getElementById('ai-send-btn').addEventListener('click', handleTextInput);
    document.getElementById('ai-text-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleTextInput();
    });
  }

  function togglePanel() {
    const panel = document.getElementById('ai-chat-panel');
    const dot = document.getElementById('ai-notif-dot');
    if (panel.hidden) {
      panel.hidden = false;
      dot.style.display = 'none';
      if (state.step === 'welcome') startConversation();
    } else {
      panel.hidden = true;
    }
  }

  function closePanel() {
    document.getElementById('ai-chat-panel').hidden = true;
  }

  // ─── Affichage des messages ─────────────────────────────────────
  function addMessage(text, type = 'bot', extraClass = '') {
    const container = document.getElementById('ai-chat-messages');
    const msg = document.createElement('div');
    msg.className = `ai-msg ai-msg-${type} ${extraClass}`;
    msg.innerHTML = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
    return msg;
  }

  function showTyping() {
    const container = document.getElementById('ai-chat-messages');
    const typing = document.createElement('div');
    typing.className = 'ai-typing';
    typing.id = 'ai-typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('ai-typing-indicator');
    if (t) t.remove();
  }

  function botReply(text, delay = 600, extraClass = '') {
    showTyping();
    return new Promise(resolve => {
      setTimeout(() => {
        hideTyping();
        addMessage(text, 'bot', extraClass);
        resolve();
      }, delay);
    });
  }

  function setQuickButtons(buttons) {
    const container = document.getElementById('ai-quick-btns');
    const inputRow = document.getElementById('ai-text-input-row');
    container.innerHTML = '';
    inputRow.hidden = true;

    buttons.forEach(btn => {
      const b = document.createElement('button');
      b.className = 'ai-quick-btn';
      b.textContent = btn.label;
      b.addEventListener('click', () => {
        addMessage(btn.label, 'user');
        container.innerHTML = '';
        btn.action(btn.label);
      });
      container.appendChild(b);
    });
  }

  function showTextInput(placeholder = 'Tapez votre réponse...') {
    const container = document.getElementById('ai-quick-btns');
    const inputRow = document.getElementById('ai-text-input-row');
    const input = document.getElementById('ai-text-input');
    container.innerHTML = '';
    inputRow.hidden = false;
    input.placeholder = placeholder;
    input.value = '';
    setTimeout(() => input.focus(), 100);
  }

  function handleTextInput() {
    const input = document.getElementById('ai-text-input');
    const value = input.value.trim();
    if (!value) return;
    addMessage(value, 'user');
    input.value = '';
    document.getElementById('ai-text-input-row').hidden = true;
    processTextInput(value);
  }

  // ─── Flux de conversation ───────────────────────────────────────
  function startConversation() {
    state = { step: 'welcome', brand: null, model: null, year: null, result: null };

    botReply(`👋 Bonjour ! Je suis l'assistant de l'<strong>École Porteurs de Vie</strong>.<br><br>
      Je peux vous aider à comprendre pourquoi votre appareil n'affiche pas l'option <em>Arrière-plan virtuel</em> dans Zoom.<br><br>
      Commençons par identifier votre appareil.`, 400)
      .then(() => askBrand());
  }

  function askBrand() {
    state.step = 'brand';
    botReply('📱 Quelle est la <strong>marque</strong> de votre téléphone ou tablette ?', 500)
      .then(() => {
        const topBrands = ['Samsung', 'Xiaomi / Redmi', 'iPhone', 'Huawei', 'Autre marque'];
        setQuickButtons(topBrands.map(b => ({
          label: b,
          action: (val) => {
            if (val === 'Autre marque') {
              showTextInput('Ex: Motorola, Nokia, Sony, Tecno...');
              state.step = 'brand_text';
            } else {
              state.brand = val.split(' / ')[0];
              askModel();
            }
          }
        })));
      });
  }

  function processTextInput(value) {
    if (state.step === 'brand_text') {
      state.brand = value;
      askModel();
    } else if (state.step === 'model') {
      state.model = value;
      askYear();
    } else if (state.step === 'year') {
      const y = parseInt(value);
      if (y >= 2010 && y <= 2030) {
        state.year = y;
        runDiagnosis();
      } else {
        botReply('⚠️ Veuillez entrer une année valide (ex: 2022).', 300)
          .then(() => showTextInput("Ex: 2022"));
      }
    }
  }

  function askModel() {
    state.step = 'model';
    const brand = state.brand;
    let hint = '';
    if (brand === 'Samsung') hint = 'Ex: Galaxy A54, Galaxy S22, Note 20...';
    else if (brand === 'Xiaomi' || brand === 'Redmi') hint = 'Ex: Redmi Note 13, Xiaomi 12, POCO X5...';
    else if (brand === 'iPhone') hint = 'Ex: iPhone 11, iPhone SE, iPhone 14...';
    else if (brand === 'Huawei') hint = 'Ex: P30, Mate 40, Nova 9...';
    else hint = 'Ex: Pixel 7, OnePlus 10, Reno 8...';

    botReply(`📋 Quel est le <strong>modèle exact</strong> de votre ${brand} ?<br><small style="color:#666;">${hint}</small>`, 500)
      .then(() => showTextInput(hint));
  }

  function askYear() {
    state.step = 'year';
    botReply(`📅 En quelle <strong>année</strong> avez-vous acheté (ou quelle est l'année de sortie de) votre <strong>${state.brand} ${state.model}</strong> ?`, 500)
      .then(() => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let y = currentYear; y >= currentYear - 6; y--) {
          years.push(String(y));
        }
        years.push('Avant ' + (currentYear - 6));
        setQuickButtons(years.map(y => ({
          label: y,
          action: (val) => {
            if (val.startsWith('Avant')) {
              state.year = currentYear - 7;
            } else {
              state.year = parseInt(val);
            }
            runDiagnosis();
          }
        })));
      });
  }

  // ─── Diagnostic ─────────────────────────────────────────────────
  function runDiagnosis() {
    state.step = 'result';
    botReply(`🔍 Analyse en cours pour votre <strong>${state.brand} ${state.model}</strong>...`, 400)
      .then(() => {
        // Recherche dans la base de données
        const found = (typeof lookupDevice === 'function')
          ? lookupDevice(state.brand, state.model)
          : null;

        if (found) {
          state.result = found;
          showResult(found);
        } else {
          showUnknownResult();
        }
      });
  }

  function showResult(device) {
    let html = '';
    let cssClass = '';
    let icon = '';

    if (device.status === 'ok') {
      icon = '✅';
      cssClass = 'ai-msg-result-ok';
      html = `<strong>${icon} Appareil potentiellement compatible</strong>
        Votre <strong>${device.brand} ${device.model}</strong> utilise le chipset <strong>${device.chipset}</strong> (GPU : ${device.gpu}), qui répond aux exigences GPU de Zoom pour les fonds virtuels.<br><br>
        ${device.note}<br><br>
        <strong>Si l'option n'apparaît toujours pas :</strong><br>
        — Mettez à jour Zoom vers la dernière version<br>
        — Vérifiez que vous avez Android 8.0 minimum<br>
        — Redémarrez l'application Zoom
        <div class="ai-source">Source : <a href="https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060007" target="_blank">Documentation officielle Zoom</a></div>`;

    } else if (device.status === 'no') {
      icon = '❌';
      cssClass = 'ai-msg-result-no';
      html = `<strong>${icon} Raison probable identifiée</strong>
        Votre <strong>${device.brand} ${device.model}</strong> utilise le chipset <strong>${device.chipset}</strong> (GPU : ${device.gpu}).<br><br>
        ${device.note}<br><br>
        <strong>Exigences GPU Zoom (source officielle) :</strong><br>
        — Mali : G72 minimum<br>
        — Adreno : 540 (Snapdragon 835) minimum<br><br>
        <strong>Alternatives :</strong><br>
        — Placez-vous devant un mur uni et bien éclairé<br>
        — Utilisez un ordinateur si possible<br>
        — Contactez le support à <a href="mailto:info@porteursdevie.org">info@porteursdevie.org</a>
        <div class="ai-source">Source : <a href="https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060007" target="_blank">Documentation officielle Zoom</a> + GSMArena</div>`;

    } else if (device.status === 'partial') {
      icon = '⚠️';
      cssClass = 'ai-msg-result-partial';
      html = `<strong>${icon} Vérification nécessaire</strong>
        Votre <strong>${device.brand} ${device.model}</strong> utilise le chipset <strong>${device.chipset}</strong> (GPU : ${device.gpu}).<br><br>
        ${device.note}<br><br>
        <strong>Comment vérifier :</strong><br>
        — Ouvrez Zoom et rejoignez une réunion<br>
        — Appuyez sur les 3 points (⋯) en bas<br>
        — Si "Arrière-plan virtuel" apparaît → votre appareil est compatible<br>
        — Si l'option est absente → votre appareil n'est pas certifié par Zoom
        <div class="ai-source">Source : <a href="https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060007" target="_blank">Documentation officielle Zoom</a> + GSMArena</div>`;

    } else {
      showUnknownResult();
      return;
    }

    botReply(html, 700, cssClass)
      .then(() => showRestartOption());
  }

  function showUnknownResult() {
    const isKnownBrand = ZOOM_BRANDS_SUPPORTED.some(b =>
      state.brand && state.brand.toLowerCase().includes(b.toLowerCase())
    );

    let html = '';
    if (isKnownBrand) {
      html = `<strong>⚠️ Modèle non répertorié</strong>
        Votre <strong>${state.brand} ${state.model}</strong> ne figure pas dans notre base de données.<br><br>
        <strong>${state.brand}</strong> est listé par Zoom comme fabricant supporté, mais la compatibilité dépend du chipset spécifique de chaque modèle.<br><br>
        <strong>Comment vérifier directement :</strong><br>
        — Ouvrez Zoom et rejoignez une réunion test<br>
        — Appuyez sur les 3 points (⋯) en bas<br>
        — Si "Arrière-plan virtuel" apparaît → compatible<br>
        — Si absent → non certifié par Zoom<br><br>
        Pour une analyse plus précise, contactez-nous à <a href="mailto:info@porteursdevie.org">info@porteursdevie.org</a> en indiquant votre modèle exact.
        <div class="ai-source">Source : <a href="https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060007" target="_blank">Documentation officielle Zoom</a></div>`;
    } else {
      html = `<strong>ℹ️ Marque non listée par Zoom</strong>
        Votre <strong>${state.brand} ${state.model}</strong> appartient à une marque qui ne figure pas dans la liste officielle des fabricants supportés par Zoom pour les fonds virtuels.<br><br>
        <strong>Fabricants officiellement listés par Zoom :</strong><br>
        Samsung, Xiaomi, Huawei, Google, OnePlus, Oppo, Redmi, Vivo<br><br>
        Cela explique très probablement pourquoi l'option "Arrière-plan virtuel" n'apparaît pas dans votre application Zoom.<br><br>
        <strong>Alternatives :</strong><br>
        — Placez-vous devant un mur uni et bien éclairé<br>
        — Utilisez un ordinateur si possible<br>
        — Contactez le support à <a href="mailto:info@porteursdevie.org">info@porteursdevie.org</a>
        <div class="ai-source">Source : <a href="https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060007" target="_blank">Documentation officielle Zoom</a></div>`;
    }

    botReply(html, 700, 'ai-msg-result-unknown')
      .then(() => showRestartOption());
  }

  function showRestartOption() {
    setTimeout(() => {
      botReply('Souhaitez-vous diagnostiquer un autre appareil ?', 400)
        .then(() => {
          setQuickButtons([
            { label: '🔄 Nouveau diagnostic', action: () => startConversation() },
            { label: '📧 Contacter le support', action: () => {
              addMessage('📧 Contacter le support', 'user');
              botReply('Vous pouvez contacter le support de l\'École Porteurs de Vie :<br><br>📧 <a href="mailto:info@porteursdevie.org"><strong>info@porteursdevie.org</strong></a><br>📍 Cocody Angré 7ème tranche, Abidjan', 400);
            }}
          ]);
        });
    }, 300);
  }

  // ─── Initialisation ─────────────────────────────────────────────
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createWidget);
    } else {
      createWidget();
    }
  }

  init();

})();
