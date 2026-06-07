/* ===============================
   VE CHUNG TOI - JS RIENG
   Dùng kiến thức: DOM, JavaScript, jQuery, LocalStorage, IntersectionObserver
   =============================== */

/* MENU: ẩn khi cuộn xuống, hiện khi cuộn lên - đồng bộ với yeuthich.js */
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (!header) return;

    if (scrollTop <= 50) {
        header.classList.remove('header-hidden');
    } else if (scrollTop > lastScrollTop) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    lastScrollTop = scrollTop;
});

/* Cập nhật số lượng yêu thích trên header từ localStorage */
function updateMenuWishlistBadge() {
    const favs = getFavorites();
    const wishlistBadge = document.getElementById('wishlist-badge');

    if (!wishlistBadge) return;
    wishlistBadge.innerText = favs.length;
    wishlistBadge.style.display = favs.length === 0 ? 'none' : 'flex';
}
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("bathora_current_user"));
}

function getWishlistKey() {
    const user = getCurrentUser();

    if (!user) {
        return null;
    }

    return "favorites_" + user.email;
}

function getFavorites() {
    const wishlistKey = getWishlistKey();

    if (!wishlistKey) {
        return [];
    }

    return JSON.parse(localStorage.getItem(wishlistKey)) || [];
}

/* Hiệu ứng reveal khi cuộn: dùng DOM + IntersectionObserver */
function initRevealAnimation() {
    const revealItems = document.querySelectorAll('.reveal-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });

    revealItems.forEach(item => observer.observe(item));
}

/* Counter animation: tăng số liệu trong phần thống kê */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    let hasRun = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasRun) {
                hasRun = true;
                counters.forEach(counter => {
                    const target = Number(counter.dataset.target);
                    let current = 0;
                    const step = Math.max(1, Math.ceil(target / 70));

                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.innerText = current;
                    }, 18);
                });
            }
        });
    }, { threshold: 0.4 });

    if (counters.length > 0) counterObserver.observe(counters[0]);
}

/* Timeline active: đánh dấu mốc gần vùng nhìn của người dùng */
function initTimelineActive() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    window.addEventListener('scroll', () => {
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.65 && rect.bottom > 120) {
                item.classList.add('timeline-active');
            }
        });
    });
}

/* jQuery: cuộn mượt khi bấm nút trong hero */
$(document).ready(function () {
    updateMenuWishlistBadge();
    initRevealAnimation();
    initCounterAnimation();
    initTimelineActive();
    updateCartBadge();

    $('a[href^="#"]').on('click', function (e) {
        const target = $($(this).attr('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: target.offset().top - 90 }, 650);
        }
    });

    const backToTopBtn = $('#backToTop');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) backToTopBtn.addClass('show');
        else backToTopBtn.removeClass('show');
    });

    backToTopBtn.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
});

const galleryImages = document.querySelectorAll(".gallery-img");
let currentImage = 0;

if (galleryImages.length > 0) {
    setInterval(() => {
        galleryImages[currentImage].classList.remove("active");

        currentImage++;

        if (currentImage >= galleryImages.length) {
            currentImage = 0;
        }

        galleryImages[currentImage].classList.add("active");
    }, 1500);
}

/* VIDEO INTRO */
window.addEventListener("DOMContentLoaded", () => {
    const introOverlay = document.getElementById("introOverlay");
    const introVideo = document.getElementById("introVideo");

    if (!introOverlay || !introVideo) return;

    if (sessionStorage.getItem("about_intro_seen")) {
        introOverlay.remove();
        document.body.classList.remove("intro-playing");
        return;
    }

    document.body.classList.add("intro-playing");

    function closeIntro() {
        sessionStorage.setItem("about_intro_seen", "true");

        introOverlay.classList.add("hide");
        document.body.classList.remove("intro-playing");

        setTimeout(() => {
            introOverlay.remove();
        }, 1000);
    }

    introVideo.addEventListener("ended", closeIntro);
    introVideo.addEventListener("error", closeIntro);

    introVideo.play().catch(() => {
        setTimeout(closeIntro, 1500);
    });

    setTimeout(closeIntro, 8000);
});

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("bathora_current_user"));
}

function getCartKey() {
    const user = getCurrentUser();
    if (!user) return null;
    return "cart_" + user.email;
}

function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (!badge) return;

    const cartKey = getCartKey();

    if (!cartKey) {
        badge.innerText = 0;
        badge.style.display = "none";
        return;
    }

    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    badge.innerText = total;
    badge.style.display = total === 0 ? "none" : "flex";
}
// MENU
const menuToggle = document.getElementById("menuToggle");
const menu = document.querySelector(".menu");

if(menuToggle && menu){
    menuToggle.addEventListener("click",()=>{
        menu.classList.toggle("active");
    });
}

document.querySelectorAll(".mobile-dropdown-toggle").forEach(item=>{

    item.addEventListener("click",function(e){

        if(window.innerWidth <= 991){

            e.preventDefault();

            this.closest(".mobile-dropdown")
                .classList.toggle("open");
        }
    });

});