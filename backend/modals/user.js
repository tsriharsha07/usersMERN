const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter First Name"],
    trim: true,
    maxlength: [50, "First Name cannot exceed 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter Last Name"],
    trim: true,
    maxlength: [50, "Last Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter Email ID"],
  },
  mobile: {
    type: String,
    required: [true, "Please enter Mobile Number"],
    maxlength: [13, "First Name cannot exceed 50 characters"],
  },
  address1: {
    type: String,
    required: [true, "Please enter Address"],
    minlength: [2, "Address should contain atleast 2 characters"],
  },
  address2: {
    type: String,
  },
  state: {
    type: String,
    required: [true, "Please enter State"],
  },
  country: {
    type: String,
    required: [true, "Please enter country"],
  },
  zipCode: {
    type: Number,
    required: [true, "please enter pincode"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
