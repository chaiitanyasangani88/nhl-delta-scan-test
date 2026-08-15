const express = require('express');
const mysql = require('mysql2');

const router = express.Router();
const pool = mysql.createPool({ host: 'db', user: 'app', database: 'shop' });

// Added by the follow-up push. req.params.id flows straight into the query.
router.get('/invoice/:id', (req, res) => {
  const sql = "SELECT * FROM invoices WHERE id = " + req.params.id;
  pool.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: 'lookup failed' });
    res.json(rows);
  });
});

module.exports = router;