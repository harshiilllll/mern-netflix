const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profilePic: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" },
  isAdmin: { type: Boolean, default: false },
  fromGoogle: { type: Boolean, default: false },
}, {timestamps: true});


module.exports = mongoose.model("User", UserSchema);

