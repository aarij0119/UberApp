import UserModel from '../models/usermodel.js';

const UserRegister = async (req, res) => {
    // Destructuring
    const { fullname, email, password } = req.body;
    // Check if user with same email exists
    const userFind = await UserModel.findOne({ email: email });
    if (userFind) {
        return res.status(400).json({ message: "User already exists" });
    }
    try {
        
        // Create a new user instance
        const newUser = new UserModel({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password
        });

        // Save the user to the database
        const createdUser = await newUser.save();

        // Respond with success message
        res.status(201).json({ message: "User created successfully!", createdUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Failed to create user", error });
    }
}

export default UserRegister;
