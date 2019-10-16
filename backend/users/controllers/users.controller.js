const UserModel = require('../models/users.model');
const crypto = require('crypto');

exports.insert = (isRegister) => (req, res) => {
  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512', salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  if(isRegister) {
    req.body.permissionLevel = 1;
  }
  UserModel.createUser(req.body, 'body')
    .then((result) => {
      res.status(201).send({ id: result._id });
    });
};

exports.getById = (req, res) => {
  let userId = '';
  if (req.params['userId'] && req.params['userId'].length) {
    userId = req.params['userId'];
  } else if (req.jwt.userId) {
    userId = req.jwt.userId;
  }
  UserModel.findById(userId).then((result) => {
    res.status(200).send(result);
  }).catch(err => {
    res.status(404).send('User doesnt exist!');
  });
};

exports.patchById = (req, res) => {
  let userId = '';
  if (req.params['userId'] && req.params['userId'].length) {
    userId = req.params['userId'];
  } else if (req.jwt.userId) {
    userId = req.jwt.userId;
  }
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
  }
  UserModel.patchUser(userId, req.body).then((result) => {
    res.status(204).send({});
  });
};

exports.list = (req, res) => {
  let take = req.query.take && req.query.take <= 100 && req.query.take > 0 ? parseInt(req.query.take) : 10;
  let skip = 0;
  if (req.query) {
    if (req.query.skip) {
      req.query.skip = parseInt(req.query.skip);
      skip = Number.isInteger(req.query.skip) ? req.query.skip : 0;
    }
  }
  UserModel.list(take, skip, req.jwt.userId, req.jwt.permissionLevel).then((result) => {
    res.status(200).send(result);
  });
};

exports.removeById = (req, res) => {
  UserModel.removeById(req.params.userId)
    .then((result) => {
      res.status(204).send({});
    });
};