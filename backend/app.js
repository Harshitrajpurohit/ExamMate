import express from "express";

import cors from "cors";
import corsOptions from "./config/cors.js";

import dotenv from 'dotenv';
import main from "./config/ConnectDB.js"

import authRoutes from "./routes/auth.routes.js"
import questionRoutes from "./routes/question.routes.js";
import answerRoutes from "./routes/answer.routes.js";

const app = express()

dotenv.config();


app.use(express.json())
const port = process.env.PORT || 5000;


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

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answer", answerRoutes);

app.listen(port, ()=>{
    console.log("backend start on port: ",port);
})