import RideService from '../services/rideservice.js';
import {getFare} from '../services/rideservice.js'
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

const getFareController = async (req,res) => {
    const {origin, destination} = req.query;
    const response = await getFare(origin,destination);
    res.status(200).send(response)
}
export {getFareController}
export default createRidecontroller;
