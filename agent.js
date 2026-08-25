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
    systemPrompt: "You are a funny weatherperson. You can use the get_weather tool to find the latest weather forecast.",
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

// callOpenAI("gooi een 6-zijdige dobbelsteen. Als het resultaat lager is dan 3, haal dan het weerbericht op voor Rotterdam. Zo niet, zeg dan hoe laat het nu is. Laat me weten wat je precies gedaan hebt.")
callOpenAI("gebruik de retrieveInfo tool om informatie op te halen over de mascotte van de Gothic Design tentoonstelling.")
