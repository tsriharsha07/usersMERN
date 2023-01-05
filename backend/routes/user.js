const express = require("express");
const router = express.Router();

const {
  newUser,
  getUsers,
  getSingleUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/users").get(getUsers);

router.route("/users/new").post(newUser);

router.route("/users/:id").get(getSingleUsers);

router.route("/userUpdate/:id").put(updateUser);

router.route("/userDelete/:id").delete(deleteUser);

module.exports = router;
