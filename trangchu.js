/*POP-UP*/
window.addEventListener('load', function() {
    const popup = document.getElementById('promoPopup');
    const closeBtn = document.querySelector('.close-popup');

    // Kiểm tra xem trong phiên làm việc này (session) người dùng đã xem popup chưa
    if (popup && !sessionStorage.getItem('promo_popup_seen')) {
        // Tự động hiện sau 2 giây nếu chưa xem
        setTimeout(() => {
            popup.classList.add('active');
        }, 2000);
    }

    // Đóng khi click vào nút X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
            // Đánh dấu là đã xem trong phiên làm việc này
            sessionStorage.setItem('promo_popup_seen', 'true');
        });
    }
    // Đóng khi click ra ngoài vùng trắng
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            // Đánh dấu là đã xem trong phiên làm việc này
            sessionStorage.setItem('promo_popup_seen', 'true');
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


//DỮ LIỆU SẢN PHẨM NỔI BẬT
const featuredProducts = [
    {
        id:1,
        name:"Áo dạ cổ 2 ve dáng suông, túi ốp tròn",
        price:"1,150,000đ",
        image:"images/SPNB1.jpg"
    },

    {
        id:2,
        name:"Đầm xuân hè vắt tà cổ tùng đổ",
        price:"895,000đ",
        image:"images/SPNB2.jpg"
    },

    {
        id:3,
        name:"Áo len suông có khoá kéo",
        price:"855,000đ",
        image:"images/SPNB3.jpg"
    },

    {
        id:4,
        name:"Quần Resort 2 ly bung",
        price:"655,000đ",
        image:"images/SPNB4.jpg"
    },

    {
        id:5,
        name:"Áo dạ suông cổ tròn bèo 2 nắp túi",
        price:"1,385,000đ",
        image:"images/SPNB5.jpg"
    },

    {
        id:6,
        name:"Đầm Xuân Hè 2 dây nhún tầng dài",
        price:"875,000đ",
        image:"images/SPNB6.jpg"
    },

    {
        id:7,
        name:"Chân váy Resort dài nhún eo",
        price:"595,000đ",
        image:"images/SPNB7.jpg"
    },

    {
        id:8,
        name:"Đầm Xuân Hè cổ sen cách điệu, phối chân xếp ly chụm",
        price:"895,000đ",
        image:"images/SPNB8.jpg"
    },

    {
        id:9,
        name:"Đầm Xuân Hè tay bồng, xếp ly eo, dây nơ cổ",
        price:"855,000đ",
        image:"images/SPNB9.jpg"
    },

    {
        id:10,
        name:"Áo xuân hè cổ tròn phối bèo dọc",
        price:"755,000đ",
        image:"images/SPNB10.jpg"
    }

];
//giao diện
const productContainer = document.getElementById("featuredProducts");
featuredProducts.forEach(product => {
    productContainer.innerHTML += `
    <div class="swiper-slide">
        <div class="product-card"
            data-id="${product.id}"
            data-name="${product.name}"
            data-price="${product.price}"
            data-img="${product.image}">
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">
                    ${product.name}
                </h3>
                <div class="price-heart-wrapper">
                    <div class="product-price">
                        ${product.price}
                    </div>
                    <button class="wishlist-btn">
                        <i class="fa-regular fa-heart heart-btn"></i>
                    </button>
                </div>
                <div class="product-meta d-flex justify-content-between align-items-center">
                    <div class="rating">
                        <i class="fa-solid fa-star"></i> (0)
                    </div>
                    <div class="sold-count">
                        (0 đã bán)
                    </div>
                </div>
            </div>
        </div>
    </div>

    `;

});

/*DANH MỤC SẢN PHẨM*/
var swiper = new Swiper(".categorySwiper", {
    slidesPerView: 1,      
    spaceBetween: 20,     
    loop: true,         
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

/*VIDEO*/
/*
window.addEventListener("DOMContentLoaded", () => {

    const introOverlay = document.getElementById("introOverlay");
    const introVideo = document.getElementById("introVideo");

    if (!introOverlay || !introVideo) return;

    // Đã xem rồi
    if (sessionStorage.getItem("home_intro_seen")) {

        introOverlay.remove();
        return;
    }

    document.body.classList.add("intro-playing");

    // Force play
    introVideo.play().catch(() => {
        closeIntro();
    });

    // Khi video kết thúc
    introVideo.addEventListener("ended", closeIntro);

    // Backup nếu video lỗi
    introVideo.addEventListener("error", closeIntro);

    // Backup timeout tránh bị đứng
    setTimeout(() => {

        if (document.body.classList.contains("intro-playing")) {
            closeIntro();
        }

    }, 10000);

    function closeIntro() {

        sessionStorage.setItem("home_intro_seen", "true");

        introOverlay.classList.add("hide");

        document.body.classList.remove("intro-playing");

        setTimeout(() => {

            introOverlay.remove();

        }, 1200);
    }

});
*/
