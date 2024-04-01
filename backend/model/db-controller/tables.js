
const fs = require('fs');
const csv = require("csvtojson");
const sqlite3 = require("sqlite3").verbose();
const path = require('path');
const createTables = require("./createtables");


// Open the database
const db_path = "C:\\Users\\Brandon Walton\\Documents\\Sports-Application\\backend\\model\\sports-app.db"
let db = new sqlite3.Database(db_path, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
  // createTables(db)
  const dir = "C:\\Users\\Brandon Walton\\Documents\\Sports-Application\\backend\\data-files\\Players"
  // processPlayerData(path);
  // traverseDirectory(dir);
});


const processPlayerData = async (filePath) => {
    const players = await csv().fromFile(filePath);
    const insertPlayer = 'Insert INTO Players (TeamID, PlayerID, FirstName, LastName) VALUES(?, ?, ?, ?)';
    players.forEach(player => {
        const playerID = player.response.id;
        const firstName = player.response.firstname;
        const lastName = player.response.lastname;
        const teamID = players[0].parameters.team;
        db.run(insertPlayer, [teamID, playerID, firstName, lastName], function (err){
          if (err){
            console.error('Error inserting player', err);
          } else {
            console.log("Player-Entered: %s, %s, ID: %d, Team: %d", firstName, lastName, playerID, teamID);
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