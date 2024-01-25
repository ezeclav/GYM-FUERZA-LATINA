import { useState } from "react";
import axios from "axios";
import Modal from "../../Modal";
import "./PassRecovery.css";

function PassRecovery({ handleModal }) {
  const [emailForReset, setEmailForReset] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/password/recover", { email: emailForReset });
      setResetMessage(
        "Se te ha enviado un email con las instrucciones para restablecer tu contraseña."
      );
    } catch (error) {
      console.error(
        "Error al enviar solicitud de restablecimiento de contraseña:",
        error
      );
      setResetMessage(
        "Error al enviar la solicitud. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <Modal>
      <div className="password-recovery-container">
        <form onSubmit={handlePasswordReset} className="password-recovery-form">
          <div>
            <label htmlFor="email-reset">
              Email para Restablecer Contraseña
              <input
                required
                type="email"
                id="email-reset"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                placeholder="Ingresa email"
              />
            </label>
          </div>
          <button type="submit">Enviar Solicitud</button>
          <button onClick={handleModal}>Cancelar</button>
          {resetMessage && (
            <>
              <p className="reset-message">{resetMessage}</p>
              <button onClick={handleModal}>OK</button>
            </>
          )}
        </form>
      </div>
    </Modal>
  );
}

export default PassRecovery;
