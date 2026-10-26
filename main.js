import { CATEGORIES, SOURCES, CHECKED, nicsSearchUrl } from "./worldcup-data.js?v=4.1.0";

const $ = (s, el = document) => el.querySelector(s);
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const CAT = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
const ROUND = ["4강 1경기", "4강 2경기", "결승"];
const josa = (w, a, b) => {
  const ch = String(w).trim().replace(/[\s)\]’'"]+$/, "").slice(-1).charCodeAt(0);
  if (!(ch >= 0xac00 && ch <= 0xd7a3)) return `${w}${a}(${b})`;
  return w + ((ch - 0xac00) % 28 ? a : b);
};

// 카테고리별 출처 번호(처음 쓰인 순서)
const srcOrder = {};
for (const c of CATEGORIES) {
  const ids = [];
  const add = (arr) => arr.slice(1).forEach((id) => { if (!ids.includes(id)) ids.push(id); });
  c.cands.forEach((x) => { Object.values(x.v).forEach(add); (x.good || []).forEach(add); (x.warn || []).forEach(add); });
  c.next.forEach(add);
  srcOrder[c.id] = ids;
}
const tagLabel = (c, tag) => {
  for (const q of c.questions) for (const o of q.options) if (o.tag === tag) return o.short || o.label;
  return tag;
};
const sup = (c, arr) => arr.slice(1).map((id) => `<sup>[${srcOrder[c.id].indexOf(id) + 1}]</sup>`).join("");
const valText = (x, key) => (x.v[key] ? x.v[key][0] : "");

let st = null; // { cat, answers: [optionIndex], picks: [0|1] }
const stage = $("#stage");
const catGrid = $("#cat-grid");
const catBar = $("#cat-bar");
const stepLabel = $("#game-step");

function pool(c, answers) {
  const scored = c.cands.map((x, i) => {
    let score = 0, hit = 0, asked = 0;
    c.questions.forEach((q, qi) => {
      const o = q.options[answers[qi]];
      if (!o || !o.tag) return;
      asked++;
      if (x.tags.includes(o.tag)) { score += q.w; hit++; }
    });
    return { x, i, score, hit, asked };
  });
  scored.sort((a, b) => b.score - a.score || a.i - b.i);
  return scored.slice(0, 4);
}

function derive() {
  const c = CAT[st.cat];
  if (st.answers.length < c.questions.length) return { c, phase: "q", qi: st.answers.length };
  const p = pool(c, st.answers);
  const semis = [[p[0], p[3]], [p[1], p[2]]];
  if (st.picks.length < 2) return { c, phase: "m", mi: st.picks.length, pair: semis[st.picks.length], p, semis };
  const fin = [semis[0][st.picks[0]], semis[1][st.picks[1]]];
  if (st.picks.length < 3) return { c, phase: "m", mi: 2, pair: fin, p, semis };
  const matches = [semis[0], semis[1], fin].map((pair, i) => ({ pair, win: st.picks[i], label: ROUND[i] }));
  return { c, phase: "r", p, matches, winner: fin[st.picks[2]], runner: fin[1 - st.picks[2]] };
}

function setCat(id) {
  st = { cat: id, answers: [], picks: [] };
  catGrid.hidden = true;
  catBar.hidden = false;
  $("#cat-name").textContent = CAT[id].name;
  catGrid.querySelectorAll("[data-cat]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === id)));
  render(true);
}

function showCats() {
  catGrid.hidden = false;
  catBar.hidden = true;
  stepLabel.textContent = "1단계 · 주제 선택";
  catGrid.querySelector("button")?.focus();
}

function focusStage(scroll) {
  const h = $("h3", stage);
  if (h) h.focus({ preventScroll: true });
  if (scroll) {
    const top = stage.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) stage.scrollIntoView({ block: "start" });
  }
}

function render(scroll) {
  const d = derive();
  if (d.phase === "q") renderQuestion(d);
  else if (d.phase === "m") renderMatch(d);
  else renderResult(d);
  focusStage(scroll);
}

function renderQuestion({ c, qi }) {
  const q = c.questions[qi];
  stepLabel.textContent = `2단계 · 조건 질문 ${qi + 1}/${c.questions.length}`;
  stage.innerHTML = `<div class="q-box">
    <p class="count">질문 ${qi + 1} / ${c.questions.length}</p>
    <h3 tabindex="-1">${esc(q.q)}</h3>
    ${q.help ? `<p class="help">${esc(q.help)}</p>` : ""}
    <div class="opts">${q.options.map((o, i) => `<button type="button" class="opt${o.tag ? "" : " opt-none"}" data-opt="${i}">${esc(o.label)}</button>`).join("")}</div>
    <div class="nav-row">${qi > 0 ? `<button type="button" class="ghost" data-act="back">← 이전 질문</button>` : `<button type="button" class="ghost" data-act="cats">← 주제 다시 고르기</button>`}</div>
  </div>`;
}

