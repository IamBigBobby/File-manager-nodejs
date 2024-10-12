import fs from 'fs';

export function listDirectoryContents(directory) {
  fs.readdir(directory, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.error('Operation failed');
      return;
    }

    const contents = files.map((file) => {
      return {
        name: file.name,
        type: file.isDirectory() ? 'Directory' : 'File',
      };
    });

    contents.sort((a, b) => {
      if (a.type === 'Directory' && b.type === 'File') return -1;
      if (a.type === 'File' && b.type === 'Directory') return 1;
      return a.name.localeCompare(b.name);
    });

    const maxNameLength = Math.max(
      ...contents.map((item) => item.name.length),
      'Name'.length,
    );

    console.log(
      'Index | Name' + ' '.repeat(maxNameLength - 'Name'.length) + ' | Type',
    );
    console.log('-'.repeat(7 + maxNameLength + 14));

    contents.forEach((item, index) => {
      console.log(
        `${index.toString().padEnd(5)} | ${item.name.padEnd(maxNameLength)} | ${item.type}`,
      );
    });
  });
}
