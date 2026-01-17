const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let users = [];
const SECRET_KEY = "mySuperSecretKey";

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.send("username or email required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = { username, email, password: hashedPassword };
  users.push(userData);

  res.send("User Register");
};

const getUser = (req, res) => {
  res.send(users);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("email and password is required");
  }

  const user = users.find((u) => u.email == email);

  if (!user) {
    return res.send("Username not found");
  }

  const isMatchPassword = await bcrypt.compare(password, user.password);

  if (!isMatchPassword) {
    return res.send("Incorrect Password");
  }

  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.send({
    msg: "Login succesful",
    token: token,
  });
};

module.exports = { registerUser, getUser, loginUser };
