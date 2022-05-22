import React, { useState } from 'react';

const SignUp = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);

  // events

  const handleEmail = ev => {
    setEmail(ev.target.value);
  };

  const handlePassword = ev => {
    setPassword(ev.target.value);
  };

  const handleConfirmPassword = ev => {
    setConfirmPassword(ev.target.value);
  };

  const handleForm = ev => {
    ev.preventDefault();

    setPasswordErrorMessage(false);

    if(password === confirmPassword){

      // Enviamos los datos a App y este al API
      props.sendSingUpToApi({
        email: email,
        password: password
      });

    } else {

      setPasswordErrorMessage(true);

    }
  };

  // render

  const passwordErrorRender = () => {
    // Si el API ha devuelto un error, APP lo guarda en el estado y nos lo pasa
    if (passwordErrorMessage !== false) {
      return (
        <p className="errorMessage">
          Error en el password: <span className="error">Las contraseñas no coinciden</span>
        </p>
      );
    }
  };

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

        <label className="formLogin__label" htmlFor="confirmPassword">
          Vuelve a escribir tu contraseña
        </label>
        <input
          className="formLogin__input"
          type="text"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />

        <input className="button" type="submit" value="Registrar" />

        {renderErrorMessage()}
        {passwordErrorRender()}
      </form>
    </section>
  );
};

export default SignUp;
