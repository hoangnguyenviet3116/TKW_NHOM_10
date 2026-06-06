/* =========================================================================
   BATHORA DRESS — chitiet.js
   Logic xử lý tương tác màu sắc, kích thước, ảnh độc lập và Slider ẩn nút thông minh
   ========================================================================= */

// ── CƠ SỞ DỮ LIỆU SẢN PHẨM THỰC TẾ (Giữ nguyên cấu trúc tệp tin của bạn) ──
const listProductsDatabase = [
    {
        id: "prod-01", 
        sku: "Mã SP: 2T04.2601",
        title: "Áo xuân hè cổ tròn phối bèo dọc",
        price: "755.000₫", oldPrice: "1.080.000₫", discount: "-30%", score: 4.2,
        desc: "Áo xuân hè thiết kế cổ tròn nữ tính với điểm nhấn bèo dọc chạy từ cổ xuống thân — thanh lịch, thoáng mát, phù hợp đi làm lẫn dạo phố. Chất voan tơ cao cấp, dáng suông nhẹ tôn mọi vóc dáng.",
        
        descTab: `
        <p>Áo xuân hè thiết kế cổ tròn nữ tính, phối bèo dọc chạy dài từ cổ xuống tạo điểm nhấn duyên dáng.</p>
        <ul>
            <li>Dáng suông nhẹ</li>
            <li>Phối bèo dọc</li>
            <li>Thích hợp công sở</li>
        </ul>

        `,
        materialTab: `
            <p>Mặt ngoài: 100% Voan tơ cao cấp — mềm nhẹ, thoáng mát.</p>
        `,

        preserveTab: `
            <p>Giặt tay hoặc máy chế độ nhẹ, nước lạnh dưới 30°C.</p>
            <p>Không dùng thuốc tẩy</p>
        `,

        reviewCount: 128,

        colors: [
            { name: "Xanh nhạt", code: "#c9e4f5", images: ["../images/aoxuanhe1.jpg", "../images/aoxuanhe2.jpg", "../images/aoxuanhe5.jpg"] },
            { name: "Đen cổ điển", code: "#111111", images: ["../images/aoxuanhe4.jpg"] },
            { name: "Hồng pastel", code: "#fadadd", images: ["../images/aoxuanhe3.jpg"] }
        ],

        reviews: [
            { user: "Ngọc Linh",
            avatar: "NL",
            text: "Áo đẹp hơn hình nhiều." },

            { user: "Thanh Hà",
            avatar: "TH",
            text: "Chất vải mềm và mát."}
        ]
    },
    {
        id: "prod-02", 
        sku: "Mã SP: 2T05.1202",
        title: "Áo kiểu lệch vai, xếp ly sườn",
        price: "565.000₫", 
        oldPrice: "706.000₫", 
        discount: "-20%", 
        score: 4.8,
        desc: "Tựa như một bản tình ca mùa hạ ngọt ngào, chiếc áo lệch vai mang đến cho nàng diện mạo thanh thoát và tràn đầy nét thơ. Những đường nếp gấp xếp ly tỉ mỉ nơi mạn sườn khéo léo tạo độ rủ mềm mại trên nền vải lụa voan nhẹ tinh tế.",
       
        colors: [
            { name: "Kem sữa", code: "#FFF8E7", images: ["../images/aokieulechvai.jpg", "../images/lechvai2.jpg", "../images/lechvai3.jpg", "../images/lechvaikem.jpg"] },
            { name: "Đen cổ điển", code: "#111111", images: ["../images/lechvaiden1.jpg", "../images/lechvaiden2.jpg"] }
        ],

        descTab: `
            <p>Thiết kế lệch vai thời thượng mang đến vẻ đẹp quyến rũ nhưng vẫn giữ được sự thanh lịch đặc trưng của phong cách nữ tính hiện đại.</p>

        <ul>
            <li>Phom dáng suông nhẹ dễ mặc</li>
            <li>Chi tiết xếp ly sườn tạo hiệu ứng eo thon</li>
            <li>Thiết kế lệch vai nổi bật và sang trọng</li>
            <li>Phù hợp tiệc nhẹ, dạo phố hoặc sự kiện</li>
        </ul>
        `,

        materialTab: `
            <p>Vải lụa voan cao cấp mềm mại, nhẹ và thoáng khí.</p>
            <p>Bề mặt vải có độ rủ tự nhiên giúp tôn dáng và tạo chuyển động uyển chuyển.</p>
        `,

        preserveTab: `
            <p>Giặt tay với nước lạnh dưới 30°C.</p>
            <p>Không vắt xoắn mạnh.</p>
            <p>Ủi nhiệt độ thấp, tránh tiếp xúc trực tiếp với ánh nắng gắt.</p>
        `,

        reviewCount: 156,

        reviews: [
        { user: "Mai Anh",
            avatar: "MA",
            text: "Mặc lên cực kỳ tôn dáng, phần lệch vai rất sang." },
        { user: "Thảo Vy",
            avatar: "TV",
            text: "Chất vải mềm và rủ đẹp, rất đáng tiền." }
        ],
    },

    {
        id: "prod-03", sku: "Mã SP: 2T05.1203",
        title: "Áo kiểu nhún ngực cổ sen có chân",
        price: "555.000₫", oldPrice: "", discount: "", score: 5.0,
        desc: "Đánh thức vẻ đẹp ngọt ngào, đài các với thiết kế áo kiểu cổ sen có chân đứng phom chuẩn mực cùng chi tiết nhún ngực phồng nhẹ nữ tính. Chất voan voan cao cấp bay bổng, thoáng mát tuyệt đối.",
        colors: [
            { name: "Hồng pastel", code: "#fadadd", images: ["../images/cosen1.jpg", "../images/cosen2.jpg", "../images/cosen3.jpg", "../images/cosen4.jpg", "../images/cosen5.jpg"] },
        ],
        descTab: `
            <p>Thiết kế cổ sen phối chân cổ thanh lịch cùng chi tiết nhún ngực nữ tính giúp tổng thể trở nên mềm mại và duyên dáng.</p>

            <ul>
                <li>Cổ sen thanh lịch</li>
                <li>Nhún ngực tạo điểm nhấn nhẹ nhàng</li>
                <li>Dễ phối chân váy hoặc quần âu</li>
                <li>Thích hợp môi trường công sở</li>
            </ul>
            `,

        materialTab: `
            <p>Voan cao cấp nhập khẩu, mềm mại và thoáng mát.</p>
            <p>Bề mặt mịn, ít nhăn và tạo cảm giác dễ chịu khi mặc cả ngày.</p>
        `,

        preserveTab: `
            <p>Giặt bằng túi giặt nếu sử dụng máy giặt.</p>
            <p>Không sử dụng chất tẩy mạnh.</p>
            <p>Phơi nơi thoáng mát.</p>
        `,

        reviewCount: 98,

        reviews: [
        {   user: "Thu Trang",
            avatar: "TT",
            text: "Cổ sen rất xinh, mặc đi làm ai cũng khen." },
        { user: "Kim Oanh",
            avatar: "KO",
            text: "Vải mát và form đứng dáng." }
        ],
    },
    {
        id: "prod-04", sku: "Mã SP: 2T05.1204",
        title: "Áo kiểu thiết kế dáng ôm vắt vai",
        price: "555.000₫", oldPrice: "655.000₫", discount: "-15%", score: 4.5,
        desc: "Không cần cầu kỳ nhưng vẫn đủ sức làm chủ mọi ánh nhìn với phom dáng ôm sát tinh xảo và đường vắt vai thời thượng. Sự đan xen tinh tế giữa nét thanh lịch công sở hiện đại và sự quý phái thời thượng.",
        colors: [
            { name: "Đen cổ điển", code: "#111111", images: ["../images/vatvai1.jpg", "../images/vatvai2.jpg", "../images/vatvai3.jpg", "../images/vatvai4.jpg"] },
            { name: "Kem sữa", code: "#FFF8E7", images: ["../images/vaivaikem.jpg", "../images/vatvaikem2.jpg"] }
        ],
        descTab: `
            <p>Thiết kế ôm nhẹ cơ thể kết hợp chi tiết vắt vai độc đáo tạo nên vẻ đẹp hiện đại, cá tính nhưng vẫn giữ nét thanh lịch.</p>

            <ul>
                <li>Dáng ôm tôn đường cong</li>
                <li>Điểm nhấn vắt vai thời thượng</li>
                <li>Đường may tinh tế</li>
                <li>Phù hợp môi trường công sở cao cấp</li>
            </ul>
        `,

        materialTab: `
            <p>Chất liệu polyester cao cấp kết hợp spandex.</p>
            <p>Độ co giãn nhẹ giúp thoải mái khi vận động.</p>
        `,

        preserveTab: `
            <p>Giặt tay hoặc giặt máy chế độ nhẹ.</p>
            <p>Không sấy nhiệt cao.</p>
            <p>Ủi mặt trái sản phẩm.</p>
        `,

        reviewCount: 143,

        reviews: [
        { user: "Lan Chi",
            avatar: "LC",
            text: "Thiết kế lạ mắt, mặc rất sang." },
        { user: "Bảo Ngọc",
            avatar: "BN",
            text: "Ôm dáng vừa phải, không bị khó chịu." }
        ],
    },
    {
        id: "prod-05", sku: "Mã SP: 2T05.1205",
        title: "Áo kiểu nhún chân ngực, cổ ngang",
        price: "485.000₫", oldPrice: "", discount: "", score: 4.2,
        desc: "Định hình phong cách thời trang dẫn đầu xu hướng với thiết kế cổ ngang phóng khoáng phối chi tiết nhún chân ngực thủ công độc đáo. Được may từ dòng vải voan lụa trượt cao cấp chống nhăn xước.",
        colors: [
            { name: "Đen cổ điển", code: "#111111", images: ["../images/ngunchannguc1.jpg", "../images/nhunchannguc2.jpg", "../images/nhunchannguc3.jpg", "../images/nhunchannguc4.jpg"] },
            { name: "Kem sữa", code: "#FFF8E7", images: ["../images/nhunchannguc5.jpg", "../images/nhunchannguc6.jpg"] }
        ],
        descTab: `
            <p>Thiết kế cổ ngang trẻ trung kết hợp chi tiết nhún chân ngực tạo hiệu ứng mềm mại và nữ tính cho tổng thể trang phục.</p>

            <ul>
                <li>Cổ ngang thanh thoát</li>
                <li>Nhún chân ngực nổi bật</li>
                <li>Phong cách trẻ trung hiện đại</li>
                <li>Dễ phối với quần jean hoặc chân váy</li>
            </ul>
        `,

        materialTab: `
            <p>Voan lụa cao cấp chống nhăn nhẹ.</p>
            <p>Bề mặt mềm mại, tạo cảm giác thoáng mát khi mặc.</p>
        `,

        preserveTab: `
            <p>Giặt riêng với quần áo màu sáng.</p>
            <p>Không dùng thuốc tẩy.</p>
            <p>Phơi ngang để giữ phom sản phẩm.</p>
        `,

        reviewCount: 112,

        reviews: [
        { user: "Khánh Linh",
            avatar: "KL",
            text: "Kiểu cổ ngang mặc rất trẻ trung." },
        { user: "Ngọc Hân",
            avatar: "NH",
            text: "Vải đẹp và lên form chuẩn." }
        ],
    },
    {
        id: "prod-06", sku: "Mã SP: 2T05.1206",
        title: "Áo kiểu cúp ngực phối sơ mi tay chờm",
        price: "565.000₫", oldPrice: "", discount: "", score: 4.7,
        desc: "Tôn vinh giá trị nội tại quyến rũ với phom dáng ôm nhẹ tinh xảo phối sơ mi tay chờm thanh thoát. Sự đan xen chất liệu voan tơ bay bổng cùng đường may bo cúp ngực chắc chắn tạo nên một tổng thể lịch sự.",
        colors: [
            { name: "Kem sữa", code: "#FFF8E7", images: ["../images/somi1.jpg", "../images/somi2.jpg", "../images/somi3.jpg", "../images/somi4.jpg"] },
            { name: "Đen cổ điển", code: "#111111", images: ["../images/somi5.jpg", "../images/somi6.jpg"] }
        ],
        descTab: `
            <p>Sự kết hợp độc đáo giữa áo sơ mi và thiết kế cúp ngực tạo nên vẻ đẹp vừa thanh lịch vừa quyến rũ dành cho phụ nữ hiện đại.</p>

            <ul>
                <li>Thiết kế hai lớp độc đáo</li>
                <li>Cúp ngực tôn dáng</li>
                <li>Tay chờm mềm mại</li>
                <li>Phù hợp công sở và tiệc nhẹ</li>
            </ul>
        `,

        materialTab: `
            <p>Voan tơ kết hợp cotton cao cấp.</p>
            <p>Mềm mại, thoáng khí và giữ phom tốt.</p>
        `,

        preserveTab: `
            <p>Giặt nhẹ với nước lạnh.</p>
            <p>Không ngâm quá lâu.</p>
            <p>Ủi ở nhiệt độ thấp.</p>
        `,

        reviewCount: 187,

        reviews: [
        { user: "Phương Anh",
            avatar: "PA",
            text: "Thiết kế rất độc đáo và sang trọng." },
        { user: "Diễm My",
            avatar: "DM",
            text: "Mặc đi tiệc cực kỳ nổi bật."}
        ],
    },
    {
        id: "prod-07", sku: "Mã SP: 2T05.1207",
        title: "Áo phông mascot in lưới 7cm",
        price: "365.000₫", oldPrice: "", discount: "", score: 4.9,
        desc: "Tôn vinh giá trị nội tại quyến rũ với phom dáng ôm nhẹ tinh xảo phối sơ mi tay chờm thanh thoát. Sự đan xen chất liệu voan tơ bay bổng cùng đường may bo cúp ngực chắc chắn tạo nên một tổng thể lịch sự.",
        colors: [{ name: "Kem sữa", code: "#FFF8E7", images: ["../images/mascot.jpg", "../images/mascot1.jpg", "../images/mascot2.jpg", "../images/mascot3.jpg", "../images/mascot4.jpg", "../images/mascot5.jpg", "../images/mascot6.jpg"] }],
        descTab: `
            <p>Mẫu áo phông trẻ trung với họa tiết mascot in lưới độc quyền mang phong cách năng động, phù hợp nhiều độ tuổi.</p>

            <ul>
                <li>Phom unisex thoải mái</li>
                <li>Họa tiết mascot nổi bật</li>
                <li>Dễ phối với quần jean và chân váy</li>
                <li>Thích hợp mặc hằng ngày</li>
            </ul>
        `,

        materialTab: `
            <p>100% Cotton cao cấp.</p>
            <p>Thấm hút mồ hôi tốt, thoáng khí và mềm mại.</p>
        `,

        preserveTab: `
            <p>Giặt lộn mặt trái sản phẩm.</p>
            <p>Không ủi trực tiếp lên hình in.</p>
            <p>Tránh sử dụng thuốc tẩy.</p>
        `,

        reviewCount: 245,

        reviews: [
        { user: "Hoàng Yến",
            avatar: "HY",
            text: "Áo rất mềm, mặc cực kỳ thoải mái."},
        { user: "Minh Thư",
            avatar: "MT",
            text: "Hình in đẹp, sau nhiều lần giặt vẫn ổn." }
        ],
    }
];

