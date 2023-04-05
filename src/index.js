const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// open the database
let db = new sqlite3.Database(
  "./src/database/JSPH.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the example database.");
    }
  }
);

// run a query
app.get("/", (req, res) => {
  db.all("SELECT * FROM JSPH", (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      res.send(rows);
    }
    // close the database connection
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Closed the database connection.");
    });
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
module.exports = app;
