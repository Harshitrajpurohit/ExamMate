import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export async function generateAnswer(question) {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      apiKey: process.env.GEMINI_API_KEY,
      temperature: 0.3,
      maxOutputTokens: 1024,
    });

    const answerPrompt = `
You are an intelligent examiner and educator. Depending on the type of question asked, provide an appropriate structured JSON response.

Question: "${question}"

### Instructions:
- First detect the type: conceptual, coding, MCQ, or explanation-based.
- Based on type, return **only JSON**. No additional commentary or code fencing (like \`\`\`json).
- Responses must match one of the formats below:

### If CONCEPTUAL or THEORY:
Return a JSON array of step-by-step explanation objects:
[
  {
    "step": 1,
    "explanation": "First, understand the definition of closure in JavaScript."
  },
  ...
]

### If CODING QUESTION:
Return a JSON object:
{
  "problem_statement": "Explain or restate the problem.",
  "approach": "Describe the algorithm or technique to solve it.",
  "code": "function example() { return true; }", // Use JS or language inferred
  "explanation": "Explain how this code solves the problem."
}

### If MCQ:
Return a JSON object:
{
  "question": "What is the output of ...?",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "correct_answer": "B",
  "explanation": "Explain why this is the correct choice."
}

- Keep the JSON clean and valid.
- Do not return markdown or formatting characters. Only plain JSON.
`;
    const response = await model.invoke(answerPrompt);

    const ans =  response.content.trim()
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '');
    
    const data = JSON.parse(ans)
    const temp = []
    if(data.code || data.options){
      temp.push(data);
      return temp;
    }else{
      return data;
    }
  } catch (error) {
    console.error("Gemini error:", error);
    return { error: "Model failed to generate response." };
  }
}
