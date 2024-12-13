# Bitcoin Transaction Visualizer

A real-time 3D visualization of Bitcoin transactions using React Three Fiber and WebSocket API. This project creates an immersive experience for watching Bitcoin transactions as they happen on the blockchain.

![Running image](Images/Running_image01d.jpg)

## Features

- 🌐 Real-time transaction monitoring through blockchain.info WebSocket API
- 💰 Live Bitcoin price updates from CoinDesk API
- 🎨 Dynamic sphere colors and sizes based on transaction amounts
- 📊 Transaction history with detailed information
- 🎥 3D visualization with physics simulation
- ⚡ Built with modern React and Three.js

## Color Coding

Transaction spheres are color-coded based on their BTC amount:
- White: 0.5 BTC
- Yellow: 1 BTC
- Purple: 2.5 BTC
- Blue: 5 BTC
- Green: 10 BTC
- Orange: 25 BTC
- Gold: 50 BTC
- Red: 100 BTC

## Technologies Used

- React
- TypeScript
- Three.js
- React Three Fiber
- React Three Rapier (Physics)
- Tailwind CSS
- WebSocket API
- Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn


The application demo will be available at https://brilliant-cannoli-943c2d.netlify.app/

## Features in Detail

### Real-time Transaction Monitoring
- Connects to blockchain.info WebSocket API
- Displays new transactions as they occur
- Shows transaction amount, timestamp, and hash

### 3D Visualization
- Physics-based sphere movement
- Dynamic sphere sizing based on transaction amount
- Color-coded transactions for easy value identification
- Interactive camera controls

### Information Display
- Current Bitcoin price in USD
- Total transaction volume
- Active transaction count
- Color legend for transaction values

## License

This project is licensed under the MIT License 
## Acknowledgments

- [blockchain.info](https://blockchain.info/) for their WebSocket API
- [CoinDesk](https://www.coindesk.com/) for the Bitcoin price API
- [Three.js](https://threejs.org/) for 3D rendering capabilities
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) for React integration with Three.js


