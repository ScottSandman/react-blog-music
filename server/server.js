require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const pool = db.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.post("/user", async (request, response) => {
  try {
    console.log("POST USER");
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(request.body.password, salt);
    const conn = await pool.getConnection();
    const result = await conn.query(
      `INSERT INTO music.user (firstname, lastname, username, password, subscribe) VALUES ('${request.body.firstname}', '${request.body.lastname}', '${request.body.username}', '${hashedPW}', '${request.body.subscribe}');`
    );
    const userInfo = { username: request.body.username };
    const accessToken = jwt.sign(userInfo, process.env.AUTH_TOKEN);
    response.status(201).cookie("AccessToken", accessToken).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/blogPost", authorizeUser, async (request, response) => {
  try {
    console.log("POST BLOG");
    const conn = await pool.getConnection();
    const userID = await conn.query(
      `SELECT id FROM music.user WHERE username = '${request.user.username}'`
    );
    const result = await conn.query(
      `INSERT INTO music.blog (author_Id, date, title, post) VALUES (${userID[0][0].id}, CURDATE(), '${request.body.title}','${request.body.post}');`
    );
    response.status(201).send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.post("/users/login", async (request, response) => {
  try {
    console.log("ATTEMPTING LOGIN");
    console.log(request.body);
    const conn = await pool.getConnection();
    const result = await conn.query(
      `SELECT * FROM music.user WHERE username = '${request.body.username}';`
    );
    console.log(result);
    if (result[0][0] === undefined) {
      response.status(404).send("Username does not exist");
    }
    if (await bcrypt.compare(request.body.password, result[0][0].password)) {
      const userInfo = { username: request.body.username };
      const accessToken = jwt.sign(userInfo, process.env.AUTH_TOKEN);
      console.log("login Successful", userInfo, accessToken);

      response.status(202).cookie("AccessToken", accessToken).send(userInfo);
    }
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.get("/blogs", async (request, response) => {
  try {
    console.log("RETRIEVING BLOGS");
    const conn = await pool.getConnection();
    const result = await conn.query(
      `SELECT music.blog.id, title, date, author_id, post, username FROM music.blog JOIN music.user ON (music.blog.author_id = music.user.id) ORDER BY id DESC`
    );
    response.status(201).send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.post("/logout", async (request, response) => {
  try {
    console.log("LOGGING OUT");
    response.status(200).cookie("AccessToken", "").send();
  } catch (error) {
    response.status(500).send(error);
  }
});

function authorizeUser(request, response, next) {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    console.log(token, "token is null");
    return response.sendStatus(401);
  }
  jwt.verify(token, process.env.AUTH_TOKEN, (err, user) => {
    if (err) response.sendStatus(403);
    request.user = user;
    console.log(request.user);
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
