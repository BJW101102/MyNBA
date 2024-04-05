const fs = require("fs");
const csv = require("csvtojson");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const createTables = require("./createtables");

// Open the database
const db_path =
  "C:\\Users\\Brandon Walton\\Documents\\Sports-Application\\backend\\model\\sports-app.db";
let db = new sqlite3.Database(db_path, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
  // createTables(db)
  const dir =
    "C:\\Users\\Brandon Walton\\Documents\\Sports-Application\\backend\\data-files\\Players";
  // processPlayerData(path);
  // traversePlayerDirectory(dir);
});

const processTeamData = async (filePath) => {
  const teams = await csv().fromFile(filePath);
  const insertTeam =
    "Insert INTO Teams (TeamID, Teamname, SportCategory) VALUES(?, ?, ?, ?)";
  const checkTeamExists = "SELECT TeamID FROM Teams WHERE TeamID = ?";

  const insertTeamStats =
    "Insert INTO TeamStats (TeamStatID, TeamID, Conference, Location) VALUES(?, ?, ?, ?)";

  teams.forEach((team) => {
    // Teams table vars
    const teamID = team.response.id;
    const name = team.response.name;
    const sport = "Basketball";

    // TeamStats table vars
    const teamStatID = team.response.id;
    const conference = team.response.leagues.standard.conference;
    const location = team.response.city;

    // TeamBranding table vars
    const brandID = crypto.randomUUID();

    // Check if player already exists
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

        // Insert into TeamStats table
        db.run(
          insertTeamStats,
          [teamStatID, teamID, conference, location],
          function (err) {
            if (err) {
              console.error("Error inserting team", err);
            } else {
              console.log(
                "TeamStats-Entered: Stat-ID: %s, Team-ID: Name: `%s`, Sport: `%s`",
                teamStatId,
                teamID,
                conference,
                location
              );
            }
          }
        );
      }
    });
  });
};

const processPlayerData = async (filePath) => {
  const players = await csv().fromFile(filePath);
  const insertPlayer =
    "Insert INTO Players (TeamID, PlayerID, FirstName, LastName) VALUES(?, ?, ?, ?)";
  const checkPlayerExists = "SELECT PlayerID FROM Players WHERE PlayerID = ?";

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
