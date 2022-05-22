import React from "react";
import apiUser from "../services/api-user";
const MoviesList = (props) => {
  const renderMovieList = () => {
    return <ul className="cards">{renderMovies()}</ul>;
  };
  const handleFavourite = (movieId) => {
    const userId = localStorage.getItem("userId");
    apiUser.setMovieFavourite(userId, movieId).then((res) => {
      console.log(res);
    });
  };
  const renderMovies = () => {
    return props.movies.map((movie) => {
      return (
        <li key={movie.id} className="card">
          <img
            src="//localhost:4000/logo_netflix.png"
            alt="Logo Netflix"
            className="card__logo"
          />
          <i
            className="fa-solid fa-heart card__fav"
            onClick={() => handleFavourite(movie.id)}
          ></i>
          <img
            className="card__img"
            src={movie.image}
            alt={`Carátula de ${movie.title}`}
          />
          <h3 className="card__title uppercase">{movie.title}</h3>
        </li>
      );
    });
  };

  const renderEmptyList = () => {
    return <p>No hay películas en este listado</p>;
  };

  return props.movies.length ? renderMovieList() : renderEmptyList();
};

export default MoviesList;
