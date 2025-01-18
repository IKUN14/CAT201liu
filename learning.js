document.addEventListener('DOMContentLoaded', function() {
    // 模拟数据
    const learningData = {
        orders: [
            {
                id: 'ORDER2024021501',
                title: 'Vue.js 3.0完整教程',
                price: '299.00',
                date: '2024-02-15',
                status: '已完成'
            },
            {
                id: 'ORDER2024021502',
                title: 'Python编程从入门到实践',
                price: '199.00',
                date: '2024-02-14',
                status: '已完成'
            }
        ],
        downloads: [
            {
                id: 1,
                title: 'React项目源码',
                size: '125MB',
                date: '2024-02-14',
                type: '项目源码'
            },
            {
                id: 2,
                title: 'Java核心技术PDF',
                size: '35MB',
                date: '2024-02-13',
                type: '电子书'
            }
        ]
    };

    // 初始化页面
    function initPage() {
        generateRandomAvatar();
        renderOrders(learningData.orders);
        bindTabEvents();
        initSearchFunction();
    }

    // 生成随机头像
    function generateRandomAvatar() {
        // 生成随机种子
        const seed = Math.random().toString(36).substring(7);
        // 使用 DiceBear API 生成头像
        const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
        
        // 设置头像
        const avatarImg = document.getElementById('userAvatar');
        if (avatarImg) {
            avatarImg.src = avatarUrl;
        }
    }

    // 渲染订单记录
    function renderOrders() {
        const ordersList = document.querySelector('.orders-list');
        ordersList.innerHTML = learningData.orders.map(order => `
            <div class="order-item">
                <div class="order-info">
                    <div class="order-header">
                        <span class="order-id">订单号：${order.id}</span>
                        <span class="order-status ${order.status === '已完成' ? 'completed' : ''}">${order.status}</span>
                    </div>
                    <h3 class="order-title">${order.title}</h3>
                    <div class="order-meta">
                        <span class="order-price">￥${order.price}</span>
                        <span class="order-date">${order.date}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 渲染下载记录
    function renderDownloads() {
        const downloadsList = document.querySelector('.downloads-list');
        downloadsList.innerHTML = learningData.downloads.map(download => `
            <div class="download-item">
                <div class="download-info">
                    <h3 class="download-title">${download.title}</h3>
                    <div class="download-meta">
                        <span class="download-type">${download.type}</span>
                        <span class="download-size">${download.size}</span>
                        <span class="download-date">${download.date}</span>
                    </div>
                </div>
                <button class="redownload-btn">重新下载</button>
            </div>
        `).join('');
    }

    // 绑定标签页切换事件
    function bindTabEvents() {
        const menuItems = document.querySelectorAll('.menu-list li');
        const tabContents = document.querySelectorAll('.tab-content');

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // 移除所有活动状态
                menuItems.forEach(i => i.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // 添加新的活动状态
                item.classList.add('active');
                const tabId = item.dataset.tab;
                document.getElementById(tabId).classList.add('active');

                // 根据标签页加载对应内容
                if (tabId === 'order-history') {
                    renderOrders();
                } else if (tabId === 'downloaded-resources') {
                    renderDownloads();
                }
            });
        });
    }

    // 初始化搜索功能
    function initSearchFunction() {
        const searchInput = document.querySelector('.search-box input');
        if (!searchInput) return;

        // 添加输入事件监听
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            const filteredOrders = searchOrders(searchTerm);
            renderOrders(filteredOrders);
        }, 300));
    }

    // 搜索订单功能
    function searchOrders(searchTerm) {
        if (!searchTerm) {
            return learningData.orders;
        }

        return learningData.orders.filter(order => {
            return (
                order.id.toLowerCase().includes(searchTerm) ||
                order.title.toLowerCase().includes(searchTerm) ||
                order.date.includes(searchTerm) ||
                order.status.toLowerCase().includes(searchTerm) ||
                order.price.includes(searchTerm)
            );
        });
    }

    // 修改渲染订单函数，接收订单数据作为参数
    function renderOrders(orders) {
        const ordersList = document.querySelector('.orders-list');
        if (!ordersList) return;

        if (orders.length === 0) {
            ordersList.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <div class="no-results-text">未找到相关订单</div>
                </div>
            `;
            return;
        }

        ordersList.innerHTML = orders.map(order => `
            <div class="order-item">
                <div class="order-info">
                    <div class="order-header">
                        <span class="order-id">订单号：${order.id}</span>
                        <span class="order-status ${order.status === '已完成' ? 'completed' : ''}">${order.status}</span>
                    </div>
                    <h3 class="order-title">${order.title}</h3>
                    <div class="order-meta">
                        <span class="order-price">￥${order.price}</span>
                        <span class="order-date">${order.date}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // 生成随机头像
    function generateRandomAvatar() {
        const seed = Math.random().toString(36).substring(7);
        const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
        const avatarImg = document.getElementById('userAvatar');
        if (avatarImg) {
            avatarImg.src = avatarUrl;
        }
    }

    // 绑定标签页切换事件
    function bindTabEvents() {
        const menuItems = document.querySelectorAll('.menu-list li');
        const tabContents = document.querySelectorAll('.tab-content');

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuItems.forEach(i => i.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                item.classList.add('active');
                const tabId = item.dataset.tab;
                document.getElementById(tabId).classList.add('active');

                if (tabId === 'order-history') {
                    renderOrders(learningData.orders);
                } else if (tabId === 'downloaded-resources') {
                    renderDownloads();
                }
            });
        });
    }

    // 初始化页面
    initPage();
}); 