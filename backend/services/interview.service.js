import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


export async function generateQuestions(topic, level, type, prevQuestions) {
    const previouslyGenerated = prevQuestions.map(q => `- ${q.question}`).join('\n');
    try {
        const model = new ChatGoogleGenerativeAI({
            model: "gemini-2.5-flash-lite",
            apiKey: process.env.GEMINI_API_KEY,
            temperature: 0.3,
            maxOutputTokens: 1024,
            maxRetries: 2,
        });

const interviewPrompt = `
You are an expert technical interviewer.

Generate exactly 5 unique and non-repetitive interview questions on the topic: "${topic}" for a software engineering intern candidate.
The difficulty level should be: "${level}".
Use ONLY the question type: "${type}" — do not mix types.

### Instructions:

- Keep the total response under 800 tokens.
- Return a valid JSON array of exactly 5 objects.
- NO markdown, NO explanations, NO intro/outro text.

### Format by Type:

If type is "mcq":
Each object must have:
{
  "type": "mcq",
  "question": "Your MCQ question?",
  "options": [
    "a) Option 1",
    "b) Option 2",
    "c) Option 3",
    "d) Option 4"
  ]
}

If type is "coding":
Each object must have:
{
  "type": "coding",
  "question": "Your coding challenge?"
}

If type is "short_answer" or "concept_based":
Each object must have:
{
  "type": "${type}",
  "question": "Your conceptual question?"
}

### Example (for type=mcq):
[
  {
    "type": "mcq",
    "question": "Which keyword is used to declare a constant in JavaScript?",
    "options": [
      "a) var",
      "b) let",
      "c) const",
      "d) static"
    ]
  },
  ...
]
`.trim();


        const response = await model.invoke(interviewPrompt);

        const cleanedResponse = response.content.trim().replace(/^```json/, '').replace(/```$/, '');  
        return cleanedResponse;
    } catch (error) {
        console.error("LangChain Gemini Error:", error);
        return { error: "Model invocation failed" };
    }
}


// export default generateQuestions;

// - Do NOT repeat or rephrase any question from this list: ${previouslyGenerated}