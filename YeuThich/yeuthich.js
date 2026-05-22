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


/*thêm, xóa yêu thích*/
document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("wishlist-content");
    const count = document.getElementById("wishlist-count");
    const emptyMsg = document.getElementById("empty-message");

    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    count.innerText = favs.length;

    if (favs.length === 0) {
        emptyMsg.classList.remove("d-none");
        return;
    }

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
});

function removeFav(id) {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    favs = favs.filter(item => item.id !== id);

    localStorage.setItem("favorites", JSON.stringify(favs));

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

