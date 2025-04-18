
// Slideshow functionality with smooth transitions
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  
  // Handle edge cases
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  // First hide all slides with opacity transition
  for (i = 0; i < slides.length; i++) {
    slides[i].style.opacity = "0";
    slides[i].style.display = "none";
  }
  
  // Update active dot
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Show the active slide with a fade-in effect
  slides[slideIndex-1].style.display = "block";
  setTimeout(() => {
    slides[slideIndex-1].style.opacity = "1";
  }, 50);
  
  dots[slideIndex-1].className += " active";
}

// Auto slideshow
let slideTimer;
function startSlideTimer() {
  slideTimer = setInterval(() => {
    plusSlides(1);
  }, 5000); // Change slide every 5 seconds
}

// Start the timer when page loads
startSlideTimer();

// Pause the timer when hovering over the slideshow
document.querySelector('.slideshow-container').addEventListener('mouseenter', () => {
  clearInterval(slideTimer);
});

// Resume the timer when mouse leaves
document.querySelector('.slideshow-container').addEventListener('mouseleave', () => {
  startSlideTimer();
});

// Intersection Observer for triggering animations when elements come into view
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.1, // 10% of the item visible
    rootMargin: '0px 0px -50px 0px' // Offset
  });
  
  // Add the class to elements that should animate on scroll
  const sections = [
    '.va-services', 
    '.services', 
    '.contact-cta', 
    '.image-slideshow',
    '.contact-us'
  ];
  
  sections.forEach(section => {
    const elements = document.querySelectorAll(section);
    elements.forEach(el => {
      el.classList.add('fade-in-element');
      observer.observe(el);
    });
  });
});

// First, let's add the JavaScript to handle the mobile dropdown menus
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
    if (window.innerWidth <= 768) {
      dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown-content');
        
        // Add click listener to toggle dropdown
        link.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevent navigation
            
            // Toggle the display of dropdown content
            if (dropdown.style.display === 'block') {
              dropdown.style.display = 'none';
            } else {
              // Hide all other dropdowns first
              document.querySelectorAll('.dropdown-content').forEach(menu => {
                menu.style.display = 'none';
              });
              dropdown.style.display = 'block';
            }
          }
        });
      });
    }
    
    // Close menu when any non-dropdown nav link is clicked
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
    }
  });
});
