const router = require("express").Router();
const User = require("./users-model");
const bcrypt = require("bcryptjs");

const { validateUser, usernameIsUnique } = require("./auth-middleware");

router.post(
  "/register",
  validateUser,
  usernameIsUnique,
  async (req, res, next) => {
    try {
      const user = req.user;
      const hash = bcrypt.hashSync(user.password, 12);
      user.password = hash;
      let result = await User.add(user);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
