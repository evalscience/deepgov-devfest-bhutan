import OpenAI from "openai";
import dotenv from "dotenv";
import { fetchModelSpecs } from "./github";
import { insertResponse } from "./db/api";

dotenv.config();

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const chatStates = new Map();

export async function handleMessage(
  chatId: number,
  userId: number,
  content: string
) {
  try {
    const agents = await fetchModelSpecs();
    const agent = agents[0];
    if (!agent) {
      throw new Error("❌ No agents available.");
    }

    const systemPrompt = `
    ${agent.style}
    ${agent.constitution}
    `;

    const previousId = chatStates.get(chatId);

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content },
      ],
      previous_response_id: previousId,
      store: true,
    });

    await insertResponse(String(userId), response.id);

    // Store the response ID for future context
    chatStates.set(chatId, response.id);

    console.log(response.id);

    return response.output_text;
  } catch (error) {
    console.error("OpenAI error:", (error as Error).message);
    return "❌ Error from OpenAI.";
  }
}
