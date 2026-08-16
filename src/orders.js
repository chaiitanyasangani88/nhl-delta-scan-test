const express = require('express');
const mysql = require('mysql2');

const router = express.Router();
const pool = mysql.createPool({ host: 'db', user: 'app', database: 'shop' });

// NEW in this PR — the delta gate must report this one.
router.get('/search', (req, res) => {
  const term = req.query.term;
  const sql = "SELECT id, total FROM orders WHERE reference LIKE '%" + term + "%'";
  pool.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: 'search failed' });
    res.json(rows);
  });
});

module.exports = router;
