import express from 'express';
const router = express.Router();
import captainRegister, { captainlogin, captainlogout } from '../controllers/captaincontroller.js'
import iscptloggedin from '../middlewares/iscaptainloggedin.js';

router.post('/register',captainRegister);
router.post('/login',captainlogin);
router.get('/logout',captainlogout);
router.get('/iscptloggedin',iscptloggedin)

export default router