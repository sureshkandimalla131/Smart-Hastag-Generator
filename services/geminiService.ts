
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const hashtagSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.STRING,
    description: "A relevant hashtag for the social media caption, starting with '#'."
  }
};

export const generateHashtags = async (caption: string): Promise<string[]> => {
  try {
    const prompt = `
    Analyze the following social media caption and generate a list of 15-20 relevant hashtags. 
    The hashtags should be a mix of popular, niche, and descriptive tags to maximize reach and engagement. 
    Ensure all hashtags start with '#' and contain no spaces.

    Caption: "${caption}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: hashtagSchema,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    if (Array.isArray(result) && result.every(item => typeof item === 'string')) {
      return result;
    } else {
      throw new Error("Invalid format received from API.");
    }
  } catch (error) {
    console.error("Error generating hashtags:", error);
    throw new Error("Could not connect to the AI service.");
  }
};
