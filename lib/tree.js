#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Generates and saves a README.md with project information
 * @param {string} treeContent - The directory tree content as a string
 */
function generateReadme(treeContent) {
  const rootDir = process.cwd();
  const projectName = path.basename(rootDir);
  
  const readmeContent = `# MeowEngine Parcel

A high-performance Bullet Force Cheat Engine rebuilt with Parcel bundler for optimized performance and enhanced code organization.

## ⚠️ Disclaimer: This project is intended for educational and personal use only.

- This custom mod base was created for a Unity Web game and is **not** designed to promote or enable the creation of malicious cheats or exploits.
 
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

- **Core Structure**: Organized into modules like \`InitOperations\`\, \`PairCalculation\`, \`LoadBalancingClient\`, and \`Networking\`
- **Network Communication**: Implements websocket connections to Photon servers
- **Cryptography Layer**: Features extensive encryption/decryption methods for various data types (integers, strings, vectors, etc.)
- **Configuration Options**: Includes debug mode flags and development settings

This custom implementation allows developers to use familiar Photon-style networking patterns while running in JavaScript environments.

![image](https://github.com/user-attachments/assets/51f54ed4-5392-4802-9a7c-da952a107cb5)

## Network Patches
- Check [Patching File](https://github.com/cyberarchives/meowengine-parcel/blob/main/src/MeowEngine/Patching/Entry.js) for more details

## Project Structure

\`\`\`
${treeContent}
\`\`\`

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) package manager

### Setup

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/cyberarchives/meowengine-parcel.git
   cd meowengine-parcel
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

## Development

### Building

To build the project:

\`\`\`bash
pnpm build
\`\`\`

After building, check \`dist/meowengine.user.js\` for the built script that can be installed in userscript managers like Tampermonkey or Greasemonkey.

### Development Mode

To run in development mode with hot reloading:

\`\`\`bash
pnpm dev
\`\`\`

## Making Your Own Mod

### Key Files

- The main entry file is located at \`/src/index.js\`. This is where you can add or modify UI elements and core functionality.
- UI components can be found in the \`/src/components/\` directory.

### Getting Started with Modding

1. Begin by exploring \`/src/index.js\` which serves as the application's entry point.
2. To create new UI elements:
   - Look at [Examples.md](https://github.com/cyberarchives/meowengine-parcel/blob/main/src/Menu/Examples.md)

3. Modify existing features by editing the corresponding files in the core directory.

# Player Management System

## Overview
The MeowEngine includes a robust player management system that provides access to detailed player information across your game environment. This functionality is crucial for implementing multiplayer features, leaderboards, and player interactions.

## Accessing Players

You can retrieve all players in the current room instance using the following method:

\`\`\`javascript
function GetPlayers() {
   return MeowEngine.RoomInstance.Players;
}

const players = GetPlayers();
\`\`\`

## Player Object Structure

Each player is represented by an object containing the following properties:

| Property | Type | Description |
|----------|------|-------------|
| \`actorNr\` | Integer | Unique player identifier within the room |
| \`name\` | String | Player's display name |
| \`rank\` | Integer | Player's current ranking |
| \`kd\` | Float | Player's kill/death ratio |
| \`team\` | Integer | Team identifier (0, 1, etc.) |
| \`kills\` | Integer | Current kill count |
| \`platform\` | String | Platform identifier (e.g., "WebGLPlayer") |
| \`position\` | Object | Player's current position coordinates |
| \`rotation\` | Object | Player's current rotation values |
| \`pitch\` | Float | Player's current pitch angle |
| \`yaw\` | Float | Player's current yaw angle |
| \`health\` | Integer | Player's current health value |
| \`ping\` | Integer | Player's connection latency in ms |

## Example Output

\`\`\`javascript
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
\`\`\`

## Common Use Cases

- **Team Assignment**: Filter players by their \`team\` property
- **Leaderboards**: Sort players based on \`rank\` or \`kd\` ratio
- **Proximity Features**: Calculate distances between players using \`position\` data

### Best Practices

- Keep UI components separate from core functionality
- Use the existing SDK for network-related operations
- Test thoroughly in development mode before building
- Consider adding comments to document your modifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
`;

  fs.writeFileSync(path.join(rootDir, 'README.md'), readmeContent);
  console.log(`\n✅ README.md successfully generated!`);
}

/**
 * Checks if a file/directory is hidden (starts with a dot)
 * @param {string} filename - Name of the file/directory
 * @returns {boolean} Whether the file/directory is hidden
 */
function isHidden(filename) {
  return filename.startsWith('.');
}

/**
 * Prints a directory tree in a formatted way and returns the tree content as a string
 * @returns {string} The directory tree content
 */
