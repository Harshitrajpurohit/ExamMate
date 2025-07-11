import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

export async function generateAnswer(question) {
    try {
        
        const model = new ChatGoogleGenerativeAI({
            model: "gemini-2.0-flash",
            apiKey: process.env.GEMINI_API_KEY,
            temperature: 0.3,
            maxOutputTokens: 1024,
        });
        const answerPrompt = `You are an examiner. Answer the following question strictly in JSON format.

        Question: ${question}

        ### Instructions:
        - Return a **valid JSON array** with **not exactly 5 objects depends on question**.
        - Each object should represent a logical **step-by-step explanation**.
        - Each object must contain:
        - "step": number (1 to 10),
        - if answer is big add more data inside the steps do not increase steps more than 10.
        - "explanation": string
        - provide complete explaination about the question
        - DO NOT include any additional text or commentary outside the JSON format.
        `;

        const response = await model.invoke(answerPrompt);
        return response.content.trim().replace(/^```json/, '').replace(/```$/, '');  ;

    } catch (error) {
        return {error:"model not working"};
    }
}