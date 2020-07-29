const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", userController.registerUser);
/**
 * @api {post} /api/v1/users/signup Register a User
 * @apiVersion 0.0.1
 * @apiName User Signup
 * @apiGroup user
 *
 * @apiParam {Number} id Users unique ID.
 * @apiParam {String} email Email of the User. (body params) (required)
 * @apiParam {String} password Password of the User. (body params) (required)
 *
 * @apiSuccess {object} data shows error status, message, http status code, result.
 * 
 * @apiSuccessExample Success-Response:
 *        HTTP/1.1 200 OK
 *        {
            "error": false,
            "message": "User registered successfully",
            "status": 201,
            "data": {
                      "email": "someone@mail.com",
                    }
          }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *        HTTP/1.1 404 Not Found
 *        {
            "error": true,
            "message": "AP error",
            "status": 500,
            "data": null
          }
 */

router.post("/signin", userController.signinUser);
router.post("/logout", userController.logout);

module.exports = router;
