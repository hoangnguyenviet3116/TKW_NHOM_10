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

// ===========================================
// HÀM CẬP NHẬT VÀ ẨN/HIỆN SỐ LƯỢNG TRÊN MENU 
// ===========================================
function updateMenuWishlistBadge(totalItems) {
    const wishlistBadge = document.getElementById("wishlist-badge");
    if (wishlistBadge) {
        wishlistBadge.innerText = totalItems;
        
        // Sử dụng style trực tiếp để tránh xung đột thuộc tính display của Bootstrap
        if (totalItems === 0) {
            wishlistBadge.style.display = "none";
        } else {
            wishlistBadge.style.display = "flex";
        }
    }
}

/*thêm, xóa yêu thích*/
document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("wishlist-grid");
    const count = document.getElementById("wishlist-count");
    const emptyMsg = document.getElementById("empty-message");

    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    // Cập nhật số lượng ở tiêu đề trang
    if (count) {
        count.innerText = favs.length;
    }

    // Cập nhật badge ở menu
    updateMenuWishlistBadge(favs.length);

    // Kiểm tra nếu danh sách trống
    if (favs.length === 0) {
        if (emptyMsg) emptyMsg.classList.remove("d-none");
        if (gridContainer) gridContainer.innerHTML = ""; 
        return;
    }

    if (emptyMsg) {
        emptyMsg.classList.add("d-none");
    }

    // Đổ dữ liệu dạng Card Thời trang (Grid)
    if (gridContainer) {
        gridContainer.innerHTML = favs.map(item => `
            <div class="col-6 col-md-4 col-lg-3 animate-card">
                <div class="wishlist-card">
                    
                    <!-- Nút xóa tinh tế ở góc ảnh -->
                    <button onclick="removeFav('${item.id}')" class="btn-remove-fav" title="Xóa khỏi danh sách">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    
                    <!-- Khung ảnh sản phẩm -->
                    <div class="wishlist-img-box">
                        <img src="${item.img}" class="wishlist-img" alt="${item.name}">
                    </div>
                    
                    <!-- Thông tin sản phẩm -->
                    <div class="wishlist-info">
                        <h4 class="wishlist-item-name">${item.name}</h4>
                        <p class="wishlist-item-price">${item.price}</p>
                        
                        <!-- Nút mua nhanh/thêm vào giỏ -->
                        <button onclick="addToCartQuick('${item.id}')" class="btn-add-cart-quick">
                            Thêm Vào Giỏ
                        </button>
                    </div>
                </div>
            </div>
        `).join("");
    }
});

function addToCartQuick(id) {
    // 1. Tạo ra một khối div thông báo mới
    const toast = document.createElement("div");
    toast.className = "toast-custom";
    toast.innerText = "Đã thêm sản phẩm vào giỏ hàng thành công!";
    
    // 2. Đưa thông báo vào trong trang web
    document.body.appendChild(toast);
    
    // 3. Tự động xóa thông báo sau 3 giây (3000ms) kèm hiệu ứng mờ dần
    setTimeout(() => {
        toast.style.transition = "opacity 0.5s ease";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function removeFav(id) {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    favs = favs.filter(item => item.id !== id);

    localStorage.setItem("favorites", JSON.stringify(favs));

    // Cập nhật lại số lượng badge menu về 0 trước khi tải lại trang
    updateMenuWishlistBadge(favs.length);

    location.reload();
}

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