const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dbSettings = require('./db.settings');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(dbSettings.dbUrl, (err, client) => {
  if (err) return console.log(err);

  var db = client.db('toptal-interview');
  
  app.listen(3000, function() {

  });
  
  // API
  app.get('/', (req, res) => {
    
  });

  app.post('/meals', (req, res) => {
    
  });  
})  

