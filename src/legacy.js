const express = require('express');
const mysql = require('mysql2');

const router = express.Router();
const pool = mysql.createPool({ host: 'db', user: 'app', database: 'shop' });

// PRE-EXISTING vulnerability. This file is untouched by the PR, so the delta
// gate must suppress any finding reported here.
router.get('/customer', (req, res) => {
  const email = req.query.email;
  const sql = "SELECT id, name, email FROM customers WHERE email = '" + email + "'";
  pool.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: 'lookup failed' });
    res.json(rows);
  });
});

module.exports = router;
