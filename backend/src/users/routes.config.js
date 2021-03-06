const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const PermissionMiddleware = require('../common/middlewares/permission.middleware');
const UsersController = require('./controllers/users.controller');

module.exports = function (app) {
  app.post('/api/register', [
    UsersController.insert(true)
  ]);

  app.post('/api/users', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PermissionMiddleware.permissionLevels.USER_MANAGER),
    UsersController.insert(false)
  ]);

  app.get('/api/users', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PermissionMiddleware.permissionLevels.USER_MANAGER),
    UsersController.list
  ]);

  app.patch('/api/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PermissionMiddleware.permissionLevels.USER_MANAGER),
    UsersController.patchById
  ]);

  app.get('/api/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PermissionMiddleware.permissionLevels.USER_MANAGER),
    UsersController.getById
  ]);
  
  app.delete('/api/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PermissionMiddleware.permissionLevels.USER_MANAGER),
    PermissionMiddleware.onlyAdminOrUserManagerForNonAdminCanDoThisAction,
    UsersController.removeById
  ]);

  app.get('/api/myuser', [
    ValidationMiddleware.validJWTNeeded,
    UsersController.getById
  ]);

  app.patch('/api/myuser', [
    ValidationMiddleware.validJWTNeeded,
    UsersController.patchById
  ]);

  app.delete('/api/myuser', [
    ValidationMiddleware.validJWTNeeded,
    UsersController.removeMyUser
  ]);
}