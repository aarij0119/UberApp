import axios from "axios";
import validateAddress from '../services/mapservice.js'

const getCoordinates = async (req, res, next) => {
  const { address } = req.query
  try {
    if (!address) {
      throw new Error('Address parameter is missing or invalid');
    }
    const coordinates = await validateAddress(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

const getDistanceTime = async (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and destination are required" });
  }

  if (!process.env.API_KEY) {
    return res.status(500).json({ error: "API key is missing" });
  }

  try {
    // Fetch coordinates for origin and destination
    const getCoordinates = async (location) => {
      const response = await axios.get(
        `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(location)}&key=${process.env.API_KEY}`
      );
      if (!response.data.hits.length) {
        throw new Error(`Location not found: ${location}`);
      }
      return response.data.hits[0].point; // { lat, lng }
    };

    const originCoords = await getCoordinates(origin);
    const destinationCoords = await getCoordinates(destination);

    // Fetch route information
    const routingResponse = await axios.get(
      `https://graphhopper.com/api/1/route?point=${originCoords.lat},${originCoords.lng}&point=${destinationCoords.lat},${destinationCoords.lng}&vehicle=car&key=${process.env.API_KEY}`
    );

    if (!routingResponse.data.paths || routingResponse.data.paths.length === 0) {
      return res.status(404).json({ error: "No route found between the given locations" });
    }

    const routeData = routingResponse.data.paths[0];
    const distanceKm = routeData.distance / 1000;
    const estimatedTimeMinutes = routeData.time / 60000;

    return res.status(200).json({
      distance: distanceKm,
      estimatedTime: estimatedTimeMinutes
    });
  } catch (err) {
    console.error("Error fetching coordinates or route:", err.message);
    return res.status(500).json({ error: err.message });
  }
};








    export { getDistanceTime }
    export default getCoordinates;

