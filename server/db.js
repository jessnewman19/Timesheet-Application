const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./data/timesheet.db";

function connectToDatabase() {
  // If the file path already exists, create a new database object
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    //If filepath does not exist, create the table
    const database = new sqlite3.Database(filepath, (error) => {
      if (error) {
        //Outputs error message to the console, but will not return a value
        return console.error(`ERROR IN DATABASE CONNECTION: ${error.message}`);
      }
      createTable(database);
      console.log("Connected to the database successfully");
    });
    return database;
  }
}

//How to ensure the data is not duplicated? Something to do with the id?
function createTable(database) {
  database.exec(`
  CREATE TABLE timesheet
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    client TEXT NOT NULL,
    project TEXT NOT NULL,
    project_code TEXT NOT NULL,
    hours REAL NOT NULL,
    billable TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    billable_rate INTEGER NOT NULL
  )
`);
}
module.exports = connectToDatabase();
