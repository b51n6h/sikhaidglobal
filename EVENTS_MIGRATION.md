# Events Migration Guide

## Overview
All events are now managed through the Firebase Admin Panel (`/admin/`). This guide shows how to migrate existing events from the old static HTML into Firestore.

## Existing Events to Migrate

### 1. Gala Night Event
- **Name:** Gala Night Event — Normandy Hotel
- **Date:** 28 Sep 2025
- **Time:** (Add from original event page)
- **Location:** Normandy Hotel, London
- **Category:** Celebration
- **Description:** A spectacular evening of fun, laughter, and entertainment for all ages. Enjoy a delicious dinner and kids corner with face painting, balloon modelling and mini zoo.
- **Image:** Use celebration/gala night image
- **Status:** Planned
- **Expected Attendees:** (To be filled)
- **Target Amount:** £ (To be filled if fundraising)
- **Ticket Price:** (To be filled if ticketed)
- **Registration Link:** https://sikhaidglobal.com/events/Gala-Night-Event

### 2. Gurmat Camp & Punjabi Classes
- **Name:** Gurmat Camp & Punjabi Classes
- **Date:** 23 Aug 2024
- **Location:** (To be filled)
- **Category:** Educational
- **Description:** In addition to the core academic curriculum, children receive extra classes in Punjabi and participate in Gurmat activities.
- **Status:** Completed
- **Expected Attendees:** (To be filled)

### 3. Build-up Shelter for Sikligar Community
- **Name:** Build-up Shelter for Sikligar Community
- **Date:** 23 Aug 2024
- **Location:** (To be filled from original site)
- **Category:** Community/Welfare
- **Description:** Houses were built for needy Sikligar families, providing safe and secure shelter for those living in extreme poverty.
- **Status:** Completed
- **Expected Attendees:** (To be filled)
- **Amount Raised:** (If tracked)

### 4. School Visiting 2024
- **Name:** School Visiting 2024
- **Date:** 26 Mar 2024
- **Location:** Multiple schools (Gurukul, Sai Baba, New Gyandeep, Flying Future, Fussion School, Vidhya Vihar)
- **Category:** Educational
- **Description:** We visited schools including Gurukul, Sai Baba, New Gyandeep, Flying Future, Fussion School, and Vidhya Vihar to assess needs and deliver support.
- **Status:** Completed
- **Expected Attendees:** (To be filled)

## How to Add Events to Admin Panel

### Method 1: Via Admin Panel UI (Recommended)

1. **Log in to Admin Panel:**
   - Go to `https://sikhaidglobal.jivomedia.com/admin/`
   - Log in with your Firebase admin account

2. **Navigate to Events:**
   - Click on "Fundraising Events" in the left sidebar
   - Click "+ Add Event" button

3. **Fill in Event Details:**
   - **Event Name:** [Copy from list above]
   - **Date:** [Select date]
   - **Time:** [Enter time if known]
   - **Status:** Select: Planned / Ongoing / Completed
   - **Category:** Select appropriate category
   - **Location/Venue:** [Enter venue name]
   - **Full Address:** [Enter complete address]
   - **Event Image:** Click to upload image
   - **Description:** [Paste detailed description]
   - **Expected Attendees:** [Enter number]
   - **Target Amount:** [Enter if fundraising event]
   - **Amount Raised:** [Enter if completed]
   - **Ticket Price:** [Enter if ticketed]
   - **Tickets Available:** [Enter if limited]
   - **Registration Link:** [Paste link]
   - **Contact Email:** sikhaidglobal@gmail.com

4. **Save:** Click "Save Event"

### Method 2: Via Firebase Console (Advanced)

1. Go to Firebase Console → Firestore → Collections
2. Create/select "events" collection
3. Add new document with these fields:
   - `name` (string): Event name
   - `date` (string): YYYY-MM-DD format
   - `time` (string): HH:MM format (optional)
   - `status` (string): "planned" | "ongoing" | "completed"
   - `category` (string): "fundraising" | "awareness" | "community" | "educational" | "celebration"
   - `location` (string): Venue name
   - `address` (string): Full address
   - `desc` (string): Event description
   - `attendees` (number): Expected count
   - `target` (number): Fundraising target in £
   - `raised` (number): Amount raised so far
   - `ticketPrice` (number): Ticket price in £
   - `ticketsAvailable` (string): Number of tickets or leave blank for unlimited
   - `regLink` (string): Registration URL
   - `contactEmail` (string): Contact email
   - `imageUrl` (string): Firebase Storage image URL (leave blank, will be populated via UI)
   - `createdAt` (timestamp): Auto-generated
   - `updatedAt` (timestamp): Auto-generated

## Event Data Collection

To get complete event information, you may need to gather from:
- **Original SAG website:** https://sikhaidglobal.com/events
- **Social media:** Facebook, Instagram
- **Email archives:** Past event announcements
- **Team contacts:** Event organizers

### Information to Collect:
- [ ] Exact dates and times
- [ ] Full venue addresses
- [ ] High-quality event images
- [ ] Complete descriptions
- [ ] Attendance numbers
- [ ] Fundraising amounts (if applicable)
- [ ] Registration links
- [ ] Ticket pricing (if applicable)
- [ ] Number of tickets sold/available

## Real-time Sync

**Important:** Once events are in Firestore:
- ✅ Changes in admin panel appear on main site **instantly**
- ✅ New events show up immediately
- ✅ Event deletion removes from public site
- ✅ Image updates reflect in real-time

## Future Event Management

### To Create a New Event:
1. Admin panel → Fundraising Events → "+ Add Event"
2. Fill in details
3. Upload image
4. Save
5. ✅ Live on website immediately

### To Edit an Event:
1. Click ✏️ edit button on event card
2. Update details
3. Save
4. ✅ Changes appear instantly

### To Delete an Event:
1. Click 🗑️ delete button
2. Confirm deletion
3. ✅ Removed from website immediately

## Troubleshooting

**Events not showing on website?**
- Check Firestore security rules allow reads: `allow read: if request.auth != null || true;`
- Wait 30 seconds for cache to refresh
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

**Image not uploading?**
- Check Firebase Storage rules allow writes for your auth user
- Try smaller image file (< 5MB)
- Ensure image format is JPEG/PNG

**Admin login not working?**
- Verify email is added in Firebase Authentication
- Check password reset via Firebase Console if forgotten
- Ensure user has "Email/Password" enabled in Auth methods

## Questions?

Contact: sikhaidglobal@gmail.com | +44 7723 013160
