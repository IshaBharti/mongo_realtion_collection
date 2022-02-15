var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");
var datacollection=require('../controllers/datacollection')
const { check, validationResult } = require("express-validator");
const validator=require("../validator");
const addAddress = require("../controllers/datacollection");



router.post("/signup",

 [
    check("Name").not().isEmpty().withMessage("name field is required"),

  check("email").not().isEmpty().isEmail().withMessage("Email Not exist"),
   check("number")
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({ min: 10 })
    .withMessage("number is Not Valid"),
  check("password").not().isEmpty().isLength({ min: 5 }).withMessage("password length is 6"),
],
  validator,

userController.signup);
router.post("/login",userController.login)
router.post("/forgotPassword",userController.forgotPassword)
router.post("/resetPass/:id/:token",userController.resetPass)
router.get("/getaddress",datacollection.getAddress)
router.post("/addevent",datacollection.addAddress)
module.exports = router;
