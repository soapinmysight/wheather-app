// this code was used to test if vector store worked (and had no connection to front end)
// this logic is now in tools.js so this code is not used anymore

// import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
// import { FaissStore } from "@langchain/community/vectorstores/faiss";


// // vector store laden
// const embeddings = new OpenAIEmbeddings({
//   model: "text-embedding-3-small"
// });

// const vectorStore = await FaissStore.load("./documents", embeddings);
// console.log("🛒vector store loaded!")

// // zoek relevante documenten
// const relevantDocs = await vectorStore.similaritySearch(`${prompt}`, 1);
// const context = relevantDocs.map(doc => doc.pageContent).join("\n\n")
// console.log("found relevant documents!")

// // vraag stellen aan chatGPT4.1
// const model = new ChatOpenAI({
//   model: process.env.OPENAI_MODEL
// });

// const response = await model.invoke(`je krijgt de volgende vraag : ${prompt}, geef het antwoord door deze tekst te lezen ${context}.`);

// console.log(response.content)