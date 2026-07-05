// Admin Donor Management

let allDonors = [];

// Load donors from Firestore
async function loadDonorsAdmin() {
  try {
    const snapshot = await db.collection('donors').get();
    allDonors = [];

    snapshot.forEach(doc => {
      allDonors.push({
        id: doc.id,
        ...doc.data()
      });
    });

    renderDonorsTable();
  } catch (error) {
    console.error('Error loading donors:', error);
    toast('Error loading donors', 'error');
  }
}

// Render donors table
function renderDonorsTable() {
  const tbody = document.getElementById('donorsTableBody');
  if (!tbody) return;

  if (allDonors.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-secondary py-4">
          <i class="fas fa-inbox"></i> No donors registered yet
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = allDonors.map(donor => `
    <tr>
      <td>
        <strong>${donor.name || 'N/A'}</strong><br>
        <small class="text-secondary">${donor.email || 'N/A'}</small>
      </td>
      <td>${donor.region || 'N/A'}</td>
      <td>${donor.donationAmount ? '$' + donor.donationAmount : 'N/A'}</td>
      <td>
        <span class="badge bg-${donor.status === 'verified' ? 'success' : 'warning'}">
          ${donor.status || 'pending'}
        </span>
      </td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="openEmailModal('${donor.id}', '${donor.email}', '${donor.name}')">
          <i class="fas fa-envelope"></i> Email
        </button>
      </td>
    </tr>
  `).join('');
}

// Open email modal
function openEmailModal(donorId, donorEmail, donorName) {
  document.getElementById('emailDonorId').value = donorId;
  document.getElementById('emailTo').value = donorEmail;
  document.getElementById('recipientName').textContent = donorName;
  document.getElementById('emailModal').style.display = 'block';
}

// Close email modal
function closeEmailModal() {
  document.getElementById('emailModal').style.display = 'none';
  document.getElementById('emailForm').reset();
}

// Send email to donor
async function sendDonorEmail() {
  const donorId = document.getElementById('emailDonorId').value;
  const subject = document.getElementById('emailSubject').value;
  const message = document.getElementById('emailMessage').value;
  const toEmail = document.getElementById('emailTo').value;

  if (!subject || !message) {
    toast('Please fill in subject and message', 'warning');
    return;
  }

  try {
    // Save email to Firestore as a record
    await db.collection('donors').doc(donorId).collection('emails').add({
      subject,
      message,
      sentAt: new Date(),
      sentBy: firebase.auth().currentUser.email,
      status: 'sent'
    });

    // TODO: Integrate with EmailJS or backend service to actually send email
    // For now, just show success message
    toast(`Email recorded for ${toEmail}. Set up EmailJS integration to send actual emails.`, 'success');

    closeEmailModal();
    loadDonorsAdmin();
  } catch (error) {
    console.error('Error sending email:', error);
    toast('Error recording email', 'error');
  }
}

// Send bulk email to all donors
async function sendBulkDonorEmail() {
  const subject = document.getElementById('bulkEmailSubject').value;
  const message = document.getElementById('bulkEmailMessage').value;

  if (!subject || !message) {
    toast('Please fill in subject and message', 'warning');
    return;
  }

  if (!confirm(`Send email to ${allDonors.length} donors?`)) return;

  try {
    const batch = db.batch();
    let count = 0;

    allDonors.forEach(donor => {
      const emailRef = db.collection('donors').doc(donor.id).collection('emails').doc();
      batch.set(emailRef, {
        subject,
        message,
        sentAt: new Date(),
        sentBy: firebase.auth().currentUser.email,
        status: 'sent'
      });
      count++;
    });

    await batch.commit();
    toast(`Email recorded for ${count} donors. Set up EmailJS to send actual emails.`, 'success');
    document.getElementById('bulkEmailForm').reset();
  } catch (error) {
    console.error('Error sending bulk email:', error);
    toast('Error recording bulk email', 'error');
  }
}

// Initialize donors section
function initDonorsSection() {
  // Check if donors elements exist on page
  if (document.getElementById('donorsTableBody')) {
    loadDonorsAdmin();
  }

  // Setup event listeners
  const emailForm = document.getElementById('emailForm');
  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendDonorEmail();
    });
  }

  const bulkEmailForm = document.getElementById('bulkEmailForm');
  if (bulkEmailForm) {
    bulkEmailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendBulkDonorEmail();
    });
  }
}

// Run on auth ready
document.addEventListener('DOMContentLoaded', () => {
  if (firebase.auth().currentUser) {
    initDonorsSection();
  }
});
