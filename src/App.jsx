import React, { useState } from "react";
import "./App.css";
import MetaphorPrompt from "./meta-prompt";

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

function PanelLV1({ onSelectionChange }) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    onSelectionChange('type', e.target.value); // Pass the selection back to parent
  };

  const handleOrderChange = (e) => {
    setSelectedOrder(e.target.value);
    onSelectionChange('order', e.target.value); // Pass the selection back to parent
  };

  const handleConnectionChange = (e) => {
    setSelectedConnection(e.target.value);
    onSelectionChange('connection', e.target.value); // Pass the selection back to parent
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="title-and-icon">
          <h3>LV1</h3>
          <div className="info-icon">
            <span className="info-tooltip">LV0 is about... ADD</span>
            <i className="fas fa-info-circle"></i>
          </div>
        </div>
      </div>
      
      <h3>Timeline</h3>

      <div className="options">
        <strong>Types</strong>
        <label>
          <input
            type="radio"
            name="timelineType"
            value="feed-based"
            checked={selectedType === 'feed-based'}
            onChange={handleTypeChange}
          />
          Feed-based
        </label>
        <label>
          <input
            type="radio"
            name="timelineType"
            value="channel-based"
            checked={selectedType === 'channel-based'}
            onChange={handleTypeChange}
          />
          Channel-based
        </label>
      </div>

      <div className="options">
        <strong>Content Order</strong>
        <label>
          <input
            type="radio"
            name="contentOrder"
            value="chronological"
            checked={selectedOrder === 'chronological'}
            onChange={handleOrderChange}
          />
          Chronological
        </label>
        <label>
          <input
            type="radio"
            name="contentOrder"
            value="algorithmic"
            checked={selectedOrder === 'algorithmic'}
            onChange={handleOrderChange}
          />
          Algorithmic
        </label>
      </div>

      <div className="options">
        <h3>Connection type</h3>
        <label>
          <input 
            type="radio"
            name="connectionType" 
            value="network"
            checked={selectedConnection === 'network'}
            onChange={handleConnectionChange}
            /> 
          Network
        </label>
        <label>
          <input 
            type="radio" 
            name="connectionType"
            value="group"
            checked={selectedConnection === 'group'}
            onChange={handleConnectionChange} 
          /> 
          Group
        </label>
      </div>

    </div>
  );
}

function PanelLV2({ isPanel1Completed }) {
  return (
    <div className={`panel ${!isPanel1Completed ? 'disabled' : ''}`} style={{ position: 'relative' }}>
      <div className="panel-header">
        <div className="title-and-icon">
          <h3>LV2</h3>
          <div className="info-icon">
            <span className="info-tooltip">LV2 is about.....</span>
            <i className="fas fa-info-circle"></i>
          </div>
        </div>
      </div>

      <div className="options">
        <h3>Content</h3>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Text
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Image
        </label>
      </div>

      <div className="options">
        <strong>Commenting</strong>
        <label>
          <input type="radio" name="commenting" disabled={!isPanel1Completed}/> Nested threads
        </label>
        <label>
          <input type="radio" name="commenting" disabled={!isPanel1Completed}/> Flat threads
        </label>
      </div>

      <div className="options">
        <strong>Sharing</strong>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Direct (e.g., reposts)
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Private (e.g., messages)
        </label>
      </div>

      <div className="options">
        <strong>Reactions</strong>
        <label>
          <input type="radio" name="reactions" disabled={!isPanel1Completed}/> Like
        </label>
        <label>
          <input type="radio" name="reactions" disabled={!isPanel1Completed}/> Upvote/Downvote
        </label>
        <label>
          <input type="radio" name="reactions" disabled={!isPanel1Completed}/> Expanded reactions
        </label>
      </div>

      <h3>Account</h3>

      <div className="options">
        <strong>Types</strong>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Public
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Private (one-way)
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Private (mutual)
        </label>
      </div>

      <div className="options">
        <strong>Identity</strong>
        <label>
          <input type="radio" name="identity" disabled={!isPanel1Completed}/> Real-name
        </label>
        <label>
          <input type="radio" name="identity" disabled={!isPanel1Completed}/> Pseudonymous
        </label>
        <label>
          <input type="radio" name="identity" disabled={!isPanel1Completed}/> Anonymous
        </label>
      </div>

      <h3>Messaging</h3>

      <div className="options">
        <strong>Types</strong>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Private(1:1)
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Group
        </label>
      </div>

      <div className="options">
        <strong>Content</strong>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Text
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Posts
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Stories
        </label>
      </div>

      <div className="options">
        <strong>Content</strong>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Edit
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Delete
        </label>
      </div>

      <div className="options">
        <strong>Subject</strong>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Everyone
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Friends-only
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Mutual connections
        </label>
      </div>

      {!isPanel1Completed && (
        <div className="tooltip">
          <span>Please complete LV1 before proceeding to LV2.</span>
        </div>
      )}

    </div>
  );
}

