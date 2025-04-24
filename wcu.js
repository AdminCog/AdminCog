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
  
  // Join and Contact sections
  const joinSection = document.querySelector('.join-us');
  const contactSection = document.querySelector('.contact-us');
  
  // Create Intersection Observer for general animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add animation class when element is visible
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Special handling for service list items when parent is visible
        if (entry.target.classList.contains('services-section')) {
          animateServiceItems();
        }
        
        // Stop observing after it's been seen
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.1, // trigger when 10% of the element is visible
    rootMargin: "-50px" // slightly before it comes into view
  });
  
  // Observe main sections
  const sections = document.querySelectorAll('.hero, .services-section, .join-us, .contact-us');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Create a dedicated observer for service items with smooth fade effect
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        
        // Apply smooth fade in effect
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        
        // Stagger the animations based on index
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
          
          // Add a class for additional styling
          setTimeout(() => {
            item.classList.add('animated');
          }, 400);
        }, 150 * item.dataset.index);
        
        serviceObserver.unobserve(item);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px"
  });
  
  // Function to animate service items
  function animateServiceItems() {
    const serviceItems = document.querySelectorAll('.services-list li');
    
    serviceItems.forEach((item, index) => {
      // Add data index for animation timing
      item.dataset.index = index;
      
      // Set initial state (invisible)
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      
      // Start observing each service item
      serviceObserver.observe(item);
      
      // Add subtle hover interaction after animation completes
      setTimeout(() => {
        item.addEventListener('mouseenter', () => {
          item.style.transform = "translateY(-5px)";
          item.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
          item.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
          
          // Subtle shift for the heading
          const heading = item.querySelector('h3');
          if (heading) {
            heading.style.paddingLeft = "10px";
            heading.style.transition = "padding-left 0.3s ease";
          }
        });
        
        item.addEventListener('mouseleave', () => {
          item.style.transform = "translateY(0)";
          item.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
          
          // Reset heading
          const heading = item.querySelector('h3');
          if (heading) heading.style.paddingLeft = "0";
        });
      }, 1000 + (index * 150)); // Wait for animation to complete
    });
  }
  
  // Function to check scroll position and animate sections
  function checkScrollPosition() {
    // Check for Join Us section
    if (joinSection) {
      const position = joinSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (position < screenPosition) {
        const elements = joinSection.querySelectorAll('h2, p, .join-button');
        elements.forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, 200 * index);
        });
      }
    }
    
    // Check for Contact Us section
    if (contactSection) {
      const position = contactSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (position < screenPosition) {
        const formRows = contactSection.querySelectorAll('.form-row');
        formRows.forEach((row, index) => {
          setTimeout(() => {
            row.style.opacity = "1";
            row.style.transform = "translateY(0)";
          }, 200 * index);
        });
      }
    }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', function() {
    // Check scroll position
    checkScrollPosition();
  });
  
  // Run once on page load
  setTimeout(function() {
    // Trigger scroll check once on page load
    checkScrollPosition();
  }, 500);
});
