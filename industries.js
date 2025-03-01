// Add this to your industries.js file or create it if it doesn't exist

document.addEventListener('DOMContentLoaded', function() {
    // Handle hamburger menu (keeping existing functionality)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }
});
