import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import {generateQuestions} from  "./services/Interview_langchain.js"
import main from "./models/ConnectDB.js"
import User from "./models/userSchema.js"
import Question from "./models/questionSchema.js"
import Answer from "./models/answerSchema.js";
import storeQuestion from "./functions/storeQuestions.js";
import { generateAnswer } from "./services/answer_langchain.js";
const app = express()

dotenv.config();


app.use(express.json())
const port = process.env.PORT || 5000;

const allowedOrigins = [process.env.FRONTEND_SERVER_API ,'http://localhost:3000'];

const corsOptions = {
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          return callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

main()

app.get("/",(req,res)=>{
    try {
      console.log("hello");
        res.send("/ page");
    } catch (error) {
        res.status(400).json({ message : "error"})
    }
    
});

app.post("/api/test",async (req,res)=>{
    try {
        const {userid, type, topic, level, question, options, answer, tags} = req.body;
        
        const que = await Question.findOne({ question, type, difficulty: level });

        if(que){
          return res.status(409).json({ message: "Question already exists" });
        }
        const newQuestion = new Question({
            createdBy:userid,
            topic,
            question,
            options,
            answer,
            type,
            difficulty:level,
            tags
          });
          const savedQuestion = await newQuestion.save(); 

          res.status(200).json(savedQuestion);
      
    } catch (error) {
      console.log(error)
        res.status(400).json({ message : "error"})
    }
    
});

app.post("/api/generate/", async(req, res) => {
  try {
    const {userEmail, topic, level, type, prevQuestions } = req.body;

    let questions = await generateQuestions(topic,level,type,prevQuestions); 
    let sameQuestions = JSON.parse(questions);
    if(typeof questions !== "object"){
      const user = await User.findOne({email:userEmail});
      if(!user){
        res.status(400).json({ error: "not loggedIn" });
        return;
      }
        const backResponse = storeQuestion(userEmail,sameQuestions,topic, level);
        if(backResponse?.error){
          res.status(400).json({error:"Question not stored in database"});
          return;
        }
      }
    res.status(200).json(questions);

  } catch (error) {
    res.status(400).json({ error: "faild to fetch data" });
  }
});

app.post("/api/answer", async(req, res) => {
   try {
    const {question, userEmail} = req.body;

    const data = await generateAnswer(question);
    const questionData = new Answer({
      createdBy:userEmail,
      question:question,
      description:data,
    })
    await questionData.save();

    res.status(200).json(data);
    
   } catch (error) {
    console.log(error)
    res.status(500).json({err:"did not get answer"})
   }
})


app.post("/api/googleSignIn", async(req, res) => {
  try {
    const { name, email, image} = req.body;
    const user = await User.findOne({email});

    if(!user){
      const newUser = new User({
        name,
        email,
        image
      })
      await newUser.save();
    }

    return res.status(200).json({message:"Successfull"});
  } catch (error) {
    res.status(400).json({ error: "faild to add" });
  }
});

app.listen(port, ()=>{
    console.log("backend start on port: ",port);
})