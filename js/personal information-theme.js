function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

    // 填充现有信息
    document.getElementById('modal-name').value = document.getElementById('name').textContent;
    document.getElementById('modal-title').value = document.getElementById('title').textContent;
    document.getElementById('modal-birthday').value = document.getElementById('birthday').textContent;
    document.getElementById('modal-address').value = document.getElementById('address').textContent;
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
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

    // 保存其他信息
    document.getElementById('name').textContent = document.getElementById('modal-name').value || '暂无';
    document.getElementById('title').textContent = document.getElementById('modal-title').value || '暂无';
    document.getElementById('birthday').textContent = document.getElementById('modal-birthday').value || '暂无';
    document.getElementById('address').textContent = document.getElementById('modal-address').value || '暂无';

    alert('修改成功');
    closeModal();
}