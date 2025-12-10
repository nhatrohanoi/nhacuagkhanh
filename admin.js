// tải danh sách cơ sở khi mở trang
document.addEventListener("DOMContentLoaded", loadCoSo);

// Thêm cơ sở mới
function themCoSo() {
    let ten = document.getElementById("tenCoSo").value.trim();
    if (ten === "") return;

    let danhSach = JSON.parse(localStorage.getItem("coSoData")) || [];

    danhSach.push({
        id: Date.now(),
        ten: ten
    });

    localStorage.setItem("coSoData", JSON.stringify(danhSach));

    document.getElementById("tenCoSo").value = "";

    loadCoSo();
}

// Hiển thị danh sách cơ sở
function loadCoSo() {
    let danhSach = JSON.parse(localStorage.getItem("coSoData")) || [];
    let ul = document.getElementById("danhSachCoSo");

    ul.innerHTML = "";

    danhSach.forEach(item => {
        let li = document.createElement("li");
        li.className = "list-item";
        li.innerHTML = `
            <span>${item.ten}</span>
            <button onclick="moTang(${item.id})">Mở</button>
        `;
        ul.appendChild(li);
    });
}

// Chuyển sang trang tầng
function moTang(id) {
    localStorage.setItem("coSoDangChon", id);
    window.location.href = "tang.html";
}

// Đăng xuất
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
