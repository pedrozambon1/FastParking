const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const connection = require('../config/config-database'); // Importe a configuração do banco de dados

// Rota para inserir um novo cliente
router.post('/inserir', (req, res) => {
  // ... código para inserir um cliente ...
});

// Rota para obter informações de um cliente por ID
router.get('/:id', (req, res) => {
  // ... código para obter informações de um cliente ...
});

// Mais rotas relacionadas aos clientes...

module.exports = router;
