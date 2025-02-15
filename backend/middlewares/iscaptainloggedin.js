import jwt from 'jsonwebtoken'
import captainModel from '../models/captainModel.js';

const iscptloggedin = async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Login first" });
    }
    try {
        const decoded = jwt.verify(token, process.env.CAPTAIN_SECRET_KEY);
        const cptfind = await captainModel.findById(decoded.id)
        if (!cptfind) {
            return res.status(400).json({ message: "captain not found" });
        }
        req.cptfind = cptfind;
        return res.status(200).json({ message: "LoggedIn", isloggedin: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
export default iscptloggedin