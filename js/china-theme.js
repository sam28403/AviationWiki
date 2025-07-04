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

//主页侧边栏收起展开控制
const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.querySelector('aside');
const container = document.querySelector('.container');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    container.classList.toggle('sidebar-collapsed');
});

// 页面加载后 若干ms 自动收起侧边栏，这么做为了让用户知道侧边栏的存在。
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        sidebar.classList.add('collapsed');
        container.classList.add('sidebar-collapsed');
    }, 700); // 这里改时间，单位为ms
});

// 以下是机场页面上关于点击弹出文本效果的改动
// 事件委托处理所有卡片点击
document.addEventListener('click', function(e) {
    // 查找被点击的卡片元素
    const card = e.target.closest('.card[data-modal-target]');
    if (card) {
        const modalId = card.dataset.modalTarget;
        const modalMask = document.getElementById(modalId);

        if (modalMask) {
            modalMask.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
});

// 处理遮罩层点击关闭
document.querySelectorAll('.modal-mask').forEach(mask => {
    mask.addEventListener('click', function(e) {
        if (e.target === mask) {
            closeModal(mask);
        }
    });
});

// 处理ESC键关闭
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-mask.active').forEach(mask => {
            closeModal(mask);
        });
    }
});

// 关闭模态框函数
function closeModal(modalMask) {
    if (modalMask) {
        modalMask.classList.remove('active');
        document.body.style.overflow = '';
    }
}


// 主页底部照片轮播
let img = document.getElementById("slideshow");  // 改为 let
// filename
let current = 1;
const total = 82;
let isSliding = false;

function showNextImage() {
    if (isSliding) return;
    isSliding = true;

    const next = new Image();
    next.src = `img/index/${(current % total) + 1}.jpg`; //path
    next.className = "center-img";
    next.style.transform = "translateX(100%)";

    const container = img.parentElement;
    container.appendChild(next);

    // 触发滑动动画
    requestAnimationFrame(() => {
        img.style.transform = "translateX(-100%)";
        next.style.transform = "translateX(0)";
    });

    // 动画结束后替换 img 引用
    setTimeout(() => {
        container.removeChild(img);
        next.id = "slideshow";
        img = next; // 更新引用！
        current = (current % total) + 1;
        isSliding = false;
    }, 1000); // 与 CSS 动画一致
}

// setInterval(showNextImage, 5000); // 废弃

// 轮播照片操作
let interval = setInterval(showNextImage, 5000);
let isPaused = false;

const toggleBtn2 = document.getElementById("togglePlay");
const downloadBtn = document.getElementById("downloadBtn");

toggleBtn2.addEventListener("click", () => {
    if (isPaused) {
        interval = setInterval(showNextImage, 5000);
        toggleBtn2.querySelector("span").textContent = "pause";
    } else {
        clearInterval(interval);
        toggleBtn2.querySelector("span").textContent = "play_arrow";
    }
    isPaused = !isPaused;
});

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = `【Sam-Lab】-image-${current}.jpg`;
    link.click();
});

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
const cards = document.querySelectorAll('.card');
cards.forEach(card => observer.observe(card));

const cards_bbs = document.querySelectorAll('.card-bbs');
cards_bbs.forEach(card => observer.observe(card));
