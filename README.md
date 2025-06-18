# Chaos Mesh Configuration Builder

When [targeting Azure Kubernetes Service resources with Azure Chaos Studio](https://learn.microsoft.com/en-us/azure/chaos-studio/chaos-studio-tutorial-aks-portal), it's a challenge to form the `jsonSpec` parameters correctly -- you need to manually construct the JSON, minify it, and remove certain fields. This is error-prone, and requires manual effort.

With this React-based web application, you can build a [Chaos Mesh](https://github.com/chaos-mesh/chaos-mesh) fault `jsonSpec` much more easily - in a user interface that does all the heavy lifting! This tool helps you create JSON configurations for various Chaos Mesh fault types without having to manually write YAML or JSON, making it perfect for chaos engineering experiments in Kubernetes environments.

## About Chaos Mesh

[Chaos Mesh](https://github.com/chaos-mesh/chaos-mesh) is a cloud-native chaos engineering platform that orchestrates chaos experiments on Kubernetes environments. It helps you test the resilience of your system by simulating various types of failures.

Azure Chaos Studio can run Chaos Mesh experiments, helping you simplify your fault injection across your resources in Azure. You can use Azure constructs (i.e. RBAC) to ensure fault injection is run safely and in an auditable way.

## Features

- **Multiple Fault Types**: Support for 8 major Chaos Mesh fault types, aligning with what Chaos Studio supports:
  - DNSChaos - Simulate DNS failures
  - HTTPChaos - Simulate HTTP request/response failures  
  - IOChaos - Simulate file system I/O failures
  - KernelChaos - Simulate kernel failures
  - NetworkChaos - Simulate network failures and delays
  - PodChaos - Simulate pod failures and operations
  - StressChaos - Simulate CPU and memory stress
  - TimeChaos - Simulate time skew and time travel

- **Dynamic Form Generation**: Automatically generates forms based on the schema definitions
- **Conditional Fields**: Shows/hides fields based on user selections (e.g., action-specific options)
- **Real-time JSON Output**: Live preview of both minified and formatted JSON
- **Input Validation**: Required field validation and type checking
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Copy to Clipboard**: Easy copying of generated JSON configurations

Read more about the [Chaos Mesh fault details](https://chaos-mesh.org/docs/simulate-pod-chaos-on-kubernetes/).

## Usage

1. **Select Fault Type**: Choose from the dropdown menu which type of chaos fault you want to configure
2. **Fill in Configuration**: Complete the form fields according to your requirements:
   - Required fields are marked with a red asterisk (*)
   - Optional fields can be left empty
   - Some fields only appear based on your selections (e.g., action-specific configurations)
3. **Review Output**: The JSON output updates in real-time as you fill in the form
4. **Copy Configuration**: Use the "Copy" button to copy the minified JSON to your clipboard

## Example Output

For a NetworkChaos configuration with network emulation:

```json
{"action":"netem","mode":"all","selector":{"namespaces":["default"]},"netem":{"delay":"100ms","loss":"0.1","correlation":"25"}}
```

## Field Types and Validation

- **Text Fields**: Basic string input with validation
- **Number Fields**: Numeric input with type validation
- **Select Dropdowns**: Predefined options for enum values
- **Array Fields**: Dynamic arrays with add/remove functionality
- **Object Fields**: Nested configuration objects
- **Key-Value Pairs**: Dynamic key-value pair input for labels and selectors

## Supported Chaos Types

### NetworkChaos
Simulate various network conditions including:
- Network delays and latency
- Packet loss
- Packet duplication
- Packet corruption
- Network partitions
- Bandwidth limitations

### PodChaos
Simulate pod-level failures:
- Pod kill operations
- Container kill operations
- Pod failure injection

### StressChaos
Create resource stress conditions:
- CPU stress testing
- Memory stress testing
- Configurable worker processes

### IOChaos
Simulate file system issues:
- I/O latency injection
- I/O fault injection
- File system corruption

### TimeChaos
Manipulate system time:
- Time offset injection
- Clock skew simulation

### HTTPChaos
Simulate HTTP-level failures:
- Response delays
- Error code injection
- Request/response manipulation

### DNSChaos
Create DNS resolution issues:
- DNS query failures
- DNS response manipulation

### KernelChaos
Inject kernel-level failures:
- System call failures
- Kernel function injection

## Configuration Schema

The application uses TypeScript-based schemas to define the structure and validation rules for each fault type. These schemas ensure:

- Proper field types and validation
- Required vs optional field marking
- Conditional field display logic
- Helpful descriptions and examples

## Developing

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chaosmesh-converter.git
cd chaosmesh-converter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

### Deployment

This application can be deployed to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Azure Static Web Apps

For GitHub Pages deployment:

```bash
npm run deploy
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Built for users of Azure Chaos Studio + Chaos Mesh, uses parameter schema from Chaos Mesh project: [index.schemas.ts](https://github.com/chaos-mesh/chaos-mesh/blob/266010dd54160b018046e4a4daf6c92254524406/ui/app/src/openapi/index.schemas.ts)
- Inspired by the need for easier configuration of jsonSpec parameters when using Azure Chaos Studio + Chaos Mesh for Azure Kubernetes Service faults
- This is a personal project for learning purposes, **not** an official Microsoft, Azure, Chaos Studio, or Chaos Mesh tool

## License

This project is licensed under the MIT License - see the LICENSE file for details.
