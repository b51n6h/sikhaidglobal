/**
 * Firebase Events Migration Script
 *
 * This script migrates all existing events from sikhaidglobal.com to Firestore
 * Run this in Firebase Console → Firestore → Create Document (or use CLI)
 *
 * SETUP:
 * 1. Open Firebase Console → Firestore Database
 * 2. Create a new collection called "events" (if not exists)
 * 3. Use the data below to add documents
 *
 * Or install Firebase CLI and run:
 * firebase firestore:delete events --project=sikh-aid-global --recursive
 * firebase firestore:import backup.json --project=sikh-aid-global
 */

// Events to migrate
const EVENTS_TO_MIGRATE = [
  {
    name: "Gala Night Event — Normandy Hotel",
    date: "2025-09-28",
    time: "19:00",
    status: "planned",
    category: "celebration",
    location: "Normandy Hotel",
    address: "Normandy Hotel, London",
    desc: "Join us for a spectacular Gala Night! An evening filled with fun, laughter and entertainment for all ages. Enjoy a delicious dinner and kids corner with face painting, balloon modelling and mini zoo.",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
    attendees: 0,
    target: 0,
    raised: 0,
    ticketPrice: 0,
    ticketsAvailable: "",
    regLink: "",
    contactEmail: "sikhaidglobal@gmail.com"
  },
  {
    name: "Gurmat Camp & Punjabi Classes",
    date: "2024-08-23",
    time: "",
    status: "completed",
    category: "educational",
    location: "Sikh Aid Global Center",
    address: "India",
    desc: "In addition to the core academic curriculum, children receive extra classes in Punjabi and participate in Gurmat activities. A comprehensive program combining traditional Sikh education with modern learning.",
    imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=600&q=80",
    attendees: 0,
    target: 0,
    raised: 0,
    ticketPrice: 0,
    ticketsAvailable: "",
    regLink: "",
    contactEmail: "sikhaidglobal@gmail.com"
  },
  {
    name: "Build-up Shelter for Sikligar Community",
    date: "2024-08-23",
    time: "",
    status: "completed",
    category: "community",
    location: "Rural India",
    address: "Sikligar Community Villages",
    desc: "Houses were built for needy Sikligar families, providing safe and secure shelter for those living in extreme poverty. This project directly improved living conditions for vulnerable members of our community.",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
    attendees: 0,
    target: 0,
    raised: 0,
    ticketPrice: 0,
    ticketsAvailable: "",
    regLink: "",
    contactEmail: "sikhaidglobal@gmail.com"
  },
  {
    name: "School Visiting 2024",
    date: "2024-03-26",
    time: "",
    status: "completed",
    category: "educational",
    location: "Multiple Schools",
    address: "Gurukul, Sai Baba, New Gyandeep, Flying Future, Fussion School, Vidhya Vihar",
    desc: "We visited schools including Gurukul, Sai Baba, New Gyandeep, Flying Future, Fussion School, and Vidhya Vihar to assess needs and deliver support. These visits helped us identify areas where educational support is most needed.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
    attendees: 0,
    target: 0,
    raised: 0,
    ticketPrice: 0,
    ticketsAvailable: "",
    regLink: "",
    contactEmail: "sikhaidglobal@gmail.com"
  },
  {
    name: "25th Anniversary Celebration",
    date: "2026-06-30",
    time: "",
    status: "planned",
    category: "celebration",
    location: "TBA",
    address: "Details Coming Soon",
    desc: "Marking 25 years of Sikh Aid Global! Join us as we celebrate our journey of service and impact since 2002. A special celebration honoring our community, our volunteers, and our mission to serve.",
    imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80",
    attendees: 0,
    target: 0,
    raised: 0,
    ticketPrice: 0,
    ticketsAvailable: "",
    regLink: "",
    contactEmail: "sikhaidglobal@gmail.com"
  }
];

/**
 * OPTION 1: Add via Firebase Console UI
 *
 * 1. Go to Firebase Console → Firestore Database
 * 2. Click "Start collection" → name it "events"
 * 3. For each event above:
 *    - Click "Add document"
 *    - Auto ID or custom ID (e.g., "event_gala_night_2025")
 *    - Add all fields from the object above
 *    - Click Save
 *
 * OPTION 2: Use Firebase CLI
 *
 * Save this as events-data.json:
 */

