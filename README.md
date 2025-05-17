# MeowEngine Parcel

A high-performance Bullet Force Cheat Engine rebuilt with Parcel bundler for optimized performance and enhanced code organization.

## Overview

MeowEngine Parcel has been completely redesigned using Parcel bundler to deliver better performance, cleaner architecture, and improved maintainability. This implementation features optimized code organization and structural improvements to facilitate ongoing development.

![image](https://github.com/user-attachments/assets/f0ef4212-b009-4ccd-bb26-5892f643c023)

## Features

- **High Performance**: Rebuilt with Parcel for faster execution and efficient bundling
- **Clean Architecture**: Improved code structure and organization
- **Enhanced Maintainability**: Better organized components for easier future development
- **User Script Ready**: Compiles directly to a userscript format for quick installation

## SDK

MeowEngine includes a custom SDK for calling "mock" functions rebuilt in JavaScript from PhotonNetwork. This SDK implements a JavaScript version of networking functionality similar to Photon Network with the following key components:

- **Core Structure**: Organized into modules like `InitOperations`, `PairCalculation`, `LoadBalancingClient`, and `Networking`
- **Network Communication**: Implements websocket connections to Photon servers
- **Cryptography Layer**: Features extensive encryption/decryption methods for various data types (integers, strings, vectors, etc.)
- **Configuration Options**: Includes debug mode flags and development settings

This custom implementation allows developers to use familiar Photon-style networking patterns while running in JavaScript environments.

![image](https://github.com/user-attachments/assets/51f54ed4-5392-4802-9a7c-da952a107cb5)

## Project Structure

```
MeowEngine Parcel/
├── dist/ # Built files
│   ├── index.js
│   └── meowengine.user.js
├── node_modules/
├── src/
│   ├── Browser/
│   │   ├── Utility/
│   │   │   └── GameUtils.js
│   │   └── GlobalTypeDefs.js
│   ├── Bullet Force/
│   │   ├── API/
│   │   │   └── Account.js
│   │   └── FairPlayAPI/
│   │       └── FairCollection.js
│   ├── Menu/
│   │   ├── Components/ # UI components
│   │   │   ├── 3DViewPort.js
│   │   │   ├── Button.js
│   │   │   ├── ButtonGroup.js
│   │   │   ├── ColorPicker.js
│   │   │   ├── ConfirmModal.js
│   │   │   ├── Console.js
│   │   │   ├── Container.js
│   │   │   ├── ContentArea.js
│   │   │   ├── Devider.js
│   │   │   ├── Dropdown.js
│   │   │   ├── DynamicListBox.js
│   │   │   ├── GameConsole.js
│   │   │   ├── Header.js
│   │   │   ├── Label.js
│   │   │   ├── Notification.js
│   │   │   ├── PanelContainer.js
│   │   │   ├── SideNav.js
│   │   │   ├── Slider.js
│   │   │   ├── Spacer.js
│   │   │   ├── Tab.js
│   │   │   ├── TextInput.js
│   │   │   ├── ToggleGroup.js
│   │   │   └── ToggleSwitch.js
│   │   └── UIManager.js
│   ├── MeowEngine/
│   │   ├── Bot/
│   │   │   └── PhotonBot.js
│   │   └── Photon/
│   │       ├── Instance/
│   │       │   └── GameSocket.js
│   │       └── protocol_reader/
│   │           ├── types/
│   │           │   ├── Array.js
│   │           │   ├── CustomData.js
│   │           │   ├── packets.js
│   │           │   ├── Quaternion.js
│   │           │   ├── Serializable.js
│   │           │   ├── SizedFloat.js
│   │           │   ├── SizedInt.js
│   │           │   ├── UnimplementedCustomData.js
│   │           │   └── Vector3.js
│   │           ├── constants.js
│   │           ├── ProtocolReader.js
│   │           └── ProtocolWriter.js
│   ├── Photon/
│   │   ├── Enums/
│   │   │   ├── DataType.js
│   │   │   ├── EventCaching.js
│   │   │   ├── EventCode.js
│   │   │   ├── InternalOperationCode.js
│   │   │   ├── OperationCode.js
│   │   │   ├── PacketType.js
│   │   │   ├── ParameterCode.js
│   │   │   └── ReceiverGroup.js
│   │   ├── Handlers/
│   │   │   └── RoomProperties.js
│   │   ├── StaticDefinitions/
│   │   │   ├── RaiseEventOptions.js
│   │   │   └── SendOptions.js
│   │   ├── Utils/ # Utility functions
│   │   │   ├── Deserializer.js
│   │   │   ├── Packet.js
│   │   │   ├── PacketBuilder.js
│   │   │   └── Serializer.js
│   │   ├── PhotonNetwork.js
│   │   └── SocketManager.js
│   └── index.js # Main entry point
├── .parcelrc # Parcel configuration
├── bundle.js
├── header.js
├── index.js
├── old.user.js
├── package.json # Project dependencies and scripts
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) package manager

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/cyberarchives/meowengine-parcel.git
   cd meowengine-parcel
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Development

### Building

To build the project:

```bash
pnpm build
```

After building, check `dist/meowengine.user.js` for the built script that can be installed in userscript managers like Tampermonkey or Greasemonkey.

### Development Mode

To run in development mode with hot reloading:

```bash
pnpm dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
