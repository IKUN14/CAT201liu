// 课程数据
const coursesData = [
    // 编程开发类课程
    {
        id: 1,
        category: "programming",
        subcategory: "Python",
        title: "Python for Beginners",
        instructor: "Mr. Zhang",
        price: "299",
        rating: 4.8,
        image: "images/python.jpg",
        level: "beginner"
    },
    {
        id: 2,
        category: "programming",
        subcategory: "Java",
        title: "Java Core Techniques",
        instructor: "Mr. Li",
        price: "399",
        rating: 4.9,
        image: "images/java.jpg",
        level: "intermediate"
    },
    {
        id: 3,
        category: "programming",
        subcategory: "C++",
        title: "C++ Advanced Programming",
        instructor: "Mr. Wang",
        price: "499",
        rating: 4.7,
        image: "images/cpp.jpg",
        level: "advanced"
    },
    {
        id: 4,
        category: "programming",
        subcategory: "JavaScript",
        title: "JavaScript Full Stack Development",
        instructor: "Mr. Zhao",
        price: "349",
        rating: 4.6,
        image: "images/javascript.jpg",
        level: "intermediate"
    },
    {
        id: 5,
        category: "programming",
        subcategory: "Go",
        title: "Go Language Practical Tutorial",
        instructor: "Mr. Sun",
        price: "399",
        rating: 4.8,
        image: "images/golang.jpg",
        level: "intermediate"
    },

    // 设计创作类课程
    {
        id: 1,
        category: "design",
        subcategory: "UI Design",
        title: "UI Design from Beginner to Expert",
        instructor: "Mr. Liu",
        price: "349",
        rating: 4.7,
        image: "images/ui-design.jpg",
        level: "beginner"
    },
    {
        id: 2,
        category: "design",
        subcategory: "Mobile UI",
        title: "Mobile UI Design Practical",
        instructor: "Mr. Chen",
        price: "399",
        rating: 4.8,
        image: "images/mobile-ui.jpg",
        level: "intermediate"
    },
    {
        id: 3,
        category: "design",
        subcategory: "Web Design",
        title: "Web Design and Layout",
        instructor: "Mr. Zhou",
        price: "299",
        rating: 4.6,
        image: "images/web-design.jpg",
        level: "beginner"
    },
    {
        id: 4,
        category: "design",
        subcategory: "3D Modeling",
        title: "3D Modeling Basic Tutorial",
        instructor: "Mr. Wu",
        price: "499",
        rating: 4.9,
        image: "images/3d-modeling.jpg",
        level: "advanced"
    },
    {
        id: 5,
        category: "design",
        subcategory: "Graphic Design",
        title: "Graphic Design Course",
        instructor: "Mr. Guo",
        price: "299",
        rating: 4.7,
        image: "images/graphic-design.jpg",
        level: "intermediate"
    }
];

// 当前筛选状态
let currentFilters = {
    category: 'all',
    subcategories: [],
    levels: [],
    priceTypes: [],
    searchKeyword: '',
    sortBy: 'default'
};

// 保存筛选状态到 localStorage
function saveFiltersState() {
    localStorage.setItem('courseFilters', JSON.stringify(currentFilters));
}

// 从 localStorage 恢复筛选状态
function restoreFiltersState() {
    const savedFilters = localStorage.getItem('courseFilters');
    if (savedFilters) {
        currentFilters = JSON.parse(savedFilters);
        
        // 恢复类别选择
        const categoryInput = document.querySelector(`input[name="category"][value="${currentFilters.category}"]`);
        if (categoryInput) {
            categoryInput.checked = true;
            
            // 显示对应的子类别
            if (currentFilters.category !== 'all') {
                const subCategoriesDiv = document.querySelector(`.${currentFilters.category === 'programming' ? 'programming' : 
                                                                 currentFilters.category === 'design' ? 'design' :  ''}-sub`);
                if (subCategoriesDiv) {
                    subCategoriesDiv.style.display = 'flex';
                }
            }
        }

        // 恢复子类别选择
        currentFilters.subcategories.forEach(sub => {
            const subInput = document.querySelector(`input[name="subcategory"][value="${sub}"]`);
            if (subInput) {
                subInput.checked = true;
            }
        });

        // 恢复难度等级选择
        currentFilters.levels.forEach(level => {
            const levelInput = document.querySelector(`input[name="level"][value="${level}"]`);
            if (levelInput) {
                levelInput.checked = true;
            }
        });

        // 恢复价格类型选择
        currentFilters.priceTypes.forEach(price => {
            const priceInput = document.querySelector(`input[name="price"][value="${price}"]`);
            if (priceInput) {
                priceInput.checked = true;
            }
        });

        // 恢复搜索关键词
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput && currentFilters.searchKeyword) {
            searchInput.value = currentFilters.searchKeyword;
        }

        // 恢复排序选择
        const sortSelect = document.querySelector('.sort-select');
        if (sortSelect && currentFilters.sortBy) {
            sortSelect.value = currentFilters.sortBy;
        }

        // 应用筛选
        applyFilters();
    }
}

