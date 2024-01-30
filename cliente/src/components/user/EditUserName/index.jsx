import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Auth from "../../../utils/auth";
import axios from "axios";
import "./EditUserName.css";

function EditUserName() {
  const { user, updateUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [newUsername, setNewUsername] = useState("");

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("valor reemplazado:", username);
    setNewUsername("");

    const token = Auth.getToken();

    const formData = new FormData();
    formData.append("userId", user.id_user);
    formData.append("username", username);

    try {
      const response = await axios.put("/api/users/update", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log(response.data.status);
      if (response.data.status === "ok") {
        updateUser({ ...user, username: username });
        console.log("Nombre de usuario actualizado con éxito");
        setNewUsername("Nombre de usuario actualizado con éxito");
      } else {
        console.error("Error al actualizar el nombre de usuario");
      }
    } catch (error) {
      // console.log(userId);
      console.error("Error en la solicitud API:", error);
    }
  };

  return (
    <div className="edit-name-form">
      <form onSubmit={handleSubmit}>
        <div className="label-container">
          <label htmlFor="name">Editar usuario</label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={handleNameChange}
            className="name-input"
          />
        </div>
        {newUsername && <p>{newUsername}</p>}
        <button type="submit" className="save-button">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditUserName;
