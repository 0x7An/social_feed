const app = require('express')();
const mongoose = require('mongoose');
// This dependecy loads all files in one specific directory
const requireDir = require('require-dir');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database');

mongoose.connect(dbConfig.url);
requireDir(dbConfig.modelsPath);

app.use(bodyParser.json());

app.use('/api', require('./app/routes'));

app.listen('3000');

