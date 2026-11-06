// Deck Challenge (Prudential brand): guided prompt coach + lineage → generate → submit → score /10.
import { api } from "./api.js";
import { esc, toast } from "./util.js";
import { createViewer } from "./deck_renderer.js";

const qs = new URLSearchParams(location.search);
const EMBED = location.pathname.startsWith("/embed") || location.pathname.startsWith("/c2-embed") || qs.has("embed");
const PARENT_ORIGIN = qs.get("parent") || (document.referrer ? new URL(document.referrer).origin : "*");
const LANG_ALIAS = { "zh-TW": "yue", "zh-HK": "yue", zh: "zh-CN" };
const LANGS = ["en", "zh-CN", "ms", "ta", "yue"];
const normLang = (l) => { l = LANG_ALIAS[l] || l; return LANGS.includes(l) ? l : "en"; };
const STEP_KEYS = ["role", "context", "task", "format", "constraints"];

const UI_LABELS = {
  en: {
    yourPrompt: "Your prompt",
    words: "words",
    hints: "💡 Hints",
    step: "Step",
    insertBtn: "＋ Insert into prompt",
    buildingDeck: "Building deck…",
    genDeck: "Generate deck",
    regenDeck: "Regenerate deck",
    lineage: "Prompt lineage",
    showLess: "Show less",
    showAll: "Show all",
    evaluating: "Evaluating…",
    submitVer: (v) => `Submit v${v} for evaluation`,
    submitDefault: "Submit for evaluation",
    tabTarget: "Target deck",
    tabYours: (v) => (v ? `Your deck · v${v}` : "Your deck"),
    tabCompare: "Compare",
    tabCase: "Case file",
    dlTarget: "Download target (PPTX)",
    dlMine: "Download my deck (PPTX)",
    emptyDeck: "Generate your first deck to see it here.",
    yourScore: "Your score",
    keepImproving: "Keep improving",
    leaderboard: "Leaderboard",
    resetBtn: "Reset",
    startPrompt: "Starting prompt",
    generatedVer: (v) => `v${v} generated`,
    insertedStep: (s) => `Inserted ${s}`,
    restoredVer: (v) => `Restored v${v}`,
    edited: "Edited",
    hide: "hide",
    changes: "changes",
    view: "view",
    useThisPrompt: "use this prompt",
  },
  "zh-CN": {
    yourPrompt: "您的提示词 (Your Prompt)",
    words: "词",
    hints: "💡 提示词教练 (Hints)",
    step: "步骤",
    insertBtn: "＋ 插入到提示词",
    buildingDeck: "正在生成简报…",
    genDeck: "生成 3页简报 (Generate Deck)",
    regenDeck: "重新生成简报 (Regenerate Deck)",
    lineage: "提示词演进历史",
    showLess: "收起",
    showAll: "展开全部",
    evaluating: "AI 裁判评分中…",
    submitVer: (v) => `提交 v${v} 版本进行评分`,
    submitDefault: "提交简报进行评分",
    tabTarget: "🎯 目标简报 (Target)",
    tabYours: (v) => (v ? `📊 您的简报 · v${v}` : "📊 您的简报"),
    tabCompare: "⚖️ 对比 (Compare)",
    tabCase: "📂 客户档案 (Case File)",
    dlTarget: "下载目标简报 (PPTX)",
    dlMine: "下载我的简报 (PPTX)",
    emptyDeck: "点击左侧「生成 3页简报」即可在此预览您的演示文稿。",
    yourScore: "您的挑战 2 得分",
    keepImproving: "继续优化提示词",
    leaderboard: "排行榜",
    resetBtn: "重置",
    startPrompt: "初始简单提示词",
    generatedVer: (v) => `已生成 v${v} 版本`,
    insertedStep: (s) => `已插入 ${s}`,
    restoredVer: (v) => `已恢复 v${v}`,
    edited: "手动编辑",
    hide: "收起",
    changes: "查看差异",
    view: "查看",
    useThisPrompt: "使用此提示词",
  },
  yue: {
    yourPrompt: "你嘅提示詞 (Your Prompt)",
    words: "字",
    hints: "💡 提示詞教練 (Hints)",
    step: "步驟",
    insertBtn: "＋ 插入去提示詞",
    buildingDeck: "緊係度生成簡報…",
    genDeck: "生成 3頁簡報 (Generate Deck)",
    regenDeck: "重新生成簡報 (Regenerate Deck)",
    lineage: "提示詞演進紀錄",
    showLess: "收起",
    showAll: "顯示全部",
    evaluating: "AI 裁判評分緊…",
    submitVer: (v) => `提交 v${v} 版本去評分`,
    submitDefault: "提交簡報去評分",
    tabTarget: "🎯 目標簡報 (Target)",
    tabYours: (v) => (v ? `📊 你嘅簡報 · v${v}` : "📊 你嘅簡報"),
    tabCompare: "⚖️ 對比 (Compare)",
    tabCase: "📂 客戶檔案 (Case File)",
    dlTarget: "下載目標簡報 (PPTX)",
    dlMine: "下載我份簡報 (PPTX)",
    emptyDeck: "撳左邊「生成 3頁簡報」就可以喺呢度預覽你份簡報。",
    yourScore: "你嘅挑戰 2 得分",
    keepImproving: "繼續改良提示詞",
    leaderboard: "排行榜",
    resetBtn: "重設",
    startPrompt: "初始簡單提示詞",
    generatedVer: (v) => `已生成 v${v} 版本`,
    insertedStep: (s) => `已插入 ${s}`,
    restoredVer: (v) => `已還原 v${v}`,
    edited: "手動修改",
    hide: "收起",
    changes: "睇下改咗咩",
    view: "睇下",
    useThisPrompt: "用呢句提示詞",
  },
  ms: {
    yourPrompt: "Prompt Anda",
    words: "perkataan",
    hints: "💡 Panduan (Hints)",
    step: "Langkah",
    insertBtn: "＋ Masukkan ke dalam prompt",
    buildingDeck: "Sedang membina dek…",
    genDeck: "Jana Dek (Generate Deck)",
    regenDeck: "Jana Semula Dek (Regenerate)",
    lineage: "Sejarah Evolusi Prompt",
    showLess: "Ringkaskan",
    showAll: "Lihat semua",
    evaluating: "Sedang menilai…",
    submitVer: (v) => `Hantar v${v} untuk penilaian`,
    submitDefault: "Hantar untuk penilaian",
    tabTarget: "🎯 Dek Sasaran",
    tabYours: (v) => (v ? `📊 Dek Anda · v${v}` : "📊 Dek Anda"),
    tabCompare: "⚖️ Bandingkan",
    tabCase: "📂 Fail Kes",
    dlTarget: "Muat turun sasaran (PPTX)",
    dlMine: "Muat turun dek saya (PPTX)",
    emptyDeck: "Jana dek pertama anda untuk melihatnya di sini.",
    yourScore: "Skor Anda",
    keepImproving: "Terus tambah baik",
    leaderboard: "Papan Pendahulu",
    resetBtn: "Set Semula",
    startPrompt: "Prompt permulaan",
    generatedVer: (v) => `v${v} dijana`,
    insertedStep: (s) => `Dimasukkan ${s}`,
    restoredVer: (v) => `Dipulihkan v${v}`,
    edited: "Diedit",
    hide: "sembunyi",
    changes: "perubahan",
    view: "lihat",
    useThisPrompt: "guna prompt ini",
  },
  ta: {
    yourPrompt: "உங்கள் ப்ராம்ப்ட் (Your Prompt)",
    words: "சொற்கள்",
    hints: "💡 குறிப்புகள் (Hints)",
    step: "படி",
    insertBtn: "＋ ப்ராம்ப்டில் சேர்க்கவும்",
    buildingDeck: "விளக்கக்காட்சி உருவாக்கப்படுகிறது…",
    genDeck: "விளக்கக்காட்சியை உருவாக்கு (Generate)",
    regenDeck: "மீண்டும் உருவாக்கு (Regenerate)",
    lineage: "ப்ராம்ப்ட் வரலாறு",
    showLess: "சுருக்கு",
    showAll: "அனைத்தையும் காட்டு",
    evaluating: "மதிப்பிடப்படுகிறது…",
    submitVer: (v) => `மதிப்பீட்டிற்கு v${v}-ஐ சமர்ப்பிக்கவும்`,
    submitDefault: "மதிப்பீட்டிற்கு சமர்ப்பிக்கவும்",
    tabTarget: "🎯 இலக்கு டெக்",
    tabYours: (v) => (v ? `📊 உங்கள் டெக் · v${v}` : "📊 உங்கள் டெக்"),
    tabCompare: "⚖️ ஒப்பிடு",
    tabCase: "📂 வாடிக்கையாளர் கோப்பு",
    dlTarget: "இலக்கு PPTX பதிவிறக்கம்",
    dlMine: "எனது PPTX பதிவிறக்கம்",
    emptyDeck: "உங்கள் முதல் விளக்கக்காட்சியை இங்கே காண அதை உருவாக்கவும்.",
    yourScore: "உங்கள் மதிப்பெண்",
    keepImproving: "தொடர்ந்து மேம்படுத்துங்கள்",
    leaderboard: "முன்னணி பட்டியல்",
    resetBtn: "மீட்டமை",
    startPrompt: "தொடக்க ப்ராம்ப்ட்",
    generatedVer: (v) => `v${v} உருவாக்கப்பட்டது`,
    insertedStep: (s) => `சேர்க்கப்பட்டது: ${s}`,
    restoredVer: (v) => `மீட்டமைக்கப்பட்டது v${v}`,
    edited: "திருத்தப்பட்டது",
    hide: "மறை",
    changes: "மாற்றங்கள்",
    view: "பார்",
    useThisPrompt: "இந்த ப்ராம்ப்ட்டைப் பயன்படுத்தவும்",
  },
};

