/*POP-UP*/
window.addEventListener('load', function() {
    const popup = document.getElementById('promoPopup');
    const closeBtn = document.querySelector('.close-popup');

    // Tự động hiện sau 2 giây
    setTimeout(() => {
        popup.classList.add('active');
    }, 2000);

    // Đóng khi click vào nút X
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });

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
        1024: { slidesPerView: 4 }, /* Laptop hiện 4 cái như hình của bạn */
    },
});




/*SẢN PHẨM NỔI BẬT*/
const swiperFeatured = new Swiper('.featuredSwiper', {
    // Cấu hình cơ bản
    slidesPerView: 5,           // Hiển thị đúng 5 ảnh trên màn hình máy tính
    slidesPerGroup: 5,          // Khi trượt sẽ nhảy qua cả cụm 5 ảnh
    spaceBetween: 20,           // Khoảng cách giữa các ảnh
    grabCursor: true,           // Hiện bàn tay để kéo bằng chuột
    loop: true,                 // Lặp lại vô hạn
    speed: 800,                 // Tốc độ trượt (800ms cho mượt)

    // Tự động chạy (nếu muốn)
    autoplay: {
        delay: 5000,            // 5 giây đổi một lần
        disableOnInteraction: false,
    },

    // Chấm phân trang
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // Cấu hình linh hoạt cho các màn hình khác
    breakpoints: {
        320: {
            slidesPerView: 2,   // Điện thoại hiện 2 ảnh
            slidesPerGroup: 2,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 3,   // Máy tính bảng hiện 3 ảnh
            slidesPerGroup: 3,
            spaceBetween: 15
        },
        1024: {
            slidesPerView: 5,   // Laptop/PC hiện đúng 5 ảnh
            slidesPerGroup: 5,
            spaceBetween: 20
        }
    }
});


// =======================
// CLICK TRÁI TIM
// =======================
const hearts = document.querySelectorAll(".heart-btn");

hearts.forEach(icon => {
  icon.addEventListener("click", function () {

    const card = this.closest(".product-card");

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
      this.classList.replace("fa-regular", "fa-solid");
      showToast("❤️ Đã thêm vào yêu thích");
    } else {
      favs.splice(index, 1);
      this.classList.replace("fa-solid", "fa-regular");
      showToast("💔 Đã bỏ khỏi yêu thích");
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
  });
});


// =======================
// LOAD TRẠNG THÁI TIM
// =======================
function updateHeartIcons() {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    document.querySelectorAll(".product-card").forEach(card => {
        const id = card.dataset.id;
        const heart = card.querySelector(".heart-btn");

        if (!heart) return;

        if (favs.find(item => item.id === id)) {
            heart.classList.replace("fa-regular", "fa-solid");
        } else {
            heart.classList.replace("fa-solid", "fa-regular");
        }
    });
}


// =======================
// TOAST
// =======================
function showToast(message) {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.className = "toast-custom";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}


// =======================
// LOAD KHI VÀO TRANG
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

