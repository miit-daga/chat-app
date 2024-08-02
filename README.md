# Real-Time Web Chat Application

This application facilitates seamless communication between users in real-time. It features an intuitive user interface (UI) designed to enhance the user experience (UX). The application follows the Model-View-Controller (MVC) architecture to maintain a clean separation of concerns.

## Features

- **Real-Time Messaging:** Instant messaging with real-time updates.
- **User Authentication:** Secure user login and registration using Express sessions.
- **Persistent Sessions:** Redis is implemented for maintaining persistent sessions.
- **Intuitive UI:** User-friendly interface for a better chat experience.
- **MVC Architecture:** Clean separation of concerns for better maintainability and scalability.

## Authentication

Currently, the application uses Express sessions to protect user credentials and manage authentication. Redis is implemented for maintaining persistent sessions. In the future, we plan to implement JWT (JSON Web Token) authentication for enhanced security.