import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

export function calculateHash(currentDir, filePath) {
  const fullPath = path.join(currentDir, filePath);
  const hash = crypto.createHash('sha256');

  if (!fs.existsSync(fullPath)) {
    console.error('Operation failed');
    return;
  }

  const fileStream = fs.createReadStream(fullPath);
  fileStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  fileStream.on('end', () => {
    const fileHash = hash.digest('hex');
    console.log(`Hash of file '${filePath}': ${fileHash}`);
  });

  fileStream.on('error', (error) => {
    console.error('Operation failed:', error.message);
  });
}
