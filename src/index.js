import os from 'os';
import readline from 'readline';

const userName = process.argv.find(arg => arg.startsWith('--username='))?.split('=')[1];

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
  output: process.stdout
});

readLine.on('line', (input) => {
  const command = input.trim();

  if (command === '.exit') {
    readLine.close();
  } else {
    console.log('Invalid input');
  }
  printCurrentDirectory();
});

readLine.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});
