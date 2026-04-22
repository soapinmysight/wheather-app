import { AzureOpenAIEmbeddings, AzureChatOpenAI } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";


// vector store laden
const embeddings = new AzureOpenAIEmbeddings({
  temperature: 0,
  azureOpenAIApiEmbeddingsDeploymentName: process.env.AZURE_EMBEDDING_DEPLOYMENT_NAME
})
const vectorStore = await FaissStore.load("./documents", embeddings);
console.log("✅ vector store loaded!")

// zoek relevante documenten
const prompt = "When will the Gothic Design exhibition end?"

const relevantDocs = await vectorStore.similaritySearch(`${prompt}`, 1);
const context = relevantDocs.map(doc => doc.pageContent).join("\n\n")
console.log("✅ found relevant documents!")

// vraag stellen aan chatGPT4.1
const model = new AzureChatOpenAI({ temperature: 0.2 })
const response = await model.invoke(`je krijgt de volgende vraag : ${prompt}, geef het antwoord door deze tekst te lezen ${context}.`);

console.log(response.content)