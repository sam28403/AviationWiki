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

// // 机场详细介绍展开
// function toggleDetail(cardElement) {
//     // 找到紧随其后的 .card-detail 元素
//     const detail = cardElement.nextElementSibling;

//     // 如果已经展开，点击关闭
//     if (detail.style.display === 'block') {
//         detail.style.display = 'none';
//     } else {
//         // 先关闭其他所有 detail
//         document.querySelectorAll('.card-detail').forEach(el => el.style.display = 'none');
//         detail.style.display = 'block';
//     }
// }

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