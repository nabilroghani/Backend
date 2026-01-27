const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");



const userRegister = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).send("All Field are required");
    }

    const isMatch = await User.findOne({email: email});
    if(isMatch){
        return res.status(409).send("Email Already Exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {name, email, password: hashedPassword};


    const newUser = new User(userData);

    await newUser.save();

    res.status(200).send("User Registered Succesfully...");
}

const loginUser = async (req, res) => {
   try {
     const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).send("All Field Required");
    }

    const user = await User.findOne({email: email});
    if(!user){
        return res.status(404).send("Invalid Email");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
         return res.status(404).send("Invalid Password");
    }

    const token = jwt.sign(
        {email: email},
        process.env.SECRET_KEY,
        {expiresIn: "1h"}
    )

    res.status(200).json({
        message: "Login succesfull", token: token
    });
   } catch (error) {
    res.status(500).send("Login Error: " + error.message);
   }
}

const getUser = async (req, res) => {
    try {
        const {email} = req.body;

    const user = await User.findOne({email: email});
    if(!user){
        return res.status(400).send("User Not Found");
    }

    res.status(200).json({
            message: "User Found Successfully",
            email: user.email,
            name: user.name
        });
    } catch (error) {
        res.status(500).send("Error fetching user");
    }
}

module.exports = {userRegister, loginUser, getUser};