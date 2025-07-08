import mongoose from "mongoose";
import { Schema } from "mongoose";

const questionS = new mongoose.Schema({
    createdBy:{
        type: "String",
        required: true,
    },
    topic:{
        type: String,
        required: true
    },
    question:{
        type: String,
        required: true,
    },
    options:{
        type:[String],
        default:[]
    },
    answer:{
        type: String,
        default:""
    },
    type:{ // mcq, ccoding , conceptual
        type: String,
        required: true,
    },
    difficulty:{
        type: String,
        required:true
    },
    tags:{
        type: [String],
        default:[],
    }},
    {timestamps:true}
);

export default mongoose.models.Question || mongoose.model("Question", questionS);