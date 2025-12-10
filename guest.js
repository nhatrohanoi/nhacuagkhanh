let phone = localStorage.getItem("guestPhone");

// Tải dữ liệu khi khách đăng nhập
document.addEventListener("DOMContentLoaded", () => {
    loadData();
});

// Load dữ liệu khách theo số điện thoại
function loadData() {
    let data = JSON.parse(localStorage.getItem("khachThueData")) || [];

    let found = data.find(k => k.soDienThoai == phone);

    if (!found) return alert("Không tìm thấy thông tin khách!");

    window.phongID = found.phongID; // lưu để tính tiền

    // Chỉ load dữ liệu lên giao diện (xem thôi)
    document.getElementById("hoTen").value = found.hoTen || "";
    document.getElementById("soDienThoai").value = found.soDienThoai || "";
    document.getElementById("tienThue").value = found.tienThue || "";
    document.getElementById("soNguoi").value = found.soNguoi || "";
    document.getElementById("soXe").value = found.soXe || "";

    document.getElementById("ctPhongCu").value = found.ctPhongCu || "";
    document.getElementById("ctPhongMoi").value = found.ctPhongMoi || "";
    document.getElementById("dienChungCu").value = found.dienChungCu || "";
    document.getElementById("dienChungMoi").value = found.dienChungMoi || "";

    // Các dịch vụ khách KHÔNG được chỉnh — không hiển thị luôn
}

// Tính tiền giống ở khach.js
function tinhTien() {
    let data = JSON.parse(localStorage.getItem("khachThueData")) || [];
    let found = data.find(k => k.phongID == phongID);

    if (!found) return;

    let soNguoi = +found.soNguoi;
    let tienThue = +found.tienThue;

    let dv =
        (+found.tienNuoc +
        +found.tienGiat +
        +found.tienSay +
        +found.tienRac +
        +found.tienLocNuoc +
        +found.tienDonVeSinh) * soNguoi
        + +found.tienWifi;

    let dienChung =
        (+document.getElementById("dienChungMoi").value -
        +document.getElementById("dienChungCu").value) * soNguoi;

    let dienPhong =
        (+document.getElementById("ctPhongMoi").value -
        +document.getElementById("ctPhongCu").value);

    let tong = tienThue + dv + dienChung + dienPhong;

    document.getElementById("ketQua").textContent =
        tong.toLocaleString("vi-VN") + " VND";

    // Lưu lại công tơ mới cho tháng sau
    found.ctPhongCu = document.getElementById("ctPhongCu").value;
    found.ctPhongMoi = document.getElementById("ctPhongMoi").value;
    found.dienChungCu = document.getElementById("dienChungCu").value;
    found.dienChungMoi = document.getElementById("dienChungMoi").value;

    localStorage.setItem("khachThueData", JSON.stringify(data));
}

function logout() {
    localStorage.removeItem("guestPhone");
    localStorage.removeItem("currentUser");
    window.locati
