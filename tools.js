import { createAgent, tool } from "langchain";



export const getWeather = tool(
    async ({ city }) => {
        console.log(`🔧 de weather tool wordt uitgevoerd!`)
        ///

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
        return `🔧 de getWeather tool zegt: het is vandaag ${today} `},
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



// export const rollDice = (sides) => {
//     console.log(`🔧  Ik rol een ${sides}-sided dobbelsteen!`)
//     const result = Math.floor(Math.random() * sides) +1
//     return `Ik gooide een ${result}`
// }
// rollDice(12)