const S = {
  market: (qs.get("market") || localStorage.getItem("dc.market") || "MY").toUpperCase() === "SG" ? "SG" : "MY",
  lang: normLang(qs.get("lang") || localStorage.getItem("pamb_agent_lang_v1") || localStorage.getItem("dc.lang") || "en"),
  name: qs.get("participant") || localStorage.getItem("pamb_agent_name_v1") || localStorage.getItem("dc.name") || "",
  pid: qs.get("pid") || localStorage.getItem("pamb_agent_id_v1") || null,
  sessionId: (crypto.randomUUID ? crypto.randomUUID() : String(Math.random())).replace(/-/g, "").slice(0, 16),
  ch: null, versions: [], active: -1, tab: "target", busy: null, result: null, startedAt: Date.now(),
  step: "role", coach: null, lineage: [], openDiff: null, showAllLineage: false, prompt: null, showHints: true,
};
const app = document.getElementById("app");
let viewers = [];

const post = (type, payload) => EMBED && window.parent !== window && window.parent.postMessage({ type, ...payload }, PARENT_ORIGIN);
const cur = () => S.versions[S.active];
const words = (t) => (t.trim().match(/\S+/g) || []).length;
const L = () => UI_LABELS[S.lang] || UI_LABELS.en;

function notifyResize() {
  if (!EMBED || window.parent === window) return;
  requestAnimationFrame(() => {
    const h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 680);
    post("pcs:resize", { height: h + 16 });
  });
}

