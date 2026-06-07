/*MENU*/
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Nếu đang ở sát mép trên cùng (ví dụ dưới 50px)
    if (scrollTop <= 50) {
        header.classList.remove('header-hidden'); // Luôn hiện menu
    }
    // Nếu bắt đầu cuộn xuống dưới
    else {
        if (scrollTop > lastScrollTop) {
            // Đang cuộn xuống -> Ẩn menu
            header.classList.add('header-hidden');
        } else {
            // Đang cuộn lên -> Hiện menu
            header.classList.remove('header-hidden');
        }
    }

    lastScrollTop = scrollTop;
});

// =========================================================
// HÀM CẬP NHẬT VÀ TỰ ĐỘNG ẨN SỐ LƯỢNG YÊU THÍCH TRÊN MENU
// =========================================================
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

function updateMenuWishlistBadge() {
    const wishlistBadge = document.getElementById("wishlist-badge");

    if (!wishlistBadge) return;

    const favs = getFavorites();

    wishlistBadge.innerText = favs.length;
    wishlistBadge.style.display = favs.length === 0 ? "none" : "flex";
}

// Tự động kiểm tra và cập nhật số lượng ngay khi người dùng vừa vào trang tin tức
document.addEventListener("DOMContentLoaded", () => {
    updateMenuWishlistBadge();
    updateCartBadge();
});


// =========================================================
// HÀM CẬP NHẬT VÀ TỰ ĐỘNG ẨN/HIỆN SỐ LƯỢNG GIỎ HÀNG TRÊN MENU
// =========================================================




/*Back to top*/
const backToTopBtn = document.querySelector('#backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
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

/*HIỆU ỨNG CUỘN TRANG*/
const fadeElements = document.querySelectorAll('.fade-up');

function checkFade() {
    fadeElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < window.innerHeight - 100) {
            el.classList.add('show');
        }
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);


// ========================================================
    // LOGIC ĐÓNG MỞ SIDEBAR POPUP & DROPDOWN CHO TRANG TIN TỨC
    // ========================================================
    const openBtn = document.getElementById("openMobileMenuBtn");
    const closeBtn = document.getElementById("closeMobileMenuBtn");
    const sidebar = document.getElementById("mobileMenuPopup");
    const overlay = document.getElementById("sidebarPopupOverlay");

    if (openBtn && sidebar && overlay) {
        openBtn.addEventListener("click", function () {
            sidebar.classList.add("open");
            overlay.classList.add("show");
            document.body.style.overflow = "hidden"; // Khóa cuộn trang nền
        });
    }

    function hideMobileMenu() {
        if (sidebar && overlay) {
            sidebar.classList.remove("open");
            overlay.classList.remove("show");
            document.body.style.overflow = ""; // Mở lại cuộn trang nền
        }
    }

    if (closeBtn) closeBtn.addEventListener("click", hideMobileMenu);
    if (overlay) overlay.addEventListener("click", hideMobileMenu);

    // Kéo thả trượt mượt danh mục SALE & SẢN PHẨM trên Mobile bằng jQuery
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault(); // Ngăn chặn nhảy trang
            const parentLi = this.parentElement;
            const submenu = parentLi.querySelector('.mobile-submenu');
            
            if (submenu) {
                const isOpen = parentLi.classList.contains('active');
                if (isOpen) {
                    parentLi.classList.remove('active');
                    $(submenu).slideUp(300); // Trượt ẩn lên
                } else {
                    parentLi.classList.add('active');
                    $(submenu).slideDown(300); // Trượt xổ xuống
                }
            }
        });
    });