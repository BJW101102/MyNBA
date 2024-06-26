const fs = require("fs");
const csv = require("csvtojson");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const createTables = require("./createtables");


//NOTE: RUN COMMAND: ....\backend\model\db-controller> node .\model\db-controller\tables.js

// Open the database
const db_path = "../backend/model/sports-app.db";
let db = new sqlite3.Database(db_path, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
  createTables(db)
  const playDir = "../backend/data-files/Players";
  const brandDir = "../backend/data-files/Teams/Brand.csv"
  // const teamDir = "../backend/data-files/Teams/Teams.csv";
  // processTeamBranding(brandDir)
  traverseDirectory(playDir);
  const alterTableQuery = `
  ALTER TABLE PlayerStats
  ADD COLUMN JERSEYNUMBER INT;
`;

  // Execute the query
  db.run(alterTableQuery, (error, results) => {
    if (error) {
      console.error('Error adding column:', error);
    } else {
      console.log('Column JERSEYNUMBER added successfully');
    }
  });
  // processTeamData(teamDir);
});

const processTeamData = async (filePath) => {
  const teams = await csv().fromFile(filePath);
  const insertTeam = "Insert INTO Teams (TeamID, Teamname, SportCategory) VALUES(?, ?, ?)";
  const checkTeamExists = "SELECT TeamID FROM Teams WHERE TeamID = ?";
  const checkTeamStatExists = "SELECT TeamStatID FROM TeamStats WHERE TeamStatID = ?";
  const insertTeamStats = "Insert INTO TeamStats (TeamStatID, TeamID, Code, Conference, Division, Location) VALUES(?, ?, ?, ?, ?, ?)";

  teams.forEach((team) => {
    const isFranchise = team.response.nbaFranchise; //String
    console.log(isFranchise)
    if (isFranchise == "True") {
      // Teams table vars
      const teamID = team.response.id;
      const name = team.response.name;
      const sport = "Basketball";

      // TeamStats table vars
      const teamStatID = team.response.id;
      const conference = team.response.leagues.standard.conference;
      const location = team.response.city;
      const teamCode = team.response.code;
      const division = team.response.leagues.standard.division;

      // TeamBranding table vars
      const brandID = team.response.id;


      // Check if team already exists
      db.get(checkTeamExists, [teamID], (err, row) => {
        if (err) {
          console.error("Error checking team existence", err);
          return;
        }
        if (row) {
          console.log(`Team already exists with ID: ${teamID}. Skipping insert.`);
        } else {
          // Insert into Teams table
          db.run(insertTeam, [teamID, name, sport], function (err) {
            if (err) {
              console.error("Error inserting team", err);
            } else {
              console.log(
                "Team-Entered: ID: %d, Name: `%s`, Sport: `%s`",
                teamID,
                name,
                sport
              );
            }
          });
        }
      });

      // Check if team stats already exists
      db.get(checkTeamStatExists, [teamStatID], (err, row) => {
        if (err) {
          console.error("Error checking team stat existence", err);
          return;
        }
        if (row) {
          console.log(
            `Team stat already exists with ID: ${teamStatID}. Skipping insert.`
          );
        } else {
          // Insert into TeamStats table
          db.run(
            insertTeamStats,
            [teamStatID, teamID, teamCode, conference, division, location],
            function (err) {
              if (err) {
                console.error("Error inserting team stat", err);
              } else {
                console.log(
                  "TeamStats-Entered: Stat-ID: %s, Team-ID: Name: `%s`, Sport: `%s`",
                  teamStatID,
                  teamID,
                  conference,
                  location
                );
              }
            }
          );
        }
      });
    } else {
      console.log("Team %s is NOT an NBA franchise", team.response.name);
    }
  });

};

