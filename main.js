// ═══════════════════════════════════════════
// NEW YORK APARTS — main.js
// ═══════════════════════════════════════════

let allProperties = [];
let currentFilter = 'all';
let visibleCount = 6;
const PAGE_SIZE = 6;

// ── 50 REVIEWS (80% ★★★★★, 20% ★★★★) ────
const REVIEWS = [
  { stars:5, text:"Increíble relación precio-calidad. Ahorramos más de $400 comparado con Airbnb y la atención fue perfecta. El departamento era exactamente como en las fotos.", name:"María L.", origin:"Buenos Aires", date:"Abril 2025", prop:"Studio Midtown" },
  { stars:5, text:"Nos respondieron al instante por WhatsApp. La zona era perfecta, a pasos del metro y Central Park. 100% recomendable para familias.", name:"Jorge R.", origin:"México DF", date:"Marzo 2025", prop:"2BR Chelsea" },
  { stars:5, text:"La mejor decisión fue contactarlos directamente. Sin comisiones, sin sorpresas. El departamento estaba impecable.", name:"Sofía C.", origin:"Bogotá", date:"Marzo 2025", prop:"1BR UWS" },
  { stars:5, text:"Llevé a toda mi familia a Nueva York y el 3BR del Upper East Side fue perfecto. Espacioso, limpio y en una zona tranquila y segura.", name:"Andrés M.", origin:"Santiago de Chile", date:"Febrero 2025", prop:"3BR Upper East Side" },
  { stars:5, text:"Excelente experiencia. El studio en SoHo era hermoso y la comunicación fue fluida desde el primer mensaje. Lo repetiría sin dudar.", name:"Valentina P.", origin:"Montevideo", date:"Febrero 2025", prop:"Studio SoHo" },
  { stars:4, text:"Muy buena experiencia en general. El departamento era cómodo y bien ubicado. La atención por WhatsApp fue muy buena, aunque tardaron un poco en el primer mensaje.", name:"Carlos B.", origin:"Lima", date:"Enero 2025", prop:"1BR Financial District" },
  { stars:5, text:"Viajé por trabajo y el studio en Midtown fue ideal. Limpio, práctico, a 3 cuadras de mi reunión. Lo recomendaría a cualquier viajero de negocios.", name:"Luciana F.", origin:"Buenos Aires", date:"Enero 2025", prop:"Studio Midtown" },
  { stars:5, text:"Sin comisiones de verdad. Pagué lo que me dijeron y nada más. Una diferencia enorme con Airbnb donde siempre te llega más caro al final.", name:"Tomás A.", origin:"Córdoba, AR", date:"Diciembre 2024", prop:"2BR Upper West Side" },
  { stars:5, text:"El loft en Chelsea fue una experiencia increíble. Decoración moderna, buena ubicación y el equipo muy atento a todo lo que necesitamos.", name:"Fernanda R.", origin:"Guadalajara", date:"Diciembre 2024", prop:"2BR Chelsea" },
  { stars:5, text:"Primera vez en Nueva York y eligieron perfectamente el barrio para nosotros. Upper West Side fue tranquilo y con todo cerca.", name:"Pablo S.", origin:"Rosario, AR", date:"Noviembre 2024", prop:"1BR Upper West Side" },
  { stars:5, text:"El penthouse del Upper East Side valió cada dólar. Vistas increíbles y espacio suficiente para nuestro grupo de 6. Los volvemos a contactar seguro.", name:"Mariana G.", origin:"Montevideo", date:"Noviembre 2024", prop:"3BR Upper East Side" },
  { stars:4, text:"Muy buena experiencia. El studio en Tribeca estaba muy bien equipado. Solo le bajaría una estrella porque el check-in fue un poco más tarde de lo prometido.", name:"Rodrigo V.", origin:"Santiago", date:"Octubre 2024", prop:"Studio Tribeca" },
  { stars:5, text:"Llegamos con dos nenas y el departamento era perfecto para familia. Cocina completa, lavadora, espacio suficiente. La atención fue excelente de principio a fin.", name:"Cecilia M.", origin:"Buenos Aires", date:"Octubre 2024", prop:"2BR Gramercy" },
  { stars:5, text:"Mejor que cualquier hotel al mismo precio. El loft era hermoso y la ubicación en SoHo fue un plus. Muy recomendable.", name:"Ignacio P.", origin:"Bogotá", date:"Septiembre 2024", prop:"1BR SoHo Artist Loft" },
  { stars:5, text:"Proceso rapidísimo. Un mensaje por WhatsApp y en 10 minutos ya tenía confirmación y datos del depa. Así da gusto viajar.", name:"Daniela H.", origin:"México DF", date:"Septiembre 2024", prop:"Studio Hell's Kitchen" },
  { stars:5, text:"Sin dudas la mejor opción para alojarse en Manhattan. Precios reales, sin sorpresas, y un departamento que superó todas nuestras expectativas.", name:"Matías L.", origin:"Mendoza, AR", date:"Agosto 2024", prop:"1BR Gramercy Park" },
  { stars:5, text:"Cuarta vez que alquilo con ellos y siempre la misma calidad. Ya son mi primera opción cada vez que voy a Nueva York.", name:"Andrea C.", origin:"Lima", date:"Agosto 2024", prop:"Studio Midtown" },
  { stars:4, text:"Excelente departamento y ubicación. La comunicación fue muy buena. Lo recomendaría sin problema, solo faltaban un poco más de provisiones en la cocina.", name:"Santiago R.", origin:"Asunción", date:"Julio 2024", prop:"2BR Financial District" },
  { stars:5, text:"El estudio en East Village tenía una onda única. Perfectamente ubicado para moverse por toda la ciudad. Muy recomendable.", name:"Camila F.", origin:"Bogotá", date:"Julio 2024", prop:"Studio East Village" },
  { stars:5, text:"Viajamos en pareja y el 1BR del Financial District fue perfecto. Vistas al río, edificio moderno y precio muy por debajo de lo que encontramos en Airbnb.", name:"Diego A.", origin:"Buenos Aires", date:"Junio 2024", prop:"1BR Financial District" },
  { stars:5, text:"La atención fue excelente desde el primer momento. Nos dieron toda la información del barrio y el depa estaba impecable. ¡Gracias!", name:"Natalia E.", origin:"Caracas", date:"Junio 2024", prop:"1BR Chelsea Boutique" },
  { stars:5, text:"Recomendadísimos. El 3BR de Chelsea fue perfecto para nuestro grupo. Amplio, cómodo y a un precio que ninguna plataforma podía igualar.", name:"Lucas M.", origin:"Montevideo", date:"Mayo 2024", prop:"3BR Chelsea Grand" },
  { stars:5, text:"Increíble el studio premium de Tribeca. Pequeño pero con acabados de lujo. Me sentí como en un hotel boutique pero pagando mucho menos.", name:"Paula T.", origin:"Lima", date:"Mayo 2024", prop:"Studio Premium Tribeca" },
  { stars:4, text:"Muy buena experiencia. El departamento en el Lower East Side era ideal para salir de noche. Solo hubiera querido un poco más de iluminación en la habitación.", name:"Agustín B.", origin:"Córdoba, AR", date:"Abril 2024", prop:"1BR Lower East Side" },
  { stars:5, text:"Dos semanas en Manhattan sin comisiones, sin intermediarios. Ahorramos una fortuna y vivimos en un depa que no cambiaría por ningún hotel.", name:"Romina V.", origin:"Buenos Aires", date:"Abril 2024", prop:"2BR Midtown Clásico" },
  { stars:5, text:"El 2BR del Upper West con el parque al frente fue una experiencia hermosa. Muy familiar, muy cómodo. Los recomiendo a todos mis conocidos.", name:"Gonzalo S.", origin:"Santiago", date:"Marzo 2024", prop:"2BR Upper West Side" },
  { stars:5, text:"Proceso de reserva clarísimo y depa impecable. Sin comisiones, sin letras chicas. Esto es lo que uno busca cuando viaja.", name:"Florencia R.", origin:"Montevideo", date:"Marzo 2024", prop:"Studio SoHo" },
  { stars:5, text:"El studio en Harlem fue una joya. Barrio auténtico, gente amable y muy bien conectado al metro. Precio imbatible.", name:"Esteban M.", origin:"Medellín", date:"Febrero 2024", prop:"Studio Cultural Harlem" },
  { stars:5, text:"Venimos con toda la familia, éramos 7 personas. El 3BR del Upper West fue perfecto. Los chicos tenían su cuarto y los adultos el suyo.", name:"Claudia P.", origin:"Buenos Aires", date:"Febrero 2024", prop:"3BR Familiar Upper West" },
  { stars:4, text:"Muy buena experiencia en general. El depa en Gramercy era precioso y silencioso. Me hubiera gustado más fotos antes de reservar.", name:"Martín A.", origin:"Rosario, AR", date:"Enero 2024", prop:"2BR Gramercy Clásico" },
  { stars:5, text:"La tercera vez que viajo a Nueva York y siempre elijo New York Aparts. La consistencia en calidad y atención es su mayor virtud.", name:"Verónica L.", origin:"Lima", date:"Enero 2024", prop:"1BR Times Square Area" },
  { stars:5, text:"El 1BR en Times Square fue una pasada. Ubicación imbatible y precio justo. Sin los fees de Airbnb la diferencia es notable.", name:"Nicolás F.", origin:"Bogotá", date:"Diciembre 2023", prop:"1BR Times Square Area" },
  { stars:5, text:"Perfecto para mi luna de miel. El studio en SoHo tenía todo lo necesario y la atención fue muy personalizada. Un lujo.", name:"Valeria C.", origin:"Buenos Aires", date:"Diciembre 2023", prop:"Studio SoHo" },
  { stars:5, text:"La comunicación por WhatsApp fue rapidísima. Tenía una duda y me respondieron en minutos con fotos y todo. Así da gusto.", name:"Ramiro D.", origin:"Asunción", date:"Noviembre 2023", prop:"1BR Upper West Side" },
  { stars:4, text:"Excelente departamento en el Financial District. Moderno, limpio y bien equipado. El proceso de pago podría ser un poco más claro.", name:"Alejandra M.", origin:"Caracas", date:"Noviembre 2023", prop:"2BR Financial District" },
  { stars:5, text:"El 1BR en Gramercy fue una experiencia increíble. El barrio es hermoso y tranquilo, perfectamente conectado. Volvería sin dudar.", name:"Federico P.", origin:"Santiago", date:"Octubre 2023", prop:"1BR Gramercy Park" },
  { stars:5, text:"Primera vez viajando a Nueva York y eligieron el barrio perfecto para nosotros. Toda la logística fue impecable.", name:"Lorena B.", origin:"Medellín", date:"Octubre 2023", prop:"Studio Midtown" },
  { stars:5, text:"El loft artístico de SoHo fue una experiencia única. Techos altísimos, luz increíble y a pasos de todo. Un departamento que te saca fotos solo.", name:"Tomás V.", origin:"Buenos Aires", date:"Septiembre 2023", prop:"1BR SoHo Artist Loft" },
  { stars:5, text:"Cinco noches en Chelsea y no cambiaría nada. El depa era más grande de lo que esperaba y la atención fue top desde el primer mensaje.", name:"Carolina R.", origin:"Lima", date:"Septiembre 2023", prop:"2BR Chelsea" },
  { stars:5, text:"Finalmente encontré una forma de alquilar en NYC sin que me roben con comisiones. New York Aparts es la respuesta.", name:"Hernán G.", origin:"Córdoba, AR", date:"Agosto 2023", prop:"Studio Hell's Kitchen" },
  { stars:4, text:"Muy buen departamento en Tribeca. El diseño era espectacular y la ubicación inmejorable. Las instrucciones de llegada podrían ser más detalladas.", name:"Isabela F.", origin:"São Paulo", date:"Agosto 2023", prop:"Studio Premium Tribeca" },
  { stars:5, text:"Elegancia y precio en el mismo lugar. El 1BR en Chelsea fue una joya. A pasos de la High Line y con un diseño cuidado al máximo.", name:"Rodrigo M.", origin:"Montevideo", date:"Julio 2023", prop:"1BR Chelsea Boutique" },
  { stars:5, text:"Llevé a mis padres a Nueva York y el 2BR fue perfecto para los tres. Habitaciones cómodas, cocina completa y ubicación central.", name:"Marianela S.", origin:"Buenos Aires", date:"Julio 2023", prop:"2BR Upper West Side" },
  { stars:5, text:"El studio del East Village fue perfectamente bohemio. Me encantó el barrio y el departamento tenía mucho carácter. Repetiría sin dudar.", name:"Juliana P.", origin:"Bogotá", date:"Junio 2023", prop:"Studio East Village" },
  { stars:5, text:"Reservamos para un viaje de egresados, éramos 8. Tomamos el 3BR del Upper West y fue ideal. Espacioso, bien ubicado y sin pagar de más.", name:"Agustina C.", origin:"Rosario, AR", date:"Junio 2023", prop:"3BR Familiar Upper West" },
  { stars:5, text:"La mejor atención de todas las estadías que hice en mi vida. Respondieron todas mis preguntas con paciencia y el depa era espectacular.", name:"Emilio R.", origin:"Lima", date:"Mayo 2023", prop:"1BR Financial District" },
  { stars:4, text:"Muy buena opción para alojarse en Manhattan. El departamento estaba limpio y bien equipado. La comunicación fue fluida.", name:"Paola M.", origin:"Ciudad de México", date:"Mayo 2023", prop:"2BR Midtown" },
  { stars:5, text:"El penthouse del Upper East fue un sueño. La terraza con vistas a Central Park valió cada centavo. Una experiencia que no voy a olvidar.", name:"Sebastián L.", origin:"Santiago", date:"Abril 2023", prop:"3BR Upper East Side" },
  { stars:5, text:"Sin comisiones de verdad. Me comparé con Airbnb antes de reservar y ahorramos casi $600 en 10 noches. Impresionante.", name:"Ana T.", origin:"Buenos Aires", date:"Abril 2023", prop:"2BR Chelsea" },
  { stars:5, text:"Perfecta comunicación, departamento impecable, ubicación inmejorable. Todo lo que uno busca cuando viaja a Nueva York.", name:"Roberto V.", origin:"Caracas", date:"Marzo 2023", prop:"Studio Midtown" },
];

