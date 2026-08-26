import express from "express"
import { callOpenAI } from "./agent.js"
import { addDocument } from "./add-document.js";

const app = express()
app.use(express.json())
app.use(express.static("public"))

app.post("/api/agent", async(req,res) => {
  const { prompt } = req.body
  const result = await callOpenAI(prompt)
  res.json({ response: result })
})

// create a new household member from frontend form data
app.post("/api/household-members", async (req, res) => {
  // get the submitted form values from the JSON request
  const { name, gender, age, wardrobe } = req.body;
  // convert the submitted age into a number
  const ageNumber = Number(age);

  try {
    // create, split, embed and save the new document
    const document = await addDocument({
      name: name.trim(),
      gender: gender.trim(),
      age: ageNumber,
      wardrobe: wardrobe.trim(),
    });
    // return response to app.js
    return res.status(201).json({
      message: `${name.trim()} is toegevoegd aan het huishouden.`,
      source: document.source,
      chunks: document.chunks,
    });
  } catch (error) {
    console.error("Document toevoegen mislukt:", error);
    // return an error without exposing technical information
    return res.status(500).json({
      error: "Het gezinslid kon niet worden opgeslagen.",
    });
  }
});

app.listen(process.env.PORT, ()=> console.log("started"))