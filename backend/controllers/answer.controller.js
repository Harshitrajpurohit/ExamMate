import { generateAnswer } from "../services/answer.service.js";
import Answer from "../models/answerSchema.js";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const createAnswer = async (req, res) => {
    try {
        const { question } = req.body;
        const data = await generateAnswer(question);

        if (data?.error) {
            return res.status(429).json({ error: "Free Plan exceed, Buy Premium" })
        }

        const token = await req.cookies.token;
        let verification = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);

        const user = await User.findOne({ email: verification.email });
        if (!user) {
            res.status(400).json({ error: "not loggedIn" });
            return;
        }

        const questionData = new Answer({
            createdBy: verification.email,
            question: question,
            description: data,
        })
        await questionData.save();

        res.status(200).json(data);

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: "did not get answer" })
    }
}