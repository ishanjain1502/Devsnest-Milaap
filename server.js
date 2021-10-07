const express = require('express');
require('dotenv').config({path: './config/config.env'});
const app = express();
const PORT = process.env.PORT || 8100;

const sequelize = require('./database/initializeDatabase');

app.listen(PORT, () => {
  console.log(`Listening at PORT:${PORT}`);
});