import jwt from 'jsonwebtoken';
import UserModel from '../models/usermodel.js';
import TokenModel from '../models/blaclistedModelToken.js';

const isloggedin = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You should login first" });
    }
    const isblacktoken = await TokenModel.findOne({token:token});
    if(isblacktoken){
        return res.status(401).json({message:"Unauthorised"})
    }
    try {
        const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        return res.status(200).json({ message: "LoggedIn", isloggedin: true });
    } catch (error) {
        if (error) {
            return res.status(401).json({ message: "Not verified" });
        }
        return res.status(400).json({ message: "Bad request" });
    }
}

export default isloggedin;
