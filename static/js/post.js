document.querySelector('.post-form').addEventListener('submit', function (e) {
    e.preventDefault(); // 阻止默认表单提交行为

    const title = document.querySelector('.input-title').value.trim();
    const body = document.querySelector('.input-body').value.trim();

    if (!title || !body) {
        alert("标题和正文都不能为空！");
        return;
    }

    // 模拟提交到后端接口
    // 后端对接！！！
    fetch('/api/post', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'  // 表单提交的格式
    },
    body: new URLSearchParams({
        title: title,
        body: body
    })
    })
    .then(response => response.json())
    .then(data => {
    if (data.success) {
        // 数据提交成功，跳转页面
        window.location.href = '/bbs';
    } else {
        alert('提交失败：' + data.message);
    }
    })
    .catch(error => {
    console.error('请求失败', error);
    });
});

// markdown preview
const bodyInput = document.querySelector('.input-body');
const preview = document.getElementById('previewArea');

bodyInput.addEventListener('input', () => {
    const markdownText = bodyInput.value;
    preview.innerHTML = marked.parse(markdownText); // 实时转换并插入 HTML
});