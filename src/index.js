import { translations } from "./i18n/index.js";

const CURRENCIES = [
  "AUD",
  "CNY",
  "EUR",
  "GBP",
  "JPY",
  "KRW",
  "SGD",
  "USD",
];
const TRANSLATIONS_JSON = JSON.stringify(translations).replace(/</g, "\\u003c");

const PAGE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f5f4ed">
    <meta name="description" content="${translations.en.metaDescription}">
    <title>${translations.en.title}</title>
    <style>
      :root {
        color-scheme: light;
        --paper: #f5f4ed;
        --surface: #fffefa;
        --ink: #192820;
        --muted: #65716a;
        --line: #d9ded4;
        --green: #245d43;
        --green-dark: #17432f;
        --lime: #d7e7a1;
        --serif: Georgia, "Times New Roman", serif;
        --sans: "Avenir Next", Avenir, "Segoe UI", sans-serif;
      }

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        background:
          radial-gradient(ellipse at 88% 8%, rgb(215 231 161 / 35%), transparent 27rem),
          var(--paper);
        color: var(--ink);
        font-family: var(--sans);
        -webkit-font-smoothing: antialiased;
      }
      a { color: inherit; }
      button, select { font: inherit; }
      button:focus-visible, select:focus-visible, a:focus-visible {
        outline: 3px solid #9aaa4e;
        outline-offset: 3px;
      }
      .shell { width: min(1120px, calc(100% - 48px)); margin: 0 auto; }
      .topbar {
        height: 76px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgb(25 40 32 / 12%);
      }
      .top-actions { display: flex; align-items: center; gap: 20px; }
      .brand {
        display: inline-flex;
        gap: 10px;
        align-items: center;
        text-decoration: none;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: -.025em;
      }
      .brand-mark {
        display: grid;
        width: 30px;
        height: 30px;
        place-items: center;
        border-radius: 50%;
        background: var(--green);
        color: var(--paper);
        font-family: var(--serif);
        font-size: 19px;
        font-style: italic;
      }
      .toplink {
        color: var(--muted);
        font-size: 13px;
        text-decoration-thickness: 1px;
        text-underline-offset: 4px;
      }
      .language-select {
        width: auto;
        min-height: 36px;
        padding: 0 28px 0 10px;
        border-color: var(--line);
        font-size: 12px;
      }
      .hero {
        display: grid;
        grid-template-columns: 1fr minmax(370px, .88fr);
        gap: clamp(42px, 8vw, 112px);
        align-items: center;
        padding: clamp(62px, 9vw, 112px) 0 88px;
      }
      .eyebrow, .section-kicker {
        margin: 0 0 20px;
        color: var(--green);
        font-size: 11px;
        font-weight: 750;
        letter-spacing: .15em;
        text-transform: uppercase;
      }
      h1, h2, p { margin-top: 0; }
      h1 {
        max-width: 560px;
        margin-bottom: 22px;
        font-family: var(--serif);
        font-size: clamp(48px, 6vw, 76px);
        font-weight: 400;
        letter-spacing: -.065em;
        line-height: .99;
      }
      h1 em { color: var(--green); font-weight: 400; }
      .intro {
        max-width: 420px;
        margin-bottom: 30px;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.75;
      }
      .selector {
        padding: 30px;
        border: 1px solid var(--line);
        background: var(--surface);
        box-shadow: 0 20px 55px rgb(30 53 39 / 7%);
      }
      .selector-head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 27px;
      }
      .selector-head h2 {
        margin: 0;
        font-family: var(--serif);
        font-size: 25px;
        font-weight: 400;
        letter-spacing: -.03em;
      }
      .field-label {
        display: block;
        margin-bottom: 9px;
        color: var(--muted);
        font-size: 12px;
        font-weight: 600;
      }
      .currency-row {
        display: grid;
        grid-template-columns: 1fr 42px 1fr;
        align-items: end;
        gap: 10px;
      }
      select {
        width: 100%;
        min-height: 53px;
        padding: 0 34px 0 14px;
        border: 1px solid var(--line);
        border-radius: 0;
        appearance: none;
        background:
          linear-gradient(45deg, transparent 50%, var(--muted) 50%) calc(100% - 18px) 23px / 5px 5px no-repeat,
          linear-gradient(135deg, var(--muted) 50%, transparent 50%) calc(100% - 14px) 23px / 5px 5px no-repeat,
          var(--surface);
        color: var(--ink);
        font-size: 14px;
        font-weight: 650;
        cursor: pointer;
      }
      .swap {
        width: 42px;
        height: 53px;
        border: 0;
        background: transparent;
        color: var(--green);
        font-size: 21px;
        cursor: pointer;
        transition: transform 180ms ease;
      }
      .swap:hover { transform: rotate(180deg); }
      .pair-caption {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin: 16px 0 8px;
        color: var(--muted);
        font-size: 11px;
      }
      .pair-caption span:last-child { text-align: right; }
      .result {
        min-height: 58px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 0 14px;
        background: #f0f3e8;
      }
      .result-url {
        min-width: 0;
        overflow-wrap: anywhere;
        color: var(--green-dark);
        font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
        font-size: 13px;
        font-weight: 650;
      }
      .result-actions { display: flex; flex: 0 0 auto; gap: 6px; align-items: center; }
      .copy {
        display: inline-grid;
        width: 36px;
        height: 36px;
        place-items: center;
        flex: 0 0 auto;
        padding: 0;
        border: 1px solid #c8d2c2;
        background: transparent;
        color: var(--green-dark);
        cursor: pointer;
      }
      .copy:hover, .copy-value:hover { background: #e4ead9; }
      .copy svg, .copy-value svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.7; }
      .open-link {
        display: inline-flex;
        min-height: 36px;
        align-items: center;
        gap: 5px;
        padding: 0 10px;
        background: var(--green);
        color: #fffefa;
        font-size: 11px;
        font-weight: 700;
        text-decoration: none;
      }
      .open-link:hover { background: var(--green-dark); }
      .open-link svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; }
      .result-note { margin: 12px 0 0; color: var(--muted); font-size: 11px; line-height: 1.5; }
      .copy-value {
        display: inline-grid;
        width: 28px;
        height: 28px;
        place-items: center;
        flex: 0 0 auto;
        padding: 0;
        border: 1px solid #c8d2c2;
        background: transparent;
        color: var(--green-dark);
        cursor: pointer;
      }
      .guide {
        padding: 65px 0 76px;
        border-top: 1px solid rgb(25 40 32 / 14%);
      }
      .guide-top {
        display: grid;
        grid-template-columns: .7fr 1fr;
        gap: 50px;
        align-items: end;
        margin-bottom: 31px;
      }
      .guide-top h2 {
        margin: 0;
        font-family: var(--serif);
        font-size: clamp(34px, 4vw, 47px);
        font-weight: 400;
        letter-spacing: -.055em;
      }
      .guide-top p {
        max-width: 460px;
        margin: 0 0 3px;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.7;
      }
      .guide-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 28px;
        align-items: center;
        padding: 18px 0;
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
      }
      .control-group { display: flex; flex-wrap: wrap; gap: 7px; align-items: center; }
      .control-label {
        margin-right: 6px;
        color: var(--muted);
        font-size: 11px;
        font-weight: 650;
        letter-spacing: .05em;
        text-transform: uppercase;
      }
      .tab {
        min-height: 34px;
        padding: 0 12px;
        border: 1px solid transparent;
        background: transparent;
        color: var(--muted);
        font-size: 12px;
        cursor: pointer;
      }
      .tab[aria-pressed="true"] {
        border-color: #cbd5c7;
        background: var(--surface);
        color: var(--green-dark);
        font-weight: 700;
      }
      .guide-content {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 32px;
        align-items: start;
        padding: 30px 0 0;
      }
      .guide-content h3 {
        margin: 0 0 16px;
        font-family: var(--serif);
        font-size: 25px;
        font-weight: 400;
        letter-spacing: -.035em;
      }
      .steps {
        max-width: 730px;
        margin: 0;
        padding: 0;
        list-style: none;
        counter-reset: guide-step;
      }
      .steps li {
        position: relative;
        min-height: 34px;
        margin: 0 0 12px;
        padding-left: 38px;
        color: #46544b;
        font-size: 14px;
        line-height: 1.65;
        counter-increment: guide-step;
      }
      .steps li::before {
        position: absolute;
        top: 1px;
        left: 0;
        display: grid;
        width: 24px;
        height: 24px;
        place-items: center;
        border: 1px solid #cbd5c7;
        border-radius: 50%;
        color: var(--green);
        content: counter(guide-step);
        font-size: 11px;
        font-weight: 700;
      }
      .steps a { color: var(--green-dark); text-underline-offset: 3px; }
      .copy-details { display: grid; gap: 9px; min-width: 240px; }
      .copy-detail {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) 28px;
        gap: 10px;
        align-items: center;
        padding: 10px 11px;
        background: #e9edde;
      }
      .copy-detail-label {
        color: var(--muted);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .06em;
        text-transform: uppercase;
      }
      .copy-detail-value {
        min-width: 0;
        overflow-wrap: anywhere;
        color: var(--green-dark);
        font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
        font-size: 11px;
      }
      .toast {
        position: fixed;
        z-index: 10;
        right: max(20px, env(safe-area-inset-right));
        bottom: max(20px, env(safe-area-inset-bottom));
        max-width: min(380px, calc(100vw - 40px));
        padding: 15px 19px;
        border: 1px solid #456b53;
        background: var(--green-dark);
        box-shadow: 0 12px 35px rgb(25 40 32 / 22%);
        color: #fffefa;
        font-size: 13px;
        line-height: 1.45;
        opacity: 0;
        transform: translateY(10px);
        visibility: hidden;
        transition: opacity 180ms ease, transform 180ms ease, visibility 180ms;
      }
      .toast.is-visible {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
      }
      .fine-print {
        display: flex;
        gap: 10px;
        margin: 32px 0 0;
        padding-top: 18px;
        border-top: 1px solid var(--line);
        color: var(--muted);
        font-size: 12px;
        line-height: 1.65;
      }
      .fine-print strong { color: var(--ink); }
      footer {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding: 20px 0 28px;
        border-top: 1px solid rgb(25 40 32 / 14%);
        color: var(--muted);
        font-size: 11px;
      }
      footer a { text-underline-offset: 3px; }
      @media (max-width: 760px) {
        .shell { width: min(100% - 36px, 560px); }
        .topbar { height: 65px; }
        .hero { grid-template-columns: 1fr; gap: 36px; padding: 61px 0 63px; }
        h1 { max-width: 480px; font-size: clamp(49px, 13vw, 69px); }
        .intro { margin-bottom: 22px; }
        .selector { padding: 23px 20px; }
        .guide { padding: 51px 0 57px; }
        .guide-top { grid-template-columns: 1fr; gap: 13px; }
        .guide-controls { gap: 14px; }
        .control-group { flex-basis: 100%; }
        .guide-content { grid-template-columns: 1fr; gap: 14px; }
        .copy-details { min-width: 0; }
      }
      @media (max-width: 390px) {
        .shell { width: calc(100% - 28px); }
        .selector { padding: 20px 15px; }
        .currency-row { grid-template-columns: 1fr 32px 1fr; gap: 5px; }
        .swap { width: 32px; }
        select { padding-left: 10px; font-size: 12px; }
        .result { padding: 0 9px; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
      }
    </style>
  </head>
  <body>
    <header class="shell topbar">
      <a class="brand" href="/" aria-label="FX alerts home" data-i18n-aria="brandLabel">
        <span class="brand-mark" aria-hidden="true">ƒ</span>
        <span>cppHusky <span aria-hidden="true">/</span> FX alerts</span>
      </a>
      <div class="top-actions">
        <a class="toplink" href="https://fx.cpphusky.xyz/app"><span data-i18n="openWebApp">Open web app</span> ↗</a>
        <select class="language-select" id="language-select" aria-label="Select language" data-i18n-aria="languageSelector"></select>
      </div>
    </header>

    <main>
      <section class="shell hero" aria-labelledby="page-title">
        <div>
          <p class="eyebrow" data-i18n="eyebrow">A little closer to the right rate</p>
          <h1 id="page-title"><span id="hero-title-line-1">Watch the rate.</span><br><em id="hero-title-line-2">Not the screen.</em></h1>
          <p class="intro" data-i18n="intro">Choose the currencies you care about and subscribe to a quiet FX alert. ntfy will let you know when your target currency gets cheaper.</p>
        </div>

        <form class="selector" id="pair-form">
          <div class="selector-head">
            <h2 data-i18n="builderTitle">Build your alert</h2>
          </div>
          <div class="currency-row">
            <label>
              <span class="field-label" data-i18n="targetLabel">I want to buy</span>
              <select id="target" name="target" aria-label="Currency you want to buy" data-i18n-aria="targetAria"></select>
            </label>
            <button class="swap" type="button" id="swap" aria-label="Swap currencies" title="Swap currencies" data-i18n-aria="swapAria" data-i18n-title="swapAria">⇄</button>
            <label>
              <span class="field-label" data-i18n="sourceLabel">I pay with</span>
              <select id="source" name="source" aria-label="Currency you pay with" data-i18n-aria="sourceAria"></select>
            </label>
          </div>
          <div class="pair-caption">
            <span><span data-i18n="targetCaption">Target currency</span> <strong id="target-code"></strong></span>
            <span><span data-i18n="sourceCaption">Source currency</span> <strong id="source-code"></strong></span>
          </div>
          <div class="result">
            <span class="result-url" id="channel-url">fx.cpphusky.xyz/JPY-USD</span>
            <div class="result-actions">
              <button class="copy" type="button" id="copy" aria-label="Copy channel link" title="Copy channel link" data-i18n-aria="copyLinkAria" data-i18n-title="copyLinkTitle">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"></path></svg>
              </button>
              <a class="open-link" id="open-link" href="https://fx.cpphusky.xyz/JPY-USD" target="_blank" rel="noopener noreferrer">
                <span data-i18n="openLink">Open</span> <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9 2h5v5M14 2 7 9"></path><path d="M12 9v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4"></path></svg>
              </a>
            </div>
          </div>
        </form>
      </section>

      <section class="guide" aria-labelledby="guide-title">
        <div class="shell">
          <div class="guide-top">
            <div>
              <p class="section-kicker" data-i18n="getStarted">Get started</p>
              <h2 id="guide-title"><span id="guide-title-line-1">Your alerts,</span><br><span id="guide-title-line-2">your way.</span></h2>
            </div>
            <p data-i18n="guideIntro">Choose how you’d like to receive notifications. You can subscribe in the ntfy app or right in your browser.</p>
          </div>
          <div class="guide-controls" aria-label="Subscription instructions" data-i18n-aria="guideControlsAria">
            <div class="control-group" role="group" aria-label="Choose your device" data-i18n-aria="deviceAria">
              <span class="control-label" data-i18n="deviceLabel">Device</span>
              <button class="tab" type="button" data-device="desktop" aria-pressed="true" data-i18n="desktop">Desktop</button>
              <button class="tab" type="button" data-device="android" aria-pressed="false" data-i18n="android">Android</button>
              <button class="tab" type="button" data-device="ios" aria-pressed="false" data-i18n="ios">iPhone / iPad</button>
            </div>
            <div class="control-group" role="group" aria-label="Choose app or browser" data-i18n-aria="clientAria">
              <span class="control-label" data-i18n="useLabel">Use</span>
              <button class="tab" type="button" data-client="app" aria-pressed="true" data-i18n="app">ntfy app</button>
              <button class="tab" type="button" data-client="browser" aria-pressed="false" data-i18n="browser">Browser</button>
            </div>
          </div>
          <div class="guide-content" id="guide-content" aria-live="polite"></div>
          <p class="fine-print"><span aria-hidden="true">ⓘ</span><span><strong data-i18n="alertsLead">About these alerts.</strong> <span data-i18n="alertsInfo">Notifications are sent when the target currency’s rate is lower than 95% of observations from the past 30 days. This service is for information only, not investment advice.</span></span></p>
        </div>
      </section>
    </main>

    <footer class="shell">
      <span data-i18n="footerNote">Independent, self-hosted ntfy server · uptime isn’t guaranteed.</span>
      <a href="https://github.com/cppHusky/fx-logger"><span data-i18n="github">GitHub</span> ↗</a>
    </footer>
    <div class="toast" id="toast" role="status" aria-live="polite" aria-atomic="true"></div>

    <script>
      const messagesByLocale = ${TRANSLATIONS_JSON};
      const currencies = ${JSON.stringify(CURRENCIES)};
      const target = document.querySelector("#target");
      const source = document.querySelector("#source");
      const channelUrl = document.querySelector("#channel-url");
      const openLink = document.querySelector("#open-link");
      const toast = document.querySelector("#toast");
      const languageSelect = document.querySelector("#language-select");
      let toastTimeout;
      let locale = "en";
      let messages = messagesByLocale.en;

      for (const [code, dictionary] of Object.entries(messagesByLocale)) {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = dictionary.languageName;
        languageSelect.append(option);
      }

      function showToast(message) {
        window.clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.classList.add("is-visible");
        toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
      }
      const content = document.querySelector("#guide-content");
      let device = "desktop";
      let client = "app";

      function normalizeLocale(language) {
        const normalized = language.toLowerCase().replaceAll("_", "-");
        if (normalized.startsWith("zh")) {
          return /(?:^|[-])(?:tw|hk|mo|hant)(?:$|[-])/i.test(normalized) ? "zh-TW" : "zh-CN";
        }
        const baseLanguage = normalized.split("-")[0];
        return messagesByLocale[baseLanguage] ? baseLanguage : null;
      }

      function detectLocale() {
        try {
          const stored = localStorage.getItem("fx-homepage-locale");
          if (stored && messagesByLocale[stored]) return stored;
        } catch {
          // Storage may be unavailable in private browsing modes.
        }

        for (const language of navigator.languages || [navigator.language]) {
          const candidate = normalizeLocale(language);
          if (candidate && messagesByLocale[candidate]) return candidate;
        }
        return "en";
      }

      function applyLocale(nextLocale) {
        locale = messagesByLocale[nextLocale] ? nextLocale : "en";
        messages = messagesByLocale[locale];
        document.documentElement.lang = locale;
        document.title = messages.title;
        document.querySelector('meta[name="description"]').content = messages.metaDescription;

        document.querySelectorAll("[data-i18n]").forEach((element) => {
          const value = messages[element.dataset.i18n];
          if (typeof value === "string") element.textContent = value;
        });
        document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
          element.setAttribute("aria-label", messages[element.dataset.i18nAria]);
        });
        document.querySelectorAll("[data-i18n-title]").forEach((element) => {
          element.title = messages[element.dataset.i18nTitle];
        });

        document.querySelector("#hero-title-line-1").textContent = messages.titleLine1;
        document.querySelector("#hero-title-line-2").textContent = messages.titleLine2;
        document.querySelector("#guide-title-line-1").textContent = messages.guideTitleLine1;
        document.querySelector("#guide-title-line-2").textContent = messages.guideTitleLine2;
        languageSelect.value = locale;
        for (const select of [target, source]) {
          for (const option of select.options) {
            option.textContent = option.value + " — " + messages.currencies[option.value];
          }
        }
      }

      for (const code of currencies) {
        for (const select of [target, source]) {
          const option = document.createElement("option");
          option.value = code;
          option.textContent = code + " — " + messages.currencies[code];
          select.append(option);
        }
      }
      target.value = "JPY";
      source.value = "USD";

      function updatePair() {
        if (target.value === source.value) {
          const alternative = currencies.find(([code]) => code !== target.value)?.[0];
          source.value = alternative;
        }
        const topic = target.value + "-" + source.value;
        const url = "https://fx.cpphusky.xyz/" + topic;
        channelUrl.textContent = url.replace("https://", "");
        openLink.href = url;
        document.querySelector("#target-code").textContent = target.value;
        document.querySelector("#source-code").textContent = source.value;
        document.querySelectorAll(".dynamic-topic").forEach((node) => {
          node.textContent = topic;
        });
      }

      function escapeHtml(value) {
        return value.replace(/[&<>"']/g, (character) => ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character]);
      }

      function updateGuide() {
        const selected = messages.guide[device][client];
        const copyDetailsLabel = escapeHtml(messages.copyDetailsAria);
        const serverLabel = escapeHtml(messages.serverLabel);
        const channelLabel = escapeHtml(messages.channelLabel);
        const copyServerAria = escapeHtml(messages.copyServerAria);
        const copyServerTitle = escapeHtml(messages.copyServerTitle);
        const copyChannelAria = escapeHtml(messages.copyChannelAria);
        const copyChannelTitle = escapeHtml(messages.copyChannelTitle);
        content.innerHTML = '<div><h3>' + selected.title + '</h3><ol class="steps">' +
          selected.steps.map((step) => "<li>" + step + "</li>").join("") +
          '</ol></div><div class="copy-details" aria-label="' + copyDetailsLabel + '">' +
          '<div class="copy-detail"><span class="copy-detail-label">' + serverLabel + '</span><code class="copy-detail-value">https://fx.cpphusky.xyz</code>' +
          '<button class="copy-value" type="button" data-copy-value="server" aria-label="' + copyServerAria + '" title="' + copyServerTitle + '">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"></path></svg></button></div>' +
          '<div class="copy-detail"><span class="copy-detail-label">' + channelLabel + '</span><code class="copy-detail-value dynamic-topic"></code>' +
          '<button class="copy-value" type="button" data-copy-value="topic" aria-label="' + copyChannelAria + '" title="' + copyChannelTitle + '">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"></path></svg></button></div></div>';
        content.querySelectorAll(".dynamic-topic").forEach((node) => {
          node.textContent = target.value + "-" + source.value;
        });
        content.querySelectorAll("[data-copy-value]").forEach((button) => {
          button.addEventListener("click", async () => {
            const isServer = button.dataset.copyValue === "server";
            const value = isServer ? "https://fx.cpphusky.xyz" : target.value + "-" + source.value;
            try {
              await navigator.clipboard.writeText(value);
              showToast(isServer ? messages.copiedServer : messages.copiedChannel);
            } catch {
              showToast(messages.copyUnavailable);
            }
          });
        });
      }

      document.querySelectorAll("[data-device]").forEach((button) => {
        button.addEventListener("click", () => {
          device = button.dataset.device;
          document.querySelectorAll("[data-device]").forEach((tab) =>
            tab.setAttribute("aria-pressed", String(tab === button))
          );
          updateGuide();
        });
      });
      document.querySelectorAll("[data-client]").forEach((button) => {
        button.addEventListener("click", () => {
          client = button.dataset.client;
          document.querySelectorAll("[data-client]").forEach((tab) =>
            tab.setAttribute("aria-pressed", String(tab === button))
          );
          updateGuide();
        });
      });
      target.addEventListener("change", () => { updatePair(); updateGuide(); });
      source.addEventListener("change", () => { updatePair(); updateGuide(); });
      languageSelect.addEventListener("change", () => {
        applyLocale(languageSelect.value);
        try {
          localStorage.setItem("fx-homepage-locale", locale);
        } catch {
          // The selected language still applies for this page view.
        }
        updateGuide();
      });
      document.querySelector("#swap").addEventListener("click", () => {
        const previousTarget = target.value;
        target.value = source.value;
        source.value = previousTarget;
        updatePair();
        updateGuide();
      });
      document.querySelector("#pair-form").addEventListener("submit", (event) => event.preventDefault());
      document.querySelector("#copy").addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(openLink.href);
          showToast(messages.copiedLink);
        } catch {
          showToast(messages.copyUnavailable);
        }
      });

      applyLocale(detectLocale());
      updatePair();
      updateGuide();
    </script>
  </body>
</html>`;

export default {
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname !== "/") {
      return new Response("Not found", { status: 404 });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    return new Response(request.method === "HEAD" ? null : PAGE, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      },
    });
  },
};
