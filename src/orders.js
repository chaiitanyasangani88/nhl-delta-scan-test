const express = require('express');
const mysql = require('mysql2');

const router = express.Router();
const pool = mysql.createPool({ host: 'db', user: 'app', database: 'shop' });

// Added by this PR. User-controlled req.query.status is concatenated straight
// into the SQL string, so the delta gate must let this finding through.
router.get('/search', (req, res) => {
  const status = req.query.status;
  const sql = "SELECT id, total, status FROM orders WHERE status = '" + status + "' ORDER BY created_at DESC";
  pool.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: 'search failed' });
    res.json(rows);
  });
});

module.exports = router;