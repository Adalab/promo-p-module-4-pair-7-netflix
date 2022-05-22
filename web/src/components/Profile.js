import React, { useState } from "react";

const Profile = (props) => {
  const [name, setName] = useState(props.userName || "");
  const [email, setEmail] = useState(props.userEmail || "");
  const [password, setPassword] = useState(props.userPassword || "");

  // events

  const handleName = (ev) => {
    setName(ev.target.value);
  };

  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };

  const handlePassword = (ev) => {
    setPassword(ev.target.value);
  };

  const handleForm = (ev) => {
    ev.preventDefault();
    const userId = localStorage.getItem("userId");
    // enviamos los datos a App y este al API
    props.sendProfileToApi(userId, {
      name: name,
      email: email,
      password: password,
    });
  };

  // render

  return (
    <section>
      <h1 className="title">Mi perfil</h1>
      <form className="formLogin" onSubmit={handleForm}>
        <label className="formLogin__label" htmlFor="name">
          Mi nombre
        </label>
        <input
          className="formLogin__input"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
        />

        <label className="formLogin__label" htmlFor="email">
          Mi email
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
          Mi contraseña
        </label>
        <input
          className="formLogin__input"
          type="text"
          name="password"
          id="password"
          value={password}
          onChange={handlePassword}
        />

        <input
          className="button"
          type="submit"
          value="Guardar"
        />
      </form>
    </section>
  );
};

export default Profile;
