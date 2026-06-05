/* MENU GIỐNG TRANG CHỦ */
let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

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

/* FORMAT TIỀN */
function formatMoney(number) {
    return Number(number).toLocaleString("vi-VN") + "đ";
}

/* LẤY GIỎ HÀNG */
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

/* LƯU GIỎ HÀNG */
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* CẬP NHẬT BADGE YÊU THÍCH */
function updateWishlistBadge() {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const wishlistBadge = document.getElementById("wishlist-badge");

    if (!wishlistBadge) return;

    wishlistBadge.innerText = favs.length;
    wishlistBadge.style.display = favs.length === 0 ? "none" : "flex";
}

/* CẬP NHẬT BADGE GIỎ HÀNG */
function updateCartBadge() {
    const cart = getCart();
    const cartBadge = document.getElementById("cart-badge");

    if (!cartBadge) return;

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartBadge.innerText = totalQuantity;
    cartBadge.style.display = totalQuantity === 0 ? "none" : "flex";
}

/* RENDER GIỎ HÀNG */
function renderCart() {
    const cartList = document.getElementById("cart-list");
    const emptyBox = document.getElementById("cart-empty");
    const cartCount = document.getElementById("cart-count");

    const subtotalEl = document.getElementById("subtotal");
    const discountEl = document.getElementById("discount");
    const totalEl = document.getElementById("total");

    let cart = getCart();

    if (!cartList) return;

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartCount.innerText = totalQuantity;

    if (cart.length === 0) {
        cartList.innerHTML = "";
        emptyBox.classList.remove("d-none");

        subtotalEl.innerText = "0đ";
        discountEl.innerText = "-0đ";
        totalEl.innerText = "0đ";

        updateCartBadge();

        updateRewardProgress(0);
        return;
    }

    emptyBox.classList.add("d-none");

    cartList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-product">
                <img src="${item.img}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Mã sản phẩm: ${item.id}</p>
                    <p>Size: ${item.size || "Mặc định"}</p>
                </div>
            </div>

            <div class="quantity-box">
                <button class="qty-btn" onclick="changeQuantity('${item.id}', -1)">−</button>
                <span class="qty-number">${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
            </div>

            <strong class="cart-price">
                ${formatMoney(item.price * item.quantity)}
            </strong>

            <button class="remove-cart" onclick="removeCartItem('${item.id}')">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `).join("");

    const subtotal = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    updateRewardProgress(subtotal);

    const discount = subtotal >= 1500000 ? 100000 : 0;
    const total = subtotal - discount;

    subtotalEl.innerText = formatMoney(subtotal);
    discountEl.innerText = "-" + formatMoney(discount);
    totalEl.innerText = formatMoney(total);

    updateCartBadge();
    renderStyleSuggestions();
}

/* ĐỔI SỐ LƯỢNG */
function changeQuantity(id, amount) {
    let cart = getCart();

    cart = cart.map(item => {
        if (item.id === id) {
            item.quantity += amount;
        }
        return item;
    }).filter(item => item.quantity > 0);

    saveCart(cart);
    renderCart();
}

/* XÓA SẢN PHẨM */
function removeCartItem(id) {
    let cart = getCart();

    cart = cart.filter(item => item.id !== id);

    saveCart(cart);
    renderCart();
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

/* KHỞI CHẠY */
document.addEventListener("DOMContentLoaded", function () {
    updateWishlistBadge();
    updateCartBadge();
    renderCart();
    renderStyleSuggestions();
});

/* HÀM TEST THÊM SẢN PHẨM - SAU NÀY TRANG CHI TIẾT SẢN PHẨM SẼ GỌI */
function addToCart(product) {
    let cart = getCart();

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            size: product.size || "M",
            quantity: 1
        });
    }

    saveCart(cart);
    renderCart();
}

/* THANH TIẾN TRÌNH ƯU ĐÃI */
function updateRewardProgress(subtotal) {
    const target = 1500000;
    const rewardCurrent = document.getElementById("reward-current");
    const rewardMessage = document.getElementById("reward-message");
    const rewardProgressBar = document.getElementById("reward-progress-bar");

    if (!rewardCurrent || !rewardMessage || !rewardProgressBar) return;

    const percent = Math.min((subtotal / target) * 100, 100);
    const remain = Math.max(target - subtotal, 0);

    rewardCurrent.innerText = formatMoney(subtotal);
    rewardProgressBar.style.width = percent + "%";

    if (subtotal === 0) {
        rewardMessage.innerText = "Thêm sản phẩm để mở khóa ưu đãi thanh lịch từ BATHORA.";
    } else if (subtotal < target) {
        rewardMessage.innerText = "Bạn chỉ còn thiếu " + formatMoney(remain) + " để nhận ưu đãi 100.000đ.";
    } else {
        rewardMessage.innerText = "Bạn đã mở khóa ưu đãi 100.000đ cho đơn hàng này.";
    }
}

/* THÊM SẢN PHẨM GỢI Ý VÀO GIỎ */
function addSuggestToCart(id, name, price, img) {
    addToCart({
        id: id,
        name: name,
        price: price,
        img: img,
        size: "Mặc định"
    });
}

function renderStyleSuggestions() {
    const suggestList = document.getElementById("suggest-list");
    const suggestDesc = document.getElementById("suggest-desc");

    if (!suggestList) return;

    const cart = getCart();
    const cartNames = cart.map(item => item.name.toLowerCase()).join(" ");

    let suggestions = [];

    if (
        cartNames.includes("đầm") ||
        cartNames.includes("váy")
    ) {
        suggestions = [
            {
                id: "PK001",
                name: "Túi xách kem thanh lịch",
                price: 495000,
                img: "images/Tuixach.jpg"
            },
            {
                id: "PK002",
                name: "Giày cao gót nude",
                price: 650000,
                img: "images/Giaycaogot.jpg"
            },
            {
                id: "PK003",
                name: "Khuyên tai ngọc trai",
                price: 220000,
                img: "images/Phukien.jpg"
            },
            {
                id: "PK004",
                name: "Áo khoác nhẹ nữ tính",
                price: 780000,
                img: "images/AoKhoac.jpg"
            }
        ];

        suggestDesc.innerText =
            "Sản phẩm trong giỏ có đầm/váy, vì vậy BATHORA gợi ý phụ kiện, giày và áo khoác để hoàn thiện outfit.";
    }
    else if (cartNames.includes("áo")) {
        suggestions = [
            {
                id: "PH001",
                name: "Chân váy dài nhún eo",
                price: 595000,
                img: "images/Chanvay.jpg"
            },
            {
                id: "PH002",
                name: "Quần resort 2 ly bung",
                price: 655000,
                img: "images/Quan.jpg"
            },
            {
                id: "PH003",
                name: "Túi xách tối giản",
                price: 495000,
                img: "images/Tuixach.jpg"
            },
            {
                id: "PH004",
                name: "Giày cao gót nude",
                price: 650000,
                img: "images/Giaycaogot.jpg"
            }
        ];

        suggestDesc.innerText =
            "Sản phẩm trong giỏ có áo, vì vậy BATHORA gợi ý chân váy, quần và phụ kiện để phối thành set hoàn chỉnh.";
    }
    else if (
        cartNames.includes("quần") ||
        cartNames.includes("chân váy")
    ) {
        suggestions = [
            {
                id: "SET001",
                name: "Áo kiểu nữ thanh lịch",
                price: 520000,
                img: "images/Ao.jpg"
            },
            {
                id: "SET002",
                name: "Áo khoác nhẹ nữ tính",
                price: 780000,
                img: "images/AoKhoac.jpg"
            },
            {
                id: "SET003",
                name: "Túi xách kem thanh lịch",
                price: 495000,
                img: "images/Tuixach.jpg"
            },
            {
                id: "SET004",
                name: "Phụ kiện ngọc trai",
                price: 220000,
                img: "images/Phukien.jpg"
            }
        ];

        suggestDesc.innerText =
            "Sản phẩm trong giỏ có quần hoặc chân váy, vì vậy BATHORA gợi ý áo và phụ kiện để cân bằng tổng thể outfit.";
    }
    else {
        suggestions = [
            {
                id: "GOIY001",
                name: "Đầm thanh lịch dễ mặc",
                price: 895000,
                img: "images/SPNB8.jpg"
            },
            {
                id: "GOIY002",
                name: "Túi xách kem thanh lịch",
                price: 495000,
                img: "images/Tuixach.jpg"
            },
            {
                id: "GOIY003",
                name: "Giày cao gót nude",
                price: 650000,
                img: "images/Giaycaogot.jpg"
            },
            {
                id: "GOIY004",
                name: "Phụ kiện ngọc trai",
                price: 220000,
                img: "images/Phukien.jpg"
            }
        ];

        suggestDesc.innerText =
            "Chưa có đủ dữ liệu sản phẩm trong giỏ, BATHORA hiển thị các gợi ý phối đồ phổ biến nhất.";
    }

    suggestList.innerHTML = suggestions.map(item => `
        <div class="col-6 col-lg-3">
            <div class="suggest-card">
                <img src="${item.img}" alt="${item.name}">
                <div class="suggest-info">
                    <h4>${item.name}</h4>
                    <p>${formatMoney(item.price)}</p>
                    <button onclick="addSuggestToCart('${item.id}', '${item.name}', ${item.price}, '${item.img}')">
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}