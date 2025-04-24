document.addEventListener("DOMContentLoaded", function () {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
        card.classList.add('fade-in');
    });
});

// Update this function to correctly handle mobile dropdowns
document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  
  if (hamburger) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('nav-active');
      hamburger.classList.toggle('toggle');
    });
    
    // Handle mobile dropdown menus
    const dropdownItems = document.querySelectorAll('nav ul li.dropdown');
    
    // For mobile: add click event to parent menu items with dropdowns
    dropdownItems.forEach(item => {
      const link = item.querySelector('a');
      const dropdown = item.querySelector('.dropdown-content');
      
      if (link && dropdown) {
        // Add click listener to toggle dropdown
        link.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevent navigation
            
            // Toggle active class on the parent li
            item.classList.toggle('active');
            
            // Toggle the display of dropdown content
            if (dropdown.style.display === 'block') {
              dropdown.style.display = 'none';
            } else {
              // Close all other dropdowns first
              dropdownItems.forEach(otherItem => {
                if (otherItem !== item) {
                  otherItem.classList.remove('active');
                  const otherDropdown = otherItem.querySelector('.dropdown-content');
                  if (otherDropdown) {
                    otherDropdown.style.display = 'none';
                  }
                }
              });
              
              dropdown.style.display = 'block';
            }
          }
        });
      }
    });
    
    // For dropdown items: allow clicking on these links
    const dropdownLinks = document.querySelectorAll('nav ul li.dropdown .dropdown-content li a');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Only apply in mobile view
        if (window.innerWidth <= 768) {
          // Close the mobile menu when a dropdown item is clicked
          navMenu.classList.remove('nav-active');
          hamburger.classList.remove('toggle');
        }
      });
    });
    
    // Close menu when clicking on non-dropdown links
    const navLinks = document.querySelectorAll('nav ul li:not(.dropdown) > a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Only apply in mobile view
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('nav-active');
          hamburger.classList.remove('toggle');
        }
      });
    });
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      // Reset dropdown styles when switching to desktop
      document.querySelectorAll('.dropdown-content').forEach(menu => {
        menu.removeAttribute('style');
      });
      
      // Remove active classes
      document.querySelectorAll('nav ul li.dropdown').forEach(item => {
        item.classList.remove('active');
      });
    }
  });
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
