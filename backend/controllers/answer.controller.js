import { generateAnswer } from "../services/answer.service.js";
import Answer from "../models/answerSchema.js";

export const createAnswer = async (req, res) => {
    try {
        const { question, userEmail } = req.body;

        const data = await generateAnswer(question);
        if(data?.error){
            return res.status(429).json({error:"Free Plan exceed, Buy Premium"})
        }
        const questionData = new Answer({
            createdBy: userEmail,
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