import express from 'express';
const router = express.Router();
import createRidecontroller from '../controllers/ridecontroller.js';
import { getFareController } from '../controllers/ridecontroller.js';
import isUserLoggedin from '../middlewares/isuserloggedin.js'

router.post('/create',isUserLoggedin,createRidecontroller);
router.get('/getfare', isUserLoggedin,getFareController)

export default router