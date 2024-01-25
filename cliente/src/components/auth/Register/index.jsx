import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../Modal";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/users/register", credentials);
      console.log(response.data.status);
      if (response.data.status === "ok") {
        setShowModal(true);
        setCredentials({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/auth/login");
  };

  return (
    <>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="">
          Usuario
          <input
            type="text"
            name="username"
            value={credentials.username}
            placeholder="Ingresa usuario"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Correo
          <input
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Ingresa email"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Contraseña
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Ingresa contraseña"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Ingresar</button>
      </form>
      {showModal && (
        <Modal onClose={handleModalClose}>
          <p>
            {" "}
            Usuario registrado exitosamente...!! Por favor activa tu cuenta a
            través del email que te hemos enviado.
          </p>
          <button onClick={handleModalClose}>Ok</button>
        </Modal>
      )}
    </>
  );
};

export default Register;
