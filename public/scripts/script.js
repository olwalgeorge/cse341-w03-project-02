// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the dashboard page
    if (window.location.pathname.includes('dashboard')) {
        // Fetch user data
        fetch('/users/profile')
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    // Update user name in the dashboard
                    const userNameElement = document.getElementById('userName');
                    if (userNameElement) {
                        userNameElement.textContent = data.data.fullName || data.data.username;
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                // Redirect to login if unauthorized
                if (error.status === 401) {
                    window.location.href = '/login.html';
                }
            });
    }

    // Login form handling
    const loginForm = document.querySelector('form[action="/auth/login"]');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(loginForm);
            fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                }
            })
            .catch(error => console.error('Login error:', error));
        });
    }
});