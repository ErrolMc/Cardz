# Cardz - Flash Card Learning App

A simple, modern, cross-platform flash card management application built with React Native and Expo. Cardz helps you create, organize, and study flash cards efficiently to enhance your learning experience.

## Features

- Create and manage custom flash card decks
- Intuitive card creation interface
- Card viewer for studying
- Import and export card decks from simple json files
- Cross-platform support (iOS, Android)
- Clean and modern user interface

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Document Picker
- Expo Sharing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

Note: On Windows/PC, you can only develop and test for Android and Web platforms. iOS development requires macOS.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cardz.git
cd cardz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Running the App

### Development Mode

1. Start the development server:
```bash
npm start
```

2. Running on physical devices:
   - Download the Expo Go app from the [App Store](https://apps.apple.com/app/expo-go/id982107779) (iOS) or [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)
   - Scan the QR code shown in the terminal with:
     - iOS: Use your device's camera app (requires macOS for development)
     - Android: Use the Expo Go app's QR scanner

### Development with Emulators

For testing in development emulators:

- For Android (Windows/macOS/Linux):
```bash
npm run android
```

- For Web (All platforms):
```bash
npm run web
```

- For iOS (macOS only):
```bash
npm run ios
```

Note: 
- Running on Android emulator requires Android Studio to be properly configured
- iOS development and testing is only possible on macOS with Xcode installed
- Web development works on all platforms

## Project Structure

```
flashcardapp/
├── src/              # Source code
│   ├── components/   # React components
│   │   ├── CardViewer.tsx       # Card study interface
│   │   ├── Settings.tsx         # App settings
│   │   ├── deckbuilder/        # Deck creation and editing
│   │   └── managecards/        # Card management interface
│   ├── context/     # React Context providers
│   ├── services/    # Business logic and data handling
│   ├── types/       # TypeScript type definitions
│   ├── App.tsx      # Main application component
│   └── index.ts     # Entry point
├── assets/          # Static assets
├── android/         # Android-specific files
├── .expo/           # Expo configuration
└── package.json     # Project dependencies
```

## Architecture

The application follows a modern React Native architecture with the following key aspects:

### Navigation
- Uses React Navigation with a bottom tab navigator for main app sections:
  - Card Viewer: For studying and reviewing cards
  - Manage Cards: For creating and editing individual cards
  - Deck Builder: For organizing cards into decks
  - Settings: For application configuration

### Component Structure
- Modular component-based architecture
- Separate directories for complex features (deckbuilder, managecards)
- Shared components for reusability

### State Management
- React Context for global state management
- TypeScript for type safety and better development experience
- Separate services layer for business logic and data handling

### Cross-Platform
- Built with Expo for cross-platform compatibility
- Platform-specific code is minimized and isolated when needed
- Consistent UI/UX across different platforms

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