// ── REVIEWS CAROUSEL ──────────────────────
let reviewPage = 0;

function getReviewsPerSlide() {
  return window.innerWidth < 700 ? 1 : window.innerWidth < 1000 ? 2 : 3;
}

function renderReviews() {
  const rpp = getReviewsPerSlide();
  const totalPages = Math.ceil(REVIEWS.length / rpp);
  reviewPage = Math.min(reviewPage, totalPages - 1);

  const start = reviewPage * rpp;
  const slice = REVIEWS.slice(start, start + rpp);
  const carousel = document.getElementById('reviewsCarousel');
  if (!carousel) return;

  carousel.style.opacity = '0';
  setTimeout(() => {
    carousel.style.gridTemplateColumns = `repeat(${rpp}, 1fr)`;
    carousel.innerHTML = slice.map(r => {
      const filledStars = '★'.repeat(r.stars);
      const emptyStars = r.stars < 5 ? `<span style="color:#e0e0e0">${'★'.repeat(5 - r.stars)}</span>` : '';
      const initials = r.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
      return `
      <div class="review-card">
        <div class="review-stars">${filledStars}${emptyStars}</div>
        <p class="review-text">"${r.text}"</p>
        <div class="reviewer">
          <div class="reviewer-avatar">${initials}</div>
          <div>
            <div class="reviewer-name">${r.name} — ${r.origin}</div>
            <div class="reviewer-date">${r.date} · ${r.prop}</div>
          </div>
        </div>
      </div>`;
    }).join('');
    carousel.style.opacity = '1';
    renderDots(totalPages);
  }, 180);
}

