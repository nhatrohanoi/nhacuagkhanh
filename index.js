// Tài khoản admin mặc định
const ADMIN_USER = "giakhanh0311";
const ADMIN_PASS = "khanh0311";

// hàm đăng nhập
function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const error = document.getElementById("login-error");

    error.textContent = "";

    // --- KIỂM TRA ADMIN ---
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem("currentUser", "admin");
        window.location.href = "admin.html";
        return;
    }

    // --- KIỂM TRA KHÁCH ---
    let allData = JSON.parse(localStorage.getItem("khachThueData")) || [];

    // tìm khách theo số điện thoại
    let found = allData.find(khach => khach.soDienThoai == user);

    if (!found) {
        error.textContent = "Không tìm thấy tài khoản khách!";
        return;
    }

    // mật khẩu của khách = số điện thoại
    if (pass !== user) {
        error.textContent = "Sai mật khẩu!";
        return;
    }

    // lưu khách đang đăng nhập
    localStorage.setItem("currentUser", "guest");
    localStorage.setItem("guestPhone", user);

    window.location.href = "guest.html";  // chuyển sang giao diện khách
}
