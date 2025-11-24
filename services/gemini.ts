import { GoogleGenAI } from "@google/genai";
import { Message, GroundingChunk } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are JobFinder AI, an expert career assistant and recruiter. 
Your goal is to help users find real-time job openings across the internet.

RULES:
1. When a user asks for a job, ALWAYS use the available Google Search tool to find current openings.
2. Do not make up jobs. Only report what you find in the search results.
3. Summarize the key details of the jobs you find (Title, Company, Location, Key Requirements).
4. Be professional, encouraging, and concise.
5. The specific links to apply will be automatically handled by the system using your grounding data, so you don't need to paste raw URLs in the text unless necessary for clarity, but you should refer to the "links below".
6. Format your response with clear headings (Markdown) for each job to make it readable.
`;

export const sendMessageToGemini = async (
  history: Message[], 
  newMessage: string
): Promise<{ text: string; groundingChunks: GroundingChunk[] }> => {
  
  try {
    // Construct chat history for context, but Gemini API 'chats.create' maintains its own history if we keep the instance. 
    // Since this is a stateless request wrapper, we'll use generateContent with history simulated or just single turn for search efficiency, 
    // BUT for a chat app, maintaining history is better.
    // For this implementation, we will use a fresh chat session initialized with history to ensure context is passed correctly.
    
    const historyForModel = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }], // Enable Google Search Grounding
      },
      history: historyForModel
    });

    const result = await chat.sendMessage({
      message: newMessage
    });

    const responseText = result.text || "I found some results, please check the links below.";
    
    // Extract grounding chunks (sources)
    const groundingChunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      text: responseText,
      groundingChunks: groundingChunks
    };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};