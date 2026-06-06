document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. SIÊU DATABASE (14 Sản phẩm + Size + Màu)
       ========================================== */
const tongHopSanPham = [
        { 
            id: "dam1", 
            type: "dam", 
            name: "Đầm dáng dài lụa xốp sát nách thanh lịch", 
            price: 890000, 
            oldPrice: 1100000, 
            img: "images/SPNB2.jpg", 
            gallery: ["images/SPNB2.jpg", "images/SPNB2_matsau.jpg", "images/SPNB2_cancanh.jpg"],
            rating: 4.9, sold: 125, sizes: ["S", "M", "L"], 
            colors: ["Trắng", "Be"], stock: 20,
            description: "Thiết kế đầm dáng dài thướt tha với chất liệu lụa xốp nhẹ nhàng. Kiểu dáng sát nách tôn lên bờ vai thon thả, hoàn hảo cho những buổi dạo phố hoặc tiệc nhẹ."
        },
        { 
            id: "dam2", 
            type: "dam", 
            name: "Đầm xanh bẹt vai nhún eo phối choàng voan", 
            price: 950000, 
            oldPrice: null, 
            img: "images/SPNB6.jpg", 
            gallery: ["images/SPNB6.jpg", "images/SPNB6_matsau.jpg", "images/SPNB6_cancanh.jpg"],
            rating: 5.0, sold: 340, sizes: ["S", "M"], 
            colors: ["Xanh"], stock: 15,
            description: "Tone màu xanh dịu mát kết hợp phần eo nhún chun tôn dáng. Điểm nhấn là lớp choàng voan mỏng manh bên ngoài mang lại vẻ đẹp bay bổng và đầy nữ tính."
        },
        { 
            id: "dam3", 
            type: "dam", 
            name: "Đầm mini xếp ly phối cổ sơ mi tiểu thư", 
            price: 750000, 
            oldPrice: 890000, 
            img: "images/SPNB8.jpg", 
            gallery: ["images/SPNB8.jpg", "images/SPNB8_matsau.jpg", "images/SPNB8_cancanh.jpg"],
            rating: 4.8, sold: 210, sizes: ["S", "M", "L"], 
            colors: ["Be", "Nâu"], stock: 45,
            description: "Đậm chất preppy trẻ trung với chân váy xếp ly nếp to. Phần thân trên phối cổ sơ mi kèm nơ xinh xắn, thiết kế siết eo giả corset tôn nét quý tộc."
        },
        { 
            id: "dam4", 
            type: "dam", 
            name: "Đầm midi cổ bẻ phối vạt nơ thắt điệu đà", 
            price: 820000, 
            oldPrice: null, 
            img: "images/SPNB9.jpg", 
            gallery: ["images/SPNB9.jpg", "images/SPNB9_matsau.jpg", "images/SPNB9_cancanh.jpg"],
            rating: 4.9, sold: 180, sizes: ["M", "L"], 
            colors: ["Trắng", "Be"], stock: 30,
            description: "Thiết kế thanh lịch chuẩn quý cô công sở với dáng váy chữ A xòe nhẹ. Cổ bẻ phối dải nơ dài dọc thân áo tạo nét chấm phá sang trọng, tinh tế."
        },
        { 
            id: "dam5", 
            type: "dam", 
            name: "Đầm midi gấm trắng cổ trụ họa tiết chìm", 
            price: 1150000, 
            oldPrice: 1450000, 
            img: "images/SPNB11.jpg", 
            gallery: ["images/SPNB11.jpg", "images/SPNB11_matsau.jpg", "images/SPNB11_cancanh.jpg"],
            rating: 5.0, sold: 95, sizes: ["S", "M"], 
            colors: ["Trắng"], stock: 12,
            description: "Vẻ đẹp đài các được thể hiện qua chất liệu gấm dập họa tiết hoa chìm sang trọng. Cổ trụ hơi hướng Á Đông và tùng váy dài mang đến sự trang nhã tuyệt đối."
        },
        { 
            id: "dam6", 
            type: "dam", 
            name: "Đầm mini dáng suông viền lượn sóng", 
            price: 680000, 
            oldPrice: 790000, 
            img: "images/SPNB12.jpg", 
            gallery: ["images/SPNB12.jpg", "images/SPNB12_matsau.jpg", "images/SPNB12_cancanh.jpg"],
            rating: 4.7, sold: 420, sizes: ["S", "M", "L"], 
            colors: ["Trắng", "Be"], stock: 55,
            description: "Form dáng suông thoải mái, trẻ trung. Điểm nhấn nằm ở vạt áo lượn sóng cách điệu phối lớp váy mỏng nhẹ bên trong, tôn lên vẻ đẹp ngọt ngào."
        },
        { 
            id: "dam7", 
            type: "dam", 
            name: "Đầm gấm mini tay phồng cách điệu áo choàng", 
            price: 850000, 
            oldPrice: null, 
            img: "images/SPNB13.jpg", 
            gallery: ["images/SPNB13.jpg", "images/SPNB13_matsau.jpg", "images/SPNB13_cancanh.jpg"],
            rating: 4.9, sold: 150, sizes: ["S", "M"], 
            colors: ["Trắng", "Be"], stock: 25,
            description: "Chất liệu gấm cao cấp kết hợp tay phồng và thân trên cách điệu tựa một chiếc áo choàng nhỏ. Nút thắt cổ truyền thống mang lại nét Á Đông cuốn hút."
        },
        { 
            id: "dam8", 
            type: "dam", 
            name: "Đầm mini đỏ tay bồng voan tơ xếp ly", 
            price: 920000, 
            oldPrice: 1200000, 
            img: "images/SPNB14.jpg", 
            gallery: ["images/SPNB14.jpg", "images/SPNB14_matsau.jpg", "images/SPNB14_cancanh.jpg"],
            rating: 5.0, sold: 280, sizes: ["M", "L"], 
            colors: ["Đỏ"], stock: 18,
            description: "Sắc đỏ nổi bật rực rỡ. Phần tay dài làm từ voan tơ xuyên thấu bồng bềnh cùng chi tiết thắt nơ cổ, cực kỳ phù hợp cho những đêm tiệc hay dịp lễ hội."
        },
        { 
            id: "dam9", 
            type: "dam", 
            name: "Đầm mini voan thêu hoa nhí xếp tầng", 
            price: 790000, 
            oldPrice: null, 
            img: "images/SPNB15.jpg", 
            gallery: ["images/SPNB15.jpg", "images/SPNB15_matsau.jpg", "images/SPNB15_cancanh.jpg"],
            rating: 4.8, sold: 510, sizes: ["S", "M", "L"], 
            colors: ["Hồng"], stock: 60,
            description: "Ngọt ngào tựa nàng thơ với tone hồng phấn. Họa tiết hoa thêu nổi bật trên vải, kết hợp tùng váy xếp tầng bèo nhún vô cùng duyên dáng."
        },
        { 
            id: "dam10", 
            type: "dam", 
            name: "Đầm vest đỏ cổ 2 ve xếp ly eo", 
            price: 1250000, 
            oldPrice: 1500000, 
            img: "images/SPNB16.jpg", 
            gallery: ["images/SPNB16.jpg", "images/SPNB16_matsau.jpg", "images/SPNB16_cancanh.jpg"],
            rating: 5.0, sold: 110, sizes: ["S", "M"], 
            colors: ["Đỏ"], stock: 15,
            description: "Sự kết hợp hoàn hảo giữa vẻ đẹp quyền lực và nữ tính. Thiết kế cổ vest 2 ve, hàng khuy nổi bật cùng chân váy xếp ly dài qua gối cực kỳ sang trọng."
        },
        // --- 2. ÁO (10 SẢN PHẨM) ---
        { 
    id: "ao1", type: "ao", name: "Áo sơ mi cổ đức gài khuy basic", price: 550000, oldPrice: null, 
    img: "images/SPNB3.jpg", gallery: ["images/SPNB3.jpg"], 
    rating: 4.8, sold: 120, sizes: ["S", "M"], colors: ["Trắng", "Be"], stock: 30,
    description: "Áo sơ mi cổ đức với chất vải cao cấp, giữ form tốt. Thiết kế tối giản, dễ dàng mix-match cho môi trường công sở." 
},
{ 
    id: "ao2", type: "ao", name: "Áo sơ mi voan kính bèo cổ nhẹ nhàng", price: 620000, oldPrice: 750000, 
    img: "images/SPNB10.jpg", gallery: ["images/SPNB10.jpg"], 
    rating: 4.9, sold: 95, sizes: ["S", "M"], colors: ["Xanh"], stock: 20,
    description: "Chất liệu voan kính mềm mại với chi tiết bèo nhún nhẹ nhàng ở cổ và tay áo, tạo vẻ ngoài bay bổng, tinh tế." 
},
{ 
    id: "ao3", type: "ao", name: "Áo vest cộc tay phối cổ sen tiểu thư", price: 850000, oldPrice: 1050000, 
    img: "images/SPNB17.jpg", gallery: ["images/SPNB17.jpg"], 
    rating: 5.0, sold: 85, sizes: ["S", "M"], colors: ["Be"], stock: 15,
    description: "Sự kết hợp giữa nét cứng cáp của vest và sự dịu dàng của cổ sen. Một thiết kế ấn tượng cho những buổi gặp mặt trang trọng." 
},
{ 
    id: "ao4", type: "ao", name: "Áo sơ mi lụa cổ chéo sang trọng", price: 680000, oldPrice: null, 
    img: "images/SPNB18.jpg", gallery: ["images/SPNB18.jpg"], 
    rating: 4.9, sold: 210, sizes: ["S", "M", "L"], colors: ["Trắng"], stock: 35,
    description: "Chi tiết cổ chéo tạo hiệu ứng thị giác thon gọn, kết hợp với tay bồng nhẹ nhàng mang lại vẻ đẹp thanh tao." 
},
{ 
    id: "ao5", type: "ao", name: "Áo peplum cúc nổi thời thượng", price: 790000, oldPrice: 950000, 
    img: "images/SPNB19.jpg", gallery: ["images/SPNB19.jpg"], 
    rating: 4.8, sold: 130, sizes: ["S", "M"], colors: ["Be"], stock: 25,
    description: "Form áo peplum giúp tôn vòng eo hiệu quả. Hàng cúc nổi tạo điểm nhấn thu hút, rất phù hợp diện cùng chân váy cùng tone." 
},
{ 
    id: "ao6", type: "ao", name: "Áo vest cộc tay cổ phối tương phản", price: 920000, oldPrice: null, 
    img: "images/SPNB20.jpg", gallery: ["images/SPNB20.jpg"], 
    rating: 5.0, sold: 75, sizes: ["S", "M"], colors: ["Đỏ"], stock: 10,
    description: "Thiết kế vest cộc tay phá cách với phần cổ phối màu tương phản, mang lại phong cách hiện đại và đầy cá tính." 
},
{ 
    id: "ao7", type: "ao", name: "Áo vest chiết eo cổ đứng tinh tế", price: 950000, oldPrice: 1150000, 
    img: "images/SPNB21.jpg", gallery: ["images/SPNB21.jpg"], 
    rating: 4.9, sold: 60, sizes: ["S", "M"], colors: ["Đỏ"], stock: 12,
    description: "Đường cắt cúp chiết eo tỉ mỉ, kết hợp cổ đứng tạo nên hình ảnh chuyên nghiệp và sang trọng cho quý cô văn phòng." 
},
{ 
    id: "ao8", type: "ao", name: "Áo khoác vest cổ tròn thanh lịch", price: 880000, oldPrice: null, 
    img: "images/SPNB22.jpg", gallery: ["images/SPNB22.jpg"], 
    rating: 4.7, sold: 140, sizes: ["S", "M", "L"], colors: ["Hồng"], stock: 22,
    description: "Áo khoác vest form dáng nhẹ nhàng với cổ tròn, tone hồng pastel nữ tính, phù hợp cho những ngày thời tiết se lạnh." 
},
{ 
    id: "ao9", type: "ao", name: "Áo len mỏng kẻ ngang cổ tròn", price: 420000, oldPrice: 550000, 
    img: "images/SPNB23.jpg", gallery: ["images/SPNB23.jpg"], 
    rating: 4.6, sold: 480, sizes: ["S", "M", "L"], colors: ["Trắng", "Xanh"], stock: 70,
    description: "Áo len dệt kim mỏng nhẹ với họa tiết kẻ ngang kinh điển, sự lựa chọn thoải mái và trẻ trung cho mọi set đồ." 
},
{ 
    id: "ao10", type: "ao", name: "Áo peplum quây cổ yếm thời trang", price: 720000, oldPrice: 850000, 
    img: "images/SPNB24.jpg", gallery: ["images/SPNB24.jpg"], 
    rating: 4.9, sold: 160, sizes: ["S", "M"], colors: ["Trắng"], stock: 28,
    description: "Thiết kế độc đáo với phần cổ yếm, tạo vẻ ngoài cuốn hút và khác biệt, lý tưởng để mặc cùng quần suông ống rộng." 
},
        // --- 3. QUẦN (10 SẢN PHẨM) ---
        { 
    id: "quan1", type: "quan", name: "Quần ống rộng lụa xốp cạp cao", price: 650000, oldPrice: 800000, 
    img: "images/SPNB4.jpg", gallery: ["images/SPNB4.jpg"], 
    rating: 4.9, sold: 150, sizes: ["S", "M", "L"], colors: ["Trắng", "Be"], stock: 40,
    description: "Quần ống rộng chất lụa xốp mềm mại, cạp cao tôn dáng, mang lại cảm giác thoải mái và sang trọng cho người mặc." 
},
{ 
    id: "quan2", type: "quan", name: "Quần âu ống đứng thanh lịch", price: 580000, oldPrice: null, 
    img: "images/SPNB25.jpg", gallery: ["images/SPNB25.jpg"], 
    rating: 4.8, sold: 110, sizes: ["S", "M"], colors: ["Đen"], stock: 35,
    description: "Mẫu quần âu ống đứng kinh điển, form dáng chuẩn mực, là item không thể thiếu trong tủ đồ công sở của mọi quý cô." 
},
{ 
    id: "quan3", type: "quan", name: "Quần tây ống rộng cạp cao phối thắt lưng", price: 620000, oldPrice: 750000, 
    img: "images/SPNB26.jpg", gallery: ["images/SPNB26.jpg"], 
    rating: 4.9, sold: 90, sizes: ["S", "M", "L"], colors: ["Be", "Trắng"], stock: 25,
    description: "Quần tây ống rộng với thiết kế cạp cao, kèm chi tiết thắt lưng tinh tế giúp vòng eo trông thon gọn hơn." 
},
{ 
    id: "quan4", type: "quan", name: "Quần âu ống đứng đỏ đô", price: 650000, oldPrice: null, 
    img: "images/SPNB27.jpg", gallery: ["images/SPNB27.jpg"], 
    rating: 4.7, sold: 80, sizes: ["S", "M"], colors: ["Đỏ"], stock: 15,
    description: "Sắc đỏ đô nổi bật, kiểu dáng ống đứng hiện đại giúp đôi chân trông dài và thẳng hơn." 
},
{ 
    id: "quan5", type: "quan", name: "Quần tây đỏ phối khuy cài", price: 690000, oldPrice: 850000, 
    img: "images/SPNB28.jpg", gallery: ["images/SPNB28.jpg"], 
    rating: 4.8, sold: 70, sizes: ["S", "M"], colors: ["Đỏ"], stock: 12,
    description: "Thiết kế quần tây phá cách với hàng khuy cài độc đáo, tạo nên tổng thể ấn tượng và thời thượng." 
},
{ 
    id: "quan6", type: "quan", name: "Quần short ống rộng cạp cao", price: 450000, oldPrice: 550000, 
    img: "images/SPNB29.jpg", gallery: ["images/SPNB29.jpg"], 
    rating: 4.9, sold: 200, sizes: ["S", "M"], colors: ["Trắng"], stock: 50,
    description: "Quần short ống rộng với chi tiết nơ thắt tinh tế ở gấu quần, mang đến vẻ ngoài trẻ trung và nữ tính." 
},
{ 
    id: "quan7", type: "quan", name: "Quần short ống rộng họa tiết kẻ", price: 480000, oldPrice: null, 
    img: "images/SPNB30.jpg", gallery: ["images/SPNB30.jpg"], 
    rating: 4.7, sold: 130, sizes: ["S", "M", "L"], colors: ["Trắng", "Đen"], stock: 30,
    description: "Quần short họa tiết kẻ ngang sành điệu, chất vải đứng form, phù hợp cho những buổi dạo phố năng động." 
},
{ 
    id: "quan8", type: "quan", name: "Quần tây ống đứng cạp cao màu kem", price: 590000, oldPrice: 700000, 
    img: "images/SPNB31.jpg", gallery: ["images/SPNB31.jpg"], 
    rating: 4.8, sold: 100, sizes: ["S", "M"], colors: ["Be"], stock: 25,
    description: "Quần tây tông màu kem nhã nhặn, chất liệu vải cao cấp, tạo cảm giác thanh lịch và chuyên nghiệp." 
},
{ 
    id: "quan9", type: "quan", name: "Quần short ống rộng dáng váy", price: 520000, oldPrice: null, 
    img: "images/SPNB32.jpg", gallery: ["images/SPNB32.jpg"], 
    rating: 4.9, sold: 155, sizes: ["S", "M"], colors: ["Xanh"], stock: 20,
    description: "Thiết kế quần short cách điệu dáng váy, phối bèo nhún nhẹ ở gấu, là lựa chọn hoàn hảo cho phong cách tiểu thư." 
},
        // --- 4. CHÂN VÁY (10 SẢN PHẨM) ---
        { 
    id: "cv1", type: "chanvay", name: "Chân váy dài xếp ly cạp cao", price: 620000, oldPrice: 750000, 
    img: "images/SPNB7.jpg", gallery: ["images/SPNB7.jpg"], 
    rating: 4.9, sold: 180, sizes: ["S", "M"], colors: ["Trắng", "Be"], stock: 35,
    description: "Chân váy dáng dài thướt tha, chất liệu cao cấp tạo độ rủ tự nhiên, mang lại vẻ đẹp dịu dàng và thanh thoát." 
},
{ 
    id: "cv2", type: "chanvay", name: "Chân váy ngắn xếp tầng bèo", price: 450000, oldPrice: null, 
    img: "images/SPNB34.jpg", gallery: ["images/SPNB34.jpg"], 
    rating: 4.8, sold: 220, sizes: ["S", "M", "L"], colors: ["Trắng"], stock: 50,
    description: "Thiết kế chân váy xếp tầng bèo điệu đà, phong cách tiểu thư ngọt ngào, phù hợp cho những buổi tiệc trà." 
},
{ 
    id: "cv3", type: "chanvay", name: "Chân váy ngắn dáng chữ A cổ điển", price: 380000, oldPrice: 480000, 
    img: "images/SPNB35.jpg", gallery: ["images/SPNB35.jpg"], 
    rating: 4.7, sold: 300, sizes: ["S", "M"], colors: ["Trắng"], stock: 65,
    description: "Chân váy chữ A basic, kiểu dáng thanh lịch và dễ phối đồ, là item không thể thiếu trong tủ đồ hàng ngày." 
},
{ 
    id: "cv4", type: "chanvay", name: "Chân váy ngắn dáng xòe tiểu thư", price: 420000, oldPrice: null, 
    img: "images/SPNB36.jpg", gallery: ["images/SPNB36.jpg"], 
    rating: 4.9, sold: 160, sizes: ["S", "M"], colors: ["Trắng"], stock: 40,
    description: "Chân váy dáng xòe nhẹ nhàng, tạo nét duyên dáng, tinh khôi, rất thích hợp để mặc đi chơi hoặc đi hẹn hò." 
},
{ 
    id: "cv5", type: "chanvay", name: "Chân váy ngắn dáng ôm họa tiết hoa nổi", price: 550000, oldPrice: 680000, 
    img: "images/SPNB37.jpg", gallery: ["images/SPNB37.jpg"], 
    rating: 4.8, sold: 90, sizes: ["S", "M", "L"], colors: ["Đen"], stock: 20,
    description: "Chân váy dáng ôm nhẹ với họa tiết hoa nổi tinh tế, mang lại phong cách sang trọng và cuốn hút." 
},
{ 
    id: "cv6", type: "chanvay", name: "Chân váy midi dáng chữ A cúc cài", price: 590000, oldPrice: null, 
    img: "images/SPNB38.jpg", gallery: ["images/SPNB38.jpg"], 
    rating: 5.0, sold: 110, sizes: ["S", "M"], colors: ["Đen"], stock: 30,
    description: "Chân váy midi dáng chữ A với hàng cúc cài dọc phía trước, phong cách retro nhưng vẫn hiện đại và thanh lịch." 
},
{ 
    id: "cv7", type: "chanvay", name: "Chân váy midi dáng ôm xẻ tà", price: 550000, oldPrice: 650000, 
    img: "images/SPNB39.jpg", gallery: ["images/SPNB39.jpg"], 
    rating: 4.9, sold: 140, sizes: ["S", "M", "L"], colors: ["Đen"], stock: 25,
    description: "Chân váy midi ôm sát tôn đường cong, chi tiết xẻ tà tinh tế tạo điểm nhấn quyến rũ cho phái đẹp." 
},
{ 
    id: "cv8", type: "chanvay", name: "Chân váy ngắn chữ A chất liệu dày dặn", price: 420000, oldPrice: null, 
    img: "images/SPNB40.jpg", gallery: ["images/SPNB40.jpg"], 
    rating: 4.7, sold: 200, sizes: ["S", "M"], colors: ["Trắng"], stock: 45,
    description: "Chân váy ngắn dáng chữ A, chất liệu vải dày dặn giữ form cực tốt, dễ dàng phối cùng sơ mi hoặc áo kiểu." 
},
{ 
    id: "cv9", type: "chanvay", name: "Chân váy ngắn ôm phối túi hai bên", price: 390000, oldPrice: 490000, 
    img: "images/SPNB41.jpg", gallery: ["images/SPNB41.jpg"], 
    rating: 4.8, sold: 175, sizes: ["S", "M", "L"], colors: ["Trắng"], stock: 55,
    description: "Chân váy ôm ngắn năng động, chi tiết túi phối phía trước tiện lợi và tạo nét cá tính." 
},
{ 
    id: "cv10", type: "chanvay", name: "Chân váy midi dáng xòe tối giản", price: 650000, oldPrice: null, 
    img: "images/SPNB42.jpg", gallery: ["images/SPNB42.jpg"], 
    rating: 5.0, sold: 85, sizes: ["S", "M"], colors: ["Trắng"], stock: 20,
    description: "Chân váy midi dáng xòe tối giản, tone trắng thanh lịch, là mảnh ghép hoàn hảo cho mọi set đồ nhẹ nhàng." 
},
// --- 5. ÁO KHOÁC (CẬP NHẬT THEO ẢNH THỰC TẾ) ---
{ 
    id: "ak1", type: "aokhoac", name: "Áo Blazer kẻ dạ dáng lỡ", price: 1250000, oldPrice: 1550000, 
    img: "images/SPNB26.jpg", gallery: ["images/SPNB26.jpg"], 
    rating: 5.0, sold: 120, sizes: ["S", "M"], colors: ["Xám", "Đen"], stock: 15,
    description: "Blazer kẻ dạ form đứng, điểm nhấn logo thêu tinh tế tạo vẻ ngoài hiện đại và chuyên nghiệp." 
},
{ 
    id: "ak2", type: "aokhoac", name: "Áo vest blazer chiết eo sang trọng", price: 1150000, oldPrice: 1350000, 
    img: "images/SPNB30.jpg", gallery: ["images/SPNB30.jpg"], 
    rating: 4.9, sold: 95, sizes: ["S", "M"], colors: ["Be", "Trắng"], stock: 18,
    description: "Thiết kế vest blazer ôm eo tôn dáng, chất vải đứng form, phù hợp cho những cuộc họp quan trọng." 
},
{ 
    id: "ak3", type: "aokhoac", name: "Áo khoác Tweed dáng lửng phối khuy ngọc", price: 1350000, oldPrice: 1600000, 
    img: "images/SPNB49.jpg", gallery: ["images/SPNB49.jpg"], 
    rating: 5.0, sold: 210, sizes: ["S", "M"], colors: ["Trắng"], stock: 12,
    description: "Áo khoác Tweed cao cấp với khuy ngọc đính nổi, mang đậm hơi thở thời trang Pháp cổ điển và sang trọng." 
},
{ 
    id: "ak4", type: "aokhoac", name: "Áo khoác dạ Tweed dáng dài phối viền", price: 1450000, oldPrice: 1750000, 
    img: "images/SPNB50.jpg", gallery: ["images/SPNB50.jpg"], 
    rating: 4.9, sold: 85, sizes: ["S", "M", "L"], colors: ["Be", "Hồng"], stock: 15,
    description: "Áo khoác dạ Tweed tiểu thư với viền phối màu tinh tế, chất liệu dày dặn giữ ấm tốt nhưng vẫn đảm bảo nét thời trang." 
},
{ 
    id: "ak5", type: "aokhoac", name: "Áo Blazer cổ vest hai hàng khuy", price: 1100000, oldPrice: null, 
    img: "images/SPNB47.jpg", gallery: ["images/SPNB47.jpg"], 
    rating: 4.8, sold: 150, sizes: ["S", "M"], colors: ["Be", "Xám"], stock: 20,
    description: "Thiết kế Blazer 2 hàng khuy với đai lưng da tạo điểm nhấn eo quyến rũ, phong cách menswear lịch lãm." 
},
{ 
    id: "ak6", type: "aokhoac", name: "Áo vest phối khuy đồng hiện đại", price: 1050000, oldPrice: 1250000, 
    img: "images/SPNB21.jpg", gallery: ["images/SPNB21.jpg"], 
    rating: 4.9, sold: 130, sizes: ["S", "M", "L"], colors: ["Đỏ"], stock: 22,
    description: "Áo vest cổ đứng phong cách hiện đại với hàng khuy đồng dọc thân áo, tạo vẻ ngoài quyền lực và nổi bật." 
},
{ 
    id: "ak7", type: "aokhoac", name: "Áo khoác lửng phong cách Chanel", price: 1280000, oldPrice: 1490000, 
    img: "images/SPNB46.jpg", gallery: ["images/SPNB46.jpg"], 
    rating: 5.0, sold: 105, sizes: ["S", "M"], colors: ["Be", "Nâu"], stock: 18,
    description: "Áo khoác chất liệu dạ tweed với đường may sắc sảo, phong cách Chanel vượt thời gian, là món đồ phải có trong tủ đồ." 
},
{ 
    id: "ak8", type: "aokhoac", name: "Áo Blazer cổ 2 ve dáng dài", price: 1180000, oldPrice: null, 
    img: "images/SPNB45.jpg", gallery: ["images/SPNB45.jpg"], 
    rating: 4.8, sold: 140, sizes: ["S", "M"], colors: ["Đen", "Be"], stock: 25,
    description: "Blazer cổ 2 ve basic nhưng vô cùng sang trọng, thiết kế dáng dài phối cùng đai lưng tạo sự chuyên nghiệp." 
},
{ 
    id: "ak9", type: "aokhoac", name: "Áo khoác Tweed phối túi nổi", price: 1220000, oldPrice: 1400000, 
    img: "images/SPNB44.jpg", gallery: ["images/SPNB44.jpg"], 
    rating: 4.9, sold: 190, sizes: ["S", "M"], colors: ["Trắng"], stock: 28,
    description: "Áo khoác tweed phối túi nắp nổi bật, kiểu dáng trẻ trung dễ kết hợp cùng chân váy xếp ly." 
},
{ 
    id: "ak10", type: "aokhoac", name: "Áo khoác Blazer form rộng thêu logo", price: 1080000, oldPrice: 1250000, 
    img: "images/SPNB43.jpg", gallery: ["images/SPNB43.jpg"], 
    rating: 4.7, sold: 165, sizes: ["S", "M", "L"], colors: ["Trắng"], stock: 35,
    description: "Blazer form rộng thoải mái với logo thương hiệu thêu tinh tế, mang lại phong cách năng động và thời thượng." 
},
        // --- 6. TÚI XÁCH ---
{ 
    id: "tx1", type: "tuixach", name: "Túi xách tay da sần sang trọng", price: 950000, oldPrice: 1200000, 
    img: "images/SPNB51.jpg", gallery: ["images/SPNB51.jpg"], 
    rating: 4.9, sold: 130, sizes: ["Freesize"], colors: ["Nâu"], stock: 20,
    description: "Túi xách thiết kế tối giản, chất liệu da sần cao cấp cùng khóa kim loại sáng bóng, phù hợp cho môi trường công sở." 
},
{ 
    id: "tx2", type: "tuixach", name: "Túi xách họa tiết monogram kinh điển", price: 1100000, oldPrice: 1400000, 
    img: "images/SPNB52.jpg", gallery: ["images/SPNB52.jpg"], 
    rating: 4.8, sold: 250, sizes: ["Freesize"], colors: ["Nâu"], stock: 15,
    description: "Túi xách họa tiết monogram sang trọng, kiểu dáng thời thượng, dễ dàng phối hợp với nhiều phong cách thời trang." 
},
{ 
    id: "tx3", type: "tuixach", name: "Túi xách kẹp nách họa tiết vintage", price: 850000, oldPrice: 1000000, 
    img: "images/SPNB53.jpg", gallery: ["images/SPNB53.jpg"], 
    rating: 4.7, sold: 180, sizes: ["Freesize"], colors: ["Nâu"], stock: 25,
    description: "Túi kẹp nách phong cách vintage với họa tiết bắt mắt, thiết kế nhỏ gọn, phù hợp cho những buổi dạo phố." 
},

// --- 7. PHỤ KIỆN ---
{ 
    id: "pk1", type: "phukien", name: "Móc khóa hình sao đính đá", price: 150000, oldPrice: null, 
    img: "images/SPNB54.jpg", gallery: ["images/SPNB54.jpg"], 
    rating: 4.9, sold: 300, sizes: ["Freesize"], colors: ["Hồng"], stock: 50,
    description: "Móc khóa hình sao đáng yêu được đính đá lấp lánh, tạo điểm nhấn nổi bật cho túi xách." 
},
{ 
    id: "pk2", type: "phukien", name: "Móc khóa hình nhện độc đáo", price: 180000, oldPrice: null, 
    img: "images/SPNB55.jpg", gallery: ["images/SPNB55.jpg"], 
    rating: 4.6, sold: 120, sizes: ["Freesize"], colors: ["Vàng"], stock: 30,
    description: "Móc khóa thiết kế hình nhện phong cách, chất liệu kim loại cao cấp, dành cho những người thích sự cá tính." 
},
{ 
    id: "pk3", type: "phukien", name: "Móc khóa bao da AirTag", price: 200000, oldPrice: null, 
    img: "images/SPNB56.jpg", gallery: ["images/SPNB56.jpg"], 
    rating: 4.8, sold: 150, sizes: ["Freesize"], colors: ["Nâu"], stock: 40,
    description: "Móc khóa bao da bảo vệ AirTag tinh tế, thiết kế nhỏ gọn và sang trọng." 
},

// --- 8. GIÀY ---
{ 
    id: "g1", type: "giay", name: "Giày cao gót mũi nhọn đính đá", price: 890000, oldPrice: 1100000, 
    img: "images/SPNB57.jpg", gallery: ["images/SPNB57.jpg"], 
    rating: 5.0, sold: 95, sizes: ["36", "37", "38"], colors: ["Trắng"], stock: 15,
    description: "Giày cao gót mũi nhọn sang trọng với chi tiết đính đá lấp lánh, hoàn hảo cho các bữa tiệc." 
},
{ 
    id: "g2", type: "giay", name: "Giày cao gót basic mũi nhọn", price: 650000, oldPrice: 800000, 
    img: "images/SPNB58.jpg", gallery: ["images/SPNB58.jpg"], 
    rating: 4.8, sold: 200, sizes: ["35", "36", "37", "38"], colors: ["Be"], stock: 30,
    description: "Giày cao gót kiểu dáng basic, dễ phối đồ, form dáng ôm chân, mang lại sự tự tin cho phái đẹp." 
},
{ 
    id: "g3", type: "giay", name: "Giày cao gót mũi nhọn bóng", price: 720000, oldPrice: null, 
    img: "images/SPNB59.jpg", gallery: ["images/SPNB59.jpg"], 
    rating: 4.9, sold: 130, sizes: ["36", "37", "38", "39"], colors: ["Đỏ"], stock: 20,
    description: "Giày cao gót chất liệu bóng, nổi bật với màu đỏ sang trọng, thiết kế mũi nhọn tinh tế." 
}

    ];
