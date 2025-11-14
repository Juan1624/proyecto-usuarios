const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => {
    db.query("SELECT * FROM usuarios", (err, result) => {
        if (err) return res.json({ error: err });
        res.json(result);
    });
});

router.post("/", (req, res) => {
    const { usuario, password } = req.body;

    db.query(
        "INSERT INTO usuarios (usuario, password) VALUES (?,?)",
        [usuario, password],
        (err) => {
            if (err) return res.json({ error: err });
            res.json({ status: "ok" });
        }
    );
});

module.exports = router;
