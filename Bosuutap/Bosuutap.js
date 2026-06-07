// ====== GALLERY SWIPE SYSTEM ======
const galleries = ['1','2','3','4','5','6','7'];
const states = {};

galleries.forEach(id => {
  states[id] = 0;
  const el = document.getElementById('gallery-' + id);
  if (!el) return;

  const track = document.getElementById('track-' + id);
  const dotsEl = document.getElementById('dots-' + id);
  const badge = document.getElementById('badge-' + id);
  const slides = track ? track.querySelectorAll('.look-gallery-slide') : [];
  const total = slides.length;

  function goTo(idx) {
    if (idx < 0) idx = total - 1;
    if (idx >= total) idx = 0;
    states[id] = idx;
    if (track) track.style.transform = `translateX(-${idx * 100}%)`;
    if (dotsEl) dotsEl.querySelectorAll('.gd').forEach((d, i) => d.classList.toggle('active', i === idx));
    if (badge) badge.textContent = `BATHORA · LOOKBOOK`;
  }

  // Mouse drag
  let startX = 0, dragging = false;
  el.addEventListener('mousedown', e => { startX = e.clientX; dragging = false; });
  el.addEventListener('mousemove', e => { if (e.buttons === 1 && Math.abs(e.clientX - startX) > 5) dragging = true; });
  el.addEventListener('mouseup', e => {
    if (!dragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 40) goTo(states[id] + (diff > 0 ? 1 : -1));
    dragging = false;
  });
  el.addEventListener('mouseleave', () => { dragging = false; });

  // Touch swipe
  let touchX = 0;
  el.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  el.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(states[id] + (diff > 0 ? 1 : -1));
  });

  // Dot clicks
  if (dotsEl) dotsEl.querySelectorAll('.gd').forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  goTo(0);
});

// ====== SCROLL REVEAL ======
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// ====== BACK TO TOP ======
const btt = document.getElementById('backToTop');
if (btt) {
  window.addEventListener('scroll', () => { btt.classList.toggle('show', window.scrollY > 300); }, { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("bathora_current_user"));
}

/* YÊU THÍCH THEO TÀI KHOẢN */
function getWishlistKey() {
    const user = getCurrentUser();

    if (!user) return null;

    return "favorites_" + user.email;
}

function getFavorites() {
    const wishlistKey = getWishlistKey();

    if (!wishlistKey) return [];

    return JSON.parse(localStorage.getItem(wishlistKey)) || [];
}

function updateWishlistBadge() {
    const badge = document.getElementById("wishlist-badge");
    if (!badge) return;

    const favs = getFavorites();

    badge.innerText = favs.length;
    badge.style.display = favs.length === 0 ? "none" : "flex";
}

/* GIỎ HÀNG THEO TÀI KHOẢN */
function getCartKey() {
    const user = getCurrentUser();

    if (!user) return null;

    return "cart_" + user.email;
}

function getCart() {
    const cartKey = getCartKey();

    if (!cartKey) return [];

    return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (!badge) return;

    const cart = getCart();

    const totalQuantity = cart.reduce((sum, item) => {
        return sum + Number(item.quantity || 0);
    }, 0);

    badge.innerText = totalQuantity;
    badge.style.display = totalQuantity === 0 ? "none" : "flex";
}

document.addEventListener("DOMContentLoaded", function () {
    updateWishlistBadge();
    updateCartBadge();
});