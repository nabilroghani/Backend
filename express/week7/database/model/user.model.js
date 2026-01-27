const moongoose = require("mongoose");

const userSchema = new moongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        require: true,
        minlength: 6,
    },
},{timestamps: true})

module.exports = moongoose.model("User", userSchema);