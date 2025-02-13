import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400 // 24 hours
    }
});

const TokenModel = mongoose.model('token',TokenSchema);
export default TokenModel