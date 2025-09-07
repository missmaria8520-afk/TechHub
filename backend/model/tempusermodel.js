const mongoose = require("mongoose");

const TempUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Customer"], required: true },
  otp: { type: String, required: true },
  otpExpires: { type: Date, required: true },
});

module.exports = mongoose.model("TempUser", TempUserSchema);
