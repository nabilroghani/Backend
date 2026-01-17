const userLogin = (req, res) => {
  res.send("Welcome to Login Page");
};

const userSignup = (req, res) => {
  res.send("Welcome to SignUp Page");
};

module.exports = { userLogin, userSignup };
