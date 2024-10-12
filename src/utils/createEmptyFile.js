import fs from 'fs';
import path from 'path';

export function addFile(currentDir, fileName) {
  const filePath = path.join(currentDir, fileName);

  if (fs.existsSync(filePath)) {
    console.error('Operation failed: File already exists');
    return;
  }

  fs.writeFile(filePath, '', (error) => {
    if (error) {
      console.error('Operation failed:', error.message);
    } else {
      console.log(`File '${fileName}' was created successfully.`);
    }
  });
}
