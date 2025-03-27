// public/js/login.js
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessageDiv = document.getElementById('errorMessage');

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful!');
            // Store user data or token if needed (e.g., localStorage)
            console.log('Logged in user:', data);
            // Redirect to a dashboard or profile page
        } else {
            errorMessageDiv.textContent = data.message || 'Login failed.';
        }
    } catch (error) {
        errorMessageDiv.textContent = 'An error occurred during login.';
        console.error(error);
    }
});