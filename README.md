# My Chat App Frontend

This is the frontend for **My Chat App**, a real-time chat application that supports user registration, authentication, friend requests, private messaging, blocking users, and more.

## Features

- User registration with email verification
- Secure authentication (JWT, HTTP-only cookies)
- Friend request system (send, accept, reject, delete requests)
- 1-1 chat and messaging (real-time with socket.io)
- Block/unblock users
- User profile management
- Password change and security features

## Technology Stack

- React + Vite
- Redux Toolkit
- React Router
- Ant Design, TailwindCSS
- Socket.io-client

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Tandu2003/my-chat-app-frontend
   cd my-chat-app-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file with the following content:

   ```
   VITE_API_URL=http://localhost:5000
   VITE_CLIENT_URL=http://localhost:5173
   ```

4. **Start the frontend:**

   ```bash
   npm run dev
   ```

   The app will run at `http://localhost:5173` by default.

## Configuration

- Make sure the backend `CLIENT_URL` matches your frontend URL.
- Ensure CORS is configured properly on the backend for local development.

## Notes

- Email verification is required before login.
- JWT tokens are stored in HTTP-only cookies for security.
- You can use tools like Postman to test the backend API.

## Backend

For the backend service, visit the repository: [my-chat-app-backend](https://github.com/Tandu2003/my-app-chat-backend)

## License

This project is for educational purposes. Feel free to use and modify it for your own learning or projects.
