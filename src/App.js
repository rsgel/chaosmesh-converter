import React, { useState, useCallback } from 'react';
import './App.css';
import { chaosSchemas } from './schemas';
import ChaosForm from './components/ChaosForm';
import JsonOutput from './components/JsonOutput';

function App() {
  const [selectedFault, setSelectedFault] = useState('');
  const [formData, setFormData] = useState({});
  const [jsonOutput, setJsonOutput] = useState('');

  const handleFaultChange = useCallback((fault) => {
    setSelectedFault(fault);
    setFormData({});
    setJsonOutput('');
  }, []);
  const handleFormChange = useCallback((data) => {
    setFormData(data);
    
    // Helper function to remove empty values from the object
    const removeEmptyValues = (obj) => {
      const cleaned = {};
      
      for (const [key, value] of Object.entries(obj)) {
        if (value === null || value === undefined || value === '') {
          continue;
        }
        
        if (Array.isArray(value)) {
          const filteredArray = value.filter(item => item !== null && item !== undefined && item !== '');
          if (filteredArray.length > 0) {
            cleaned[key] = filteredArray;
          }
        } else if (typeof value === 'object' && value !== null) {
          const nestedCleaned = removeEmptyValues(value);
          if (Object.keys(nestedCleaned).length > 0) {
            cleaned[key] = nestedCleaned;
          }
        } else {
          cleaned[key] = value;
        }
      }
      
      return cleaned;
    };
      // Generate minified JSON output
    const cleanedData = removeEmptyValues(data);
    setJsonOutput(JSON.stringify(cleanedData));
  }, []);

  return (
    <div className="App">      <header className="App-header">
        <h1>Chaos Mesh Configuration Builder</h1>
        <p>Build Chaos Mesh fault configurations with an easy-to-use interface for chaos engineering experiments</p>
        <div className="header-info">
          <p>
            Create JSON configurations for <a href="https://github.com/chaos-mesh/chaos-mesh" target="_blank" rel="noopener noreferrer" className="header-link">Chaos Mesh</a> fault injections. 
            Perfect for testing Kubernetes applications resilience and integrating with Azure Chaos Studio AKS experiments.
          </p>
          <p>
            <strong>How to use:</strong> Select a fault type, configure parameters, then copy the generated JSON for use in your chaos engineering workflows or 
            <a href="https://learn.microsoft.com/en-us/azure/chaos-studio/chaos-studio-tutorial-aks-portal" target="_blank" rel="noopener noreferrer" className="header-link"> Azure Chaos Studio AKS experiments</a>.
          </p>
        </div>
      </header>
      
      <main className="App-main">
        <div className="fault-selector">
          <h2>Select Fault Type</h2>
          <select 
            value={selectedFault} 
            onChange={(e) => handleFaultChange(e.target.value)}
            className="fault-dropdown"
          >
            <option value="">-- Select a Fault Type --</option>
            {Object.entries(chaosSchemas).map(([key, schema]) => (
              <option key={key} value={key}>
                {schema.title}
              </option>
            ))}
          </select>
          
          {selectedFault && (
            <div className="fault-description">
              <p>{chaosSchemas[selectedFault].description}</p>
            </div>
          )}
        </div>

        {selectedFault && (
          <div className="content-container">
            <div className="form-container">
              <ChaosForm 
                schema={chaosSchemas[selectedFault]} 
                onChange={handleFormChange}
                formData={formData}
              />
            </div>
            
            <div className="output-container">
              <JsonOutput jsonOutput={jsonOutput} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