// 渲染课程函数
function renderCourses(courses) {
    const courseGrid = document.getElementById('courseGrid');
    courseGrid.innerHTML = '';

    courses.forEach(course => {
        let fileName;
        switch(course.subcategory) {
            case 'Mobile UI':
                fileName = 'mobile-ui';
                break;
            case 'Python':
                fileName = 'python';
                break;
            case 'Java':
                fileName = 'java';
                break;
            case 'C++':
                fileName = 'cpp';
                break;
            case 'JavaScript':
                fileName = 'javascript';
                break;
            case 'Go':
                fileName = 'golang';
                break;
            case 'UI Design':
                fileName = 'ui-design';
                break;
            case 'Web Design':
                fileName = 'web-design';
                break;
            case 'Graphic Design':
                fileName = 'graphic-design';
                break;
            case '3D Modeling':
                fileName = '3d-modeling';
                break;
            case 'Piano':
                fileName = course.level === 'beginner' ? 'piano-basic' : 'piano-advanced';
                break;
            case 'Guitar':
                fileName = 'guitar';
                break;
            case 'Vocal Training':
                fileName = 'vocal';
                break;
            case 'Music Production':
                fileName = 'music-production';
                break;
            default:
                fileName = course.subCategory;
        }

        const courseCard = `
            <a href="courses/${fileName}-${course.id}.html" class="course-card">
                <img src="${course.image}" alt="${course.title}" class="course-image">
                <div class="course-info">
                    <h3 class="course-title">${course.title}</h3>
                    <p>Instructor: ${course.instructor}</p>
                    <div class="course-meta">
                        <span class="course-price">RM${course.price}</span>
                        <span class="course-rating">⭐ ${course.rating}</span>
                    </div>
                </div>
            </a>
        `;
        courseGrid.innerHTML += courseCard;
    });
}

// 应用所有筛选条件
function applyFilters() {
    let filteredCourses = [...coursesData];

    // 应用类别和子类别筛选
    if (currentFilters.category !== 'all') {
        filteredCourses = filteredCourses.filter(course => {
            if (currentFilters.subcategories.length > 0) {
                return course.category === currentFilters.category && 
                       currentFilters.subcategories.includes(course.subcategory);
            }
            return course.category === currentFilters.category;
        });
    }

    // 应用难度等级筛选
    if (currentFilters.levels.length > 0) {
        filteredCourses = filteredCourses.filter(course => 
            currentFilters.levels.includes(course.level)
        );
    }

    // 应用价格类型筛选
    if (currentFilters.priceTypes.length > 0) {
        filteredCourses = filteredCourses.filter(course => {
            if (currentFilters.priceTypes.includes('free')) {
                return parseInt(course.price) === 0;
            }
            if (currentFilters.priceTypes.includes('paid')) {
                return parseInt(course.price) > 0;
            }
            return true;
        });
    }

    // 搜索关键词筛选
    if (currentFilters.searchKeyword) {
        const keyword = currentFilters.searchKeyword.toLowerCase();
        filteredCourses = filteredCourses.filter(course => 
            course.title.toLowerCase().includes(keyword) ||
            course.instructor.toLowerCase().includes(keyword) ||
            course.category.toLowerCase().includes(keyword) ||
            (course.subcategory && course.subcategory.toLowerCase().includes(keyword))
        );
    }

    // 应用排序
    switch(currentFilters.sortBy) {
        case 'priceAsc':
            filteredCourses.sort((a, b) => parseInt(a.price) - parseInt(b.price));
            break;
        case 'priceDesc':
            filteredCourses.sort((a, b) => parseInt(b.price) - parseInt(a.price));
            break;
        case 'popular':
            filteredCourses.sort((a, b) => b.rating - a.rating);
            break;
    }

    renderCourses(filteredCourses);
}

