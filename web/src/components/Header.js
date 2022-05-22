import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
  const renderUnloggedUserLinks = () => {
    if (props.isUserLogged === false)
      return (
        <>
          <li>
            <Link className="nav__link" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="nav__link" to="/signup">
              Registro
            </Link>
          </li>
        </>
      );
  };

  const renderLoggedUserLinks = () => {
    if (props.isUserLogged === true)
      return (
        <>
          <li>
            <Link to="/profile">
              Mi perfil
            </Link>
          </li>
          <li>
            <Link to="/my-movies">
              Mis películas
            </Link>
          </li>
          <li className="close">
            <span onClick={props.logout}>
              Cerrar sesión
            </span>
          </li>
        </>
      );
  };

  return (
    <header className="col2 border--medium header">
      <Link className="nav__link" to="/">
        <img src="//localhost:4000/fullLogo_netflix.png" alt="Logo Netflix" className="header__title" />
      </Link>
      <nav >
        <ul className="header__menu">
          <li className="nav__item">
            <Link className="nav__link" to="/">
              Inicio
            </Link>
          </li>
          {renderUnloggedUserLinks()}
          {renderLoggedUserLinks()}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
