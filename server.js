const express = require('express');
const legacy = require('./src/legacy');

const app = express();
app.use(express.json());
app.use('/legacy', legacy);

app.listen(process.env.PORT || 3000);
module.exports = app;