// Trạng thái vận hành ứng dụng
let currentActiveProduct = listProductsDatabase[0];
let selectedColorIndex = 0;
let selectedImageIndex = 0;
let quantityOrder = 1;
let currentSlidePosition = 0;

let countCartItems = 0;
let countWishlistItems = 0;
let hasLikedProduct = false;

// Đợi trang tải xong giao diện
document.addEventListener("DOMContentLoaded", () => {
    loadProductToInterface(currentActiveProduct);
    bindActionsEvents();
    renderRelatedProductsGrid();
    setupSliderControls();

    // Cập nhật số lượng giỏ hàng đã lưu trước đó
    updateCartBadgeFromStorage();
    updateWishlistBadgeFromStorage();
});

function renderReviews(product) {

    const wrapper =
        document.querySelector(".comments-stream-list");

    wrapper.innerHTML = "";

    product.reviews.forEach(review => {

        wrapper.innerHTML += `
            <div class="single-comment-card d-flex">

                <div class="user-avatar-circle">
                    ${review.avatar}
                </div>

                <div class="comment-body-content">
                    <strong class="username">
                        ${review.user}
                    </strong>

                    <p class="comment-text">
                        ${review.text}
                    </p>
                </div>

            </div>
        `;
    });
}

// Đổ dữ liệu sản phẩm lên giao diện
function loadProductToInterface(product) {
    document.getElementById("pTitle").textContent = product.title;
    document.getElementById("bcTitle").textContent = product.title;
    document.getElementById("productSku").textContent = product.sku;
    document.getElementById("pShortDesc").textContent = product.desc;
    document.getElementById("pPrice").textContent = product.price;
    document.getElementById("stickyPriceText").textContent = product.price;
    document.getElementById("tab-desc").innerHTML = product.descTab || "";
    document.getElementById("tab-material").innerHTML = product.materialTab || "";
    document.getElementById("tab-preserve").innerHTML = product.preserveTab || "";
    renderReviews(product);
    
    const oldPriceEl = document.getElementById("pOldPrice");
    const discountEl = document.getElementById("pDiscount");
    if(product.oldPrice) {
        oldPriceEl.textContent = product.oldPrice; oldPriceEl.style.display = "inline";
        discountEl.textContent = product.discount; discountEl.style.display = "inline";
    } else {
        oldPriceEl.style.display = "none"; discountEl.style.display = "none";
    }

    renderStars(product.score);

    // Xây dựng khuy màu hình tròn Swatches (Đổi mã màu kem sữa để nổi bật)
    const colorBox = document.getElementById("colorContainer");
    colorBox.innerHTML = "";
    product.colors.forEach((col, idx) => {
        const swatch = document.createElement("div");
        swatch.className = `color-swatch-opt ${idx === selectedColorIndex ? 'active' : ''}`;
        swatch.style.backgroundColor = col.code;
        if(col.code === "#ffffff" || col.code === "#FFF8E7") swatch.style.borderColor = "#ccc";
        swatch.title = col.name;
        swatch.addEventListener("click", () => triggerSwitchColorAction(idx));
        colorBox.appendChild(swatch);
    });
    document.getElementById("colorTextValue").textContent = product.colors[selectedColorIndex].name;

    syncGalleryView();
}