function generateDirectoryTree() {
  const rootDir = process.cwd();
  const baseName = path.basename(rootDir);
  
  let treeContent = `${baseName}/`;
  const lines = [];
  
  // Get all files/directories in the root directory
  const files = fs.readdirSync(rootDir);
  
  // Filter out hidden files (except .parcelrc which we want to include)
  const filteredFiles = files.filter(file => 
    !isHidden(file) || file === '.parcelrc'
  );
  
  // Sort directories first, then files
  const sortedItems = filteredFiles.sort((a, b) => {
    const aPath = path.join(rootDir, a);
    const bPath = path.join(rootDir, b);
    
    const aIsDir = fs.statSync(aPath).isDirectory();
    const bIsDir = fs.statSync(bPath).isDirectory();
    
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;
    return a.localeCompare(b);
  });
  
  // Process each file/directory in root
  for (let i = 0; i < sortedItems.length; i++) {
    const file = sortedItems[i];
    const filePath = path.join(rootDir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();
    const isLastItem = i === sortedItems.length - 1;
    
    // Generate comment for special files
    let comment = '';
    if (file === 'components' && isDirectory) comment = ' # UI components';
    else if (file === 'Components' && isDirectory) comment = ' # UI components';
    else if (file === 'core' && isDirectory) comment = ' # Core engine functionality';
    else if (file === 'utils' && isDirectory) comment = ' # Utility functions';
    else if (file === 'Utils' && isDirectory) comment = ' # Utility functions';
    else if (file === 'index.js') comment = ' # Main entry point';
    else if (file === 'Entry.js') comment = ' # Patch listeners (Add your own patches here)';
    else if (file === 'dist' && isDirectory) comment = ' # Built files';
    else if (file === '.parcelrc') comment = ' # Parcel configuration';
    else if (file === 'package.json') comment = ' # Project dependencies and scripts';
    
    // For node_modules, just display the directory without traversing
    if (file === 'node_modules' && isDirectory) {
      const itemPrefix = isLastItem ? '└── ' : '├── ';
      lines.push(`${itemPrefix}${file}/`);
      continue;
    }
    
    // Display current item with proper formatting
    const itemPrefix = isLastItem ? '└── ' : '├── ';
    const displayName = isDirectory ? `${file}/` : file;
    lines.push(`${itemPrefix}${displayName}${comment}`);
    
    // Recursively process directories
    if (isDirectory) {
      const newPrefix = isLastItem ? '    ' : '│   ';
      traverseDirectory(filePath, newPrefix, isLastItem, 1, lines);
    }
  }
  
  treeContent += '\n' + lines.join('\n');
  console.log(treeContent);
  return treeContent;
}

/**
 * Traverses a directory and builds its structure
 * @param {string} dirPath - Path to the directory
 * @param {string} prefix - Prefix for the current line
 * @param {boolean} isLastParent - Whether parent is the last item 
 * @param {number} depth - Current depth in the tree
 * @param {Array<string>} lines - Array to collect the output lines
 */
function traverseDirectory(dirPath, prefix, isLastParent, depth, lines = []) {
  if (depth > 20) {
    // Prevent infinite recursion (just in case)
    return;
  }

  try {
    const files = fs.readdirSync(dirPath);
    
    // Filter out hidden files and directories (except .parcelrc)
    const filteredFiles = files.filter(file => 
      !isHidden(file) || file === '.parcelrc'
    );
    
    // Sort directories first, then files
    const sortedItems = filteredFiles.sort((a, b) => {
      const aPath = path.join(dirPath, a);
      const bPath = path.join(dirPath, b);
      
      const aIsDir = fs.statSync(aPath).isDirectory();
      const bIsDir = fs.statSync(bPath).isDirectory();
      
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });
    
    // Process each file/directory
    for (let i = 0; i < sortedItems.length; i++) {
      const file = sortedItems[i];
      const filePath = path.join(dirPath, file);
      const isDirectory = fs.statSync(filePath).isDirectory();
      const isLastItem = i === sortedItems.length - 1;
      
      // For node_modules, just display the directory without traversing
      if (file === 'node_modules' && isDirectory) {
        const itemPrefix = isLastItem ? '└── ' : '├── ';
        lines.push(`${prefix}${itemPrefix}${file}/`);
        continue;
      }
      
      // Print the current item
      const itemPrefix = isLastItem ? '└── ' : '├── ';
      const displayName = isDirectory ? `${file}/` : file;
      
      // Check for special files to add comments
      let comment = '';
      if (file === 'components' && isDirectory) comment = ' # UI components';
      else if (file === 'Components' && isDirectory) comment = ' # UI components';
      else if (file === 'core' && isDirectory) comment = ' # Core engine functionality';
      else if (file === 'utils' && isDirectory) comment = ' # Utility functions';
      else if (file === 'Utils' && isDirectory) comment = ' # Utility functions';
      else if (file === 'index.js') comment = ' # Main entry point';
      else if (file === 'Entry.js') comment = ' # Patch listeners (Add your own patches here)';
      else if (file === 'dist' && isDirectory) comment = ' # Built files';
      else if (file === '.parcelrc') comment = ' # Parcel configuration';
      else if (file === 'package.json') comment = ' # Project dependencies and scripts';
      
      const line = `${prefix}${itemPrefix}${displayName}${comment}`;
      lines.push(line);
    
      // If it's a directory, traverse it
      if (isDirectory) {
        const newPrefix = `${prefix}${isLastItem ? '    ' : '│   '}`;
        traverseDirectory(filePath, newPrefix, isLastItem, depth + 1, lines);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}: ${error.message}`);
  }
}

// Run the script
const treeContent = generateDirectoryTree();
generateReadme(treeContent);
