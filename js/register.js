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

// Fade in
// 创建观察器
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in'); // 添加动画类
            observer.unobserve(entry.target); // 只触发一次
        }
    });
}, {
    threshold: 0.2 // 元素进入视口 20% 就触发
});

// 选中所有卡片
const cards = document.querySelectorAll('.login-container');
cards.forEach(card => observer.observe(card));



// 生成随机验证码
function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// 绘制验证码图像
function drawCaptcha(code) {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 40;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#333";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(code, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
}

let currentCaptcha = "";

function refreshCaptcha() {
    currentCaptcha = generateCaptcha();
    const image = drawCaptcha(currentCaptcha);
    document.getElementById("captchaImage").src = image;
}

// 初次加载验证码
refreshCaptcha();

// 点击刷新验证码
document.getElementById("captchaImage").addEventListener("click", refreshCaptcha);

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault(); // 阻止表单默认提交行为

    const pwd1 = document.getElementById("password1").value;
    const pwd2 = document.getElementById("password2").value;
    const inputCode = document.getElementById("captchaInput").value.trim().toUpperCase();

    // 验证密码一致性
    if (pwd1 !== pwd2) {
        alert("两次输入的密码不一致，请重新输入！");
        return;
    }

    // 验证验证码正确性
    if (inputCode !== currentCaptcha) {
        alert("验证码错误，请重新输入！");
        refreshCaptcha(); // 刷新验证码
        return;
    }

    // 所有验证通过
    alert("注册成功！（此处可接后端逻辑）");
    // TODO: 提交到后端或跳转页面
});
