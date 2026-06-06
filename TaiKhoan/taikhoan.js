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
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const badge = document.getElementById("wishlist-badge");

    if (!badge) return;

    badge.innerText = favs.length;
    badge.style.display = favs.length === 0 ? "none" : "flex";
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const badge = document.getElementById("cart-badge");

    if (!badge) return;

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    badge.innerText = total;
    badge.style.display = total === 0 ? "none" : "flex";
}

/* TẠO DỮ LIỆU DEMO CHO TÀI KHOẢN */
function buildDashboardData(user) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const totalOrders = user.totalOrders ?? 4;
    const completedOrders = user.completedOrders ?? 3;
    const pendingOrders = user.pendingOrders ?? 1;
    const shippingOrders = user.shippingOrders ?? 0;
    const returnOrders = user.returnOrders ?? 0;

    const points = user.points ?? 1250;
    const memberLevel = getMemberLevel(points);

    return {
        totalOrders,
        completedOrders,
        pendingOrders,
        shippingOrders,
        returnOrders,
        points,
        memberLevel,
        favoriteCount: favorites.length,
        joinDate: user.joinDate || "06/06/2026",
        address: user.address || "Bạn chưa cập nhật địa chỉ giao hàng."
    };
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
});