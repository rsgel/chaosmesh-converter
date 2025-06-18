import React, { useState } from 'react';

const FormField = ({ name, config, value, onChange, path = [], hideLabel = false, hideDescription = false }) => {
  const [arrayValues, setArrayValues] = useState(
    Array.isArray(value) ? value : ['']
  );

  const handleInputChange = (newValue) => {
    onChange(newValue);
  };

  const handleArrayChange = (index, newValue) => {
    const newArray = [...arrayValues];
    newArray[index] = newValue;
    setArrayValues(newArray);
    
    // Filter out empty values for the final output
    const filteredArray = newArray.filter(val => val !== '');
    onChange(filteredArray);
  };

  const addArrayItem = () => {
    const newArray = [...arrayValues, ''];
    setArrayValues(newArray);
  };

  const removeArrayItem = (index) => {
    const newArray = arrayValues.filter((_, i) => i !== index);
    setArrayValues(newArray);
    
    const filteredArray = newArray.filter(val => val !== '');
    onChange(filteredArray);
  };

  const handleObjectChange = (key, newValue) => {
    const currentObject = value || {};
    const updatedObject = { ...currentObject, [key]: newValue };
    onChange(updatedObject);
  };

  const renderInput = () => {
    const fieldId = path.join('.') + '.' + name;
    const isRequired = config.required;

    if (config.enum) {
      return (
        <select
          id={fieldId}
          value={value || ''}
          onChange={(e) => handleInputChange(e.target.value)}
          className={`form-select ${isRequired ? 'required' : ''}`}
          required={isRequired}
        >
          <option value="">-- Select --</option>
          {config.enum.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (config.type === 'array') {
      return (
        <div className="array-field">
          {arrayValues.map((item, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange(index, e.target.value)}
                className="form-input"
                placeholder={`${name} item ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index)}
                className="remove-btn"
                disabled={arrayValues.length <= 1}
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addArrayItem}
            className="add-btn"
          >
            Add {name}
          </button>
        </div>
      );
    }    if (config.type === 'object' && config.properties) {
      return (
        <div className="object-field">
          <div className="object-fields">
            {Object.entries(config.properties).map(([key, subConfig]) => (
              <div key={key} className="form-group nested">
                <label htmlFor={`${fieldId}.${key}`} className="form-label">
                  {key}
                  {subConfig.required && <span className="required-asterisk">*</span>}
                </label>                <div className="nested-field-content">
                  <FormField
                    name={key}
                    config={subConfig}
                    value={value?.[key]}
                    onChange={(newValue) => handleObjectChange(key, newValue)}
                    path={[...path, name]}
                    hideLabel={true}
                    hideDescription={true}
                  />
                </div>
                {subConfig.description && (
                  <small className="field-description">{subConfig.description}</small>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (config.type === 'object' && !config.properties) {
      // Generic object input (key-value pairs)
      const objectValue = value || {};
      const entries = Object.entries(objectValue);

      return (
        <div className="key-value-field">
          {entries.map(([key, val], index) => (
            <div key={index} className="key-value-pair">
              <input
                type="text"
                placeholder="Key"
                value={key}
                onChange={(e) => {
                  const newObject = { ...objectValue };
                  delete newObject[key];
                  if (e.target.value) {
                    newObject[e.target.value] = val;
                  }
                  onChange(newObject);
                }}
                className="form-input key-input"
              />
              <input
                type="text"
                placeholder="Value"
                value={val}
                onChange={(e) => {
                  const newObject = { ...objectValue, [key]: e.target.value };
                  onChange(newObject);
                }}
                className="form-input value-input"
              />
              <button
                type="button"
                onClick={() => {
                  const newObject = { ...objectValue };
                  delete newObject[key];
                  onChange(newObject);
                }}
                className="remove-btn"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const newObject = { ...objectValue, '': '' };
              onChange(newObject);
            }}
            className="add-btn"
          >
            Add Key-Value Pair
          </button>
        </div>
      );
    }

    if (config.type === 'number') {
      return (
        <input
          id={fieldId}
          type="number"
          value={value || ''}
          onChange={(e) => handleInputChange(parseInt(e.target.value) || '')}
          className={`form-input ${isRequired ? 'required' : ''}`}
          required={isRequired}
        />
      );
    }

    // Default to text input
    return (
      <input
        id={fieldId}
        type="text"
        value={value || ''}
        onChange={(e) => handleInputChange(e.target.value)}
        className={`form-input ${isRequired ? 'required' : ''}`}
        required={isRequired}
        placeholder={config.description || `Enter ${name}`}
      />
    );
  };  return (
    <div className="form-group">
      {!hideLabel && (
        <label htmlFor={path.join('.') + '.' + name} className="form-label">
          {name}
          {config.required && <span className="required-asterisk">*</span>}
        </label>
      )}
      {renderInput()}
      {!hideDescription && config.description && (
        <small className="field-description">{config.description}</small>
      )}
    </div>
  );
};

export default FormField;
