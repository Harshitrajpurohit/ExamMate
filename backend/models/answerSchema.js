import mongoose from "mongoose";

const answerS = new mongoose.Schema({
    createdBy:{
        type: String,
        required: true,
    },
    question:{
        type: String,
        required: true,
    },
    description:{
        type: [],
        required: true
    },
})

const Answer = mongoose.model('Answer', answerS);

export default Answer;