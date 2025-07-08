import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import {generateQuestions} from  "./services/langchain.js"
import main from "./models/ConnectDB.js"
import User from "./models/userSchema.js"
import Question from "./models/questionSchema.js"
import storeQuestion from "./functions/storeQuestions.js";
const app = express()

dotenv.config();


app.use(express.json())
const port = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_SERVER_API || "http://localhost:3000",
  credentials: true
}));


main()

app.post("/",(req,res)=>{
    try {
        const {topic, level, type, prevQuestions} = req.body;
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
          console.log("question:", savedQuestion);
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
    res.status(200).json(questions);

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

  } catch (error) {
    res.status(400).json({ error: "faild to fetch data" });
  }
});


app.post("/api/googleSignIn", async(req, res) => {
  try {
    const {id, name, email, image} = req.body;

    const user = await User.findOne({email});

    if(!user){
      const newUser = new User({
        userId:id,
        name,
        email,
        image
      })
      const data = await newUser.save();
      console.log("data: ",data);
    }

    return res.status(200).json({message:"Sussessfull"});
  } catch (error) {
    res.status(400).json({ error: "faild to fetch data" });
  }
});

app.listen(port, ()=>{
    console.log("backend start on port: ",port);
})