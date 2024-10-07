
const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const session = require('express-session');
const ExpressBrute = require('express-brute');
require('dotenv').config();
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');

const app = express();
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

//SSL Options
const httpsOptions = {
  key: fs.readFileSync('C:/Users/Ethan/Desktop/APDS VS SWIFT/backend/keys/localhost-key.pem'),
  cert: fs.readFileSync('C:/Users/Ethan/Desktop/APDS VS SWIFT/backend/keys/localhost.pem')
};

//Middleware
app.use(express.json());

const corsOptions = {
  origin: 'https://localhost:3001', 
  credentials: true, 
};
app.use(cors(corsOptions));

//Express session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mySecret',
    resave: false,
    saveUninitialized: true,
  })
);


const store = new ExpressBrute.MemoryStore(); 
const bruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 15 * 60 * 1000, // 15 minutes
});

//protect login route with brute-force middleware
app.use('/api/users/login', bruteforce.prevent);

//API Routes
app.use('/api/users', userRoutes);

//MongoDB Connection
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

//Start the HTTPS server
https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});







