const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const users = [];

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    // Check existing user
    const isMatchUser = users.find(
      (u) => u.username === username || u.email === email
    );

    if (isMatchUser) {
      return res.status(409).send("User already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = users.length + 1;

    users.push({
      userId,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).send("User created successfully");
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

const getUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find((u) => u.username == username);
    if (!user) {
      return res.send("user not found");
    }

    const findPassword = await bcrypt.compare(password, user.password);
    if (!findPassword) {
      return res.send("Password incorrect");
    }

    const token = jwt.sign(
      { userId: user.userId, username: user.username },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      token: token,
      message: "Login Succesful",
    });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

module.exports = { createUser, getUser, users };
