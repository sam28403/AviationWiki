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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            content: body
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('服务器返回错误');
            }
            return response.json();
        })
        .then(data => {
            alert("发帖成功！");
            // 可选：跳转到帖子详情页或讨论区首页
            window.location.href = "bbs.html";
        })
        .catch(error => {
            console.error('提交失败:', error);
            alert("提交失败，请稍后再试");
        });
});

// markdown preview
const bodyInput = document.querySelector('.input-body');
const preview = document.getElementById('previewArea');

bodyInput.addEventListener('input', () => {
    const markdownText = bodyInput.value;
    preview.innerHTML = marked.parse(markdownText); // 实时转换并插入 HTML
});