document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const loginToggle = document.getElementById('login-toggle');
  const registerToggle = document.getElementById('register-toggle');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const responseMessage = document.getElementById('response-message');

  // Toggle between forms
  const toggleForms = (showLogin) => {
    loginToggle.classList.toggle('active', showLogin);
    registerToggle.classList.toggle('active', !showLogin);
    loginForm.classList.toggle('hidden', !showLogin);
    registerForm.classList.toggle('hidden', showLogin);
    clearResponse();
  };

  loginToggle.addEventListener('click', () => toggleForms(true));
  registerToggle.addEventListener('click', () => toggleForms(false));

  // Handle login
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      showResponse(data.message, response.ok ? 'success' : 'error');
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setTimeout(() => window.location.href = '/dashboard.html', 1500);
      }
    } catch (err) {
      showResponse('Network error. Please try again.', 'error');
    }
  });

  // Handle registration
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userData = {
      username: document.getElementById('register-username').value.trim(),
      email: document.getElementById('register-email').value.trim(),
      password: document.getElementById('register-password').value,
      fullName: document.getElementById('register-fullName').value.trim() || undefined,
      role: document.getElementById('register-role').value
    };

    // Validation
    if (userData.password !== document.getElementById('register-confirm').value) {
      showResponse('Passwords do not match', 'error');
      return;
    }

    if (userData.password.length < 6) {
      showResponse('Password must be at least 6 characters', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      showResponse('Invalid email format', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      showResponse(data.message, response.ok ? 'success' : 'error');
      
      if (response.ok) {
        setTimeout(() => toggleForms(true), 1500);
        registerForm.reset();
      }
    } catch (err) {
      showResponse('Network error. Please try again.', 'error');
    }
  });

  // Helper functions
  function showResponse(message, type) {
    responseMessage.textContent = message;
    responseMessage.className = `response-message show ${type}`;
    setTimeout(() => {
      responseMessage.classList.remove('show');
    }, 5000);
  }

  function clearResponse() {
    responseMessage.className = 'response-message';
  }
});