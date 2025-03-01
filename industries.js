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
    
    // Add scroll animation functionality
    const fadeElements = document.querySelectorAll(
        '.hero, .hero-content, .service-list, .section-title, .service-categories > li, .contact-us, .contact-form .form-row'
    );
    
    // Add 'not-visible' class to all elements initially
    fadeElements.forEach(element => {
        element.classList.add('not-visible');
        // Remove the initial animation that would play on page load
        element.style.animation = 'none';
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Function to check all elements and animate them if in viewport
    function checkElements() {
        fadeElements.forEach(element => {
            if (isInViewport(element) && element.classList.contains('not-visible')) {
                element.classList.remove('not-visible');
                element.classList.add('fade-in-visible');
            }
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', checkElements);
    
    // Run once on page load to animate initial elements in view
    checkElements();
});
