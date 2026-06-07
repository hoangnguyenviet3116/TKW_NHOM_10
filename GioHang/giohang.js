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
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("bathora_current_user"));
}

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
/* LƯU GIỎ HÀNG */
function saveCart(cart) {
    const cartKey = getCartKey();

    if (!cartKey) return;

    localStorage.setItem(cartKey, JSON.stringify(cart));
}

/* CẬP NHẬT BADGE YÊU THÍCH */
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

function updateWishlistBadge() {
    const favs = getFavorites();
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
    const currentUser = getCurrentUser();

if (!currentUser) {
     updateCartBadge();
    cartList.innerHTML = "";
    emptyBox.classList.remove("d-none");
    emptyBox.innerHTML = `
        <h3>Bạn chưa đăng nhập</h3>
        <p>Vui lòng đăng nhập để xem giỏ hàng của bạn.</p>
        <a href="../TaiKhoan/login.html" class="btn-continue-shopping">
            ĐĂNG NHẬP NGAY
        </a>
    `;

    cartCount.innerText = 0;
    subtotalEl.innerText = "0đ";
    discountEl.innerText = "-0đ";
    totalEl.innerText = "0đ";

    updateRewardProgress(0);
    renderStyleSuggestions();
    updateCartBadge();

    return;
}

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
        renderStyleSuggestions();
        return;
    }

    emptyBox.classList.add("d-none");

    cartList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-product">
                <img src="${item.img}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                  <p>${item.sku || "Mã sản phẩm: " + item.id}</p>
                    <p>Size: ${item.size || "Mặc định"}</p>
                    <p>Màu sắc: ${item.color || "Mặc định"}</p>
                </div>
            </div>

            <div class="quantity-box">
                <button class="qty-btn" onclick="changeQuantity('${item.cartKey}', -1)">−</button>
                <span class="qty-number">${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity('${item.cartKey}', 1)">+</button>
            </div>

            <strong class="cart-price">
                ${formatMoney(item.price * item.quantity)}
            </strong>

            <div class="cart-action-box">
    <label class="checkout-select">
        <input type="checkbox"
               class="checkout-checkbox"
               data-cart-key="${item.cartKey}"
               ${item.selected !== false ? "checked" : ""}>
        <span></span>
    </label>

    <button class="remove-cart" onclick="removeCartItem('${item.cartKey}')">
        <i class="fa-regular fa-trash-can"></i>
    </button>
</div>
        </div>
    `).join("");

    const selectedCart = cart.filter(item => item.selected !== false);

const subtotal = selectedCart.reduce((sum, item) => {
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
function changeQuantity(cartKey, amount) {
    let cart = getCart();

    cart = cart.map(item => {
        if (item.cartKey === cartKey) {
            item.quantity += amount;
        }

        return item;
    }).filter(item => item.quantity > 0);

    saveCart(cart);
    renderCart();
}

/* XÓA SẢN PHẨM */
function removeCartItem(cartKey) {
    let cart = getCart();

    cart = cart.filter(item => item.cartKey !== cartKey);

    saveCart(cart);
    renderCart();
}
/* CHỌN SẢN PHẨM */
document.addEventListener("change", function (e) {
    if (!e.target.classList.contains("checkout-checkbox")) return;

    const cartKey = e.target.dataset.cartKey;
    let cart = getCart();

    cart = cart.map(item => {
        if (item.cartKey === cartKey) {
            item.selected = e.target.checked;
        }

        return item;
    });

    saveCart(cart);
    renderCart();
});

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

    const cartKey = product.cartKey || `${product.id}-${product.size || "Mặc định"}-${product.color || "Mặc định"}`;

    const existingProduct = cart.find(item => item.cartKey === cartKey);

    if (existingProduct) {
        existingProduct.quantity += product.quantity || 1;
    } else {
        cart.push({
            id: product.id,
            sku: product.sku || product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice || "",
            discount: product.discount || "",
            img: product.img,
            size: product.size || "Mặc định",
            color: product.color || "Mặc định",
            quantity: product.quantity || 1,
            type: product.type || "",
            selected: true,
            cartKey: cartKey
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

function getAllProductsForSuggest() {
    return JSON.parse(localStorage.getItem("bathora_products")) || [];
}

function fixImagePath(img) {
    if (!img) return "https://placehold.co/600x800/f8f3ec/222?text=BATHORA";

    if (img.startsWith("../")) return img;

    return "../" + img;
}

function getSuggestTypesByCart(cart) {
    const cartTypes = cart.map(item => item.type || "").join(" ");
    const cartNames = cart.map(item => item.name.toLowerCase()).join(" ");

    if (cartTypes.includes("ao") || cartNames.includes("áo")) {
        return ["chanvay", "quan", "tuixach", "giay", "phukien", "aokhoac"];
    }

    if (cartTypes.includes("dam") || cartNames.includes("đầm")) {
        return ["tuixach", "giay", "phukien", "aokhoac"];
    }

    if (cartTypes.includes("quan") || cartNames.includes("quần")) {
        return ["ao", "aokhoac", "tuixach", "giay"];
    }

    if (cartTypes.includes("chanvay") || cartNames.includes("chân váy")) {
        return ["ao", "aokhoac", "tuixach", "giay", "phukien"];
    }

    return ["ao", "chanvay", "quan", "tuixach"];
}

function getSuggestReason(type) {
    const reasons = {
        ao: "Phối làm phần trên",
        quan: "Cân bằng dáng áo",
        chanvay: "Tăng nét nữ tính",
        aokhoac: "Hoàn thiện layer",
        tuixach: "Điểm nhấn outfit",
        giay: "Tôn dáng thanh lịch",
        phukien: "Tạo điểm nhấn nhỏ"
    };

    return reasons[type] || "Gợi ý phối đồ";
}
function normalizeColor(colorText) {
    const color = (colorText || "").toLowerCase();

    if (color.includes("đen")) return "đen";
    if (color.includes("trắng")) return "trắng";
    if (color.includes("be") || color.includes("kem")) return "be";
    if (color.includes("hồng")) return "hồng";
    if (color.includes("xanh")) return "xanh";
    if (color.includes("đỏ")) return "đỏ";
    if (color.includes("nâu")) return "nâu";
    if (color.includes("xám") || color.includes("ghi")) return "xám";
    if (color.includes("vàng")) return "vàng";

    return color;
}

function getMainCartColor(cart) {
    if (cart.length === 0) return "";

    return normalizeColor(cart[0].color);
}

function colorMatchScore(product, cartColor) {
    if (!cartColor) return 0;

    const productColors = (product.colors || []).map(color => normalizeColor(color));

    const colorRules = {
        "hồng": ["trắng", "be", "đen", "hồng", "nâu"],
        "xanh": ["trắng", "be", "đen", "xanh"],
        "đỏ": ["đen", "trắng", "be", "nâu", "đỏ"],
        "trắng": ["be", "đen", "trắng", "nâu", "hồng"],
        "be": ["trắng", "nâu", "đen", "be", "hồng"],
        "đen": ["trắng", "be", "đỏ", "đen", "xám"],
        "nâu": ["be", "trắng", "nâu", "đen"],
        "xám": ["trắng", "đen", "be", "xám"],
        "vàng": ["trắng", "be", "nâu", "đen"]
    };

    const suitableColors = colorRules[cartColor] || [];

    if (productColors.includes(cartColor)) return 4;

    if (productColors.some(color => suitableColors.includes(color))) return 2;

    return 0;
}
function renderStyleSuggestions() {
    const suggestList = document.getElementById("suggest-list");
    const suggestDesc = document.getElementById("suggest-desc");

    if (!suggestList) return;

    const cart = getCart();
        if (cart.length === 0) {

        suggestDesc.innerText =
            "Thêm sản phẩm vào giỏ để nhận gợi ý phối đồ từ BATHORA.";

        suggestList.innerHTML = "";

        return;
    }
    const allProducts = getAllProductsForSuggest();

    if (allProducts.length === 0) {
        suggestDesc.innerText =
            "Bạn hãy mở trang sản phẩm một lần để hệ thống lấy dữ liệu gợi ý phối đồ.";
        suggestList.innerHTML = "";
        return;
    }

    const cartIds = cart.map(item => item.id);
    const suggestTypes = getSuggestTypesByCart(cart);
    const mainCartColor = getMainCartColor(cart);

    let suggestions = [];

suggestTypes.forEach((type, index) => {
    const matchedProducts = allProducts
        .filter(item => item.type === type)
        .filter(item => !cartIds.includes(item.id))
        .sort((a, b) => {
            const colorScoreA = colorMatchScore(a, mainCartColor);
            const colorScoreB = colorMatchScore(b, mainCartColor);

            return colorScoreB - colorScoreA || b.rating - a.rating || b.sold - a.sold;
        });

    if (matchedProducts.length > 0) {
        const pickIndex = Math.min(index, matchedProducts.length - 1);
        suggestions.push(matchedProducts[pickIndex]);
    }
});
    suggestions = suggestions.slice(0, 4);

    if (cart.length === 0) {
        suggestDesc.innerText =
            "BATHORA gợi ý một vài sản phẩm dễ phối để bạn bắt đầu hoàn thiện outfit.";
    } else {
        suggestDesc.innerText =
    mainCartColor
        ? "Dựa trên kiểu dáng và tone màu " + mainCartColor + " trong giỏ, BATHORA gợi ý các món phối hài hòa hơn."
        : "Dựa trên sản phẩm trong giỏ, BATHORA gợi ý các món phối cùng để tạo set đồ hoàn chỉnh.";
    }

    suggestList.innerHTML = suggestions.map(item => `
        <div class="col-6 col-lg-3">
            <div class="suggest-card">
                <img src="${fixImagePath(item.img)}" alt="${item.name}"
                     onerror="this.src='https://placehold.co/600x800/f8f3ec/222?text=BATHORA'">

                <div class="suggest-info">
                    <span class="suggest-tag">${getSuggestReason(item.type)}</span>
                    <h4>${item.name}</h4>
                    <p>${formatMoney(item.price)}</p>

                    <button onclick="addSuggestProductToCart('${item.id}')">
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function addSuggestProductToCart(productId) {
    const allProducts = getAllProductsForSuggest();
    const product = allProducts.find(item => item.id === productId);

    if (!product) return;

    addToCart({
        id: product.id,
        sku: "Mã SP: " + product.id.toUpperCase(),
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice || "",
        discount: "",
        img: fixImagePath(product.img),
        size: product.sizes ? product.sizes[0] : "Freesize",
        color: product.colors ? product.colors[0] : "Mặc định",
        quantity: 1,
        type: product.type,
        cartKey: `${product.id}-${product.sizes ? product.sizes[0] : "Freesize"}-${product.colors ? product.colors[0] : "Mặc định"}`
    });
}

/* LẤY NGƯỜI DÙNG ĐANG ĐĂNG NHẬP */
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("bathora_current_user"));
}

