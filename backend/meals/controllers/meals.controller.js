const MealModel = require('../models/meals.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
  MealModel.createMeal(req.params.userId, req.body)
    .then((result) => {
      res.status(201).send({ id: result._id });
    });
};

exports.patchById = (req, res) => {
  MealModel.patchMeal(req.params.mealId, req.body).then((result) => {
    res.status(204).send({});
  }).catch(err => {
    res.status(404).send('Meal doesnt exist!');
  });
};

exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  MealModel.list(req.params.userId, limit, page).then((result) => {
    res.status(200).send(result);
  })
};

exports.removeById = (req, res) => {
  MealModel.removeById(req.params.userId, req.params.mealId)
    .then((result) => {
      res.status(204).send({});
    }).catch(err => {
      res.status(404).send('Meal doesnt exist!');
    });
};