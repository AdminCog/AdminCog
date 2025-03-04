document.addEventListener("DOMContentLoaded", function() {
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('nav-active');
      hamburger.classList.toggle('toggle');
      console.log('Hamburger clicked!');
    });
  } else {
    console.log('Hamburger element not found!');
  }
  
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
  
  // Create a dedicated observer for service items with more precise control
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        
        // Reset the animation
        item.style.animation = 'none';
        item.offsetHeight; // Trigger reflow
        
        // Apply enhanced animation with custom properties
        item.style.animation = `popIn 1.2s cubic-bezier(0.17, 0.84, 0.44, 1) forwards ${0.5 + 0.3 * item.dataset.index}s`;
        
        // Add a class for additional styling
        setTimeout(() => {
          item.classList.add('animated');
        }, 100);
        
        serviceObserver.unobserve(item);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: "-20px"
  });
  
  // Function to animate service items
  function animateServiceItems() {
    const serviceItems = document.querySelectorAll('.services-list li');
    
    serviceItems.forEach((item, index) => {
      // Add data index for animation timing
      item.dataset.index = index;
      
      // Observe each service item
      serviceObserver.observe(item);
      
      // Add hover interaction after animation
      setTimeout(() => {
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'translateY(-5px)';
          item.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
          
          // Subtle shift for the heading
          const heading = item.querySelector('h3');
          if (heading) heading.style.paddingLeft = '10px';
        });
        
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'translateY(0)';
          item.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          
          // Reset heading
          const heading = item.querySelector('h3');
          if (heading) heading.style.paddingLeft = '0';
        });
      }, (index * 300) + 1500); // Add interaction after animation completes
    });
  }
  
  // Add scroll event for parallax-like effect on services
  window.addEventListener('scroll', function() {
    const serviceItems = document.querySelectorAll('.services-list li.animated');
    
    serviceItems.forEach((item, index) => {
      const scrollPosition = window.scrollY;
      const offset = scrollPosition * 0.03 * (index % 2 === 0 ? 1 : -1);
      
      // Subtle parallax effect based on scroll position
      item.style.transform = `translateY(${offset * 0.5}px)`;
    });
    
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
    
    // Check scroll position on scroll
    checkScrollPosition();
  });
  
  // Run once on page load
  setTimeout(function() {
    // Trigger scroll check once on page load
    window.dispatchEvent(new Event('scroll'));
  }, 500);
});