/* LẤY CÁC SẢN PHẨM ĐÃ CHỌN ĐỂ THANH TOÁN */
function getSelectedCartItems() {
    const cart = getCart();

    return cart.filter(item => item.selected !== false);
}

/* TẠO MÃ ĐƠN HÀNG */
function generateOrderId() {
    return "BH" + Date.now();
}

/* XỬ LÝ ĐẶT HÀNG */
function isMissingCustomerInfo(user) {
    return (
        !user.name ||
        user.name === "Chưa cập nhật" ||
        !user.phone ||
        user.phone === "Chưa cập nhật" ||
        !user.address ||
        user.address === "Chưa cập nhật"
    );
}
function handleCheckout() {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        Swal.fire({
            icon: "warning",
            title: "Bạn chưa đăng nhập",
            text: "Vui lòng đăng nhập trước khi đặt hàng.",
            confirmButtonText: "Đăng nhập",
            showCancelButton: true,
            cancelButtonText: "Ở lại giỏ hàng",
            confirmButtonColor: "#c9a45c",
            cancelButtonColor: "#1b1b1b"
        }).then(result => {
            if (result.isConfirmed) {
                window.location.href = "../TaiKhoan/login.html";
            }
        });

        return;
    }
    if (isMissingCustomerInfo(currentUser)) {
    Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin nhận hàng",
        html: `
            <p>Bạn cần cập nhật đầy đủ thông tin trước khi đặt hàng:</p>
            <ul style="text-align:left; display:inline-block;">
                <li>Họ tên người nhận</li>
                <li>Số điện thoại</li>
                <li>Địa chỉ giao hàng</li>
            </ul>
        `,
        confirmButtonText: "Cập nhật tài khoản",
        showCancelButton: true,
        cancelButtonText: "Ở lại giỏ hàng",
        confirmButtonColor: "#c9a45c",
        cancelButtonColor: "#1b1b1b"
    }).then(result => {
        if (result.isConfirmed) {
            window.location.href = "../TaiKhoan/taikhoan.html";
        }
    });

    return;
}

    const selectedItems = getSelectedCartItems();

    if (selectedItems.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Chưa chọn sản phẩm",
            text: "Vui lòng tick chọn ít nhất một sản phẩm để thanh toán.",
            confirmButtonColor: "#c9a45c"
        });

        return;
    }

    const subtotal = selectedItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const discount = subtotal >= 1500000 ? 100000 : 0;
    const total = subtotal - discount;

    Swal.fire({
        title: "Chọn phương thức thanh toán",
        html: `
            <div class="checkout-popup">
                <p><b>Người nhận:</b> ${currentUser.name || "Chưa cập nhật"}</p>
                <p><b>Email:</b> ${currentUser.email || "Chưa cập nhật"}</p>
                <p><b>SĐT:</b> ${currentUser.phone || "Chưa cập nhật"}</p>
                <p><b>Địa chỉ:</b> ${currentUser.address || "Chưa cập nhật"}</p>

                <hr>

                <p><b>Số sản phẩm:</b> ${selectedItems.length}</p>
                <p><b>Tổng thanh toán:</b> ${formatMoney(total)}</p>

                <select id="paymentMethod" class="swal2-input">
                    <option value="">-- Chọn phương thức --</option>
                    <option value="COD">Thanh toán khi nhận hàng</option>
                    <option value="BANK">Chuyển khoản ngân hàng</option>
                    <option value="MOMO">Ví điện tử MoMo</option>
                </select>
            </div>
        `,
        confirmButtonText: "Xác nhận đặt hàng",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonColor: "#c9a45c",
        cancelButtonColor: "#1b1b1b",
        preConfirm: () => {
            const method = document.getElementById("paymentMethod").value;

            if (!method) {
                Swal.showValidationMessage("Vui lòng chọn phương thức thanh toán.");
                return false;
            }

            return method;
        }
    }).then(result => {
        if (!result.isConfirmed) return;

        const paymentMethod = result.value;
let paymentStatus = "";
let orderStatus = "";

if (paymentMethod === "COD") {
    paymentStatus = "Chưa thanh toán";
    orderStatus = "Đang xử lý";
} else {
    paymentStatus = "Chờ thanh toán";
    orderStatus = "Chờ xác nhận thanh toán";
}
        const order = {
            id: generateOrderId(),
            userEmail: currentUser.email,
            customerName: currentUser.name || "Chưa cập nhật",
            phone: currentUser.phone || "Chưa cập nhật",
            address: currentUser.address || "Chưa cập nhật",
            items: selectedItems,
            subtotal: subtotal,
            discount: discount,
            total: total,
            paymentMethod: paymentMethod,
            paymentStatus: paymentStatus,
status: orderStatus,
            status: "Đang xử lý",
            createdAt: new Date().toLocaleString("vi-VN")
        };

        const orders = JSON.parse(localStorage.getItem("bathora_orders")) || [];
        orders.push(order);
        localStorage.setItem("bathora_orders", JSON.stringify(orders));

        let cart = getCart();

        cart = cart.filter(item => item.selected === false);

        saveCart(cart);
        renderCart();

       let paymentGuide = "";

if (paymentMethod === "BANK") {
    paymentGuide = `
        <hr>
        <p><b>Thông tin chuyển khoản:</b></p>
        <p>Ngân hàng: MB Bank</p>
        <p>Số tài khoản: 0123456789</p>
        <p>Chủ tài khoản: BATHORA DRESS</p>
        <p>Nội dung CK: ${order.id}</p>
        <p style="font-size:13px;color:#777">
            Sau khi chuyển khoản, đơn hàng sẽ được xác nhận bởi nhân viên BATHORA.
        </p>
    `;
}

if (paymentMethod === "MOMO") {
    paymentGuide = `
        <hr>
        <p><b>Thanh toán MoMo:</b></p>
        <p>Số ví: 0987654321</p>
        <p>Chủ ví: BATHORA DRESS</p>
        <p>Nội dung: ${order.id}</p>
        <p style="font-size:13px;color:#777">
            Sau khi thanh toán MoMo, đơn hàng sẽ chuyển sang trạng thái xác nhận.
        </p>
    `;
}

let popupTitle = "";
let popupIntro = "";

if (paymentMethod === "COD") {
    popupTitle = "Đặt hàng thành công";
    popupIntro = "Đơn hàng của bạn đã được ghi nhận và đang chờ xử lý.";
} else {
    popupTitle = "Tạo đơn hàng thành công";
    popupIntro = "Vui lòng hoàn tất thanh toán để đơn hàng được xác nhận.";
}

Swal.fire({
    icon: "success",
    title: popupTitle,
    html: `
        <p>${popupIntro}</p>
        <p>Mã đơn hàng của bạn:</p>
        <h3 style="color:#c9a45c">${order.id}</h3>
        <p>Trạng thái đơn: <b>${orderStatus}</b></p>
        <p>Thanh toán: <b>${paymentStatus}</b></p>
        ${paymentGuide}
    `,
    confirmButtonColor: "#c9a45c"
});
    });
}

/* GÁN SỰ KIỆN CHO NÚT ĐẶT HÀNG */
const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckout);
}

/* MOBILE MENU */
const menuToggle = document.getElementById("menuToggle");
const menu = document.querySelector(".menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
}

/* DROPDOWN MOBILE: SALE + SẢN PHẨM */
document.querySelectorAll(".mobile-dropdown-toggle").forEach(item => {
    item.addEventListener("click", function (e) {
        if (window.innerWidth <= 991) {
            e.preventDefault();
            e.stopPropagation();

            const parent = this.closest(".mobile-dropdown");
            if (parent) {
                parent.classList.toggle("open");
            }
        }
    });
});

/* Bấm menu thường thì đóng menu */
document.querySelectorAll(".menu > ul > li:not(.mobile-dropdown) > a").forEach(link => {
    link.addEventListener("click", function () {
        if (window.innerWidth <= 991 && menu) {
            menu.classList.remove("active");
        }
    });
});