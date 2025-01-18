// 从 URL 参数获取课程信息
document.addEventListener('DOMContentLoaded', function() {
    // 从 localStorage 获取课程信息
    const selectedCourse = JSON.parse(localStorage.getItem('selectedCourse'));
    
    if (selectedCourse) {
        // 更新页面信息
        document.getElementById('courseImage').src = selectedCourse.image;
        document.getElementById('courseTitle').textContent = selectedCourse.title;
        document.getElementById('courseInstructor').textContent = `讲师：${selectedCourse.instructor}`;
        document.getElementById('coursePrice').textContent = selectedCourse.price;
        document.getElementById('totalPrice').textContent = selectedCourse.price;
    } else {
        console.error('未找到课程信息');
        // 可以选择重定向回课程页面
        // window.location.href = 'courses.html';
    }
});

// 处理支付
function processPay() {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    const courseInfo = JSON.parse(localStorage.getItem('selectedCourse'));
    
    // 这里可以添加实际的支付逻辑
    console.log('支付方式:', selectedPayment);
    console.log('课程信息:', courseInfo);
    
    // 模拟支付过程
    alert(`正在使用${selectedPayment === 'alipay' ? '支付宝' : '微信支付'}支付...`);
    
    // 支付成功后可以清除localStorage中的课程信息
    // localStorage.removeItem('selectedCourse');
    
    // 可以添加跳转到支付成功页面或我的课程页面的逻辑
    // window.location.href = 'payment-success.html';
} 