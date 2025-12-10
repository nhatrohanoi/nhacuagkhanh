let phongID = localStorage.getItem("phongDangChon");

document.addEventListener("DOMContentLoaded", () => {
    loadPhongName();
    loadData();
});

function loadPhongName() {
    let allPhong = JSON.parse(localStorage.getItem("phongData")) || {};
    for (let tang in allPhong) {
        let f = allPhong[tang].find(p => p.id == phongID);
        if (f) {
            document.getElementById("tenPhong").innerText = f.tenPhong;
            break;
        }
    }
}

function loadData() {
    let data = JSON.parse(localStorage.getItem("khachThueData")) || [];
    let f = data.find(x => x.phongID == phongID);
    if (!f) return;

    for (let key in f) {
        if (document.getElementById(key))
            document.getElementById(key).value = f[key];
    }
}

function VND(n) {
    return Number(n).toLocaleString("vi-VN") + " VND";
}

function tinhTien() {

    let data = JSON.parse(localStorage.getItem("khachThueData")) || [];
    let f = data.find(x => x.phongID == phongID);
    if (!f) return;

    // Lấy dữ liệu
    let g = (id) => Number(document.getElementById(id).value || 0);

    let soNguoi = g("soNguoi");
    let tienThue = g("tienThue");

    let dv =
        ( g("tienNuoc") + g("tienGiat") + g("tienSay") + g("tienRac")
        + g("tienLocNuoc") + g("tienDonVeSinh") ) * soNguoi
        + g("tienWifi");

    let dienChung = ( g("dienChungMoi") - g("dienChungCu") ) * soNguoi;
    let dienPhong = g("ctPhongMoi") - g("ctPhongCu");

    let tong = tienThue + dv + dienChung + dienPhong;

    document.getElementById("ketQua").innerText = VND(tong);

    // Lưu
    for (let id of [
        "hoTen","soDienThoai","tienThue","soNguoi","soXe",
        "ctPhongCu","ctPhongMoi","dienChungCu","dienChungMoi",
        "tienNuoc","tienGiat","tienSay","tienWifi",
        "tienRac","tienLocNuoc","tienDonVeSinh"
    ]) {
        f[id] = document.getElementById(id).value;
    }

    localStorage.setItem("khachThueData", JSON.stringify(data));
}

function quayLai() {
    window.location.href = "phong.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
