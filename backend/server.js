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

// In-memory session tracking
const sessions = new Map();

app.post("/api/llm", async (req, res) => {
  const { sessionId, step, input } = req.body;

  if (!sessionId || !step || !input) {
    return res.status(400).json({ error: "Session ID, step, and input are required." });
  }

  try {
    if (step === 1) {
      // Step 1: Generate Metaphor Description
      const description = await generateMetaphorDescription(input);
      sessions.set(sessionId, { step: 1, description });
      return res.json({ description });
    } else if (step === 2) {
      // Step 2: Convert Description to Key Attributes
      const { description } = sessions.get(sessionId) || {};
      if (!description) return res.status(400).json({ error: "Session data not found." });

      const attributes = await generateKeyAttributes(description);
      sessions.set(sessionId, { step: 2, attributes });
      return res.json({ attributes });
    } else if (step === 3) {
      // Step 3: Convert Attributes to Social Media Features
      const { attributes } = sessions.get(sessionId) || {};
      if (!attributes) return res.status(400).json({ error: "Session data not found." });

      const features = await generateSocialMediaFeatures(attributes);
      sessions.delete(sessionId); // Clear session after final step
      return res.json({ features });
    } else {
      return res.status(400).json({ error: "Invalid step." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process the request." });
  }
});

// Helper Functions
async function generateMetaphorDescription(metaphorInput) {
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are an assistant that generates metaphor descriptions." },
      { role: "user", content: `This is the metaphor of social media that I want to create: ${metaphorInput}` },
      { role: "user", content: `Could you generate a metaphor description that fits into this template? 
      Metaphor Description (fill in the blanks):
      “In a space that feels [atmosphere], people come together [reason for gathering], often connecting [connection style]. 
      They usually [duration of participation], interact through [communication style], and present themselves using [identity type]. 
      Most people are here to [interaction goal], and they have the option to [control over participation/visibility].”` },
    ],
  });
  return completion.data.choices[0].message.content;
}

async function generateKeyAttributes(description) {
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are an assistant that converts metaphor descriptions into key attributes." },
      { role: "user", content: `Could you convert this metaphor description into these following key attributes? 
      Atmosphere, Gathering Type, Connecting Environment, Temporal Engagement, Communication Flow, 
      Actor Type, Content Orientation, Participation Control. Description: ${description}` },
    ],
  });
  return JSON.parse(completion.data.choices[0].message.content);
}

async function generateSocialMediaFeatures(attributes) {
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are an assistant that maps key attributes into social media features." },
      { role: "user", content: `Could you convert these attributes into the social media features format? 
      Key Attributes: ${JSON.stringify(attributes)}` },
    ],
  });
  return JSON.parse(completion.data.choices[0].message.content);
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});