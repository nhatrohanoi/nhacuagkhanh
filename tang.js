let coSoID = localStorage.getItem("coSoDangChon");

// Khi mở trang thì load danh sách tầng
document.addEventListener("DOMContentLoaded", () => {
    loadTenCoSo();
    loadTang();
});

// Lấy tên cơ sở hiển thị trên header
function loadTenCoSo() {
    let list = JSON.parse(localStorage.getItem("coSoData")) || [];
    let found = list.find(cs => cs.id == coSoID);
    if (found) {
        document.getElementById("tenCoSoHeader").textContent = "Cơ sở: " + found.ten;
    }
}

// Tạo tầng tự động
function taoTang() {
    let soTang = document.getElementById("soTang").value;

    if (soTang <= 0) return;

    let allTang = JSON.parse(localStorage.getItem("tangData")) || {};

    if (!allTang[coSoID]) allTang[coSoID] = [];

    allTang[coSoID] = [];

    for (let i = 1; i <= soTang; i++) {
        allTang[coSoID].push({
            id: Date.now() + i,
            tenTang: "Tầng " + i
        });
    }

    localStorage.setItem("tangData", JSON.stringify(allTang));

    loadTang();
}

// Hiển thị danh sách tầng
function loadTang() {
    let allTang = JSON.parse(localStorage.getItem("tangData")) || {};
    let danhSach = allTang[coSoID] || [];

    let ul = document.getElementById("danhSachTang");
    ul.innerHTML = "";

    danhSach.forEach(tang => {
        let li = document.createElement("li");
        li.className = "list-item";
        li.innerHTML = `
            <span>${tang.tenTang}</span>
            <button onclick="moPhong(${tang.id})">Mở</button>
        `;
        ul.appendChild(li);
    });
}

// Mở quản lý phòng
function moPhong(idTang) {
    localStorage.setItem("tangDangChon", idTang);
    window.location.href = "phong.html";
}

// Quay lại trang cơ sở
function quayLai() {
    window.location.href = "admin.html";
}

// Đăng xuất
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
