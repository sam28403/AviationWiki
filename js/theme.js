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

 