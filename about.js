document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  
  if (!hamburger || !navMenu) {
    console.error('Navigation elements not found');
    return;
  }
  
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
          e.preventDefault(); // Prevent navigation on mobile
          
          // Close all other dropdowns first
          dropdownItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
              const otherDropdown = otherItem.querySelector('.dropdown-content');
              if (otherDropdown) {
                otherDropdown.style.display = 'none';
              }
            }
          });
          
          // Toggle active class and dropdown display
          const isActive = item.classList.toggle('active');
          dropdown.style.display = isActive ? 'block' : 'none';
        }
      });
    }
  });
  
  // Close mobile menu when clicking any menu item (dropdown or not)
  const allNavLinks = document.querySelectorAll('nav ul a');
  allNavLinks.forEach(link => {
    // Skip the dropdown parent links as they're handled separately
    if (!link.parentElement.classList.contains('dropdown') || 
        link.closest('.dropdown-content')) {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          // Close the mobile menu
          navMenu.classList.remove('nav-active');
          hamburger.classList.remove('toggle');
          
          // Also close any open dropdowns
          dropdownItems.forEach(item => {
            item.classList.remove('active');
            const dropdown = item.querySelector('.dropdown-content');
            if (dropdown) {
              dropdown.style.display = 'none';
            }
          });
        }
      });
    }
  });
  
  // Close the menu when clicking outside
  document.addEventListener('click', function(event) {
    // Only in mobile view
    if (window.innerWidth <= 768) {
      // Check if click is outside nav menu and hamburger
      if (!event.target.closest('nav') && !event.target.closest('.hamburger')) {
        // Close the mobile menu
        navMenu.classList.remove('nav-active');
        hamburger.classList.remove('toggle');
        
        // Close all dropdowns
        dropdownItems.forEach(item => {
          item.classList.remove('active');
          const dropdown = item.querySelector('.dropdown-content');
          if (dropdown) {
            dropdown.style.display = 'none';
          }
        });
      }
    }
  });
  
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
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initial animations for elements visible on load
  setTimeout(function() {
    animateElementsInView();
  }, 300);
  
  // Set up the Intersection Observer for elements that come into view on scroll
  setupIntersectionObserver();
  
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
  
  // Recheck animations on scroll (fallback for older browsers)
  window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in:not(.appear)');
    
    elements.forEach(function(element) {
      const rect = element.getBoundingClientRect();
      const isInViewport = (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
      
      if (isInViewport) {
        element.classList.add('appear');
      }
    });
  });
});
