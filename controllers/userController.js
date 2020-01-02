const UserModel = require("./../models/User");
const AuthModel = require("./../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const appConfig = require("./../config/appConfig");
const { registerValidation } = require("../libs/validation");
const { loginValidation } = require("../libs/validation");
// const validation = require("./../libs/validation");
let response = require("./../libs/responseLib");
const mongoose = require("mongoose");

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
      _id: new mongoose.Types.ObjectId(),
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
    let user = await UserModel.findOne({ email: req.body.email });
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
      let apiResponse = response.generate(true, "Invalid password", 400, null);
      return res.send(apiResponse);
    }
    //remove password property from the output
    user.password = undefined;
    const token = jwt.sign({ userInfo: user }, appConfig.secretKey);
    user.token = token;
    if (!user.token) {
      let apiResponse = response.generate(
        true,
        "Failed to generate token",
        500,
        null
      );
      return res.send(apiResponse);
    } else {
      res.setHeader("authToken", token);
      res.send(user);
    }
  } catch (err) {
    console.log(err);
    let apiResponse = response.generate(true, err.message, 500, null);
    res.send(apiResponse);
  }
};

// let saveToken = tokenDetails => {
//   return new Promise((resolve, reject) => {
//     let tokenExist = AuthModel.findOne({ _id: tokenDetails._id });
//     if (!tokenExist) {
//       let apiResponse = response.generate(
//         true,
//         "Failed to Generate Token",
//         500,
//         null
//       );
//       reject(apiResponse);
//     }

//     let newAuthToken = new AuthModel({
//       authToken: tokenDetails.token,
//       tokenSecret: tokenDetails.tokenSecret,
//       tokenGenerationTime: Date.now()
//     });
//     newAuthToken
//       .save()
//       .then(data => resolve(data))
//       .catch(err => console.log(err));
//   });
// };

let logout = async (req, res) => {
  let logOutUser = AuthModel.remove({ authToken: req.user });
  if (!logOutUser) {
    let apiResponse = response.generate(true, "Token doesnt match", 500, null);
    res.send(apiResponse);
  }
  let apiResponse = response.generate(false, "Logout sucess", 200, null);
  res.send(apiResponse);
};

module.exports = {
  registerUser: registerUser,
  signinUser: signinUser,
  logout: logout
};
