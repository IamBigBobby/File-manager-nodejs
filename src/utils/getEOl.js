import os from 'os';

export function getEOL() {
  return `Default End-Of-Line is: ${JSON.stringify(os.EOL)}`;
}