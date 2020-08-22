const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.registerUser = async function (email, password, name, surname) {
    try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            name,
            surname,
        });

        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        throw Error("Error when creating user : " + err);
    }
}

exports.getUser = async function (user) {
    try  {
        const usr = await User.findById(user);
        return usr;
    } catch (err) {
        throw Error("Error when getting user : " + err)
    }
}

exports.getAllUsers = async function () {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        throw Error("Error when getting all users" + err);
    }
}