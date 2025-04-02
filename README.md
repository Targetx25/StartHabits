
# StartHabits Documentation

StartHabits is an interactive habit tracker web application designed to help users build and maintain daily habits. With a focus on tracking streaks and leveling up based on consistent practice, StartHabits offers a gamified experience to promote personal growth and discipline. While the UI/UX is still in progress, all core functionalities are complete and fully operational.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Authentication](#authentication)
- [State Management](#state-management)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Overview

StartHabits empowers users to create and monitor daily habits through a user-friendly platform. Users can:
- **Add New Habits:** Seamlessly create and track new habits.
- **Monitor Streaks:** Keep an eye on daily progress and long-term consistency.
- **Level Up:** Increase user levels as a reward for maintaining habit streaks.
- **Engage Authentically:** Utilize secure authentication options with both email/password and OAuth.

## Features

- **Habit Creation:** Add, edit, and delete habits with ease.
- **Streak Tracking:** Visual representation of daily habit streaks to motivate continuous engagement.
- **Level System:** A gamified mechanism where users level up based on their ongoing habit streaks.
- **User Authentication:** Secure login and registration using both email/password and third-party OAuth.
- **Real-Time Updates:** Manage state effectively with React Redux and Redux Persist.
- **Responsive Design:** Built with TailwindCSS for a clean and modern user interface (UI/UX enhancements are underway).

## Technology Stack

- **Frontend:**  
  - ReactJS  
  - TailwindCSS  
  - JavaScript
- **Backend as a Service (BaaS):**  
  - Appwrite (for database, authentication, and other backend services)
- **State Management:**  
  - React Redux  
  - Redux Persist

## Architecture

- **Frontend Layer:**  
  Developed with ReactJS and styled using TailwindCSS, ensuring a responsive and dynamic user interface. The application state is managed using Redux and persisted across sessions with Redux Persist.
  
- **Backend Layer:**  
  Appwrite serves as the BaaS, handling database operations, user authentication, and other server-side functionalities, thereby allowing for rapid development and deployment.

## Installation & Setup

Follow these steps to set up and run StartHabits locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/starthabits.git
   cd starthabits
   ```

2. **Install Dependencies:**

   Ensure that Node.js and npm (or yarn) are installed on your system. Then, install the required packages:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory with the following configuration:

   ```env
   REACT_APP_APPWRITE_ENDPOINT=your_appwrite_endpoint_here
   REACT_APP_APPWRITE_PROJECT_ID=your_appwrite_project_id_here
   ```

4. **Start the Application:**

   Run the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see StartHabits in action.

## Authentication

StartHabits uses Appwrite for secure user authentication. The authentication system supports:
- **Email & Password:** Standard user registration and login.
- **OAuth:** Enable third-party sign-in options for a smoother user experience.

Configuration for these authentication methods is handled within Appwrite’s dashboard and connected to your frontend via the Appwrite SDK.

## State Management

- **React Redux:** Centralizes the application state, making it easier to manage and debug.
- **Redux Persist:** Ensures that user session data and habit information are retained across browser sessions, offering a consistent experience.

## Usage

Once logged in, users can:
- Create a new habit by clicking on the "Add Habit" button.
- Track their daily streaks with a visual dashboard.
- View their progress and level up based on their streak milestones.
- Update or delete habits as needed.

## Future Enhancements

- **Enhanced UI/UX:** Continued improvements to the user interface and overall experience.
- **Detailed Analytics:** Providing deeper insights into habit performance and streak trends.
- **Social Integration:** Options for users to share their achievements and challenge friends.
- **Custom Notifications:** Reminders and alerts to help users maintain their habits consistently.

## Contributing

Contributions are welcome! If you would like to contribute to StartHabits, please follow these guidelines:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear messages.
4. Open a pull request to merge your changes into the main branch.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
