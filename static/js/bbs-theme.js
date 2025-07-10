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
const cards = document.querySelectorAll('.card');
cards.forEach(card => observer.observe(card));

const cards_bbs = document.querySelectorAll('.card-bbs');
cards_bbs.forEach(card => observer.observe(card));

// 显示贴文
document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/posts") // 后端对接
        .then(res => res.json())
        .then(data => {
            const cardList = document.querySelector(".card-list");

            data.forEach(post => {
                const card = document.createElement("div");
                card.className = "card-bbs";

                let topTag = post.top ? `<span class="bbs-top">置顶</span>` : "";
                card.innerHTML = `
            ${topTag}
            <a class="bbs-title" href="/article?id=${post.id}">${post.title}</a>
            <div class="bbs-meta">
              <a class="bbs-author" href="/user/${post.user_id}">
                <img class="bbs-avatar" src="${post.avatar}" alt="作者头像">
                ${post.author}
              </a>
              <span class="bbs-time">${post.timestamp}+8</span>
            </div>
          `;
                cardList.appendChild(card);
            });
        })
        .catch(err => {
            console.error("加载帖子失败：", err);
        });
});

// BBS右侧随机推荐
document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/posts")
        .then(res => res.json())
        .then(data => {
            const hotList = document.querySelector(".hot-list");
            hotList.innerHTML = ""; // 清空原有推荐

            // 随机打乱顺序
            const shuffled = data.sort(() => Math.random() - 0.5);

            // 取前3条（或不足3条就全部）
            const pick = shuffled.slice(0, 3);

            pick.forEach(post => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = `/article?id=${post.id}`;
                a.textContent = post.title;
                a.style.color = "inherit"; // 字体颜色继承
                a.style.textDecoration = "none"; // 去掉下划线
                li.appendChild(a);
                hotList.appendChild(li);
            });

        })
        .catch(err => {
            console.error("获取热议推荐失败：", err);
        });
});


