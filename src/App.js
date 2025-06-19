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
        <h1>Chaos Mesh JSON Builder</h1>
        <div className="header-info">
          <p>
            👋 When testing your AKS apps with Azure Chaos Studio + Chaos Mesh, this tool helps you form the jsonSpec for <a href="https://github.com/chaos-mesh/chaos-mesh" target="_blank" rel="noopener noreferrer" className="header-link">Chaos Mesh</a> fault injection.
          </p>
          <p>
            <strong>ℹ️ How to use:</strong> Select a fault, configure parameters, then copy the minified JSON to use in
            <a href="https://learn.microsoft.com/en-us/azure/chaos-studio/chaos-studio-tutorial-aks-portal" target="_blank" rel="noopener noreferrer" className="header-link"> Azure Chaos Studio AKS experiments</a>.
          </p>
        </div>
      </header>

      <main className="App-main">
        <div className="fault-selector">
          <h2>Select Fault</h2>
          <p className="field-description">Choose from the 8 Chaos Mesh faults available in <a href="https://learn.microsoft.com/en-us/azure/chaos-studio/chaos-studio-fault-library#azure-kubernetes-service" target="_blank" rel="noopener noreferrer">Azure Chaos Studio</a>
          <br />
          </p>
          <select
            value={selectedFault}
            onChange={(e) => handleFaultChange(e.target.value)}
            className="fault-dropdown"
          >
            <option value="">-- Select a Fault --</option>
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
            </div>          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>
          Built by <a href="https://github.com/rsgel/chaosmesh-converter" target="_blank" rel="noopener noreferrer" className="footer-link">Rigel</a> and GitHub Copilot (personal project)
        </p>
      </footer>
    </div>
  );
}

export default App;
