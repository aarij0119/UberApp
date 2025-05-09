import rideModel from '../models/rideModel.js'
import axios from 'axios';
import validateAddress from './mapservice.js';
import { getCaptainsInRadius } from './mapservice.js';
import { SendMessage } from '../socket.js';

async function getFare(origin, destination) {
  if (!origin || !destination) {
    throw new Error("Pickup and destination are required");
  }
  const distanceAndTime = await getDistanceTime({ origin, destination });
  const { distance, estimatedTime } = distanceAndTime;

  if (!distance || !estimatedTime) {
    throw new Error("Failed to retrieve distance and time");
  }
  const fareRates = {
    auto: { baseFare: 30, perKm: 10, perMinute: 2 },
    car: { baseFare: 50, perKm: 15, perMinute: 3 },
    bike: { baseFare: 20, perKm: 8, perMinute: 1 }
  };
  const calculateFare = (rate) => {
    return rate.baseFare + rate.perKm * Math.floor(distance) + rate.perMinute * Math.floor(estimatedTime);
  };
  const fares = {
    auto: Math.floor(calculateFare(fareRates.auto)),
    car: Math.floor(calculateFare(fareRates.car)),
    bike: Math.floor(calculateFare(fareRates.bike))
  };
  return fares;
}
const getDistanceTime = async ({ origin, destination }) => {

  if (!origin || !destination) {
    throw new Error("Origin and destination are required");

  }

  if (!process.env.API_KEY) {
    throw new Error("API key is missing");

  }

  try {
    const getCoordinates = async (location) => {
      const response = await axios.get(
        `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(location)}&key=${process.env.API_KEY}`
      );
      if (!response.data.hits.length) {
        throw new Error(`Location not found: ${location}`);
      }
      return response.data.hits[0].point;
    };

    const originCoords = await getCoordinates(origin);
    const destinationCoords = await getCoordinates(destination);

    const routingResponse = await axios.get(
      `https://graphhopper.com/api/1/route?point=${originCoords.lat},${originCoords.lng}&point=${destinationCoords.lat},${destinationCoords.lng}&vehicle=car&key=${process.env.API_KEY}`
    );

    if (!routingResponse.data.paths || routingResponse.data.paths.length === 0) {
      throw new Error("No route found between the given locations");
    }

    const routeData = routingResponse.data.paths[0];
    const distanceKm = routeData.distance / 1000;
    const estimatedTimeMinutes = routeData.time / 60000;

    return {
      distance: distanceKm,
      estimatedTime: estimatedTimeMinutes
    };
  } catch (err) {
    console.error("Error fetching coordinates or route:", err.message);
    throw new Error({ error: err.message });

  }
};

function getOtp(num) {
  num = Math.floor(Math.random() * 900000) + 100000;
  return num
}
const createRide = async (user, origin, destination, vehicleType) => {
  if (!user || !origin || !destination || !vehicleType) {
    throw new Error("All Fields are required");
  }
  const fare = await getFare(origin, destination);
  const address = origin;
  const pickUpcordinates = await validateAddress(address);
  const location = {
    ltd: pickUpcordinates.ltd,  // Latitude
    lng: pickUpcordinates.lng   // Longitude
  };
  const CaptainInRadius = await getCaptainsInRadius(location);
  
  const ride = await rideModel.create({
    user,
    origin,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType]
  });
  
  const populatedRide = await rideModel.findById(ride._id).populate('user')
  
  Object.values(CaptainInRadius).forEach(captain => {
    if (captain?.socketId) {
      SendMessage(captain.socketId, {
        event: 'New-ride',
        data: {
          populatedRide,
          otp: ''  
        }
      });
      console.log(`Ride request sent to captain ${captain._id}`);
    } else {
      console.log(`Skipping captain ${captain?._id || 'unknown'} - no socket connection`);
    }
  });
  
  return ride;
  
};

const confirmedRide = async (rideId,captainId) => {
  if(!rideId){
    throw new Error("Ride id is not defined");
  }
  if(!captainId){
    throw new Error("captain id is not defined");
  }
  await rideModel.findOneAndUpdate({
    _id:rideId
  },{
    status: 'accepted',
    captain: captainId
  })
  const findride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');
  if(!findride){
    throw new Error("Ride not found");
  }
return findride
}
export { getFare,confirmedRide }
export default createRide