// Xử lý vẽ icon ngôi sao đánh giá
function renderStars(score) {
    const wrapper = document.getElementById("starsWrapper");
    if(!wrapper) return;
    wrapper.innerHTML = "";
    const floorScore = Math.floor(score);
    for (let i = 0; i < floorScore; i++) { wrapper.innerHTML += `<i class="fa-solid fa-star text-warning"></i>`; }
    if (score % 1 !== 0) { wrapper.innerHTML += `<i class="fa-solid fa-star-half-stroke text-warning"></i>`; }
    const remain = 5 - Math.ceil(score);
    for (let i = 0; i < remain; i++) { wrapper.innerHTML += `<i class="fa-regular fa-star text-muted"></i>`; }
}

// FIX HOÀN TOÀN: Giữ nguyên ảnh gốc của bạn theo đúng màu sắc riêng biệt
function syncGalleryView() {
    const currentImagesList = getAllImages();

    if (selectedImageIndex >= currentImagesList.length) {
        selectedImageIndex = 0;
    }

    // Ảnh lớn
    document.getElementById("mainActiveImg").src =
        currentImagesList[selectedImageIndex].src;

    document.getElementById("imageCounter").textContent =
        `${selectedImageIndex + 1} / ${currentImagesList.length}`;

    // Thumbnail
    const thumbsContainer = document.getElementById("thumbsContainer");
    thumbsContainer.innerHTML = "";

    currentImagesList.forEach((img, idx) => {
        const thumb = document.createElement("div");

        thumb.className =
            `thumb-item ${idx === selectedImageIndex ? "active" : ""}`;

        thumb.innerHTML = `
            <img src="${img.src}" alt="BATHORA">
        `;

        thumb.addEventListener("mouseenter", () => {
            selectedImageIndex = idx;
            syncGalleryView();
        });

        thumbsContainer.appendChild(thumb);
    });
}

