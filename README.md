# APDS7311 Part 2
(ST10037089 - Alisa Diya Thool) <br>
(ST10122569 - Mthokozisi Myende) <br>
(ST10022345 - Ethan Robinson) <br>
(ST10109485 - Jared Herbst) <br>
(ST10036997 - Jordan Betts) <br>

Demo Video :https://youtu.be/cimBBcdnmsw 

## Project Overview

This project is a full-stack web application built using the MERN stack: **MongoDB**, **Express**, **React**, and **Node.js**. It provides a user-friendly interface for managing posts and user authentication with security measures. Users can register, log in, and manage posts, with data being stored in MongoDB. The backend handles session management and security to ensure safe user interactions.

### Features:
- User registration and login
- Post creation, update, and deletion
- Secure session management with express-session
- Protection against brute-force attacks using ExpressBrute
- HTTPS implementation for secure communication

### Tech Stack:
- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Security**: express-session, ExpressBrute, HTTPS
- **Environment Configuration**: dotenv
- **Cross-Origin Resource Sharing**: cors

---

## Installation & Setup

### Prerequisites:
- **Node.js** and **npm** installed
- **MongoDB** installed locally or using a cloud service like MongoDB Atlas

### Step-by-step Guide:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/APDS7311.git
   cd mern-project
   ```

2. **Install Backend Dependencies:**
   Navigate to the backend directory and install the necessary packages.
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   Navigate to the frontend directory and install the necessary packages.
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Variables Setup (.env file):**
   Create a `.env` file in the root of the backend folder and add the following:
   ```bash
   PORT=3000
   MONGO_URI=your-mongodb-uri
   SESSION_SECRET=your-session-secret
   HTTPS_KEY=path-to-ssl-key
   HTTPS_CERT=path-to-ssl-cert
   ```

---

## How to Run the Project (Using VSCode)

### Running the Application Locally:

1. **Start Backend (Express/Node.js Server):**
   In VSCode's integrated terminal, run the following command from the backend directory:
   ```bash
   npm run dev
   ```

2. **Start Frontend (React Application):**
   In a new terminal window, navigate to the frontend directory and run:
   ```bash
   npm start
   ```

3. **Simultaneous Frontend & Backend Execution:**
   You can also use `concurrently` or similar npm packages to start both frontend and backend together:
   ```bash
   npm run dev:all
   ```

### VSCode Tips:
- Use **VSCode Integrated Terminal** for running both the frontend and backend simultaneously.
- **Debugging**: VSCode’s debugging tools can be configured to debug both the Node.js backend and React frontend.
- **Live Server Preview**: Use the "Live Server" extension to preview changes in real time for the frontend.

---

## Security Tools & Practices

### Security Tools Used:
1. **express-session**:
   - Manages user sessions, protecting against session hijacking by storing session IDs on the server. It helps maintain state across requests.
   
2. **ExpressBrute**:
   - Middleware that limits repeated login attempts from the same IP address to prevent brute-force attacks. It provides security for endpoints that handle sensitive data, such as login routes.

3. **https**:
   - Ensures secure communication between client and server by using SSL certificates for HTTPS. This encrypts data in transit, protecting sensitive information like user credentials.

4. **dotenv**:
   - Used to load environment variables from a `.env` file, ensuring sensitive data like API keys, session secrets, and database URIs are not hardcoded in the codebase.

### Best Practices:
- Always keep your `.env` file out of version control (use `.gitignore`).
- Rotate your session secret regularly for enhanced security.

---

## API Documentation

### Available Routes:

#### User Routes (`/api/users`)
- **POST** `/register`: Register a new user
- **POST** `/login`: Login a user

### Example Request:
#### POST /api/login
```bash
curl -X POST https://your-api-url.com/api/login \
-H 'Content-Type: application/json' \
-d '{"email":"user@example.com", "password":"yourpassword"}'
```

#### Response:
```json
{
  "message": "Login successful",
  "token": "jwt-token"
}
```

---

## Technologies Used

### Frontend:
- **React**: For building the user interface.
- **react-router-dom**: For managing routing in the frontend.

### Backend:
- **Node.js**: JavaScript runtime for building backend services.
- **Express**: Web framework for building RESTful APIs.
- **mongoose**: ODM for MongoDB, used to interact with the database.

### Database:
- **MongoDB**: NoSQL database used for storing user and post data.

### Other Libraries:
- **cors**: To enable Cross-Origin Resource Sharing.
- **dotenv**: For environment variable management.
- **express-session**: For secure session management.
- **ExpressBrute**: For preventing brute-force attacks.

---

## Contributing

We welcome contributions from the community! If you'd like to contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

Please make sure to follow the project's coding standards and include relevant tests when submitting changes.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

