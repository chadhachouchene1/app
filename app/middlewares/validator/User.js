const { check, validationResult } = require("express-validator");

exports.validateUserSignUp = [
    check('fullname')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is required!')
    .isString()
    .withMessage('Must be a valid name!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Name must be within 3 to 20 character!'),
  check('email')
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email!'),
  
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is empty')

    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be within 8 to 20 characters'),
  
  check('confirmpassword')
    .trim()
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

exports.userValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg
    });
  }
  next();
}

exports.validateUserSignIn = [
    check('email').trim().isEmail().withMessage('email / password is required!'),
    check('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('email / password is required!'),
  ];
