const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const PermissionMiddleware = require('../common/middlewares/permission.middleware');
const MealsController = require('./controllers/meals.controller');

module.exports = function (app) {
  app.post('/users/:userId/meals', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    MealsController.insert
  ]);

  app.get('/users/:userId/meals', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    MealsController.list
  ]);

  app.patch('/users/:userId/meals/:mealId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    MealsController.patchById
  ]);

  app.delete('/users/:userId/meals/:mealId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    MealsController.removeById
  ]);
}