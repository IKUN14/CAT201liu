document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const modal = document.getElementById('resourceModal');
    const closeBtn = modal.querySelector('.close-btn');
    const downloadBtns = document.querySelectorAll('.download-btn');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    // 资源数据
    const resourcesData = {
        'python-book': {
            id: 'python-book',
            title: 'Python Programming: From Beginner to Pro',
            type: 'ebook',
            typeName: 'E-Book',
            size: '25MB',
            downloads: '12,345',
            rating: '4.8',
            description: 'Best Python tutorial for beginners with extensive practical examples and detailed explanations.',
            updateTime: '2024-01-15',
            downloadUrl: '/resources/python-book.pdf',
            recommended: true
        },
        'vue3-tutorial': {
            id: 'vue3-tutorial',
            title: 'Vue.js 3.0 Complete Tutorial',
            type: 'video',
            typeName: 'Video Tutorial',
            size: '1.2GB',
            downloads: '8,956',
            rating: '4.9',
            description: 'Comprehensive guide to Vue 3 core features with project source code',
            updateTime: '2024-02-01',
            downloadUrl: '/resources/vue3-tutorial.zip'
        },
        'react-source': {
            id: 'react-source',
            title: 'React E-Commerce Project Source',
            type: 'code',
            typeName: 'Source Code',
            size: '128MB',
            downloads: '5,674',
            rating: '4.7',
            description: 'Complete React e-commerce project with frontend, backend code and deployment docs',
            updateTime: '2024-01-28',
            downloadUrl: '/resources/react-mall.zip'
        },
        'vscode-plugins': {
            id: 'vscode-plugins',
            title: 'Essential VS Code Frontend Plugins',
            type: 'tool',
            typeName: 'Development Tools',
            size: '56MB',
            downloads: '15,890',
            rating: '4.8',
            description: 'Curated VS Code plugins essential for frontend development efficiency',
            updateTime: '2024-02-10',
            downloadUrl: '/resources/vscode-plugins.zip'
        },
        'java-book': {
            id: 'java-book',
            title: 'Core Java Volume I',
            type: 'ebook',
            typeName: 'E-Book',
            size: '35MB',
            downloads: '9,876',
            rating: '4.9',
            description: 'Essential reading for Java developers, deep dive into core Java concepts',
            updateTime: '2024-01-20',
            downloadUrl: '/resources/java-book.pdf'
        }
        // ... 可以继续添加更多资源
    };

    // 渲染资源卡片
    function renderResources(resources) {
        const resourcesGrid = document.querySelector('.resources-grid');
        resourcesGrid.innerHTML = ''; // 清空现有内容

        Object.values(resources).forEach(resource => {
            const card = createResourceCard(resource);
            resourcesGrid.appendChild(card);
        });
    }

    // 创建资源卡片
    function createResourceCard(resource) {
        const card = document.createElement('div');
        card.className = 'resource-card';
        card.dataset.resourceId = resource.id;

        card.innerHTML = `
            ${resource.recommended ? '<div class="resource-badge">Featured</div>' : ''}
            <div class="resource-type">
                <i class="resource-icon ${resource.type}"></i>
                <span>${resource.typeName}</span>
            </div>
            <div class="resource-content">
                <h3>${resource.title}</h3>
                <p class="resource-desc">${resource.description}</p>
                <div class="resource-meta">
                    <div class="meta-left">
                        <span class="download-count"><i class="icon-download"></i>${resource.downloads}</span>
                        <span class="rating"><i class="icon-star"></i>${resource.rating}</span>
                    </div>
                    <div class="meta-right">
                        <span class="resource-size">${resource.size}</span>
                    </div>
                </div>
                <button class="download-btn" onclick="downloadResource('${resource.id}')">
                    <i class="icon-download"></i>
                    Download Now
                </button>
            </div>
        `;

        return card;
    }

    // 搜索功能
    const searchInput = document.getElementById('resourceSearch');
    const searchButton = document.querySelector('.search-button');

    function searchResources(keyword) {
        if (!keyword.trim()) {
            renderResources(resourcesData);
            return;
        }

        const results = Object.values(resourcesData).filter(resource => {
            const searchString = `${resource.title} ${resource.description} ${resource.typeName}`.toLowerCase();
            return searchString.includes(keyword.toLowerCase());
        });

        renderResources(Object.fromEntries(results.map(r => [r.id, r])));
    }

    searchInput.addEventListener('input', (e) => {
        searchResources(e.target.value);
    });

    searchButton.addEventListener('click', () => {
        searchResources(searchInput.value);
    });

    // 标签筛选功能
    function filterResources(type) {
        if (type === 'all') {
            renderResources(resourcesData);
            return;
        }

        const filtered = Object.values(resourcesData).filter(resource => 
            resource.type === type
        );
        renderResources(Object.fromEntries(filtered.map(r => [r.id, r])));
    }

    // 打开弹窗
    function openModal(resourceId) {
        const resource = resourcesData[resourceId];
        if (!resource) return;

        // 填充弹窗内容
        modal.querySelector('.resource-title').textContent = resource.title;
        modal.querySelector('.resource-type-tag').textContent = resource.typeName;
        modal.querySelector('.file-size').textContent = resource.size;
        modal.querySelector('.download-count').textContent = resource.downloads;
        modal.querySelector('.update-time').textContent = resource.updateTime;
        modal.querySelector('.resource-description').textContent = resource.description;

        // 设置下载按钮
        const downloadBtn = modal.querySelector('#downloadBtn');
        downloadBtn.onclick = () => downloadResource(resourceId);

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    // 关闭弹窗
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // 下载资源
    window.downloadResource = function(resourceId) {
        const resource = resourcesData[resourceId];
        if (!resource) {
            alert('Resource not found');
            return;
        }

        // 添加到下载历史
        const downloadHistory = JSON.parse(localStorage.getItem('downloadHistory')) || [];
        const downloadRecord = {
            id: resource.id,
            title: resource.title,
            type: resource.typeName,
            size: resource.size,
            date: new Date().toISOString().split('T')[0],
            downloadUrl: resource.downloadUrl
        };

        // 检查是否已存在相同资源
        const existingIndex = downloadHistory.findIndex(d => d.id === resource.id);
        if (existingIndex !== -1) {
            downloadHistory[existingIndex] = downloadRecord;
        } else {
            downloadHistory.push(downloadRecord);
        }

        // 保存到 localStorage
        localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory));

        // 创建下载链接
        const link = document.createElement('a');
        link.href = resource.downloadUrl;
        link.download = resource.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert('Download started! Check download history in My Learning page.');
    };

    // 为所有下载按钮添加点击事件
    function initDownloadButtons() {
        const downloadBtns = document.querySelectorAll('.download-btn');
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const resourceId = this.closest('.resource-card').dataset.resourceId;
                downloadResource(resourceId);
            });
        });
    }

    // 检查用户是否登录
    function isUserLoggedIn() {
        // 这里添加实际的登录检查逻辑
        return false; // 示例返回值
    }

    // 显示登录提示
    function showLoginPrompt() {
        alert('Please login to download resources');
        // 可以跳转到登录页面或显示登录弹窗
        window.location.href = '/login.html';
    }

    // 更新下载次数
    function updateDownloadCount(resourceId) {
        // 这里添加更新下载次数的逻辑
        console.log(`Resource ${resourceId} downloaded`);
    }

    // 绑定事件
    resourceCards.forEach(card => {
        card.onclick = () => openModal(card.dataset.resourceId);
    });

    closeBtn.onclick = closeModal;

    // 点击弹窗外部关闭
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };

    // 标签切换
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.onclick = () => {
            tags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            filterResources(tag.dataset.type);
        };
    });

    // 排序功能
    function initSortButtons() {
        const sortButtons = document.querySelectorAll('.filter-btn');
        
        sortButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 更新按钮状态
                sortButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // 执行排序
                const sortType = button.dataset.sort;
                sortResources(sortType);
            });
        });
    }

    // 排序资源
    function sortResources(sortType) {
        const resources = Object.values(resourcesData);
        let sortedResources;
        
        switch(sortType) {
            case 'newest':
                sortedResources = resources.sort((a, b) => 
                    new Date(b.updateTime) - new Date(a.updateTime)
                );
                break;
            case 'hot':
                sortedResources = resources.sort((a, b) => 
                    parseInt(b.downloads.replace(/,/g, '')) - 
                    parseInt(a.downloads.replace(/,/g, ''))
                );
                break;
            case 'rating':
                sortedResources = resources.sort((a, b) => 
                    parseFloat(b.rating) - parseFloat(a.rating)
                );
                break;
            default:
                sortedResources = resources;
        }

        // 转换回对象格式并重新渲染
        const sortedResourcesObj = Object.fromEntries(
            sortedResources.map(resource => [resource.id, resource])
        );
        renderResources(sortedResourcesObj);
    }

    // 初始化页面
    function init() {
        renderResources(resourcesData);
        initSortButtons();
        
        // 默认按最新排序
        const newestBtn = document.querySelector('[data-sort="newest"]');
        if (newestBtn) {
            newestBtn.click();
        }
    }

    // 启动应用
    init();

    // 在现有代码中添加搜索相关功能
    function initSearch() {
        const searchInput = document.getElementById('resourceSearch');
        const clearButton = document.getElementById('clearSearch');
        const searchButton = document.querySelector('.search-button');
        const suggestionsContainer = document.getElementById('searchSuggestions');
        
        // 显示/隐藏清除按钮
        searchInput.addEventListener('input', function() {
            clearButton.style.display = this.value ? 'block' : 'none';
            handleSearch(this.value);
        });

        // 清除搜索
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            clearButton.style.display = 'none';
            suggestionsContainer.style.display = 'none';
            renderResources(resourcesData);
        });

        // 搜索按钮点击
        searchButton.addEventListener('click', function() {
            handleSearch(searchInput.value);
            suggestionsContainer.style.display = 'none';
        });

        // 回车搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(this.value);
                suggestionsContainer.style.display = 'none';
            }
        });

        // 实时搜索建议
        let debounceTimer;
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                showSearchSuggestions(this.value);
            }, 300);
        });
    }

    // 处理搜索
    function handleSearch(keyword) {
        if (!keyword.trim()) {
            renderResources(resourcesData);
            return;
        }

        const results = Object.values(resourcesData).filter(resource => {
            const searchString = `${resource.title} ${resource.description} ${resource.typeName}`.toLowerCase();
            return searchString.includes(keyword.toLowerCase());
        });

        renderResources(Object.fromEntries(results.map(r => [r.id, r])));
    }

    // 显示搜索建议
    function showSearchSuggestions(keyword) {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        
        if (!keyword.trim()) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        const suggestions = Object.values(resourcesData)
            .filter(resource => {
                const searchString = `${resource.title} ${resource.description}`.toLowerCase();
                return searchString.includes(keyword.toLowerCase());
            })
            .slice(0, 5);

        if (suggestions.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        suggestionsContainer.innerHTML = suggestions.map(resource => `
            <div class="suggestion-item" data-id="${resource.id}">
                <span class="suggestion-icon">🔍</span>
                <span class="suggestion-text">${resource.title}</span>
                <span class="suggestion-type">${resource.typeName}</span>
            </div>
        `).join('');

        suggestionsContainer.style.display = 'block';

        // 添加建议项点击事件
        const suggestionItems = suggestionsContainer.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', () => {
                const resourceId = item.dataset.id;
                const resource = resourcesData[resourceId];
                document.getElementById('resourceSearch').value = resource.title;
                suggestionsContainer.style.display = 'none';
                handleSearch(resource.title);
            });
        });
    }

    // 在 DOMContentLoaded 事件中初始化搜索功能
    initSearch();
}); 