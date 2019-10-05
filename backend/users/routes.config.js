const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const PermissionMiddleware = require('../common/middlewares/permission.middleware');
const UsersController = require('./controllers/users.controller');

module.exports = function (app) {
  app.post('/users', [
    UsersController.insert
  ]);

  app.get('/users', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PermissionMiddleware.permissionLevels.USER_MANAGER),
    UsersController.list
  ]);

  app.patch('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PermissionMiddleware.permissionLevels.USER_MANAGER),
    UsersController.patchById
  ]);

  app.get('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PermissionMiddleware.permissionLevels.USER),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UsersController.getById
  ]);

  app.delete('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PermissionMiddleware.permissionLevels.USER_MANAGER),
    UsersController.removeById
  ]);
}