/*MENU*/
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
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







/*Back to top*/
const backToTopBtn = document.querySelector('#backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
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