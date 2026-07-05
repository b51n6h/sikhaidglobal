// Contact Form Handler
// Sends contact form submissions to Firebase Cloud Function

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const subject = contactForm.querySelector('input[name="subject"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    // Disable submit button during submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

    try {
      // Send to Firebase Cloud Function
      const response = await fetch('https://us-central1-sikhaidglobal-33c5a.cloudfunctions.net/sendContactEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
      } else {
        showToast(result.error || 'Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showToast('An error occurred. Please try again later.', 'error');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
});
