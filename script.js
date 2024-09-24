
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}


// JavaScript for hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});


// JavaScript to toggle full text view on smaller screens
document.addEventListener("DOMContentLoaded", function() {
    const description = document.querySelector('.hero-description');
    let expanded = false;

    // Function to expand or collapse the text
    function toggleDescription() {
        if (!expanded) {
            // Expand the text by removing the truncation
            description.style.webkitLineClamp = 'unset';
            expanded = true;
        } else {
            // Collapse the text by reapplying the truncation
            description.style.webkitLineClamp = 3;
            expanded = false;
        }
    }

    // Event listener for clicking on the description to expand/collapse
    description.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent this click from bubbling to the document
        toggleDescription();
    });

    // Event listener for clicking outside the description to collapse it
    document.addEventListener('click', function(event) {
        if (expanded && !description.contains(event.target)) {
            // If text is expanded and the click is outside the description, collapse the text
            toggleDescription();
        }
    });
});
