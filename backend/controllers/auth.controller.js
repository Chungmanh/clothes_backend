const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const secretkey = require("../_config/JWT_ACCESS_KEY");
const refreshtkey = require("../_config/JWT_REFRESH_TOKEN");

exports.registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      admin: user.admin,
    },
    secretkey,
    { expiresIn: "30s" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      admin: user.admin,
    },
    refreshtkey,
    { expiresIn: "30s" }
  );
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.body.username },
      {},
      { lean: true }
    );
    if (!user) {
      res.status(404).json("wrong username");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res.status(404).json("wrong password");
    }

    delete user.password;

    if (user && validPassword) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      const cookies = cookie.serialize("refreshToken", refreshToken, {
        httpOnly: true,
      });

      // console.log(cookie.parse(cookies));
      res.setHeader("Set-Cookie", cookies);
      res.status(200).json({ ...user, accessToken });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
