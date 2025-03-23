document.addEventListener('DOMContentLoaded', function() {
  // Utility function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= windowHeight &&
      rect.right <= windowWidth
    );
  }

  // Function to add animation with delay to elements
  function animateElements(selector, baseDelay = 0, increment = 0.1) {
    const elements = Array.from(document.querySelectorAll(selector));
    
    elements.forEach((element, index) => {
      // Set the animation delay
      const delay = baseDelay + (index * increment);
      
      // Add animation properties
      element.style.opacity = '0';
      element.style.animationDelay = `${delay}s`;
      element.classList.add('fade-in');
      
      // Mark the element for observation
      element.dataset.animated = 'false';
    });
  }

  // Create an intersection observer to trigger animations when elements come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.dataset.animated === 'false') {
        // Element is now visible, let the animation play
        entry.target.dataset.animated = 'true';
        entry.target.style.opacity = '1';
        
        // Stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1, // Trigger when at least 10% of the element is visible
    rootMargin: '0px' // Ensure consistent behavior across browsers
  });

  // Sections and elements to animate
  const animationConfig = [
    { selector: '.service-item', baseDelay: 0.6, increment: 0.2 },
    { selector: '.form-group', baseDelay: 0.5, increment: 0.15 },
    { selector: '.digital-marketing-section', baseDelay: 0.2 },
    { selector: '#get-in-touch', baseDelay: 0.3 },
    { selector: '.contact-us', baseDelay: 0.4 },
    { selector: '.left-content h1', baseDelay: 0.3 },
    { selector: '.left-content p', baseDelay: 0.4 },
    { selector: '.left-content img', baseDelay: 0.5 },
    { selector: '.contact-form', baseDelay: 0.5 },
    { selector: '.submit-button', baseDelay: 0.6 }
  ];

  // Apply animations and observe elements
  animationConfig.forEach(config => {
    animateElements(config.selector, config.baseDelay, config.increment);
    
    const elements = document.querySelectorAll(config.selector);
    elements.forEach(element => {
      observer.observe(element);
    });
  });

  // Hamburger menu functionality
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

  // Initialize mobile navigation
  setupMobileNavigation();
});