/* LƯU DATABASE SẢN PHẨM ĐỂ TRANG GIỎ HÀNG DÙNG GỢI Ý PHỐI ĐỒ */
localStorage.setItem("bathora_products", JSON.stringify(tongHopSanPham));

    const grid = document.getElementById('productGrid');
    const paginationContainer = document.getElementById('paginationContainer'); // Bổ sung container phân trang
    
    // Khởi tạo biến theo dõi Phân trang
    let currentDataToRender = tongHopSanPham; // Dữ liệu đang được hiển thị
    let currentPage = 1;
    const itemsPerPage = 20; // Đổi thành 20 sản phẩm / trang

    /* ==========================================
       2. HÀM RENDER (TỰ ĐỘNG VẼ HTML + PHÂN TRANG SỐ)
       ========================================== */
    function renderProducts(products) {
        if (!grid) return;
        
        // Tính tổng số trang
        const totalPages = Math.ceil(products.length / itemsPerPage);
        
        // Tránh lỗi khi lọc dữ liệu ít đi khiến currentPage vượt quá số trang thực tế
        if (currentPage > totalPages && totalPages > 0) currentPage = 1;

        if (products.length === 0) {
            grid.innerHTML = `<h4 style="grid-column: 1/-1; text-align: center; color: #888; margin-top: 50px;">Không tìm thấy sản phẩm phù hợp.</h4>`;
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        // CẮT MẢNG: Lấy đúng số lượng của trang hiện tại (Phân trang thực sự)
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleProducts = products.slice(startIndex, endIndex);

        grid.innerHTML = visibleProducts.map(item => {
            let saleBadge = '';
            let priceOldHtml = '';
            if (item.oldPrice && item.oldPrice > item.price) {
                const percent = Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100);
                saleBadge = `<span class="sale-badge">-${percent}%</span>`;
                priceOldHtml = `<span class="price-old">${item.oldPrice.toLocaleString('vi-VN')}đ</span>`;
            }

            return `
                <div class="product-card" data-id="${item.id}" data-type="${item.type}" data-price="${item.price}">
                    <div class="product-img">
                        <img src="${item.img}" alt="${item.name}">
                        ${saleBadge}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${item.name}</h3>
                        <div class="price-heart-wrapper">
                            <div class="product-price">
                                <span class="price-current">${item.price.toLocaleString('vi-VN')}đ</span>
                                ${priceOldHtml}
                            </div>
                            <button class="wishlist-btn"><i class="fa-regular fa-heart heart-btn"></i></button>
                        </div>
                        <div class="product-meta d-flex justify-content-between align-items-center">
                            <div class="rating"><i class="fa-solid fa-star text-warning"></i> (${item.rating})</div>
                            <div class="sold-count">(${item.sold} đã bán)</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        renderCardHearts();

        // GỌI HÀM VẼ THANH PHÂN TRANG
        renderPagination(totalPages);
    }

    // HÀM MỚI: TẠO NÚT PHÂN TRANG (1, 2, 3... NEXT)
    function renderPagination(totalPages) {
        if (!paginationContainer) return;
        
        // Ẩn phân trang nếu chỉ có 1 trang
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let html = '';
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        const isLastPage = currentPage === totalPages;
        html += `<button class="next-btn" ${isLastPage ? 'disabled' : ''}>Next &rarr;</button>`;

        paginationContainer.innerHTML = html;

        // Bắt sự kiện khi click vào các con số (1, 2, 3...)
        const pageBtns = paginationContainer.querySelectorAll('.page-btn');
        pageBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                currentPage = parseInt(e.target.getAttribute('data-page'));
                renderProducts(currentDataToRender);
                // Tự động cuộn mượt mà lên đầu danh sách sản phẩm
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Bắt sự kiện khi click nút Next
        const nextBtn = paginationContainer.querySelector('.next-btn');
        if (nextBtn && !isLastPage) {
            nextBtn.addEventListener('click', () => {
                currentPage++;
                renderProducts(currentDataToRender);
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    /* ==========================================
       3. ĐỌC URL PARAMETERS (TỰ ĐỘNG LỌC ĐỦ MENU)
       ========================================== */
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategoryFromURL = urlParams.get('loai'); 

    if (selectedCategoryFromURL && selectedCategoryFromURL !== 'tatca') {
        currentDataToRender = tongHopSanPham.filter(item => item.type === selectedCategoryFromURL);
        
        const checkboxToTick = document.querySelector(`input.main-cat-filter[value="${selectedCategoryFromURL}"]`);
        if(checkboxToTick) checkboxToTick.checked = true;

        const titleMap = {
            'dam': 'ĐẦM NỮ CAO CẤP',
            'ao': 'ÁO KIỂU THỜI TRANG',
            'quan': 'QUẦN NỮ THANH LỊCH',
            'chanvay': 'CHÂN VÁY DẠO PHỐ',
            'aokhoac': 'ÁO KHOÁC MÙA ĐÔNG',
            'tuixach': 'TÚI XÁCH CAO CẤP',
            'phukien': 'PHỤ KIỆN TRANG SỨC',
            'giay': 'GIÀY NỮ THỜI TRANG'
        };
        const activeTitle = titleMap[selectedCategoryFromURL] || 'BỘ SƯU TẬP BATHORA';
        if(document.getElementById('pageTitleText')) document.getElementById('pageTitleText').innerText = activeTitle;
        if(document.getElementById('breadcrumbText')) document.getElementById('breadcrumbText').innerText = activeTitle;
    }

    renderProducts(currentDataToRender);

/* ==========================================
       4. LOGIC ẤN NÚT "ÁP DỤNG"
       ========================================== */
    const applyBtn = document.getElementById('applyFilterBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const checkedTypes = Array.from(document.querySelectorAll('.main-cat-filter:checked')).map(cb => cb.value);
            const priceVal = document.querySelector('input[name="price"]:checked') ? document.querySelector('input[name="price"]:checked').value : 'all';
            const checkedSizes = Array.from(document.querySelectorAll('.size-filter:checked')).map(cb => cb.value);
            const checkedColors = Array.from(document.querySelectorAll('.color-filter:checked')).map(cb => cb.value);

            currentDataToRender = tongHopSanPham.filter(item => {
                const matchType = checkedTypes.length === 0 || checkedTypes.includes(item.type);
                
                let matchPrice = false;
                if (priceVal === 'all') matchPrice = true;
                else if (priceVal === 'under500') matchPrice = item.price < 500000;
                else if (priceVal === '500to1000') matchPrice = item.price >= 500000 && item.price <= 1000000;
                else if (priceVal === 'over1000') matchPrice = item.price > 1000000;

                const itemSizes = item.sizes || [];
                const matchSize = checkedSizes.length === 0 || checkedSizes.some(s => itemSizes.includes(s));

                // === BẢN CẬP NHẬT: LOGIC LỌC MÀU SẮC LINH HOẠT ===
                const itemColors = item.colors || [];
                const matchColor = checkedColors.length === 0 || itemColors.some(productColor => {
                    return checkedColors.some(selected => 
                        // Chuyển về chữ thường và dùng includes để tìm từ khóa
                        productColor.toLowerCase().includes(selected.toLowerCase())
                    );
                });
                // ===================================================

                return matchType && matchPrice && matchSize && matchColor;
            });

            currentPage = 1; // RESET LẠI TRANG 1 KHI LỌC TÌM KIẾM MỚI
            renderProducts(currentDataToRender);
            
            const sidebar = document.getElementById('filterSidebar');
            if(sidebar) sidebar.classList.remove('open');
        });
    }

    /* ==========================================
       5. LOGIC SẮP XẾP CAO THẤP (SẮP XẾP MẢNG)
       ========================================== */
    const sortLinks = document.querySelectorAll('.sort-link');
    sortLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sortLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const sortType = this.dataset.sort;

            // Tiến hành sắp xếp lại mảng dữ liệu đang hiển thị
            if (sortType === 'asc') {
                currentDataToRender.sort((a, b) => a.price - b.price);
            } else if (sortType === 'desc') {
                currentDataToRender.sort((a, b) => b.price - a.price);
            } else {
                currentDataToRender.sort((a, b) => a.id.localeCompare(b.id)); // Mới nhất trả về mặc định
            }
            
            currentPage = 1; // RESET LẠI TRANG 1 ĐỂ TẢI TỪ ĐẦU THEO THỨ TỰ MỚI
            renderProducts(currentDataToRender);
        });
    });

    /* ==========================================
       6. GIỮ LẠI CÁC LOGIC CHUNG (TIM, MENU SCROLL)
       ========================================== */
    function renderCardHearts() {
        const favs = JSON.parse(localStorage.getItem('favorites')) || [];
        document.querySelectorAll('.product-card').forEach(card => {
            const btn = card.querySelector('.heart-btn');
            const isFav = favs.some(item => item.id === card.dataset.id);
            if (btn) btn.classList.toggle('active', isFav);
        });
        
        const wishlistBadge = document.getElementById("wishlist-badge");
        if (wishlistBadge) {
            wishlistBadge.innerText = favs.length;
            wishlistBadge.classList.toggle("d-none", favs.length === 0);
        }
    }

    document.addEventListener('click', e => {
        if (e.target.classList.contains('heart-btn')) {
            const card = e.target.closest('.product-card');
            const product = {
                id: card.dataset.id,
                name: card.querySelector('.product-title').innerText,
                price: card.dataset.price,
                img: card.querySelector('img').getAttribute('src')
            };

            let favs = JSON.parse(localStorage.getItem('favorites')) || [];
            const index = favs.findIndex(item => item.id === product.id);
            if (index === -1) favs.push(product);
            else favs.splice(index, 1);
            
            localStorage.setItem('favorites', JSON.stringify(favs));
            renderCardHearts();
        }
    });

    let lastScrollTop = 0;
    const header = document.querySelector(".header");
    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (!header) return;
        if (scrollTop <= 50) header.classList.remove("header-hidden");
        else if (scrollTop > lastScrollTop) header.classList.add("header-hidden");
        else header.classList.remove("header-hidden");
        lastScrollTop = scrollTop;
    });

    const btnOpen = document.getElementById('openMobileFilter');
    const btnClose = document.getElementById('closeMobileFilter');
    const sidebar = document.getElementById('filterSidebar');
    if (btnOpen && btnClose && sidebar) {
        btnOpen.addEventListener('click', () => sidebar.classList.add('open'));
        btnClose.addEventListener('click', () => sidebar.classList.remove('open'));
    }
});
// Tìm kiếm sản phẩm theo tên