function PanelLV3({ isPanel1Completed, selectedConnection }) {
  return (
    <div className={`panel ${!isPanel1Completed ? 'disabled' : ''}`} style={{ position: 'relative' }}>
      <div className="panel-header">
        <div className="title-and-icon">
          <h3>LV3</h3>
          <div className="info-icon">
            <span className="info-tooltip">L3 is about...</span>
            <i className="fas fa-info-circle"></i>
          </div>
        </div>
      </div>

      <h3>Ephemeral content</h3>

      <div className="options">
        <strong>Content Type</strong>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Text
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Image
        </label>
      </div>

      <div className="options">
        <strong>Content visibility</strong>
        <label>
          <input type="radio" name="contentVisibility" disabled={!isPanel1Completed}/> Preview
        </label>
        <label>
          <input type="radio" name="contentVisibility" disabled={!isPanel1Completed}/> Non-preview
        </label>
      </div>

      <div className="options">
        <strong>Audience</strong>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Show seen users
        </label>
      </div>

      <div className="options">
        <h3>Content visibility control</h3>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Public
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Specific groups (e.g., close friends)
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Private
        </label>
      </div>

      <h3>Content discovery</h3>

      <div className="options">
        <strong>Recommendations</strong>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Topic-based suggestion
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Popularity-based suggestion
        </label>
      </div>

      <div className="options">
        <strong>Customization</strong>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> User-defined content filters (e.g., mute keywords, hide suggested contents, ..)
        </label>
      </div>

      <div className="options">
        <h3>Networking control</h3>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Block
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Mute
        </label>
        <label>
          <input type="checkbox" disabled={!isPanel1Completed}/> Hide
        </label>
      </div>

      <div className="options">
        <h3>Privacy settings</h3>
        <label>
          <input type="radio" name="privacySettings" disabled={!isPanel1Completed}/> Invited contents only (e.g., Slack)
        </label>
        <label>
          <input type="radio" name="privacySettings" disabled={!isPanel1Completed}/> Show all (e.g., Instagram)
        </label>
      </div>

      <div className="options">
        <h3>Community feature</h3>
        <label>
          <input type="radio" name="communityFeature" disabled={selectedConnection === 'group' || !isPanel1Completed}/> Open groups (e.g., Instagram)
        </label>
        <label>
          <input type="radio" name="communityFeature" disabled={selectedConnection === 'group' || !isPanel1Completed}/> Closed groups (e.g., Facebook)
        </label>
      </div>

      {!isPanel1Completed && (
        <div className="tooltip">
          <span>Please complete LV1 before proceeding to LV3.</span>
        </div>
      )}

    </div>
  );
}

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [llmResponse, setLlmResponse] = useState("");

  const handleMetaphorSubmit = async (formData) => {
    const prompt = `Metaphor Name: ${formData.name}\n` +
      `"In a space that feels ${formData.atmosphere}, people come together ${formData.reasonForGathering}, often connecting ${formData.connectionStyle}. They usually ${formData.durationOfParticipation}, interact through ${formData.communicationStyle}, and present themselves using ${formData.identityType}. Most people are here to ${formData.interactionGoal}, and they have the option to ${formData.participationControl}."`;

    const response = await fetchLLMResponse(prompt);
    setLlmResponse(response);
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <header className="header">
          <h2>From Metaphor to SNS</h2>
        </header>

        <div className="chat-container">
          <MetaphorPrompt onSubmit={handleMetaphorSubmit} />
          <div className="chat-response">
            <p><strong>LLM:</strong> {llmResponse || "Waiting for response..."}</p>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="panels-container">
          <PanelLV1 />
          <PanelLV2/>
          <PanelLV3 />
        </div>
      </div>
    </div>
  );
}

export default App;
