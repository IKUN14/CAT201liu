// 模拟课程数据
const courses = [
    {
        id: 1,
        title: "Python 入门到精通",
        instructor: "张老师",
        price: "¥299",
        rating: 4.8,
        image: "python.jpg"
    },
    {
        id: 2,
        title: "UI 设计基础",
        instructor: "李老师",
        price: "¥199",
        rating: 4.6,
        image: "ui.jpg"
    },
    // 可以添加更多课程数据
];

// 动态加载课程卡片
function loadCourses() {
    const courseGrid = document.getElementById('courseGrid');
    
    courses.forEach(course => {
        const courseCard = `
            <div class="course-card">
                <img src="${course.image}" alt="${course.title}">
                <div class="course-info">
                    <h3>${course.title}</h3>
                    <p>讲师：${course.instructor}</p>
                    <div class="course-meta">
                        <span class="price">${course.price}</span>
                        <span class="rating">⭐${course.rating}</span>
                    </div>
                </div>
            </div>
        `;
        courseGrid.innerHTML += courseCard;
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    
    // 搜索功能
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        // 实现搜索逻辑
        console.log('搜索:', searchTerm);
    });
}); 