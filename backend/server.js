const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbSettings = require('./db.settings');

const app = express();

app.use(bodyParser.json());

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
