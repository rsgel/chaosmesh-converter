import React, { useState } from 'react';

const JsonOutput = ({ jsonOutput }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const formatJson = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch (err) {
      return jsonString;
    }
  };

  return (
    <div className="json-output">
      <div className="output-header">
        <h3>JSON Output</h3>
        <div className="output-controls">
          <button
            onClick={copyToClipboard}
            className="copy-btn"
            disabled={!jsonOutput}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      
      <div className="output-sections">
        <div className="output-section">
          <h4>Minified JSON</h4>
          <div className="output-box minified">
            <pre className="json-content">
              {jsonOutput || 'Configure the form above to see the JSON output'}
            </pre>
          </div>
        </div>
        
        <div className="output-section">
          <h4>Formatted JSON</h4>
          <div className="output-box formatted">
            <pre className="json-content">
              {jsonOutput ? formatJson(jsonOutput) : 'Configure the form above to see the JSON output'}
            </pre>
          </div>
        </div>
      </div>
      
      {jsonOutput && (
        <div className="json-stats">
          <small>
            Characters: {jsonOutput.length} | 
            Size: {new Blob([jsonOutput]).size} bytes
          </small>
        </div>
      )}
    </div>
  );
};

export default JsonOutput;