const FIRESTORE_BACKUP = {
  "events": {
    "event_gala_night_2025": {
      "name": "Gala Night Event — Normandy Hotel",
      "date": "2025-09-28",
      "time": "19:00",
      "status": "planned",
      "category": "celebration",
      "location": "Normandy Hotel",
      "address": "Normandy Hotel, London",
      "desc": "Join us for a spectacular Gala Night! An evening filled with fun, laughter and entertainment for all ages. Enjoy a delicious dinner and kids corner with face painting, balloon modelling and mini zoo.",
      "imageUrl": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
      "attendees": 0,
      "target": 0,
      "raised": 0,
      "ticketPrice": 0,
      "ticketsAvailable": "",
      "regLink": "",
      "contactEmail": "sikhaidglobal@gmail.com",
      "createdAt": new Date().toISOString(),
      "updatedAt": new Date().toISOString()
    },
    "event_gurmat_camp_2024": {
      "name": "Gurmat Camp & Punjabi Classes",
      "date": "2024-08-23",
      "time": "",
      "status": "completed",
      "category": "educational",
      "location": "Sikh Aid Global Center",
      "address": "India",
      "desc": "In addition to the core academic curriculum, children receive extra classes in Punjabi and participate in Gurmat activities.",
      "imageUrl": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=600&q=80",
      "attendees": 0,
      "target": 0,
      "raised": 0,
      "ticketPrice": 0,
      "ticketsAvailable": "",
      "regLink": "",
      "contactEmail": "sikhaidglobal@gmail.com",
      "createdAt": new Date().toISOString(),
      "updatedAt": new Date().toISOString()
    },
    "event_sikligar_shelter_2024": {
      "name": "Build-up Shelter for Sikligar Community",
      "date": "2024-08-23",
      "time": "",
      "status": "completed",
      "category": "community",
      "location": "Rural India",
      "address": "Sikligar Community Villages",
      "desc": "Houses were built for needy Sikligar families, providing safe and secure shelter for those living in extreme poverty.",
      "imageUrl": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
      "attendees": 0,
      "target": 0,
      "raised": 0,
      "ticketPrice": 0,
      "ticketsAvailable": "",
      "regLink": "",
      "contactEmail": "sikhaidglobal@gmail.com",
      "createdAt": new Date().toISOString(),
      "updatedAt": new Date().toISOString()
    },
    "event_school_visits_2024": {
      "name": "School Visiting 2024",
      "date": "2024-03-26",
      "time": "",
      "status": "completed",
      "category": "educational",
      "location": "Multiple Schools",
      "address": "Gurukul, Sai Baba, New Gyandeep, Flying Future, Fussion School, Vidhya Vihar",
      "desc": "We visited schools including Gurukul, Sai Baba, New Gyandeep, Flying Future, Fussion School, and Vidhya Vihar to assess needs and deliver support.",
      "imageUrl": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
      "attendees": 0,
      "target": 0,
      "raised": 0,
      "ticketPrice": 0,
      "ticketsAvailable": "",
      "regLink": "",
      "contactEmail": "sikhaidglobal@gmail.com",
      "createdAt": new Date().toISOString(),
      "updatedAt": new Date().toISOString()
    },
    "event_25th_anniversary": {
      "name": "25th Anniversary Celebration",
      "date": "2026-06-30",
      "time": "",
      "status": "planned",
      "category": "celebration",
      "location": "TBA",
      "address": "Details Coming Soon",
      "desc": "Marking 25 years of Sikh Aid Global! Join us as we celebrate our journey of service and impact since 2002.",
      "imageUrl": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80",
      "attendees": 0,
      "target": 0,
      "raised": 0,
      "ticketPrice": 0,
      "ticketsAvailable": "",
      "regLink": "",
      "contactEmail": "sikhaidglobal@gmail.com",
      "createdAt": new Date().toISOString(),
      "updatedAt": new Date().toISOString()
    }
  }
};

/**
 * OPTION 3: Node.js Script (using Firebase Admin SDK)
 *
 * Prerequisites:
 * npm install firebase-admin
 *
 * Run with:
 * node migrate-events.js
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin (if running as Node script)
// const serviceAccount = require('./path/to/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   projectId: 'sikh-aid-global'
// });

async function migrateEvents() {
  try {
    const db = admin.firestore();
    const batch = db.batch();

    for (const event of EVENTS_TO_MIGRATE) {
      const docRef = db.collection('events').doc();
      batch.set(docRef, {
        ...event,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    await batch.commit();
    console.log(`✅ Successfully migrated ${EVENTS_TO_MIGRATE.length} events to Firestore`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Uncomment to run
// migrateEvents();
