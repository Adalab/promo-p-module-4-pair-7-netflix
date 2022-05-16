const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");
// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


// Creamos el endpoint para responder a la peticion que viene del font (getMoviesFromApi). 
// La ruta es '/movies', como habíamos especificado en el fetch del front, pero esta ruta la hemos elegido/creado/configurado nosotras aquí, es decir, el fetch tiene que llamar a esta ruta que es la que aloja los datos que le pide al back, pero aquí es donde decidimos que esta es la ruta en la que se alojan. 
// El verbo es GET, pues hacemos una petición de datos y no vamos a modificar nada en el servidor
server.get('/movies', (req, res) => {

  // Vemos que query params estamos recibiendo del front
  console.log('Querys que recibimos del front:', req.query);

  // guardamos el valor de las query params en una constante:
  const genderFilterParam = req.query.gender;
  const sortFilterParam = req.query.sort;


  // Esta función sirve para ordenar las películas por orden alfabético. Esta función es un callBack para el método de arrays 'sort', que lo que hacer es comprobar la condición de los 'if' y evaluar el orden de los elementos en función del 'return'
  const orderScenesAsc = (x, y) => { // La comparación se hace, de manera iterativa: x=0, y=1; x=0, y=2; ... x=1, y=0; x=1, y=2; ...
    if (x.title < y.title) { // Si el valor de la función (el return) es < 0, entonces ordena 'x.title' antes que 'y.title'
      return -1;
    } else if (x.title > y.title) { // Si el valor de la función (el return) es > 0, entonces ordena 'y.title' antes que 'x.title'
      return 1;
    } else {
      return 0;  // Si el valor de la función (el return) es = 0, mantener el orden original de 'x.movie' y 'y.movie'
    }
  };

  // Esta función es la misma que la anterior pero en orden descendente
  const orderScenesDesc = (x, y) => { 
    if (x.title < y.title) { 
      return 1;
    } else if (x.title > y.title) { 
      return -1;
    } else {
      return 0;
    }
  };


  // Para que funcionen los filtros en el navegador, es decir, para que al seleccionar el valor del select o del checkbox se filtren o se ordenen las películas, debemos realizar un 'filter' y un 'sort' (según el caso) y mandarle el valor de las películas filtradas a la respuesta del servidor para que éste a su vez se las mande al front que es el que las pinta
  const filteredMovies = movies
    .filter(movie => {
      if(genderFilterParam === ''){
        return true; // Le decimos que si está seleccionado el valor por defecto en el select (es decir, el valor que pone en el navegador 'Todas'), nos devuelva todas las películas
      } else {
        return movie.gender === genderFilterParam ? true : false; // Le decimos que si el género de cada película (movie.gender) es igual al parámetro que recibimos por query params 'genderFilterParam', entonces me devuelva esa película, la que cumple esa condición vamos
      }
    })
    .sort(sortFilterParam === 'asc' ? orderScenesAsc : orderScenesDesc); // En este caso, la función 'sort' dice que si el checkbox tiene valor 'asc', las películas se ordenen alfabéticamente (como describe la función 'orderScenesAsc') y sino, que las ordene alfabéticamente inverso (como describe la función 'orderScenesDesc')


  // Esta es la variable que contiene la respuesta del servidor a la petición del front. En este caso, guardamos las variables que queremos que nos devuelva el servidor en la variable 'response'
  const response = {
    success: true,
    movies: filteredMovies // Ponemos las películas almacenadas en './data/movies.json'
     // Función para filtrar las 'movies' en función de los query params
    
  }

  // y luego le decimos que mande esa respuesta (almacenada en el parámetro 'res') en formato 'json' con los datos almacenador en esta variable (response)
  res.json(response);
})
