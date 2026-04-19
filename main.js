// ═══════════════════════════════════════════
// NEW YORK APARTS — main.js
// ═══════════════════════════════════════════

let allProperties = [];
let currentFilter = 'all';

// ── LOAD PROPERTIES ──────────────────────
async function loadProperties() {
  try {
    const res = await fetch('properties.json');
    allProperties = await res.json();
    renderProperties(allProperties.filter(p => p.active));
  } catch (e) {
    document.getElementById('propsGrid').innerHTML =
      '<p style="text-align:center;color:#999;grid-column:1/-1;padding:2rem">Error cargando propiedades. Recargá la página.</p>';
  }
}

// ── RENDER CARDS ─────────────────────────
function renderProperties(props) {
  const grid = document.getElementById('propsGrid');
  if (!props.length) {
    grid.innerHTML = '<p style="text-align:center;color:#999;grid-column:1/-1;padding:2rem">No hay propiedades con ese filtro.</p>';
    return;
  }
  grid.innerHTML = props.map(p => cardHTML(p)).join('');
  // re-observe reveals
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function cardHTML(p) {
  const badgeLabel = {
    studio: 'Studio',
    '1br': '1 Bedroom',
    '2br': '2 Bedrooms',
    '3br': '3+ Bedrooms'
  }[p.type] || p.type;

  const demandBadge = p.highlight
    ? `<div class="property-demand${p.highlight === 'Últimas fechas' ? ' last' : ''}">${p.highlight === 'Alta demanda' ? '🔥' : '⚡'} ${p.highlight}</div>`
    : '';

  const bedsText = p.beds === 0 ? 'Sofá cama' : `${p.beds} hab.`;

  return `
  <div class="property-card reveal" data-type="${p.type}" onclick="openModal('${p.id}')">
    <div class="property-img">
      <img src="${p.photos[0]}" alt="${p.name}" loading="lazy">
      <div class="property-badge">${badgeLabel}</div>
      ${demandBadge}
    </div>
    <div class="property-info">
      <div class="property-zone">📍 ${p.zone}</div>
      <div class="property-name">${p.name}</div>
      <div class="property-features">
        <div class="property-feat">👥 ${p.guests} pers.</div>
        <div class="property-feat">🛁 ${p.baths} baño${p.baths > 1 ? 's' : ''}</div>
        <div class="property-feat">🛏 ${bedsText}</div>
      </div>
      <div class="property-bottom">
        <div class="property-price">
          <div class="price-from">Desde USD</div>
          <span class="price-amount">${p.price}</span>
          <span class="price-unit">/noche</span>
        </div>
        <button class="btn-detail">Ver detalles →</button>
      </div>
    </div>
  </div>`;
}

// ── FILTER ───────────────────────────────
function filterProps(btn, type) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = type;
  const filtered = type === 'all'
    ? allProperties.filter(p => p.active)
    : allProperties.filter(p => p.active && p.type === type);
  renderProperties(filtered);
}

// ── MODAL ────────────────────────────────
function openModal(id) {
  const p = allProperties.find(x => x.id === id);
  if (!p) return;

  const photos = p.photos.slice(0, 3);
  while (photos.length < 3) photos.push(photos[0]); // fallback

  const amenityTags = p.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('');

  const waMsg = encodeURIComponent(
    `Hola, quiero consultar disponibilidad del departamento "${p.name}" (${p.zone}) desde USD ${p.price}/noche.`
  );

  document.getElementById('modalContent').innerHTML = `
    <div class="modal-gallery">
      ${photos.map((src, i) => `<img src="${src}" alt="${p.name} foto ${i+1}" loading="lazy">`).join('')}
    </div>
    <div class="modal-body">
      <h2 class="modal-title">${p.name}</h2>
      <p class="modal-zone">📍 ${p.zone} &nbsp;·&nbsp; 👥 ${p.guests} personas &nbsp;·&nbsp; 🛏 ${p.beds === 0 ? 'Studio' : p.beds + ' hab.'} &nbsp;·&nbsp; 🛁 ${p.baths} baño${p.baths > 1 ? 's' : ''}</p>

      <div class="modal-price-block">
        <div>
          <div class="price-from">Precio desde</div>
          <div class="modal-price-big">USD ${p.price} <span style="font-size:1rem;color:var(--text-muted)">/noche</span></div>
          <div class="modal-price-note">⚠️ Precios dinámicos — varía por temporada y demanda</div>
        </div>
        <a href="https://wa.me/13522600070?text=${waMsg}" target="_blank" class="btn-primary" style="white-space:nowrap">💬 Consultar precio exacto</a>
      </div>

      <p class="modal-desc">${p.description}</p>

      <div class="modal-grid2">
        <div>
          <div class="modal-section-title">🛎 Amenities</div>
          <div>${amenityTags}</div>
        </div>
        <div>
          <div class="modal-section-title">📋 Reglas</div>
          <p style="font-size:.85rem;color:var(--text-muted);line-height:1.7;font-weight:300">${p.rules}</p>
        </div>
      </div>

      <div class="modal-sheet-note">
        📅 <span><strong>Disponibilidad:</strong> Consultanos por WhatsApp o mirá el calendario en nuestra hoja de disponibilidad. Te confirmamos fechas en minutos.</span>
      </div>

      <div class="modal-cta">
        <a href="https://wa.me/13522600070?text=${waMsg}" target="_blank" class="btn-primary">
          💬 Consultar disponibilidad
        </a>
        <a href="https://wa.me/13522600070?text=${waMsg}" target="_blank" class="btn-primary" style="background:var(--green)">
          📅 Reservar este depa
        </a>
      </div>
    </div>
  `;

  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('modal')) closeModalBtn();
}

function closeModalBtn() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalBtn(); });

// ── SEARCH / WA ──────────────────────────
function consultarWA() {
  const ci = document.getElementById('checkin').value;
  const co = document.getElementById('checkout').value;
  const g  = document.getElementById('guestSearch').value;
  let msg = 'Hola, quiero consultar disponibilidad en Manhattan';
  if (ci && co) msg += ` del ${ci} al ${co}`;
  if (g) msg += ` para ${g}`;
  window.open(`https://wa.me/13522600070?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── CONTACT FORM ─────────────────────────
function submitForm(e) {
  e.preventDefault();
  const ci    = document.getElementById('formCheckin').value;
  const co    = document.getElementById('formCheckout').value;
  const g     = document.getElementById('formGuests').value;
  const type  = document.getElementById('formType').value;
  const msg = `Hola, quiero consultar disponibilidad en Manhattan del ${ci} al ${co} para ${g}. Tipo buscado: ${type}.`;
  window.open(`https://wa.me/13522600070?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── MOBILE MENU ──────────────────────────
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('mobile-open');
}

// ── SCROLL REVEAL ────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── DATE DEFAULTS ────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const plus7 = new Date(today); plus7.setDate(today.getDate() + 7);
  const fmt   = d => d.toISOString().split('T')[0];

  ['checkin','formCheckin'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = fmt(today); el.min = fmt(today); }
  });
  ['checkout','formCheckout'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = fmt(plus7); el.min = fmt(today); }
  });

  loadProperties();
});
