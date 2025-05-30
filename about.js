document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded");
  
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  
  console.log("Navigation elements:", { 
    hamburgerExists: !!hamburger, 
    navMenuExists: !!navMenu
  });
  
  if (hamburger && navMenu) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
      console.log("Hamburger clicked");
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
            console.log("Dropdown clicked:", link.textContent);
            
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
  
  // Initialize animations after navigation setup
  initAnimations();
});

// Animation functionality
function initAnimations() {
  // Initial animations for elements visible on load
  setTimeout(function() {
    animateElementsInView();
  }, 300);
  
  // Set up the Intersection Observer for elements that come into view on scroll
  setupIntersectionObserver();
}

// Function to animate all elements that are initially in the viewport
function animateElementsInView() {
  const elements = document.querySelectorAll('header, section, .founder-box, .mission-left, .mission-right, .service-item, h1, h2, p, .hero-image, .founder-image, .certificate-image, .contact-form, footer');
  
  elements.forEach(function(element) {
    // Add the fade-in class if it doesn't already have it
    if (!element.classList.contains('fade-in')) {
      element.classList.add('fade-in');
    }
    
    // Check if the element is in the viewport
    const rect = element.getBoundingClientRect();
    const isInViewport = (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
    
    if (isInViewport) {
      // Add a slight delay for each element to create a cascading effect
      setTimeout(function() {
        element.classList.add('appear');
      }, 100);
    }
  });
}

// Set up Intersection Observer to handle animations as elements come into view
function setupIntersectionObserver() {
  const options = {
    root: null, // Use viewport as root
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Add a slight delay before starting the animation
        setTimeout(function() {
          element.classList.add('appear');
        }, 150);
        
        // Once the element has been animated, we don't need to observe it anymore
        observer.unobserve(element);
      }
    });
  }, options);
  
  // Find all elements to observe
  const elementsToAnimate = document.querySelectorAll('header, section, .founder-box, .mission-left, .mission-right, .service-item, h1, h2, p, .hero-image, .founder-image, .certificate-image, .contact-form, footer');
  
  elementsToAnimate.forEach(function(element) {
    element.classList.add('fade-in'); // Add the fade-in class
    observer.observe(element); // Start observing the element
  });
}
