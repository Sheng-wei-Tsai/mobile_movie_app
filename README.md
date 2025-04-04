# MovieFlix - Mobile Movie App

![MovieFlix Logo](assets/images/logo.png)

A modern, responsive mobile application for discovering, searching, and tracking trending movies. Built with React Native, Expo, and Appwrite.

## Features

- **Movie Discovery**: Browse the latest and most popular movies
- **Search Functionality**: Find movies by title with real-time search results
- **Trending Movies**: See what's popular based on user search patterns
- **Movie Details**: View comprehensive information about each movie
- **Responsive Design**: Beautiful UI that works across different device sizes
- **Offline Support**: Cached data for improved performance

## Tech Stack

- **Frontend**: React Native, Expo
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Context API
- **Backend Services**: 
  - Appwrite for search analytics and trending movies
  - TMDB API for movie data
- **Navigation**: Expo Router
- **UI Components**: Custom components with modern design

## Screenshots

![Home Screen](screenshots/home.png)
![Search Screen](screenshots/search.png)
![Movie Details](screenshots/details.png)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Appwrite instance
- TMDB API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/mobile_movie_app.git
   cd mobile_movie_app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   EXPO_PUBLIC_MOVIE_API_KEY=your_tmdb_api_key
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
   EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
   ```

4. Start the development server
   ```bash
   npx expo start
   ```

5. Run on your device or emulator
   - Scan the QR code with the Expo Go app on your device
   - Press 'a' to run on an Android emulator
   - Press 'i' to run on an iOS simulator

## Project Structure

```
mobile_movie_app/
├── app/                  # Main application code
│   ├── (tabs)/           # Tab-based navigation screens
│   ├── movies/           # Movie detail screens
│   └── _layout.tsx       # Root layout configuration
├── assets/               # Static assets (images, icons)
├── components/           # Reusable UI components
├── constants/            # App constants and configuration
├── interfaces/           # TypeScript interfaces
├── services/             # API and data services
└── ...
```

## Features in Detail

### Trending Movies
The app tracks user search patterns using Appwrite and displays trending movies based on search frequency. This provides users with insights into what's currently popular.

### Search Functionality
The search feature includes debouncing to prevent excessive API calls and provides real-time results as users type. Search terms are tracked to update the trending movies section.

### Movie Details
Each movie has a dedicated details page showing comprehensive information including:
- Title and release date
- Rating and popularity
- Overview and cast information
- Related movies

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Appwrite](https://appwrite.io/) for backend services
- [Expo](https://expo.dev/) for the development framework
- [React Native](https://reactnative.dev/) for the mobile development platform

## Contact

Henry Tsai - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/Sheng-wei-Tsai/mobile_movie_app](https://github.com/Sheng-wei-Tsai/mobile_movie_app)
