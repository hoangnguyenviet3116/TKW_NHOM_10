/* MENU GIỐNG TRANG CHỦ */
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

/* DỮ LIỆU TÀI KHOẢN */
function getUsers() {
    let users = JSON.parse(localStorage.getItem("bathora_users")) || [];

    const hasDemo = users.some(user => user.email === "demo@bathora.vn");

    if (!hasDemo) {
        users.push({
            name: "Khách hàng Bathora",
            email: "demo@bathora.vn",
            phone: "0123456789",
            password: "123456",
            securityCode: "111111",
            points: 1250,
            memberLevel: "Bạc",
            totalOrders: 4,
            completedOrders: 3,
            pendingOrders: 1,
            shippingOrders: 0,
            joinDate: "06/06/2026"
        });

        localStorage.setItem("bathora_users", JSON.stringify(users));
    }

    return users;
}

function saveUsers(users) {
    localStorage.setItem("bathora_users", JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("bathora_current_user"));
}


function setCurrentUser(user) {
    sessionStorage.setItem("bathora_current_user", JSON.stringify(user));
}

function clearCurrentUser() {
    sessionStorage.removeItem("bathora_current_user");
}

/* BADGE */
function updateWishlistBadge() {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
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
/* TAB */
const tabButtons = document.querySelectorAll(".tab-btn");
const forms = document.querySelectorAll(".account-form");

tabButtons.forEach(button => {
    button.addEventListener("click", function () {
        const tab = this.dataset.tab;

        tabButtons.forEach(btn => btn.classList.remove("active"));
        forms.forEach(form => form.classList.remove("active"));

        this.classList.add("active");
        document.getElementById(tab + "Form").classList.add("active");

        showMessage("", "");
        clearErrors();
    });
});

/* HIỆN/ẨN MẬT KHẨU */
document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", function () {
        const input = document.getElementById(this.dataset.target);

        if (!input) return;

        input.type = input.type === "password" ? "text" : "password";
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });
});

/* VALIDATION */
function setError(inputId, message) {
    const input = document.getElementById(inputId);
    const small = input.closest(".form-group").querySelector("small");

    small.innerText = message;
    input.style.borderColor = "#d0021b";
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const small = input.closest(".form-group").querySelector("small");

    small.innerText = "";
    input.style.borderColor = "#ddd";
}

function clearErrors() {
    document.querySelectorAll(".form-group input").forEach(input => {
        input.style.borderColor = "#ddd";
    });

    document.querySelectorAll(".form-group small").forEach(small => {
        small.innerText = "";
    });
}

function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(message, type) {
    const box = document.getElementById("authMessage");

    if (!box) return;

    box.innerText = message;
    box.className = "auth-message";

    if (type) {
        box.classList.add(type);
    }
}

/* ĐĂNG NHẬP */
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const rememberAccount = document.getElementById("rememberAccount").checked;

    let isValid = true;

    if (email === "") {
        setError("loginEmail", "Vui lòng nhập email.");
        isValid = false;
    } else if (!isEmail(email)) {
        setError("loginEmail", "Email không hợp lệ.");
        isValid = false;
    }

    if (password === "") {
        setError("loginPassword", "Vui lòng nhập mật khẩu.");
        isValid = false;
    }

    if (!isValid) return;

    const users = getUsers();

    const user = users.find(item =>
        item.email === email &&
        item.password === password
    );

    if (!user) {
        showMessage("Email hoặc mật khẩu không đúng.", "error");
        return;
    }

    /* TÀI KHOẢN CŨ CHƯA CÓ MÃ BẢO MẬT */
    if (!user.securityCode) {
        Swal.fire({
            icon: "warning",
            title: "Cần cập nhật mã bảo mật",
            html: `
                <p style="font-size:14px">
                    Tài khoản này được tạo trước khi có chức năng mã bảo mật.
                    Vui lòng tạo mã bảo mật gồm 6 chữ số.
                </p>
            `,
            input: "password",
            inputLabel: "Mã bảo mật",
            inputPlaceholder: "Nhập 6 chữ số",
            confirmButtonText: "Cập nhật",
            confirmButtonColor: "#c9a45c",
            inputValidator: (value) => {
                if (!/^[0-9]{6}$/.test(value)) {
                    return "Mã bảo mật phải gồm đúng 6 chữ số.";
                }
            }
        }).then(result => {
            if (!result.isConfirmed) return;

            user.securityCode = result.value;
            saveUsers(users);

            Swal.fire({
                icon: "success",
                title: "Cập nhật thành công",
                text: "Bây giờ bạn có thể đăng nhập lại.",
                confirmButtonColor: "#c9a45c"
            });
        });

        return;
    }

    if (rememberAccount) {
    saveRememberedAccount(email);
}

    setCurrentUser(user);

    Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công",
        text: "Chào mừng bạn quay trở lại BATHORA.",
        confirmButtonColor: "#c9a45c"
    }).then(() => {
        window.location.href = "taikhoan.html";
    });
});

