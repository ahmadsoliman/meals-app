const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbSettings = require('./db.settings');

const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
  next();
});

mongoose.connect(dbSettings.dbUrl, { useNewUrlParser: true }).then(db => {
  console.log('mongoose connected');

  app.listen(3000, function () {

  });

  require('./users/routes.config')(app);
  require('./auth/routes.config')(app);
  require('./meals/routes.config')(app);

}).catch(error => {
  console.log(error)
});
