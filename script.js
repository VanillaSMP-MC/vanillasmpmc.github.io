// Page navigation function
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const buttons = document.querySelectorAll('.sidebar-btn');
    
    // Remove active class from all pages and buttons
    pages.forEach(page => page.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected page
    document.getElementById(pageId).classList.add('active');
    
    // Add active class to clicked button
    event.target.closest('.sidebar-btn').classList.add('active');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Purchase function - redirects to PayPal with amount
function buyProduct(price) {
    const paypalUrl = `https://paypal.me/VanillaSMPMC/${price}`;
    window.open(paypalUrl, '_blank');
}

// Login Modal Functions
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
        closeLoginModal();
    }
}

// Login user with Minecraft username
function loginUser() {
    const username = document.getElementById('usernameInput').value.trim();
    
    if (!username) {
        alert('Please enter a Minecraft username');
        return;
    }
    
    // Validate username (Minecraft usernames are 3-16 characters, alphanumeric and underscores)
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    if (!usernameRegex.test(username)) {
        alert('Please enter a valid Minecraft username (3-16 characters, letters, numbers, and underscores only)');
        return;
    }
    
    // Save username to browser storage (for this session)
    sessionStorage.setItem('mcUsername', username);
    
    // Update the player info display
    updatePlayerInfo(username);
    
    // Close modal
    closeLoginModal();
    
    // Clear input
    document.getElementById('usernameInput').value = '';
}

// Update player info display with username
function updatePlayerInfo(username) {
    const playerInfoDiv = document.getElementById('playerInfo');
    
    // Use Crafatar API to get player head
    const skinUrl = `https://crafatar.com/avatars/${username}?overlay`;
    
    playerInfoDiv.innerHTML = `
        <div class="guest-badge" onclick="logout()">
            <img src="${skinUrl}" alt="${username}" class="player-head" onerror="this.src='https://crafatar.com/avatars/8667ba71b85a4004af54457a9734eed7'">
            <div class="guest-text">
                <div class="guest-name">${username}'s Bag</div>
                <div class="click-login">click to logout</div>
            </div>
        </div>
    `;
}

// Logout function
function logout() {
    sessionStorage.removeItem('mcUsername');
    location.reload();
}

// Check if user is already logged in on page load
window.addEventListener('load', function() {
    const savedUsername = sessionStorage.getItem('mcUsername');
    if (savedUsername) {
        updatePlayerInfo(savedUsername);
    }
    
    // Logo error handling
    const logoElement = document.querySelector('.main-logo');
    if (logoElement) {
        logoElement.onerror = function() {
            console.log('Logo not found. Please add logo.png to your root directory.');
        };
    }
    
    // Add enter key support for login
    const usernameInput = document.getElementById('usernameInput');
    if (usernameInput) {
        usernameInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                loginUser();
            }
        });
    }
});
