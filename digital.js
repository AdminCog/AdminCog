// This script should be placed at the end of your HTML document or loaded with defer attribute
document.addEventListener('DOMContentLoaded', function() {
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Function to add animation with delay to elements
  function animateElements(elements, baseDelay = 0, increment = 0.1) {
    elements.forEach((element, index) => {
      // Set the animation delay
      const delay = baseDelay + (index * increment);
      element.style.animationDelay = delay + 's';
      
      // Mark the element for observation
      element.dataset.animated = 'false';
      
      // Add the element to the observer if it's not already in view
      if (!isInViewport(element)) {
        observer.observe(element);
      } else {
        // If already in view, trigger animation
        element.dataset.animated = 'true';
      }
    });
  }

  // Apply staggered delays to nav items
  const navItems = Array.from(document.querySelectorAll('nav ul li'));
  animateElements(navItems, 0.3, 0.1);

  // Apply staggered delays to service items
  const serviceItems = Array.from(document.querySelectorAll('.service-item'));
  animateElements(serviceItems, 0.8, 0.2);

  // Apply staggered delays to form groups
  const formGroups = Array.from(document.querySelectorAll('.form-group'));
  animateElements(formGroups, 0.6, 0.15);

  // Apply staggered delays to footer elements
  const footerElements = Array.from(document.querySelectorAll('.footer-info, .footer-links, .footer-copyright'));
  animateElements(footerElements, 0.3, 0.2);

  // Create an intersection observer to trigger animations when elements come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.dataset.animated === 'false') {
        // Element is now visible, let the animation play by keeping the animation delay
        entry.target.dataset.animated = 'true';
        // Stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible

  // Add a scroll animation trigger for elements that come into view later
  const allAnimatedElements = document.querySelectorAll('.fade-in');
  allAnimatedElements.forEach(element => {
    element.dataset.animated = 'false';
    observer.observe(element);
  });

  // Apply fade-in class to all major sections on page load
  const sectionsToAnimate = document.querySelectorAll('section, header, footer, .container');
  sectionsToAnimate.forEach(section => {
    if (!section.classList.contains('fade-in')) {
      section.classList.add('fade-in');
    }
  });

  // Handle hamburger menu toggle with animation
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('toggle');
      navMenu.classList.toggle('nav-active');
      
      // Re-animate nav items when menu is opened
      if (navMenu.classList.contains('nav-active')) {
        navItems.forEach((item, index) => {
          item.style.opacity = 0;
          item.style.animation = 'fadeIn 0.5s ease forwards';
          item.style.animationDelay = (0.3 + index * 0.1) + 's';
        });
      }
    });
  }
});
