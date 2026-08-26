import { ChatOpenAI } from "@langchain/openai";
import { createAgent, tool } from "langchain";
import { getWeather, testMessage, getDate, rollDice, retrieveInfo } from "./tools.js"
import * as z from "zod";
import { MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();

const model = new ChatOpenAI({
    model: process.env.OPENAI_MODEL,
});

const agent = createAgent({
    model,
    tools: [
        getWeather,
        testMessage,
        getDate,
        rollDice,
        retrieveInfo
    ],
    checkpointer,
    systemPrompt: `You are a helpful and funny weather and clothing assistant.
    You create outfits for family members based on the weather and what they have in their closet.
Use the get_weather tool when the user asks about the current weather.
Use the retrieve tool to find out about clothing items in the closet.
Do not invent clothing that is not present in the retrieved wardrobe information.
You can ask if they happen to have common items that were not uploaded, such as a winter jacket or shoes.
Give short answers and only one outfit and one variation on that outfit. 
You can ask if the user wants another outfit option for a different occasion, but dont give it without them asking.
Be creative, style items different then they might have been intended. For example, using a button-up as a jacket.
Give the user outfits they would not come up with themselves quickly.`
});

export async function callOpenAI(prompt) {

    if (typeof prompt !== "string" || !prompt.trim()) {
        throw new Error("A prompt is required.");
    }

    console.log("callOpenAI called with:", prompt);

    const result = await agent.invoke({
        messages: [{ role: "user", content: prompt }]
    },
        { configurable: { thread_id: "1" } }
    );

    console.log(result);
    // return result;

    const finalMessage = result.messages.at(-1);
    console.log("final message:", finalMessage.content);

    return finalMessage.content;
}

//test calls to open ai:
// callOpenAI("gooi een 6-zijdige dobbelsteen. Als het resultaat lager is dan 3, haal dan het weerbericht op voor Rotterdam. Zo niet, zeg dan hoe laat het nu is. Laat me weten wat je precies gedaan hebt.")
// callOpenAI("gebruik de retrieveInfo tool om informatie op te halen over de mascotte van de Gothic Design tentoonstelling.")
