const mongoose = require('mongoose');
const MealSchema = require('../../meals/models/meals.model').MealSchema;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: String,
  permissionLevel: {
    type: Number,
    required: true,
    default: 1
  },
  expectedNumberOfCalories: {
    type: Number,
    default: 2000
  },
  meals: [MealSchema]
});

const User = mongoose.model('Users', userSchema);
exports.User = User;

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save().catch(err => {
    console.log(err);
  });
};

exports.findById = (id) => {
  return User.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    delete result.meals;
    result.id = id;
    return result;
  });
};

exports.findByEmail = (email) => {
  return User.findOne({ email: email })
    .then((result) => {
      result = result.toJSON();
      result.id = result._id;
      delete result._id;
      delete result.__v;
      delete result.meals;
      return result;
    })
    .catch((err) => {
      return err;
    })
};

exports.patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, function (err, user) {
      if (err) reject(err);
      for (let i in userData) {
        user[i] = userData[i];
      }
      user.save(function (err, updatedUser) {
        if (err) return reject(err);
        resolve(updatedUser);
      });
    });
  })
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      })
  });
};

exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
    User.remove({ _id: userId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
