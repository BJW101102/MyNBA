
function createTables(db) {
    db.serialize(() => {
        db.run(
            `CREATE TABLE IF NOT EXISTS UserInfo (
      userID INTEGER PRIMARY KEY, 
      username TEXT(50) UNIQUE, 
      password TEXT(50)
    )`,
            [],
            function (err) {
                if (err) {
                    console.error("Error creating UserInfo table", err.message);
                    return;
                }
                console.log("UserInfo table created or already exists.");
            }
        );

        db.run(`
    CREATE TABLE IF NOT EXISTS Games (
        GameID INTEGER PRIMARY KEY,
        Date TEXT NOT NULL,
        HomeID INTEGER NOT NULL,
        VisitorID INTEGER NOT NULL,
        HomeScore INTEGER,
        VisitorScore INTEGER
    )
`);

        // Create users table
        db.run(
            `CREATE TABLE IF NOT EXISTS Teams (
      TeamID INTEGER PRIMARY KEY AUTOINCREMENT,
      Teamname TEXT NOT NULL,
      SportCategory TEXT NOT NULL
    )`,
            [],
            function (err) {
                if (err) {
                    console.error("Error creating Teams table", err.message);
                    return;
                }
                console.log("Teams table created or already exists.");
            }
        );

        // Create products table
        db.run(
            `CREATE TABLE IF NOT EXISTS TeamStats (
      TeamID ForeignKey,
      TeamStatID INTEGER PRIMARY KEY AUTOINCREMENT,
      Conference TEXT NOT NULL,
      Location TEXT NOT NULL,
      FOREIGN KEY (TeamID) REFERENCES Teams(TeamID)
    )`,
            [],
            function (err) {
                if (err) {
                    console.error("Error creating TeamStats table", err.message);
                    return;
                }
                console.log("TeamStats table created or already exists.");
            }
        );

        // Create products table
        db.run(
            `CREATE TABLE IF NOT EXISTS TeamBranding (
      TeamID ForeignKey,
      BrandID INTEGER PRIMARY KEY AUTOINCREMENT,
      Logo TEXT NOT NULL,
      PrimaryColor TEXT NOT NULL,
      SecondaryColor TEXT NOT NULL,
      FOREIGN KEY (TeamID) REFERENCES Teams(TeamID)
    )`,
            [],
            function (err) {
                if (err) {
                    console.error("Error creating TeamBranding table", err.message);
                    return;
                }
                console.log("TeamBranding table created or already exists.");
            }
        );

        db.run(
            `CREATE TABLE IF NOT EXISTS Players (
      TeamID ForeignKey,
      PlayerID INTEGER,
      Firstname TEXT NOT NULL,
      Lastname TEXT NOT NULL,
      FOREIGN KEY (TeamID) REFERENCES Teams(TeamID)
    )`,
            [],
            function (err) {
                if (err) {
                    console.error("Error creating Players table", err.message);
                    return;
                }
                console.log("Players table created or already exists.");
            }
        );

        db.run(
            `CREATE TABLE IF NOT EXISTS PlayerStats (
        PlayerStatID INTEGER PRIMARY KEY AUTOINCREMENT,
        TeamID ForeignKey,
        PlayerID ForeignKey,
        POS TEXT NOT NULL,
        PTS INTEGER NOT NULL,
        REB INTEGER NOT NULL,
        AST INTEGER NOT NULL,
        BLKS INTEGER NOT NULL,
        FG INTEGER NOT NULL,
        LASTGAME_ID INTEGER NOT NULL,
        FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID)
        FOREIGN KEY (TeamID) REFERENCES Teams(TeamID)

    )`,
            [],
            function (err) {
                if (err) {
                    console.error("Error creating PlayerStats table", err.message);
                    return;
                }
                console.log("PlayerStats table created or already exists.");
            }
        );

        // Create products table
        db.run(
            `CREATE TABLE IF NOT EXISTS UserSports (
      UserSportID INTEGER PRIMARY KEY AUTOINCREMENT,
      UserID ForeignKey,
      TeamID ForeignKey,
      FavPlayerID ForeignKey,
      FOREIGN KEY (UserID) REFERENCES UserInfo(UserID),
      FOREIGN KEY (TeamID) REFERENCES Teams(TeamID),
      FOREIGN KEY (FavPlayerID) REFERENCES Players(PlayerID)
    )`,
            [],
            function (err) {
                if (err) {
                    console.error("Error creating UserSports table", err.message);
                    return;
                }
                console.log("UserSports table created or already exists.");
            }
        );
    });
}

module.exports = createTables;