const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const PermissionMiddleware = require('../common/middlewares/permission.middleware');
const MealsController = require('./controllers/meals.controller');

module.exports = function (app) {
  app.post('/api/users/:userId/meals', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    MealsController.insert
  ]);

  app.get('/api/users/:userId/meals', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    MealsController.list
  ]);

  app.patch('/api/users/:userId/meals/:mealId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    MealsController.patchById
  ]);

  app.delete('/api/users/:userId/meals/:mealId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    MealsController.removeById
  ]);
}