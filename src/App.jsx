import React from "react";
import "./App.css";

function App() {
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
          <PanelLV1 />
          <PanelLV2 />
          <PanelLV3 />
        </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
          <div className="preview">
            <h3>Preview Option</h3>
          </div>
          <div className="new-component">
            <h3>New Component</h3>
            <textarea placeholder="Explain the new feature you want to add"></textarea>
          </div>
        </div>
      </div>

      {/* Simulate Button */}
      <div className="button-container">
        <button>Simulate</button>
      </div>
    </div>
  );
}

function PanelLV1() {
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
          <input type="radio" name="timelineType" /> Feed-based
        </label>
        <label>
          <input type="radio" name="timelineType" /> Channel-based
        </label>
      </div>

      <div className="options">
        <strong>Content Order</strong>
        <label>
          <input type="radio" name="contentOrder" /> Chronological
        </label>
        <label>
          <input type="radio" name="contentOrder" /> Algorithmic
        </label>
      </div>

      <div className="options">
        <h3>Connection type</h3>
        <label>
          <input type="radio" name="connectionType" /> Network
        </label>
        <label>
          <input type="radio" name="connectionType" /> Group
        </label>
      </div>

    </div>
  );
}

function PanelLV2() {
  return (
    <div className="panel">
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
          <input type="checkbox" /> Text
        </label>
        <label>
          <input type="checkbox" /> Image
        </label>
      </div>

      <div className="options">
        <strong>Commenting</strong>
        <label>
          <input type="radio" name="commenting" /> Nested threads
        </label>
        <label>
          <input type="radio" name="commenting" /> Flat threads
        </label>
      </div>

      <div className="options">
        <strong>Sharing</strong>
        <label>
          <input type="checkbox" /> Direct (e.g., reposts)
        </label>
        <label>
          <input type="checkbox" /> Private (e.g., messages)
        </label>
      </div>

      <div className="options">
        <strong>Reactions</strong>
        <label>
          <input type="radio" name="reactions" /> Like
        </label>
        <label>
          <input type="radio" name="reactions" /> Upvote/Downvote
        </label>
        <label>
          <input type="radio" name="reactions" /> Expanded reactions
        </label>
      </div>

      <h3>Account</h3>

      <div className="options">
        <strong>Types</strong>
        <label>
          <input type="checkbox" /> Public
        </label>
        <label>
          <input type="checkbox" /> Private (one-way)
        </label>
        <label>
          <input type="checkbox" /> Private (mutual)
        </label>
      </div>

      <div className="options">
        <strong>Identity</strong>
        <label>
          <input type="radio" name="identity" /> Real-name
        </label>
        <label>
          <input type="radio" name="identity" /> Pseudonymous
        </label>
        <label>
          <input type="radio" name="identity" /> Anonymous
        </label>
      </div>

      <h3>Messaging</h3>

      <div className="options">
        <strong>Types</strong>
        <label>
          <input type="checkbox" /> Private(1:1)
        </label>
        <label>
          <input type="checkbox" /> Group
        </label>
      </div>

      <div className="options">
        <strong>Content</strong>
        <label>
          <input type="checkbox" /> Text
        </label>
        <label>
          <input type="checkbox" /> Posts
        </label>
        <label>
          <input type="checkbox" /> Stories
        </label>
      </div>

      <div className="options">
        <strong>Content</strong>
        <label>
          <input type="checkbox" /> Edit
        </label>
        <label>
          <input type="checkbox" /> Delete
        </label>
      </div>

      <div className="options">
        <strong>Subject</strong>
        <label>
          <input type="checkbox" /> Everyone
        </label>
        <label>
          <input type="checkbox" /> Friends-only
        </label>
        <label>
          <input type="checkbox" /> Mutual connections
        </label>
      </div>

    </div>
  );
}

function PanelLV3() {
  return (
    <div className="panel">
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
          <input type="checkbox" /> Text
        </label>
        <label>
          <input type="checkbox" /> Image
        </label>
      </div>

      <div className="options">
        <strong>Content visibility</strong>
        <label>
          <input type="radio" name="contentVisibility" /> Preview
        </label>
        <label>
          <input type="radio" name="contentVisibility" /> Non-preview
        </label>
      </div>

      <div className="options">
        <strong>Audience</strong>
        <label>
          <input type="checkbox" /> Show seen users
        </label>
      </div>

      <div className="options">
        <h3>Content visibility control</h3>
        <label>
          <input type="checkbox" /> Public
        </label>
        <label>
          <input type="checkbox" /> Specific groups (e.g., close friends)
        </label>
        <label>
          <input type="checkbox" /> Private
        </label>
      </div>

      <h3>Content discovery</h3>

      <div className="options">
        <strong>Recommendations</strong>
        <label>
          <input type="checkbox" /> Topic-based suggestion
        </label>
        <label>
          <input type="checkbox" /> Popularity-based suggestion
        </label>
      </div>

      <div className="options">
        <strong>Customization</strong>
        <label>
          <input type="checkbox" /> User-defined content filters (e.g., mute keywords, hide suggested contents, ..)
        </label>
      </div>

      <div className="options">
        <h3>Networking control</h3>
        <label>
          <input type="checkbox" /> Block
        </label>
        <label>
          <input type="checkbox" /> Mute
        </label>
        <label>
          <input type="checkbox" /> Hide
        </label>
      </div>

      <div className="options">
        <h3>Privacy settings</h3>
        <label>
          <input type="radio" name="privacySettings" /> Invited contents only (e.g., Slack)
        </label>
        <label>
          <input type="radio" name="privacySettings" /> Show all (e.g., Instagram)
        </label>
      </div>

      <div className="options">
        <h3>Community feature (for network connection type)</h3>
        <label>
          <input type="radio" name="communityFeature" /> Open groups (e.g., Instagram)
        </label>
        <label>
          <input type="radio" name="communityFeature" /> Closed groups (e.g., Facebook)
        </label>
      </div>

    </div>
  );
}

export default App;

