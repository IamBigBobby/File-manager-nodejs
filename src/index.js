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
import { getCpuInfo } from './utils/getCpuInfo.js';
import { getHomeDir } from './utils/getHomeDir.js';
import { getSystemUserName } from './utils/getName.js';
import { getCpuArchitecture } from './utils/getCpuArch.js';
import { calculateHash } from './utils/calculateHash.js';
import { compressFile } from './utils/compress.js';

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
      console.error('Operation failed');
    }
  } else if (command === 'cat') {
    if (args.length > 0) {
      const filePath = args.join(' ');
      catFile(currentDir, filePath);
    } else {
      console.error('Operation failed');
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
      console.error('Operation failed');
    }
  } else if (command === 'rm') {
    if (args.length > 0) {
      const filePath = args.join(' ');
      removeFile(currentDir, filePath);
    } else {
      console.error('Operation failed');
    }
  } else if (command === 'os') {
    if (args[0] === '--EOL') {
      getEOL();
    } else if (args[0] === '--cpus') {
      getCpuInfo();
    } else if (args[0] === '--homedir') {
      getHomeDir();
    } else if (args[0] === '--username') {
      getSystemUserName();
    } else if (args[0] === '--architecture') {
      getCpuArchitecture();
    }
  } else if (command === 'hash') {
    if (args.length > 0) {
      calculateHash(currentDir, args[0]);
    } else {
      console.error('Operation failed');
    }
  } else if (command === 'compress') {
    if (args.length === 2) {
      compressFile(currentDir, args[0], args[1]);
    } else {
      console.error('Operation failed');
    }
  } else {
    console.error('Invalid input');
  }

  printCurrentDirectory();
});

readLine.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});
