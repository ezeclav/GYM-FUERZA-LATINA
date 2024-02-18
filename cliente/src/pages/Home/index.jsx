import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./Home.css";

function Home() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className="sesion">
      {isAuthenticated && user ? (
        <>
          <h2 className="GymFont"> ¡BIENVENIDO {user.username} !</h2>
        </>
      ) : (
        <>
          <div>
            <h2 className="GymFont2">GIMNASIOS FUERZA LATINA</h2>
            <h3>Ingresa a tu cuenta por favor</h3>
          </div>
        </>
      )}
    </div>
  );
}

//  <h3 className="GymFont2">Bienvenido: {user.username}</h3>

export default Home;
