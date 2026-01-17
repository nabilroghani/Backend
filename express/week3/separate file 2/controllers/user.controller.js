let users = [];

const registerUsers = (req, res) => {
  const { username, password } = req.body;

  users.push({
    username,
    password,
  });
  res.send("Register Succesful");
};

const loginUser = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username == username && u.password == password
  );
  if (!user) {
    return res.send("Wrong Data");
  }

  res.send("User Login Succesful");
};

const getUsers = (req, res) => {
  res.send(users);
};

module.exports = { registerUsers, loginUser, getUsers };
