const bcrpytjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [];

const SECRRET = "meriToffePillowKeNichayHai";

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({
      isSuccess: false,
      message: "Username, email and password required",
    });
  }

  try {
    const foundUser = users.find(
      (item) => item.username === username && item.email === email
    );

    if (foundUser) {
      return res
        .status(409)
        .send({ isSuccess: false, message: "Username or email already exist" });
    }

    const salt = await bcrpytjs.genSalt(10);
    const hashPassword = await bcrpytjs.hash(password, salt);

    const user = { username, email, password: hashPassword };

    users.push(user);

    res.send({ isSuccess: true, message: "User registered successfully!" });
  } catch (error) {}
};

exports.getUsers = async (req, res) => {
  res.send({ isSuccess: true, data: users });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ isSuccess: false, messaage: "Username and password required" });
  }

  const foundUser = users.find((item) => item.username === username);
  if (!foundUser) {
    return res
      .status(404)
      .send({ isSuccess: false, message: "User does not exist" });
  }

  const isMatchPassword = await bcrpytjs.compare(password, foundUser.password);
  if (!isMatchPassword) {
    return res
      .status(400)
      .send({ isSuccess: false, message: "Invalid password" });
  }

  const payload = {
    user: { username: foundUser.username },
  };
  const token = jwt.sign(payload, SECRRET, { expiresIn: "1h" });
  res.send({ isSuccess: true, token });
};
