const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    typeAccount: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    // avatarURL: {
    //     type: String,
    //     required: true

    // }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Account", AccountSchema);
