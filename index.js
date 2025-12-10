function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
        return;
    }

    if (username === "giakhanh0311" && password === "khanh0311") {
        localStorage.setItem("userRole", "admin");
        localStorage.removeItem("guestPhone");
        window.location.href = "admin.html";
        return;
    }

    let khachData = JSON.parse(localStorage.getItem("khachThueData")) || [];
    let found = khachData.find(k => k.soDienThoai === username);

    if (found && password === username) {
        localStorage.setItem("userRole", "guest");
        localStorage.setItem("guestPhone", username);
        window.location.href = "guest.html";
        return;
    }

    alert("Tài khoản hoặc mật khẩu không đúng!");
}
