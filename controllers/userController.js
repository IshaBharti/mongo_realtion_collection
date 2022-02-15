
const router = require("../routes/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../auth/jwt");
const nodemailer = require("nodemailer");
const { email, sendingEmail } = require("../mailer/index");
const User=require("../model/User")
const signup = async (req, res) => {
  try {
    const pass = await bcrypt.hash(req.body.password, 10);

    const datastoring = {
      Name: req.body.Name,
      email: req.body.email,
      number: req.body.number,
      password: pass,
    };

    const data = await new User(datastoring);
    console.log(data);

    const result = await User.findOne({ email: data.email });
    if (result) {
      res.send("Email is alreaday taken  take another email or login ");
    }

    data.save();
    return res.status(200)
.send({ status: 200, message: `sign up has suceesfully welcome ${datastoring.Name}` });
  } catch (err) {
    console.log("error", err);
    return res.status(500).send({ status: 500, message: "Something went wrong" });
  }
};


const login = async (req, res) => {
  const password = req.body.password; 

  const data = await User.findOne({ email: req.body.email });

  if (data) {
    const check_password=await bcrypt.compare(password, data.password)

    if (check_password) {
      const token = generateToken(data._id);
      res.send(token);

      return res
        .status(200)
        .send({ status: true, message: `login successful ${data.Name}`, token: token });
    } else {
      return res.send("incorrect password");
    }
  } else {
    return res.status(404).send({ status: false, message: "User Not exist " });
  }
};
const forgotPassword = async (req, res) => {
  let data = await User.findOne({ email: req.body.email });
  console.log(data);

  console.log(data);
  try {
    if (data == null) {
      res.status(404).send({ status: 404, message: "email is not exist" });
    }else {
      res.status(200).send({ status: 200, message: "Check mail for reset" });
      const token = generateToken(data._id);


    }
  } catch (err) {
    res.status(404).send({ status: 400, message: "Something error" });
  }
  sendingEmail(data.email, data._id, token);
};
const resetPass = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const idData = await User.findOne({ _id: id });
    console.log(idData, ">>>>>>>>...");
  
    const pass = await bcrypt.hash(req.body.password, 10);
    const result = await User.updateOne(
      { _id: req.params.id },
      {
        password: pass,
      }
    );

    console.log(result, "hello");
    res.send({ status: 200, message: "Succesfully Update PAssword" });
    }catch (err) {
    console.log(err.message);
  }
};

module.exports = { signup, login, forgotPassword, resetPass };
