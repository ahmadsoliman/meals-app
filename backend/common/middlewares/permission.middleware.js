const permissionLevels = {
  ADMIN: 4,
  USER_MANAGER: 2,
  USER: 1
};
exports.permissionLevels = permissionLevels;

exports.minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel);
    // let userId = req.jwt.userId;

    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
  let user_permission_level = parseInt(req.jwt.permissionLevel);
  let userId = req.jwt.userId;

  if ((user_permission_level & permissionLevels.ADMIN) || (req.params && req.params.userId && userId === req.params.userId)) {
    return next();
  } else {
    return res.status(403).send();
  }
};

exports.sameUserCantDoThisAction = (req, res, next) => {
  let userId = req.jwt.userId;

  if (req.params.userId !== userId) {
    return next();
  } else {
    return res.status(400).send();
  }

};