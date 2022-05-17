const getMoviesFromApi = (params) => {
  console.log('Se están pidiendo las películas de la app');
  console.log(params);

  // create query params
  const queryParamsGender = `gender=${params.gender}`;
  const queryParamsSort = `sort=${params.sort}`;


  return fetch(`//localhost:4000/movies?${queryParamsGender}&${queryParamsSort}`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
