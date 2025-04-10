require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.post("/api/llm", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an assistant that translates metaphors into social media characteristics." },
        { role: "user", content: prompt },
      ],
    });

    const rawResponse = completion.data.choices[0].message.content;
    const characteristics = parseResponse(rawResponse);

    res.json({ characteristics });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    res.status(500).json({ error: "Failed to process the request." });
  }
});


function parseResponse(response) {
  try {
    return JSON.parse(response);
  } catch (err) {
    console.error("Failed to parse LLM response:", err);
    return {};
  }
}


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});