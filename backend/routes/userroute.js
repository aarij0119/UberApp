import express from 'express';
import UserRegister,{ login, logout }  from '../controllers/usercontroller.js'
import isloggedin from '../middlewares/isuserloggedin.js';
const router = express.Router();

router.post('/register', UserRegister);
router.post('/login',login);
router.get('/logout', logout);
router.get('/isloggedin', isloggedin)



export default router