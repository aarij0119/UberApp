import mapservice, { getDistanceAndTime } from '../services/mapservice.js';
import axios from "axios";
const apiKey = "43d53085-28c9-463d-86d5-33589b7c9638"; // GraphHopper API Key

const getCoordinates = async (req, res, next) => {
  const { address } = req.query
  // console.log(address)
  try {
    if (!address) {
      throw new Error('Address parameter is missing or invalid');
    }
    // Pass both address and key to the mapservice function
    const coordinates = await mapservice(address);

    res.status(200).json(coordinates);
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

const getDistanceTime = async (req, res) => {
  console.log("Received Query:", req.query);
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and destination are required" });
  }

  try {
    // Convert origin to latitude & longitude using GraphHopper Geocoding API
    const originResponse = await axios.get(
      `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(origin)}&key=${apiKey}`
    );
    const destinationResponse = await axios.get(
      `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(destination)}&key=${apiKey}`
    );

    if (originResponse.data.hits.length === 0 || destinationResponse.data.hits.length === 0) {
      throw new Error("One or both locations not found");
    }

    const originCoords = originResponse.data.hits[0].point; // { lat, lng }
    const destinationCoords = destinationResponse.data.hits[0].point; // { lat, lng }
    // console.log(originCoords, destinationCoords)
    // Call GraphHopper's Routing API with converted lat/lon
    const finddata = await getDistanceAndTime({
      origin: { lat: originCoords.lat, lng: originCoords.lng },
      destination: { lat: destinationCoords.lat, lng: destinationCoords.lng }
    });
    return res.status(200).json(finddata);

  } catch (err) {
    console.error("Error fetching coordinates or route:", err.message);
    return res.status(500).json({ message: `Error: ${err.message}` });
  }
};



export { getDistanceTime }
export default getCoordinates;

