/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext.jsx";
import Modal from "../../Modal";
import Error from "../../Error";
import PassRecovery from "../../user/PassRecovery";

import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showPassRecovery, setshowPassRecovery] = useState(false);
  const [err, setErr] = useState(null);

  const { login } = useContext(AuthContext);

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
      const response = await axios.post("api/users/login", credentials);
      login(response.data.data.token);
    } catch (error) {
      setShowModal(true);
      setErr(error.response.data.message);
    }
  };

  const handleRecoveryPassModal = () => {
    setshowPassRecovery(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  console.log(err);
  return (
    <>
      <h2>Ingresar</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <a href="#" onClick={() => setshowPassRecovery(true)}>
          Olvidaste tu contraseña?
        </a>
      </form>
      {showPassRecovery && (
        <Modal onClick={handleRecoveryPassModal}>
          <PassRecovery handleModal={handleRecoveryPassModal} />
        </Modal>
      )}
      {showModal && (
        <Modal onClick={handleModalClose}>
          <Error errorMessage={err} closeModal={handleModalClose} />
        </Modal>
      )}
    </>
  );
};

export default Login;
