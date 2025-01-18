// 从 URL 参数获取课程信息
document.addEventListener('DOMContentLoaded', function() {
    // 从 localStorage 获取课程信息
    const selectedCourse = JSON.parse(localStorage.getItem('selectedCourse'));
    
    if (selectedCourse) {
        // 更新页面信息
        document.getElementById('courseImage').src = selectedCourse.image;
        document.getElementById('courseTitle').textContent = selectedCourse.title;
        document.getElementById('courseInstructor').textContent = `Instructor: ${selectedCourse.instructor}`;
        document.getElementById('coursePrice').textContent = selectedCourse.price;
        document.getElementById('totalPrice').textContent = selectedCourse.price;
    } else {
        console.error('Course information not found');
    }
});

// 处理支付
function processPay() {
    const courseInfo = JSON.parse(localStorage.getItem('selectedCourse'));
    if (courseInfo) {
        // 获取历史购买记录
        let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
        
        // 生成订单ID
        const orderId = `${courseInfo.id}-${purchaseHistory.length + 1}`;
        
        // 添加新购买记录，移除购买时间
        const newOrder = {
            id: orderId,
            title: courseInfo.title,
            price: courseInfo.price,
            status: 'Completed'
        };
        
        purchaseHistory.push(newOrder);
        // 更新历史记录到 localStorage
        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
        
        alert('Payment successful! Course has been added to your history.');
        window.location.href = 'learning.html';
    } else {
        alert('Course information not found!');
    }
} 