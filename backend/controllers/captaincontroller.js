import CaptainModel from '../models/captainModel.js'
import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import captainModel from '../models/captainModel.js';


//Captain Register Function
const captainRegister = async (req, res) => {
    const { firstname, lastname, email, password, vehiclecolor, vehiclenumber, vehiclecapacity, vehicleType } = req.body;
    
    try {
        const captainfind = await CaptainModel.findOne({ email: email });
        if (captainfind) {
            return res.status(400).json({ message: "Captain already exists" });
        }

        const salt = await Bcrypt.genSalt(10);
        const hash = await Bcrypt.hash(password, salt);

        const captain = await CaptainModel.create({
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: hash,
            vehicle: {
                color: vehiclecolor
            },
            platenumber: vehiclenumber,
            capacity: vehiclecapacity,
            vehicleType: vehicleType, 
        });

        const createdcaptain = await captain.save();
        const token = jwt.sign({ email: createdcaptain.email, id: createdcaptain._id }, process.env.CAPTAIN_SECRET_KEY);
        res.cookie('token', token);
        res.status(200).json({ message: "User Created successfully", createdcaptain:createdcaptain,token:token });
    } catch (error) {
        console.error("Error creating captain:", error);  // Log error for server-side debugging
        res.status(400).json({ error: error, message: "Bad request" });
    }
}


//login function
const captainlogin = async (req, res) => {
    const { email, password } = req.body;
    const cptfind = await captainModel.findOne({ email });
    if (!cptfind) {
        return res.status(400).json({ message: "user not found" });
    }
    try {
        const isPasswordCorrect = await Bcrypt.compare(password, cptfind.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "email or password is incorrect" });
        }
        const token = jwt.sign({ email: cptfind.id, id: cptfind._id }, process.env.CAPTAIN_SECRET_KEY);
        res.cookie("token", token);
        return res.status(201).json({ message: "Captain logged in successfully", captain:cptfind,token:token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//logout function
const captainlogout = (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "cookies not found" })
        }
        if (token) {
            res.clearCookie('token');
        }
        res.status(200).json({ message: "captain logout successfull" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { captainlogin,captainlogout }
export default captainRegister