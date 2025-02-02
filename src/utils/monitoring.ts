// Use browser's native performance API
const getPerformanceTime = () => {
  return window.performance.now();
};

export async function getResourceUsage() {
  // Simulate resource monitoring
  const now = getPerformanceTime();
  const sinWave = (Math.sin(now / 10000) + 1) / 2; // Creates a wave between 0 and 1
  
  return {
    cpu: 20 + sinWave * 30, // CPU usage between 20-50%
    memory: 30 + sinWave * 40, // Memory usage between 30-70%
    disk: 45 + sinWave * 25, // Disk usage between 45-70%
    loadAvg: [
      1 + sinWave * 2,
      1.5 + sinWave * 1.5,
      2 + sinWave
    ]
  };
}

export async function getNetworkStats() {
  const now = getPerformanceTime();
  const sinWave = (Math.sin(now / 10000) + 1) / 2;
  
  return {
    download: 1000000 + sinWave * 2000000, // 1-3 MB/s
    upload: 500000 + sinWave * 1000000, // 0.5-1.5 MB/s
    latency: 20 + sinWave * 180, // 20-200ms
    packetsIn: Math.floor(1000 + sinWave * 2000),
    packetsOut: Math.floor(800 + sinWave * 1600)
  };
}

export async function getProcessList() {
  const processes = [
    { pid: 1, name: 'system', cpu: 0.5, memory: 1.2 },
    { pid: 23, name: 'terminal', cpu: 2.1, memory: 4.5 },
    { pid: 45, name: 'chrome', cpu: 15.2, memory: 22.8 },
    { pid: 67, name: 'node', cpu: 5.4, memory: 8.9 },
    { pid: 89, name: 'vscode', cpu: 8.7, memory: 15.3 },
    { pid: 102, name: 'docker', cpu: 3.2, memory: 6.7 },
    { pid: 156, name: 'spotify', cpu: 1.8, memory: 4.2 },
    { pid: 189, name: 'slack', cpu: 4.3, memory: 9.1 },
    { pid: 234, name: 'discord', cpu: 2.9, memory: 7.4 },
    { pid: 567, name: 'postgres', cpu: 1.1, memory: 3.2 }
  ];

  // Add some randomization to make it look more realistic
  return processes.map(p => ({
    ...p,
    cpu: p.cpu + (Math.random() * 2 - 1),
    memory: p.memory + (Math.random() * 3 - 1.5)
  }));
}