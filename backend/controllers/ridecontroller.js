import rideModel from '../models/rideModel.js';
import RideService from '../services/rideservice.js';
import { getFare, confirmedRide } from '../services/rideservice.js'
import { SendMessage } from '../socket.js';


const createRidecontroller = async (req, res) => {
    const { origin, destination, vehicleType } = req.body;
    const user = req.user._id;
    if (!user || !origin || !destination || !vehicleType) {
        return res.status(400).json({ message: "All Fields are required" });
    }

    try {
        const ride = await RideService(user, origin, destination, vehicleType);
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const getFareController = async (req, res) => {
    const { origin, destination } = req.query;
    const response = await getFare(origin, destination);
    res.status(200).send(response)
}

const conFirmRideController = async (req, res) => {
    const { rideId, captainId } = req.body
    
    if (!rideId) {
        return res.status(302).json({ message: "Ride Id did not get" })
    }
    if (!captainId) {
        return res.status(302).json({ message: "Captain Id did not get" })
    }
    try {
        const ride = await confirmedRide(rideId, captainId);
        SendMessage(ride.user.socketid, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const stratRide = async (req, res) => {
    
    const { rideId, otp, } = req.query;

    if (!rideId) {
        return res.status(400).json({ message: "Ride ID is missing." });
    }
    if (!otp) {
        return res.status(400).json({ message: "OTP is missing." });
    }
    if (!req.cptfind) {
        return res.status(400).json({ message: "Captain information is missing." });
    }

    try {
        const ride = await rideModel
            .findOne({ _id: rideId })
            .populate('user')
            .populate('captain')
            .select('+otp'); // Fixed typo

        if (!ride) {
            return res.status(400).json({ message: "Ride not found." });
        }
        if (ride.status !== 'accepted') {
            return res.status(400).json({ message: "Ride not accepted." });
        }
        if (ride.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        // Update the ride's status
        await rideModel.findOneAndUpdate(
            { _id: rideId },
            { status: 'ongoing' }
        );

        // Notify the user via socket
        SendMessage(ride.user.socketid, {
            event: 'ride-start',
            data: ride,
        });

        return res.status(200).json({ message: "Ride started successfully.", ride });
    } catch (error) {
        console.error("Error in startRide: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};


const endride = async (req, res) => {

    if (!req) {
        return res.status(400).json({ message: "Request not found" });
    }
    const { rideId } = req.body;
    const cptfind =  req.cptfind
    try {
        const ride = await rideModel.findOne({ _id: rideId, captain: cptfind._id }).populate('user').populate('captain').select('+otp');
        if (!ride) {
            return res.status(400).json({ message: "ride did not find" })
        }
        if (ride.status !== 'ongoing') {
            return res.status(400).json({ message: "ride  not going" })
        }
        await rideModel.findOneAndUpdate({ _id: rideId }, {
            status: 'completed'
        })
        SendMessage(ride.user.socketid, {
            event: 'ride-ended',
            data: ride
        });
        return res.status(200).json({ message: "Ride ended successfully", ride });

    } catch (error) {
        console.error("Error in endride:", error.message);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

}

export { getFareController, conFirmRideController, stratRide, endride }
export default createRidecontroller;
