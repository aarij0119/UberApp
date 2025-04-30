import express from 'express';
const router = express.Router();
import createRidecontroller, { conFirmRideController, endride } from '../controllers/ridecontroller.js';
import { getFareController } from '../controllers/ridecontroller.js';
import isUserLoggedin from '../middlewares/isuserloggedin.js'
import isCaptainLoggedin from '../middlewares/iscaptainloggedin.js'
import { stratRide } from '../controllers/ridecontroller.js';

router.post('/create',isUserLoggedin,createRidecontroller);
router.get('/getfare', isUserLoggedin,getFareController);
router.post('/confirm',isCaptainLoggedin,conFirmRideController);
router.get('/start-ride',isCaptainLoggedin,stratRide);
router.post('/end-ride', isCaptainLoggedin, endride);

export default router