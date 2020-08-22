const UserService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

        const savedUser = await UserService.registerUser(email, password, name, surname);
        return res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

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
}

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
}

exports.getUser = async function (req, res, next) {
    try {
        const user = await UserService.getUser(req.user);
        res.json(user);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

exports.getUserData = async function (req, res, next) {
    try  {
        const user = await UserService.getUser(req.query.user);
        res.json({
          _id: user._id,
          name: user.name,
          surname: user.surname,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAllUsers = async function (req, res, next) {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}