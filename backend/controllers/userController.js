import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';



const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '10d'});
}

// ✅ Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: "Password not long enough" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Login user
const loginUser = async (req, res) => {
        const { email, password } = req.body;

        try {
            // 1. Validate inputs
            if (!email || !password) {
                return res.status(400).json({ error: "Email and password are required" });
            }

            // 2. Check if user exists
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // 3. Compare password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // 4. Generate token
            const token = createToken(user._id);

            // 5. Send success response
            res.status(200).json({
                success: true,
                token,
            });

        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: "Server error" });
        }

};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findById(id).select("-password"); // 👈 exclude parola

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, data: user });
    } catch (err) {
        console.error("❌ Error fetching user by ID:", err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export {registerUser, loginUser, getUserById};