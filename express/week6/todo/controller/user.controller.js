const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = [];

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const checkUser = users.find(
      (u) => u.username === username || u.email === email
    );

    if (checkUser) {
      return res.status(409).send("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = users.length + 1;

    users.push({ userId, username, email, password: hashedPassword });

    return res.status(201).send("User registered successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Username and Password are required");
    }

    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(401).send("Wrong Password");
    }

    const token = jwt.sign(
      { username: user.username, userId: user.userId },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "User Login Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
};

const getUsers = (req, res) => {
  res.status(200).send({
    message: `Welcome ${req.user.username}`,
  });
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    if (req.user.userId !== Number(id)) {
      return res.status(403).send("You can update only your own profile");
    }

    const user = users.find((u) => u.userId === Number(id));
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    res.status(200).send("User updated Succesfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Sirf apna account delete kar sakta hai
    if (req.user.userId !== Number(id)) {
      return res.status(403).send("You can delete only your own profile");
    }

    // Find index of user
    const userIndex = users.findIndex((u) => u.userId === Number(id));

    if (userIndex === -1) {
      return res.status(404).send("User Not Found");
    }

    // Actual delete from array
    users.splice(userIndex, 1);

    return res.status(200).send("User deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  users,
};