// Hành động khi nhấn chọn ô khuy màu sắc tròn
function triggerSwitchColorAction(colorIdx) {

    selectedColorIndex = colorIdx;

    document.getElementById("colorTextValue").textContent =
        currentActiveProduct.colors[colorIdx].name;

    document.querySelectorAll(".color-swatch-opt")
        .forEach((sw, i) => {
            sw.classList.toggle("active", i === colorIdx);
        });

    const allImages = getAllImages();

    const firstIndex = allImages.findIndex(
        img => img.colorName === currentActiveProduct.colors[colorIdx].name
    );

    if (firstIndex >= 0) {
        selectedImageIndex = firstIndex;
    }

    syncGalleryView();
}

// ── BỘ ĐIỀU KHIỂN HOẠT ĐỘNG SLIDER (Hết ảnh tự động ẩn nút trượt) ──
function setupSliderControls() {
    const grid = document.getElementById("relatedProductsGrid");
    const prevBtn = document.getElementById("slidePrevBtn");
    const nextBtn = document.getElementById("slideNextBtn");
    
    if(!grid || !prevBtn || !nextBtn) return;

    nextBtn.addEventListener("click", () => {
        const filterCount = listProductsDatabase.filter(p => p.id !== currentActiveProduct.id).length;
        const maxSlides = Math.max(0, filterCount - 4); // Màn hình máy tính hiển thị sẵn 4 cột sản phẩm
        
        if (currentSlidePosition < maxSlides) {
            currentSlidePosition++;
            updateSliderPosition(grid);
            updateSliderButtonsVisibility(filterCount);
        }
    });

    prevBtn.addEventListener("click", () => {
        const filterCount = listProductsDatabase.filter(p => p.id !== currentActiveProduct.id).length;
        if (currentSlidePosition > 0) {
            currentSlidePosition--;
            updateSliderPosition(grid);
            updateSliderButtonsVisibility(filterCount);
        }
    });
}

