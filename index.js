const app = require('express')();
const mongoose = require('mongoose');
// This dependecy loads all files in one specific directory
const requireDir = require('require-dir');
const bodyParser = require('body-parser');
// const Raven = require('./app/services/sentry');
const dbConfig = require('./config/database');

mongoose.connect(dbConfig.url);
mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${dbConfig.url}`);
});

requireDir(dbConfig.modelsPath);

app.use(bodyParser.json());
// app.use(Raven.requestHandler);
app.use('/api', require('./app/routes'));
// app.use(Raven.errorHandler);

app.listen('3000', () => {
  console.log('App listening on port 3000');
});

module.exports = app;
