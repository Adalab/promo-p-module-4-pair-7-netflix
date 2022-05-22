import React from 'react';
import MoviesList from './MoviesList';

const MyMovies = props => {
  return (
    <section>
      <h1 className="title">Estas son todas tus películas</h1>
      <MoviesList movies={props.movies} />
    </section>
  );
};

export default MyMovies;
