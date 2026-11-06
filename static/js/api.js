// Deck Challenge API client.
const BASE = window.COACH_API_BASE || "";

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { detail: text }; }
  if (!res.ok) throw new Error(data.detail || data.error || `HTTP ${res.status}`);
  return data;
}

async function download(path, body, filename) {
  const res = await fetch(`${BASE}${path}`, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {});
  if (!res.ok) throw new Error(`Download failed (HTTP ${res.status})`);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(await res.blob());
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 3000);
}

export const api = {
  challenge: (market, lang) => req("GET", `/api/challenge?market=${market}&lang=${encodeURIComponent(lang)}`),
  generate: (body) => req("POST", "/api/deck/generate", body),
  coach: (body) => req("POST", "/api/prompt/coach", body),
  images: (body) => req("POST", "/api/deck/images", body),
  submit: (body) => req("POST", "/api/deck/submit", body),
  submission: (id) => req("GET", `/api/submissions/${id}`),
  leaderboard: (market) => req("GET", `/api/leaderboard${market ? `?market=${market}` : ""}`),
  deckPptx: (deck) => download("/api/deck/pptx", deck, "my-pre-pitch-deck.pptx"),
  targetPptx: (market, lang) => download(`/api/target/pptx?market=${market}&lang=${encodeURIComponent(lang)}`, null, `target-deck-${market}.pptx`),
};
