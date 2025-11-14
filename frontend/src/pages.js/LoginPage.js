import { useState } from "react";
import { login } from "../api";

export default function LoginPage() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleLogin = async () => {
        const res = await login(usuario, password);
        setMsg(res.message);

        if (res.status === "ok") {
            window.location.href = "/usuarios";
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input placeholder="Usuario" onChange={e => setUsuario(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Ingresar</button>
            <p>{msg}</p>
        </div>
    );
}
