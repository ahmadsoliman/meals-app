const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const dbSettings = require('./db.settings');

const app = express();

app.use(bodyParser.json());

app.use(cors());

mongoose.connect(dbSettings.dbUrl, { useNewUrlParser: true }).then(db => {
  console.log('mongoose connected');

  app.listen(3000, function () {

  });

  require('./src/users/routes.config')(app);
  require('./src/auth/routes.config')(app);
  require('./src/meals/routes.config')(app);

}).catch(error => {
  console.log(error)
});
