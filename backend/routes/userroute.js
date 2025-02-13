import express from 'express';
import UserRegister,{ login, logout }  from '../controllers/usercontroller.js'
const router = express.Router();

router.post('/register', UserRegister);
router.post('/login',login);
router.get('/logout', logout);



export default router