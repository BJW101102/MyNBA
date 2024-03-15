const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = router;

// Registering New User (SignUp)
router.post('/register', async (req, res) => {
    // Grabbing parameters from JSON object
    const username = req.body.username;
    const password = req.body.password;

    const db = req.db; // Access db instance attached to req object
    // Registering User and Hashing password
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertNewUser = 'Insert INTO userinfo (username,password) VALUES (?, ?)' // SQL Query
        db.run(insertNewUser, [username, hashedPassword], function (err) { //Running Query
            if (err) {
                console.error("Error inserting user:", err.message);
                res.status(500).send("Error inserting user");
            } else {
                console.log(`User ${username} inserted with ID ${this.lastID}`)
                res.status(200).send("User registered successfully")
            }
        });
    }
    catch (error) {
        console.error('Error Creating User:', error);
        res.status(500).send({error: `Error Creating User ${username}`}); // Include the error message
    }
});