import axios from 'axios';
const apiKey = "43d53085-28c9-463d-86d5-33589b7c9638";
const validateAddress = async (address) => {
  console.log("Address input:", address);

  if (!address) {
    throw new Error("Invalid address parameter");
  }

  try {
    const response = await axios.get(
      `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(address)}&key=${apiKey}`
    );

    console.log("Response:", response.data);

    if (response.data.hits.length > 0) {
      const location = response.data.hits[0];
      console.log("Extracted Location:", location);

      return {
        formattedAddress: location.name,
        latitude: location.point.lat,
        longitude: location.point.lng
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
  console.log("Origin:", origin);
  console.log("Destination:", destination);

  try {
    if (!origin || !destination) {
      throw new Error("Origin and destination are required");
    }

    // Debugging: Log API Request
    const requestUrl = `https://graphhopper.com/api/1/route?point=${origin.lat},${origin.lng}&point=${destination.lat},${destination.lng}&vehicle=car&key=${apiKey}`;
    console.log("API Request URL:", requestUrl);

    const response = await axios.get(requestUrl);

    // Debugging: Log Full Response
    console.log("Routing Response (Full):", response.data);

    if (!response.data.paths || response.data.paths.length === 0) {
      throw new Error("No route found between the given locations");
    }

    const routeData = response.data.paths[0];
    const distanceKm = routeData.distance / 1000; // Convert meters to kilometers
    const durationMinutes = routeData.time / 60000; // Convert milliseconds to minutes

    console.log("working in end part");

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

export { getDistanceAndTime }
export default validateAddress;
