const express = require('express');
const legacy = require('./src/legacy');
const orders = require('./src/orders');

const app = express();
app.use(express.json());
app.use('/legacy', legacy);
app.use('/api', orders);

app.listen(process.env.PORT || 3000);
module.exports = app;