function rowsHtml(c, a, b, keys) {
  const rows = c.attrs.map(([k, label]) => {
    const va = a.x.v[k], vb = b.x.v[k];
    if (!va && !vb) return "";
    const diff = valText(a.x, k) !== valText(b.x, k);
    const mine = keys.has(k);
    const cell = (v) => v ? `${esc(v[0])}${sup(c, v)}` : `<span class="na">공식 자료에서 확인하지 못함</span>`;
    return `<div class="row${diff ? " is-diff" : ""}${mine ? " is-mine" : ""}"><dt>${esc(label)}${mine ? ` <span class="tag">내 조건</span>` : ""}</dt><dd>${cell(va)}</dd><dd>${cell(vb)}</dd></div>`;
  }).join("");
  const warn = (x) => (x.warn || []).map((w) => `${esc(w[0])}${sup(c, w)}`).join("<br>") || `<span class="na">따로 정리한 주의점 없음</span>`;
  return rows + `<div class="row is-warn"><dt>주의할 점</dt><dd>${warn(a.x)}</dd><dd>${warn(b.x)}</dd></div>`;
}

function srcList(c, ids, cands) {
  const order = srcOrder[c.id];
  return ids.sort((x, y) => order.indexOf(x) - order.indexOf(y)).map((id) => {
    const s = SOURCES[id];
    let extra = "";
    if (id === "nics" && c.db) extra = " — " + cands.map((x) => `<a href="${esc(nicsSearchUrl(x.db || x.name))}" rel="noopener">‘${esc(x.db || x.name)}’ 검색</a>`).join(", ");
    return `<li value="${order.indexOf(id) + 1}"><a href="${esc(s.u)}" rel="noopener">${esc(s.t)}</a>${extra}</li>`;
  }).join("");
}

function usedSources(c, xs, withNext) {
  const ids = new Set();
  const add = (arr) => arr.slice(1).forEach((id) => ids.add(id));
  xs.forEach((x) => { Object.values(x.v).forEach(add); (x.good || []).forEach(add); (x.warn || []).forEach(add); });
  if (withNext) c.next.forEach(add);
  return [...ids];
}

function fullMatches(c) {
  const tags = c.questions.map((q, qi) => q.options[st.answers[qi]]).filter((o) => o && o.tag).map((o) => o.tag);
  return tags.length ? c.cands.filter((x) => tags.every((t) => x.tags.includes(t))) : [];
}

function answeredKeys(c) {
  const keys = new Set();
  c.questions.forEach((q, qi) => { const o = q.options[st.answers[qi]]; if (o && o.tag) keys.add(o.attr || q.attr); });
  return keys;
}

function renderMatch({ c, mi, pair, p }) {
  stepLabel.textContent = `3단계 · 대결 ${mi + 1}/3`;
  const [a, b] = pair;
  const keys = answeredKeys(c);
  const badge = (s) => s.asked ? `조건 ${s.hit}/${s.asked} 일치` : "조건 선택 없음";
  const full = p.filter((s) => s.asked && s.hit === s.asked).length;
  const anyAsked = p[0].asked > 0;
  const note = !anyAsked ? "조건을 고르지 않아 기본 순서로 후보 4개를 골랐습니다." : full >= 4 ? "모든 조건에 맞는 후보 중 4개로 대결합니다." : `모든 조건에 맞는 후보가 ${full}개라 나머지는 일부만 맞는 후보로 채웠습니다.`;
  const inPool = new Set(p.map((s) => s.x.id));
  const left = anyAsked ? fullMatches(c).filter((x) => !inPool.has(x.id)) : [];
  const leftHtml = left.length ? ` 조건에 모두 맞지만 대결에 넣지 못한 후보: ${left.map((x) => `<a href="/compare/${esc(c.page.slug)}.html#v-${esc(x.id)}">${esc(x.name)}</a>`).join(", ")} (비교표에서 확인)` : "";
  stage.innerHTML = `<div class="m-box">
    <p class="count">${ROUND[mi]} · 대결 ${mi + 1} / 3</p>
    <h3 tabindex="-1">${esc(a.x.name)} vs ${esc(b.x.name)}, 어느 쪽이 더 맞나요?</h3>
    ${mi === 0 ? `<p class="help">${esc(note)} 후보: ${p.map((s) => `${esc(s.x.name)}(${badge(s)})`).join(" · ")}.${leftHtml}</p>` : ""}
    <div class="duel">
      <div class="duel-names"><p><strong>${esc(a.x.name)}</strong><small>${badge(a)}</small></p><span class="vs" aria-hidden="true">VS</span><p><strong>${esc(b.x.name)}</strong><small>${badge(b)}</small></p></div>
      <dl class="rows">${rowsHtml(c, a, b, keys)}</dl>
      <div class="picks"><button type="button" class="pick" data-pick="0">${esc(a.x.name)} 고르기</button><button type="button" class="pick" data-pick="1">${esc(b.x.name)} 고르기</button></div>
    </div>
    <p class="legend"><span class="key-diff">노란 줄</span>은 두 후보가 다른 항목, <span class="tag">내 조건</span>은 질문에서 고른 기준입니다. [숫자]는 아래 출처 번호입니다.</p>
    <details class="srcs"><summary>이 대결의 출처 보기 (확인일 ${CHECKED})</summary><ol>${srcList(c, usedSources(c, [a.x, b.x]), [a.x, b.x])}</ol></details>
    <div class="nav-row"><button type="button" class="ghost" data-act="back">← 이전</button><button type="button" class="ghost" data-act="again">질문부터 다시</button></div>
  </div>`;
}