function updateSliderPosition(grid) {
    const firstItem = grid.querySelector(".product-card-item");
    if(!firstItem) return;
    const cardWidth = firstItem.offsetWidth + 20; // 20px là khoảng cách gap giữa các card sản phẩm
    grid.style.transform = `translateX(-${currentSlidePosition * cardWidth}px)`;
}

// Hàm kiểm tra: Khi trượt hết ảnh thì ẩn mũi tên đi
function updateSliderButtonsVisibility(filterCount) {
    const prevBtn = document.getElementById("slidePrevBtn");
    const nextBtn = document.getElementById("slideNextBtn");
    if(!prevBtn || !nextBtn) return;

    const maxSlides = Math.max(0, filterCount - 4);

    // Nếu ở vị trí đầu tiên thì ẩn nút quay lại, ở vị trí cuối cùng thì ẩn nút tiến
    prevBtn.style.display = currentSlidePosition <= 0 ? "none" : "flex";
    nextBtn.style.display = currentSlidePosition >= maxSlides ? "none" : "flex";
}

// Đăng ký sự kiện tương tác nút bấm tiện ích
function bindActionsEvents() {
    // Mũi tên trái / phải trên khung ảnh chính
    document.getElementById("prevBtn").addEventListener("click", () => {
        const len = currentActiveProduct.colors[selectedColorIndex].images.length;
        selectedImageIndex = (selectedImageIndex - 1 + len) % len;
        syncGalleryView();
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        const len = currentActiveProduct.colors[selectedColorIndex].images.length;
        selectedImageIndex = (selectedImageIndex + 1) % len;
        syncGalleryView();
    });

    // Kính lúp phóng ảnh to
    document.getElementById("zoomTrigger").addEventListener("click", () => {
        const modal = document.getElementById("zoomOverlayModal");
        document.getElementById("zoomTargetImg").src = currentActiveProduct.colors[selectedColorIndex].images[selectedImageIndex];
        modal.classList.add("active");
    });
    document.getElementById("closeZoomOverlayBtn").addEventListener("click", () => {
        document.getElementById("zoomOverlayModal").classList.remove("active");
    });

    // Chọn phom hộp size chữ nền đen
    const sBtns = document.querySelectorAll(".size-btn:not(.out)");
    sBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            sBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById("sizeTextValue").textContent = btn.getAttribute("data-size");
        });
    });

    // Hiện bảng hướng dẫn chọn size chuẩn
    const sizeGuideBtn =
    document.getElementById("sizeGuideToggle");

    const sizeGuideModal =
    document.getElementById("sizeGuideModal");

    const closeSizeGuideBtn =
    document.getElementById("closeSizeGuide");

    if (sizeGuideBtn) {
    sizeGuideBtn.addEventListener("click", () => {
        sizeGuideModal.classList.add("active");
    });
}

    if(closeSizeGuideBtn){
    closeSizeGuideBtn.addEventListener("click", () => {
        sizeGuideModal.classList.remove("active");
    });
    }
}

    // Tăng giảm số lượng đặt mua
    document.getElementById("minusQtyBtn").addEventListener("click", () => {
        if(quantityOrder > 1) { quantityOrder--; document.getElementById("qtyDisplayValue").textContent = quantityOrder; }
    });
    document.getElementById("plusQtyBtn").addEventListener("click", () => {
        quantityOrder++; document.getElementById("qtyDisplayValue").textContent = quantityOrder;
    });

    // Đổi thanh mốc tab thông tin mô tả chi tiết sản phẩm
    const tButtons = document.querySelectorAll(".tab-toggle-button");
    const tPanes = document.querySelectorAll(".tab-content-pane");
    tButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tButtons.forEach(b => b.classList.remove("active"));
            tPanes.forEach(p => p.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(btn.getAttribute("data-tab")).classList.add("active");
        });
    });

    // Nhấn nhảy nhanh xuống phần nhận xét khách hàng
    document.getElementById("scrollToReviewBtn").addEventListener("click", () => {
        document.getElementById("reviewsAnchorSection").scrollIntoView({ behavior: "smooth" });
    });

    // Trái tim trên thanh Menu điều hướng tăng chỉ số
