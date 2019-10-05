const mongoose = require('mongoose');
const UserModel = require('../../users/models/users.model');

const mealSchema = new mongoose.Schema({
  text: String,
  date: Date,
  time: Date,
  calories: Number
});
exports.MealSchema = mealSchema;

const MealModel = mongoose.model('Meals', mealSchema);
exports.MealModel = MealModel;

exports.createMeal = (userId, mealData) => {
  const meal = new MealModel(mealData);
  return UserModel.User.findById(userId).then((user) => {
    user.meals.push(meal);
    return user.save().then(() => {
      return meal;
    });
  });
};

exports.list = (userId, perPage, page) => {
  return UserModel.User.findById(userId).then((result) => {
    const mealsPage = result.meals.slice(perPage * page, perPage * page + perPage);
    return mealsPage;
  });
};

exports.patchMeal = (userId, mealId, mealData) => {
  return new Promise((resolve, reject) => {
    UserModel.User.findById(userId).then((user) => {
      const meal = user.meals.find(meal => meal._id === mealId);
      if (!meal) reject('Meal not found!');
      
      for (let i in mealData) {
        meal[i] = mealData[i];
      }
      user.save(function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  })
};

exports.removeById = (userId, mealId) => {
  return new Promise((resolve, reject) => {
    UserModel.User.findById(userId).then((user) => {
      const mealIndex = user.meals.findIndex(meal => meal._id === mealId);
      if (mealIndex === -1) reject('Meal not found!');

      user.meals.splice(mealIndex, 1);
      user.save(function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  });
};