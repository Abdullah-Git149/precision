const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is Invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlenght: 7,
    trim: true,
  },
});

module.exports = User;
