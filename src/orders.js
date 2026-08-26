const express = require('express');
const mysql = require('mysql2');

const router = express.Router();
const pool = mysql.createPool({ host: 'db', user: 'app', database: 'shop' });

// NEW in this PR: an order lookup endpoint.
//
// The `ref` query parameter is concatenated straight into the SQL, so a caller
// controls the statement. This is the finding the PR scan must report, and the
// only one — the identical issue in src/legacy.js is untouched by this change
// and belongs to the scheduled scan, not to this pull request.
router.get('/orders/by-reference', (req, res) => {
  const ref = req.query.ref;
  const sql = "SELECT id, total, status FROM orders WHERE reference = '" + ref + "'";
  pool.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: 'lookup failed' });
    res.json(rows);
  });
});

module.exports = router;
