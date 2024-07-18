// controllers/userController.js
const User = require('../Models/User');
const jwt=require('jsonwebtoken')
exports.createUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const isNewUser = await User.isThisEmailInUse(email);
    if (!isNewUser) {
      return res.status(400).json({
        success: false,
        message: 'This email is already in use'
      });
    }

    const user = new User({
      fullname,
      email,
      password
      
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      success: false,
      message: 'user not found, with the given email!',
    });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.json({
      success: false,
      message: 'email / password does not match!',
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ success: true, user: user, token });
};
