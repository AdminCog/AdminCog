// Add this to your industries.js file or create it if it doesn't exist

document.addEventListener('DOMContentLoaded', function() {
    // Handle hamburger menu (keeping existing functionality)
// Hamburger menu functionality (keeping this from original)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
  });
}
    
    // Add scroll animation functionality
    
    // First, add fade-element class to all elements we want to animate
    const elementsToAnimate = [
        '.hero-content',
        '.service-list .section-title',
        '.service-categories > li',
        '.contact-us h2',
        '.contact-form',
        '.contact-form .form-row'
    ];
    
    // Apply the fade-element class to all target elements
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('fade-element');
        });
    });
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is intersecting (visible in viewport)
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');
                // Stop observing the element after it's been animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Element comes into view when it's 20% visible
        threshold: 0.2,
        // Start animation slightly before element comes into view
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all elements with fade-element class
    document.querySelectorAll('.fade-element').forEach(element => {
        observer.observe(element);
    });
});