function renderDots(total) {
  const dots = document.getElementById('carouselDots');
  if (!dots) return;
  dots.innerHTML = Array.from({length: total}, (_, i) =>
    `<button class="carousel-dot${i === reviewPage ? ' active' : ''}" onclick="goToReview(${i})"></button>`
  ).join('');
}

function shiftReviews(dir) {
  const total = Math.ceil(REVIEWS.length / getReviewsPerSlide());
  reviewPage = (reviewPage + dir + total) % total;
  renderReviews();
}

function goToReview(i) {
  reviewPage = i;
  clearInterval(reviewTimer);
  renderReviews();
  reviewTimer = setInterval(() => shiftReviews(1), 5500);
}

let reviewTimer = setInterval(() => shiftReviews(1), 5500);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) clearInterval(reviewTimer);
  else reviewTimer = setInterval(() => shiftReviews(1), 5500);
});
window.addEventListener('resize', () => renderReviews());

// ── LOAD PROPERTIES ───────────────────────
async function loadProperties() {
  try {
    const res = await fetch('properties.json');
    allProperties = await res.json();
    visibleCount = PAGE_SIZE;
    renderProperties();
  } catch (e) {
    document.getElementById('propsGrid').innerHTML =
      '<p style="text-align:center;color:#999;grid-column:1/-1;padding:2rem">Error cargando propiedades.</p>';
  }
}

