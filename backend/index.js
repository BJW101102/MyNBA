// Middleware Installation: backend/installations/MiddleWare-Installation.txt

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const routes = require('./controller/routes')
const app = express();
const PORT = 5500;

app.use(express.json());

// Connecting to Server for HTTP Request
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
});

// Connecting to local database
const path = "C:\\Users\\ender\\OneDrive\\Documents\\GitHub\\Sports-Application\\backend\\database\\sports-app.db"; // Change to path
const db = new sqlite3.Database('path', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the database.');
    }
})

const userinfo = `CREATE TABLE userinfo ( userID INTEGER PRIMARY KEY, username TEXT(50), password TEXT(50))`