function getWishlistKey() {
    const user = getCurrentUser();

    if (!user) return null;

    return "favorites_" + user.email;
}

function getFavorites() {
    const wishlistKey = getWishlistKey();

    if (!wishlistKey) return [];

    return JSON.parse(localStorage.getItem(wishlistKey)) || [];
}

function saveFavorites(favs) {
    const wishlistKey = getWishlistKey();

    if (!wishlistKey) return;

    localStorage.setItem(wishlistKey, JSON.stringify(favs));
}

function updateWishlistBadgeFromStorage() {
    const badge = document.getElementById("wishlist-badge");
    const favs = getFavorites();

    if (!badge) return;

    badge.textContent = favs.length;

    if (favs.length > 0) {
        badge.classList.remove("d-none");
    } else {
        badge.classList.add("d-none");
    }
}

document.getElementById("wishlistActionBtn").addEventListener("click", () => {
    if (!requireLoginBeforeBuy()) return;

    const heartIco = document.querySelector("#wishlistActionBtn i");
    const currentImagesList = getAllImages();
    const selectedImage = currentImagesList[selectedImageIndex].src;

    const product = {
        id: currentActiveProduct.id,
        name: currentActiveProduct.title,
        price: currentActiveProduct.price,
        img: selectedImage
    };

    let favs = getFavorites();
    const index = favs.findIndex(item => item.id === product.id);

    if (index === -1) {
        favs.push(product);
        heartIco.className = "fa-solid fa-heart text-danger";
        fireAlertNotification("Đã lưu mẫu trang phục này vào mục yêu thích!");
    } else {
        favs.splice(index, 1);
        heartIco.className = "fa-regular fa-heart";
        fireAlertNotification("Đã xoá khỏi danh mục yêu thích.");
    }

    saveFavorites(favs);
    updateWishlistBadgeFromStorage();
});
    // CHUYỂN CHUỖI GIÁ "755.000₫" THÀNH SỐ 755000
