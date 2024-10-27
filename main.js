document.addEventListener("DOMContentLoaded", function () {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card) => {
        card.classList.add('fade-in');
    });
});

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});