
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
//BLUB
document.addEventListener("DOMContentLoaded", function() {
  // Create Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add animation class when element is visible
      if (entry.isIntersecting) {
        // Reset the animation by removing and re-adding the element to restart animations
        const element = entry.target;
        
        // Get all animated children
        const animatedElements = element.querySelectorAll('[class*="fadeIn"]');
        animatedElements.forEach(el => {
          // Reset the animation
          el.style.animation = 'none';
          el.offsetHeight; // Trigger reflow
          el.style.animation = null;
        });
        
        // Stop observing after it's been seen
        observer.unobserve(element);
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
  
  // Additional animation when scrolling for services list items
  function checkScroll() {
    const serviceItems = document.querySelectorAll('.services-list li');
    const joinSection = document.querySelector('.join-us');
    const contactSection = document.querySelector('.contact-us');
    
    serviceItems.forEach((item, index) => {
      const itemPosition = item.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (itemPosition < screenPosition) {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }
    });
    
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
  
  // Run on scroll
  window.addEventListener('scroll', checkScroll);
  
  // Run once on page load
  setTimeout(checkScroll, 500);
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
