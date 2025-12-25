import Question from "../models/questionSchema.js"

async function storeQuestion(userEmail, sameQuestions, topic, level) {
  try {
    for (let q of sameQuestions) {
      const backResponse = new Question({
        createdBy: userEmail,
        type: q?.type,
        topic: topic.trim().toLowerCase(),
        difficulty: level,
        question: q?.question,
        options: q?.options,
        answer: q?.answer,
        tags: q?.tags
      });
      await backResponse.save();
    }
    return {message:"Question added Successfully."}

  } catch (err) {
    console.log(err)
    return { error: "error" };
  }
}


export default storeQuestion;