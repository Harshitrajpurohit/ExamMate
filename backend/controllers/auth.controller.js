import User from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Invalid email or password" });
        }

        let passwordVerification = await bcrypt.compare(password, user.password);
        if (!passwordVerification) {
            return res.status(401).json({ error: "Invalid email or password" });
        }


        let token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_TOKEN_SECRET_KEY, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ message: "login successfull" });

    } catch (error) {
        return res.status(500).json({ error: "something went wrong, please try again later" });
    }
}


export const sighInUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, Email and password are required" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ error: "User already available, please Login" });
        }

        const bcryptPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: bcryptPassword
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_TOKEN_SECRET_KEY, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        })

        return res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}


export const logOutUser = async (req, res) => {
    try {

        const token = req.cookies?.token;
        
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        return res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
}



export const me = async(req,res)=>{
    try {
        const token = await req.cookies.token;
        if (!token) {
            return res.status(401).json({ authenticated: false });
        }

        let verification = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
        if(verification) return res.status(200).json({ authenticated: true });

        return res.status(401).json({ authenticated: false, email:verification.email });

    } catch (error) {
        return res.status(401).json({ authenticated: false });
    }
}