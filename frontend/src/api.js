const API = "http://localhost:3000/api/usuarios";

export const login = async (usuario, password) => {
    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ usuario, password })
    });
    return res.json();
};
