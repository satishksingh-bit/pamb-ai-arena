// Enterprise slide renderer: Deck JSON -> HTML (8 layouts). Pure function, no dependencies.
import { esc } from "./util.js";

const ul = (items) => (items && items.length ? `<ul>${items.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : "");

function imgBox(s) {
  if (!s.image_prompt && !s.image) return "";
  return `<div class="img">${s.image ? `<img src="${esc(s.image)}" alt="" />` : "🖼️ generating image…"}</div>`;
}

function chart(c) {
  const max = Math.max(...c.series.map((p) => p.value), 1);
  return `<div class="col" style="flex:1.2">
    <div class="chart">${c.series.map((p) => `
      <div class="barc"><div class="bv">${esc(String(p.value))}</div>
        <div class="b" style="height:${Math.max(4, (p.value / max) * 78)}%"></div>
        <div class="bl">${esc(p.label)}</div></div>`).join("")}</div>
    ${c.unit ? `<div class="unit">${esc(c.unit)}</div>` : ""}</div>`;
}

function body(s) {
  switch (s.layout) {
    case "kpi":
    case "title":
      return `${s.kpis?.length ? `<div class="kpis">${s.kpis.map((k) => `<div class="kpi"><div class="l">${esc(k.label)}</div><div class="v">${esc(k.value)}</div><div class="n">${esc(k.note || "")}</div></div>`).join("")}</div>` : ""}
        <div class="body"><div class="col">${ul(s.bullets)}</div>${imgBox(s)}</div>`;
    case "chart":
      return `<div class="body">${s.chart?.series?.length ? chart(s.chart) : ""}<div class="col">${ul(s.bullets)}</div>${s.chart ? "" : imgBox(s)}</div>`;
    case "table":
      return `<div class="body"><div class="col">${s.table ? `<table><tr>${s.table.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr>${s.table.rows.map((r) => `<tr>${s.table.headers.map((_, i) => `<td>${esc(r[i] || "")}</td>`).join("")}</tr>`).join("")}</table>` : ""}${ul(s.bullets)}</div>${s.image ? imgBox(s) : ""}</div>`;
    case "two_column":
      return `<div class="body">${[s.left, s.right].filter(Boolean).map((c) => `<div class="col"><div class="colhead">${esc(c.heading)}</div>${ul(c.bullets)}</div>`).join("")}${imgBox(s)}</div>`;
    case "timeline":
      return `${s.steps?.length ? `<div class="steps">${s.steps.map((st) => `<div class="step"><div class="sl">${esc(st.label)}</div><div class="sd">${esc(st.detail)}</div></div>`).join("")}</div>` : ""}
        <div class="body"><div class="col">${ul(s.bullets)}</div>${imgBox(s)}</div>`;
    case "quote":
      return `<div class="body"><div class="col" style="justify-content:center"><div class="quote">${esc(s.callout || (s.bullets || [])[0] || "")}</div></div>${imgBox(s)}</div>`;
    default:
      return `<div class="body"><div class="col">${ul(s.bullets)}${s.kpis?.length ? `<div class="kpis">${s.kpis.map((k) => `<div class="kpi"><div class="l">${esc(k.label)}</div><div class="v">${esc(k.value)}</div></div>`).join("")}</div>` : ""}</div>${imgBox(s)}</div>`;
  }
}

export function renderSlide(s, i = 0, n = 1) {
  return `<div class="slide ${s.layout === "title" ? "title-layout" : ""}">
    <div class="bar"></div>
    <div class="inner">
      <h1>${esc(s.title)}</h1>
      ${s.subtitle ? `<div class="sub">${esc(s.subtitle)}</div>` : ""}
      ${body(s)}
      ${s.callout && s.layout !== "quote" ? `<div class="callout">${esc(s.callout)}</div>` : ""}
    </div>
    <div class="brand">PRUMDA LEARNING TRIP · PRE-PITCH BRIEF</div>
    <div class="pg">${i + 1} / ${n}</div>
  </div>`;
}

// Interactive viewer (main slide + thumbnails + notes + full-screen). Returns {el, setDeck}.
export function createViewer(container, { onFullscreen } = {}) {
  let deck = null, idx = 0, notes = false;
  const draw = () => {
    if (!deck) { container.innerHTML = `<div class="empty">No deck yet</div>`; return; }
    const n = deck.slides.length;
    idx = Math.min(idx, n - 1);
    const s = deck.slides[idx];
    container.innerHTML = `
      <div class="viewer">
        <div class="viewer-bar">
          <div style="font-weight:800">${esc(deck.title)} <span style="color:var(--muted);font-weight:600">· ${n} slide${n > 1 ? "s" : ""}</span></div>
          <div class="nav"><button class="btn" data-a="prev">◀</button> <button class="btn" data-a="next">▶</button>
            <button class="btn" data-a="notes">${notes ? "Hide" : "📝"} notes</button> <button class="btn" data-a="full">⛶</button></div>
        </div>
        <div data-a="full-slide" style="cursor:zoom-in">${renderSlide(s, idx, n)}</div>
        ${notes ? `<div class="notes"><b>Speaker notes:</b> ${esc(s.speaker_notes || "— none —")}</div>` : ""}
        <div class="thumbs">${deck.slides.map((t, k) => `<div class="thumb ${k === idx ? "active" : ""}" data-k="${k}">${renderSlide(t, k, n)}</div>`).join("")}</div>
      </div>`;
    container.querySelector('[data-a="prev"]').onclick = () => { idx = (idx - 1 + n) % n; draw(); };
    container.querySelector('[data-a="next"]').onclick = () => { idx = (idx + 1) % n; draw(); };
    container.querySelector('[data-a="notes"]').onclick = () => { notes = !notes; draw(); };
    const full = () => openFullscreen(deck, idx);
    container.querySelector('[data-a="full"]').onclick = full;
    container.querySelector('[data-a="full-slide"]').onclick = full;
    container.querySelectorAll(".thumb").forEach((t) => (t.onclick = () => { idx = +t.dataset.k; draw(); }));
  };
  return { setDeck: (d, keepIdx = false) => { deck = d; if (!keepIdx) idx = 0; draw(); }, redraw: draw };
}

export function openFullscreen(deck, start = 0) {
  let i = start;
  const el = document.createElement("div");
  el.className = "fullscreen";
  const draw = () => (el.innerHTML = renderSlide(deck.slides[i], i, deck.slides.length));
  const key = (e) => {
    if (e.key === "Escape") close();
    else if (["ArrowRight", " ", "PageDown"].includes(e.key)) { i = Math.min(i + 1, deck.slides.length - 1); draw(); }
    else if (["ArrowLeft", "PageUp"].includes(e.key)) { i = Math.max(i - 1, 0); draw(); }
  };
  const close = () => { el.remove(); document.removeEventListener("keydown", key); };
  el.onclick = (e) => { const r = el.getBoundingClientRect(); if (e.clientX > r.width / 2) { if (i < deck.slides.length - 1) { i++; draw(); } else close(); } else if (i > 0) { i--; draw(); } else close(); };
  document.addEventListener("keydown", key);
  draw();
  document.body.appendChild(el);
}