// ---------------------------------------------------------------- word diff (LCS)
function tokens(t) { return /\s/.test(t) ? t.split(/(\s+)/) : Array.from(t); }
function diffHtml(a, b) {
  const x = tokens(a), y = tokens(b);
  if (x.length * y.length > 400000) return esc(b);
  const m = x.length, n = y.length, dp = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) dp[i][j] = x[i] === y[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  let i = 0, j = 0, out = "";
  while (i < m && j < n) {
    if (x[i] === y[j]) { out += esc(x[i]); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out += `<del>${esc(x[i])}</del>`; i++; }
    else { out += `<ins>${esc(y[j])}</ins>`; j++; }
  }
  while (i < m) out += `<del>${esc(x[i++])}</del>`;
  while (j < n) out += `<ins>${esc(y[j++])}</ins>`;
  return out;
}

function addLineage(type, prompt, extra = {}) {
  const last = S.lineage[S.lineage.length - 1];
  if (last && last.prompt === prompt && type !== "generate") return;
  S.lineage.push({ type, prompt, at: Date.now() / 1000, ...extra });
}

// ---------------------------------------------------------------- load
async function load() {
  app.innerHTML = `<div class="result"><span class="spinner" style="border-top-color:var(--red);border-color:var(--grey-200)"></span></div>`;
  try { S.ch = await api.challenge(S.market, S.lang); }
  catch (e) { app.innerHTML = `<div class="result">⚠️ ${esc(e.message)}</div>`; return; }
  if (S.prompt === null) { S.prompt = S.ch.simple_prompt; addLineage("start", S.prompt); }
  render();
  post("pcs:ready", { app: "deck_challenge", lang: S.lang });
  notifyResize();
}

