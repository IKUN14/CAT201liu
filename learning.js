document.addEventListener('DOMContentLoaded', function() {
   
    // 初始化页面
    function initPage() {
        // 检查用户是否登录
        const userInfo = JSON.parse(localStorage.getItem('currentUser'));
        if (!userInfo) {
            window.location.href = 'login.html';
            return;
        }

        generateRandomAvatar();
        displayUserInfo();
        const orders = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
        renderOrders(orders);
        bindTabEvents();
        initSearchFunction();
        initLogout(); // 初始化登出功能
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

    // 渲染订单记录
    function renderOrders(orders) {
        const ordersList = document.querySelector('.orders-list');
        if (!ordersList) return;

        if (orders.length === 0) {
            ordersList.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <div class="no-results-text">No Orders Found</div>
                </div>
            `;
            return;
        }

        ordersList.innerHTML = orders.map((order, index) => `
            <div class="order-item">
                <div class="order-info">
                    <div class="order-header">
                        <span class="order-id">Order ID: ${order.id}</span>
                        <span class="order-status ${order.status === 'Completed' ? 'completed' : ''}">${order.status}</span>
                    </div>
                    <h3 class="order-title">${order.title}</h3>
                    <div class="order-meta">
                        <div class="order-details">
                            <span class="order-price">${order.price}</span>
                        </div>
                        <button class="delete-btn" onclick="deleteOrder(${index})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 搜索订单功能
    function searchOrders(searchTerm) {
        const orders = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
        if (!searchTerm) {
            return orders;
        }

        return orders.filter(order => {
            const searchString = searchTerm.toLowerCase();
            const orderString = (
                (order.id || '') +
                (order.title || '') +
                (order.status || '') +
                (order.price || '')
            ).toLowerCase();
            
            return orderString.includes(searchString);
        });
    }

    // 初始化搜索功能
    function initSearchFunction() {
        const searchInput = document.querySelector('.search-box input');
        if (!searchInput) return;

        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value;
            const filteredOrders = searchOrders(searchTerm);
            renderOrders(filteredOrders);
        });
    }

    // 删除订单记录
    window.deleteOrder = function(index) {
        const orders = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
        orders.splice(index, 1);
        localStorage.setItem('purchaseHistory', JSON.stringify(orders));
        renderOrders(orders);
    };

    // 渲染下载记录
    function renderDownloads() {
        const downloadsList = document.querySelector('.downloads-list');
        if (!downloadsList) return;

        const downloads = JSON.parse(localStorage.getItem('downloadHistory')) || [];

        if (downloads.length === 0) {
            downloadsList.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <div class="no-results-text">No Downloads Found</div>
                </div>
            `;
            return;
        }

        // 按日期降序排序
        downloads.sort((a, b) => new Date(b.date) - new Date(a.date));

        downloadsList.innerHTML = downloads.map(download => `
            <div class="download-item">
                <div class="download-info">
                    <h3 class="download-title">${download.title}</h3>
                    <div class="download-meta">
                        <div class="download-details">
                            <span class="download-type">${download.type}</span>
                            <span class="download-size">${download.size}</span>
                            <span class="download-date">Downloaded on: ${download.date}</span>
                        </div>
                        <button class="redownload-btn" onclick="redownloadResource('${download.id}')">
                            <i class="icon-download"></i>
                            Download Again
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 下载资源功能
    window.redownloadResource = function(resourceId) {
        // 从 localStorage 获取资源信息
        const downloads = JSON.parse(localStorage.getItem('downloadHistory')) || [];
        const resource = downloads.find(d => d.id === resourceId);
        
        if (!resource) {
            alert('Resource not found');
            return;
        }

        // 创建下载链接
        const link = document.createElement('a');
        link.href = resource.downloadUrl;
        link.download = resource.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 更新下载时间
        const updatedDownloads = downloads.map(d => {
            if (d.id === resourceId) {
                return { ...d, date: new Date().toISOString().split('T')[0] };
            }
            return d;
        });

        localStorage.setItem('downloadHistory', JSON.stringify(updatedDownloads));
        renderDownloads();
    };

    // 绑定标签页切换事件
    function bindTabEvents() {
        const menuItems = document.querySelectorAll('.menu-list li');
        const tabContents = document.querySelectorAll('.tab-content');

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                menuItems.forEach(i => i.classList.remove('active'));
                tabContents.forEach(c => {
                    c.style.display = 'none';
                });

                item.classList.add('active');
                const tabId = item.dataset.tab;
                document.getElementById(tabId).style.display = 'block';

                if (tabId === 'order-history') {
                    const orders = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
                    renderOrders(orders);
                } else if (tabId === 'downloaded-resources') {
                    renderDownloads();
                }
            });
        });
    }

    // 显示用户信息
    function displayUserInfo() {
        const userInfo = JSON.parse(localStorage.getItem('currentUser'));
        const userNameElement = document.querySelector('.user-name');
        
        if (userInfo && userInfo.email && userNameElement) {
            // 可以选择只显示邮箱用户名部分（去掉@后面的内容）
            const username = userInfo.email.split('@')[0];
            userNameElement.textContent = username;
        } else {
            // 如果没有登录信息，重定向到登录页面
            window.location.href = 'login.html';
        }
    }

    // 添加登出功能
    function initLogout() {
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                // 清除用户登录信息
                localStorage.removeItem('currentUser');
                // 清除其他相关数据（如果需要）
                localStorage.removeItem('purchaseHistory');
                localStorage.removeItem('downloadHistory');
                
                // 显示登出提示
                alert('Successfully logged out!');
                
                // 重定向到登录页面
                window.location.href = 'login.html';
            });
        }
    }

    // 初始化页面
    initPage();
}); 