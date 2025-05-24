# WebRTC Meeting App

A simple React Native application for video meetings using WebRTC.

## Features

- Peer-to-peer video calling using WebRTC
- Create or join meetings using room IDs
- Simple interface for video conferencing

## App Screens

### Landing Screen
<img width="403" alt="Image" src="https://github.com/user-attachments/assets/ce8a0804-8f45-4484-a1fd-1043a3026ca6" />

### Meeting Screen
<img width="403" alt="Image" src="https://github.com/user-attachments/assets/490ec0a4-ae2d-4a6e-809a-19bf9e85c5c1" />

<img width="403" alt="Image" src="https://github.com/user-attachments/assets/a3e72131-92bb-429f-af1c-81bfb09679ce" />

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. iOS specific setup:
   ```sh
   cd ios && pod install
   ```

3. Configure Firebase:
   Before running the app, update the Firebase configuration in `/src/services/firebase.js` with your own Firebase project details:
   ```javascript
   const firebaseConfig = {
     apiKey: "",
     authDomain: "",
     projectId: "",
     storageBucket: "",
     messagingSenderId: "",
     appId: "",
     measurementId: ""
   };
   ```

4. Run the application:
   ```sh
   npm run ios
   # or
   npm run android
   ```

## Notes

This is a simplified version that demonstrates WebRTC functionality. The signaling service in this demo is mocked and would need to be replaced with a real signaling server (like Socket.io, WebSockets, or Firebase) in a production application.

## Limitations

- The current implementation uses a mock signaling service
- For a production app, you would need to implement a proper signaling server
- The app currently only supports one-to-one calls
