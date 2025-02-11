import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: false
        }
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    socketid: {
        type: String,
        required: false
    }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
