const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = router;

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
            console.log(`Login: ${username}, ${req.session.user.userID} [>]`);
            res.status(200).json({ message: 'Login successful', user: { id: row.id, username: row.username } });
        })
    }
    catch (error) {
        res.status(500).send({ error: `Error Logging in user ${username}` }); // Include the error message
    }
});

// Handles logging out
router.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error destroying session:", err);
            return res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json({ message: "Session Destroyed" });
        }
    })
});

// Fetches for valid user's and their metadata
router.get('/userdata', async (req, res) => {
    try {
        // Requesting Session
        if (!req.session.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Creating user reference
        user = req.session.user;
        // console.log(`Fetch: ${user.username}, ${user.userID}`);
        return res.status(200).json({ username: user.username, userID: user.userID });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Fecthes for all Teams on the Teams table
router.get('/allteams', async (req, res) => {
    const selectAllTeams = `
    SELECT *
    FROM Teams
    INNER JOIN TeamStats ON Teams.TeamID = TeamStats.TeamID
    INNER JOIN TeamBranding ON Teams.TeamID = TeamBranding.TeamID;
    `;
    const allTeams = [];
    req.db.all(selectAllTeams, (err, rows) => {
        if (err) {
            console.error("Error selecting Teams");
            return res.status(500).json({ message: "Internal Server Error" });
        } else {
            rows.forEach(row => {
                let team = new TeamInfo(row.TeamID);
                team.setPrimary(row.PrimaryColor);
                team.setSecondary(row.SecondaryColor);
                team.setLocation(row.Location);
                team.setLogo(row.Logo);
                team.setTeamName(row.Teamname);
                team.setConference(row.Conference);
                team.setDivision(row.Division);
                team.setCode(row.Code);
                allTeams.push(team);
            })
        }
        return res.status(200).json(allTeams);
    });
});

// Handles getting followed-teams
router.get("/followed-teams", async (req, res) => {
    try {
        // Requesting Session
        if (!req.session.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Creating user reference
        const user = req.session.user;
        const selectUserTeams = "SELECT teamID FROM UserSports WHERE userID = ?";
        const checkTeamExistsOnTeams = "SELECT teamID FROM Teams WHERE teamID = ?";
        const checkTeamExistsOnPlayers = "SELECT teamID FROM Players WHERE teamID = ?";
        const checkTeamExistsOnTeamBranding = "SELECT teamID FROM TeamBranding WHERE teamID = ?";
        const checkTeamExistsOnTeamStats = "SELECT teamID FROM TeamStats WHERE teamID = ?";

        req.db.all(selectUserTeams, [user.userID], async (err, rows) => {
            if (err) {
                return res.status(500).json({ message: "Error fetching user teams" });
            }

            const followedTeams = [];
            const promises = rows.map(row => {
                return new Promise((resolve, reject) => {
                    let teamID = row.TeamID;
                    let team = new TeamInfo(teamID);

                    // Checking for TeamID -> Teams
                    req.db.get(checkTeamExistsOnTeams, [teamID], (err, row) => {
                        if (err) {
                            console.error("Error checking TeamID on Teams", err);
                            reject(err);
                        }
                        if (row) {
                            // Select Query for TeamName
                            const selectTeamName = "SELECT Teamname FROM Teams WHERE TeamID = ?";
                            req.db.get(selectTeamName, [teamID], (err, row) => {
                                if (err) {
                                    console.error("Error selecting Teamname");
                                    reject(err);
                                } else {
                                    team.setTeamName(row.Teamname);

                                    // Checking for TeamID -> TeamBranding
                                    req.db.get(checkTeamExistsOnTeamBranding, [teamID], (err, row) => {
                                        if (err) {
                                            console.error("Error checking TeamID on TeamBranding");
                                            reject(err);
                                        }
                                        if (row) {
                                            // Select Query for TeamBranding Elements
                                            const selectTeamBranding = "SELECT Logo, PrimaryColor, SecondaryColor FROM TeamBranding WHERE TeamID = ?";
                                            req.db.get(selectTeamBranding, [teamID], (err, row) => {
                                                if (err) {
                                                    console.error("Error selecting TeamID");
                                                    reject(err);
                                                } else {
                                                    team.setLogo(row.Logo);
                                                    team.setPrimary(row.PrimaryColor);
                                                    team.setSecondary(row.SecondaryColor);

                                                    // Checking for TeamID -> TeamStats
                                                    req.db.get(checkTeamExistsOnTeamStats, [teamID], (err, row) => {
                                                        if (err) {
                                                            console.log("Error checking TeamID on TeamStats");
                                                            reject(err);
                                                        }
                                                        if (row) {
                                                            // Select Query for TeamStats Elements
                                                            const selectTeamStats = "SELECT Code, Conference, Division, Location FROM TeamStats WHERE TeamID = ?";
                                                            req.db.get(selectTeamStats, [teamID], (err, row) => {
                                                                if (err) {
                                                                    console.error("Error selecting TeamStats");
                                                                    reject(err);
                                                                } else {
                                                                    team.setCode(row.Code);
                                                                    team.setConference(row.Conference);
                                                                    team.setDivision(row.Division);
                                                                    team.setLocation(row.Location);

                                                                    // Checking for TeamID -> Players
                                                                    req.db.get(checkTeamExistsOnPlayers, [teamID], (err, row) => {
                                                                        if (err) {
                                                                            console.error("Error checking TeamID on Players");
                                                                            reject(err);
                                                                        }
                                                                        if (row) {
                                                                            const selectPlayers = `
                                                                            SELECT *
                                                                            FROM Players 
                                                                            INNER JOIN PlayerStats ON Players.PlayerID = PlayerStats.PlayerID AND Players.TeamID = PlayerStats.TeamID
                                                                            WHERE Players.TeamID = ?;
                                                                          `; req.db.all(selectPlayers, [teamID], (err, row) => {
                                                                                if (err) {
                                                                                    console.error("Error selecting Players");
                                                                                    reject(err);
                                                                                } else {
                                                                                    let playersList = [];
                                                                                    row.forEach(player => {
                                                                                        var currentPlayer = new Players(teamID, player.PlayerID);
                                                                                        currentPlayer.setFirstName(player.Firstname);
                                                                                        currentPlayer.setLastName(player.Lastname);
                                                                                        currentPlayer.setJerNum(player.JERSEYNUMBER);
                                                                                        currentPlayer.setPos(player.POS);
                                                                                        playersList.push(currentPlayer);
                                                                                    });
                                                                                    team.setPlayers(playersList);
                                                                                    followedTeams.push(team);
                                                                                    resolve();
                                                                                }
                                                                            });
                                                                        } else {
                                                                            console.log("TeamID %s does not exist on Players");
                                                                            resolve();
                                                                        } // DNE -> Players
                                                                    });
                                                                }
                                                            });
                                                        } else {
                                                            console.log("TeamID %s does not exist on TeamStats", teamID);
                                                            resolve();
                                                        }//DNE -> TeamStats
                                                    });
                                                }
                                            });
                                        } else {
                                            console.log("TeamID %s does not exist on TeamBranding", teamID);
                                            resolve();
                                        } // DNE -> TeamBranding
                                    });
                                }
                            });
                        } else {
                            console.log("TeamID %s does not exist on Teams", teamID);
                            resolve();
                        }// DNE -> Teams 
                    });
                });
            });
            // Wait for all promises to resolve
            await Promise.all(promises);
            return res.status(200).json(followedTeams);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/team/:id", async (req, res) => {
    const teamID = Number.parseInt(req.params.id);
    const checkTeamExist = "SELECT TeamID FROM Teams WHERE TeamID = ?";
    const checkTeamExistsOnPlayers = "SELECT teamID FROM Players WHERE teamID = ?";
    const selectPlayers = ` SELECT * FROM Players INNER JOIN PlayerStats ON Players.PlayerID = PlayerStats.PlayerID AND Players.TeamID = PlayerStats.TeamID WHERE Players.TeamID = ?; `;
    const selectGames = `SELECT * FROM Games WHERE HomeID = ? OR VisitorID = ? `;
    try {
        const row = await new Promise((resolve, reject) => {
            req.db.get(checkTeamExist, [teamID], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });

        if (!row) {
            return res.status(500).json({ message: "Team doesn't exist" });
        }

        let team = await selectTeam(teamID, req, res);

        if (!team) {
            return res.status(500).json({ message: "Error joining Teams" });
        }

        req.db.get(checkTeamExistsOnPlayers, [teamID], async (err, row) => {
            if (err) {
                return res.status(500).json({ message: "Error checking Players" });
            }
            if (!row) {
                return res.status(500).json({ message: "Player doesn't exist" });
            }

            try {
                const players = await new Promise((resolve, reject) => {
                    req.db.all(selectPlayers, [teamID], (err, row) => {
                        if (err) {
                            reject(err);
                        } else {
                            let playersList = [];
                            row.forEach(player => {
                                var currentPlayer = new Players(teamID, player.PlayerID);
                                currentPlayer.setFirstName(player.Firstname);
                                currentPlayer.setLastName(player.Lastname);
                                currentPlayer.setJerNum(player.JERSEYNUMBER);
                                currentPlayer.setPos(player.POS);
                                currentPlayer.setPTS(player.PTS);
                                currentPlayer.setBLKS(player.BLKS);
                                currentPlayer.setAST(player.AST);
                                currentPlayer.setREB(player.REB);
                                currentPlayer.setFGP(player.FG);
                                playersList.push(currentPlayer);
                            });
                            resolve(playersList);
                        }
                    });
                });

                team.setPlayers(players);

                req.db.all(selectGames, [teamID, teamID], async (err, rows) => {
                    if (err) {
                        return res.status(500).json({ message: "Error Selecting Game" });
                    }
                    if (!rows || rows.length === 0) {
                        return res.status(500).json({ message: "Team hasn't played this season" });
                    }

                    let teamGames = [];

                    try {
                        await Promise.all(rows.map(async row => {
                            let game = new Games(row.GameID);
                            // Set home team

                            game.setHomeTeam(await selectTeam(row.HomeID, req, res));
                            game.setVisitorTeam(await selectTeam(row.VisitorID, req, res));
                            game.setHomeScore(row.HomeScore);
                            game.setVisitorScore(row.VisitorScore);
                            if (teamID === row.HomeID) { //Team is Home
                                if (row.HomeScore > row.VisitorScore) {
                                    game.isTeamWinner(true);
                                } else {
                                    game.isTeamWinner(false);
                                }
                            }
                            else { // Team is Visitor
                                if (row.VisitorScore > row.HomeScore) {
                                    game.isTeamWinner(true);
                                } else {
                                    game.isTeamWinner(false);
                                }
                            }
                            teamGames.push(game);
                        }));
                        return res.status(200).json({ games: teamGames, team: team});
                    } catch (error) {
                        return res.status(500).json({ message: "Error fetching games" });
                    }
                });

            } catch (error) {
                return res.status(500).json({ message: "Error fetching players" });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Error checking Teams" });
    }
});


// Handles following a team
router.put("/follow/:id", async (req, res) => {
    try {
        // Requesting Session
        if (!req.session.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Creating user reference
        const user = req.session.user;
        const teamID = Number.parseInt(req.params.id);
        const checkUserTeamExist = "SELECT userID FROM UserSports WHERE userID = ? AND teamID = ?";
        const insertUserTeam = "INSERT INTO UserSports (userID, teamID) VALUES (?, ?)";

        req.db.get(checkUserTeamExist, [user.userID, teamID], function (err, row) {
            if (err) {
                return res.status(500).json({ message: "Error checking UserSports" });
            } else {
                if (row) {
                    return res.status(403).json({ message: "UserSports entry already exist" });
                } else {
                    req.db.run(insertUserTeam, [user.userID, teamID], function (err) {
                        if (err) {
                            return res.status(500).json({ message: "Error following team" });
                        }
                        console.log(`Follow: (${user.username}, ${user.userID}) -> ${teamID} [$]`)
                        return res.status(200).json({ teamID: req.params.id, userID: user.userID });
                    });
                }
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Handles unfollowing a team
router.delete("/unfollow/:id", async (req, res) => {
    try {
        // Requesting Session
        if (!req.session.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Creating user reference
        const user = req.session.user;
        const teamID = Number.parseInt(req.params.id);
        const deleteUserTeam = "DELETE FROM UserSports WHERE userID = ? AND teamID = ?";
        req.db.run(deleteUserTeam, [user.userID, teamID], function (err) {
            if (err) {
                return res.status(500).json({ message: "Error unfollowing team" });
            }
            console.log(`Unfollow: (${user.username}, ${user.userID}) -> ${teamID} [!]`)
            return res.status(200).json({ teamID: req.params.id, userID: user.userID });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Handles updating updating game 
router.patch("/update-team/:id", async (req, res) => {
    // Grab User in Session
    if (!req.session.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    return res.status(200).json({ message: "Success" });
    // Call updateGameStats 
});


async function selectTeam(teamID, req, res) {
    let team = new TeamInfo(teamID);
    const joinByTeamID = `SELECT * FROM Teams INNER JOIN TeamStats ON Teams.TeamID = TeamStats.TeamID INNER JOIN TeamBranding ON Teams.TeamID = TeamBranding.TeamID WHERE Teams.TeamID = ?; `;
    try {
        const row = await new Promise((resolve, reject) => {
            req.db.get(joinByTeamID, [teamID], function (err, row) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(row);
            });
        });

        if (row) {
            team.setTeamName(row.Teamname);
            team.setCode(row.Code);
            team.setConference(row.Conference);
            team.setLocation(row.Location);
            team.setPrimary(row.PrimaryColor);
            team.setSecondary(row.SecondaryColor);
            team.setDivision(row.Division);
            team.setLogo(row.Logo);

        } else {
            return res.status(500).json({ message: "Team doesn't exist" });
        }
        return team;
    } catch (error) {
        return res.status(500).json({ message: "Error joining Teams" });
    }
};

class TeamInfo {
    constructor(teamID) {
        this.teamID = teamID;
        this.setTeamName = function (name) {
            this.name = name;
        };
        this.setCode = function (code) {
            this.code = code;
        };
        this.setConference = function (conference) {
            this.conference = conference;
        };
        this.setDivision = function (division) {
            this.division = division;
        };
        this.setLocation = function (location) {
            this.location = location;
        };
        this.setLogo = function (logo) {
            this.logo = logo;
        };
        this.setPrimary = function (primary) {
            this.primary = primary;
        };
        this.setSecondary = function (secondary) {
            this.secondary = secondary;
        };
        this.setPlayers = function (players) {
            this.players = players;
        };
    }
};

class Players {
    constructor(teamID, playerID) {
        this.teamID = teamID;
        this.playerID = playerID;
        this.setFirstName = function (firstName) {
            this.firstName = firstName;
        };
        this.setLastName = function (lastName) {
            this.lastName = lastName;
        };
        this.setPos = function (pos) {
            this.pos = pos;
        };
        this.setJerNum = function (jerNum) {
            this.jerNum = jerNum;
        };
        this.pts = function (pts){
            this.pts = pts;
        };
        this.setREB = function (reb){
            this.reb = reb;
        };
        this.setPTS = function (pts){
            this.pts = pts;
        };
        this.setAST = function (ast){
            this.ast = ast;
        };
        this.setBLKS = function (blks){
            this.blks = blks;
        };
        this.setFGP = function (fgp){
            this.fgp = fgp;
        };
    }
};

class Games {
    constructor(gameID) {
        this.gameID = gameID;
        this.setHomeTeam = function (team) {
            this.homeTeam = team;
        };
        this.setHomeScore = function (score) {
            this.homeScore = score;
        };

        this.setVisitorTeam = function (team) {
            this.visitorTeam = team;
        };
        this.setVisitorScore = function (score) {
            this.visitorScore = score;
        };
        this.isTeamWinner = function (result) {
            this.isTeamWinner = result;
        };
    }
};
