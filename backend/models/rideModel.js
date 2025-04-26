import mongoose from "mongoose";

const rideSchema =  mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captain'
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        num: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: String
    },
    distance: {
        type: Number
    },
    orderId: {
        type: String
    },
    signature: {
        type: String
    },
    otp:{
        type:String,
        select:false,
        required:true
    }
});

const rideModel = mongoose.model('ride',rideSchema);
export default rideModel
