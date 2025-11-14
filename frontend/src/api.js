const API = "http://localhost:3000";

// ------- LOGIN -------
export const loginRequest = async (usuario, password) => {
    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password })
    });
    return res.json();
};

// ------- CRUD USUARIOS -------
export const obtenerUsuarios = async () => {
    const res = await fetch(`${API}/usuarios`);
    return res.json();
};

export const obtenerUsuario = async (id) => {
    const res = await fetch(`${API}/usuarios/${id}`);
    return res.json();
};

export const crearUsuario = async (data) => {
    const res = await fetch(`${API}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const actualizarUsuario = async (id, data) => {
    const res = await fetch(`${API}/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const eliminarUsuario = async (id) => {
    const res = await fetch(`${API}/usuarios/${id}`, {
        method: "DELETE",
    });
    return res.json();
};
