document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  
  if (hamburger && navMenu) {  // Added null check for navMenu
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
      link.addEventListener('click', (e) => {  // Added event parameter
        // Only apply in mobile view
        if (window.innerWidth <= 768) {
          // Close the mobile menu when a dropdown item is clicked
          navMenu.classList.remove('nav-active');
          hamburger.classList.remove('toggle');
          
          // Find parent dropdown and close it
          const parentDropdown = link.closest('.dropdown-content');
          if (parentDropdown) {
            parentDropdown.style.display = 'none';
            const parentItem = parentDropdown.closest('.dropdown');
            if (parentItem) {
              parentItem.classList.remove('active');
            }
          }
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
    
    // Close dropdown menus when clicking outside
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        // Don't close if clicking inside the dropdown or hamburger
        if (!e.target.closest('.dropdown') && !e.target.closest('.hamburger')) {
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
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {  // Check if elements exist
      elements.forEach((element, index) => {
        element.classList.add('fade-element');
        // Add data-delay for staggered animations
        element.dataset.delay = index * 150;
        
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      });
    }
  });
  
  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If element is intersecting (visible in viewport)
      if (entry.isIntersecting) {
        const element = entry.target;
        const delay = parseInt(element.dataset.delay || 0);
        
        // Add visible class to trigger animation
        setTimeout(() => {
          element.classList.add('visible');
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, delay);
        
        // Stop observing the element after it's been animated
        observer.unobserve(element);
      }
    });
  }, {
    // Element comes into view when it's 20% visible
    threshold: 0.2,
    // Start animation slightly before element comes into view
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Wait a short time to ensure elements are ready in the DOM
  setTimeout(() => {
    // Observe all elements with fade-element class
    document.querySelectorAll('.fade-element').forEach(element => {
      observer.observe(element);
    });
    
    // Manually trigger animation for elements already in view
    document.querySelectorAll('.fade-element').forEach(element => {
      const rect = element.getBoundingClientRect();
      const isInViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
      
      if (isInViewport) {
        const delay = parseInt(element.dataset.delay || 0);
        setTimeout(() => {
          element.classList.add('visible');
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, delay + 100);  // Add extra 100ms delay for initial view
        observer.unobserve(element);
      }
    });
  }, 100);
  
  // Handle specific animations for service categories if they exist
  const serviceCategories = document.querySelectorAll('.service-categories > li');
  if (serviceCategories.length > 0) {
    serviceCategories.forEach((item, index) => {
      // Add hover effect after animation completes
      setTimeout(() => {
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'translateY(-5px)';
          item.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
          item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateY(0)';
          item.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
      }, 1500);  // Wait for initial animations to complete
    });
  }
});
