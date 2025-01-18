// Define valid user credentials
const validUsers = [
    { email: "admin@example.com", password: "admin123" },
    { email: "user1@example.com", password: "pass123" },
  ];
  
  document.addEventListener('DOMContentLoaded', function() {
      // Handle login form submission
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
          loginForm.addEventListener('submit', (e) => {
              e.preventDefault();
              
              const email = document.getElementById('email').value.trim();
              const password = document.getElementById('password').value.trim();
  
              // Check if the credentials match any valid user
              const isValidUser = validUsers.some(
                  (user) => user.email === email && user.password === password
              );
  
              if (isValidUser) {
                  alert("Login successful!");
                  window.location.href = 'index.html';
              } else {
                  alert("Invalid email or password. Please try again.");
              }
          });
      }
  
      // Handle registration form submission
      const registerForm = document.getElementById('registerForm');
      if (registerForm) {
          registerForm.addEventListener('submit', async (e) => {
              e.preventDefault();
              
              const password = document.getElementById('password').value;
              const confirmPassword = document.getElementById('confirmPassword').value;
              
              if (password !== confirmPassword) {
                  alert('两次输入的密码不一致');
                  return;
              }
  
              const formData = {
                  username: document.getElementById('username').value,
                  email: document.getElementById('email').value,
                  password: password
              };
  
              try {
                  const response = await fetch('/api/register', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(formData)
                  });
  
                  const result = await response.json();
                  
                  if (result.success) {
                      alert(result.message);
                      window.location.href = 'login.html';
                  } else {
                      alert(result.message);
                  }
              } catch (error) {
                  alert('注册失败，请稍后重试');
              }
          });
      }
  
      // Handle password toggle
      const toggleButtons = document.querySelectorAll('.toggle-password');
      toggleButtons.forEach(button => {
          button.addEventListener('click', function() {
              const input = this.parentElement.querySelector('input');
              const type = input.type === 'password' ? 'text' : 'password';
              input.type = type;
              this.querySelector('.eye-icon').classList.toggle('show');
          });
      });
  });
  