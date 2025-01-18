// 显示路径详情
function showPathDetails(pathId) {
    // 获取所有路径详情
    const allDetails = document.querySelectorAll('.path-details');
    // 隐藏所有详情
    allDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    
    // 显示选中的路径详情
    const selectedDetails = document.getElementById(`${pathId}-details`);
    if (selectedDetails) {
        selectedDetails.classList.add('active');
        
        // 平滑滚动到详情部分
        selectedDetails.scrollIntoView({ behavior: 'smooth' });
    }
}

// 在首页添加跳转逻辑
document.addEventListener('DOMContentLoaded', () => {
    const pathButtons = document.querySelectorAll('.path-btn');
    if (pathButtons) {
        pathButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = 'learning-paths.html';
            });
        });
    }
}); 