import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

export function compressFile(currentDir, sourceFilePath, destinationPath) {
    const sourceFullPath = path.join(currentDir, sourceFilePath);
    const destinationFullPath = path.join(currentDir, destinationPath);

    if (!fs.existsSync(sourceFullPath)) {
        console.error('Operation failed: Source file does not exist');
        return;
    }

    const brotliAlg = zlib.createBrotliCompress();
    const readStream = fs.createReadStream(sourceFullPath);
    const writeStream = fs.createWriteStream(destinationFullPath);

    readStream.on('error', (error) => {
        console.error('Operation failed:', error.message);
    });

    writeStream.on('error', (error) => {
        console.error('Operation failed:', error.message);
    });

    writeStream.on('finish', () => {
        console.log(`File '${sourceFilePath}' was compressed to '${destinationPath}' successfully.`);
    });

    readStream.pipe(brotliAlg).pipe(writeStream);
}