function header() {
  const sel = document.getElementById("langSel");
  if (sel) {
    sel.innerHTML = Object.entries(S.ch?.langs || { en: "English" }).map(([k, l]) => `<option value="${k}" ${k === S.lang ? "selected" : ""}>${esc(l)}</option>`).join("");
  }
  const rst = document.getElementById("resetBtn");
  if (rst) rst.textContent = L().resetBtn;
  document.querySelectorAll("#marketSeg button").forEach((b) => b.classList.toggle("active", b.dataset.market === S.market));
}

function render() {
  header();
  if (S.result) {
    renderResult();
    notifyResize();
    return;
  }
  const v = cur();
  const ui = L();
  app.innerHTML = `
    <div class="pm">
      <div class="card" id="coachCard">${coachPanel()}</div>
      <div class="card">
        <div class="tabs">
          ${[["target", ui.tabTarget], ["yours", ui.tabYours(v?.version)], ["compare", ui.tabCompare], ["case", ui.tabCase]]
            .map(([k, l]) => `<button data-tab="${k}" class="${S.tab === k ? "active" : ""}">${l}</button>`).join("")}
        </div>
        <div id="tabBody"></div>
      </div>
    </div>`;
  bind();
  renderTab();
  notifyResize();
}

function coachPanel() {
  const ch = S.ch, guide = ch.guide, c = S.coach;
  const ui = L();
  const stepInfo = (k) => c?.steps?.find((s) => s.key === k);
  const g = guide.find((x) => x.key === S.step) || guide[0];
  const si = stepInfo(S.step);
  const idx = STEP_KEYS.indexOf(S.step);
  const gens = S.lineage.filter((e) => e.type === "generate").length;
  const lin = S.showAllLineage ? S.lineage : S.lineage.slice(-5);
  const offset = S.lineage.length - lin.length;
  return `
    <h2>${esc(ui.yourPrompt)}</h2>
    <div class="muted">${esc(ch.ui.challenge)}</div>

    <div class="pwrap">
      <textarea class="prompt" id="prompt" spellcheck="false">${esc(S.prompt ?? "")}</textarea>
      <span class="wc" id="wc">${words(S.prompt || "")} ${esc(ui.words)}</span>
      <button class="btn sm hintsBtn ${S.showHints ? "on" : ""}" id="hintsBtn">${esc(ui.hints)}</button>
    </div>

    ${S.showHints ? `
    <div class="hintsPanel">
      <div class="steps">
        ${guide.map((x, i) => `<button class="step ${stepInfo(x.key)?.status || ""} ${x.key === S.step ? "active" : ""}" data-step="${x.key}">
          <b>${stepInfo(x.key)?.status === "done" ? "✓" : i + 1}</b>${esc(x.label)}</button>`).join("")}
      </div>
      ${c?.headline ? `<p class="headline">💡 ${esc(c.headline)}</p>` : ""}
      <div class="guide">
        <div class="t">${esc(ui.step)} ${idx + 1} · ${esc(g.label)} ${si ? `<span class="tag ${si.status === "done" ? "green" : si.status === "partial" ? "" : "red"}">${si.status}</span>` : ""}</div>
        <div class="tip">${esc(si?.tip || g.tip)}</div>
        <div class="sugg">${esc(si?.suggestion || g.template)}</div>
        <div class="row" style="margin-top:10px">
          <button class="btn sm" id="insertBtn">${esc(ui.insertBtn)}</button>
          <div class="grow"></div>
          <button class="btn sm" id="prevStep" ${idx === 0 ? "disabled" : ""}>‹</button>
          <button class="btn sm" id="nextStep" ${idx === 4 ? "disabled" : ""}>›</button>
        </div>
      </div>
    </div>` : ""}

    <button class="btn primary block" id="genBtn" style="margin-top:12px" ${S.busy ? "disabled" : ""}>${S.busy === "gen" ? `<span class="spinner"></span> ${esc(ui.buildingDeck)}` : gens ? esc(ui.regenDeck) : esc(ui.genDeck)}</button>

    <div class="lineage">
      <div class="row"><span class="label">${esc(ui.lineage)} · ${S.lineage.length}</span><div class="grow"></div>
        ${S.lineage.length > 5 ? `<button class="link" id="allLin">${esc(S.showAllLineage ? ui.showLess : ui.showAll)}</button>` : ""}</div>
      <ul class="lin">${lin.map((e, k) => lineageItem(e, offset + k)).reverse().join("")}</ul>
    </div>

    <div style="margin-top:16px;border-top:1px solid var(--grey-200);padding-top:16px">
      ${EMBED ? "" : `<input class="name" id="name" placeholder="Your name (leaderboard)" value="${esc(S.name)}" style="margin-bottom:8px" />`}
      <button class="btn dark block" id="submitBtn" ${!cur() || S.busy ? "disabled" : ""}>${S.busy === "submit" ? `<span class="spinner"></span> ${esc(ui.evaluating)}` : cur() ? esc(ui.submitVer(cur().version)) : esc(ui.submitDefault)}</button>
    </div>`;
}

