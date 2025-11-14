const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/login", (req, res) => {
    const { usuario, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE usuario = ? AND password = ?";
    db.query(sql, [usuario, password], (err, result) => {
        if (err) return res.json({ error: err });

        if (result.length > 0) {
            res.json({ status: "ok", message: "Login exitoso" });
        } else {
            res.json({ status: "fail", message: "Credenciales incorrectas" });
        }
    });
});

module.exports = router;
