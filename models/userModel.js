const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  name: { type: String, required: true },
  surname: { type: String, required: true },
});

// eslint-disable-next-line no-undef
module.exports = User = mongoose.model("user", userSchema);