/* ĐĂNG KÝ */
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const phone = document.getElementById("registerPhone").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const confirmPassword = document.getElementById("confirmRegisterPassword").value.trim();
    const securityCode = document.getElementById("securityCode").value.trim();
const confirmSecurityCode = document.getElementById("confirmSecurityCode").value.trim();

    let isValid = true;

    if (name.length < 2) {
        setError("registerName", "Họ tên phải có ít nhất 2 ký tự.");
        isValid = false;
    }

    if (email === "") {
        setError("registerEmail", "Vui lòng nhập email.");
        isValid = false;
    } else if (!isEmail(email)) {
        setError("registerEmail", "Email không hợp lệ.");
        isValid = false;
    }

    if (phone === "") {
        setError("registerPhone", "Vui lòng nhập số điện thoại.");
        isValid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
        setError("registerPhone", "Số điện thoại phải có 10 chữ số.");
        isValid = false;
    }

    if (!isStrongPassword(password)) {

        setError(
            "registerPassword",
            "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, số, ký tự đặc biệt và không được bắt đầu bằng số."
        );

        isValid = false;
    }
    if (confirmPassword !== password) {
    setError("confirmRegisterPassword", "Mật khẩu nhập lại không khớp.");
    isValid = false;
}
    if (!/^[0-9]{6}$/.test(securityCode)) {
    setError("securityCode", "Mã bảo mật phải gồm đúng 6 chữ số.");
    isValid = false;
}

if (confirmSecurityCode !== securityCode) {
    setError("confirmSecurityCode", "Mã bảo mật xác nhận không khớp.");
    isValid = false;
}

    if (!isValid) return;

    const users = getUsers();
    const isExist = users.some(user => user.email === email);

    if (isExist) {
        showMessage("Email này đã được đăng ký.", "error");
        return;
    }


    const newUser = {
        name: name,
        email: email,
        phone: phone,
        address: "",
        password: password,
        securityCode: securityCode,
        points: 0,
        memberLevel: "Bạc",
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        shippingOrders: 0,
        joinDate: new Date().toLocaleDateString("vi-VN")
    };

    users.push(newUser);
    saveUsers(users);

   Swal.fire({
    icon: "success",
    title: "Đăng ký thành công",
    text: "Tài khoản đã được tạo. Vui lòng đăng nhập để tiếp tục.",
    confirmButtonColor: "#c9a45c"
}).then(() => {
    document.getElementById("registerForm").reset();
    document.querySelector('[data-tab="login"]').click();
});
});
/* QUÊN MẬT KHẨU */
document.getElementById("forgotForm").addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById("forgotEmail").value.trim();
    const securityCode = document.getElementById("forgotSecurityCode").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmNewPassword = document.getElementById("confirmNewPassword").value.trim();

    let isValid = true;

    if (email === "") {
        setError("forgotEmail", "Vui lòng nhập email.");
        isValid = false;
    } else if (!isEmail(email)) {
        setError("forgotEmail", "Email không hợp lệ.");
        isValid = false;
    }

    if (!/^[0-9]{6}$/.test(securityCode)) {
        setError("forgotSecurityCode", "Mã bảo mật phải gồm đúng 6 chữ số.");
        isValid = false;
    }

    if (!isStrongPassword(newPassword)) {
        setError(
            "newPassword",
            "Mật khẩu mới phải có ít nhất 8 ký tự, gồm chữ hoa, số, ký tự đặc biệt và không được bắt đầu bằng số."
        );
        isValid = false;
    }

    if (confirmNewPassword !== newPassword) {
        setError("confirmNewPassword", "Mật khẩu nhập lại không khớp.");
        isValid = false;
    }

    if (!isValid) return;

    const users = getUsers();
    const user = users.find(item => item.email === email);

    if (!user) {
        showMessage("Không tìm thấy tài khoản với email này.", "error");
        return;
    }

    if (user.securityCode !== securityCode) {
        setError("forgotSecurityCode", "Mã bảo mật không đúng.");
        return;
    }

    user.password = newPassword;
    saveUsers(users);

    Swal.fire({
        icon: "success",
        title: "Đổi mật khẩu thành công",
        text: "Vui lòng đăng nhập lại bằng mật khẩu mới.",
        confirmButtonColor: "#c9a45c"
    }).then(() => {
        document.getElementById("forgotForm").reset();
        document.querySelector('[data-tab="login"]').click();
    });
});

