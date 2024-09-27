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

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});