function lineageItem(e, i) {
  const ui = L();
  const prev = S.lineage[i - 1];
  const dw = prev ? words(e.prompt) - words(prev.prompt) : 0;
  const t = new Date(e.at * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const title = e.type === "start" ? esc(ui.startPrompt) : e.type === "generate" ? esc(ui.generatedVer(e.version)) :
    e.type === "insert" ? esc(ui.insertedStep(S.ch.guide.find((g) => g.key === e.step)?.label || e.step)) : e.type === "restore" ? esc(ui.restoredVer(e.version)) : esc(ui.edited);
  return `<li class="${e.type === "generate" ? "gen" : ""}"><span class="dot"></span>
    <div class="h">${title} ${e.slides ? `<span class="tag">${e.slides} slides</span>` : ""} ${prev ? `<span class="tag ${dw >= 0 ? "green" : "red"}">${dw >= 0 ? "+" : ""}${dw} ${esc(ui.words)}</span>` : ""}</div>
    <div class="s">${t} · <button class="link" data-diff="${i}" style="padding:0;font-size:11.5px">${esc(S.openDiff === i ? ui.hide : prev ? ui.changes : ui.view)}</button> ·
      <button class="link" data-use="${i}" style="padding:0;font-size:11.5px">${esc(ui.useThisPrompt)}</button></div>
    ${S.openDiff === i ? `<div class="diff">${prev ? diffHtml(prev.prompt, e.prompt) : esc(e.prompt)}</div>` : ""}</li>`;
}

function renderTab() {
  const body = app.querySelector("#tabBody");
  const v = cur();
  const ui = L();
  viewers = [];
  if (S.tab === "case") {
    body.innerHTML = `<div class="casefile">${Object.entries(S.ch.case_file).map(([k, val]) => `<div class="r"><b>${esc(k.replace(/_/g, " "))}</b>${esc(val)}</div>`).join("")}</div>`;
    notifyResize();
    return;
  }
  if (S.tab === "compare") {
    body.innerHTML = `<div class="sbs"><div><h5>${esc(ui.tabTarget)}</h5><div id="vT"></div></div><div><h5>${esc(ui.tabYours(v?.version))}</h5><div id="vY"></div></div></div>`;
    const t = createViewer(body.querySelector("#vT")); t.setDeck(S.ch.target);
    const y = createViewer(body.querySelector("#vY")); y.setDeck(v?.deck || null);
    viewers = [t, y];
    notifyResize();
    return;
  }
  const isT = S.tab === "target";
  body.innerHTML = `<div id="vMain"></div>
    <div class="row" style="margin-top:12px">${isT ? `<button class="btn sm" id="dlT">${esc(ui.dlTarget)}</button>` : v ? `<button class="btn sm" id="dlM">${esc(ui.dlMine)}</button>` : ""}</div>
    ${!isT && !v ? `<div class="empty">${esc(ui.emptyDeck)}</div>` : ""}`;
  const m = createViewer(body.querySelector("#vMain"));
  m.setDeck(isT ? S.ch.target : v?.deck || null);
  viewers = [m];
  if (!isT && !v) body.querySelector("#vMain").innerHTML = "";
  body.querySelector("#dlT")?.addEventListener("click", () => api.targetPptx(S.market, S.lang).catch((e) => toast(e.message, true)));
  body.querySelector("#dlM")?.addEventListener("click", () => api.deckPptx(v.deck).catch((e) => toast(e.message, true)));
  notifyResize();
}

function bind() {
  const ta = app.querySelector("#prompt");
  const ui = L();
  ta.addEventListener("input", () => { S.prompt = ta.value; app.querySelector("#wc").textContent = `${words(ta.value)} ${ui.words}`; });
  app.querySelector("#hintsBtn").onclick = () => { S.showHints = !S.showHints; render(); };
  app.querySelectorAll("[data-step]").forEach((b) => (b.onclick = () => { S.step = b.dataset.step; render(); }));
  app.querySelector("#prevStep")?.addEventListener("click", () => { S.step = STEP_KEYS[Math.max(0, STEP_KEYS.indexOf(S.step) - 1)]; render(); });
  app.querySelector("#nextStep")?.addEventListener("click", () => { S.step = STEP_KEYS[Math.min(4, STEP_KEYS.indexOf(S.step) + 1)]; render(); });
  app.querySelector("#insertBtn")?.addEventListener("click", insertSuggestion);
  app.querySelector("#genBtn").onclick = generate;
  app.querySelector("#submitBtn").onclick = submit;
  app.querySelector("#allLin")?.addEventListener("click", () => { S.showAllLineage = !S.showAllLineage; render(); });
  app.querySelectorAll("[data-diff]").forEach((b) => (b.onclick = () => { const i = +b.dataset.diff; S.openDiff = S.openDiff === i ? null : i; render(); }));
  app.querySelectorAll("[data-use]").forEach((b) => (b.onclick = () => {
    const e = S.lineage[+b.dataset.use];
    S.prompt = e.prompt;
    addLineage("restore", e.prompt, { version: e.version || null });
    if (e.version) { S.active = S.versions.findIndex((x) => x.version === e.version); S.tab = "yours"; }
    render();
  }));
  app.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { S.tab = b.dataset.tab; render(); }));
  app.querySelector("#name")?.addEventListener("input", (e) => { S.name = e.target.value; localStorage.setItem("dc.name", S.name); });
}

