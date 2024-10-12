import path from 'path';

export function upDir(currentDir) {
  const rootDir = currentDir.split(path.sep)[0] + path.sep;

  if (currentDir !== rootDir) {
    currentDir = path.dirname(currentDir);
  } else {
    console.log('You are already in the root dir');
  }
  return currentDir;
}
