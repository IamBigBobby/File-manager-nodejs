import fs from 'fs';
import path from 'path';

export function catFile(currentDir, filePath) {
    const fullPath = path.isAbsolute(filePath)
        ? filePath
        : path.join(currentDir, filePath);

    const readStream = fs.createReadStream(fullPath, 'utf-8');

    readStream.on('data', (chunk) => {
        console.log(chunk);
    });

    readStream.on('error', () => {
        console.error('Operation failed');
    });

    readStream.on('end', () => {
        console.log('File reading finished.');
    });
}
