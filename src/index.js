import os from 'os';
import readline from 'readline';
import { listDirectoryContents } from './utils/showDirList.js';
import { upDir } from './utils/upDir.js';
import { changeDir } from './utils/changeDir.js';
import { catFile } from './utils/catFile.js';
import { addFile } from './utils/createEmptyFile.js';
import { renameFile } from './utils/renameFile.js';
import { copyFile } from './utils/copyFiles.js';
import { removeFile } from './utils/deleteFile.js';
import { getEOL } from './utils/getEOl.js';

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
      console.log('Operation failed: No directory provided');
    }
  } else if (command === 'cat') {
    if (args.length > 0) {
      const filePath = args.join(' ');
      catFile(currentDir, filePath);
    } else {
      console.log('Operation failed: No file path provided');
    }
  } else if (command === 'add') {
    if (args.length > 0) {
      const fileName = args.join(' ');
      addFile(currentDir, fileName);
    }
  } else if (command === 'rn') {
    if (args.length >= 2) {
      const oldFileName = args[0];
      const newFileName = args.slice(1).join(' ');
      renameFile(currentDir, oldFileName, newFileName);
    }
  } else if (command === 'cp') {
    if (args.length >= 2) {
      const [sourceFilePath, ...targetDirectory] = args;
      copyFile(currentDir, sourceFilePath, targetDirectory.join(' '));
    } else {
      console.log('Operation failed: Insufficient arguments provided');
    }
  } else if (command === 'rm') {
    if (args.length > 0) {
      const filePath = args.join(' ');
      removeFile(currentDir, filePath);
    } else {
      console.log('Operation failed: No file specified.');
    }
  } else if (command === 'os' && args[0] === '--EOL') {
    console.log(getEOL());
  }
   else {
    console.log('Invalid input');
  }

  printCurrentDirectory();
});

readLine.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});
