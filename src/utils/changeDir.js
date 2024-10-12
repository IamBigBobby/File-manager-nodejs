import fs from 'fs';
import path from 'path';

export function changeDir(currentDir, targetDir) {
  const newPath = path.isAbsolute(targetDir)
    ? targetDir
    : path.join(currentDir, targetDir);

  if (fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory()) {
    return newPath;
  } else {
    console.log('Operation failed: Directory does not exist or invalid path.');
    return currentDir;
  }
}
