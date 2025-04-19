import mapservice from '../services/mapservice.js';

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

export default getCoordinates;

