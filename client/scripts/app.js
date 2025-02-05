// Authentication
document.addEventListener('DOMContentLoaded', () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const logoutBtn = document.querySelector('.logout-btn');
  
    if (token) {
      loginBtn.style.display = 'none';
      registerBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
    }
  
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.cookie = 'token=; Max-Age=0; path=/';
      window.location.href = '/';
    });
  });  