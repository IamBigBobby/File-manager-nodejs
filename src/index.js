import os from 'os';
import readline from 'readline';
import { listDirectoryContents } from './utils/showDirList.js';
import { upDir } from './utils/upDir.js';
import { changeDir } from './utils/changeDir.js';
import { catFile } from './utils/catFile.js';

const userName = process.argv
  .find((arg) => arg.startsWith('--username='))
  ?.split('=')[1];

if (!userName) {
  console.error('Username is required');
  process.exit(1);
}

console.log(`Welcome to the File Manager, ${userName}!`);

let currentDir = os.homedir();

function printCurrentDirectory() {
  console.log(`You are currently in ${currentDir}`);
}

printCurrentDirectory();

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.on('line', (input) => {
  const [command, ...args] = input.trim().split(' ');

  if (command === '.exit') {
    readLine.close();
  } else if (command === 'ls') {
    listDirectoryContents(currentDir);
  } else if (command === 'up') {
    currentDir = upDir(currentDir);
  } else if (command === 'cd') {
    if (args.length > 0) {
      const targetDir = args.join(' ');
      currentDir = changeDir(currentDir, targetDir);
    } else {
      console.log("Operation failed: No directory provided");
    }
  } else if (command === 'cat') {
    if (args.length > 0) {
      const filePath = args.join(' ');
      catFile(currentDir, filePath);
    } else {
      console.log('Operation failed: No file path provided');
    }
  } else {
    console.log('Invalid input');
  }
  
  printCurrentDirectory();
});

readLine.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});
