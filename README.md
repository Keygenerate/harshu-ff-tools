# HARSHU FF Tools App v4.0

Professional Free Fire toolkit Android app built with React Native + Expo.

## Features

- Auto JWT + Ban (GET/POST)
- EAT to JWT Conversion (GET/POST)
- Ban Only (GET/POST)
- Decode JWT
- Inspect Token (GET/POST)
- EAT to Access Token (GET/POST)
- Access Token Info (GET/POST)
- Bio Update (GET/POST)
- Admin Panel with Cloud Config
- Dark Theme with Neon UI
- Copy to Clipboard
- Offline API Base Storage

## API Endpoints

All endpoints connect to: `https://all-in-one-by-harshu-ff-tools.hars89031.workers.dev`

## Setup Instructions

### Method 1: Expo Go (Development)

1. Install Node.js (v18+): https://nodejs.org
2. Install Expo CLI:
   ```bash
   npm install -g expo-cli
   ```
3. Navigate to project:
   ```bash
   cd harshu-ff-tools-app
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the app:
   ```bash
   npx expo start
   ```
6. Scan QR code with **Expo Go** app on Android

### Method 2: Build APK (Production)

1. Install EAS CLI:
   ```bash
   npm install -g eas-cli
   ```
2. Login to Expo:
   ```bash
   eas login
   ```
3. Build APK:
   ```bash
   eas build --platform android --profile preview
   ```
4. Download APK from Expo dashboard

### Method 3: Local Android Build

1. Install Android Studio + SDK
2. Prebuild native code:
   ```bash
   npx expo prebuild --platform android
   ```
3. Build APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
4. APK location: `android/app/build/outputs/apk/release/app-release.apk`

## Project Structure

```
harshu-ff-tools-app/
├── App.js              # Main entry with navigation
├── app.json            # Expo configuration
├── package.json        # Dependencies
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Header.js
│   │   ├── InputField.js
│   │   ├── ActionButton.js
│   │   ├── ToolCard.js
│   │   └── ResultViewer.js
│   ├── screens/        # App screens
│   │   ├── HomeScreen.js
│   │   ├── BanScreen.js
│   │   ├── JwtScreen.js
│   │   ├── ToolsScreen.js
│   │   ├── AdminScreen.js
│   │   └── ResultScreen.js
│   └── utils/
│       └── api.js      # API helper class
└── assets/             # Images & icons
```

## Admin Panel

- Set API_BASE via Cloudflare Worker
- All users sync automatically
- Password protected
- Local fallback storage

## Made with ❤️ by HARSHU