const processPlayerData = async (filePath) => {
  const players = await csv().fromFile(filePath);
  const insertPlayer =
    "Insert INTO Players (TeamID, PlayerID, FirstName, LastName) VALUES(?, ?, ?, ?)";
  const insertPlayerStats =
    "INSERT INTO PlayerStats(TeamID, PlayerID, POS, PTS, REB, AST, BLKS, FG, LASTGAME_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const checkPlayerExists = "SELECT PlayerID FROM Players WHERE PlayerID = ?";
  const checkPlayerStatsExists = "SELECT PlayerID FROM Players WHERE PlayerID = ?";


  players.forEach((player) => {
    const playerID = player.response.id;
    const firstName = player.response.firstname;
    const lastName = player.response.lastname;
    const teamID = players[0].parameters.team;

    // Check if player already exists
    db.get(checkPlayerExists, [playerID], (err, row) => {
      if (err) {
        console.error("Error checking player existence", err);
        return;
      }
      if (row) {
        console.log(
          `Player already exists with ID: ${playerID}. Skipping insert.`
        );
      } else {
        db.run(
          insertPlayer,
          [teamID, playerID, firstName, lastName],
          function (err) {
            if (err) {
              console.error("Error inserting player", err);
            } else {
              console.log(
                "Player-Entered: %s, %s, ID: %d, Team: %d",
                firstName,
                lastName,
                playerID,
                teamID
              );
            }
          }
        );
      }
    });
    db.get(checkPlayerExists, [checkPlayerStatsExists], (err, row) => {
      if (err) {
        console.error("Error checking playerStats existence", er)
      }
      if (row) {
        `Player already exists with ID: ${playerID}. Skipping insert.`
      } else {
        db.run(insertPlayerStats, [teamID, playerID, "None", 0, 0, 0, 0, 0, 0], function (err) {
          if (err) {
            console.error('Error inserting player', err);
          } else {
            console.log("Player-Entered: %s", playerID);
          }
        });
      }
    });
  });
};

const processTeamBranding = async (filePath) => {
  const branding = await csv().fromFile(filePath);
  const insertBranding =
    "INSERT INTO TeamBranding (TeamID, Logo, PrimaryColor, SecondaryColor) VALUES(?,?,?,?)"
  const checkBrandingExists =
    "SELECT TeamID FROM TeamBranding WHERE TeamID = ?";
  branding.forEach((team => {
    const teamID = team.id
    const logo = team.logo
    const primary = team.primary
    const secondary = team.secondary

    //Check if Branding Exist
    db.get(checkBrandingExists, [teamID], (err, row) => {
      if (err) {
        console.error("Error checking player existence", err);
        return;
      }
      if (row) {
        console.log(
          `Team already exists with ID: ${teamID}. Skipping insert.`
        );
      } else {
        // Inserting Branding
        db.run(insertBranding, [teamID, logo, primary, secondary], (err) => {
          if (err) {
            console.log('Error inserting Team %s', teamID)
          }
          else {
            console.log('Team %s entered into TeamBranding', teamID)
          }
        });
      }
    });
  }))
}

function traverseDirectory(directory) {
  // Get all files and subdirectories in the current directory
  const items = fs.readdirSync(directory);

  // Loop through each item
  items.forEach((item) => {
    // Get the full path of the item
    const itemPath = path.join(directory, item);

    // Check if the item is a directory
    if (fs.statSync(itemPath).isDirectory()) {
      // If it's a directory, recursively traverse it
      traverseDirectory(itemPath);
    } else {
      // If it's a file, check if it's a CSV file
      if (path.extname(itemPath) === ".csv") {
        updatePlayerStats(itemPath)
      }
    }
  });
}



const updatePlayerStats = async (filePath) => {
  const updatePlayerStatsJersey = "UPDATE PlayerStats SET JERSEYNUMBER = ? WHERE PlayerID = ?";
  const players = await csv().fromFile(filePath);
  players.forEach((player) => {
    const playerID = player.response.id;
    const jerseyNumber = player.response.leagues.standard.jersey || "N/A"; // Assuming jerseyNumber is null if not provided

    // Update player stats with jersey number
    db.run(updatePlayerStatsJersey, [jerseyNumber, playerID], function (err) {
      if (err) {
        console.error("Error updating player stats with jersey number", err);
      } else {
        console.log("Player stats updated with jersey number: %s", jerseyNumber);
      }
    });
  });

}
