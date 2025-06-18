import { chaosSchemas } from './schemas';

// Test function to validate schema completeness
export const validateSchemas = () => {
  const results = {};
  
  Object.entries(chaosSchemas).forEach(([key, schema]) => {
    const validation = {
      hasTitle: !!schema.title,
      hasDescription: !!schema.description,
      hasProperties: !!schema.properties && Object.keys(schema.properties).length > 0,
      requiredFields: [],
      optionalFields: [],
      conditionalFields: []
    };
    
    if (schema.properties) {
      Object.entries(schema.properties).forEach(([fieldName, fieldConfig]) => {
        if (fieldConfig.required) {
          validation.requiredFields.push(fieldName);
        } else if (fieldConfig.conditional) {
          validation.conditionalFields.push(fieldName);
        } else {
          validation.optionalFields.push(fieldName);
        }
      });
    }
    
    results[key] = validation;
  });
  
  return results;
};

// Test function to generate sample configurations
export const generateSampleConfigs = () => {
  const samples = {};
  
  Object.entries(chaosSchemas).forEach(([faultType, schema]) => {
    const config = {};
    
    // Fill in required fields with sample values
    Object.entries(schema.properties).forEach(([fieldName, fieldConfig]) => {
      if (fieldConfig.required) {
        if (fieldConfig.enum) {
          config[fieldName] = fieldConfig.enum[0];
        } else if (fieldConfig.type === 'string') {
          config[fieldName] = getSampleStringValue(fieldName);
        } else if (fieldConfig.type === 'number') {
          config[fieldName] = getSampleNumberValue(fieldName);
        } else if (fieldConfig.type === 'array') {
          config[fieldName] = getSampleArrayValue(fieldName);
        } else if (fieldConfig.type === 'object') {
          config[fieldName] = getSampleObjectValue(fieldName, fieldConfig);
        }
      }
    });
    
    samples[faultType] = config;
  });
  
  return samples;
};

const getSampleStringValue = (fieldName) => {
  const samples = {
    duration: '60s',
    timeOffset: '-10m',
    volumePath: '/tmp',
    path: '/data/*',
    device: 'eth0',
    direction: 'to',
    method: 'GET',
    body: 'error response',
    delay: '100ms',
    latency: '50ms',
    correlation: '25',
    loss: '0.1',
    rate: '1mbps'
  };
  
  return samples[fieldName] || `sample-${fieldName}`;
};

const getSampleNumberValue = (fieldName) => {
  const samples = {
    port: 8080,
    code: 500,
    percent: 50,
    workers: 2,
    load: 75,
    gracePeriod: 5,
    errno: 5,
    lun: 0,
    partition: 1,
    limit: 1000,
    buffer: 512
  };
  
  return samples[fieldName] || 1;
};

const getSampleArrayValue = (fieldName) => {
  const samples = {
    namespaces: ['default'],
    externalTargets: ['8.8.8.8'],
    patterns: ['*.example.com'],
    containerNames: ['app'],
    clockIds: ['CLOCK_REALTIME'],
    callchain: ['__x64_sys_clone']
  };
  
  return samples[fieldName] || ['sample-item'];
};

const getSampleObjectValue = (fieldName, fieldConfig) => {
  if (fieldName === 'selector') {
    return {
      namespaces: ['default']
    };
  }
  
  if (fieldName === 'labelSelectors') {
    return {
      app: 'test'
    };
  }
  
  if (fieldName === 'stressors') {
    return {
      cpu: {
        workers: 2,
        load: 50
      }
    };
  }
  
  if (fieldName === 'failKernRequest') {
    return {
      callchain: ['__x64_sys_clone'],
      failtype: 0
    };
  }
  
  // For objects with properties, create sample nested object
  if (fieldConfig.properties) {
    const obj = {};
    Object.entries(fieldConfig.properties).forEach(([key, config]) => {
      if (config.type === 'string') {
        obj[key] = getSampleStringValue(key);
      } else if (config.type === 'number') {
        obj[key] = getSampleNumberValue(key);
      }
    });
    return obj;
  }
  
  return {};
};

// Console logging for testing
if (typeof window !== 'undefined') {
  window.validateSchemas = validateSchemas;
  window.generateSampleConfigs = generateSampleConfigs;
  console.log('Chaos Mesh Configuration Builder - Test Functions Available');
  console.log('Try: validateSchemas() or generateSampleConfigs()');
}
