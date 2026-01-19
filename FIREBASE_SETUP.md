# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** > **Get started**
2. Click on **Sign-in method** tab
3. Enable **Email/Password** provider:
   - Click on **Email/Password**
   - Toggle **Enable**
   - Click **Save**
4. Enable **Google** provider:
   - Click on **Google** in the providers list
   - Toggle **Enable**
   - Enter your project support email (or use default)
   - Click **Save**
5. Enable **Google** provider:
   - Click on **Google** in the providers list
   - Toggle **Enable**
   - Enter your project support email
   - Click **Save**

## Step 3: Create Firestore Database

1. Go to **Firestore Database** in Firebase Console
2. Click **Create database**
3. Start in **test mode** (for development)
4. Choose your location
5. Click **Enable**

## Step 4: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`)
4. Register your app (give it a nickname)
5. Copy the Firebase configuration object

## Step 5: Add Environment Variables

1. Create a `.env` file in the root directory
2. Add your Firebase config:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

3. Replace the placeholder values with your actual Firebase config values

## Step 6: Firestore Security Rules (Optional)

For production, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 7: Test the Setup

1. Run `npm run dev`
2. Try registering a new user
3. Check Firebase Console > Authentication to see the new user
4. Check Firestore Database to see user data

## Troubleshooting

- **"Firebase: Error (auth/invalid-api-key)"**: Check your `.env` file has correct values
- **"Firebase: Error (auth/email-already-in-use)"**: User already exists, try logging in instead
- **"Firebase: Error (auth/weak-password)"**: Password must be at least 6 characters

## Important Notes

- Never commit your `.env` file to Git
- The `.env.example` file shows what variables are needed
- For production, set environment variables in your hosting platform (Vercel, Netlify, etc.)

