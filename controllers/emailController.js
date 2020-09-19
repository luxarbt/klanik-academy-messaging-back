const Token = require("../models/tokenModel");
const User = require("../models/userModel");

exports.confirmEmail = async function (req, res, next) {
  const token = await Token.findOne({ token: req.params.token });
  // token is not found into database i.e. token may have expired
  if (!token) {
    return res.status(400).send({
      msg:
        "Your verification link may have expired. Please click on resend for verify your Email.",
    });
  }
  // if token is found then check valid user

  const user = await User.findOne({
    _id: token._userId,
    email: req.params.email,
  });
  // not valid user
  if (!user) {
    return res.status(401).send({
      msg:
        "We were unable to find a user for this verification. Please SignUp!",
    });
  }
  // user is already verified
  if (user.isVerified) {
    return res.status(200).json("User has been already verified. Please Login");
  }
  // verify user

  // change isVerified to true
  user.isVerified = true;
  const updatedUser = user.save();
  return res.status(200).json(updatedUser);
};
