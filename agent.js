import { AzureChatOpenAI } from "@langchain/openai"
import { createAgent, tool } from "langchain";

console.log(process.env.AZURE_OPENAI_KEY) //check if the key is loaded correctly, should print the key in the console


const model = new AzureChatOpenAI({temperature: 0.2});

const result = await model.invoke([
  { 
    role: "user", 
    content: "Who is the enemy of He-Man?" 
  }])
console.log(result.content)