// Modal Forms for Donor and Volunteer Registration

// Initialize modal forms
function initModalForms() {
  createDonorModal();
  createVolunteerModal();
}

// Create Donor Registration Modal
function createDonorModal() {
  const modal = document.createElement('div');
  modal.id = 'donorModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content modal-md">
      <div class="modal-header">
        <h2><i class="fas fa-heart text-orange me-2"></i>Become a Donor</h2>
        <button class="modal-close" onclick="closeDonorModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <p style="color: #6B7280; margin-bottom: 24px;">
          Join our community of donors making a real difference. Your contribution helps us educate, empower, and uplift communities across the UK, USA, and India.
        </p>
        <form id="donorForm" onsubmit="handleDonorSubmit(event)">
          <div class="form-group">
            <label for="donor_name">Full Name *</label>
            <input type="text" id="donor_name" name="name" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="donor_email">Email Address *</label>
            <input type="email" id="donor_email" name="email" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="donor_phone">Phone (Optional)</label>
            <input type="tel" id="donor_phone" name="phone" class="form-input">
          </div>
          <div class="form-group">
            <label for="donor_country">Country *</label>
            <select id="donor_country" name="country" class="form-input" required>
              <option value="">Select your country</option>
              <option value="UK">United Kingdom</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="India">India</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" class="btn-submit">
            <i class="fas fa-paper-plane me-2"></i>Register as Donor
          </button>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// Create Volunteer Registration Modal
function createVolunteerModal() {
  const modal = document.createElement('div');
  modal.id = 'volunteerModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content modal-md">
      <div class="modal-header">
        <h2><i class="fas fa-handshake text-orange me-2"></i>Become a Volunteer</h2>
        <button class="modal-close" onclick="closeVolunteerModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <p style="color: #6B7280; margin-bottom: 24px;">
          Help us make a real difference! Share your skills and time with communities that need your support.
        </p>
        <form id="volunteerForm" onsubmit="handleVolunteerSubmit(event)">
          <div class="form-group">
            <label for="vol_name">Full Name *</label>
            <input type="text" id="vol_name" name="name" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="vol_email">Email Address *</label>
            <input type="email" id="vol_email" name="email" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="vol_phone">Phone (Optional)</label>
            <input type="tel" id="vol_phone" name="phone" class="form-input">
          </div>
          <div class="form-group">
            <label for="vol_skills">Skills/Expertise (Optional)</label>
            <textarea id="vol_skills" name="skills" class="form-input" style="resize: vertical; min-height: 80px;" placeholder="Tell us about your skills..."></textarea>
          </div>
          <button type="submit" class="btn-submit">
            <i class="fas fa-paper-plane me-2"></i>Register as Volunteer
          </button>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// Add modal styles to page
function addModalStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 2000;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal-content {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 20px 80px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      max-width: 500px;
      width: 100%;
      animation: slideUp 0.3s ease;
    }

    .modal-md {
      max-width: 480px;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal-header {
      background: linear-gradient(135deg, #00365B 0%, rgba(0,54,91,.8) 100%);
      color: #fff;
      padding: 28px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 800;
    }

    .modal-close {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .modal-close:hover {
      background: rgba(255,255,255,.2);
    }

    .modal-body {
      padding: 28px 24px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      color: #00365B;
      margin-bottom: 8px;
      font-size: 0.95rem;
    }

    .form-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #D1D5DB;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.95rem;
      transition: all 0.3s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #F44708;
      box-shadow: 0 0 0 3px rgba(244, 71, 8, 0.1);
    }

    .btn-submit {
      width: 100%;
      padding: 14px 24px;
      background: #F44708;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-submit:hover {
      background: #00365B;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(244, 71, 8, 0.3);
    }

    .btn-submit:active {
      transform: translateY(0);
    }

    .text-orange {
      color: #F44708;
    }

    @media (max-width: 640px) {
      .modal-content {
        max-width: 100%;
      }

      .modal-header h2 {
        font-size: 1.2rem;
      }

      .modal-body {
        padding: 20px 16px;
      }
    }
  `;
  document.head.appendChild(style);
}

// Show Donor Modal
function openDonorModal() {
  document.getElementById('donorModal').classList.add('active');
}

// Close Donor Modal
function closeDonorModal() {
  document.getElementById('donorModal').classList.remove('active');
  document.getElementById('donorForm').reset();
}

// Show Volunteer Modal
function openVolunteerModal() {
  document.getElementById('volunteerModal').classList.add('active');
}

// Close Volunteer Modal
function closeVolunteerModal() {
  document.getElementById('volunteerModal').classList.remove('active');
  document.getElementById('volunteerForm').reset();
}

// Handle Donor Form Submission
async function handleDonorSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = document.getElementById('donor_name').value;
  const email = document.getElementById('donor_email').value;
  const phone = document.getElementById('donor_phone').value;
  const country = document.getElementById('donor_country').value;

  try {
    // Send to Firebase Cloud Function
    const response = await fetch('https://us-central1-sikh-aid-global.cloudfunctions.net/sendDonorEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        country: country
      })
    });

    if (response.ok) {
      showToast('Thank you for registering as a donor! We will contact you soon.', 'success');
      closeDonorModal();
    } else {
      showToast('Error submitting form. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showToast('Error submitting form. Please email info@sikhaidglobal.org directly.', 'error');
  }
}

// Handle Volunteer Form Submission
async function handleVolunteerSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = document.getElementById('vol_name').value;
  const email = document.getElementById('vol_email').value;
  const phone = document.getElementById('vol_phone').value;
  const skills = document.getElementById('vol_skills').value;

  try {
    // Send to Firebase Cloud Function
    const response = await fetch('https://us-central1-sikh-aid-global.cloudfunctions.net/sendVolunteerEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        skills: skills
      })
    });

    if (response.ok) {
      showToast('Thank you for volunteering! We will contact you soon.', 'success');
      closeVolunteerModal();
    } else {
      showToast('Error submitting form. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showToast('Error submitting form. Please email info@sikhaidglobal.org directly.', 'error');
  }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
  const donorModal = document.getElementById('donorModal');
  const volunteerModal = document.getElementById('volunteerModal');

  if (donorModal && e.target === donorModal) {
    closeDonorModal();
  }
  if (volunteerModal && e.target === volunteerModal) {
    closeVolunteerModal();
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  addModalStyles();
  initModalForms();
});
