(() => {
'use strict';
const C = window.CONFIG, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HOME = document.body.classList.contains('page-home'), MENU_PAGE = document.body.classList.contains('page-menu');
const urlLang = (new URLSearchParams(location.search).get('lang') || '').toLowerCase();
let lang = ['pt', 'en'].includes(urlLang) ? urlLang : (store.get('barradas.lang') === 'en' ? 'en' : 'pt'); // PT por defeito
const T = () => window.I18N.js[lang];
const L = o => (o && typeof o === 'object') ? (o[lang] || o.pt) : o;
const norm = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const has = id => !!document.getElementById(id);
const setText = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };

/* ---------- Lisbon time + status ---------- */
function lisbon() {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Lisbon', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23', weekday: 'short' }).formatToParts(new Date());
  const g = t => p.find(x => x.type === t).value;
  return { y: +g('year'), m: +g('month'), d: +g('day'), h: +g('hour'), min: +g('minute'), wd: { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[g('weekday')] };
}
function status() {
  const n = lisbon(), t = T(), h = n.h + n.min / 60;
  if (n.wd === C.closedDay) return { open: false, txt: t.closed + ' · ' + t.opensThu };
  if (h >= C.open && h < C.kitchenClose) return { open: true, txt: t.kitchen };
  if (h >= C.kitchenClose && h < C.close) return { open: true, txt: t.barOnly };
  if (h < C.open) return { open: false, txt: t.closed + ' · ' + t.opensAt };
  return { open: false, txt: t.closed + ' · ' + ((n.wd + 1) % 7 === C.closedDay ? t.opensThu : t.opensTomorrow) };
}
function tick() {
  const s = status();
  setText('statusText', s.txt); setText('nowStatus', s.txt);
  const dot = $('#statusDot'); if (dot) dot.classList.toggle('is-off', !s.open);
}

/* ---------- i18n ---------- */
const ptCache = new Map();
function applyLang() {
  document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';
  const en = window.I18N.en;
  $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (!ptCache.has(el)) ptCache.set(el, el.textContent); el.textContent = lang === 'en' && en[k] ? en[k] : ptCache.get(el); });
  $$('[data-i18n-html]').forEach(el => { const k = el.dataset.i18nHtml; if (!ptCache.has(el)) ptCache.set(el, el.innerHTML); el.innerHTML = lang === 'en' && en[k] ? en[k] : ptCache.get(el); });
  $$('[data-i18n-ph]').forEach(el => { const k = el.dataset.i18nPh; if (!ptCache.has(el)) ptCache.set(el, el.placeholder); el.placeholder = lang === 'en' && en[k] ? en[k] : ptCache.get(el); });
  $$('#langBtn [data-l]').forEach(b => { b.classList.toggle('is-on', b.dataset.l === lang); b.setAttribute('aria-pressed', b.dataset.l === lang); });
  if (has('menuList')) renderMenu();
  if (has('wineCard')) { renderWine(curWine); renderTimeline(); }
  if (has('revTrack')) renderReviews();
  if (has('sigList')) renderSignatures();
  if (has('days')) { renderDays(); renderSlots(); summary(); }
  if (has('qbDays')) renderQuick();
  if (has('hours')) renderHours();
  tick(); weatherText();
}
function setLang(l) { if (l === lang) return; lang = l; store.set('barradas.lang', l); applyLang(); hideLangTip(); }
$$('#langBtn [data-l], .langtip__go').forEach(b => b.addEventListener('click', () => setLang(b.dataset.l)));
/* Sugestão discreta para visitantes cujo browser não está em português (só na 1.ª visita) */
const langTip = $('#langTip');
function hideLangTip() { if (langTip && !langTip.hidden) { langTip.classList.remove('is-on'); store.set('barradas.langtip', '1'); setTimeout(() => { langTip.hidden = true; }, 400); } }
if (langTip) {
  langTip.querySelector('.langtip__x').addEventListener('click', hideLangTip);
  const nav = (navigator.language || 'pt').toLowerCase();
  if (lang === 'pt' && !nav.startsWith('pt') && !store.get('barradas.lang') && !store.get('barradas.langtip')) {
    setTimeout(() => { langTip.hidden = false; requestAnimationFrame(() => langTip.classList.add('is-on')); }, 2200);
    setTimeout(hideLangTip, 14000);
  }
}

/* ---------- Loader ---------- */
function boot() {
  const loader = $('#loader');
  if (loader && innerWidth < 900) loader.remove();
  if (!loader || innerWidth < 900) { requestAnimationFrame(() => document.body.classList.add('is-ready')); return; }
  document.body.classList.add('is-loading');
  const hero = $('.hero__media img'); let pct = 0, done = false; const pctEl = $('#loadPct');
  const iv = setInterval(() => { pct = Math.min(pct + (done ? 10 : Math.random() * 6), done ? 100 : 88); pctEl.textContent = String(Math.floor(pct)).padStart(3, '0'); if (pct >= 100) { clearInterval(iv); finish(); } }, 35);
  const ok = () => { done = true; };
  if (!hero || hero.complete) ok(); else { hero.addEventListener('load', ok); hero.addEventListener('error', ok); }
  setTimeout(ok, 3000);
  function finish() { loader.classList.add('is-done'); document.body.classList.remove('is-loading'); setTimeout(() => document.body.classList.add('is-ready'), 120); setTimeout(() => loader.remove(), 1300); }
}

