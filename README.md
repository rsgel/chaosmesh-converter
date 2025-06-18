# Chaos Mesh Configuration Builder

A React-based web application for building [Chaos Mesh](https://github.com/chaos-mesh/chaos-mesh) fault configurations with an intuitive user interface. This tool helps you create JSON configurations for various Chaos Mesh fault types without having to manually write YAML or JSON, making it perfect for chaos engineering experiments in Kubernetes environments.

## About Chaos Mesh

[Chaos Mesh](https://github.com/chaos-mesh/chaos-mesh) is a cloud-native chaos engineering platform that orchestrates chaos experiments on Kubernetes environments. It helps you test the resilience of your system by simulating various types of failures.

## Azure Chaos Studio Integration

This tool generates configurations that can be used with Azure Chaos Studio's AKS (Azure Kubernetes Service) fault experiments. The generated JSON can be integrated into Azure Chaos Studio workflows for comprehensive chaos engineering testing. 

For detailed guidance on setting up AKS fault experiments in Azure Chaos Studio, see the [Microsoft Learn documentation](https://learn.microsoft.com/en-us/azure/chaos-studio/chaos-studio-tutorial-aks-portal).

## Features

- **Multiple Fault Types**: Support for 8 major Chaos Mesh fault types:
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

## Getting Started

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

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Deployment

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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built for the Chaos Mesh community
- Inspired by the need for easier chaos engineering configuration
- Uses React 19 and modern web technologies

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
