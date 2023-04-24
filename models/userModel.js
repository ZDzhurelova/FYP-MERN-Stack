//const mongoose = require('mongoose');
import mongoose from 'mongoose';

//Create an user schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isContractor: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        seenNotifications: {
            type: Array,
            default: [],
        },
        unseenNotifications: {
            type: Array,
            default: [],
        },
    }, 
    {
        timestamps: true,
    }
);

//Create a model for the user schema where first parameter will be users and the second parameter is the userSchema
const userModel = mongoose.model('users', userSchema);

//Export the user model
module.exports = userModel;
// export default userModel;