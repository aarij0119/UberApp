import express from 'express'
const router = express.Router();
import { query } from 'express-validator'
import isuserloggedin from '../middlewares/isuserloggedin.js'
import MapController from '../controllers/mapcontroller.js'

router.get('/get-cordinates', MapController);

export default router