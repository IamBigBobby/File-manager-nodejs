import os from 'os';

export function getEOL() {
  console.log(`Default End-Of-Line is: ${JSON.stringify(os.EOL)}`);
}
