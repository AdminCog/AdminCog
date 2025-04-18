// Hamburger menu functionality
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

// Add fade-in animation for page elements
document.addEventListener('DOMContentLoaded', function() {
  // Add all elements we want to animate, excluding the navigation bar
  const elements = document.querySelectorAll(
    '.digital-marketing-section, .left-content h1, .left-content p, .left-content img, ' +
    '.service-item, #get-in-touch, #get-in-touch h2, #get-in-touch p, ' +
    '.contact-us, .contact-us h2, .contact-form, .form-group, ' + 
    '.submit-button, .footer-container'
  );
  
  // Delayed visibility with slower animation
  setTimeout(function() {
    elements.forEach(function(el, index) {
      setTimeout(function() {
        el.classList.add('show-element');
      }, index * 180); // 180ms delay between each element
    });
  }, 400); // Initial delay before animations start
});