function insertSuggestion() {
  const g = S.ch.guide.find((x) => x.key === S.step);
  const text = S.coach?.steps?.find((s) => s.key === S.step)?.suggestion || g.template;
  const ta = app.querySelector("#prompt");
  S.prompt = (ta.value.trim() ? ta.value.trim() + "\n\n" : "") + text;
  addLineage("insert", S.prompt, { step: S.step });
  const next = STEP_KEYS.indexOf(S.step) + 1;
  if (next < 5) S.step = STEP_KEYS[next];
  render();
  const t2 = app.querySelector("#prompt");
  t2.focus(); t2.scrollTop = t2.scrollHeight;
}

async function runCoach(manual) {
  const prompt = (app.querySelector("#prompt")?.value || S.prompt || "").trim();
  if (!prompt) return;
  if (manual) { S.busy = "coach"; render(); }
  try {
    S.coach = await api.coach({ prompt, market: S.market, lang: S.lang, slide_titles: cur()?.deck.slides.map((s) => s.title) || [] });
    S.step = S.coach.next_step || S.step;
  } catch (e) { if (manual) toast(e.message, true); }
  if (manual) S.busy = null;
  if (!S.result) render();
}

async function generate() {
  const prompt = app.querySelector("#prompt").value.trim();
  if (prompt.length < 3) return toast("Type a prompt first", true);
  S.prompt = prompt;
  S.busy = "gen"; render();
  try {
    const version = S.versions.length + 1;
    const r = await api.generate({ prompt, market: S.market, lang: S.lang, session_id: S.sessionId, version });
    S.versions.push({ version, prompt, deck: r.deck, signature: r.signature, at: Date.now() / 1000 });
    S.active = S.versions.length - 1;
    S.tab = "yours";
    addLineage("generate", prompt, { version, slides: r.deck.slides.length });
    post("pcs:deck_generated", { version, slides: r.deck.slides.length, title: r.deck.title });
    fillImages(S.versions[S.active]);
    runCoach(false);
  } catch (e) { toast(e.message, true, 6000); }
  S.busy = null; render();
}

