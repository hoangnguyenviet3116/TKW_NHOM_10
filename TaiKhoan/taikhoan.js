/* MENU ẨN/HIỆN GIỐNG TRANG CHỦ */
let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!header) return;

    if (scrollTop <= 50) {
        header.classList.remove("header-hidden");
    } else if (scrollTop > lastScrollTop) {
        header.classList.add("header-hidden");
    } else {
        header.classList.remove("header-hidden");
    }

    lastScrollTop = scrollTop;
});

/* LẤY NGƯỜI DÙNG HIỆN TẠI */
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("bathora_current_user"));
}


/* CẬP NHẬT BADGE */
function updateWishlistBadge() {
    const favs = getFavorites();
    const badge = document.getElementById("wishlist-badge");

    if (!badge) return;

    badge.innerText = favs.length;
    badge.style.display = favs.length === 0 ? "none" : "flex";
}

function getCartKey() {
    const user = getCurrentUser();

    if (!user) {
        return null;
    }

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

/* TẠO DỮ LIỆU DEMO CHO TÀI KHOẢN */
function getUserOrders(user) {
    const orders = JSON.parse(localStorage.getItem("bathora_orders")) || [];

    return orders.filter(order => order.userEmail === user.email);
}

function buildDashboardData(user) {
    const favorites = getFavorites();
    const orders = getUserOrders(user);

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === "Đang xử lý").length;
    const shippingOrders = orders.filter(order => order.status === "Đang giao").length;
    const completedOrders = orders.filter(order => order.status === "Hoàn thành").length;
    const returnOrders = orders.filter(order => order.status === "Đổi trả").length;

    const totalSpent = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

    // Quy ước demo: 10.000đ = 1 điểm
    const points = Math.floor(totalSpent / 10000);

    return {
        totalOrders,
        completedOrders,
        pendingOrders,
        shippingOrders,
        returnOrders,
        points,
        memberLevel: getMemberLevel(points),
        favoriteCount: favorites.length,
        joinDate: user.joinDate || "Chưa cập nhật",
        address: user.address || "Bạn chưa cập nhật địa chỉ giao hàng."
    };
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

function getMemberLevel(points) {
    if (points >= 5000) return "Kim cương";
    if (points >= 2000) return "Vàng";
    return "Bạc";
}

/* HIỂN THỊ DASHBOARD */
function renderAccountDashboard() {
    const user = getCurrentUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const data = buildDashboardData(user);

    document.getElementById("userName").innerText = user.name;
    document.getElementById("userEmail").innerText = user.email;

    document.getElementById("profileName").innerText = user.name;
    document.getElementById("profileEmail").innerText = user.email;
    document.getElementById("profilePhone").innerText = user.phone || "Chưa cập nhật";
    document.getElementById("joinDate").innerText = data.joinDate;

    document.getElementById("totalOrders").innerText = data.totalOrders;
    document.getElementById("userPoints").innerText = data.points;
    document.getElementById("favoriteCount").innerText = data.favoriteCount;
    document.getElementById("memberLevel").innerText = data.memberLevel;

    document.getElementById("pendingOrders").innerText = data.pendingOrders;
    document.getElementById("shippingOrders").innerText = data.shippingOrders;
    document.getElementById("completedOrders").innerText = data.completedOrders;
    document.getElementById("returnOrders").innerText = data.returnOrders;

    document.getElementById("shippingAddress").innerText = data.address;

    renderMemberProgress(data.points);
    renderOrderHistory(user);
}
function renderOrderHistory(user) {
    const orderHistoryList = document.getElementById("orderHistoryList");

    if (!orderHistoryList) return;

    const orders = getUserOrders(user);

    if (orders.length === 0) {
        orderHistoryList.innerHTML = `
            <div class="order-empty">
                Bạn chưa có đơn hàng nào. Hãy đặt hàng để xem lịch sử mua sắm tại đây.
            </div>
        `;
        return;
    }

    orderHistoryList.innerHTML = orders.reverse().map(order => `
        <div class="order-history-item">
            <div class="order-history-top">
                <h4>Mã đơn: ${order.id}</h4>
                <span>${order.status}</span>
            </div>

            <p><b>Ngày đặt:</b> ${order.createdAt}</p>
            <p><b>Số sản phẩm:</b> ${order.items.length}</p>
            <p><b>Thanh toán:</b> ${order.paymentMethod} - ${order.paymentStatus}</p>
            <p><b>Tổng tiền:</b> ${Number(order.total).toLocaleString("vi-VN")}đ</p>
        </div>
    `).join("");
}

/* TIẾN TRÌNH HẠNG THÀNH VIÊN */
function renderMemberProgress(points) {
    const nextTarget = points >= 2000 ? 5000 : 2000;
    const percent = Math.min((points / nextTarget) * 100, 100);
    const remain = Math.max(nextTarget - points, 0);

    document.getElementById("memberProgressBar").style.width = percent + "%";
    document.getElementById("progressPercent").innerText = Math.round(percent) + "%";

    if (points >= 5000) {
        document.getElementById("levelMessage").innerText =
            "Bạn đã đạt hạng Kim cương - hạng thành viên cao nhất của BATHORA.";
    } else if (points >= 2000) {
        document.getElementById("levelMessage").innerText =
            "Bạn còn " + remain + " điểm để đạt hạng Kim cương.";
    } else {
        document.getElementById("levelMessage").innerText =
            "Bạn còn " + remain + " điểm để đạt hạng Vàng.";
    }
}
function getUsers() {
    return JSON.parse(localStorage.getItem("bathora_users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("bathora_users", JSON.stringify(users));
}

function updateCurrentUser(updatedUser) {
    sessionStorage.setItem("bathora_current_user", JSON.stringify(updatedUser));

    let users = getUsers();

    users = users.map(user => {
        if (user.email === updatedUser.email) {
            return updatedUser;
        }

        return user;
    });

    saveUsers(users);
}

function openEditProfilePopup() {
    const user = getCurrentUser();

    if (!user) return;

    Swal.fire({
        title: "Cập nhật thông tin nhận hàng",
        html: `
            <input id="editName" class="swal2-input" placeholder="Họ tên người nhận" value="${user.name || ""}">
            <input id="editPhone" class="swal2-input" placeholder="Số điện thoại 10 chữ số" value="${user.phone || ""}">
            <textarea id="editAddress" class="swal2-textarea" placeholder="Địa chỉ giao hàng">${user.address || ""}</textarea>
        `,
        confirmButtonText: "Lưu thông tin",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonColor: "#c9a45c",
        cancelButtonColor: "#1b1b1b",
        preConfirm: () => {
            const name = document.getElementById("editName").value.trim();
            const phone = document.getElementById("editPhone").value.trim();
            const address = document.getElementById("editAddress").value.trim();

            if (name.length < 2) {
                Swal.showValidationMessage("Họ tên phải có ít nhất 2 ký tự.");
                return false;
            }

            if (!/^[0-9]{10}$/.test(phone)) {
                Swal.showValidationMessage("Số điện thoại phải gồm đúng 10 chữ số.");
                return false;
            }

            if (address.length < 10) {
                Swal.showValidationMessage("Địa chỉ giao hàng cần nhập cụ thể hơn.");
                return false;
            }

            return { name, phone, address };
        }
    }).then(result => {
        if (!result.isConfirmed) return;

        const updatedUser = {
            ...user,
            name: result.value.name,
            phone: result.value.phone,
            address: result.value.address
        };

        updateCurrentUser(updatedUser);

        Swal.fire({
            icon: "success",
            title: "Cập nhật thành công",
            text: "Thông tin nhận hàng đã được lưu.",
            confirmButtonColor: "#c9a45c"
        });

        renderAccountDashboard();
    });
}

/* ĐĂNG XUẤT */
document.getElementById("logoutBtn").addEventListener("click", function () {
    Swal.fire({
        icon: "question",
        title: "Bạn muốn đăng xuất?",
        showCancelButton: true,
        confirmButtonText: "Đăng xuất",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#1b1b1b",
        cancelButtonColor: "#c9a45c"
    }).then((result) => {
       if (result.isConfirmed) {
    sessionStorage.removeItem("bathora_current_user");

    const cartBadge = document.getElementById("cart-badge");

    if (cartBadge) {
        cartBadge.innerText = 0;
        cartBadge.style.display = "none";
    }

    window.location.href = "login.html";
}
    });
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
    renderAccountDashboard();

    const editProfileBtn = document.getElementById("editProfileBtn");

    if (editProfileBtn) {
        editProfileBtn.addEventListener("click", openEditProfilePopup);
    }
});
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