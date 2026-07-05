# Missing Image Files for Upload

Upload these image files to: `https://sikhaidglobal.org/assets/images/`

## Required Images (Currently Referenced)

### Program/Section Images
- [ ] `IMG_20260702_095707.jpg` - About section hero image
- [ ] `IMG_20260702_095856.jpg` - Skills Training program card
- [ ] `IMG_20260702_095948.jpg` - Education program card
- [ ] `IMG_20260702_095951.jpg` - Welfare Aid program card

### Hero Section Images
- [ ] `WhatsApp Image 2026-07-01 at 16.53.02.jpeg` - Hero background and main display image
- [ ] `WhatsApp Image 2026-07-01 at 16.53.55.jpeg` - Hero floating badge background

### Logo & Icons
- [ ] `logo.png` - Sikh Aid Global logo (used in navbar and footers)
- [ ] `zelle-qr.png` - Zelle donation QR code (for USA donors)

## Optional Images (Mentioned but not critical)

- [ ] `WhatsApp Image 2026-07-01 at 16.53.55 (2).jpeg` - Not currently used (was in CSS)

---

## Where These Images Are Used

### index.html (Main Website)
- Hero section background
- Hero main image
- Hero floating badge background
- About section image
- Program card images (3x)
- Navbar/Footer logo

### donation.html (Donation Page)
- Footer logo
- Zelle QR code

### events.html & event.html (Event Pages)
- Footer logo
- Event images (loaded dynamically from Firestore)

### admin/index.html (Admin Panel)
- Login screen logo
- Footer logo

### donor.html (Donor Portal)
- Topbar logo

---

## Upload Instructions

1. Connect to GoDaddy cPanel or FTP
2. Navigate to `/public_html/assets/images/`
3. Upload all checked files from the "Required Images" list
4. Ensure files are publicly readable (644 permissions)
5. Files will be accessible at: `https://sikhaidglobal.org/assets/images/[filename]`

---

## Notes

- Image filenames are case-sensitive (match exactly)
- URL-encoded spaces in filenames: `%20` = space
- After uploading, test by visiting each URL in a browser
- Event images are managed through the admin panel (not listed here)
