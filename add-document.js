import { vectorStore } from "./tools.js";
import { mkdir, writeFile } from "node:fs/promises";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function addDocument({ name, gender, age, wardrobe }) {
  const folder = "./public/originals/household-members";

  await mkdir(folder, { recursive: true });

  const filePath = `${folder}/household-${Date.now()}.txt`;

  const documentText = `
Nieuw lid van het huishouden

Naam: ${name}
Geslacht: ${gender}
Leeftijd: ${age}

Inhoud van de kledingkast:
${wardrobe}
`;

  await writeFile(filePath, documentText);

  const loader = new TextLoader(filePath);
  const docs = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await textSplitter.splitDocuments(docs);

  await vectorStore.addDocuments(chunks);
  await vectorStore.save("./documents");

  console.log(`Document toegevoegd: ${filePath}`);

  return {
    source: filePath,
    chunks: chunks.length,
  };
}