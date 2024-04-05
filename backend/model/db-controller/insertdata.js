
const fs = require('fs');
const csv = require("csvtojson");
const sqlite3 = require("sqlite3").verbose();
const path = require('path');
const createTables = require("./createtables");
const axios = require("axios");



// Open the database
const teamID = 1;  // Replace with the actual team ID
const season = "2023";  // Replace with the desired season
const db_path = "C:\\Users\\Brandon Walton\\Documents\\Sports-Application\\backend\\model\\sports-app.db"
let db = new sqlite3.Database(db_path, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
  // createTables(db)
  const dir = "C:\\Users\\Brandon Walton\\Documents\\Sports-Application\\backend\\data-files\\Players"
  // traverseDirectory(dir);
  updatePlayerStats(teamID, season);
});


const processPlayerData = async (filePath) => {
  const players = await csv().fromFile(filePath);
  const insertPlayer = 'Insert INTO Players (TeamID, PlayerID, FirstName, LastName) VALUES(?, ?, ?, ?)';
  const insertPlayerStats = 'INSERT INTO PlayerStats(TeamID, PlayerID, POS, PTS, REB, AST, BLKS, FG, LASTGAME_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  players.forEach(player => {
    const playerID = player.response.id;
    const firstName = player.response.firstname;
    const lastName = player.response.lastname;
    const teamID = players[0].parameters.team;
    db.run(insertPlayer, [teamID, playerID, firstName, lastName], insertPlayerStats, [teamID, playerID, "None", 0, 0, 0, 0, 0, 0], function (err) {
      if (err) {
        console.error('Error inserting player', err);
      } else {
        console.log("Player-Entered: %s, %s, ID: %d, Team: %d", firstName, lastName, playerID, teamID);
      }
    })
    db.run(insertPlayerStats, [teamID, playerID, "None", 0, 0, 0, 0, 0, 0], function (err) {
      if (err) {
        console.error('Error inserting player', err);
      } else {
        console.log("Player-Entered: %s", playerID);
      }
    })
  })
}

function traverseDirectory(directory) {
  // Get all files and subdirectories in the current directory
  const items = fs.readdirSync(directory);

  // Loop through each item
  items.forEach(item => {
    // Get the full path of the item
    const itemPath = path.join(directory, item);

    // Check if the item is a directory
    if (fs.statSync(itemPath).isDirectory()) {
      // If it's a directory, recursively traverse it
      traverseDirectory(itemPath);
    } else {
      // If it's a file, check if it's a CSV file
      if (path.extname(itemPath) === '.csv') {
        processPlayerData(itemPath);
      }
    }
  });
}

// API Queries
function getPlayerStatsByTeam(team_id, season) {
  const url = "https://api-nba-v1.p.rapidapi.com/players/statistics";
  const querystring = new URLSearchParams({ team: team_id, season: season });

  const headers = {
    "X-RapidAPI-Key": "b2a90f6514msh27c59dfd5ded947p1f4eb9jsnf4de5e98eb53",
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
  };

  return axios.get(url, { headers, params: querystring })
    .then(response => {
      const player_data = response.data;
      return player_data;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      return null;
    });
}

async function updatePlayerStats(teamID, season) {
  try {
    const teamStats = await getPlayerStatsByTeam(teamID, season);
    if (teamStats) {
      const updateQuery = `
        UPDATE PlayerStats 
        SET POS = ?, PTS = ?, REB = ?, AST = ?, BLKS = ?, FG = ?, LASTGAME_ID = ?
        WHERE PlayerID = ? AND TeamID = ?
      `;
      teamStats["response"].forEach(player => {
        const playerID = player["player"].id
        const pos = player["pos"]
        const pts = parseInt(player["points"])
        const reb = parseInt(player["totReb"])
        const ast = parseInt(player["assists"])
        const blks = parseInt(player["blocks"])
        const fgp = parseInt(player["fgp"])
        const lg = parseInt(player["game"].id);
        // Assuming db is your database connection
        db.run(updateQuery, [pos, pts, reb, ast, blks, fgp, lg, playerID, teamID], (error) => {
          if (error) {
            console.error('Error updating player stats: ', error);
            return;
          }
          console.log('PlayerID: %s stats updated successfully!', playerID);
        });
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}