// routes/userRouter.js
const express = require('express');
const router = express.Router();
const User = require('../controllers/Usercontroller');
const { validateUserSignUp, userValidation } = require('../middlewares/validator/User');
const { isAuth } = require('../middlewares/auth');
  
router.post('/create-user',validateUserSignUp,userValidation ,User.createUser);
router.post('/sign-in',User.userSignIn ,User.userSignIn);
router.post('create-post',isAuth,(req,res)=>{
    res.send('welcome to the application')
})
module.exports = router;
