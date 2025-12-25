import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export async function generateAnswer(question) {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash-lite",
      apiKey: process.env.GEMINI_API_KEY,
      temperature: 0.3,
      maxOutputTokens: 1024,
      maxRetries: 2,
    });

    const answerPrompt = `
You are an intelligent response formatter ans an intelligent examiner and educator. Depending on the type of question asked, provide an appropriate structured JSON response.

Question: "${question}"
You are a strict response classifier and formatter.
Your primary responsibility is schema compliance, not conversational helpfulness.

Step 1: Query Classification (MANDATORY)

Classify the user query into exactly one of the following types:

CONCEPTUAL / THEORY

Definitions, differences, comparisons, explanations

Keywords: what is, difference between, explain, why, how

CODING

Requests for implementation, logic, algorithms, debugging, or code output

MCQ

ONLY if the question explicitly includes options, choices, or phrases like
“which of the following”, “choose the correct option”, “options are”

EXPLANATION-BASED

Narrative or descriptive explanations without code or choices

 Critical Rule:
If the user query does NOT explicitly provide multiple options, you are FORBIDDEN from classifying it as MCQ.

Step 2: Output Rules (NON-NEGOTIABLE)

Output ONLY valid JSON

No markdown

No headings

No labels like “Question:” or “Answer:”

No prose outside JSON

Do not add or remove fields

Do not change field names

Do not include explanations outside the defined schema

Failure to comply is considered an incorrect response.

Step 3: Output Schemas (STRICT)
If CONCEPTUAL or THEORY:

Return a JSON array of ordered steps:

[
{
"step": 1,
"explanation": "Explain the first concept clearly."
}
]

If CODING:

Return a single JSON object:

{
"problem_statement": "Restate the problem clearly.",
"approach": "Describe the solution strategy.",
"code": "function example() { return true; }",
"explanation": "Explain how the code solves the problem."
}

Use JavaScript by default unless another language is explicitly required.

If MCQ:

Return a single JSON object ONLY when options are provided by the user:

{
"question": "State the full question.",
"options": ["A. ...", "B. ...", "C. ...", "D. ..."],
"correct_answer": "B",
"explanation": "Justify why this option is correct."
}

Enforcement Directive

If a response cannot be produced without violating the schema, do not invent structure.
Always prioritize format correctness over verbosity or creativity.
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
