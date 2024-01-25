import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./EditUserName.css";

function EditUserName() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user.username);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div className="edit-name-form">
      <form onSubmit={handleSubmit}>
        <div className="label-container">
          <label htmlFor="name">Editar usuario</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="name-input"
          />
        </div>
        <button type="submit" className="save-button">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditUserName;