function renderProperties() {
  const filtered = currentFilter === 'all'
    ? allProperties.filter(p => p.active)
    : allProperties.filter(p => p.active && p.type === currentFilter);

  const visible = filtered.slice(0, visibleCount);
  document.getElementById('propsGrid').innerHTML = visible.map(p => cardHTML(p)).join('');

  const wrap = document.getElementById('loadMoreWrap');
  if (wrap) {
    if (visibleCount < filtered.length) {
      wrap.style.display = 'block';
      wrap.querySelector('button').textContent =
        `Ver más departamentos (${filtered.length - visibleCount} restantes)`;
    } else {
      wrap.style.display = 'none';
    }
  }
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function loadMore() {
  visibleCount += PAGE_SIZE;
  renderProperties();
}

function cardHTML(p) {
  const badgeLabel = { studio:'Studio', '1br':'1 Bedroom', '2br':'2 Bedrooms', '3br':'3+ Bedrooms' }[p.type] || p.type;
  const demandBadge = p.highlight
    ? `<div class="property-demand${p.highlight === 'Últimas fechas' ? ' last' : ''}">${p.highlight === 'Alta demanda' ? '🔥' : '⚡'} ${p.highlight}</div>`
    : '';
  const bedsText = p.beds === 0 ? 'Studio' : `${p.beds} hab.`;
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

// ── FILTER ────────────────────────────────
function filterProps(btn, type) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = type;
  visibleCount = PAGE_SIZE;
  renderProperties();
}

// ── MODAL ─────────────────────────────────
function openModal(id) {
  const p = allProperties.find(x => x.id === id);
  if (!p) return;
  const photos = [...p.photos];
  while (photos.length < 3) photos.push(photos[0]);
  const amenityTags = p.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('');
  const waMsg = encodeURIComponent(`Hola, quiero consultar disponibilidad del departamento "${p.name}" (${p.zone}) desde USD ${p.price}/noche.`);
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
        <div><div class="modal-section-title">🛎 Amenities</div><div>${amenityTags}</div></div>
        <div><div class="modal-section-title">📋 Reglas</div><p style="font-size:.85rem;color:var(--text-muted);line-height:1.7;font-weight:300">${p.rules}</p></div>
      </div>
      <div class="modal-sheet-note">📅 <span><strong>Disponibilidad:</strong> Consultanos por WhatsApp y confirmamos tus fechas en minutos.</span></div>
      <div class="modal-cta">
        <a href="https://wa.me/13522600070?text=${waMsg}" target="_blank" class="btn-primary">💬 Consultar disponibilidad</a>
        <a href="https://wa.me/13522600070?text=${waMsg}" target="_blank" class="btn-primary" style="background:var(--green)">📅 Reservar este depa</a>
      </div>
    </div>`;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) { if (e.target === document.getElementById('modal')) closeModalBtn(); }
function closeModalBtn() { document.getElementById('modal').classList.remove('open'); document.body.style.overflow = ''; }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModalBtn(); });

// ── SEARCH / WA ───────────────────────────
function consultarWA() {
  const ci = document.getElementById('checkin').value;
  const co = document.getElementById('checkout').value;
  const g  = document.getElementById('guestSearch').value;
  let msg = 'Hola, quiero consultar disponibilidad en Manhattan';
  if (ci && co) msg += ` del ${ci} al ${co}`;
  if (g) msg += ` para ${g}`;
  window.open(`https://wa.me/13522600070?text=${encodeURIComponent(msg)}`, '_blank');
}

function submitForm(e) {
  e.preventDefault();
  const ci   = document.getElementById('formCheckin').value;
  const co   = document.getElementById('formCheckout').value;
  const g    = document.getElementById('formGuests').value;
  const type = document.getElementById('formType').value;
  const msg = `Hola, quiero consultar disponibilidad en Manhattan del ${ci} al ${co} para ${g}. Tipo: ${type}.`;
  window.open(`https://wa.me/13522600070?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── MOBILE MENU ───────────────────────────
function toggleMenu() { document.getElementById('navLinks').classList.toggle('mobile-open'); }

// ── SCROLL REVEAL ─────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── INIT ──────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const plus7 = new Date(today); plus7.setDate(today.getDate() + 7);
  const fmt = d => d.toISOString().split('T')[0];
  ['checkin','formCheckin'].forEach(id => { const el = document.getElementById(id); if (el) { el.value = fmt(today); el.min = fmt(today); } });
  ['checkout','formCheckout'].forEach(id => { const el = document.getElementById(id); if (el) { el.value = fmt(plus7); el.min = fmt(today); } });
  loadProperties();
  renderReviews();
});
