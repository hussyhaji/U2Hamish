function handleCredentialResponse(response) {
    // Decode the JWT token
    const responsePayload = decodeJwtResponse(response.credential);
    const email = responsePayload.email;
    const messageDiv = document.getElementById('message');
    
    // Clear previous messages
    messageDiv.className = '';
    messageDiv.textContent = '';
    
    // Validate email format
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@jameasaifiyah\.edu$/;
    
    if (!emailRegex.test(email)) {
        messageDiv.className = 'error';
        messageDiv.textContent = 'Access denied. Only @jameasaifiyah.edu emails are allowed, and email cannot start with a number.';
        return;
    }
    
    // Successful login
    localStorage.setItem('loggedInUser', email);
    messageDiv.className = 'success';
    messageDiv.textContent = 'Login successful! Welcome, ' + email.split('@')[0] + '!';
    
    // Redirect to main site
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}