import React, { useState } from 'react';

const SignUp = props => {
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
    // Enviamos los datos a App y este al API
    props.sendSingUpToApi({
      email: email,
      password: password
    });
  };

  // render

  const renderErrorMessage = () => {
    // Si el API ha devuelto un error, APP lo guarda en el estado y nos lo pasa
    if (props.signUpErrorMessage !== '') {
      return (
        <p className="errorMessage">
          Error en el registro: <span className="error">{props.signUpErrorMessage}</span>
        </p>
      );
    }
  };

  return (
    <section>
      <h1 className="title">Regístrate</h1>
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

        <input className="button" type="submit" value="Registrar" />

        {renderErrorMessage()}
      </form>
    </section>
  );
};

export default SignUp;
