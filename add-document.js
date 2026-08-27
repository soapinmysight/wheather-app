import { vectorStore } from "./tools.js";
import { mkdir, writeFile } from "node:fs/promises";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// function to make a new document to hold a household members closet data
export async function addDocument({
  name,
  gender,
  age,
  wardrobe,
}) {
  // this is the folder where the document will be put
  const folder =
    "./public/originals/household-members";

  // make this folder if it does not yet exist
  await mkdir(folder, {recursive: true});
  //give every document a unique file path
  const filePath =`${folder}/household-${Date.now()}.txt`;

  // put the form data in a text template
  const documentText = `
Nieuw lid van het huishouden

Naam: ${name}
Geslacht: ${gender}
Leeftijd: ${age}

Inhoud van de kledingkast:
${wardrobe}
`;
  // make the file with the file path and document text we defined earlier
  await writeFile(
    filePath,
    documentText,
  );

  // load the text file (same as originally in create.js)
  const loader = new TextLoader(filePath);
  const docs = await loader.load();

  // split the document in chunks (same as originally in create.js)
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await textSplitter.splitDocuments(docs);

  console.log(`📁Er zijn ${chunks.length} chunks.`,);

  // add the cunks to vector store (same as originally in create.js)
  await vectorStore.addDocuments(chunks);

  console.log("📁 chunks added to vector store!",);
  await vectorStore.save("./documents");
  console.log("📁 vector store saved!",);
  console.log(`📁 Document toegevoegd: ${filePath}`,);

  // send the information back to server
  return {
    source: filePath,
    chunks: chunks.length,
  };
}