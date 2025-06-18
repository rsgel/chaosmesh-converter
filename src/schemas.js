// Chaos Mesh Schemas for the available faults
export const chaosSchemas = {
  DNSChaos: {
    title: "DNS Chaos",
    description: "Simulate DNS failures and manipulations",
    properties: {
      action: {
        type: "string",
        enum: ["error", "random"],
        required: true,
        description: "DNS chaos action type"
      },
      mode: {
        type: "string",
        enum: ["one", "all", "fixed", "fixed-percent", "random-max-percent"],
        required: true,
        description: "Mode to run chaos action"
      },
      selector: {
        type: "object",
        required: true,
        description: "Pod selector for targeting",
        properties: {
          namespaces: {
            type: "array",
            items: { type: "string" },
            description: "Target namespaces"
          },
          labelSelectors: {
            type: "object",
            description: "Label selectors"
          }
        }
      },
      value: {
        type: "string",
        required: false,
        description: "Value for fixed/percent modes"
      },
      duration: {
        type: "string",
        required: false,
        description: "Duration of the chaos action"
      },
      patterns: {
        type: "array",
        items: { type: "string" },
        required: false,
        description: "DNS patterns to match"
      }
    }
  },

  HTTPChaos: {
    title: "HTTP Chaos",
    description: "Simulate HTTP request/response failures",
    properties: {
      mode: {
        type: "string",
        enum: ["one", "all", "fixed", "fixed-percent", "random-max-percent"],
        required: true,
        description: "Mode to run chaos action"
      },
      selector: {
        type: "object",
        required: true,
        description: "Pod selector for targeting",
        properties: {
          namespaces: {
            type: "array",
            items: { type: "string" },
            description: "Target namespaces"
          },
          labelSelectors: {
            type: "object",
            description: "Label selectors"
          }
        }
      },
      value: {
        type: "string",
        required: false,
        description: "Value for fixed/percent modes"
      },
      duration: {
        type: "string",
        required: false,
        description: "Duration of the chaos action"
      },
      port: {
        type: "number",
        required: false,
        description: "Target port"
      },
      path: {
        type: "string",
        required: false,
        description: "HTTP path pattern"
      },
      method: {
        type: "string",
        enum: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
        required: false,
        description: "HTTP method"
      },
      code: {
        type: "number",
        required: false,
        description: "HTTP response code to return"
      },
      body: {
        type: "string",
        required: false,
        description: "Response body"
      },
      delay: {
        type: "string",
        required: false,
        description: "Response delay"
      }
    }
  },

  IOChaos: {
    title: "IO Chaos",
    description: "Simulate file system I/O failures",
    properties: {
      action: {
        type: "string",
        enum: ["latency", "fault", "attrOverride", "mistake"],
        required: true,
        description: "IO chaos action type"
      },
      mode: {
        type: "string",
        enum: ["one", "all", "fixed", "fixed-percent", "random-max-percent"],
        required: true,
        description: "Mode to run chaos action"
      },
      selector: {
        type: "object",
        required: true,
        description: "Pod selector for targeting",
        properties: {
          namespaces: {
            type: "array",
            items: { type: "string" },
            description: "Target namespaces"
          },
          labelSelectors: {
            type: "object",
            description: "Label selectors"
          }
        }
      },
      value: {
        type: "string",
        required: false,
        description: "Value for fixed/percent modes"
      },
      duration: {
        type: "string",
        required: false,
        description: "Duration of the chaos action"
      },
      volumePath: {
        type: "string",
        required: true,
        description: "Volume path to affect"
      },
      path: {
        type: "string",
        required: false,
        description: "File path pattern"
      },
      percent: {
        type: "number",
        required: false,
        description: "Percentage of operations to affect"
      },
      delay: {
        type: "string",
        required: false,
        description: "IO delay"
      },
      errno: {
        type: "number",
        required: false,
        description: "Error number to return"
      }
    }
  },

  KernelChaos: {
    title: "Kernel Chaos",
    description: "Simulate kernel failures",
    properties: {
      mode: {
        type: "string",
        enum: ["one", "all", "fixed", "fixed-percent", "random-max-percent"],
        required: true,
        description: "Mode to run chaos action"
      },
      selector: {
        type: "object",
        required: true,
        description: "Pod selector for targeting",
        properties: {
          namespaces: {
            type: "array",
            items: { type: "string" },
            description: "Target namespaces"
          },
          labelSelectors: {
            type: "object",
            description: "Label selectors"
          }
        }
      },
      value: {
        type: "string",
        required: false,
        description: "Value for fixed/percent modes"
      },
      duration: {
        type: "string",
        required: false,
        description: "Duration of the chaos action"
      },
      failKernRequest: {
        type: "object",
        required: true,
        description: "Kernel request failure configuration",
        properties: {
          callchain: {
            type: "array",
            items: { type: "string" },
            description: "Call chain to inject failure"
          },
          failtype: {
            type: "number",
            description: "Failure type"
          }
        }
      }
    }
  },

  NetworkChaos: {
    title: "Network Chaos",
    description: "Simulate network failures and delays",
    properties: {
      action: {
        type: "string",
        enum: ["netem", "delay", "loss", "duplicate", "corrupt", "partition", "bandwidth"],
        required: true,
        description: "Network chaos action type"
      },
      mode: {
        type: "string",
        enum: ["one", "all", "fixed", "fixed-percent", "random-max-percent"],
        required: true,
        description: "Mode to run chaos action"
      },
      selector: {
        type: "object",
        required: true,
        description: "Pod selector for targeting",
        properties: {
          namespaces: {
            type: "array",
            items: { type: "string" },
            description: "Target namespaces"
          },
          labelSelectors: {
            type: "object",
            description: "Label selectors"
          }
        }
      },
      value: {
        type: "string",
        required: false,
        description: "Value for fixed/percent modes"
      },
      duration: {
        type: "string",
        required: false,
        description: "Duration of the chaos action"
      },
      direction: {
        type: "string",
        enum: ["to", "from", "both"],
        required: false,
        description: "Network direction"
      },
      device: {
        type: "string",
        required: false,
        description: "Network device to affect"
      },
      externalTargets: {
        type: "array",
        items: { type: "string" },
        required: false,
        description: "External network targets"
      },
      // Action-specific properties
      delay: {
        type: "object",
        required: false,
        conditional: "action === 'delay' || action === 'netem'",
        description: "Delay configuration",
        properties: {
          latency: {
            type: "string",
            description: "Network latency"
          },
          correlation: {
            type: "string",
            description: "Correlation percentage"
          },
          jitter: {
            type: "string",
            description: "Jitter"
          }
        }
      },
      loss: {
        type: "object",
        required: false,
        conditional: "action === 'loss' || action === 'netem'",
        description: "Loss configuration",
        properties: {
          loss: {
            type: "string",
            description: "Loss percentage"
          },
          correlation: {
            type: "string",
            description: "Correlation percentage"
          }
        }
      },
      duplicate: {
        type: "object",
        required: false,
        conditional: "action === 'duplicate'",
        description: "Duplicate configuration",
        properties: {
          duplicate: {
            type: "string",
            description: "Duplicate percentage"
          },
          correlation: {
            type: "string",
            description: "Correlation percentage"
          }
        }
      },
      corrupt: {
        type: "object",
        required: false,
        conditional: "action === 'corrupt'",
        description: "Corrupt configuration",
        properties: {
          corrupt: {
            type: "string",
            description: "Corrupt percentage"
          },
          correlation: {
            type: "string",
            description: "Correlation percentage"
          }
        }
      },
      bandwidth: {
        type: "object",
        required: false,
        conditional: "action === 'bandwidth'",
        description: "Bandwidth configuration",
        properties: {
          rate: {
            type: "string",
            description: "Bandwidth rate limit"
          },
          limit: {
            type: "number",
            description: "Buffer limit"
          },
          buffer: {
            type: "number",
            description: "Buffer size"
          }
        }
      },
      netem: {
        type: "object",
        required: false,
        conditional: "action === 'netem'",
        description: "Network emulation configuration",
        properties: {
          delay: {
            type: "string",
            description: "Delay"
          },
          loss: {
            type: "string",
            description: "Loss percentage"
          },
          duplicate: {
            type: "string",
            description: "Duplicate percentage"
          },
          corrupt: {
            type: "string",
            description: "Corrupt percentage"
          },
          reorder: {
            type: "string",
            description: "Reorder percentage"
          }
        }
      }
    }
  },

  PodChaos: {
    title: "Pod Chaos",
    description: "Simulate pod failures and operations",
    properties: {
      action: {
        type: "string",
        enum: ["pod-kill", "pod-failure", "container-kill"],
        required: true,
        description: "Pod chaos action type"
      },
      mode: {
        type: "string",
        enum: ["one", "all", "fixed", "fixed-percent", "random-max-percent"],
        required: true,
        description: "Mode to run chaos action"
      },
      selector: {
        type: "object",
        required: true,
        description: "Pod selector for targeting",
        properties: {
          namespaces: {
            type: "array",
            items: { type: "string" },
            description: "Target namespaces"
          },
          labelSelectors: {
            type: "object",
            description: "Label selectors"
          }
        }
      },
      value: {
        type: "string",
        required: false,
        description: "Value for fixed/percent modes"
      },
      duration: {
        type: "string",
        required: false,
        description: "Duration of the chaos action"
      },
      gracePeriod: {
        type: "number",
        required: false,
        description: "Grace period for pod termination"
      },
      containerNames: {
        type: "array",
        items: { type: "string" },
        required: false,
        description: "Target container names"
      }
    }
  },

  StressChaos: {
    title: "Stress Chaos",
    description: "Simulate CPU and memory stress",
    properties: {
      mode: {
        type: "string",
        enum: ["one", "all", "fixed", "fixed-percent", "random-max-percent"],
        required: true,
        description: "Mode to run chaos action"
      },
      selector: {
        type: "object",
        required: true,
        description: "Pod selector for targeting",
        properties: {
          namespaces: {
            type: "array",
            items: { type: "string" },
            description: "Target namespaces"
          },
          labelSelectors: {
            type: "object",
            description: "Label selectors"
          }
        }
      },
      value: {
        type: "string",
        required: false,
        description: "Value for fixed/percent modes"
      },
      duration: {
        type: "string",
        required: false,
        description: "Duration of the chaos action"
      },
      stressors: {
        type: "object",
        required: true,
        description: "Stress configuration",
        properties: {
          cpu: {
            type: "object",
            required: false,
            description: "CPU stress configuration",
            properties: {
              workers: {
                type: "number",
                description: "Number of CPU workers"
              },
              load: {
                type: "number",
                description: "CPU load percentage"
              }
            }
          },
          memory: {
            type: "object",
            required: false,
            description: "Memory stress configuration",
            properties: {
              workers: {
                type: "number",
                description: "Number of memory workers"
              },
              size: {
                type: "string",
                description: "Memory size to allocate"
              }
            }
          }
        }
      },
      containerNames: {
        type: "array",
        items: { type: "string" },
        required: false,
        description: "Target container names"
      }
    }
  },

  TimeChaos: {
    title: "Time Chaos",
    description: "Simulate time skew and time travel",
    properties: {
      mode: {
        type: "string",
        enum: ["one", "all", "fixed", "fixed-percent", "random-max-percent"],
        required: true,
        description: "Mode to run chaos action"
      },
      selector: {
        type: "object",
        required: true,
        description: "Pod selector for targeting",
        properties: {
          namespaces: {
            type: "array",
            items: { type: "string" },
            description: "Target namespaces"
          },
          labelSelectors: {
            type: "object",
            description: "Label selectors"
          }
        }
      },
      value: {
        type: "string",
        required: false,
        description: "Value for fixed/percent modes"
      },
      duration: {
        type: "string",
        required: false,
        description: "Duration of the chaos action"
      },
      timeOffset: {
        type: "string",
        required: true,
        description: "Time offset (e.g., -10m, +1h)"
      },
      clockIds: {
        type: "array",
        items: { type: "string" },
        required: false,
        description: "Clock IDs to affect"
      },
      containerNames: {
        type: "array",
        items: { type: "string" },
        required: false,
        description: "Target container names"
      }
    }
  }
};
