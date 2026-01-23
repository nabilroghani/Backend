const bcrypt = require("bcrypt");

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

module.exports = { signupUser, getuser };
