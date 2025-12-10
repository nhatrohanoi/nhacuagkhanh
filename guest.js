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
    let ctPhongMoi = +document.getElementById("ctPhongMoi").value;
    let dcCu = +document.getElementById("dienChungCu").value;
    let dcMoi = +document.getElementById("dienChungMoi").value;

    let soNguoi = +f.soNguoi;

    // Dịch vụ do chủ nhà đặt
    let dv =
        ( +f.tienNuoc + +f.tienGiat + +f.tienSay +
          +f.tienRac + +f.tienLocNuoc + +f.tienDonVeSinh ) * soNguoi
        + +f.tienWifi;

    // Điện chung + phòng
    let dienChung = (dcMoi - dcCu) * soNguoi;
    let dienPhong = (ctPhongMoi - ctPhongCu);

    let tong = +f.tienThue + dv + dienChung + dienPhong;

    document.getElementById("ketQua").innerText = VND(tong);

    // Lưu lại công tơ cho tháng sau
    f.ctPhongCu = ctPhongCu;
    f.ctPhongMoi = ctPhongMoi;
    f.dienChungCu = dcCu;
    f.dienChungMoi = dcMoi;

    let all = JSON.parse(localStorage.getItem("khachThueData"));
    localStorage.setItem("khachThueData", JSON.stringify(all));
}

function copySTK() {
    navigator.clipboard.writeText("0200356789999");
    alert("Đã copy số tài khoản!");
}

function logout() {
    localStorage.removeItem("guestPhone");
    window.location.href = "index.html";
}
