const express = require("express");
const cors = require("cors");
const users = require("./data/users.json");
const Database = require("better-sqlite3");
// movies data
const movies = require("./data/movies.json");

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

const db = new Database("./src/data/database.db", { verbose: console.log });

// api endpoint - quey params movies
server.get("/movies", (req, res) => {
  // query params
  const genderFilterParam = req.query.gender;
  const sortFilterParam = req.query.sort;

  // sort movies by title
  const orderScenesAsc = (x, y) => {
    if (x.title < y.title) {
      return -1;
    } else if (x.title > y.title) {
      return 1;
    } else {
      return 0;
    }
  };

  const orderScenesDesc = (x, y) => {
    if (x.title < y.title) {
      return 1;
    } else if (x.title > y.title) {
      return -1;
    } else {
      return 0;
    }
  };

  // filter and sort movies
  const filteredMovies = movies
    .filter((movie) => {
      if (genderFilterParam === "") {
        return true;
      } else {
        return movie.gender === genderFilterParam ? true : false;
      }
    })
    .sort(sortFilterParam === "asc" ? orderScenesAsc : orderScenesDesc);

  //NO FUNCIONA TODAVIA

  /* const query = db.prepare(`SELECT * FROM movies WHERE gender = ?`);
  const movies = query.get(genderFilterParam);
  console.log(movies);*/
  // server response
  const response = {
    success: true,
    movies: filteredMovies,
  };

  // send server response in json format
  res.json(response);
});
server.post("/login", (req, res) => {
  console.log(req.body);
  const foundUser = users.find(
    (user) =>
      (user.email === req.body.email) & (user.password === req.body.password)
  );
  if (foundUser) {
    res.json({ success: true, userId: req.body.id });
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

// En esta carpeta ponemos los ficheros estáticos
// static server
const staticServerPathWeb = "./src/public-react";
server.use(express.static(staticServerPathWeb));
// static server of images
const staticServerImagesPathWeb = "./src/public-movies-images/";
server.use(express.static(staticServerImagesPathWeb));
