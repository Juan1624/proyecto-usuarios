const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Listar usuarios
router.get('/', (req, res) => {
  db.query('SELECT * FROM usuarios ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear usuario
router.post('/', (req, res) => {
  const { nombre, email, telefono } = req.body;
  db.query('INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)', 
    [nombre, email, telefono], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Usuario creado correctamente', id: result.insertId });
    });
});

// Actualizar usuario
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;
  db.query('UPDATE usuarios SET nombre=?, email=?, telefono=? WHERE id=?', 
    [nombre, email, telefono, id], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Usuario actualizado correctamente' });
    });
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;
