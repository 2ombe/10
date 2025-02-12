const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateToken } = require("../middleware/auth");
exports.getAllUsers=async(req,res)=>{
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    console.log(errors);
    
  }
}
exports.register = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};



exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,

          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
