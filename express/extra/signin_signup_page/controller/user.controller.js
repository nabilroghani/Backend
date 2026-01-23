const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = [];

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send("Name, Email & Password required");
  }

  const alreadyUser = users.find((u) => u.email === email);
  if (alreadyUser) {
    return res.send("User already registered");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  users.push({ name, email, password: hashPassword });

  res.send("User registered successfully");
};

const getuser = (req, res) => {
  if (users.length === 0) {
    return res.send("Empty Database, please register yourself");
  }

  res.send(users);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Enter Email and Password");
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.send("Invalid Credential");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.send("Invalid Credential");
  }
  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ message: `login succesfully`, token: token });
};

module.exports = { signupUser, getuser, loginUser };
