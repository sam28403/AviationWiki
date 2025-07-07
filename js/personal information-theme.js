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


function saveInfo() {
    // 保存照片
    const photoInput = document.getElementById('photo-input');
    const photoDisplay = document.getElementById('photo-display');
    console.log("信息已保存");
    if (photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photoDisplay.style.backgroundImage = `url(${e.target.result})`;
            photoDisplay.style.backgroundSize = 'cover';
        }
        reader.readAsDataURL(photoInput.files[0]);
    }

    // 保存其他信息
    document.getElementById('name').textContent = document.getElementById('modal-name').value || 'NULL';
    document.getElementById('title').textContent = document.getElementById('modal-title').value || 'NULL';
    document.getElementById('birthday').textContent = document.getElementById('modal-birthday').value || 'NULL';
    document.getElementById('address').textContent = document.getElementById('modal-address').value || 'NULL';
    document.getElementById('airport').textContent = document.getElementById('modal-airport').value || 'NULL';
    document.getElementById('favplane').textContent = document.getElementById('modal-favplane').value || 'NULL';
    document.getElementById('favairport').textContent = document.getElementById('modal-favairport').value || 'NULL';

    alert('修改成功');
    const modalMask = document.getElementById('modalAAA');
    closeModal(modalMask);
}

function closeModalById(id) {
    const modalMask = document.getElementById(id);
    closeModal(modalMask);
}
