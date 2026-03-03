// Loader
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(function() {
      document.getElementById('loader').style.display = 'none';
    }, 500);
  }, 1000);
});

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for your message! I will get back to you soon.');
  this.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
  }
});

// Certificate Modal Functionality
document.querySelectorAll('.btn-paper').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const certImg = this.closest('.certificate-card').querySelector('.certificate-img');
    const certTitle = this.closest('.certificate-content').querySelector('h4').textContent;
    const modal = new bootstrap.Modal(document.getElementById('certificateModal'));
    document.querySelector('#certificateModal .modal-title').textContent = certTitle;
    document.getElementById('modalCertificateImg').src = certImg.src;
    document.getElementById('modalCertificateImg').alt = certImg.alt;
    modal.show();
  });
});

// Initialize EmailJS
(function () {
  emailjs.init("wzawm93BlVmmk6g-F"); // ✅ Public Key
})();

// Form submit handler
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("statusMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.style.color = "black";
    status.textContent = "Sending message...";

    emailjs
      .sendForm(
        "service_2yhhtuv",   // ✅ Service ID
        "template_pvzumr8",  // ✅ Template ID
        form
      )
      .then(
        function () {
          status.style.color = "green";
          status.textContent = "✅ Message sent successfully!";
          form.reset();
        },
        function (error) {
          status.style.color = "red";
          status.textContent = "❌ Failed to send message.";
          console.error("EmailJS Error:", error);
        }
      );
  });
});
