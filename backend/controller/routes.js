const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = router;

/* ===== POST ===== */

// Handles new user registration  
router.post('/register', async (req, res) => {
    // Grabbing parameters from JSON object
    const username = req.body.username;
    const password = req.body.password;

    const db = req.db; // Access db instance attached to req object
    // Registering User and Hashing password
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertNewUser = 'Insert INTO UserInfo (username,password) VALUES (?, ?)' // SQL Query
        db.run(insertNewUser, [username, hashedPassword], function (err) { //Running Query
            if (err) {
                console.error("Error inserting user:", err.message);
                res.status(500).send("Error inserting user");
            } else {
                console.log(`User ${username} inserted with ID ${this.lastID}`)
                // Establishing user session
                req.session.user = {
                    username: username,
                    password: password,
                    userID: this.lastID
                };
                res.status(200).send("User registered successfully")
            }
        });
    }
    catch (error) {
        console.error('Error Creating User:', error);
        res.status(500).send({ error: `Error Creating User ${username}` }); // Include the error message
    }
});

// Handles valid user login  
router.post('/login', async (req, res) => {
    // Grabbing parameters from JSON object
    const username = req.body.username;
    const password = req.body.password;
    const db = req.db;
    try {
        // Selecting User for database
        const selectUser = `SELECT * FROM UserInfo WHERE username = ?`
        db.get(selectUser, [username], async (err, row) => {
            if (err) {
                throw err;
            }
            if (!row) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            // Checking for password match
            const isPasswordValid = await bcrypt.compare(password, row.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            // Establishing user session
            req.session.user = {
                username: row.username,
                password: row.password,
                userID: row.userID
            };
            console.log(`User ${username} has been logged in`);
            res.status(200).json({ message: 'Login successful', user: { id: row.id, username: row.username } });
        })
    }
    catch (error) {
        res.status(500).send({ error: `Error Logging in user ${username}` }); // Include the error message
    }
})

// Handles logging out
router.post('/logout', async (req, res) => {
    console.log("Called")
    req.session.destroy((err) => {
        if (err) {
            console.log("Error destroying session:", err);
            return res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json({ message: "Session Destroyed" });
        }
    })
})


/* ===== GET ===== */

// Fetches for valid user's and their metadata
router.get('/userdata', async (req, res) => {
    try {
        // Requesting Session
        if (!req.session.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Creating user reference
        user = req.session.user;
        console.log(`Fetched user ${user.username} with ID ${user.userID}`);
        return res.status(200).json({ username: user.username, userID: user.userID });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});