import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Obtener datos del usuario al editar
  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/usuarios/${id}`);
      setForm({
        nombre: res.data.nombre,
        email: res.data.email,
        telefono: res.data.telefono,
      });
    } catch (error) {
      console.error("Error al cargar usuario:", error);
    }
  };

  // Cargar usuario si estamos en modo edición
  useEffect(() => {
    if (id) getUser();
  }, [id]);

  // Guardar o actualizar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`http://localhost:5001/api/usuarios/${id}`, form);
        alert("Usuario actualizado correctamente");
      } else {
        await axios.post("http://localhost:5001/api/usuarios", form);
        alert("Usuario creado correctamente");
      }
      navigate("/");
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>{id ? "Editar Usuario" : "Nuevo Usuario"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "8px 15px",
              cursor: "pointer",
            }}
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "8px 15px",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
