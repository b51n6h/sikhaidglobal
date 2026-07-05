// Common JavaScript Functions

// Initialize AOS (Animate on Scroll)
function initAOS() {
  AOS.init({
    once: true,
    duration: 600,
    offset: 100
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Initialize common on page load
document.addEventListener('DOMContentLoaded', function() {
  initAOS();
  initNavbarScroll();
});

// Toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; width: 90%; max-width: 400px;';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 5000);
}