// 更新事件监听器
function initializeEventListeners() {
    // 处理 URL 搜索参数
    const urlParams = new URLSearchParams(window.location.search);
    const searchKeyword = urlParams.get('search');
    
    if (searchKeyword) {
        // 设置搜索输入框的值
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.value = searchKeyword;
        }
        
        // 更新筛选条件
        currentFilters.searchKeyword = searchKeyword;
        
        // 应用筛选
        applyFilters();
    }

    // 处理 URL 参数
    const categoryFromUrl = urlParams.get('category');
    
    if (categoryFromUrl) {
        // 找到对应的单选按钮并选中
        const categoryInput = document.querySelector(`input[name="category"][value="${categoryFromUrl}"]`);
        if (categoryInput) {
            categoryInput.checked = true;
            currentFilters.category = categoryFromUrl;
            
            // 显示对应的子类别
            document.querySelectorAll('.sub-categories').forEach(sub => {
                sub.style.display = 'none';
            });
            
            if (categoryFromUrl === 'programming') {
                document.querySelector('.programming-sub').style.display = 'flex';
            } else if (categoryFromUrl === 'design') {
                document.querySelector('.design-sub').style.display = 'flex';
            } else if (categoryFromUrl === 'music-art') {
                document.querySelector('.music-sub').style.display = 'flex';
            }
            
            // 应用筛选
            applyFilters();
        }
    }

    // 课程分类筛选
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            currentFilters.subcategories = []; // 重置子类别选择
            
            // 隐藏所有子类别
            document.querySelectorAll('.sub-categories').forEach(sub => {
                sub.style.display = 'none';
            });
            
            // 显示对应的子类别
            if (e.target.value === 'programming') {
                document.querySelector('.programming-sub').style.display = 'flex';
            } else if (e.target.value === 'design') {
                document.querySelector('.design-sub').style.display = 'flex';
            } else if (e.target.value === 'music-art') {
                document.querySelector('.music-sub').style.display = 'flex';
            }
            
            saveFiltersState(); // 保存状态
            applyFilters();
        });
    });

    // 子类别筛选
    document.querySelectorAll('input[name="subcategory"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentFilters.subcategories.push(e.target.value);
            } else {
                currentFilters.subcategories = currentFilters.subcategories.filter(
                    sub => sub !== e.target.value
                );
            }
            saveFiltersState(); // 保存状态
            applyFilters();
        });
    });

    // 难度等级筛选
    document.querySelectorAll('input[name="level"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentFilters.levels.push(e.target.value);
            } else {
                currentFilters.levels = currentFilters.levels.filter(
                    level => level !== e.target.value
                );
            }
            saveFiltersState(); // 保存状态
            applyFilters();
        });
    });

    // 价格筛选
    document.querySelectorAll('input[name="price"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentFilters.priceTypes.push(e.target.value);
            } else {
                currentFilters.priceTypes = currentFilters.priceTypes.filter(
                    price => price !== e.target.value
                );
            }
            saveFiltersState(); // 保存状态
            applyFilters();
        });
    });

    // 搜索功能
    const searchInput = document.querySelector('input[type="search"]');
    const searchButton = document.querySelector('.search-button');

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            currentFilters.searchKeyword = searchInput.value.trim();
            saveFiltersState(); // 保存状态
            applyFilters();
        });
    }

    // 排序功能
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sortBy = e.target.value;
            saveFiltersState(); // 保存状态
            applyFilters();
        });
    }
}

// 获取 URL 参数的函数
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 设置分类选中状态的函数
function setCategoryFilter(category) {
    if (category) {
        // 找到对应的 radio 按钮并设置为选中
        const radioBtn = document.querySelector(`input[name="category"][value="${category}"]`);
        if (radioBtn) {
            radioBtn.checked = true;
            
            // 显示对应的子分类
            const subCategories = document.querySelector(`.${category}-sub`);
            if (subCategories) {
                subCategories.style.display = 'block';
            }
            
            // 更新筛选状态
            currentFilters.category = category;
            applyFilters();
        }
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    
    // 获取 URL 中的分类参数
    const category = getUrlParameter('category');
    if (category) {
        setCategoryFilter(category);
    }
    
    restoreFiltersState(); // 恢复之前的筛选状态
});

// 在首页添加点击事件处理
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const category = card.dataset.category;
        window.location.href = `courses.html?category=${encodeURIComponent(category)}`;
    });
}); 