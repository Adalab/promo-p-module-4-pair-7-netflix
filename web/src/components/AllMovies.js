import React from 'react';
import MoviesList from './MoviesList';

const AllMovies = props => {
  const handleOptions = ev => {
    props.handleAllMoviesOptions({
      value: ev.target.value,
      key: ev.target.name
    });
  };

  return (
    <section className="main">
      <h1 className="title">Estas son todas las películas de nuestro catálogo</h1>
      <form className="form">
        <div className="form__filterGender">
          <label htmlFor="filterGender">Filtrar por género</label>
          <select
            className="select"
            id="filterGender"
            name="gender"
            value={props.allMoviesOptionGender}
            onChange={handleOptions}
          >
            <option className="select__option" value="">Todas</option>
            <option className="select__option" value="Drama">Drama</option>
            <option className="select__option" value="Comedia">Comedia</option>
          </select>
        </div>

        <div className="form__sort">
          <label>Ordernar:</label>
          <label className="labelMovies">
            A-Z
            <input
              className="radio"
              type="radio"
              name="sort"
              value="asc"
              checked={props.allMoviesOptionSort === 'asc'}
              onChange={handleOptions}
            />
          </label>

          <label className="labelMovies">
            Z-A
            <input
              className="radio"
              type="radio"
              name="sort"
              value="desc"
              checked={props.allMoviesOptionSort === 'desc'}
              onChange={handleOptions}
            />
          </label>
        </div>
      </form>

      <MoviesList movies={props.movies} />
    </section>
  );
};

export default AllMovies;
