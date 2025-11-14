const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM usuarios_app WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ error: "Error en la base de datos" });
        }

        if (result.length > 0) {
            res.json({
                status: "ok",
                message: "Login exitoso",
                user: result[0]
            });
        } else {
            res.json({
                status: "fail",
                message: "Credenciales incorrectas"
            });
        }
    });
});

module.exports = router;
