import axios from 'axios';
import captainModel from '../models/captainModel.js';

const validateAddress = async (address) => {
  if (!address) {
    throw new Error("Invalid address parameter");
  }
  try {
    const response = await axios.get(
      `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(address)}&key=${process.env.API_KEY}`
    );
    if (response.data.hits.length > 0) {
      const location = response.data.hits[0];
      return {
        formattedAddress: location.name,
        ltd: location.point.lat,
        lng: location.point.lng
      };
    } else {
      throw new Error("Address details not found");
    }
  } catch (error) {
    console.error("Full Error:", error.response?.data || error.message);
    throw new Error(error.message || "Error retrieving address details");
  }
};


const getDistanceAndTime = async ({ origin, destination }) => {
  try {
    if (!origin || !destination) {
      throw new Error("Origin and destination are required");
    }
    const requestUrl = `https://graphhopper.com/api/1/route?point=${origin.lat},${origin.lng}&point=${destination.lat},${destination.lng}&vehicle=car&key=${process.env.API_KEY}`;

    const response = await axios.get(requestUrl);

    if (!response.data.paths || response.data.paths.length === 0) {
      throw new Error("No route found between the given locations");
    }

    const routeData = response.data.paths[0];
    const distanceKm = routeData.distance / 1000; // Convert meters to kilometers
    const durationMinutes = routeData.time / 60000; // Convert milliseconds to minutes

    return {
      origin,
      destination,
      distance: `${distanceKm.toFixed(2)} km`,
      estimatedTime: `${durationMinutes.toFixed(2)} minutes`
    };
  } catch (error) {
    console.error("Axios Error Response:", error.response?.data || error.message);
    throw new Error(error.message || "Failed to calculate distance and time");
  }
};

const getCaptainsInRadius = async (location) => {
  try {
    // 1. First try to find EXACT location match
    const exactMatchCaptains = await captainModel.find({
      "location.ltd": location.ltd,
      "location.lng": location.lng,
      status: 'active'
    });

    if (exactMatchCaptains.length > 0) {
      return exactMatchCaptains[0]; // Return first matching captain
    }

    // 2. If no exact match, find ANY active captain
    const anyCaptain = await captainModel.findOne({
      status: 'active',
      "location.ltd": { $exists: true },
      "location.lng": { $exists: true },
    });

    if (anyCaptain) {
      return anyCaptain;
    }
    return null;

  } catch (error) {
    console.error("Error finding captain:", error);
    return null;
  }
};


export { getDistanceAndTime, getCaptainsInRadius }
export default validateAddress;
