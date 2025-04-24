document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const timeSlots = document.getElementById("timeSlots");
    const selectedDateText = document.getElementById("selectedDateText");
    const serviceDate = document.getElementById("serviceDate");
    const serviceTime = document.getElementById("serviceTime");
    const nextButton = document.getElementById("nextButton");
  
    let selectedDate = null;
    let selectedTime = null;
    let currentMonthOffset = 0;
  
    // Generate a dynamic calendar for the current month
    function generateCalendar(monthOffset = 0) {
      const currentDate = moment().add(monthOffset, 'months');
      const startOfMonth = currentDate.startOf('month').day(); // First day of the month
      const daysInMonth = currentDate.daysInMonth();
      const today = moment(); // Current date
  
      let calendarHTML = `<div class="calendar-navigation">
                            <button class="prevMonth"><i class="fas fa-chevron-left"></i></button>
                            <h6>${currentDate.format('MMMM YYYY')}</h6>
                            <button class="nextMonth"><i class="fas fa-chevron-right"></i></button>
                          </div>
                          <table class="table table-bordered text-center mt-2">
                            <thead>
                              <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                              </tr>
                            </thead>
                            <tbody>`;
  
      let dayCounter = 1;
      let isCurrentMonth = monthOffset === 0;
  
      for (let week = 0; week < 6; week++) {
        calendarHTML += "<tr>";
  
        for (let day = 0; day < 7; day++) {
          if (week === 0 && day < startOfMonth || dayCounter > daysInMonth) {
            calendarHTML += "<td></td>";
          } else {
            const isToday = isCurrentMonth && dayCounter === today.date();
            const isSelected = selectedDate && selectedDate.date() === dayCounter && selectedDate.month() === currentDate.month();
            const dateClass = isToday ? "current-date" : isSelected ? "selected-date" : "btn-light";
            calendarHTML += `<td><button class="btn ${dateClass} selectDate" data-day="${dayCounter}">${dayCounter}</button></td>`;
            dayCounter++;
          }
        }
        calendarHTML += "</tr>";
      }
  
      calendarHTML += "</tbody></table>";
      calendar.innerHTML = calendarHTML;
  
      // Event listeners for changing months
      document.querySelector(".prevMonth").addEventListener("click", () => {
        currentMonthOffset--;
        generateCalendar(currentMonthOffset);
      });
  
      document.querySelector(".nextMonth").addEventListener("click", () => {
        currentMonthOffset++;
        generateCalendar(currentMonthOffset);
      });
  
      // Event listeners for selecting a date
      document.querySelectorAll(".selectDate").forEach((button) => {
        button.addEventListener("click", (e) => {
          const day = e.target.getAttribute("data-day");
          selectedDate = currentDate.clone().date(day);
          displaySelectedDate();
          generateTimeSlots();
          generateCalendar(currentMonthOffset); // Regenerate to apply selected style
        });
      });
    }
  
    // Display selected date in the time slot section
    function displaySelectedDate() {
      selectedDateText.innerText = `Selected Date: ${selectedDate.format("dddd, D MMMM")}`;
      serviceDate.innerText = `Date: ${selectedDate.format("D MMMM YYYY")}`;
    }
  
    // Generate time slots for the selected date
    function generateTimeSlots() {
      timeSlots.innerHTML = "";
      const slotTimes = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM"];
  
      slotTimes.forEach(time => {
        const button = document.createElement("button");
        button.className = `btn btn-light timeSlot`;
        button.innerText = time;
        button.addEventListener("click", () => {
          selectedTime = time;
          serviceTime.innerText = `Time: ${selectedTime}`;
          enableNextButton();
          highlightSelectedTime(button); // Highlight the selected time
        });
        timeSlots.appendChild(button);
      });
    }
  
    // Highlight the selected time slot
    function highlightSelectedTime(selectedButton) {
      document.querySelectorAll(".timeSlot").forEach(button => {
        button.classList.remove("selected-time");
      });
      selectedButton.classList.add("selected-time");
    }
  
    // Enable "Next" button once both date and time are selected
    function enableNextButton() {
      if (selectedDate && selectedTime) {
        nextButton.disabled = false;
      }
    }
  
    // Event listener for the "Next" button to store the booking details and redirect
    nextButton.addEventListener("click", function() {
      // Store the selected date and time in local storage or pass it through query params.
      const bookingDetails = {
        date: selectedDate.format("D MMMM YYYY"),
        time: selectedTime
      };
      localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
  
      // Redirect to the booking form page.
      window.location.href = "book-form.html";
    });
  
    // Initial calendar load
    generateCalendar();
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
  
