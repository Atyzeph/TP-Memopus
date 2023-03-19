import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchConnexion } from "../services/memoServices";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Version 6 de router oblige d'utiliser navigate
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await fetchConnexion(username, password);
      // On redirige ici
      navigate("/memo");
    } catch (error) {
      console.error(error.message);
      setErrorMessage("Identifiant ou mot de passe incorrect")
    }
  };

  return (
    <div>
      <h2 className="text-center">Page de connexion</h2>
      <form
        className="m-5 d-flex justify-content-center gap-3 align-items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Connexion
        </button>  
      </form>
      {errorMessage && <div className="text-center alert alert-danger"><p>{errorMessage}</p></div>}
    </div>
  );
}

export default LoginPage;
