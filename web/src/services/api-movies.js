// login

/* En App.js vemos que, en el useEffect, la función 'getMoviesFromApi' recibe como parámetros el objeto:

 const params = {
    gender: allMoviesOptionGender,
    sort: allMoviesOptionSort
  }; 

  que a su vez recibe en la propiedad 'gender' por 'props' el valor del género seleccionado en el 'select' del front (del componente 'AllMovies'). Y, en la propiedad 'sort' recibe el valor clickado del checkbox del front que ordena las película alfabéticamente de A-Z o de Z-A.
  */

const getMoviesFromApi = (params) => {
  console.log('Se están pidiendo las películas de la app');
  console.log(params);

  // Los parámetros que queremos enviar por query params son precisamente los que nos vienen del select por 'props' a la función 'getMoviesFromApi' y están en el objeto 'params', entonces los query params serán:
  const queryParamsGender = `gender=${params.gender}`;
  const queryParamsSort = `sort=${params.sort}`;
  

  // La 'url' deonde se debe hacer la petición de datos es la de nuestro servidor '//localhost:4000'. Además, los datos están alojados en la ruta:'/movies'.
  // A la 'url' anterior le añadimos los query params para filtrar por género y por orden alfabético
  return fetch(`//localhost:4000/movies?${queryParamsGender}&${queryParamsSort}`)
    .then(response => response.json())
    .then(data => {
      // 'data' son los datos reales que retorna el servidor para pasárselos a React
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
