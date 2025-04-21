import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { OpenAI } from "openai";

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
    if (step === 2) {
      // Step 2: Convert Description to Key Attributes
      console.log("Received input for step 2:", input);
      const attributes = await generateKeyAttributes(input.description, input.metaphorKeyword);
      sessions.set(sessionId, { step: 2, attributes });
      return res.json({ attributes });
    } else if (step === 3) {
      // Step 3: Convert Attributes to Social Media Features
      const attributes = input; // Direct input from step 2
      if (!attributes) return res.status(400).json({ error: "Attributes data not found." });

      const features = await generateSocialMediaFeatures(attributes);
      sessions.delete(sessionId);
      return res.json({ features });
    } else {
      return res.status(400).json({ error: "Invalid step." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process the request: " + error.message });
  }
});

async function generateKeyAttributes(description, metaphorKeyword) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are an assistant that converts metaphor descriptions into key attributes. Always respond in valid JSON format."
        },
        { 
          role: "user", 
          content: `Given the metaphor keyword "${metaphorKeyword}" and this metaphor description: "${description}", 
          analyze it based on these attributes and return ONLY a JSON object with the following structure:
          {
            "Atmosphere": "...",
            "GatheringType": "...",
            "ConnectingEnvironment": "...",
            "TemporalEngagement": "...",
            "CommunicationFlow": "...",
            "ActorType": "...",
            "ContentOrientation": "...",
            "ParticipationControl": "..."
          }

          Consider these definitions when analyzing:
          - Atmosphere: emotional and sensory qualities of the space
          - GatheringType: reason people come together (thematic or relation-based)
          - ConnectingEnvironment: how the space facilitates connections
          - TemporalEngagement: duration and frequency of participation
          - CommunicationFlow: interaction style and patterns
          - ActorType: type of social identity individuals adopt
          - ContentOrientation: dominant focus of communication
          - ParticipationControl: extent of visibility and interaction management

          Return ONLY the JSON object, no additional text or explanation.`
        }
      ],
    });

    console.log("Key Attributes API Response:", completion.choices[0]?.message.content);

    try {
      const jsonResponse = JSON.parse(completion.choices[0]?.message.content || "{}");
      return jsonResponse;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Failed to parse GPT response as JSON. Raw response: " + completion.choices[0]?.message.content);
    }
  } catch (error) {
    console.error("Error in generateKeyAttributes:", error);
    throw error;
  }
}

async function generateSocialMediaFeatures(attributes) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "You are an assistant that maps key attributes into social media features. Format your response as a structured list with clear categories and bullet points."
        },
        { 
          role: "user", 
          content: `Based on these attributes: ${JSON.stringify(attributes)}, 
          provide social media features organized in the following format:

          LV1: Network Structure
          - Timeline: [Feed-based or Chat-based]
          - Connection Type: [Network-based or Group-based]

          LV2: Interaction Mechanisms
          - Content Type: [Text/Image/Both]
          - Commenting: [Flat/Nested]
          - Account: [Public/Private (one-way or mutual)]
          - Identity: [Real-name/Pseudonymous/Anonymous]
          - Messaging: [Details about 1:1/Group, Content types, Control, Audience]

          LV3: Advanced Features & Customization
          - Sharing: [Direct/Private]
          - Reactions: [Like/Upvote-Downvote/Expanded]
          - Ephemerality: [Content type + preview + audience settings]
          - Visibility: [Public/Specific groups/Private]
          - Discovery: [Topic-based/Popularity-based + Custom filters]
          - Networking control: [Block/Mute/Hide]
          - Privacy default: [Show all/Invite-only]
          - Community type: [Open/Closed groups]

          Make clear, specific choices based on the attributes provided.`
        }
      ],
    });

    console.log("Social Media Features API Response:", completion.choices[0]?.message.content);
    return completion.choices[0]?.message.content;
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