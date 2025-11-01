const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (name && email && password) {
            const user = await User.findOne({ email });
            if (user) return res.status(500).json({ message: "User already exist" });
            else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const newUser = new User({ name, email, password: hashedPassword });
                const savedUser = await newUser.save();
                return res.status(200).json({ message: "User is created", user: savedUser });
            }
        } else {
            return res.status(404).json({ message: 'Missing required fields' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while creating the user', error });
    }
}
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(500).json({ message: "User doesn't exist" });
        const storedHashedPassword = user.password;

        const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);

        if (isPasswordValid) {
            const token = jwt.sign({
                id: user._id,     // 👈 include user ID
                role: "user"
            }, process.env.JWT_SECRET, { expiresIn: "24h" });
            return res.status(200).json({ token });
        } else {
            return res.status(404).json({ message: "User doesn't exist" });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while login the user', error });
    }
}
async function getAllUser(req, res) {
    try {
        const users = await User.find();
        if (users.length > 0) {
            return res.status(200).json({ message: "Users are found", users });
        } else {
            return res.status(404).json({ message: "Users are not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: "Error while fetching users" });
    }
}
async function getMe(req, res) {
  try {
    // req.user is set by verifyJWT middleware
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password'); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User details retrieved",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    return res.status(400).json({ message: "Error fetching user details", error: error.message });
  }
}
module.exports = {
    createUser,
    loginUser,
    getAllUser,
    getMe
}