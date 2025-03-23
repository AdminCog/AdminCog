document.addEventListener("DOMContentLoaded", function () {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
        card.classList.add('fade-in');
    });
});

// Hamburger menu functionality (modified to close on link click)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger) {
  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
  });
  
  // Close menu when any nav link is clicked
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Only apply in mobile view (you can adjust the breakpoint as needed)
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
      }
    });
  });
}
// Add this to a new file called animation.js or include in your main.js

document.addEventListener('DOMContentLoaded', function() {
    // Wait for a moment after page load before starting animations
    setTimeout(function() {
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }

        // Function to activate elements that are in viewport
        function activateElementsInViewport() {
            // Hero section elements
            const heroElements = document.querySelectorAll('.hero-image, .hero-content-box, .hero-content-box h1, .hero-content-box p');
            heroElements.forEach(element => {
                if (isInViewport(element)) {
                    element.classList.add('active');
                }
            });

            // Service cards
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach(card => {
                if (isInViewport(card)) {
                    card.classList.add('active');
                }
            });

            // Contact section elements
            const contactElements = document.querySelectorAll('.contact-us h2, .contact-form, .contact-form .form-row');
            contactElements.forEach(element => {
                if (isInViewport(element)) {
                    element.classList.add('active');
                }
            });

            // Footer elements
            const footerElements = document.querySelectorAll('.footer-info, .footer-links, .footer-copyright');
            footerElements.forEach(element => {
                if (isInViewport(element)) {
                    element.classList.add('active');
                }
            });
        }

        // Initial check for elements in viewport
        activateElementsInViewport();

        // Listen for scroll events to activate elements as they come into view
        window.addEventListener('scroll', function() {
            activateElementsInViewport();
        });
    }, 200); // Small delay after page load
});
