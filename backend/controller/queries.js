const express = require('express');
const router = express.Router();
module.exports = router;

/*** 
 * Selects and prints to the console all rows from a table in the database
 * @param {object} database The database instance
 * @param {string} tableName Name of the SQL table
***/
function selectAllFromTable(database, tableName) {
    database.all(`SELECT * FROM ${tableName} `, (err, rows) => {
        if (err) {
            console.error("Error querying table:", err.message);
        }
        else {
            rows.forEach((row) => {
                console.log(row);
            });
        }
    })
}

/*** 
 * Deletes all rows from a table in the database
 * @param {object} database The database instance
 * @param {string} tableName Name of the SQL table
***/
function deleteAllFromTable(database, tableName){
    database.all(`DELETE FROM ${tableName}`, (err) =>{
        if (err){
            console.error("Error deleting from table:",tableName);
        }
        else{
            console.log("All entries have been deleted from table:", tableName);
        }
    })
}

/*** 
 * Deletes a table in the database
 * @param {object} database The database instance
 * @param {string} query  SQL query in string format
 * @param {string} tableName Name of the SQL table
***/
function deleteTable(database, table){
    database.run(`DROP TABLE IF EXISTS ${table}`, (err) =>{
        if(err){
            console.error("Error deleting table:", table);
        }
        else{
            console.log("Table %s has been deleted", table);
        }
    })
}

/*** 
 * Creates a table in a database
 * @param {object} database The database instance
 * @param {string} query  SQL query in string format
 * @param {string} tableName Name of the SQL table
***/
function createTable(database, query, tableName){
    database.run(query, (err) =>{
        if (err){
            console.log("Error creating table:", tableName);
        }
        else{
            console.log("Table %s has been created successfully",tableName);
        }
    })
}



//Exporting functions to routes.js
module.exports = {
    selectAllFromTable,
    deleteAllFromTable,
    deleteTable,
    createTable
};