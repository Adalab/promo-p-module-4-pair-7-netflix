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

//Le decimos a Node que queremos usar esa base de datos:

const db = new Database("./src/data/database.db", { verbose: console.log });

// api endpoint - quey params movies
server.get("/movies", (req, res) => {
  // query params
  const genderFilterParam = req.query.gender;
  const sortFilterParam = req.query.sort;


  /*
  let moviesData;
  if (genderFilterParam) {
    const query = db.prepare(`SELECT * FROM movies WHERE gender = ?`);
    moviesData = query.all(genderFilterParam.toLowerCase());
  } else {
    const query = db.prepare(`SELECT * FROM movies`);
    moviesData = query.all();
  }
  */


    /* let moviesData;
  if (sortFilterParam === "asc") {
    const query = db.prepare(`SELECT * FROM movies WHERE gender LIKE ? ORDER BY name`);
    moviesData = query.all(genderFilterParam ? genderFilterParam.toLowerCase() : '%');
  } else {
    const query = db.prepare(`SELECT * FROM movies WHERE gender LIKE ? ORDER BY name DESC`);
    moviesData = query.all(genderFilterParam ? genderFilterParam.toLowerCase() : '%');
  }; */


  const query = db.prepare(`SELECT * FROM movies WHERE gender LIKE ? ORDER BY name ${sortFilterParam}`);
  const moviesData = query.all(genderFilterParam ? genderFilterParam.toLowerCase() : '%');


  // sort movies by title
  /* const orderScenesAsc = (x, y) => {
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
  }; */

  // filter and sort movies
  /*const filteredMovies = moviesData
    .filter((movie) => {
      if (genderFilterParam === "") {
        return true;
      } else {
        return movie.gender === genderFilterParam ? true : false;
      }
    })
    .sort(sortFilterParam === "asc" ? orderScenesAsc : orderScenesDesc);
*/
  /*if (sortFilterParam === "asc") {
    moviesData.sort(orderScenesAsc);
  } else {
    moviesData.sort(orderScenesDesc);
  }*/


  // server response
  const response = {
    success: true,
    movies: moviesData
  };

  // send server response in json format
  res.json(response);
});


server.post("/login", (req, res) => {
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
// static server of styles:

const staticServerStylesPathWeb = "./src/public-styles";
server.use(express.static(staticServerStylesPathWeb));
