import fs from 'fs';
import path from 'path';

export function copyFile(currentDir, sourceFilePath, ...targetDirectories) {
  const sourceFullPath = path.join(currentDir, sourceFilePath);
  const targetDirectory = targetDirectories.join(' ');
  const targetFullPath = path.join(
    currentDir,
    targetDirectory,
    path.basename(sourceFilePath),
  );

  if (!fs.existsSync(sourceFullPath)) {
    console.error('Operation failed: Source file does not exist');
    return;
  }

  if (!fs.existsSync(path.join(currentDir, targetDirectory))) {
    console.error(`Target directory does not exist.`);
    return;
  } else if (
    !fs.lstatSync(path.join(currentDir, targetDirectory)).isDirectory()
  ) {
    console.error('Operation failed: Target is not a directory');
    return;
  }

  const readStream = fs.createReadStream(sourceFullPath);
  const writeStream = fs.createWriteStream(targetFullPath);

  readStream.on('error', (error) => {
    console.error('Operation failed:', error.message);
  });

  writeStream.on('error', (error) => {
    console.error('Operation failed:', error.message);
  });

  readStream.pipe(writeStream).on('finish', () => {
    console.log(
      `File '${sourceFilePath}' was copied to '${targetFullPath}' successfully.`,
    );
  });
}
