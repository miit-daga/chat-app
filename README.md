# Real-Time Web Chat Application

This application facilitates seamless communication between users in real-time. It features an intuitive user interface (UI) designed to enhance the user experience (UX). The application follows the Model-View-Controller (MVC) architecture to maintain a clean separation of concerns.

## Features

- **Real-Time Messaging:** Instant messaging with real-time updates.
- **User Authentication:** Secure user login and registration using JWT (JSON Web Token) authentication.
- **Persistent Sessions:** Redis is implemented for maintaining persistent sessions, including user presence tracking and chat history storage.
- **MVC Architecture:** Clean separation of concerns for better maintainability and scalability.
- **Intuitive UI:** User-friendly interface for a better chat experience.

## Authentication

The application uses JWT (JSON Web Token) for user authentication, providing secure and stateless authentication. Redis is employed for session management tasks such as tracking connected users, storing chat messages, and enforcing rate limits. This approach ensures robust security and efficient real-time communication.
.
