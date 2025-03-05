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

  // Apply staggered delays to service items
  const serviceItems = Array.from(document.querySelectorAll('.service-item'));
  animateElements(serviceItems, 0.6, 0.2);

  // Apply staggered delays to form groups
  const formGroups = Array.from(document.querySelectorAll('.form-group'));
  animateElements(formGroups, 0.5, 0.15);

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

  // Get main content sections to animate
  const sectionsToAnimate = [
    '.digital-marketing-section',
    '#get-in-touch',
    '.contact-us',
    '.left-content h1',
    '.left-content p',
    '.left-content img',
    '.service-item',
    '.contact-form',
    '.submit-button'
  ].map(selector => Array.from(document.querySelectorAll(selector))).flat();

  // Add fade-in class and observe
  sectionsToAnimate.forEach(element => {
    if (!element.classList.contains('fade-in')) {
      element.classList.add('fade-in');
    }
    element.dataset.animated = 'false';
    observer.observe(element);
  });

  // Hamburger menu functionality (keeping this from original)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
  });
  }
});
