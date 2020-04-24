require("dotenv").config();
const db = require("mysql");

const conn = db.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

conn.connect((err) => {
  if (err) throw err;
  conn.query("CREATE DATABASE IF NOT EXISTS music");
  conn.query("USE music");
  conn.query(
    "CREATE TABLE IF NOT EXISTS  user (id INT UNIQUE NOT NULL AUTO_INCREMENT, username VARCHAR(30) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id));",
    (result, error, fields) => {
      if (error) throw error;
      console.log(result);
    }
  );
  conn.query(
    "CREATE TABLE IF NOT EXISTS blog (id INT UNIQUE NOT NULL AUTO_INCREMENT, title VARCHAR(100) NOT NULL, date DATE, author_id INT NOT NULL, post VARCHAR(4000) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (author_id) REFERENCES user(id));",
    (result, error, fields) => {
      if (error) throw error;
      console.log("result", result);
    }
  );
  conn.end();
});
