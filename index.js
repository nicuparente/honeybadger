const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Load ENV variables
require('dotenv').config({path: `${__dirname}/.env`});


const app = express();
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);
const PORT = process.env.PORT || 3000;

//Load Middleware
app.use(morgan('dev'));
app.use(cors());

app.all('/api/*', (req, res, next) => res.sendStatus(404));

app.listen(PORT);
console.log(`Listening from ${ PORT }`)

