import fs from 'fs';
import path from 'path';

export function removeFile(currentDir, filePath) {
  const fullPath = path.join(currentDir, filePath);

  fs.unlink(fullPath, (error) => {
    if (error) {
      console.error('Operation failed:', error.message);
      return;
    }
    console.log(`File '${filePath}' has been removed successfully.`);
  });
}
