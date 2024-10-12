import { error } from 'console';
import fs from 'fs';
import path from 'path';

export function renameFile(currentDir, oldFilePath, newFileName) {
  const oldFileFullPath = path.join(currentDir, oldFilePath);
  const newFileFullPath = path.join(currentDir, newFileName);

  if (!fs.existsSync(oldFileFullPath)) {
    console.error('Operation failed: Source file does not exist');
    return;
  }

  if (fs.existsSync(newFileFullPath)) {
    console.error('Operation failed: New file already exists');
    return;
  }

  fs.rename(oldFileFullPath, newFileFullPath, () => {
    console.log(
      `File '${oldFilePath}' was renamed to '${newFileName}' successfully.`,
    );
  });
}
