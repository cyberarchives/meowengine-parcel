import fs from 'fs';

const header = fs.readFileSync('./src/header.txt', 'utf8');
const script = fs.readFileSync('./src/index.js', 'utf8');

fs.writeFileSync('./dist/meowengine.user.js', header + script);