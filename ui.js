// ─── SHARED UI INIT ──────────────────────────────────────────

function buildStars() {
  const field = document.getElementById('star-field');
  if (!field) return;
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('div');
    s.className = 'star-dot';
    const size = (Math.random() * 2 + 1).toFixed(1);
    s.style.cssText = `
      left:${(Math.random()*100).toFixed(2)}%;
      top:${(Math.random()*100).toFixed(2)}%;
      width:${size}px; height:${size}px;
      --dur:${(2+Math.random()*4).toFixed(2)}s;
      --delay:${(Math.random()*5).toFixed(2)}s;
    `;
    field.appendChild(s);
  }
}

function initNav() {
  const burger = document.querySelector('.burger');
  const links  = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!burger.contains(e.target) && !links.contains(e.target))
        links.classList.remove('open');
    });
  }
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

// ─── CARD BACK SVG MANDALA ───────────────────────────────────
function cardBackSVG() {
  return `<svg viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="35" r="28" stroke="rgba(184,159,224,0.5)" stroke-width="0.75"/>
    <circle cx="35" cy="35" r="20" stroke="rgba(184,159,224,0.35)" stroke-width="0.75"/>
    <circle cx="35" cy="35" r="12" stroke="rgba(184,159,224,0.4)" stroke-width="0.75"/>
    <circle cx="35" cy="35" r="4"  fill="rgba(184,159,224,0.5)"/>
    <line x1="35" y1="7" x2="35" y2="63" stroke="rgba(184,159,224,0.3)" stroke-width="0.5"/>
    <line x1="7"  y1="35" x2="63" y2="35" stroke="rgba(184,159,224,0.3)" stroke-width="0.5"/>
    <line x1="15" y1="15" x2="55" y2="55" stroke="rgba(184,159,224,0.2)" stroke-width="0.5"/>
    <line x1="55" y1="15" x2="15" y2="55" stroke="rgba(184,159,224,0.2)" stroke-width="0.5"/>
    <polygon points="35,12 38,23 35,20 32,23" fill="rgba(184,159,224,0.35)"/>
    <polygon points="35,58 38,47 35,50 32,47" fill="rgba(184,159,224,0.35)"/>
    <polygon points="12,35 23,38 20,35 23,32" fill="rgba(184,159,224,0.35)"/>
    <polygon points="58,35 47,38 50,35 47,32" fill="rgba(184,159,224,0.35)"/>
    <circle cx="35" cy="12" r="2" fill="rgba(184,159,224,0.5)"/>
    <circle cx="35" cy="58" r="2" fill="rgba(184,159,224,0.5)"/>
    <circle cx="12" cy="35" r="2" fill="rgba(184,159,224,0.5)"/>
    <circle cx="58" cy="35" r="2" fill="rgba(184,159,224,0.5)"/>
  </svg>`;
}

// ─── BUILD CARD SLOTS ─────────────────────────────────────────
function buildCards(containerId, count, onReveal) {
  const row = document.getElementById(containerId);
  if (!row) return;
  row.innerHTML = '';
  const deck = shuffle(FULL_DECK);
  const cards = deck.slice(0, count);

  cards.forEach((card, i) => {
    const rev = isReversed();
    const slot = document.createElement('div');
    slot.className = 'card-slot';
    slot.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back">
          <div class="card-back-art">${cardBackSVG()}</div>
        </div>
        <div class="card-face card-front">
          <div class="card-front-glyph">${card.emoji}</div>
          <div class="card-front-name">${card.name}</div>
          <div class="card-front-pos ${rev?'rev':''}">
            ${rev ? '⟳ Reversed' : '↑ Upright'}
          </div>
        </div>
      </div>`;

    slot.addEventListener('click', () => {
      if (slot.classList.contains('selected')) return;
      // Shake for suspense
      slot.classList.add('shaking');
      setTimeout(() => {
        slot.classList.remove('shaking');
        slot.classList.add('selected');
        onReveal({ card, reversed: rev, slotEl: slot });
      }, 420);
    });

    row.appendChild(slot);
  });
}

// ─── SUSPENSE OVERLAY ─────────────────────────────────────────
function showSuspense(ms = 1200) {
  return new Promise(resolve => {
    const el = document.getElementById('suspense');
    if (!el) { resolve(); return; }
    el.classList.add('active');
    setTimeout(() => { el.classList.remove('active'); resolve(); }, ms);
  });
}

// ─── NAV HTML ─────────────────────────────────────────────────
// (Injected by each page directly for clarity)

document.addEventListener('DOMContentLoaded', () => {
  buildStars();
  initNav();
});
