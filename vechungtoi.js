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
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    const wishlistBadge = document.getElementById('wishlist-badge');

    if (!wishlistBadge) return;
    wishlistBadge.innerText = favs.length;
    wishlistBadge.style.display = favs.length === 0 ? 'none' : 'flex';
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

const galleryImages =
document.querySelectorAll(".gallery-img");

let currentImage = 0;

setInterval(() => {

    galleryImages[currentImage]
        .classList.remove("active");

    currentImage++;

    if(currentImage >= galleryImages.length){
        currentImage = 0;
    }

    galleryImages[currentImage]
        .classList.add("active");

}, 1500);

