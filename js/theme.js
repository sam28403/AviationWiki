// 保存主题设置
function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById("themeBtn");

    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");

    btn.innerText = isDark ? "🌞" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

// 页面加载时读取设置
window.onload = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark");
        document.getElementById("themeBtn").innerText = "🌞";
    }
};

// 机场详细介绍展开
function toggleDetail(cardElement) {
    // 找到紧随其后的 .card-detail 元素
    const detail = cardElement.nextElementSibling;

    // 如果已经展开，点击关闭
    if (detail.style.display === 'block') {
        detail.style.display = 'none';
    } else {
        // 先关闭其他所有 detail
        document.querySelectorAll('.card-detail').forEach(el => el.style.display = 'none');
        detail.style.display = 'block';
    }
}
