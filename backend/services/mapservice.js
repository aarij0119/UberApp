import axios from 'axios';

const validateAddress = async (address) => {
  console.log("Address being sent to map service:", address);

  if (!address) {
    throw new Error("Invalid address parameter");
  }

  const apiKey = process.env.API_KEY; 
  if (!apiKey) {
    throw new Error("API key is missing or invalid");
  }

  try {
    
    const response = await axios.get(
      `https://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${encodeURIComponent(address)}`
    );

    console.log("Response:", response.data);

    if (response.data && response.data.data.length > 0) {
      const location = response.data.data[0]; 
      console.log("Extracted Location:", location);
      return location;
    } else {
      throw new Error("Coordinates not found for the provided address");
    }
  } catch (error) {
    console.error("Full Error Details:", error.response?.data || error.message);

    throw new Error(error.message || "Error validating address");
  }
};

export default validateAddress;

