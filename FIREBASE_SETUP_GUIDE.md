# 🚀 Firebase Setup Guide for Student Project Submission

## Step 1: Create a Firebase Project

1. **Go to Firebase Console**: Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Sign in** with your Google account
3. **Create a project**:
   - Click "Create a project" or "Add project"
   - Enter project name: `student-project-submission`
   - Choose whether to enable Google Analytics (optional)
   - Click "Create project"

## Step 2: Enable Authentication

1. **Go to Authentication** in the left sidebar
2. **Click "Get started"**
3. **Go to "Sign-in method" tab**
4. **Enable "Email/Password"**:
   - Click on "Email/Password"
   - Toggle "Enable" switch
   - Click "Save"

## Step 3: Set up Firestore Database

1. **Go to Firestore Database** in the left sidebar
2. **Click "Create database"**
3. **Choose "Start in test mode"** (for development)
4. **Select a location** (choose the closest to you)
5. **Click "Done"**

## Step 4: Set up Storage

1. **Go to Storage** in the left sidebar
2. **Click "Get started"**
3. **Choose "Start in test mode"** (for development)
4. **Click "Done"**

## Step 5: Get Your Firebase Configuration

1. **Go to Project settings** (gear icon in left sidebar)
2. **Scroll down to "Your apps" section**
3. **Click the "</>" icon** (Web app)
4. **Register your app**:
   - App nickname: `Student Project Submission`
   - Click "Register app"
5. **Copy the config object** (it will look like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "student-project-submission.firebaseapp.com",
  projectId: "student-project-submission",
  storageBucket: "student-project-submission.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};
```

## Step 6: Update Your Code

Replace the placeholder values in `src/firebase.js` with your real Firebase config.

## Step 7: Set up Firestore Security Rules

Go to **Firestore Database > Rules** and update the rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Projects: students can read/write their own, admins can read all
    match /projects/{projectId} {
      allow read: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
    }
  }
}
```

## Step 8: Set up Storage Security Rules

Go to **Storage > Rules** and update the rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null &&
        (request.auth.uid == userId ||
         firestore.exists(/databases/(default)/documents/users/$(request.auth.uid)) &&
         firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

## Step 9: Test Your Setup

1. Run `npm start`
2. Try signing up with a regular email (not admin@gmail.com)
3. Login and upload a project
4. Try signing up/logging in with admin@gmail.com
5. Check admin dashboard for project submissions

## 🔑 Important Notes

- **Admin Access**: Only `admin@gmail.com` gets admin privileges
- **Security**: The rules ensure students can only see their own projects, admins can see all
- **File Storage**: Files are stored in Firebase Storage with organized paths
- **Real-time**: Changes sync automatically across all users

## 🚨 Troubleshooting

**If you get "Firebase: Error (auth/invalid-api-key)":**
- Double-check your Firebase config values
- Make sure you're using the correct project

**If you get "Missing permissions":**
- Check your Firestore and Storage security rules
- Make sure you're signed in

**If uploads fail:**
- Verify Storage is enabled
- Check Storage security rules

---

**Ready to get your Firebase config? Once you have it, paste the values here and I'll update your `firebase.js` file!**</content>
<parameter name="filePath">c:\Users\Sangeetha.C\OneDrive\Desktop\Student Project\project-submission\FIREBASE_SETUP_GUIDE.md