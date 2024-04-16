const fs = require("fs");
const csv = require("csvtojson");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const createTables = require("./createtables");

// Open the database
const db_path = "C:\\Users\\ender\\OneDrive\\Documents\\GitHub\\Sports-Application\\backend\\model\\sports-app.db";
let db = new sqlite3.Database(db_path, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
  createTables(db)
  const playDir = "C:\\Users\\ender\\OneDrive\\Documents\\GitHub\\Sports-Application\\backend\\data-files\\Players";
  traverseDirectory(playDir);
  const teamDir = "C:\\Users\\ender\\OneDrive\\Documents\\GitHub\\Sports-Application\\backend\\data-files\\Teams\\Teams.csv";
  processTeamData(teamDir);
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
        processPlayerData(itemPath);
      }
    }
  });
}
