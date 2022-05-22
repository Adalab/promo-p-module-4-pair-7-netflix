import React from 'react';

const MoviesList = props => {
  const renderMovieList = () => {
    return <ul className="cards">{renderMovies()}</ul>;
  };

  const renderMovies = () => {
    return props.movies.map(movie => {
      return (
        <li key={movie.id} className="card">
          <img src="//localhost:4000/Logo_netflix.png" alt="Logo Netflix" className="card__logo" />
          <img className="card__img" src={movie.image} alt={`Carátula de ${movie.title}`} />
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
