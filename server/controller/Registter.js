import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        // Hash the password
        console.log("hi");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
        });

        // Save the user in the database
        console.log(user);
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }


        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        res.json({ user:user, token:token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;
