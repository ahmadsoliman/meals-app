const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dbSettings = require('./db.settings');

const app = express();

app.use(bodyParser.json());

MongoClient.connect(dbSettings.dbUrl, (err, client) => {
  if (err) return console.log(err);

  var db = client.db('toptal-interview');
  
  app.listen(3000, function() {

  });
  
  // API
  app.get('/api/meals', (req, res) => {
    db.collection('meals').find().toArray(function(err, results) {
      res.json(results);
    });

  });

  app.post('/api/meals', (req, res) => {
    console.log(req.body, 'body');
    db.collection('meals').save(req.body, (err, result) => {
      if (err) return console.log(err);
  
      console.log(result.ops[0], 'saved to database');
      res.status(200).send(result.ops[0]._id);
    })
  })
})  

