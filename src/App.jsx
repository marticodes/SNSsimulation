import React, { useState } from "react";
import image1 from "./assets/1.png"
import image2 from "./assets/2.png"
import image3 from "./assets/3.png"
import image4 from "./assets/4.png"

import "./App.css";

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

function PanelLV3({ isPanel1Completed }) {
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
        <h3>Community feature (for network connection type)</h3>
        <label>
          <input type="radio" name="communityFeature" disabled={!isPanel1Completed}/> Open groups (e.g., Instagram)
        </label>
        <label>
          <input type="radio" name="communityFeature" disabled={!isPanel1Completed}/> Closed groups (e.g., Facebook)
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

  const [isPanel1Completed, setIsPanel1Completed] = useState(false);
  const [previewText, setPreviewText] = useState('');
  const [type, setType] = useState(null);
  const [order, setOrder] = useState(null);
  const [connection, setConnection] = useState(null);

  const handleSelectionChange = (panel, value) => {
    if (panel === 'type') {
      setType(value);
    } else if (panel === 'order') {
      setOrder(value);
    } else if (panel === 'connection') {
      setConnection(value);
    }

    // Check if all selections are made
    if (type && order && connection) {
      setIsPanel1Completed(true);
    }
  };

  const updatePreviewText = () => {
    if (type === 'feed-based' && connection === 'network') {
      setPreviewText('1');
    } else if (type === 'feed-based' && connection === 'group') {
      setPreviewText('2');
    } else if (type === 'channel-based' && connection === 'network') {
      setPreviewText('3');
    } else if (type === 'channel-based' && connection === 'group') {
      setPreviewText('4');
    } else {
      setPreviewText('');
    }
  };

  // Update preview text whenever type, order, or connection change
  React.useEffect(() => {
    updatePreviewText();
  }, [type, order, connection]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1>SOCIAL MEDIA SIMULATOR</h1>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Panels */}
        <div className="panels">
        <PanelLV1 onSelectionChange={handleSelectionChange} />
          <PanelLV2 isPanel1Completed={isPanel1Completed} />
          <PanelLV3 isPanel1Completed={isPanel1Completed} />
        </div>

      <div className="right-sidebar">
          <div className="preview">
            <h3>Expected Layout</h3>
            <img
            src = {previewText === '1' ? image1 : previewText === '2' ? image2 : previewText === '3' ? image3 : previewText === '4' ? image4 : null}
            alt="Image Preview"
          />
          </div>
          <div className="new-component">
            <h3>New Component</h3>
              <p>
              A new component can be added to test the efficiency. Examples on new
              components are: different types of feed, like removing the feed and
              replacing it with another; making different persona accounts for
              different audiences.
            </p>
            <textarea placeholder="Explain the new feature you want to add"></textarea>
          </div>
          <div className="simulate-button">
          <button>Simulate</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;

