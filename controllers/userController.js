const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const UserService = require("../services/userService");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");

exports.registerUser = async function (req, res, next) {
  try {
    const { email, password, passwordCheck, name, surname } = req.body;

    // validate

    if (!email || !password || !passwordCheck || !name || !surname)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    const savedUser = await UserService.registerUser(
      email,
      password,
      name,
      surname
    );

    const token = new Token({
      _userId: savedUser._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    token.save();

    const transporter = nodemailer.createTransport({
      service: "Sendgrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });

    const mailOptions = {
      from: "alexisribot10@gmail.com",
      to: savedUser.email,
      subject: "Account Verification Link",
      text:
        `Hello ${req.body.name},\n\n` +
        `Please verify your account by clicking the link: \nhttp://${req.headers.host}/confirmation/${savedUser.email}/${token.token}\n\nThank You!\n`,
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          msg:
            "Technical Issue!, Please click on resend for verify your Email.",
        });
      }
      return res.status(200).json({
        msg: `A verification email has been sent to ${savedUser.email}. It will be expire after one day. If you not get verification Email click on resend token.`,
      });
    });

    // return res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    if (!user.isVerified)
      return res.status(401).json({ msg: "Account not verified" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.tokenIsValid = async function (req, res, next) {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async function (req, res, next) {
  try {
    const user = await UserService.getUser(req.user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserData = async function (req, res, next) {
  try {
    const user = await UserService.getUser(req.query.user);
    res.json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async function (req, res, next) {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