function isStrongPassword(password) {

    return /^(?![0-9])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=])[A-Za-z0-9!@#$%^&*()_+\-=]{8,}$/
        .test(password);

}

/* TRẠNG THÁI ĐĂNG NHẬP */
function renderUserState() {
    const currentUser = getCurrentUser();
    const authPanel = document.getElementById("authPanel");
    const userPanel = document.getElementById("userPanel");
    const currentUserName = document.getElementById("currentUserName");

    if (currentUser) {
        authPanel.classList.add("d-none");
        userPanel.classList.remove("d-none");
        currentUserName.innerText = currentUser.name;
    } else {
        authPanel.classList.remove("d-none");
        userPanel.classList.add("d-none");
    }
}

document.getElementById("logoutBtn").addEventListener("click", function () {
    clearCurrentUser();
    renderUserState();
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
    const currentUser = getCurrentUser();

if(currentUser){
    window.location.href = "taikhoan.html";
    return;
}
    getUsers();
    updateWishlistBadge();
    updateCartBadge();
    renderUserState();
    initSavedAccountDropdown();
});


document.getElementById("googleLoginBtn").addEventListener("click", function () {
    const googleUser = {
        name: "Khách hàng Google",
        email: "google@bathora.vn",
        phone: "Chưa cập nhật",
        password: "Google@123",
        securityCode: "111111",
        points: 0,
        memberLevel: "Bạc",
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        shippingOrders: 0,
        joinDate: new Date().toLocaleDateString("vi-VN")
    };

    let users = getUsers();
    const existed = users.some(user => user.email === googleUser.email);

    if (!existed) {
        users.push(googleUser);
        saveUsers(users);
    }

    setCurrentUser(googleUser);

    Swal.fire({
        icon: "success",
        title: "Đăng nhập Google thành công",
        text: "Đây là chức năng mô phỏng đăng nhập Google cho bài thiết kế web.",
        confirmButtonColor: "#c9a45c"
    }).then(() => {
        window.location.href = "taikhoan.html";
    });
});
function getRememberedAccounts() {
    return JSON.parse(localStorage.getItem("bathora_saved_accounts")) || [];
}

function saveRememberedAccount(email) {
    let accounts = getRememberedAccounts();

    if (!accounts.includes(email)) {
        accounts.push(email);
    }

    localStorage.setItem("bathora_saved_accounts", JSON.stringify(accounts));
}

function renderSavedAccountList() {
    const listBox = document.getElementById("savedAccountList");
    const accounts = getRememberedAccounts();

    if (!listBox) return;

    if (accounts.length === 0) {
        listBox.classList.add("d-none");
        listBox.innerHTML = "";
        return;
    }

    listBox.innerHTML = accounts.map(email => `
        <div class="saved-account-item" data-email="${email}">
            <i class="fa-regular fa-user"></i> ${email}
        </div>
    `).join("");

    listBox.classList.remove("d-none");
}

function initSavedAccountDropdown() {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const listBox = document.getElementById("savedAccountList");

    if (!emailInput || !passwordInput || !listBox) return;

    emailInput.addEventListener("click", function () {
        renderSavedAccountList();
    });

    listBox.addEventListener("click", function (e) {
        const item = e.target.closest(".saved-account-item");

        if (!item) return;

        const selectedEmail = item.dataset.email;
        const users = getUsers();
        const user = users.find(user => user.email === selectedEmail);

        if (!user) return;

        Swal.fire({
            title: "Xác thực mã bảo mật",
            input: "password",
            inputLabel: "Nhập mã bảo mật để tự động điền mật khẩu",
            inputPlaceholder: "Nhập mã bảo mật 6 số",
            confirmButtonText: "Xác nhận",
            showCancelButton: true,
            cancelButtonText: "Hủy",
            confirmButtonColor: "#c9a45c",
            cancelButtonColor: "#1b1b1b",
            inputValidator: (value) => {
                if (!value) return "Vui lòng nhập mã bảo mật.";
                if (value !== user.securityCode) return "Mã bảo mật không đúng.";
            }
        }).then(result => {
            if (result.isConfirmed) {
                emailInput.value = user.email;
                passwordInput.value = user.password;
                listBox.classList.add("d-none");
            }
        });
    });

    document.addEventListener("click", function (e) {
        if (!emailInput.contains(e.target) && !listBox.contains(e.target)) {
            listBox.classList.add("d-none");
        }
    });
}