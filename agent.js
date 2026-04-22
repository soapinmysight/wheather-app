import { AzureChatOpenAI } from "@langchain/openai"
import { createAgent, tool } from "langchain";
import { getWeather, testMessage, getDate, rollDice} from "./tools.js"
import * as z from "zod";


const model = new AzureChatOpenAI({ temperature: 0.2 });

const agent = createAgent({
    model,
    tools: [
        getWeather,
        testMessage,
        getDate,
        rollDice
    ],
    systemPrompt: "You are a funny weatherperson. You can use the get_weather tool to find the latest weather forecast.",
});

export async function callOpenAI(prompt) {
    console.log("callOpenAI called with:", prompt);

    const result = await agent.invoke({
        messages: [
            { role: "user", content: prompt }
        ],
    });

    console.log(result);
    return result;

    // const finalMessage = result.messages.at(-1);
    // console.log("final message:", finalMessage.content);

    // return finalMessage.content;
}

// callOpenAI("gooi een 12-zijdige dobbelsteen. Als het resultaat lager is dan 3, haal dan het weerbericht op voor Rotterdam. Zo niet, zeg dan hoe laat het nu is. Laat me weten wat je precies gedaan hebt.")
