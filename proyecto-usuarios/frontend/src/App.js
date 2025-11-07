import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import UserList from "./components/UserList";
import UseForm from "./components/UseForm";
import "./App.css";

// 🔹 Pantalla de Login (sin Tailwind)
function LoginScreen({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email === "admin@correo.com" && password === "1234") {
      const user = { nombre: "Administrador", email, rol: "admin" };
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
      navigate("/");
    } else if (email === "usuario@correo.com" && password === "1234") {
      const user = { nombre: "Usuario", email, rol: "usuario" };
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);
      navigate("/");
    } else {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <label>Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit">Entrar</button>
        </form>
        <div className="hint">
          <p><strong>Admin:</strong> admin@correo.com / 1234</p>
          <p><strong>Usuario:</strong> usuario@correo.com / 1234</p>
        </div>
      </div>
    </div>
  );
}

// 🔹 App principal
function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<LoginScreen onLogin={setUser} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="container">
        <div className="header">
          <h2>Bienvenido, {user.nombre}</h2>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create" element={<UseForm />} />
          <Route path="/edit/:id" element={<UseForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
