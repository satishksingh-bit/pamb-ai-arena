// Small shared helpers: escaping, toast, markdown, state bus.
export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function toast(msg, isErr = false, ms = 3500) {
  const el = document.createElement("div");
  el.className = `toast${isErr ? " err" : ""}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), ms);
}

export const fmtTime = (s) => {
  s = Math.max(0, Math.floor(s));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

// Minimal, safe markdown renderer (headings, bold, italics, lists, tables, code, quotes).
export function md(src) {
  const lines = esc(src || "").split("\n");
  let html = "", inList = null, inTable = false;
  const inline = (t) =>
    t.replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
      .replace(/(^|\W)_([^_]+)_(?=\W|$)/g, "$1<i>$2</i>")
      .replace(/\*([^*]+)\*/g, "<i>$1</i>");
  const closeList = () => { if (inList) { html += `</${inList}>`; inList = null; } };
  const closeTable = () => { if (inTable) { html += "</table>"; inTable = false; } };
  for (const raw of lines) {
    const l = raw.trimEnd();
    if (/^\|.*\|$/.test(l)) {
      closeList();
      if (/^\|[\s|:-]+\|$/.test(l)) continue;
      const cells = l.slice(1, -1).split("|").map((c) => inline(c.trim()));
      if (!inTable) { html += "<table><tr>" + cells.map((c) => `<th>${c}</th>`).join("") + "</tr>"; inTable = true; }
      else html += "<tr>" + cells.map((c) => `<td>${c}</td>`).join("") + "</tr>";
      continue;
    }
    closeTable();
    let m;
    if ((m = l.match(/^(#{1,4})\s+(.*)/))) { closeList(); html += `<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`; }
    else if ((m = l.match(/^\s*[-*]\s+(.*)/))) { if (inList !== "ul") { closeList(); html += "<ul>"; inList = "ul"; } html += `<li>${inline(m[1])}</li>`; }
    else if ((m = l.match(/^\s*\d+\.\s+(.*)/))) { if (inList !== "ol") { closeList(); html += "<ol>"; inList = "ol"; } html += `<li>${inline(m[1])}</li>`; }
    else if ((m = l.match(/^&gt;\s?(.*)/))) { closeList(); html += `<blockquote>${inline(m[1])}</blockquote>`; }
    else if (!l.trim()) { closeList(); }
    else { closeList(); html += `<p>${inline(l)}</p>`; }
  }
  closeList(); closeTable();
  return html;
}

export function download(filename, text, type = "text/markdown") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

// --- tiny global state + event bus ---
export const state = {
  market: localStorage.getItem("pcs.market") || "SG",
  avatarMode: localStorage.getItem("pcs.avatar") || "native",
  config: null,
  scenario: null,       // {id, brief, ...}
  lastSession: null,    // {session_id, transcript, duration}
  scorecard: null,
};
const listeners = {};
export const on = (ev, fn) => ((listeners[ev] ||= []).push(fn));
export const emit = (ev, data) => (listeners[ev] || []).forEach((fn) => fn(data));
