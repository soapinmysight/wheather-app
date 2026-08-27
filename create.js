// manually creates vector store, it is now done automatically in add-document.js
// so this code is not needed any more

// import { TextLoader } from "@langchain/classic/document_loaders/fs/text"
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
// import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
// import { FaissStore } from "@langchain/community/vectorstores/faiss";

// //Langchain heeft document loaders waarmee je PDF, TXT, DOCX, GITHUB, CSV, JIRA, FIGMA en allerlei andere formaten kan inladen. We gaan oefenen met een TXT file. Zorg dat je minimaal een A4 aan tekst hebt in de public map. Na het inladen splitsen we de tekst in chunks, hierbij kan je nog aanpassen hoe groot de chunks moeten zijn.
// // laad tekstbestand
// const loader = new TextLoader("./public/metnews.txt")
// const docs = await loader.load()

// // opsplitsen
// const textSplitter = new RecursiveCharacterTextSplitter({chunkSize: 1000, chunkOverlap: 200 });
// const chunks = await textSplitter.splitDocuments(docs);

// // log
// console.log(`Er zijn ${chunks.length} chunks. De eerste chunk is:`);
// console.log(chunks[0]);

// //De chunks zijn blokjes tekst die we gaan omzetten naar vectordata zodat het taalmodel er in kan zoeken. We gebruiken het OpenAI text-embedding-3-small model om tekst naar vectoren om te zetten. De data wordt opgeslagen in een tijdelijke vector store (MemoryVectorStore).
// const embeddings = new OpenAIEmbeddings({
//     model: "text-embedding-3-small"
// });

// //We kunnen nu in de vectorStore gaan zoeken naar relevante tekst voor een prompt
// // const vectorStore = new MemoryVectorStore(embeddings);
// const vectorStore = new FaissStore(embeddings, {});
// await vectorStore.addDocuments(chunks);
// console.log("🛒 vector store created!")

// //vector data opslaan
// await vectorStore.save("./documents");   // directory name
// console.log("🛒 vector store saved!")

// const prompt = "What is the Gothic Design exhibition mascot named?"
// const relevantDocs = await vectorStore.similaritySearch(prompt);
// const context = relevantDocs.map(doc => doc.pageContent).join("\n\n")

// console.log(`Found ${relevantDocs.length} relevant documents`)
// console.log(context)

// //De tekstchunk die we in de vorige stap gevonden hebben bevat een antwoord op de vraag, maar is nog niet prettig leesbaar. 
// // Dat kunnen we doen door de prompt en tekstchunk aan het taalmodel (chatGPT4.1), te geven met de instructie om er een leesbaar antwoord van te maken:
// const model = new ChatOpenAI({ model: process.env.OPENAI_MODEL })
// const response = await model.invoke(`je krijgt de volgende vraag : ${prompt}, geef het antwoord door deze tekst te lezen ${context}.`);
// console.log(response.content)