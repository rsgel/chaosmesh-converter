// Example configurations for testing
export const exampleConfigs = {
  NetworkChaos: {
    action: "netem",
    mode: "all",
    selector: {
      namespaces: ["default"]
    },
    netem: {
      delay: "100ms",
      loss: "0.1",
      correlation: "25"
    }
  },
  
  PodChaos: {
    action: "pod-kill",
    mode: "fixed",
    value: "1",
    selector: {
      namespaces: ["default"],
      labelSelectors: {
        app: "test"
      }
    }
  },
  
  StressChaos: {
    mode: "one",
    selector: {
      namespaces: ["default"]
    },
    duration: "60s",
    stressors: {
      cpu: {
        workers: 2,
        load: 50
      },
      memory: {
        workers: 1,
        size: "256MB"
      }
    }
  }
};
