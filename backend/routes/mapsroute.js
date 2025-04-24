import express from 'express'
const router = express.Router();
import MapController, { getDistanceTime } from '../controllers/mapcontroller.js'

router.get('/get-cordinates', MapController);
router.post('/get-diatance-time', getDistanceTime);

export default router