const User = require("../modals/user");

exports.newUser = async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    user,
  });
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
};

exports.getSingleUsers = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    user,
  });
};

exports.updateUser = async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
};

exports.deleteUser = async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User got Deleted",
  });
};
