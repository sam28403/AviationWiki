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

// 主页底部照片轮播
function initSlideshow({
                           containerId,
                           imgId,
                           toggleId,
                           downloadId,
                           imgPath,
                           totalCount,
                           intervalMs = 5000,
                       }) {
    let img = document.getElementById(imgId);
    let current = 1;
    let isSliding = false;
    let isPaused = false;

    function showNextImage() {
        if (isSliding) return;
        isSliding = true;

        const next = new Image();
        next.src = `${imgPath}/${(current % totalCount) + 1}.jpg`;
        next.className = "center-img";
        next.style.transform = "translateX(100%)";

        const container = document.getElementById(containerId);
        container.appendChild(next);

        requestAnimationFrame(() => {
            img.style.transform = "translateX(-100%)";
            next.style.transform = "translateX(0)";
        });

        setTimeout(() => {
            container.removeChild(img);
            next.id = imgId;
            img = next;
            current = (current % totalCount) + 1;
            isSliding = false;
        }, 1000);
    }

    let interval = setInterval(showNextImage, intervalMs);

    const toggleBtn = document.getElementById(toggleId);
    const downloadBtn = document.getElementById(downloadId);

    toggleBtn.addEventListener("click", () => {
        if (isPaused) {
            interval = setInterval(showNextImage, intervalMs);
            toggleBtn.querySelector("span").textContent = "pause";
        } else {
            clearInterval(interval);
            toggleBtn.querySelector("span").textContent = "play_arrow";
        }
        isPaused = !isPaused;
    });

    downloadBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = img.src;
        //{{ url_for('static', filename='img/airlines.svg') }}
        link.download = `static/image-${current}.jpg`;
        link.click();
    });
}

initSlideshow({
    containerId: "slider1",
    imgId: "slideshow1",
    toggleId: "togglePlay1",
    downloadId: "downloadBtn1",
    
    imgPath: "static/img/C909",
    totalCount: 12,
    intervalMs: 5000
});

initSlideshow({
    containerId: "slider2",
    imgId: "slideshow2",
    toggleId: "togglePlay2",
    downloadId: "downloadBtn2",
    imgPath: "static/img/C919",
    totalCount: 14,
    intervalMs: 5000
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
