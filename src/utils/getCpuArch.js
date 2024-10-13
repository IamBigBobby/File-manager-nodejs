export function getCpuArchitecture() {
    const architecture = process.arch;
    console.log(`CPU architecture: ${architecture}`);
}