/* ---------- Hero ---------- */
$$('[data-split]').forEach(el => { el.innerHTML = [...el.textContent].map((c, i) => `<span class="ch" style="transition-delay:${0.25 + i * 0.06}s">${c}</span>`).join(''); });
(function fireflies() {
  const cv = $('#fireflies'); if (!cv || reduce) return;
  const ctx = cv.getContext('2d'); let W, H, pts = [], mx = -999, my = -999, raf = 0, vis = true;
  const mk = () => ({ x: Math.random() * W, y: Math.random() * H * .85, r: Math.random() * 2.2 + .5, vx: (Math.random() - .5) * .25, vy: -Math.random() * .25 - .05, ph: Math.random() * 6.28, sp: Math.random() * .02 + .008, hue: 38 + Math.random() * 14 });
  function size() { const dpr = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); pts = Array.from({ length: Math.round(Math.min(innerWidth < 700 ? 26 : 90, W * H / 16000)) }, mk); }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.ph += p.sp; p.x += p.vx + Math.sin(p.ph) * .15; p.y += p.vy;
      const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy); if (d < 140 && d > 0) { p.x += dx / d * 1.6; p.y += dy / d * 1.6; }
      if (p.y < -10 || p.x < -10 || p.x > W + 10) Object.assign(p, mk(), { y: H * .9 + Math.random() * H * .1 });
      const a = (Math.sin(p.ph * 2) + 1) / 2 * .8 + .2, R = p.r * 6, g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R);
      g.addColorStop(0, `hsla(${p.hue},90%,78%,${a})`); g.addColorStop(.25, `hsla(${p.hue},90%,62%,${a * .35})`); g.addColorStop(1, `hsla(${p.hue},90%,50%,0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, R, 0, 6.283); ctx.fill();
    }
    raf = vis ? requestAnimationFrame(draw) : 0;
  }
  size(); draw(); addEventListener('resize', size);
  $('#hero').addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  $('#hero').addEventListener('pointerleave', () => { mx = my = -999; });
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) draw(); }).observe(cv);
})();

/* ---------- Scroll ---------- */
const nav = $('#nav'), heroImg = $('.hero__media img'), dock = $('.dock'); let lastY = 0;
function onScroll() {
  const y = scrollY, vh = innerHeight;
  nav.classList.toggle('is-solid', y > 40 || (MENU_PAGE && y > 10));
  const hide = y > vh && y > lastY + 4 && !$('#drawer').classList.contains('is-open') && !MENU_PAGE;
  if (hide) nav.classList.add('is-hidden'); if (y < lastY - 4) nav.classList.remove('is-hidden');
  lastY = y;
  if (heroImg && !reduce && y < vh * 1.2) heroImg.style.translate = `0 ${y * .25}px`;
  if (dock) dock.classList.add('is-on');
}
addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });

$('#burger').addEventListener('click', () => { const o = $('#drawer').classList.toggle('is-open'); $('#burger').classList.toggle('is-open', o); });
$$('#drawer a').forEach(a => a.addEventListener('click', () => { $('#drawer').classList.remove('is-open'); $('#burger').classList.remove('is-open'); }));
if (MENU_PAGE) $$('.nav__links a').forEach(a => a.classList.toggle('is-active', a.dataset.sec === 'menu-page'));
if (HOME) {
  const secObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('.nav__links a').forEach(a => a.classList.toggle('is-active', a.dataset.sec === e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  ['sobre', 'espaco', 'opinioes', 'vinhos', 'visitar'].forEach(id => has(id) && secObs.observe(document.getElementById(id)));
}

/* ---------- Photo strip ---------- */
if (has('strip')) {
  const pics = ['esplanada-cheia', 'prato-quiche', 'sala-lareira', 'copo-azul', 'bruschetta', 'esplanada-tarde', 'uvas-tintas', 'garrafeira', 'sobremesa-gelado', 'fachada', 'vinha-por-do-sol', 'camaroes'];
  const one = pics.map(n => `<img src="img/s/${n}.jpg" alt="" loading="lazy">`).join('');
  $('#strip').innerHTML = one + one;
}

/* ---------- Reviews ---------- */
function renderRatings() {
  $('#ratings').innerHTML = window.RATINGS.map(r => `<a class="rating" href="${r.url}" target="_blank" rel="noopener">
    <span class="rating__src mono">${r.src}</span>
    ${r.award ? `<span class="rating__score rating__score--award"><em>Fodor's</em> Choice</span><span class="rating__count mono">${lang === 'en' ? 'Recommended in Silves' : 'Recomendado em Silves'}</span>`
    : `<span class="rating__score">${lang === 'en' ? r.score.replace(',', '.') : r.score}<small>/${r.max}</small></span><span class="stars" aria-hidden="true">★★★★★<i style="width:${parseFloat(r.score.replace(',', '.')) / 5 * 100}%">★★★★★</i></span><span class="rating__count mono">${r.count} ${T().reviewsWord}</span>`}
  </a>`).join('');
}
let revI = 0, revTimer;
function renderReviews() {
  renderRatings();
  $('#revTrack').innerHTML = window.REVIEWS.map(r => `<figure class="rev">
    <span class="rev__stars">★★★★★</span>
    <blockquote>“${esc(r[lang])}”</blockquote>
    <figcaption><span class="rev__av">${esc(r.name[0])}</span><span><b>${esc(r.name)}</b><small class="mono">${r.src} · ${esc(L(r.date))}${lang === 'pt' ? ' · ' + T().translated : ''}</small></span></figcaption>
  </figure>`).join('');
  $('#revDots').innerHTML = window.REVIEWS.map((_, i) => `<button aria-label="${i + 1}" class="${i === revI ? 'is-on' : ''}"></button>`).join('');
  $$('#revDots button').forEach((b, i) => b.addEventListener('click', () => goRev(i)));
  const q = window.PRESS_QUOTE; $('#pressQuote').innerHTML = `<p>“${esc(q[lang])}”</p><cite class="mono"><a href="${q.url}" target="_blank" rel="noopener">— ${q.src}</a></cite>`;
  $('#moreGoogle').href = C.googleMaps; $('#moreTrip').href = C.tripadvisor;
}
function perView() { const tr = $('#revTrack'), c = $('.rev', tr); return c ? Math.max(1, Math.round(tr.clientWidth / c.offsetWidth)) : 1; }
function goRev(i) {
  const tr = $('#revTrack'), cards = $$('.rev', tr), max = Math.max(0, cards.length - perView());
  revI = i > max ? 0 : i < 0 ? max : i;
  tr.scrollTo({ left: cards[revI].offsetLeft - tr.offsetLeft, behavior: 'smooth' });
  $$('#revDots button').forEach((b, k) => b.classList.toggle('is-on', k === revI));
}
if (has('revTrack')) {
  const restart = () => { clearInterval(revTimer); if (!reduce) revTimer = setInterval(() => goRev(revI + 1), 6500); };
  $$('.revs__nav').forEach(b => b.addEventListener('click', () => { goRev(revI + +b.dataset.dir); restart(); }));
  $('#revTrack').addEventListener('pointerenter', () => clearInterval(revTimer));
  $('#revTrack').addEventListener('pointerleave', restart);
  let st; $('#revTrack').addEventListener('scroll', () => { clearTimeout(st); st = setTimeout(() => { const tr = $('#revTrack'), cards = $$('.rev', tr); let best = 0, bd = 1e9; cards.forEach((c, k) => { const d = Math.abs(c.offsetLeft - tr.offsetLeft - tr.scrollLeft); if (d < bd) { bd = d; best = k; } }); revI = best; $$('#revDots button').forEach((b, k) => b.classList.toggle('is-on', k === revI)); }, 120); }, { passive: true });
  restart();
}

/* ---------- Signatures ---------- */
function renderSignatures() {
  $('#sigList').innerHTML = window.SIGNATURES.map((s, i) => `<li><span class="siglist__n mono">${String(i + 1).padStart(2, '0')}</span><span class="siglist__body"><b>${esc(lang === 'en' ? s.en : s.pt)}${s.tag ? ` <i class="tag">${s.tag}</i>` : ''}</b><small>${esc(lang === 'en' ? s.den : s.dpt)}</small></span><span class="siglist__p mono">${esc(L(s.p))}</span></li>`).join('');
}

/* ---------- MENU PAGE ---------- */
const filters = new Set(); let q = '';
function match(it) {
  const t = it.t || [];
  if (filters.has('gf') && t.includes('g') && !t.includes('sg')) return false;
  if (filters.has('lf') && t.includes('l') && !t.includes('sl')) return false;
  if (filters.has('veg') && !it.veg) return false;
  if (q) { const hay = norm([it.pt, it.en, it.dpt, it.den].join(' ')); if (!q.split(/\s+/).every(w => hay.includes(w))) return false; }
  return true;
}
let catObs;
function renderMenu() {
  const t = T(); let total = 0, html = '', navHtml = '';
  window.MENU.forEach((cat, ci) => {
    let rows = '', count = 0, pendingH = null;
    cat.items.forEach(it => {
      if (it.h) { pendingH = it.h; return; }
      if (!match(it)) return;
      if (pendingH) { rows += `<h3 class="msub">${esc(L(pendingH))}</h3>`; pendingH = null; }
      count++;
      const tg = it.t || [], name = lang === 'en' ? it.en : it.pt, desc = lang === 'en' ? it.den : it.dpt, note = lang === 'en' ? it.nen : it.npt;
      const icons = (tg.includes('g') ? '<i class="ic ic--g" title="glúten"></i>' : '') + (tg.includes('l') ? '<i class="ic ic--l" title="lactose"></i>' : '') + (it.veg === 2 ? '<b class="tag tag--v">VEGAN</b>' : it.veg ? '<b class="tag tag--v">VEG</b>' : '');
      const meta = [tg.includes('sg') ? '<b class="tag">SG</b>' : '', tg.includes('sl') ? '<b class="tag">SL</b>' : '', it.order ? `<b class="tag tag--o">⏱ ${t.byOrder}</b>` : '', note ? `<span>${esc(note)}</span>` : ''].join('');
      const w = it.pair && window.WINES[it.pair];
      rows += `<div class="dish">
        <div class="dish__top"><span class="dish__name">${esc(name)}${it.star ? ' <span class="dish__star">✦</span>' : ''}</span><span class="dish__dots"></span><span class="dish__price">${esc(L(it.p))}</span></div>
        ${desc ? `<div class="dish__desc">${esc(desc)}</div>` : ''}
        ${(icons || meta) ? `<div class="dish__note">${icons}${meta}</div>` : ''}
      </div>`;
    });
    const isInfo = !cat.items.length, show = count > 0 || (isInfo && !filters.size && !q);
    total += count;
    html += `<section class="mcat${show ? '' : ' is-empty'}" id="m-${cat.id}">
      <header class="mcat__head"><span class="mono">${String(ci + 1).padStart(2, '0')}</span><h2>${esc(L(cat))}</h2></header>
      ${cat.intro ? `<p class="mcat__intro">${esc(L(cat.intro))}</p>` : ''}
      ${isInfo ? `<div class="mcat__photos"><img src="img/s/sobremesa-chocolate.jpg" alt="" loading="lazy"><img src="img/s/sobremesa-gelado.jpg" alt="" loading="lazy"><img src="img/s/sobremesa-semifrio.jpg" alt="" loading="lazy"></div>` : `<div class="mcat__grid">${rows}</div>`}
      ${cat.foot && show ? `<p class="mcat__foot">${esc(L(cat.foot))}</p>` : ''}</section>`;
    navHtml += `<a href="#m-${cat.id}" class="${show ? '' : 'is-empty'}" data-cat="${cat.id}">${esc(L(cat))}</a>`;
  });
  $('#menuList').innerHTML = (total || !(filters.size || q) ? '' : `<p class="menu__empty">${t.none}</p>`) + html;
  $('#menuNav').innerHTML = navHtml;
  if (catObs) catObs.disconnect();
  catObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { $$('#menuNav a').forEach(a => a.classList.toggle('is-active', a.dataset.cat === e.target.id.slice(2))); const act = $('#menuNav a.is-active'); if (act) act.parentNode.scrollTo({ left: act.offsetLeft - 24, behavior: 'smooth' }); } }), { rootMargin: '-30% 0px -65% 0px' });
  $$('.mcat').forEach(m => catObs.observe(m));
  $$('.mcat').forEach(m => m.classList.add('in'));
}
if (MENU_PAGE) {
  $$('#dietChips .chip').forEach(c => c.addEventListener('click', () => { const f = c.dataset.f; filters.has(f) ? filters.delete(f) : filters.add(f); c.classList.toggle('is-on'); renderMenu(); }));
  let st; $('#menuSearch').addEventListener('input', e => { clearTimeout(st); st = setTimeout(() => { q = norm(e.target.value.trim()); renderMenu(); }, 120); });
}

/* ---------- WINES ---------- */
let curWine = 'selecao';
function renderBottles() {
  $('#bottles').innerHTML = Object.entries(window.WINES).map(([k, w]) => `<button class="bottle${k === curWine ? ' is-on' : ''}" data-k="${k}" style="--glow:${w.color}" aria-label="${w.name}"><img src="${w.img}" alt="Quinta do Barradas ${w.name}"><span class="bottle__name mono">${w.name}</span></button>`).join('');
  $$('.bottle').forEach(b => {
    b.addEventListener('click', () => selectWine(b.dataset.k));
    b.addEventListener('pointermove', e => { if (reduce) return; const r = b.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5; b.style.transform = `${b.classList.contains('is-on') ? 'scale(1.06)' : 'scale(.88)'} rotateY(${x * 18}deg)`; });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}
function selectWine(k) { curWine = k; $$('.bottle').forEach(b => b.classList.toggle('is-on', b.dataset.k === k)); renderWine(k); }
function renderWine(k) {
  const w = window.WINES[k], t = T(), d = w[lang], card = $('#wineCard'); card.style.setProperty('--glow', w.color);
  const palette = [w.color, '#d9b46a', '#6f7b4a']; let off = 0; const circ = 2 * Math.PI * 36;
  const arcs = w.grapes.map(([g, v], i) => { const len = v / 100 * circ, s = `<circle cx="46" cy="46" r="36" stroke="${palette[i]}" stroke-dasharray="${len - 2} ${circ}" stroke-dashoffset="${-off}" transform="rotate(-90 46 46)"/>`; off += len; return s; }).join('');
  const alcPct = w.alc ? Math.min(1, (w.alc - 10) / 6) : 0;
  card.innerHTML = `<div class="fade-swap">
    <p class="mono wc__type">${d.type} · ${w.vintage}</p>
    <h3 class="wc__name">Quinta do Barradas <em>${w.name}</em></h3>
    <p class="wc__notes">${esc(d.notes)}</p>
    <div class="wc__grid">
      <div class="wc__cell"><span class="mono">${t.alc}</span><b>${w.alc ? String(w.alc).replace('.', lang === 'pt' ? ',' : '.') + '% vol.' : '—'}</b><div class="gauge"><i style="transform:scaleX(${alcPct})"></i></div></div>
      <div class="wc__cell"><span class="mono">${t.serve}</span><b>${w.temp}</b></div>
      <div class="wc__cell"><span class="mono">${t.bottle}${w.glass ? ' · ' + t.glass : ''}</span><b>${w.price}${w.glass ? ' · ' + w.glass : ''}</b></div>
    </div>
    <div class="wc__grapes">
      <svg class="donut" viewBox="0 0 92 92"><circle cx="46" cy="46" r="36" stroke="rgba(239,231,214,.08)"/>${arcs}</svg>
      <ul class="grapes">${w.grapes.map(([g, v], i) => `<li><i style="background:${palette[i]}"></i>${g}<small>${w.grapesApprox ? '' : v + '%'}</small></li>`).join('')}${w.grapesApprox ? `<li class="mono dim" style="font-size:.62rem">${t.approx}</li>` : ''}</ul>
    </div>
    <div class="wc__pair"><span><span class="mono">${t.pairs}</span><br>${esc(d.pair)}</span><span class="wc__extra">${esc(d.extra)}</span></div>
  </div>`;
}
function renderTimeline() {
  const tl = $('#timeline');
  tl.innerHTML = window.TIMELINE.map(x => `<div class="tl"><span class="tl__y">${x.y}</span><p>${esc(x[lang])}</p></div>`).join('');
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { tl.style.setProperty('--tl', '100%'); $$('.tl', tl).forEach((n, i) => setTimeout(() => n.classList.add('on'), 300 + i * 380)); o.disconnect(); } }, { threshold: .4 }).observe(tl);
}

/* ---------- GALLERY ---------- */
let gFilter = 'all', gAll = false, lbList = [], lbI = 0;
const gItems = window.GALLERY;
function renderGallery() {
  const m = $('#masonry'); if (!m) return;
  m.innerHTML = gItems.map(([n, c], i) => `<figure class="gitem" data-c="${c}" data-i="${i}"><img src="img/s/${n}.jpg" alt="" loading="lazy"></figure>`).join('');
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -40px' });
  $$('.gitem').forEach((g, i) => { g.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(g); g.addEventListener('click', () => openLb(+g.dataset.i)); });
  filterGallery();
}
function filterGallery() {
  let shown = 0; const limit = gAll ? 999 : 12;
  $$('.gitem').forEach(g => { const ok = gFilter === 'all' || g.dataset.c === gFilter; const vis = ok && shown < limit; if (vis) shown++; g.classList.toggle('is-hidden', !vis); });
  const total = gItems.filter(([, c]) => gFilter === 'all' || c === gFilter).length;
  $('#galMore').hidden = gAll || total <= 12;
}
$$('#galChips .chip').forEach(c => c.addEventListener('click', () => { gFilter = c.dataset.g; $$('#galChips .chip').forEach(x => x.classList.toggle('is-on', x === c)); filterGallery(); }));
if (has('galMore')) $('#galMore').addEventListener('click', () => { gAll = true; filterGallery(); });
const lb = $('#lightbox');
function openLb(i) { lbList = $$('.gitem:not(.is-hidden)').map(g => +g.dataset.i); lbI = Math.max(0, lbList.indexOf(i)); showLb(); lb.hidden = false; }
function showLb() { $('img', lb).src = `img/${gItems[lbList[lbI]][0]}.jpg`; $('.lb__count', lb).textContent = `${String(lbI + 1).padStart(2, '0')} / ${String(lbList.length).padStart(2, '0')}`; }
const lbStep = d => { lbI = (lbI + d + lbList.length) % lbList.length; showLb(); };
if (lb) {
  $('.lb__close').onclick = () => lb.hidden = true; $('.lb__prev').onclick = () => lbStep(-1); $('.lb__next').onclick = () => lbStep(1);
  lb.addEventListener('click', e => { if (e.target === lb) lb.hidden = true; });
  addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') lb.hidden = true; if (e.key === 'ArrowLeft') lbStep(-1); if (e.key === 'ArrowRight') lbStep(1); });
  let tx0 = null; lb.addEventListener('touchstart', e => tx0 = e.touches[0].clientX, { passive: true }); lb.addEventListener('touchend', e => { if (tx0 == null) return; const dx = e.changedTouches[0].clientX - tx0; if (Math.abs(dx) > 40) lbStep(dx < 0 ? 1 : -1); tx0 = null; });
}

/* ---------- BOOKING ---------- */
const bk = { type: 'dinner', pax: 2, date: null, time: null, prefs: new Set() };
const prefLabels = () => [...bk.prefs].map(p => { const c = document.querySelector(`#prefs [data-p="${p}"]`); return c ? c.textContent.trim() : p; });
function setType(t) { bk.type = t; $$('#bookType button').forEach(x => x.classList.toggle('is-on', x.dataset.t === t)); summary(); }
function dateKey(y, m, d) { return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`; }
function renderDays() {
  const t = T(), n = lisbon(), base = new Date(Date.UTC(n.y, n.m - 1, n.d)); let html = '';
  for (let i = 0; i < 60; i++) {
    const d = new Date(base.getTime() + i * 864e5), wd = d.getUTCDay(), key = dateKey(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
    const off = wd === C.closedDay || (i === 0 && n.h + n.min / 60 >= C.kitchenClose - 0.5);
    html += `<button type="button" class="day${bk.date === key ? ' is-on' : ''}" data-k="${key}" ${off ? 'disabled title="' + t.closedDay + '"' : ''}><small>${i === 0 ? t.today : i === 1 ? t.tomorrow : t.dshort[wd]}</small><b>${d.getUTCDate()}</b><small>${t.months[d.getUTCMonth()]}</small></button>`;
  }
  $('#days').innerHTML = html;
  $$('.day').forEach(b => b.addEventListener('click', () => { bk.date = b.dataset.k; $$('.day').forEach(x => x.classList.toggle('is-on', x === b)); if (bk.time && slotPast(bk.time)) bk.time = null; renderSlots(); summary(); if (typeof renderQuick === 'function') renderQuick(); }));
  const on = $('.day.is-on'); if (on) on.scrollIntoView({ inline: 'center', block: 'nearest' });
}
function slotPast(s) { const n = lisbon(); if (bk.date !== dateKey(n.y, n.m, n.d)) return false; const [h, m] = s.split(':').map(Number); return h + m / 60 <= n.h + n.min / 60 + 0.5; }
function renderSlots() {
  $('#slots').innerHTML = C.slots.map(s => `<button type="button" class="slot${bk.time === s ? ' is-on' : ''}" data-s="${s}" ${slotPast(s) ? 'disabled' : ''}>${s}</button>`).join('');
  $$('.slot').forEach(b => b.addEventListener('click', () => { bk.time = b.dataset.s; $$('.slot').forEach(x => x.classList.toggle('is-on', x === b)); summary(); }));
}
function fmtDate(k) { if (!k) return ''; const [y, m, d] = k.split('-').map(Number), t = T(); return `${t.days[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]}, ${d} ${t.months[m - 1]}`; }
function summary() { if (!has('summary')) return; const t = T(); $('#summary').textContent = t.summary(t.msgType[bk.type], t.pax(bk.pax), fmtDate(bk.date), bk.time) + (bk.prefs.size ? ' · ' + prefLabels().join(', ') : ''); }
if (has('bookForm')) {
  $$('[data-step]').forEach(b => b.addEventListener('click', () => { bk.pax = Math.max(1, Math.min(30, bk.pax + +b.dataset.step)); $('#pax').textContent = bk.pax; const qp = $('#qbPax'); if (qp) qp.textContent = bk.pax; summary(); }));
  $$('#bookType button').forEach(b => b.addEventListener('click', () => setType(b.dataset.t)));
  $$('[data-book="tasting"]').forEach(a => a.addEventListener('click', () => setType('tasting')));
  $$('#prefs .chip').forEach(c => c.addEventListener('click', () => { const p = c.dataset.p; bk.prefs.has(p) ? bk.prefs.delete(p) : bk.prefs.add(p); c.classList.toggle('is-on'); summary(); }));
  $('#bookForm').addEventListener('submit', e => {
    e.preventDefault(); const t = T(), err = $('#bookErr'), via = (e.submitter && e.submitter.dataset.via) || 'wa';
    const name = $('#bName').value.trim(), phone = $('#bPhone').value.trim(), notes = $('#bNotes').value.trim();
    $$('#bName,#bPhone').forEach(i => i.classList.remove('err'));
    if (!bk.date) return err.textContent = t.needDate;
    if (!bk.time) return err.textContent = t.needTime;
    if (!name) { $('#bName').classList.add('err'); return err.textContent = t.needName; }
    if (phone.replace(/\D/g, '').length < 9) { $('#bPhone').classList.add('err'); return err.textContent = t.needPhone; }
    err.textContent = '';
    const lines = [t.msgHello, '', `• ${t.msgType[bk.type]}`, `• ${t.pax(bk.pax)}`, `• ${fmtDate(bk.date)} — ${bk.time}`, `• ${t.msgName}: ${name}`, `• ${t.msgPhone}: ${phone}`];
    if (bk.prefs.size) lines.push(`• ${t.msgPrefs}: ${prefLabels().join(', ')}`);
    if (notes) lines.push(`• ${t.msgNotes}: ${notes}`);
    lines.push('', t.msgThanks);
    const msg = lines.join('\n');
    const url = via === 'wa' ? `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}` : `mailto:${C.email}?subject=${encodeURIComponent(t.subj + ' — ' + fmtDate(bk.date) + ' ' + bk.time)}&body=${encodeURIComponent(msg)}`;
    window.open(url, via === 'wa' ? '_blank' : '_self');
    makeIcs(); closeSheet(); $('#sent').hidden = false;
  });
  $('#sentClose').onclick = () => $('#sent').hidden = true;
}
function makeIcs() {
  const [y, m, d] = bk.date.split('-'), [h, mi] = bk.time.split(':'), endH = String(Math.min(23, +h + 2)).padStart(2, '0');
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//O Barradas//PT', 'BEGIN:VEVENT', `UID:${Date.now()}@obarradas.com`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;TZID=Europe/Lisbon:${y}${m}${d}T${h}${mi}00`, `DTEND;TZID=Europe/Lisbon:${y}${m}${d}T${endH}${mi}00`, `SUMMARY:O Barradas — ${T().msgType[bk.type]} (${bk.pax})`,
    `LOCATION:${C.address.replace(/,/g, '\\,')}`, `GEO:${C.lat};${C.lng}`, `DESCRIPTION:${C.phoneLabel}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  $('#icsBtn').href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
}
(function thefork() {
  const modal = $('#tfModal');
  const url = C.theforkUrl || (C.theforkWidgetId ? `https://widget.thefork.com/${C.theforkWidgetId}` : '');
  $$('[data-thefork]').forEach(a => {
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; return; }
    a.addEventListener('click', e => { e.preventDefault(); modal.hidden = false; });
  });
  if (modal) {
    $$('[data-close]', modal).forEach(b => b.addEventListener('click', e => { modal.hidden = true; if (b.getAttribute('href')) { e.preventDefault(); openSheet(); } }));
    modal.addEventListener('click', e => { if (e.target === modal) modal.hidden = true; });
  }
})();

