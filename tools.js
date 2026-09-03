import { tool } from "langchain";
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
        console.log("🔧 de dag vandaag is", today)
        return `🔧 de getDate tool zegt: het is vandaag ${today} `
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

        console.log(`🔧 Ik gooide een ${result}`)

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

// create the same embedding model used when creating the vector store (same as in load.js)
const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
});

// load the saved FAISS vector store from the documents folder (same as in load.js)
// export it so add-document.js can use the same active vector store 
export const vectorStore = await FaissStore.load(
    "./documents",
    embeddings,
);

console.log("🔧 Vector store loaded!");

//tool om informatie op te halen uit de vector store. Deze tool wordt later door het agent gebruikt om relevante informatie op te halen voor een prompt. De tool krijgt een query binnen, zoekt in de vector store naar relevante documenten en geeft deze terug als context.
export const retrieveInfo = tool(
    async ({ query }) => {
        console.log("🔧 now searching the document store for:", query)
        // search for the two most relevant document chunks (same as in load.js)
        const relevantDocs = await vectorStore.similaritySearch(query, 2)
        // log which source documents were found
        // so that you can check in Node.js if the correct document was used
        relevantDocs.forEach((doc) => {
            console.log("🔧 Found information in:", doc.metadata.source);
        });
        // combine the relevant document chunks into one context (same as in load.js)
        const context = relevantDocs.map(doc => doc.pageContent).join("\n\n")
        // return the context to the agent
        return context
    },
    {
        name: "retrieve",
        description: "Retrieve closets contents of family members",
        schema: {
            "type": "object",
            "properties": { "query": { "type": "string" } },
            "required": ["query"]
        }
    }
)

