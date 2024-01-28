import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated && user ? (
        <>
          <h3>{user.username}, Bienvenido a GIMNASIOS FUERZA LATINA 🏋️‍♂️🤸‍♂️</h3>
        </>
      ) : (
        <>
          <h2>GIMNASIOS FUERZA LATINA 🏋️‍♂️🤸‍♂️</h2>
          <h3>Ingresa a tu cuenta por favor</h3>
        </>
      )}
    </div>
  );
}

export default Home;