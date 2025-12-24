import express from "express"
import { createQuestion, generateQuestionSet } from "../controllers/question.controller.js";

const router = express.Router();

router.post("/test", createQuestion)
router.post("/generate", generateQuestionSet)

export default router;