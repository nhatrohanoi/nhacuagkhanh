let phongID = localStorage.getItem("phongDangChon");
let coSoID = localStorage.getItem("coSoDangChon");
let tangID = localStorage.getItem("tangDangChon");
let role = localStorage.getItem("currentUser"); // admin hoặc guest

document.addEventListener("DOMContentLoaded", () => {
    loadTenPhong();
    loadData();
    khoaChoKhach();
});

// Hiển thị tên phòng
function loadTenPhong() {
    let allPhong = JSON.parse(localStorage.getItem("phongData")) || {};
    let dsPhong = allPhong[tangID] || [];

    let found = dsPhong.find(p => p.id == phongID);

    if (found) {
        document.getElementById("tieuDePhong").textContent = found.tenPhong;
    }
}

// Load dữ liệu khách
function loadData() {
    let data = JSON.parse(localStorage.getItem("khachThueData")) || [];
    let found = data.find(k => k.phongID == phongID);

    if (!found) return;

    document.getElementById("hoTen").value = found.hoTen || "";
    document.getElementById("soDienThoai").value = found.soDienThoai || "";
    document.getElementById("tienThue").value = found.tienThue || "";
    document.getElementById("soNguoi").value = found.soNguoi || "";
    document.getElementById("soXe").value = found.soXe || "";
    document.getElementById("ctPhongCu").value = found.ctPhongCu || "";
    document.getElementById("ctPhongMoi").value = found.ctPhongMoi || "";
    document.getElementById("dienChungCu").value = found.dienChungCu || "";
    document.getElementById("dienChungMoi").value = found.dienChungMoi || "";

    document.getElementById("tienNuoc").value = found.tienNuoc || "";
    document.getElementById("tienGiat").value = found.tienGiat || "";
    document.getElementById("tienSay").value = found.tienSay || "";
    document.getElementById("tienWifi").value = found.tienWifi || "";
    document.getElementById("tienRac").value = found.tienRac || "";
    document.getElementById("tienLocNuoc").value = found.tienLocNuoc || "";
    document.getElementById("tienDonVeSinh").value = found.tienDonVeSinh || "";
}

// Khách chỉ được chỉnh công tơ
function khoaChoKhach() {
    if (role === "guest") {
        let allInputs = document.querySelectorAll("input");

        allInputs.forEach(ip => {
            ip.disabled = true;
        });

        // KHÁCH ĐƯỢC PHÉP SỬA:
        document.getElementById("ctPhongCu").disabled = false;
        document.getElementById("ctPhongMoi").disabled = false;
        document.getElementById("dienChungCu").disabled = false;
        document.getElementById("dienChungMoi").disabled = false;
    }
}

// Hàm tính tiền
function tinhTien() {
    let soNguoi = +so("soNguoi");
    let tienThue = +so("tienThue");

    let dv =
        (+so("tienNuoc") +
        +so("tienGiat") +
        +so("tienSay") +
        +so("tienRac") +
        +so("tienLocNuoc") +
        +so("tienDonVeSinh")) * soNguoi
        + +so("tienWifi");

    let dienChung = (+so("dienChungMoi") - +so("dienChungCu")) * soNguoi;
    let dienPhong = +so("ctPhongMoi") - +so("ctPhongCu");

    let tong = tienThue + dv + dienChung + dienPhong;

    document.getElementById("ketQua").textContent =
        tong.toLocaleString("vi-VN") + " VND";

    luuData();
}

// Hàm lấy input nhanh
function so(id) {
    return document.getElementById(id).value || 0;
}

// Lưu dữ liệu khách
function luuData() {
    let data = JSON.parse(localStorage.getItem("khachThueData")) || [];

    let found = data.find(k => k.phongID == phongID);

    if (!found) {
        found = { phongID };
        data.push(found);
    }

    // lưu tất cả thông tin
    [
        "hoTen","soDienThoai","tienThue","soNguoi","soXe",
        "ctPhongCu","ctPhongMoi","dienChungCu","dienChungMoi",
        "tienNuoc","tienGiat","tienSay","tienWifi","tienRac",
        "tienLocNuoc","tienDonVeSinh"
    ].forEach(id => {
        found[id] = document.getElementById(id).value;
    });

    localStorage.setItem("khachThueData", JSON.stringify(data));
}

function quayLai() {
    window.location.href = "phong.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
