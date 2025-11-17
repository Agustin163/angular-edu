const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

module.exports = app;

