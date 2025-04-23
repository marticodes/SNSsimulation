import React, { useState } from "react";
import "./App.css";
import MetaphorPrompt from "./ver4";
import PanelLV1 from "./components/PanelLV1";
import PanelLV2 from "./components/PanelLV2";
import PanelLV3 from "./components/PanelLV3";

async function fetchLLMResponse(prompt) {
  try {
    const response = await fetch("https://your-llm-api-endpoint.com/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    return data.result; // Adjust based on your API's response structure
  } catch (error) {
    console.error("Error fetching LLM response:", error);
    return "Error connecting to the LLM.";
  }
}

function App() {
  const [selections, setSelections] = useState({
    type: null,
    order: null,
    connection: null,
  });
  const [llmResponse, setLlmResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectionChange = (key, value) => {
    setSelections(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleMetaphorSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // Create a formatted description from the form data
      const description = `In a space that feels ${formData.atmosphere}, people come together ${formData.reasonForGathering}, often connecting ${formData.connectionStyle}. They usually ${formData.durationOfParticipation}, interact through ${formData.communicationStyle}, and present themselves using ${formData.identityType}. Most people are here to ${formData.interactionGoal}, and they have the option to ${formData.participationControl}.`;

      console.log("Sending to step 2:", { description, metaphorKeyword: formData.metaphorKeyword });

      // Step 2: Convert description to attributes
      const step2Response = await fetch("http://localhost:5001/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 2,
          input: {
            description,
            metaphorKeyword: formData.metaphorKeyword
          },
          sessionId: Date.now().toString()
        }),
      });

      if (!step2Response.ok) {
        const errorText = await step2Response.text();
        throw new Error(`Error in step 2: ${step2Response.statusText}. Details: ${errorText}`);
      }

      const step2Data = await step2Response.json();
      console.log("Step 2 response:", step2Data);
      
      // Step 3: Convert attributes to features
      const step3Response = await fetch("http://localhost:5001/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 3,
          input: step2Data.attributes,
          sessionId: Date.now().toString()
        }),
      });

      if (!step3Response.ok) {
        const errorText = await step3Response.text();
        throw new Error(`Error in step 3: ${step3Response.statusText}. Details: ${errorText}`);
      }

      const step3Data = await step3Response.json();
      console.log("Step 3 response:", step3Data);
      setLlmResponse(step3Data.features);
    } catch (error) {
      console.error("Failed to process metaphor:", error);
      setLlmResponse(`An error occurred while processing your metaphor: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SNS Simulation</h1>
      </header>
      <main>
        <div className="metaphor-section">
          <MetaphorPrompt onSubmit={handleMetaphorSubmit} />
          {isLoading && (
            <div className="loading-message">
              Processing your metaphor...
            </div>
          )}
        </div>
        <div className="llm-response">
              <h3>Generated Response:</h3>
              <div className="response-content">
                {llmResponse}
              </div>
        </div>
        <div className="panels-container">
          <PanelLV1 onSelectionChange={handleSelectionChange} />
          <PanelLV2 />
          <PanelLV3 selectedConnection={selections.connection} />
        </div>
      </main>
    </div>
  );
}

export default App;
