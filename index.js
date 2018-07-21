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

app.use(require('./route/company-route.js'));
app.use(require('./route/campaign-route.js'));
app.use(require('./route/foundation-route.js'));
app.use(require('./route/user-route.js'));
app.all('/api/*', (req, res, next) => res.sendStatus(404));

app.listen(PORT);
console.log(`Listening from ${ PORT }`)

