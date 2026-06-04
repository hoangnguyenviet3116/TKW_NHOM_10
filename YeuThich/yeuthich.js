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
    const content = document.getElementById("wishlist-content");
    const count = document.getElementById("wishlist-count");
    const emptyMsg = document.getElementById("empty-message");

    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    // Cập nhật số lượng ở chữ tiêu đề trang
    if (count) {
        count.innerText = favs.length;
    }

    // Gọi hàm này để ẩn số lượng trên icon menu ngay khi tải trang nếu bằng 0
    updateMenuWishlistBadge(favs.length);

    if (favs.length === 0) {
        if (emptyMsg) emptyMsg.classList.remove("d-none");
        if (content) content.innerHTML = ""; // Xóa sạch bảng nếu trống
        return;
    }

    if (emptyMsg) {
        emptyMsg.classList.add("d-none");
    }

    if (content) {
        content.innerHTML = favs.map(item => `
            <tr>
                <td><img src="${item.img}" width="80"></td>
                <td class="text-start">${item.name}</td>
                <td class="text-danger fw-bold">${item.price}</td>
                <td>
                    <button onclick="removeFav('${item.id}')" class="btn btn-danger btn-sm">
                        Xóa
                    </button>
                </td>
            </tr>
        `).join("");
    }
});

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