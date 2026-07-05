# Firebase Cloud Functions Setup Guide

This guide explains how to set up Firebase Cloud Functions for sending emails (contact form, donor registration, volunteer registration).

## Prerequisites

1. Firebase CLI installed: `npm install -g firebase-tools`
2. Node.js 18+ installed
3. Google account with Firebase project access
4. Gmail account for sending emails (or other email service)

## Setup Steps

### 1. Initialize Firebase Functions (if not already done)

```bash
cd /Users/admin/Documents/Obsidian\ Vault/sikhaidglobal

# Log in to Firebase
firebase login

# Initialize Firebase project
firebase init functions
# Choose: Use existing project → sikh-aid-global
# Choose: JavaScript or TypeScript → JavaScript
# Choose: ESLint → Yes
```

### 2. Install Dependencies

```bash
cd functions
npm install nodemailer cors
cd ..
```

### 3. Set Up Gmail App Password

To send emails via Gmail, you need an App Password (not your regular Gmail password):

1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication if not already enabled
3. Go to "App passwords" (appears after 2FA is enabled)
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character app password

### 4. Set Firebase Environment Variables

Store your email credentials securely as environment variables:

```bash
firebase functions:config:set gmail.user="your-email@gmail.com" gmail.password="your-16-char-app-password"

# Verify the config was set
firebase functions:config:get
```

### 5. Update functions/index.js (if needed)

The current setup uses environment variables. Update the email configuration if using a different email service:

```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.user,
    pass: functions.config().gmail.password,
  },
});
```

### 6. Deploy Functions

```bash
# Deploy all functions
firebase deploy --only functions

# Or deploy specific function
firebase deploy --only functions:sendContactEmail

# View deployment progress
firebase functions:log
```

### 7. Verify Deployment

After deployment, you should see URLs like:
- `https://us-central1-sikh-aid-global.cloudfunctions.net/sendContactEmail`
- `https://us-central1-sikh-aid-global.cloudfunctions.net/sendDonorEmail`
- `https://us-central1-sikh-aid-global.cloudfunctions.net/sendVolunteerEmail`

Update `js/contact-form.js` and `js/modal-forms.js` with these URLs.

## Email Templates

All functions send two emails:

### Contact Form
- **To:** info@sikhaidglobal.org (with visitor's message)
- **Confirmation to:** visitor's email address

### Donor Registration
- **To:** info@sikhaidglobal.org (with donor details)

### Volunteer Registration
- **To:** info@sikhaidglobal.org (with volunteer details)

## Troubleshooting

### "Authentication failed" error
- Ensure you're using an App Password, not your regular Gmail password
- Check that 2-Factor Authentication is enabled on your Google account
- Verify environment variables are set correctly: `firebase functions:config:get`

### "CORS" error in browser console
- The CORS middleware is already included in index.js
- Verify the function URL in your JavaScript files matches the deployed URL

### "Function not found" error
- Ensure you deployed functions: `firebase deploy --only functions`
- Check that the function name matches exactly in the code and JavaScript files

### Emails not being sent
- Check Firebase function logs: `firebase functions:log`
- Verify recipient email address (info@sikhaidglobal.org)
- Check Gmail's security settings allow less secure apps (if applicable)

## Update Function Code

To update the functions:

1. Edit `functions/index.js`
2. Run: `firebase deploy --only functions`
3. Monitor: `firebase functions:log`

## Rollback

To view previous versions and rollback:

```bash
# View deployment history
firebase functions:list

# Delete a function if needed
firebase functions:delete sendContactEmail --force
```

## Security Notes

⚠️ **IMPORTANT:**
- Never commit Gmail passwords or app passwords to GitHub
- Use Firebase environment variables for credentials
- The `FIREBASE_CONFIG` is automatically injected by Firebase
- Environment variables are encrypted at rest

---

## Quick Reference

```bash
# Deploy functions
firebase deploy --only functions

# View logs
firebase functions:log

# Set environment variables
firebase functions:config:set gmail.user="email@gmail.com" gmail.password="16-char-app-password"

# View environment variables
firebase functions:config:get

# Delete a specific function
firebase functions:delete sendContactEmail --force

# Test locally (emulator)
firebase emulators:start --only functions
```

---

For more information, visit: https://firebase.google.com/docs/functions
