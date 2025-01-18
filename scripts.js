// 搜索功能
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const keyword = searchInput.value.trim();
        if (keyword) {
            // 将搜索关键词保存到 localStorage
            localStorage.setItem('searchKeyword', keyword);
            
            // 跳转到课程页面并带上搜索参数
            window.location.href = `courses.html?search=${encodeURIComponent(keyword)}`;
        }
    });

    // 添加输入建议功能（可选）
    searchInput.addEventListener('input', function(e) {
        const keyword = e.target.value.trim();
        if (keyword.length >= 2) {
            // 这里可以添加搜索建议的逻辑
            // 例如：根据输入显示相关课程建议
        }
    });
}); 