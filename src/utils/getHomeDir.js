import os from 'os';

export function getHomeDir() {
  const homeDir = os.homedir();
  console.log(`Home directory: ${homeDir}`);
}
