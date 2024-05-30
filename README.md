

# ProNote App

## Introduction
The ProNote App is a React Native application designed to provide a seamless note-taking experience. Users can create, edit, organize, and search for notes, with a responsive design suitable for both mobile and desktop devices.

## Features
- **Create Notes:** Add new notes with titles and content.
- **Edit Notes:** Modify existing notes easily.
- **Organize Notes:** Use categories or tags to organize notes.
- **Search Functionality:** Find specific notes quickly.
- **Responsive Design:** Optimized for both mobile and desktop views.

## Dependencies
- **Express:** Web application framework for Node.js.
- **Expo:** Framework for building React Native apps.
- **MySQL:** Database engine for storing notes.
- **React Router:** Handles client-side routing.
- **Styled Components:** Utilizes CSS-in-JS for component styling.

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arsalan0098/Arsalan.git
   cd Arsalan
   ```
2. **Install Expo CLI:**
   ```bash
   npm install expo
   ```
3. **Install dependencies:**
   ```bash
   npm install
   npm --prefix ./server install
   ```
4. **Create a `.env` file in the `server` folder with the following information:**
   ```
   MYSALT=#Number for salting, default 10
   PRIVATEKEY=#secret key for JWT (JSON Web Token)
   HOST=#DB Host
   USER=#DB User
   PASS=#DB Password
   LOCALADDRESS=0.0.0.0 # Server address for Express
   PORT=3000
   ```
5. **Create a `.env` file in the `root` folder with the following information:**
   ```
   EXPO_PUBLIC_PORT=3000
   EXPO_PUBLIC_TIMEOUT=3000
   ```

## Running the Application
1. **Run the server:**
   ```bash
   cd server
   npm run dev
   ```
2. **Run the client:**
   Open a new terminal from the root folder and run:
   ```bash
   npx expo start
   ```
3. **Load the app on an Android simulator:**
   - Wait for the client to fully load.
   - Press `A` to open the app on your Android simulator.

## Architecture
- **Server (Express):** Handles API requests, serves the React client, and manages the SQLite database.
- **Client (Expo):** Displays the user interface, communicates with the server via API endpoints, and uses Expo Router for navigation.

## Contributing
We welcome contributions from the community! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## Reporting Issues
If you encounter any issues or have suggestions for improvement, please open an issue on the repository.

## License
This project is licensed under the MIT License.


