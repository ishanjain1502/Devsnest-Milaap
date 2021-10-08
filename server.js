const express = require('express');
require('dotenv').config({path: './config/config.env'});
const PORT = process.env.PORT || 8100;

//Routes
const userRouter = require('./routes/users');

const app = express();
//body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', userRouter);


app.listen(PORT, () => {
  console.log(`Listening at PORT:${PORT}`);
});