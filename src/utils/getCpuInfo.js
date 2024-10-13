import os from 'os';

export function getCpuInfo() {
  const cpus = os.cpus();
  const cpuCount = cpus.length;

  console.log(`Overall amount of CPUs: ${cpuCount}`);

  cpus.forEach((cpu, index) => {
    const clockSpeedGHz = (cpu.speed / 1000).toFixed(2);
    console.log(`CPU ${index + 1}: ${cpu.model}, ${clockSpeedGHz} GHz`);
  });
}