function whyLines(c, w) {
  const lines = [];
  c.questions.forEach((q, qi) => {
    const o = q.options[st.answers[qi]];
    if (!o || !o.tag) return;
    const key = o.attr || q.attr;
    const label = (c.attrs.find((a) => a[0] === key) || [])[1];
    const v = w.x.v[key];
    if (w.x.tags.includes(o.tag)) lines.push(`<li><span class="ok">맞음</span> ‘${esc(o.short)}’ 조건${v ? ` — ${esc(label)}: ${esc(v[0])}${sup(c, v)}` : ""}</li>`);
    else lines.push(`<li><span class="no">다름</span> ‘${esc(o.short)}’ 조건과는 다르지만 대결에서 직접 골랐습니다.${v ? ` (${esc(label)}: ${esc(v[0])}${sup(c, v)})` : ""}</li>`);
  });
  if (!lines.length) lines.push(`<li>조건을 고르지 않았으므로 대결 표를 직접 비교해 고른 결과입니다.</li>`);
  return lines.join("");
}

function duelLines(c, matches) {
  return matches.map((m) => {
    const win = m.pair[m.win].x, lose = m.pair[1 - m.win].x;
    const only = (x, y) => x.tags.filter((t) => !y.tags.includes(t)).map((t) => tagLabel(c, t));
    const wOnly = only(win, lose), lOnly = only(lose, win);
    const diffKeys = c.attrs.filter(([k]) => valText(win, k) && valText(lose, k) && valText(win, k) !== valText(lose, k)).map(([, l]) => l);
    let why = wOnly.length ? `${esc(win.name)}에만 있는 특징: ${esc(wOnly.join(", "))}.` : "";
    if (lOnly.length) why += ` 대신 ${esc(lose.name)}의 ${esc(josa("‘" + lOnly.join(", ") + "’", "은", "는"))} 포기했습니다.`;
    if (!why) why = `질문 기준으로는 차이가 없었습니다.${diffKeys.length ? ` 표에서 값이 다른 항목: ${esc(diffKeys.slice(0, 3).join("·"))}.` : ""}`;
    return `<li><strong>${esc(m.label)}</strong>: <b>${esc(win.name)}</b> 선택 (상대 ${esc(lose.name)}) — ${why}</li>`;
  }).join("");
}

function linkHtml(c) {
  const L = c.links;
  const items = [];
  if (L.boribay) items.push(`<a class="btn primary" href="${esc(L.boribay.url)}" rel="noopener">${esc(L.boribay.label)} →</a>`);
  if (L.boribay2) items.push(`<a class="btn" href="${esc(L.boribay2.url)}" rel="noopener">${esc(L.boribay2.label)} →</a>`);
  items.push(`<a class="btn" href="/compare/${esc(c.page.slug)}.html">${esc(c.name.replace(" 품종", ""))} 전체 비교표 보기</a>`);
  (L.guides || []).forEach(([t, h]) => items.push(`<a class="btn" href="${esc(h)}">${esc(t)}</a>`));
  if (L.sister) items.push(`<a class="btn" href="${esc(L.sister.url)}" rel="noopener">${esc(L.sister.label)} (${esc(L.sister.site)})</a>`);
  return items.join("");
}

