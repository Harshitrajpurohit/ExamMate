import User from "../models/userSchema.js"
import Question from "../models/questionSchema.js"
import { generateQuestions } from "../services/interview.service.js";
import storeQuestion from "../utils/storeQuestions.js";
import jwt from "jsonwebtoken"

export const createQuestion = async (req, res) => {
    try {
        const { userid, type, topic, level, question, options, answer, tags } = req.body;

        const que = await Question.findOne({ question, type, difficulty: level });

        if (que) {
            return res.status(409).json({ message: "Question already exists" });
        }
        const newQuestion = new Question({
            createdBy: userid,
            topic,
            question,
            options,
            answer,
            type,
            difficulty: level,
            tags
        });
        const savedQuestion = await newQuestion.save();

        res.status(200).json(savedQuestion);

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "error" })
    }
}

export const generateQuestionSet = async (req, res) => {
    try {
        const {topic, level, type, prevQuestions } = req.body;
        let questions = await generateQuestions(topic, level, type, prevQuestions);
        if(questions?.error){
            return res.status(429).json({error:"Free Plan exceed, Buy Premium"})
        }
        let sameQuestions = JSON.parse(questions);
        const token = await req.cookies.token;
        let verification = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
        const user = await User.findOne({ email: verification.email });
        if (!user) {
            res.status(400).json({ error: "not loggedIn" });
            return;
        }
        const backResponse = await storeQuestion(verification.email, sameQuestions, topic, level);
        if (backResponse?.error) {
            res.status(400).json({ error: "Question not stored in database" });
            return;
        }
        res.status(200).json(questions);

    } catch (error) {
        res.status(400).json({  error: "Internal server error"  });
    }
}