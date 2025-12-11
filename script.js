// Page navigation function
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const buttons = document.querySelectorAll('.nav-btn');
    
    // Remove active class from all pages and buttons
    pages.forEach(page => page.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected page
    document.getElementById(pageId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Purchase function - redirects to PayPal with amount
function buyProduct(price) {
    const paypalUrl = `https://paypal.me/VanillaSMPMC/${price}`;
    window.open(paypalUrl, '_blank');
}

// Optional: Load logo from file
window.addEventListener('load', function() {
    const logoElement = document.getElementById('serverLogo');
    // The logo src is already set in the HTML to 'logo.png'
    // You can add error handling here if needed
    logoElement.onerror = function() {
        console.log('Logo not found. Please add logo.png to your root directory.');
    };
});
