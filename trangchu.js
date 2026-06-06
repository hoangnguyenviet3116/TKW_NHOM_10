/*POP-UP*/
window.addEventListener('load', function () {
    const popup = document.getElementById('promoPopup');
    const closeBtn = document.querySelector('.close-popup');

    // Kiểm tra xem trong phiên làm việc này (session) người dùng đã xem popup chưa
    if (popup && !sessionStorage.getItem('promo_popup_seen')) {
        // Tự động hiện sau 2 giây nếu chưa xem
        setTimeout(() => {
            popup.classList.add('active');
        }, 2000);
    }

    // Đóng khi click vào nút X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
            // Đánh dấu là đã xem trong phiên làm việc này
            sessionStorage.setItem('promo_popup_seen', 'true');
        });
    }
    // Đóng khi click ra ngoài vùng trắng
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            // Đánh dấu là đã xem trong phiên làm việc này
            sessionStorage.setItem('promo_popup_seen', 'true');
        }
    });
});


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


// =======================
// SẢN PHẨM NỔI BẬT - LẤY THEO LƯỢT BÁN CAO NHẤT
// =======================

function formatHomePrice(price) {
    return Number(price).toLocaleString("vi-VN") + "đ";
}

function getBestSellingProducts() {
    const products = JSON.parse(localStorage.getItem("bathora_products")) || [];

    return products
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10);
}

function renderBestSellingProducts() {
    const productContainer = document.getElementById("featuredProducts");

    if (!productContainer) return;

    const bestSellingProducts = getBestSellingProducts();

    if (bestSellingProducts.length === 0) {
        productContainer.innerHTML = `
            <div class="swiper-slide">
                <p class="text-center w-100">
                    Hãy mở trang sản phẩm một lần để hệ thống cập nhật sản phẩm bán chạy.
                </p>
            </div>
        `;
        return;
    }

    productContainer.innerHTML = bestSellingProducts.map(product => `
        <div class="swiper-slide">
            <div class="product-card"
                data-id="${product.id}"
                data-name="${product.name}"
                data-price="${formatHomePrice(product.price)}"
                data-img="${product.img}">
                
                <div class="product-img">
                    <img src="${product.img}" alt="${product.name}">
                </div>

                <div class="product-info">
                    <h3 class="product-title">
                        ${product.name}
                    </h3>

                    <div class="price-heart-wrapper">
                        <div class="product-price">
                            ${formatHomePrice(product.price)}
                        </div>

                        <button class="wishlist-btn">
                            <i class="fa-regular fa-heart heart-btn"></i>
                        </button>
                    </div>

                    <div class="product-meta d-flex justify-content-between align-items-center">
                        <div class="rating">
                            <i class="fa-solid fa-star"></i> ${product.rating}
                        </div>

                        <div class="sold-count">
                            ${product.sold} đã bán
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}




/*DANH MỤC SẢN PHẨM*/
var swiper = new Swiper(".categorySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 }, /* Laptop hiện 4 cái */
    },
});


/*SẢN PHẨM NỔI BẬT*/
var swiper = new Swiper(".featuredSwiper", {
    slidesPerView: 4,
    spaceBetween: 25,
    loop: true, // tạo vòng lặp khi kéo hết ảnh
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1.2
        },

        576: {
            slidesPerView: 2
        },

        768: {
            slidesPerView: 3
        },

        1200: {
            slidesPerView: 4
        }
    }
});

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

function saveFavorites(favs) {
    const wishlistKey = getWishlistKey();

    if (!wishlistKey) return;

    localStorage.setItem(wishlistKey, JSON.stringify(favs));
}
document.addEventListener("click", function (e) {
    const heart = e.target.closest(".heart-btn");

    if (!heart) return;

    const currentUser = getCurrentUser();

    if (!currentUser) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào yêu thích.");
        window.location.href = "TaiKhoan/login.html";
        return;
    }

    const card = heart.closest(".product-card");

    if (!card) return;

    const product = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: card.dataset.price,
        img: card.dataset.img
    };

    let favs = getFavorites();

    const index = favs.findIndex(item => item.id === product.id);

    if (index === -1) {
        favs.push(product);
        heart.classList.add("active");
    } else {
        favs.splice(index, 1);
        heart.classList.remove("active");
    }

    saveFavorites(favs);
    updateHeartIcons();
});
// =======================
// CLICK TRÁI TIM & CẬP NHẬT SỐ LƯỢNG
// =======================


// =======================
// HÀM CẬP NHẬT TRẠNG THÁI TIM VÀ SỐ LƯỢNG BADGE
// =======================
function updateHeartIcons() {
    // 1. Lấy danh sách yêu thích từ localStorage
    let favs = getFavorites();

    // 2. Cập nhật số lượng hiển thị bên cạnh icon trái tim trên Header
    const wishlistBadge = document.getElementById("wishlist-badge");
    if (wishlistBadge) {
        wishlistBadge.innerText = favs.length;

        // Nếu không có sản phẩm nào, ẩn số đi cho thanh lịch. Có sản phẩm thì hiện lại.
        if (favs.length === 0) {
            wishlistBadge.classList.add("d-none");
        } else {
            wishlistBadge.classList.remove("d-none");
        }
    }

    // 3. Đổi màu trạng thái icon trái tim tại các thẻ sản phẩm tương ứng
    document.querySelectorAll(".product-card").forEach(card => {
        const id = card.dataset.id;
        const heart = card.querySelector(".heart-btn");

        if (!heart) return;

        if (favs.find(item => item.id === id)) {
            heart.classList.add("active");
        } else {
            heart.classList.remove("active");
        }
    });
}


// =======================
// KHỞI CHẠY KHI TẢI TRANG
// =======================
document.addEventListener("DOMContentLoaded", () => {
    renderBestSellingProducts();
    updateHeartIcons();
    updateCartBadge();
});

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

/*VIDEO*/

window.addEventListener("DOMContentLoaded", () => {

    const introOverlay = document.getElementById("introOverlay");
    const introVideo = document.getElementById("introVideo");

    if (!introOverlay || !introVideo) return;

    // Đã xem rồi
    if (sessionStorage.getItem("home_intro_seen")) {

        introOverlay.remove();
        return;
    }

    document.body.classList.add("intro-playing");

    // Force play
    introVideo.play().catch(() => {
        closeIntro();
    });

    // Khi video kết thúc
    introVideo.addEventListener("ended", closeIntro);

    // Backup nếu video lỗi
    introVideo.addEventListener("error", closeIntro);

    // Backup timeout tránh bị đứng
    setTimeout(() => {

        if (document.body.classList.contains("intro-playing")) {
            closeIntro();
        }

    }, 10000);

    function closeIntro() {

        sessionStorage.setItem("home_intro_seen", "true");

        introOverlay.classList.add("hide");

        document.body.classList.remove("intro-playing");

        setTimeout(() => {

            introOverlay.remove();

        }, 1200);
    }

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
