import User from "../models/userSchema.js";

export const googleSignIn = async (req, res) => {
    try {
        const { name, email, image } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            const newUser = new User({
                name,
                email,
                image
            })
            await newUser.save();
        }

        return res.status(200).json({ message: "Successfull" });
    } catch (error) {
        res.status(400).json({ error: "faild to add" });
    }
}