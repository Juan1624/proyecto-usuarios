import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  // Obtener usuarios
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/usuarios");
      setUsers(res.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  // Cargar lista al montar el componente
  useEffect(() => {
    getUsers();
  }, []);

  // Eliminar usuario
  const deleteUser = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      try {
        await axios.delete(`http://localhost:5001/api/usuarios/${id}`);
        getUsers(); // refrescar la lista
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  return (
    <div className="list-container">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
        <h2>Lista de Usuarios</h2>
        <Link to="/create">
          <button style={{ backgroundColor: "#007bff", color: "white", padding: "8px 15px", border: "none", borderRadius: "5px" }}>
            Nuevo Usuario
          </button>
        </Link>
      </div>

      <table border="1" cellPadding="8" width="100%">
        <thead style={{ backgroundColor: "#007bff", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.telefono}</td>
                <td>
                  <Link to={`/edit/${u.id}`}>
                    <button
                      style={{
                        marginRight: "5px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Editar
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteUser(u.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