async function fillImages(ver) {
  const targets = ver.deck.slides.filter((s) => s.image_prompt && !s.image);
  if (!targets.length) return;
  try {
    const { images } = await api.images({ session_id: S.sessionId, prompts: targets.map((s) => s.image_prompt) });
    targets.forEach((s, i) => { if (images[i]) s.image = images[i]; else s.image_prompt = null; });
  } catch { targets.forEach((s) => (s.image_prompt = null)); }
  if (!S.result) viewers.forEach((v) => v.redraw());
}

async function submit() {
  const v = cur();
  if (!v) return;
  if (!EMBED && !S.name.trim()) { toast("Enter your name for the leaderboard", true); app.querySelector("#name")?.focus(); return; }
  S.busy = "submit"; render();
  try {
    const history = S.versions.map((x) => ({ version: x.version, prompt: x.prompt, slide_count: x.deck.slides.length, at: x.at }));
    const lineage = S.lineage.filter((e) => e.type !== "start").map((e) => ({ type: e.type, version: e.version || null, step: e.step || null, prompt: e.prompt, at: e.at }));
    const r = await api.submit({ session_id: S.sessionId, name: S.name || "Agent", participant_id: S.pid, market: S.market, lang: S.lang,
      prompt: v.prompt, deck: v.deck, signature: v.signature, history, lineage });
    S.result = { ...r, version: v };
    post("pcs:deck_submitted", {
      submission_id: r.submission_id,
      view_url: new URL(r.view_url, location.origin).toString(),
      total: r.total,
      accuracy: Math.round(r.total * 10),
      breakdown: r.breakdown,
      verdict: r.judge.verdict,
      rubric: r.judge.rubric.map((x) => ({ dimension: x.dimension, score: x.score, comment: x.comment, evidence: x.evidence })),
      coverage: r.judge.coverage,
      checks: r.checks,
      deck: v.deck,
      deck_title: v.deck.title,
      slide_titles: v.deck.slides.map((s) => s.title),
      slides: v.deck.slides.length,
      iterations: S.versions.length,
      seconds: Math.round((Date.now() - S.startedAt) / 1000),
      first_prompt: S.versions[0].prompt,
      final_prompt: v.prompt,
      judge_feedback: r.judge.verdict,
      lineage_events: S.lineage.length,
      market: S.market,
      lang: S.lang,
    });
  } catch (e) { toast(e.message, true, 7000); }
  S.busy = null; render();
}

