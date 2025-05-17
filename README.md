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
meowengine-parcel/
├── dist/ # Built files (Not included in repo)
│   ├── index.js # Main entry point
│   └── meowengine.user.js
├── lib/
│   └── tree.js
├── node_modules/
├── src/
│   ├── Browser/
│   │   ├── Utility/
│   │   │   ├── Buffer.js
│   │   │   ├── CustomLogs.js
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
│   │   ├── Examples.md
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
│   │           │   ├── CustomDataReader.js
│   │           │   ├── packets.js
│   │           │   ├── Quaternion.js
│   │           │   ├── Serializable.js
│   │           │   ├── SizedFloat.js
│   │           │   ├── SizedInt.js
│   │           │   ├── UnimplementedCustomData.js
│   │           │   └── Vector3.js
│   │           ├── constants.js
│   │           ├── PacketBuilder.js
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
│   │   │   ├── OpCode201.js
│   │   │   └── PlayerList.js
│   │   ├── StaticDefinitions/
│   │   │   ├── RaiseEventOptions.js
│   │   │   └── SendOptions.js
│   │   ├── Utils/ # Utility functions
│   │   │   ├── Deserializer.js
│   │   │   ├── Packet.js
│   │   │   ├── PacketBuilder.js
│   │   │   └── Serializer.js
│   │   ├── HttpRequestManager.js
│   │   ├── PhotonNetwork.js
│   │   └── SocketManager.js
│   └── index.js # Main entry point
├── .parcelrc # Parcel configuration
├── bundle.js
├── header.js
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

## Making Your Own Mod

### Key Files

- The main entry file is located at `/src/index.js`. This is where you can add or modify UI elements and core functionality.
- UI components can be found in the `/src/components/` directory.

### Getting Started with Modding

1. Begin by exploring `/src/index.js` which serves as the application's entry point.
2. To create new UI elements:
   - Look at [Examples.md](https://github.com/cyberarchives/meowengine-parcel/blob/main/src/Menu/Examples.md)

3. Modify existing features by editing the corresponding files in the core directory.

# Player Management System

## Overview
The MeowEngine includes a robust player management system that provides access to detailed player information across your game environment. This functionality is crucial for implementing multiplayer features, leaderboards, and player interactions.

## Accessing Players

You can retrieve all players in the current room instance using the following method:

```javascript
function GetPlayers() {
   return MeowEngine.RoomInstance.Players;
}

const players = GetPlayers();
```

## Player Object Structure

Each player is represented by an object containing the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `actorNr` | Integer | Unique player identifier within the room |
| `name` | String | Player's display name |
| `rank` | Integer | Player's current ranking |
| `kd` | Float | Player's kill/death ratio |
| `team` | Integer | Team identifier (0, 1, etc.) |
| `kills` | Integer | Current kill count |
| `platform` | String | Platform identifier (e.g., "WebGLPlayer") |
| `position` | Object | Player's current position coordinates |
| `rotation` | Object | Player's current rotation values |
| `pitch` | Float | Player's current pitch angle |
| `yaw` | Float | Player's current yaw angle |
| `health` | Integer | Player's current health value |
| `ping` | Integer | Player's connection latency in ms |

## Example Output

```javascript
[
  {
    33: {
      actorNr: 33,
      name: "PC-howtobenon",
      rank: 16,
      kd: 0.5584825873374939,
      team: 0,
      kills: 0,
      platform: "WebGLPlayer",
      position: {},
      rotation: {},
      pitch: 0,
      yaw: 0,
      health: 0,
      ping: 0,
    },
  },
  {
    13: {
      actorNr: 13,
      name: "PC-JEIMGAM123",
      rank: 200,
      kd: 0.7697934508323669,
      team: 1,
      kills: 0,
      platform: "WebGLPlayer",
      position: {},
      rotation: {},
      pitch: 0,
      yaw: 0,
      health: 0,
      ping: 0,
    },
  },
]
```

## Common Use Cases

- **Team Assignment**: Filter players by their `team` property
- **Leaderboards**: Sort players based on `rank` or `kd` ratio
- **Proximity Features**: Calculate distances between players using `position` data

### Best Practices

- Keep UI components separate from core functionality
- Use the existing SDK for network-related operations
- Test thoroughly in development mode before building
- Consider adding comments to document your modifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
