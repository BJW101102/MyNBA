
const fs = require('fs');
const csv = require("csvtojson");
const sqlite3 = require("sqlite3").verbose();
const path = require('path');
const createTables = require("./createtables");
const axios = require("axios");
const { error } = require('console');

// Open the database
const teamID = 20;  // Replace with the actual team ID
const nbaTeamID = [1,2,3,4,5,6,7,8,9,10,11,14,15,16,17,19,20,21,22,23,24,25,26,27,28,29,30,31,38,40,41]
const season = "2023";  // Replace with the desired season
const db_path = "../backend/model/sports-app.db";
let db = new sqlite3.Database(db_path, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
  updateGameStats(41, season)
});




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

function getGameStatsByTeam(team_id, season) {
  const url = "https://api-nba-v1.p.rapidapi.com/games";
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
      const updatePlayerStats = `
        UPDATE PlayerStats 
        SET POS = ?, PTS = ?, REB = ?, AST = ?, BLKS = ?, FG = ?, LASTGAME_ID = ?
        WHERE PlayerID = ? AND TeamID = ?
      `;
      const insertPlayerStat = `INSERT INTO PlayerStats (POS, PTS, REB, AST, BLKS, FG, LASTGAME_ID) VALUES (?,?,?,?,?,?,?)`

      const checkPlayerExist = "SELECT PlayerID FROM PLayers WHERE PlayerID = ?";
      teamStats["response"].forEach(player => {
        const playerID = player["player"].id;
        const pos = player["pos"];
        const pts = parseInt(player["points"]);
        const reb = parseInt(player["totReb"]);
        const ast = parseInt(player["assists"]);
        const blks = parseInt(player["blocks"]);
        const fgp = parseInt(player["fgp"]);
        const lg = parseInt(player["game"].id);

        db.get(checkPlayerExist, [playerID], (err, row) => {
          if (err) {
            console.error("Error Checking Player Exist (PlayerStats)", err);
            return;
          } if (row) {
            db.run(updatePlayerStats, [pos, pts, reb, ast, blks, fgp, lg, playerID, teamID], (error) => {
              if (error) {
                console.error('Error updating player stats: ', error);
                return;
              }
              console.log('PlayerID: %s POS: %s stats updated successfully!', playerID, pos);
            });
          } else {
            console.log("PlayerID %d does not exist", playerID)
          }
        });
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function updateGameStats(teamID, season) {
  try {
    const gameStats = await getGameStatsByTeam(teamID, season);
    if (gameStats) {
      const insertTeamGame = 
      "INSERT INTO Games (GameID, Date, HomeID, VisitorID, HomeScore, VisitorScore) VALUES (?,?,?,?,?,?)";
      gameStats["response"].forEach(game => {
        const gameID = game.id;
        const date = game["date"]["start"];
        const homeID = game["teams"]["home"].id;
        const visitorID = game["teams"]["visitors"].id;
        const homeScore = game["scores"]["home"]["points"];
        const visitorScore = game["scores"]["visitors"]["points"];
        const checkGameExist = "SELECT GameID FROM Games WHERE GameID = ?";

        // console.log(gameID)
        // Check if the game ID already exists in the database
        db.get(checkGameExist, [gameID], (err, row) => {
          if (err) {
            console.error('Error checking game existence: ', err);
            return;
          }
          if (row) { // Game ID doesn't exist, proceed with insertion
            console.log("Game %d already exist, skipping Insert", gameID);
          } else {
            db.run(insertTeamGame, [gameID, date, homeID, visitorID, homeScore, visitorScore], (err) => {
              if (err){
                console.error('Error inserting game: ', err);
              }
              else {
                console.log ("Game %d inserted into Games Table", gameID);
              }
            })
          }
        });
      });
      updatePlayerStats(teamID, season);
    }
  } catch (error) {
    console.error('Error', error);
  }

}

