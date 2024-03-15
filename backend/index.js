//NOTE: Middleware Installation: backend/installations/MiddleWare-Installation.txt

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const routes = require('./controller/routes')
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5500;

// Setting Up Sessions
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(session({
    secret: 'MikeTheTiger2025!',
    resave: false,
    saveUninitialized: true,
    cookie:{
        secure: false,
        httpOnly: true,
        maxAge: 36000000,
    },
}));

// Setting Up Middleware
app.use(express.json());

// Establishing server via port: 5500
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
});


// Connecting to local database
const path = "C:\\Users\\ender\\OneDrive\\Documents\\GitHub\\Sports-Application\\backend\\database\\sports-app.db"; // Change to local path
const db = new sqlite3.Database(path, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite Database.\n');
    }
})

//Exporting db instance to routes.js
app.use((req, res, next) => {
    req.db = db; // Attach db instance to req object
    next();
});

// Setting up routes
app.use('/api', routes);


// SQL Queries
const {selectAllFromTable, deleteAllFromTable, deleteTable, createTable} = require('./controller/queries.js');
const createUserTable = `
CREATE TABLE userinfo ( 
    userID INTEGER PRIMARY KEY, 
    username TEXT(50) UNIQUE, 
    password TEXT(50))`
    ;


