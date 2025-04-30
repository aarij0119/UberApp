import jwt from 'jsonwebtoken';
import UserModel from '../models/usermodel.js';
import TokenModel from '../models/blaclistedModelToken.js';

const isloggedin = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "You should login first" });
    }
  
    try {
      const isblacktoken = await TokenModel.findOne({ token });
      if (isblacktoken) {
        return res.status(401).json({ message: "Unauthorized. Token is blacklisted." });
      }
  
      const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
  
      const user = await UserModel.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token.", error: error.message });
    }
};
  


export default isloggedin;
