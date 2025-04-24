document.addEventListener("DOMContentLoaded", function () {
  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));

  // Display the booking date and time
  if (bookingDetails) {
      document.getElementById("bookingDate").innerText = `Date: ${bookingDetails.date}`;
      document.getElementById("bookingTime").innerText = `Time: ${bookingDetails.time}`;
  }

  // Handle form submission
  document.getElementById("bookingForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;

      if (name && email) {
          // Prepare the form data including booking details
          const formData = new FormData(this);
          formData.append("date", bookingDetails.date);
          formData.append("time", bookingDetails.time);

          // Send the form data via fetch API
          fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert("Booking confirmed! We'll get back to you soon.");
                  // Optionally, redirect or clear form fields here
                  this.reset(); // Clear form fields
              } else {
                  alert("There was an error with your booking. Please try again.");
              }
          })
          .catch(error => {
              console.error("Error:", error);
              alert("There was an error with your booking. Please try again.");
          });
      } else {
          alert("Please fill in the required fields.");
      }
  });
});

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
