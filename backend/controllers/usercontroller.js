import UserModel from '../models/usermodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserRegister = async (req, res) => {
    // Destructuring
    const { fullname, email, password } = req.body;

    // Check if user with same email exists
    const userFind = await UserModel.findOne({ email: email });
    if (userFind) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {
        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt);

        // Create the new user
        const newUser = new UserModel({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password: hash
        });

        // Save the user to the database
        const createdUser = await newUser.save();
        const token = jwt.sign({ email: createdUser.email, id: createdUser._id }, process.env.USER_SECRET_KEY);
        res.cookie('token', token)
        // Respond with success message
        res.status(201).json({ message: "User created successfully!", createdUser });
    } catch (error) {
        res.status(500).json({ message: "Failed to create user", error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    try {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error during password comparison" });
            }
            if (!result) {
                return res.status(400).json({ message: "Email or password is incorrect" });
            }

            // Generate JWT token
            const token = jwt.sign(
                { email: user.email, id: user._id },
                process.env.USER_SECRET_KEY
            );

            // Set cookie
            res.cookie('token', token);

            res.status(200).json({ message: "Login successful" });
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to log in", error: err });
    }
};

const logout = (req, res) => {
    try {
        res.cookie('token', "");
        return res.status(200).json({ message: "Logout successfully" });
    } catch (err) {
      return  res.status(500).json({message:"Failde to logout", err})
    }
}

export { login, logout }
export default UserRegister;
