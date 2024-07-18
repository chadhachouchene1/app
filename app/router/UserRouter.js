// routes/userRouter.js
const express = require('express');
const router = express.Router();
const User = require('../controllers/Usercontroller');
const { validateUserSignUp, userValidation } = require('../middlewares/validator/User');
  
router.post('/create-user',validateUserSignUp,userValidation ,User.createUser);
router.post('/sign-in',User.userSignIn ,User.userSignIn);
module.exports = router;