/* ---------- Booking sheet ---------- */
const sheet = $('#bookSheet'); let lastFocus = null;
function openSheet(focusSel) {
  if (!sheet) { location.href = 'index.html#reservar'; return; }
  lastFocus = document.activeElement; sheet.hidden = false; document.documentElement.classList.add('sheet-open');
  requestAnimationFrame(() => sheet.classList.add('is-open'));
  const panel = $('.sheet__panel', sheet); panel.scrollTop = 0;
  setTimeout(() => { const t = focusSel ? $(focusSel, sheet) : null; if (t) { t.scrollIntoView({ block: 'center', behavior: 'smooth' }); (t.querySelector('button:not([disabled])') || t).focus({ preventScroll: true }); } else panel.focus({ preventScroll: true }); }, 350);
}
function closeSheet() {
  if (!sheet || sheet.hidden) return;
  sheet.classList.remove('is-open'); document.documentElement.classList.remove('sheet-open');
  setTimeout(() => { sheet.hidden = true; $('.sheet__panel', sheet).style.transform = ''; }, 380);
  if (lastFocus) lastFocus.focus({ preventScroll: true });
}
if (sheet) {
  $$('[data-close-sheet]', sheet).forEach(b => b.addEventListener('click', closeSheet));
  sheet.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSheet();
    if (e.key === 'Tab') { const f = $$('button:not([disabled]),a[href],input,textarea', $('.sheet__panel', sheet)).filter(x => x.offsetParent); if (!f.length) return; const first = f[0], last = f[f.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
  });
  // swipe down to close
  const panel = $('.sheet__panel', sheet), grab = $('[data-grab]', sheet); let y0 = null, dy = 0;
  const start = e => { if (e.target.closest('[data-grab]') || panel.scrollTop <= 0) { y0 = e.touches[0].clientY; dy = 0; } };
  panel.addEventListener('touchstart', start, { passive: true });
  panel.addEventListener('touchmove', e => { if (y0 == null) return; dy = e.touches[0].clientY - y0; if (dy > 0 && (panel.scrollTop <= 0)) { panel.style.transition = 'none'; panel.style.transform = `translateY(${dy}px)`; } else if (dy < 0) y0 = null; }, { passive: true });
  panel.addEventListener('touchend', () => { panel.style.transition = ''; if (y0 != null && dy > 110) closeSheet(); else panel.style.transform = ''; y0 = null; });
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href$="#reservar"], [data-open-book], [data-book="tasting"]');
  if (!a || !sheet) return;
  e.preventDefault();
  $('#drawer').classList.remove('is-open'); $('#burger').classList.remove('is-open');
  if (a.dataset.book === 'tasting') setType('tasting');
  openSheet(bk.date ? '#slots' : null);
});

