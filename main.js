document.addEventListener("DOMContentLoaded", function () {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
        card.classList.add('fade-in');
    });
});

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

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
