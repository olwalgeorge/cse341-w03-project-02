const express = require('express');
const router = express.Router();
const passport = require('../config/passport.js');
const localAuthController = require('../controllers/auth.controller.js');
const { userCreateValidationRules } = require('../validators/auth.validator.js');
const validate = require('../middlewares/validation.middleware.js');
const isAuthenticated = require('../middlewares/auth.middleware.js');


router.post(
  '/register',
  validate(userCreateValidationRules()),
  localAuthController.register
);

router.post(
  '/login',
  passport.authenticate('local'),
  localAuthController.loginSuccess
);

router.post(
  '/logout',
  isAuthenticated,
  localAuthController.logout
);

module.exports = router;
