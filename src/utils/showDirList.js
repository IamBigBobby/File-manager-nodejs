import fs from 'fs';

export function listDirectoryContents(directory) {
  fs.readdir(directory, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.error('Operation failed');
      return;
    }

    const sortedContents = files
      .map((file) => ({
        Name: file.name,
        Type: file.isDirectory() ? 'Directory' : 'File',
      }))
      .sort((a, b) => {
        if (a.Type === 'Directory' && b.Type === 'File') return -1;
        if (a.Type === 'File' && b.Type === 'Directory') return 1;
        return a.Name.localeCompare(b.Name);
      });

    console.table(sortedContents);
  });
}
