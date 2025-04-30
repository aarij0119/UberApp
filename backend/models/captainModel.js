import mongoose from "mongoose";

const captainSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true
        }
    },
    platenumber: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    vehicleType: {
        type: String,
        required: true,
    },
    location: {
        ltd: {  // Latitude
            type: Number
        },
        lng: {  // Longitude
            type: Number
        }
    }
});

// Add 2d index for legacy coordinate pairs
captainSchema.index({ "location.lng": 1, "location.ltd": 1 }, { name: "location_2d" });

const captainModel = mongoose.model('captain', captainSchema);
export default captainModel;