// ---------------------------------------------------------------- result: score + evaluation cards
function renderResult() {
  const r = S.result;
  const ui = L();
  app.innerHTML = `
    <div class="result">
      <div class="lbl">${esc(ui.yourScore)}</div>
      <div class="score">${r.total.toFixed(1)}<small> / 10</small></div>
      <div class="ecards">${r.judge.rubric.map((x) => `
        <div class="ecard">
          <div class="top"><div class="d">${esc(x.dimension)}</div><div class="v">${x.score}<small>/10</small></div></div>
          <div class="bar"><span style="width:${x.score * 10}%"></span></div>
          <div class="c">${esc(x.comment)}</div>
        </div>`).join("")}</div>
      <div class="actions">
        <button class="btn primary" id="againBtn">${esc(ui.keepImproving)}</button>
        ${EMBED ? "" : `<button class="btn" id="lb2">${esc(ui.leaderboard)}</button>`}
      </div>
    </div>`;
  app.querySelector("#againBtn").onclick = () => {
    S.result = null;
    post("pcs:keep_improving", {});
    render();
    runCoach(false);
  };
  app.querySelector("#lb2")?.addEventListener("click", showLeaderboard);
}

async function showLeaderboard() {
  const m = document.createElement("div");
  m.className = "modal";
  m.innerHTML = `<div class="card"><div class="row" style="margin-bottom:10px"><h2 class="grow">Leaderboard · ${S.market}</h2><button class="btn sm" id="x">✕</button></div><div id="lbBody">Loading…</div></div>`;
  document.body.appendChild(m);
  m.querySelector("#x").onclick = () => m.remove();
  m.onclick = (e) => e.target === m && m.remove();
  try {
    const { leaderboard } = await api.leaderboard(S.market);
    m.querySelector("#lbBody").innerHTML = leaderboard.length ? `<table class="lb"><tr><th>#</th><th>Name</th><th>Score</th><th>Slides</th><th>Versions</th><th></th></tr>
      ${leaderboard.map((r) => `<tr class="${S.result?.submission_id === r.id ? "me" : ""}"><td>${r.rank}</td><td>${esc(r.name)}</td><td><b>${r.total.toFixed(1)}</b></td><td>${r.slides}</td><td>${r.iterations}</td><td><a href="/view/${r.id}" target="_blank">view</a></td></tr>`).join("")}</table>`
      : `<div class="empty">No submissions yet.</div>`;
  } catch (e) { m.querySelector("#lbBody").textContent = e.message; }
}

// ---------------------------------------------------------------- shell & unified Arena language sync
if (EMBED) {
  document.body.classList.add("embed");
  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => notifyResize());
    ro.observe(document.body);
  }
}

window.addEventListener("message", (ev) => {
  if (!ev.data || typeof ev.data !== "object") return;
  if (ev.data.type === "pamb:set_lang") {
    const nextLang = normLang(ev.data.lang);
    if (nextLang !== S.lang) {
      const wasDefaultPrompt = !S.versions.length && (!S.prompt || S.prompt === S.ch?.simple_prompt);
      S.lang = nextLang;
      localStorage.setItem("dc.lang", S.lang);
      if (wasDefaultPrompt) {
        S.prompt = null;
        S.lineage = [];
      }
      S.coach = null;
      load();
    }
  }
});

document.getElementById("langSel").onchange = (e) => {
  S.lang = normLang(e.target.value); localStorage.setItem("dc.lang", S.lang);
  if (!S.versions.length) { S.prompt = null; S.lineage = []; }
  S.coach = null; load();
};
document.querySelectorAll("#marketSeg button").forEach((b) => (b.onclick = () => {
  if (S.versions.length && !confirm("Switching market resets your versions. Continue?")) return;
  S.market = b.dataset.market; localStorage.setItem("dc.market", S.market);
  S.versions = []; S.active = -1; S.result = null; S.coach = null; S.lineage = []; S.prompt = null; load();
}));
document.getElementById("lbBtn").onclick = showLeaderboard;
document.getElementById("resetBtn").onclick = () => {
  if (!confirm("Reset the challenge (versions, lineage and result)?")) return;
  Object.assign(S, { versions: [], active: -1, result: null, coach: null, lineage: [], prompt: null, step: "role", tab: "target", showHints: true, startedAt: Date.now() });
  load();
};
load();