function parsePriceToNumber(priceText) {
    return Number(
        String(priceText)
            .replace(/[^\d]/g, "")
    );
}

// LẤY GIỎ HÀNG TỪ LOCALSTORAGE
function getCartKey() {
    const user = JSON.parse(sessionStorage.getItem("bathora_current_user"));

    if (!user) {
        return null;
    }

    return "cart_" + user.email;
}

function getCartFromStorage() {
    const cartKey = getCartKey();

    if (!cartKey) {
        return [];
    }

    return JSON.parse(localStorage.getItem(cartKey)) || [];
}

// LƯU GIỎ HÀNG VÀO LOCALSTORAGE
function saveCartToStorage(cart) {
    const cartKey = getCartKey();

    if (!cartKey) return;

    localStorage.setItem(cartKey, JSON.stringify(cart));
}
// CẬP NHẬT BADGE GIỎ HÀNG Ở HEADER
function updateCartBadgeFromStorage() {
    const cart = getCartFromStorage();
    const badge = document.getElementById("cart-badge");

    if (!badge) return;

    const totalQuantity = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    badge.textContent = totalQuantity;

    if (totalQuantity > 0) {
        badge.classList.remove("d-none");
    } else {
        badge.classList.add("d-none");
    }
}
//KIỂM TRA ĐÃ ĐĂNG NHẬP CHƯA
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("bathora_current_user"));
}

function requireLoginBeforeBuy() {
    const currentUser = getCurrentUser();

    if (currentUser) {
        return true;
    }

    Swal.fire({
        icon: "warning",
        title: "Bạn chưa đăng nhập",
        text: "Vui lòng đăng nhập để tiếp tục mua sắm.",
        confirmButtonText: "Đăng nhập",
        showCancelButton: true,
        cancelButtonText: "Ở lại",
        confirmButtonColor: "#c9a45c"
    }).then(result => {
        if (result.isConfirmed) {
            window.location.href = "../TaiKhoan/login.html";
        }
    });

    return false;
}

// NÚT THÊM VÀO GIỎ HÀNG
const execAddCartLogic = () => {

    if (!requireLoginBeforeBuy()) return;

    const cart = getCartFromStorage();

    const selectedSize = document.getElementById("sizeTextValue").textContent.trim();
    const selectedColor = document.getElementById("colorTextValue").textContent.trim();

    const currentImagesList = getAllImages();
    const selectedImage = currentImagesList[selectedImageIndex].src;

    const productToCart = {
        id: currentActiveProduct.id,
        sku: currentActiveProduct.sku,
        name: currentActiveProduct.title,
        price: parsePriceToNumber(currentActiveProduct.price),
        oldPrice: currentActiveProduct.oldPrice,
        discount: currentActiveProduct.discount,
        img: selectedImage,
        size: selectedSize,
        color: selectedColor,
        quantity: quantityOrder,
        type: "ao",
        selected: true,

        // cartKey dùng để phân biệt cùng sản phẩm nhưng khác size/màu
        cartKey: `${currentActiveProduct.id}-${selectedSize}-${selectedColor}`
    };

    const existingProduct = cart.find(item => item.cartKey === productToCart.cartKey);

    if (existingProduct) {
        existingProduct.quantity += quantityOrder;
    } else {
        cart.push(productToCart);
    }

    saveCartToStorage(cart);
    updateCartBadgeFromStorage();

    fireAlertNotification(`Đã thêm ${quantityOrder} sản phẩm vào giỏ hàng!`);
};

