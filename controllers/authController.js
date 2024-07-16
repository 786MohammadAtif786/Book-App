const jwt = require('jsonwebtoken');
const User = require('../models/User');
const response = require("../utils/response");

const register = async (req, res) => {
 try {
  const { email, password, role, preferredLanguage } = req.body;
  if(!email || !password || !role) {
    return response(res, false, null, 'All Fields a required.', 400);
  }
  const user = new User({ email, password, role, preferredLanguage });
  await user.save();
  return response(res, true, user, 'User Created SuccessFully', 201);
 } catch(err) {
    if(err.code == 1100) {
      return response(res, false, null, 'User is Already Exists', 400);
    }
    return response(res, false, null, 'Internal server error', 500);
 }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return response(res, false, null, 'Email or Password are Required.', 400);
    }
    const user = await User.findOne({ email });
    if(!user) {
      return response(res, false, null, 'Email are not exits.', 400);
    }
    if (!user || !(await user.comparePassword(password))) {
      return response(res, false, null, 'Invalid credentials.', 400);
    }
    user.password = undefined;
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const userObj = user.toObject();
    userObj.token = token;
    return response(res, true, userObj, 'User Login SuccessFully', 200);
  } catch(err) {
    return response(res, false, null, 'Internal server error', 500);
  }
};

module.exports = { register, login };
