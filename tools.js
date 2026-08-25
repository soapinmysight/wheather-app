import { createAgent, tool } from "langchain";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";


//tool to get the weather for a given city using the OpenWeatherMap API. The tool takes a city name as input and returns the current temperature in that city. Make sure to set your OpenWeatherMap API key in the environment variable MY_WEATHER_KEY before using this tool.
export const getWeather = tool(
    async ({ city }) => {
        console.log(`🔧 de weather tool wordt uitgevoerd!`)
        const apiKey = process.env.MY_WEATHER_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(`🔧 ${data.main.temp}°C`);

        return `🔧 de getWeather tool zegt: It's ${data.main.temp} in ${city}!`
    },
    {
        name: "get_weather",
        description: "Get the weather for a given city",
        schema: {
            type: "object",
            properties: {
                city: { type: "string" },
            },
            required: ["city"],
        },
    },
);

//tool to test if the tool system works
export const testMessage = tool(
    async () => {
        console.log(`🔧 de test wordt uitgevoerd!`)
        return `🔧 de getWeather tool zegt: hallo world`
    },
    {
        name: "get_test",
        description: "Test message without parameters",
        schema: {
            type: "object",
            properties: {},
            required: [],
        },
    },
);

//tool to get the current date
export const getDate = tool(
    async () => {
        console.log(`🔧 de getDate tool wordt uitgevoerd!`)
        const today = new Date();
        const readableDate = today.toLocaleDateString("nl-NL", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        console.log(today)
        return `🔧 de getWeather tool zegt: het is vandaag ${today} `
    },
    {
        name: "get_date",
        description: "getting the date",
        schema: {
            type: "object",
            properties: {},
            required: [],
        },
    },
);

//tool to roll a dice
export const rollDice = tool(
    ({ sides }) => {

        console.log(`🔧  Ik rol een ${sides}-sided dobbelsteen!`)

        const result = Math.floor(Math.random() * sides) + 1
        return `Ik gooide een ${result}`

    },
    {
        name: "roll_Dice",
        description: "rolling the dice...",
         schema: {
            type: "object",
            properties: {
                sides: { type: "number" },
            },
            required: ["sides"],
        },
    },
);


//tool om informatie op te halen uit de vector store. Deze tool wordt later door het agent gebruikt om relevante informatie op te halen voor een prompt. De tool krijgt een query binnen, zoekt in de vector store naar relevante documenten en geeft deze terug als context.
const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small"
});

const vectorStore = await FaissStore.load("./documents", embeddings);
console.log("✅ vector store loaded!")

export const retrieveInfo = tool(
  async ({ query }) => {
    console.log("🔧 now searching the document store")
    const relevantDocs = await vectorStore.similaritySearch(query, 2)
    const context = relevantDocs.map(doc => doc.pageContent).join("\n\n")
    return context
  },
  {
    name: "retrieve",
    description: "Retrieve information related to recent events in the met museum",
    schema: {
        "type": "object",
        "properties": { "query": { "type": "string" } },
        "required": ["query"]
    }
  }
)

