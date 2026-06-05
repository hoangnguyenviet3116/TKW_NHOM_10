/*POP-UP*/
window.addEventListener('load', function() {
    const popup = document.getElementById('promoPopup');
    const closeBtn = document.querySelector('.close-popup');

    // Tự động hiện sau 2 giây
    if (popup) {
        setTimeout(() => {
            popup.classList.add('active');
        }, 2000);
    }

    // Đóng khi click vào nút X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });
    }

    // Đóng khi click ra ngoài vùng trắng
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
});


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


/*DANH MỤC SẢN PHẨM*/
var swiper = new Swiper(".categorySwiper", {
    slidesPerView: 1,      /* Mobile hiện 1 cái */
    spaceBetween: 20,     /* Khoảng cách giữa các thẻ */
    loop: true,           /* Lặp vô hạn */
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
    slidesPerView:4,
    spaceBetween:25,
    loop:true, // tạo vòng lặp khi kéo hết ảnh
    grabCursor:false,

    pagination:{
        el:".swiper-pagination",
        clickable:true,
    },

    breakpoints:{
        0:{
            slidesPerView:1.2
        },

        576:{
            slidesPerView:2
        },

        768:{
            slidesPerView:3
        },

        1200:{
            slidesPerView:4
        }
    }
});


// =======================
// CLICK TRÁI TIM & CẬP NHẬT SỐ LƯỢNG
// =======================
const hearts = document.querySelectorAll(".heart-btn");

hearts.forEach(icon => {
  icon.addEventListener("click", function () {

    const card = this.closest(".product-card");
    if (!card) return;

    const product = {
      id: card.dataset.id,
      name: card.dataset.name,
      price: card.dataset.price,
      img: card.dataset.img
    };

    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const index = favs.findIndex(item => item.id === product.id);

    if (index === -1) {
      favs.push(product);
     this.classList.add("active");
    } else {
      favs.splice(index, 1);
     this.classList.remove("active");
    }

    // Lưu danh sách mới vào LocalStorage
    localStorage.setItem("favorites", JSON.stringify(favs));

    // Gọi hàm cập nhật lại số lượng hiển thị trên menu ngay lập tức
    updateHeartIcons();
  });
});


// =======================
// HÀM CẬP NHẬT TRẠNG THÁI TIM VÀ SỐ LƯỢNG BADGE
// =======================
function updateHeartIcons() {
    // 1. Lấy danh sách yêu thích từ localStorage
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

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
    updateHeartIcons();
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