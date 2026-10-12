// Contact Form Handler
// Saves contact form submissions to Firebase Firestore

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
      // Check if Firebase is available
      if (typeof db === 'undefined') {
        showToast('Unable to connect to database. Please try again.', 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        return;
      }

      // Save to Firestore
      await db.collection('contact_messages').add({
        name: name,
        email: email,
        subject: subject,
        message: message,
        submittedAt: new Date().toISOString(),
        status: 'new'
      });

      showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      contactForm.reset();
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
