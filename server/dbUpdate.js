require("dotenv").config();
const db = require("mysql");

const conn = db.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

conn.connect((err) => {
  if (err) throw err;
  conn.query("USE music");
  // conn.query(
  //   "ALTER TABLE user ADD COLUMN firstname VARCHAR(30) NOT NULL AFTER username;",
  //   (result, error, fields) => {
  //     if (error) throw error;
  //     console.log(result);
  //   }
  // );

  // conn.query(
  //   "ALTER TABLE user ADD COLUMN lastname VARCHAR(30) NOT NULL AFTER firstname;",
  //   (result, error, fields) => {
  //     if (error) throw error;
  //     console.log(result);
  //   }
  // );

  conn.query(
    "ALTER TABLE user ADD COLUMN subscribe ENUM('false', 'true') NOT NULL DEFAULT 'false' AFTER password;",
    (result, error, fields) => {
      if (error) throw error;
      console.log(result);
    }
  );
  conn.end();
});
