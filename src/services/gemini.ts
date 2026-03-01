import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getTechPathAdvice(userInterests: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User interests: ${userInterests}. 
      As a Tech4all Onboarding specialist, provide a concise, encouraging, and structured tech path recommendation. 
      Include: 
      1. A recommended role (e.g., Frontend, Data Science, Product Management).
      2. Why it fits their interests.
      3. A 3-step roadmap to start.
      Keep it professional yet catchy. Use Markdown.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the multiverse right now. Please try again later!";
  }
}
