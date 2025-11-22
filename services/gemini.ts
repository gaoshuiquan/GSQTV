import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client with the API key from the environment variable.
// This follows the strict guideline to assume process.env.API_KEY is pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiRecommendations = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Recommend 3 movies/shows for a viewer who likes: "${query}". Return only a short string description, no markdown formatting.`,
    });
    return response.text || "No recommendations found.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to fetch AI recommendations at this time.";
  }
};