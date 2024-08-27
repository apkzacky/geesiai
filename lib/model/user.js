import mongoose, { model, models } from "mongoose";

const { Schema } = mongoose;



const userSchama = new Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String
    },
    authtoken: {
        type: String
    },
    profilePicture: {
        type: String,
        require: true
    },
    power: {
        type: Number,
        require: true
    },
    emailVerified: {
        type: Boolean,
    },
    token: {
        type: String,
    },
    about: {
        type: Array,
        require: true
    },
    signup_date: {
        type: Date,
        default: Date.now
    },
    birth_date: {
        type: Date
    },
    googleID: {
        type: String,
        require: true
    }
});

const User = models.User || model("User", userSchama)

export default User;