let lastCopy = "";
function renderResult({ c, matches, winner, runner }) {
  stepLabel.textContent = "4단계 · 결과";
  const x = winner.x;
  const facts = c.attrs.filter(([k]) => x.v[k]).map(([k, l]) => `<div><dt>${esc(l)}</dt><dd>${esc(x.v[k][0])}${sup(c, x.v[k])}</dd></div>`).join("");
  const good = (x.good || []).map((g) => `<li>${esc(g[0])}${sup(c, g)}</li>`).join("");
  const warn = (x.warn || []).map((g) => `<li>${esc(g[0])}${sup(c, g)}</li>`).join("");
  const next = c.next.map((n) => `<li>${esc(n[0])}${sup(c, n)}</li>`).join("");
  const dbLink = c.db ? `<p class="db-link">원문 자료: <a href="${esc(nicsSearchUrl(x.db || x.name))}" rel="noopener">국립식량과학원 품종정보에서 ‘${esc(x.db || x.name)}’ 보기</a></p>` : "";
  stage.innerHTML = `<div class="r-box">
    <p class="count">최종 선택 · ${esc(c.name)}</p>
    <h3 tabindex="-1">${esc(x.name)}</h3>
    <p class="r-sub">후보 4개 가운데 결승에서 ${esc(josa(runner.x.name, "을", "를"))} 제치고 남았습니다.</p>
    <section><h4>이 ${esc(josa(c.unit, "이", "가"))} 남은 이유</h4><ul class="why">${whyLines(c, winner)}</ul></section>
    <section><h4>대결에서 고른 기준</h4><ol class="duels">${duelLines(c, matches)}</ol></section>
    <section><h4>${esc(x.name)} 한눈에 보기</h4><dl class="facts">${facts}</dl>${good ? `<ul class="good">${good}</ul>` : ""}${dbLink}</section>
    ${warn ? `<section><h4>주의할 점</h4><ul class="warn">${warn}</ul></section>` : ""}
    <section><h4>다음에 확인할 것</h4><ol class="next">${next}</ol></section>
    <section class="r-links"><h4>이어서 하기</h4><div class="btns">${linkHtml(c)}</div></section>
    <div class="actions"><button type="button" class="ghost" data-act="again">같은 주제로 다시</button><button type="button" class="ghost" data-act="copy">결과 글로 복사</button><button type="button" class="ghost" data-act="cats">다른 주제 고르기</button></div>
    <p class="copy-msg" role="status"></p>
    <details class="srcs"><summary>결과에 쓴 출처 (확인일 ${CHECKED})</summary><ol>${srcList(c, usedSources(c, [x], true), [x])}</ol></details>
    <p class="fine">품종·장비 특성은 지역, 해마다의 날씨, 관리 방법에 따라 달라질 수 있습니다. 자료끼리 값이 다르면 둘 다 적었습니다. 이 결과는 구매·재배·계약 결정을 대신하지 않습니다.</p>
  </div>`;
  const plain = (h) => h.replace(/<sup>.*?<\/sup>/g, "").replace(/<br>/g, " ").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  lastCopy = [
    `[농사 비교 월드컵] ${c.name} 결과: ${x.name}`,
    "",
    "남은 이유:", ...[...stage.querySelectorAll(".why li")].map((li) => "- " + plain(li.innerHTML)),
    "", "대결 기록:", ...[...stage.querySelectorAll(".duels li")].map((li) => "- " + plain(li.innerHTML)),
    "", "다음에 확인할 것:", ...c.next.map((n) => "- " + n[0]),
    "", `자료 확인일 ${CHECKED} · ${location.origin}/compare/${c.page.slug}.html`,
  ].join("\n");
}

async function copyResult(btn) {
  const msg = $(".copy-msg", stage);
  try { await navigator.clipboard.writeText(lastCopy); msg.textContent = "결과를 복사했습니다. 메모나 메시지에 붙여 넣으세요."; }
  catch { msg.textContent = "이 브라우저에서는 자동 복사가 안 됩니다. 화면을 길게 눌러 직접 복사해 주세요."; }
  btn.blur();
}

catGrid.addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (b) setCat(b.dataset.cat); });
$("#cat-change").addEventListener("click", showCats);
stage.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t || !st) return;
  if (t.dataset.opt) { st.answers.push(+t.dataset.opt); render(true); return; }
  if (t.dataset.pick) { st.picks.push(+t.dataset.pick); render(true); return; }
  const act = t.dataset.act;
  if (act === "back") { if (st.picks.length) st.picks.pop(); else st.answers.pop(); render(true); }
  else if (act === "again") { st.answers = []; st.picks = []; render(true); }
  else if (act === "cats") { showCats(); }
  else if (act === "copy") copyResult(t);
});
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href*="boribay.com"]');
  if (a && window.gtag) window.gtag("event", "owned_referral_click", { source_domain: "occultworldcup.com", destination: a.href });
});

const pre = new URLSearchParams(location.search).get("c");
if (pre && CAT[pre]) setCat(pre);
