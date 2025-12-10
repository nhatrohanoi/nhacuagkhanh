let phone = localStorage.getItem("guestPhone");

document.addEventListener("DOMContentLoaded", () => {
    loadData();
});

function loadData() {
    let data = JSON.parse(localStorage.getItem("khachThueData")) || [];
    let f = data.find(k => k.soDienThoai == phone);

    if (!f) return alert("Không tìm thấy thông tin khách!");

    window.data = f;

    document.getElementById("hoTen").value = f.hoTen;
    document.getElementById("soDienThoai").value = f.soDienThoai;
    document.getElementById("tienThue").value = f.tienThue;
    document.getElementById("soNguoi").value = f.soNguoi;
    document.getElementById("soXe").value = f.soXe;

    // 4 mục khách được sửa
    document.getElementById("ctPhongCu").value = f.ctPhongCu || 0;
    document.getElementById("ctPhongMoi").value = f.ctPhongMoi || 0;
    document.getElementById("dienChungCu").value = f.dienChungCu || 0;
    document.getElementById("dienChungMoi").value = f.dienChungMoi || 0;
}

function VND(num) {
    return Number(num).toLocaleString("vi-VN") + " VND";
}

function tinhTien() {

    let f = data;

    let ctPhongCu = +document.getElementById("ctPhongCu").value;
    let ctPhongMoi = +document.getElementById("ctPhongMoi").
