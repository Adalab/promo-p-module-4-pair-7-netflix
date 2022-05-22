// login

const sendLoginToApi = (data) => {
  console.log("Se están enviando datos al login:", data);

  return fetch("http://localhost:4000/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// signup

const sendSingUpToApi = (data) => {
  console.log("Se están enviando datos al signup:", data);

  return fetch("http://localhost:4000/sign-up", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// profile

const sendProfileToApi = (userId, data) => {
  console.log("Se están enviando datos al profile:", userId);
  console.log("data: ", data);
  const bodyParams = {
    name: data.name,
    email: data.email,
    password: data.password,
  };
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch("http://localhost:4000/user/profile", {
    method: "POST",
    body: JSON.stringify(bodyParams),
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
  })
    .then((response) => response.json())

    .then((data) => {
      return data;
    });
};

const getProfileFromApi = (userId) => {
  console.log("Se están pidiendo datos del profile del usuario:", userId);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch("http://localhost:4000/user/profile", {
    headers: {
      "user-id": userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// user movies

const getUserMoviesFromApi = (userId) => {
  console.log(
    "Se están pidiendo datos de las películas de la usuaria:",
    userId
  );

  return fetch("http://localhost:4000/user/movies", {
    headers: {
      "user-id": userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};
const setMovieFavourite = (userId, movieId) => {
  const data = {
    movieId: movieId.toString(),
  };
  return fetch("http://localhost:4000/user/movies/favourite", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
};
const objToExport = {
  sendLoginToApi: sendLoginToApi,
  sendSingUpToApi: sendSingUpToApi,
  sendProfileToApi: sendProfileToApi,
  getProfileFromApi: getProfileFromApi,
  getUserMoviesFromApi: getUserMoviesFromApi,
  setMovieFavourite: setMovieFavourite,
};

export default objToExport;
