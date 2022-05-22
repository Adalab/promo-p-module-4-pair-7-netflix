import React, { useState } from 'react';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // events

  const handleEmail = ev => {
    setEmail(ev.target.value);
  };

  const handlePassword = ev => {
    setPassword(ev.target.value);
  };

  const handleForm = ev => {
    ev.preventDefault();
    // enviamos los datos a App y este al API
    props.sendLoginToApi({
      email: email,
      password: password
    });
  };

  // render

  const renderErrorMessage = () => {
    // Si el API ha devuelto un error, App lo guarda en su estado y nos lo pasa por props
    if (props.loginErrorMessage !== '') {
      return (
        <p className="errorMessage">
          Error en el login: <span className="error">{props.loginErrorMessage}</span>
        </p>
      );
    }
  };

  return (
    <section className="login">
      <h1 className="title">Identifícate</h1>
      <form className="formLogin" onSubmit={handleForm}>
        <label className="formLogin__label" htmlFor="email">
          Escribe tu email
        </label>
        <input
          className="formLogin__input"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleEmail}
        />

        <label className="formLogin__label" htmlFor="password">
          Escribe tu contraseña
        </label>
        <input
          className="formLogin__input"
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />

        <input className="button" type="submit" value="Entrar" />

        {renderErrorMessage()}
      </form>
    </section>
  );
};

export default Login;