/* ---------- Quick book (homepage) ---------- */
function renderQuick() {
  const box = $('#qbDays'); if (!box) return;
  const t = T(), n = lisbon(), base = new Date(Date.UTC(n.y, n.m - 1, n.d)); let html = '', c = 0;
  for (let i = 0; i < 14 && c < 6; i++) {
    const d = new Date(base.getTime() + i * 864e5), wd = d.getUTCDay(), key = dateKey(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
    if (wd === C.closedDay || (i === 0 && n.h + n.min / 60 >= C.kitchenClose - 0.5)) continue;
    c++;
    html += `<button type="button" role="radio" aria-checked="${bk.date === key}" class="qday${bk.date === key ? ' is-on' : ''}" data-k="${key}"><small>${i === 0 ? t.today : i === 1 ? t.tomorrow : t.dshort[wd]}</small><b>${d.getUTCDate()}</b></button>`;
  }
  html += `<button type="button" class="qday qday--more" data-open-book aria-label="${t.moreDates}"><small>${t.more}</small><b>+</b></button>`;
  box.innerHTML = html;
  $$('.qday[data-k]', box).forEach(b => b.addEventListener('click', () => { bk.date = b.dataset.k; renderQuick(); renderDays(); renderSlots(); summary(); }));
  $('#qbPax').textContent = bk.pax;
  const s = status(); const dot = $('#qbDot'); if (dot) dot.classList.toggle('is-off', !s.open);
}
$$('[data-qstep]').forEach(b => b.addEventListener('click', () => { bk.pax = Math.max(1, Math.min(30, bk.pax + +b.dataset.qstep)); $('#qbPax').textContent = bk.pax; const px = $('#pax'); if (px) px.textContent = bk.pax; summary(); }));


/* ---------- VISIT ---------- */
function renderHours() {
  const t = T(), n = lisbon();
  $('#hours').innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d => `<li class="${d === n.wd ? 'today' : ''} ${d === C.closedDay ? 'off' : ''}"><span>${t.days[d]}</span><span>${d === C.closedDay ? t.closedDay : '18:00 — 00:00'}</span></li>`).join('');
}
const gdir = `https://www.google.com/maps/dir/?api=1&destination=${C.lat},${C.lng}`;
if (has('map')) {
  $('#map').src = `https://www.google.com/maps?q=${C.lat},${C.lng}&z=14&output=embed`;
  $('#rGoogle').href = gdir;
  $('#rWaze').href = `https://waze.com/ul?ll=${C.lat},${C.lng}&navigate=yes`;
  $('#rApple').href = `https://maps.apple.com/?daddr=${C.lat},${C.lng}&q=O%20Barradas`;
  $('#rUber').href = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${C.lat}&dropoff[longitude]=${C.lng}&dropoff[nickname]=O%20Barradas`;
}
if (has('dockRoute')) $('#dockRoute').href = gdir;
if (has('fTrip')) $('#fTrip').href = C.tripadvisor;

let wx = null;
function weatherText() {
  if (!wx) return; const t = T(), c = t.wxCodes[wx.code] || t.wxCodes[Math.floor(wx.code / 10) * 10] || '';
  const s = `${Math.round(wx.temp)}° · ${c}`; setText('weather', 'Silves ' + s); setText('nowWeather', s); setText('nowSunset', wx.sunset);
}
if (has('weather') || has('nowWeather')) fetch(`https://api.open-meteo.com/v1/forecast?latitude=${C.lat}&longitude=${C.lng}&current=temperature_2m,weather_code&daily=sunset&timezone=Europe%2FLisbon&forecast_days=1`)
  .then(r => r.json()).then(j => { wx = { temp: j.current.temperature_2m, code: j.current.weather_code, sunset: (j.daily.sunset[0] || '').slice(11, 16) }; weatherText(); }).catch(() => {});

/* ---------- Cursor + magnetic ---------- */
(function cursor() {
  const c = $('.cursor'); if (!c || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  let x = 0, y = 0, cx = 0, cy = 0;
  addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; c.classList.add('is-live'); });
  (function loop() { cx += (x - cx) * .2; cy += (y - cy) * .2; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  document.addEventListener('pointerover', e => c.classList.toggle('is-hover', !!e.target.closest('a,button,.gitem,.room')));
  $$('.magnetic').forEach(m => {
    m.addEventListener('pointermove', e => { const r = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
    m.addEventListener('pointerleave', () => m.style.transform = '');
  });
})();

/* ---------- Reveal ---------- */
$$('.display, .label, .about__lead, .about__text > .dim, .ph, .pillar, .room, .space__more figure, .rating, .revs, .pressq, .wine__head p, .tasting, .book__head .dim, .altbtn, .console, .now, .routes, .hours, .foot__grid > div, .mcta').forEach(el => el.setAttribute('data-reveal', ''));
const rio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px' });
const stagger = new Map();
$$('[data-reveal]').forEach(el => { const p = el.parentElement, k = stagger.get(p) || 0; stagger.set(p, k + 1); el.style.transitionDelay = Math.min(k, 6) * 80 + 'ms'; rio.observe(el); });

/* ---------- Init ---------- */
setText('yr', new Date().getFullYear());
if (has('bottles')) renderBottles();
renderGallery(); applyLang(); boot(); onScroll();
if (location.hash) setTimeout(() => { const el = document.querySelector(location.hash); if (el) el.scrollIntoView(); }, 450);
setInterval(() => { tick(); if (has('qbDays')) renderQuick(); }, 60000);
})();
