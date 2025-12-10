let coSoID = localStorage.getItem("coSoDangChon");
let tangID = localStorage.getItem("tangDangChon");

// tải dữ liệu khi mở trang
document.addEventListener("DOMContentLoaded", () => {
    loadTenTang();
    loadPhong();
});

// Hiển thị tên tầng
function loadTenTang() {
    let allTang = JSON.parse(localStorage.getItem("tangData")) || {};
    let dsTang = allTang[coSoID] || [];
    let found = dsTang.find(t => t.id == tangID);

    if (found) {
        document.getElementById("tenTangHeader").textContent = found.tenTang;
    }
}

// Tạo phòng
function taoPhong() {
    let soPhong = document.getElementById("soPhong").value;

    if (soPhong <= 0) return;

    let allPhong = JSON.parse(localStorage.getItem("phongData")) || {};

    if (!allPhong[tangID]) allPhong[tangID] = [];

    allPhong[tangID] = [];

    for (let i = 1; i <= soPhong; i++) {
        allPhong[tangID].push({
            id: Date.now() + i,
            tenPhong: "Phòng " + i
        });
    }

    localStorage.setItem("phongData", JSON.stringify(allPhong));

    loadPhong();
}

// Hiển thị danh sách phòng
function loadPhong() {
    let allPhong = JSON.parse(localStorage.getItem("phongData")) || {};
    let danhSach = allPhong[tangID] || [];

    let ul = document.getElementById("danhSachPhong");
    ul.innerHTML = "";

    danhSach.forEach(phong => {
        let li = document.createElement("li");
        li.className = "list-item";
        li.innerHTML = `
            <span>${phong.tenPhong}</span>
            <button onclick="moKhach(${phong.id})">Mở</button>
        `;
        ul.appendChild(li);
    });
}

// mở trang thông tin khách
function moKhach(idPhong) {
    localStorage.setItem("phongDangChon", idPhong);
    window.location.href = "khach.html";
}

// quay lại trang tầng
function quayLai() {
    window.location.href = "tang.html";
}

// đăng xuất
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
