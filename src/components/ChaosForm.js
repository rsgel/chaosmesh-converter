import React, { useState, useEffect, useCallback } from 'react';
import FormField from './FormField';

const ChaosForm = ({ schema, onChange, formData }) => {
  const [data, setData] = useState(formData || {});

  // Update local state when formData prop changes
  useEffect(() => {
    setData(formData || {});
  }, [formData]);

  const handleFieldChange = useCallback((fieldName, value, path = []) => {
    setData(prevData => {
      const newData = { ...prevData };
      
      if (path.length === 0) {
        // Top-level field
        newData[fieldName] = value;
      } else {
        // Nested field
        let current = newData;
        for (let i = 0; i < path.length - 1; i++) {
          if (!current[path[i]]) {
            current[path[i]] = {};
          }
          current = current[path[i]];
        }
        
        const lastKey = path[path.length - 1];
        if (!current[lastKey]) {
          current[lastKey] = {};
        }
        current[lastKey][fieldName] = value;
      }
      
      // Notify parent component
      onChange(newData);
      return newData;
    });
  }, [onChange]);

  const shouldShowField = (fieldName, fieldConfig) => {
    if (!fieldConfig.conditional) return true;
    
    // Simple conditional logic
    const condition = fieldConfig.conditional;
    if (condition.includes('===')) {
      const [leftSide, rightSide] = condition.split(' === ');
      const fieldValue = data[leftSide.trim()];
      const expectedValue = rightSide.trim().replace(/['"]/g, '');
      return fieldValue === expectedValue;
    }
    
    return true;
  };

  const renderFields = (properties, path = []) => {
    return Object.entries(properties).map(([fieldName, fieldConfig]) => {
      if (!shouldShowField(fieldName, fieldConfig)) {
        return null;
      }

      const currentPath = [...path, fieldName];
      const fieldKey = currentPath.join('.');
      
      // Get current value from nested data
      let currentValue = data;
      for (const pathPart of currentPath) {
        currentValue = currentValue?.[pathPart];
      }

      return (
        <FormField
          key={fieldKey}
          name={fieldName}
          config={fieldConfig}
          value={currentValue}
          onChange={(value) => handleFieldChange(fieldName, value, path)}
          path={currentPath}
        />
      );
    });
  };

  return (
    <div className="chaos-form">
      <h3>Configuration</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        {renderFields(schema.properties)}
      </form>
    </div>
  );
};

export default ChaosForm;
