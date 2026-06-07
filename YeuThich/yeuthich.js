/* MENU */
let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!header) return;

    if (scrollTop <= 50) {
        header.classList.remove("header-hidden");
    } else {
        if (scrollTop > lastScrollTop) {
            header.classList.add("header-hidden");
        } else {
            header.classList.remove("header-hidden");
        }
    }

    lastScrollTop = scrollTop;
});

/* NGƯỜI DÙNG HIỆN TẠI */
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("bathora_current_user"));
}

/* WISHLIST THEO TÀI KHOẢN */
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

function saveFavorites(favs) {
    const wishlistKey = getWishlistKey();

    if (!wishlistKey) return;

    localStorage.setItem(wishlistKey, JSON.stringify(favs));
}

/* BADGE YÊU THÍCH */
function updateMenuWishlistBadge(totalItems) {
    const wishlistBadge = document.getElementById("wishlist-badge");

    if (!wishlistBadge) return;

    wishlistBadge.innerText = totalItems;

    if (totalItems === 0) {
        wishlistBadge.style.display = "none";
    } else {
        wishlistBadge.style.display = "flex";
    }
}

/* GIỎ HÀNG THEO TÀI KHOẢN */
function getCartKey() {
    const user = getCurrentUser();

    if (!user) {
        return null;
    }

    return "cart_" + user.email;
}

function getCart() {
    const cartKey = getCartKey();

    if (!cartKey) {
        return [];
    }

    return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function saveCart(cart) {
    const cartKey = getCartKey();

    if (!cartKey) return;

    localStorage.setItem(cartKey, JSON.stringify(cart));
}

function updateCartBadge() {
    const cart = getCart();
    const cartBadge = document.getElementById("cart-badge");
    if (!cartBadge) return;
    const totalQuantity = cart.reduce((sum, item) => {return sum + item.quantity;}, 0);
    cartBadge.innerText = totalQuantity;
    cartBadge.style.display = totalQuantity === 0 ? "none" : "flex";
}
function fixWishlistImagePath(img) {
    if (!img) {
        return "../images/logo.png";
    }

    // Ảnh từ trang chi tiết đã có ../images thì giữ nguyên
    if (img.startsWith("../")) {
        return img;
    }

    // Ảnh online thì giữ nguyên
    if (img.startsWith("http")) {
        return img;
    }

    // Ảnh từ trang chủ / sản phẩm dạng images/... thì thêm ../
    return "../" + img;
}
/* RENDER TRANG YÊU THÍCH */
document.addEventListener("DOMContentLoaded", function () {
    const currentUser = getCurrentUser();

    const gridContainer = document.getElementById("wishlist-grid");
    const count = document.getElementById("wishlist-count");
    const emptyMsg = document.getElementById("empty-message");

    if (!currentUser) {
        if (count) count.innerText = 0;
        updateMenuWishlistBadge(0);
        updateCartBadge();

        if (gridContainer) gridContainer.innerHTML = "";

        if (emptyMsg) {
            emptyMsg.classList.remove("d-none");
            emptyMsg.innerHTML = `
                <p>Bạn cần đăng nhập để xem danh sách sản phẩm yêu thích.</p>
                <a href="../TaiKhoan/login.html" class="btn-add-cart-quick">
                    ĐĂNG NHẬP NGAY
                </a>
            `;
        }

        return;
    }

    const favs = getFavorites();

    if (count) {
        count.innerText = favs.length;
    }

    updateMenuWishlistBadge(favs.length);
    updateCartBadge();

    if (favs.length === 0) {
        if (emptyMsg) emptyMsg.classList.remove("d-none");
        if (gridContainer) gridContainer.innerHTML = "";
        return;
    }

    if (emptyMsg) {
        emptyMsg.classList.add("d-none");
    }

    if (gridContainer) {
        gridContainer.innerHTML = favs.map(item => `
            <div class="col-6 col-md-4 col-lg-3 animate-card">
                <div class="wishlist-card">

                    <button onclick="removeFav('${item.id}')" class="btn-remove-fav" title="Xóa khỏi danh sách">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <div class="wishlist-img-box">
                        <img src="${fixWishlistImagePath(item.img)}" class="wishlist-img" alt="${item.name}">
                    </div>

                    <div class="wishlist-info">
                        <h4 class="wishlist-item-name">${item.name}</h4>
                        <p class="wishlist-item-price">${item.price}</p>

                        <button onclick="addToCartQuick('${item.id}')" class="btn-add-cart-quick">
                            Thêm Vào Giỏ
                        </button>
                    </div>
                </div>
            </div>
        `).join("");
    }
});

/* THÊM VÀO GIỎ TỪ YÊU THÍCH */
function addToCart(product) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return;
    }

    let cart = getCart();

    const cartKey = `${product.id}-${product.size || "M"}-${product.color || "Mặc định"}`;

    const existingProduct = cart.find(item => item.cartKey === cartKey);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            img: product.img,
            quantity: 1,
            size: product.size || "M",
            color: product.color || "Mặc định",
            selected: true,
            cartKey: cartKey
        });
    }

    saveCart(cart);
    updateCartBadge();
}

function addToCartQuick(id) {
    const favs = getFavorites();
    const product = favs.find(item => item.id == id);

    if (!product) return;

    addToCart({
        id: product.id,
        name: product.name,
        price: String(product.price).replace(/[^\d]/g, ""),
        img: fixWishlistImagePath(product.img),
        size: product.size || "M",
        color: product.color || "Mặc định"
    });

    const toast = document.createElement("div");
    toast.className = "toast-custom";
    toast.innerText = "Đã thêm sản phẩm vào giỏ hàng thành công!";
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = "opacity 0.5s ease";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

/* XÓA YÊU THÍCH */
function removeFav(id) {
    let favs = getFavorites();

    favs = favs.filter(item => item.id !== id);

    saveFavorites(favs);
    updateMenuWishlistBadge(favs.length);

    location.reload();
}

/* BACK TO TOP */
const backToTopBtn = document.querySelector("#backToTop");

if (backToTopBtn) {
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}