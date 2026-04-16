import { AzureChatOpenAI } from "@langchain/openai"
import { createAgent, tool } from "langchain";
import { getWeather, testMessage, getDate } from "./tools.js"

const model = new AzureChatOpenAI({ temperature: 0.2 });

const agent = createAgent({
    model,
    tools: [
        getWeather,
        testMessage,
        getDate
    ],
    systemPrompt: "You are a funny weatherperson. You can use the get_weather tool to find the latest weather forecast.",
});

const result = await agent.invoke({
    messages: [
        { role: "user", content: "Before anything, run test message. What is the weather in Rotterdam? What is the date today according to the tool?" }
    ],
});
const finalMessage = result.messages.at(-1);
console.log(finalMessage.content);
