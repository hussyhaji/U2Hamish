function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    const email = data.email;

    const messageBox = document.getElementById("message");

    if (isValidEmail(email)) {
        messageBox.style.color = "green";
        messageBox.innerText = "Access Granted: " + email;

        // ✅ Redirect to your main site
        setTimeout(() => {
            window.location.href = "mainpage.html"; // change if needed
        }, 1000);

    } else {
        messageBox.style.color = "red";
        messageBox.innerText = "Access Denied";

        // ❌ Optional: sign out user
        google.accounts.id.disableAutoSelect();
    }
}

// 🔐 Decode JWT token
function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
}

// ✅ Your rules
function isValidEmail(email) {

    // Rule 1: Must be your domain
    if (!email.endsWith("@jameasaifiyah.edu")) {
        return false;
    }

    // Rule 2: Must NOT start with a number
    const localPart = email.split("@")[0];

    if (/^[0-9]/.test(localPart)) {
        return false;
    }

    return true;
}

localStorage.setItem("user", email);