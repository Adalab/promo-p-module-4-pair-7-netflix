const express = require('express');
const cors = require('cors');
// movies data
const movies = require('./data/movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


// api endpoint - quey params movies
server.get('/movies', (req, res) => {

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
    .filter(movie => {
      if(genderFilterParam === ''){
        return true; 
      } else {
        return movie.gender === genderFilterParam ? true : false; 
      }
    })
    .sort(sortFilterParam === 'asc' ? orderScenesAsc : orderScenesDesc); 


  // server response
  const response = {
    success: true,
    movies: filteredMovies
  }

  // send server response in json format
  res.json(response);
})
