const UserModel = require("./../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const appConfig = require("./../config/appConfig");
const { registerValidation } = require("../libs/validation");
const { loginValidation } = require("../libs/validation");
// const validation = require("./../libs/validation");
let response = require("./../libs/responseLib");

let registerUser = async (req, res) => {
  //validate user
  const { error } = registerValidation(req.body);
  if (error) {
    let apiResponse = response.generate(
      true,
      error.details[0].message,
      400,
      null
    );
    return res.send(apiResponse);
  }

  //check if user already exists
  const emailExists = await UserModel.findOne({ email: req.body.email });
  if (emailExists) {
    let apiResponse = response.generate(
      true,
      "Email already present",
      400,
      null
    );
    return res.send(apiResponse);
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const newUser = new UserModel({
      email: req.body.email,
      password: hashPassword
    });
    try {
      const savedUser = await newUser.save();
      let apiResponse = response.generate(
        false,
        "User registered successfully",
        201,
        savedUser
      );
      res.send(apiResponse);
    } catch (err) {
      console.log(err);
      let apiResponse = response.generate(true, err.message, 500, null);
      res.send(apiResponse);
    }
  }
};

let signinUser = async (req, res) => {
  //validate user
  const { error } = loginValidation(req.body);
  if (error) {
    let apiResponse = response.generate(
      true,
      error.details[0].message,
      400,
      null
    );
    return res.send(apiResponse);
  }
  //check if user exists
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      let apiResponse = response.generate(
        true,
        "Email or password invalid",
        400,
        null
      );
      return res.send(apiResponse);
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      let apiResponse = response.generate(true, "Inavlid password", 400, null);
      return res.send(apiResponse);
    }
    let apiResponse = response.generate(false, "Logged in", 200, user);
    const token = jwt.sign({ _id: user._id }, appConfig.secretKey);
    res.setHeader("auth-token", token);
    res.send(apiResponse);
  } catch (err) {
    console.log(err);
    let apiResponse = response.generate(true, err.message, 500, null);
    res.send(apiResponse);
  }
};

module.exports = {
  registerUser: registerUser,
  signinUser: signinUser
};
