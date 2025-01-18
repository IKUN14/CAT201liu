document.addEventListener('DOMContentLoaded', () => {
    // 获取按钮元素
    const enrollBtn = document.querySelector('.enroll-btn');
    const tryBtn = document.querySelector('.try-btn');

    // 检查按钮是否存在
    if (enrollBtn) {
        enrollBtn.addEventListener('click', () => {
            // 检查用户是否登录
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            
            if (isLoggedIn) {
                // 已登录，执行报名逻辑
                alert('报名成功！即将跳转到课程学习页面...');
                // 这里可以添加跳转到课程学习页面的逻辑
            } else {
                // 未登录，提示用户登录
                alert('请先登录后再报名课程！');
                // 可以添加跳转到登录页面的逻辑
                // window.location.href = '/login.html';
            }
        });
    }

    if (tryBtn) {
        tryBtn.addEventListener('click', () => {
            // 试看逻辑
            const videoUrl = tryBtn.getAttribute('data-video-url');
            if (videoUrl) {
                // 如果有视频URL，打开视频播放器
                window.location.href = videoUrl;
            } else {
                alert('试看视频即将上线！');
            }
        });
    }

    // 添加返回按钮功能
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.history.back();
        });
    }
});