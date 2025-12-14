/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const getSystemInstruction = (contextData: string) => {
  return `You are an AI assistant for the CGIAR Multifunctional Landscapes (MFL) platform.
  You have access to the following dataset (in JSON format, newline-delimited) describing various agricultural innovations:

  ${contextData}

  The main fields in each record are:
  - "Innovation/ Technology/ Tool": Name of the solution/innovation.
  - "Type of Innovation / Technology/ Tool": Category (e.g., Technical, Socio-technical, Socio-economic).
  - "Scale": The operational scale (e.g., Community, Landscape, Multiscale, National, Plot, Farm).
  - "Production system": The agricultural context.
  - "Country": Implementation location.
  - "Challenge it was addressing": The problem the innovation addresses.
  - "Centre (s) involved": The CGIAR center(s) involved.
  - "Data collected": Information about what data was gathered.
  - "Site": Specific location details.
  - "Focal Point": Contact person for the innovation.

  Your job is to answer user questions based *strictly* on this data (RAG).
  - If a user asks for a summary, synthesize the information provided in the JSON data.
  - If a user asks about a specific country or innovation, query the JSON data provided above.
  - If the answer is not in the data, state that you don't have that information.
  - Keep answers concise and helpful. Format lists clearly.
  `;
};

const getApiKey = (): string | undefined => {
  try {
    return process.env.GEMINI_API_KEY;
  } catch (e) {
    console.warn("Accessing process.env failed");
    return undefined;
  }
};

export const sendMessageToGemini = async (
  history: { role: string; text: string }[],
  newMessage: string,
  contextData: string
): Promise<string> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return "System Error: Missing API Key.";
    }

    if (!contextData) {
      return "I'm initializing the data. Please try again in a moment.";
    }

    const ai = new GoogleGenAI({ apiKey });

    // Using gemini-3-pro-preview for complex reasoning and RAG as requested
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: getSystemInstruction(contextData),
      },
      history: history.map((h) => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I am unable to process your request at the moment.";
  }
};

export const generateInnovationSummary = async (
  filteredData: any[]
): Promise<string> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) return "AI Summary unavailable: Missing API Key.";

    const ai = new GoogleGenAI({ apiKey });

    // Convert the filtered data to a simplified string format for the prompt
    const dataContext = filteredData
      .map(
        (item) =>
          `- ${item.Innovation} (${item["Type of Innovation / Technology/ Tool"]}, ${item.Country}): ${item.Description}`
      )
      .join("\n");

    const prompt = `
            Analyze the following list of agricultural innovations and provide a concise 2-3 sentence summary.
            Focus on the dominant types of technologies, the regional distribution, and the primary production systems targeted.
            
            Data:
            ${dataContext}
        `;

    // Using gemini-2.5-flash-lite for low-latency responses as requested
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Summary Generation Error:", error);
    return "Unable to generate AI summary at this time.";
  }
};
