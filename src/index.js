const express = require("express");
const cors = require("cors");
// const users = require("./data/users.json");
const Database = require("better-sqlite3");
// movies data
// const movies = require("./data/movies.json");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// set template engine middlewares
server.set("view engine", "ejs");

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//Le decimos a Node que queremos usar esa base de datos:
const db = new Database("./src/data/database.db", { verbose: console.log });

// api endpoint - quey params movies
server.get("/movies", (req, res) => {
  // query params
  const genderFilterParam = req.query.gender;
  const sortFilterParam = req.query.sort;

  const query = db.prepare(
    `SELECT * FROM movies WHERE gender LIKE ? ORDER BY name ${sortFilterParam}`
  );
  const moviesData = query.all(
    genderFilterParam ? genderFilterParam.toLowerCase() : "%"
  );

  // server response
  const response = {
    success: true,
    movies: moviesData,
  };

  // send server response in json format
  res.json(response);
});

server.post("/login", (req, res) => {
  const query = db.prepare(
    `SELECT * FROM users WHERE email = ? AND password = ?`
  );
  const userLogin = query.get(req.body.email, req.body.password);

  console.log(userLogin.userId);
  if (userLogin !== undefined) {
    res.json({
      success: true,
      userId: userLogin.userId,
    });
  } else {
    res.json({
      success: false,
      errorMessage: "Usuaria/o no encontrada/o",
    });
  }
});

server.get("/movie/:movieId", (req, res) => {
  console.log("Url params:", req.params);
  const foundMovie = movies.find((movie) => movie.id === req.params.movieId);
  console.log(foundMovie);
  res.render("movie", foundMovie);
});

// Registro de nuevas usuarias en el back
server.post("/sign-up", (req, res) => {
  // body params
  const emailSignUpParam = req.body.email;
  const passwordSignUpParam = req.body.password;

  const userSignUpInsert = db.prepare(
    `SELECT * FROM users WHERE email = ? AND password = ?`
  );
  const foundUser = userSignUpInsert.get(emailSignUpParam, passwordSignUpParam);

  if (foundUser === undefined) {
    const query = db.prepare(
      "INSERT INTO users (email, password) VALUES (?, ?)"
    );
    const userSignUp = query.run(emailSignUpParam, passwordSignUpParam);

    res.json({
      success: true,
      userId: userSignUp.lastInsertRowid,
    });
  } else {
    res.json({
      success: false,
      errorMessage: "Usuaria/o ya existente",
    });
  }
});

// endpoint de actualizar el perfil de la usuaria:

server.post("/user/profile", (req, res) => {
  const query = db.prepare(
    `UPDATE users SET name = ?, email = ?, password= ? WHERE userId=?`
  );

  const updateProfile = query.run(
    req.body.name,
    req.body.email,
    req.body.password,
    req.headers["user-id"]
  );
  res.json({
    succes: true,
    userProfile: updateProfile,
  });
});

//endpoint de recuperar los datos del perfil de la usuaria:
server.get("/user/profile", (req, res) => {
  console.log("headers params:", req.headers["user-id"]);
  const userProfile = db.prepare(`SELECT * FROM users WHERE userId = ?`);
  const userDates = userProfile.get(req.headers["user-id"]);
  res.json(userDates);
  console.log(userDates);
});
// En esta carpeta ponemos los ficheros estáticos
// static server

const staticServerPathWeb = "./src/public-react";
server.use(express.static(staticServerPathWeb));

// static server of images
const staticServerImagesPathWeb = "./src/public-movies-images/";
server.use(express.static(staticServerImagesPathWeb));

// static server of styles:
const staticServerStylesPathWeb = "./src/public-styles";
server.use(express.static(staticServerStylesPathWeb));
