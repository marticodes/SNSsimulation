import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { OpenAI } from "openai"; // Updated to correct import

dotenv.config();

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      sessions.delete(sessionId);
      return res.json({ features });
    } else {
      return res.status(400).json({ error: "Invalid step." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process the request." });
  }
});

// Function to generate metaphor description
async function generateMetaphorDescription(metaphorInput) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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
    
    // Log the full response for debugging
    console.log("Metaphor Description API Response:", completion);

    return completion.choices[0]?.message.content;
  } catch (error) {
    console.error("Error in generateMetaphorDescription:", error);
    throw error;  // Ensure errors are passed to the caller
  }
}

async function generateKeyAttributes(description) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an assistant that converts metaphor descriptions into key attributes." },
        { role: "user", content: `Could you convert this metaphor description into these following key attributes? 
        Atmosphere, Gathering Type, Connecting Environment, Temporal Engagement, Communication Flow, 
        Actor Type, Content Orientation, Participation Control. Description: ${description}` },
      ],
    });

    // Log the full response for debugging
    console.log("Key Attributes API Response:", completion);

    return JSON.parse(completion.choices[0]?.message.content || "{}");
  } catch (error) {
    console.error("Error in generateKeyAttributes:", error);
    throw error;
  }
}

async function generateSocialMediaFeatures(attributes) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an assistant that maps key attributes into social media features." },
        { role: "user", content: `Could you convert these attributes into the social media features format? 
        Key Attributes: ${JSON.stringify(attributes)}` },
      ],
    });

    // Log the full response for debugging
    console.log("Social Media Features API Response:", completion);

    return JSON.parse(completion.choices[0]?.message.content || "{}");
  } catch (error) {
    console.error("Error in generateSocialMediaFeatures:", error);
    throw error;
  }
}

try {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} catch (error) {
  console.error("Error starting server:", error);
}