import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateCelestialTribute = async (names: string, cluster: string, theme: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Imagine you are an astronomer who has discovered a new constellation named after ${names}. 
      The theme of this constellation is "${cluster}" which represents ${theme}. 
      Explain why this star pattern perfectly mirrors their marriage. 
      Use celestial metaphors (light, gravity, orbit, stardust). 
      Keep it poetic, short (under 75 words), and deeply moving.`,
      config: { temperature: 0.8 }
    });
    return response.text || "Your love is the North Star of our family—unwavering, bright, and always guiding us home.";
  } catch (error) {
    console.error("Celestial tribute error:", error);
    return "Across the vast cosmos of time, your two hearts found their perfect orbit together. Happy Anniversary!";
  }
};

export const interpretWeave = async (names: string, values: string[]): Promise<string> => {
  try {
    const valueStr = values.join(" and ");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Describe the "fabric" of a marriage between ${names} created by the weaving of these specific values: ${valueStr}. 
      Use a metaphor of high-quality fabric or a masterpiece tapestry. 
      Explain how these threads create something stronger and more beautiful than they are alone. 
      Keep it poetic and under 100 words.`,
      config: { temperature: 0.7 }
    });
    return response.text || "Your lives are woven into a tapestry of resilience and warmth. A true masterpiece of love.";
  } catch (error) {
    console.error("Weave interpretation error:", error);
    return "The threads of your lives have created a bond that is both elegant and unbreakable.";
  }
};