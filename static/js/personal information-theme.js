// 以下是机场页面上关于点击弹出文本效果的改动
// 事件委托处理所有卡片点击
document.addEventListener('click', function(e) {
    // 任何带 data-modal-target 的元素都可以触发模态框
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
        const modalId = trigger.dataset.modalTarget;
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

function dropuser(){
    fetch('/drop_user', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'  // 表单提交的格式
    },
    body: new URLSearchParams({
        confirm:"yes"
    })
    })
    .then(response => response.json())
    .then(data => {
    if (data.success) {
        // 数据提交成功，跳转页面
        window.location.href = '/login';
    } else {
        alert('注销失败：' + data.message);
    }
    })
    .catch(error => {
    console.error('请求失败', error);
    });
}

function saveInfo() {
    // 保存照片
    const photoInput = document.getElementById('photo-input');
    const photoDisplay = document.getElementById('photo-display');
    if (photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photoDisplay.style.backgroundImage = `url(${e.target.result})`;
            photoDisplay.style.backgroundSize = 'cover';
        }
        reader.readAsDataURL(photoInput.files[0]);
    }


    const file = photoInput.files[0];
    if (file){
        const formData = new FormData();
        formData.append('photo', file);
        fetch('/upload_photo', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log('上传成功，路径：', data.path);
            } else {
                alert('上传失败：' + data.message);
            }
        })
        .catch(err => {
            console.error('请求失败', err);
        });
    }
    

    // 保存其他信息
    document.getElementById('name').textContent = document.getElementById('modal-name').value || '未填写';
    document.getElementById('title').textContent = document.getElementById('modal-title').value || '未填写';
    document.getElementById('birthday').textContent = document.getElementById('modal-birthday').value || '未填写';
    document.getElementById('address').textContent = document.getElementById('modal-address').value || '未填写';
    document.getElementById('airport').textContent = document.getElementById('modal-airport').value || '未填写';
    document.getElementById('favplane').textContent = document.getElementById('modal-favplane').value || '未填写';
    document.getElementById('favairport').textContent = document.getElementById('modal-favairport').value || '未填写';

    fetch('/edit_info', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'  // 表单提交的格式
    },
    body: new URLSearchParams({
        name:document.getElementById('modal-name').value || 'NULL',
        sex:document.getElementById('modal-title').value || 'NULL',
        birth:document.getElementById('modal-birthday').value || 'NULL',
        city:document.getElementById('modal-address').value || 'NULL',
        com_ap:document.getElementById('modal-airport').value || 'NULL',
        fav_aero:document.getElementById('modal-favplane').value || 'NULL',
        fav_ap:document.getElementById('modal-favairport').value || 'NULL'
    })
    })
    .then(response => response.json())
    .then(data => {
    if (data.success) {
        // 数据提交成功，跳转页面
        console.log("数据提交成功");
        
    } else {
        alert('数据提交失败：' + data.message);
    }
    })
    .catch(error => {
    console.error('请求失败', error);
    });
    
    
    alert('修改成功');
    const modalMask = document.getElementById('modalAAA');
    closeModal(modalMask);
    //window.location.href = '/personal-information';
}

function closeModalById(id) {
    const modalMask = document.getElementById(id);
    closeModal(modalMask);
    
}


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