document.getElementById("addToCartActionBtn").addEventListener("click", execAddCartLogic);
document.getElementById("stickyAddCartBtn").addEventListener("click", execAddCartLogic);
/* MUA NGAY */
function buyNowProduct() {

    if (!requireLoginBeforeBuy()) return;

    let cart = getCartFromStorage();

    const selectedSize = document.getElementById("sizeTextValue").textContent.trim();
    const selectedColor = document.getElementById("colorTextValue").textContent.trim();

    const currentImagesList = getAllImages();
    const selectedImage = currentImagesList[selectedImageIndex].src;

    const productToCart = {
        id: currentActiveProduct.id,
        sku: currentActiveProduct.sku,
        name: currentActiveProduct.title,
        price: parsePriceToNumber(currentActiveProduct.price),
        oldPrice: currentActiveProduct.oldPrice,
        discount: currentActiveProduct.discount,
        img: selectedImage,
        size: selectedSize,
        color: selectedColor,
        quantity: quantityOrder,
        type: "ao",
        selected: true,
        cartKey: `${currentActiveProduct.id}-${selectedSize}-${selectedColor}`
    };

    // Bỏ chọn tất cả sản phẩm khác để chỉ thanh toán sản phẩm mua ngay
    cart = cart.map(item => {
        item.selected = false;
        return item;
    });

    const existingProduct = cart.find(item => item.cartKey === productToCart.cartKey);

    if (existingProduct) {
        existingProduct.quantity += quantityOrder;
        existingProduct.selected = true;
    } else {
        cart.push(productToCart);
    }

    saveCartToStorage(cart);
    updateCartBadgeFromStorage();

    window.location.href = "../GioHang/giohang.html";
}
const buyNowBtn = document.getElementById("buyNowActionBtn");
if (stickyBuyNowBtn) {
    stickyBuyNowBtn.addEventListener("click", buyNowProduct);
}

if (buyNowBtn) {
    buyNowBtn.addEventListener("click", buyNowProduct);
}


    // Nút cuộn mượt về đầu trang (Back to top)
    const backToTopBtn = document.getElementById("backToTop");
    if(backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) backToTopBtn.classList.add("show");
            else backToTopBtn.classList.remove("show");
        }, { passive: true });
        backToTopBtn.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });
    }

function fireAlertNotification(message) {
    const pop = document.getElementById("toastAlertPopup");
    pop.textContent = message; pop.classList.add("active");
    setTimeout(() => pop.classList.remove("active"), 2500);
}

// Kết xuất lưới 4 cột "Có thể bạn sẽ thích" loại trừ sản phẩm đang xem
function renderRelatedProductsGrid() {
    const grid = document.getElementById("relatedProductsGrid");
    if(!grid) return;
    grid.innerHTML = "";

    // Loại trừ trang phục chính diện ra khỏi danh sách gợi ý dưới chân trang
    const relatedProducts = listProductsDatabase.filter(prod => prod.id !== currentActiveProduct.id);

    relatedProducts.forEach((prod) => {
        const item = document.createElement("div");
        item.className = "product-card-item";
        item.innerHTML = `
            <div class="card-image-box">
                ${prod.discount ? `<span class="card-sale-badge">${prod.discount}</span>` : ''}
                <img src="${prod.colors[0].images[0]}" alt="${prod.title}" onerror="this.src='https://via.placeholder.com/220x290?text=BATHORA'">
            </div>
            <div class="card-info-details">
                <div class="title">${prod.title}</div>
                <div class="price-row">
                    <span class="price-now">${prod.price}</span>
                    ${prod.oldPrice ? `<span class="price-was">${prod.oldPrice}</span>` : ''}
                </div>
                <div class="sold-qty">Đã bán 124+</div>
            </div>
        `;
        
        // Click hoán đổi dữ liệu trực tiếp và trả thanh trượt Slider về 0
        item.addEventListener("click", () => {
            currentActiveProduct = prod;
            selectedColorIndex = 0;
            selectedImageIndex = 0;
            quantityOrder = 1;
            document.getElementById("qtyDisplayValue").textContent = "1";
            currentSlidePosition = 0;
            grid.style.transform = `translateX(0px)`;
            
            loadProductToInterface(prod);
            renderRelatedProductsGrid(); // Dựng lại danh sách loại trừ mới
            window.scrollTo({ top: 0, behavior: "smooth" });
            fireAlertNotification(`Đang hiển thị mẫu: ${prod.title}`);
        });
        grid.appendChild(item);
    });

    updateSliderButtonsVisibility(relatedProducts.length);
}

document.querySelectorAll('.tab-toggle-button').forEach(btn => {
    btn.addEventListener('click', () => {

        document.querySelectorAll('.tab-toggle-button')
            .forEach(b => b.classList.remove('active'));

        document.querySelectorAll('.tab-content-pane')
            .forEach(tab => tab.classList.remove('active'));

        btn.classList.add('active');

        document.getElementById(btn.dataset.tab)
            .classList.add('active');
    });
});

function getAllImages() {
    let images = [];

    currentActiveProduct.colors.forEach(color => {
        color.images.forEach(img => {
            images.push({
                src: img,
                colorName: color.name
            });
        });
    });

    return images;
}
