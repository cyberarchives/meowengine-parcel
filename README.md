# MeowEngine Parcel

A high-performance JavaScript engine rebuilt with Parcel bundler for optimized performance and enhanced code organization.

## Overview

MeowEngine Parcel has been completely redesigned using Parcel bundler to deliver better performance, cleaner architecture, and improved maintainability. This implementation features optimized code organization and structural improvements to facilitate ongoing development.

## Features

- **High Performance**: Rebuilt with Parcel for faster execution and efficient bundling
- **Clean Architecture**: Improved code structure and organization
- **Enhanced Maintainability**: Better organized components for easier future development
- **User Script Ready**: Compiles directly to a userscript format for quick installation

## Project Structure

```
MeowEngine Parcel/
├── index.js
├── meowengine.user.js # userscript
├── Browser/
│   ├── Utility/
│   │   ├── GameUtils.js
│   ├── GlobalTypeDefs.js
├── Bullet Force/
│   ├── API/
│   │   ├── Account.js
│   ├── FairPlayAPI/
│   │   └── FairCollection.js
├── Menu/
│   ├── Components/ # UI components
│   │   ├── 3DViewPort.js
│   │   ├── Button.js
│   │   ├── ButtonGroup.js
│   │   ├── ColorPicker.js
│   │   ├── ConfirmModal.js
│   │   ├── Console.js
│   │   ├── Container.js
│   │   ├── ContentArea.js
│   │   ├── Devider.js
│   │   ├── Dropdown.js
│   │   ├── DynamicListBox.js
│   │   ├── GameConsole.js
│   │   ├── Header.js
│   │   ├── Label.js
│   │   ├── Notification.js
│   │   ├── PanelContainer.js
│   │   ├── SideNav.js
│   │   ├── Slider.js
│   │   ├── Spacer.js
│   │   ├── Tab.js
│   │   ├── TextInput.js
│   │   ├── ToggleGroup.js
│   │   ├── ToggleSwitch.js
│   ├── UIManager.js
├── MeowEngine/
│   ├── Bot/
│   │   ├── PhotonBot.js
│   ├── Photon/
│   │   └── Instance/
│   │       ├── GameSocket.js
│   │   └── protocol_reader/
│   │       └── types/
│   │           ├── Array.js
│   │           ├── CustomData.js
│   │           ├── packets.js
│   │           ├── Quaternion.js
│   │           ├── Serializable.js
│   │           ├── SizedFloat.js
│   │           ├── SizedInt.js
│   │           ├── UnimplementedCustomData.js
│   │           ├── Vector3.js
│   │       └── constants.js
│   │       └── ProtocolReader.js
│   │       └── ProtocolWriter.js
├── Photon/
│   ├── Enums/
│   │   ├── DataType.js
│   │   ├── EventCaching.js
│   │   ├── EventCode.js
│   │   ├── InternalOperationCode.js
│   │   ├── OperationCode.js
│   │   ├── PacketType.js
│   │   ├── ParameterCode.js
│   │   ├── ReceiverGroup.js
│   ├── Handlers/
│   │   ├── RoomProperties.js
│   ├── StaticDefinitions/
│   │   ├── RaiseEventOptions.js
│   │   ├── SendOptions.js
│   ├── Utils/ # Utility functions
│   │   ├── Deserializer.js
│   │   ├── Packet.js
│   │   ├── PacketBuilder.js
│   │   ├── Serializer.js
│   ├── PhotonNetwork.js
│   ├── SocketManager.js
├── index.js # Main entry point
```

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) package manager

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/cyberarchives/meowengine-parcel.git
   cd meowengine-parce
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
