import { Command } from '../types/terminal';
import { getSystemInfo } from '../utils/system';
import { getResourceUsage, getNetworkStats, getProcessList } from '../utils/monitoring';

export const systemCommand: Command = {
  name: 'system',
  description: 'Display system information and real-time monitoring',
  usage: 'system [info|stats|processes|network|benchmark]',
  execute: async (args: string[]) => {
    const info = await getSystemInfo();
    const subcommand = args[0]?.toLowerCase() || 'info';

    switch (subcommand) {
      case 'info':
        return `
╭─ System Information ───────────────────────╮
│                                           │
│  OS          ${info.os.padEnd(27)} │
│  Browser     ${info.browser.slice(0, 25).padEnd(27)} │
│  CPU         ${info.cpu.padEnd(27)} │
│  Memory      ${info.memory.padEnd(27)} │
│  Resolution  ${info.resolution.padEnd(27)} │
│  Uptime      ${info.uptime.padEnd(27)} │
│                                           │
╰───────────────────────────────────────────╯
`;

      case 'stats': {
        const usage = await getResourceUsage();
        return `
╭─ System Statistics ──────────────────────────────╮
│                                                 │
│  CPU Usage    [${getProgressBar(usage.cpu, 20)}] ${usage.cpu.toFixed(1)}%  │
│  Memory Used  [${getProgressBar(usage.memory, 20)}] ${usage.memory.toFixed(1)}%  │
│  Disk Space   [${getProgressBar(usage.disk, 20)}] ${usage.disk.toFixed(1)}%  │
│  Load Avg     ${usage.loadAvg.map(l => l.toFixed(2)).join(', ').padEnd(33)} │
│                                                 │
╰─────────────────────────────────────────────────╯
`;
      }

      case 'processes': {
        const processes = await getProcessList();
        return `
╭─ Active Processes ───────────────────────────────╮
│  PID    CPU%   MEM%   NAME                      │
${processes.map(p => `│  ${p.pid.toString().padEnd(6)} ${p.cpu.toFixed(1).padEnd(6)} ${p.memory.toFixed(1).padEnd(6)} ${p.name.slice(0, 25).padEnd(25)} │`).join('\n')}
╰─────────────────────────────────────────────────╯
`;
      }

      case 'network': {
        const stats = await getNetworkStats();
        return `
╭─ Network Statistics ─────────────────────────────╮
│                                                 │
│  Download    ${formatSpeed(stats.download).padEnd(35)} │
│  Upload      ${formatSpeed(stats.upload).padEnd(35)} │
│  Latency     ${stats.latency.toFixed(0)}ms ${getLatencyIndicator(stats.latency).padEnd(30)} │
│  Packets     ↑${stats.packetsOut} ↓${stats.packetsIn.toString().padEnd(31)} │
│                                                 │
╰─────────────────────────────────────────────────╯
`;
      }

      case 'benchmark': {
        const results = await runBenchmark();
        return `
╭─ System Benchmark ───────────────────────────────╮
│                                                 │
│  CPU Score      ${results.cpu.toFixed(2).padEnd(33)} │
│  Memory Score   ${results.memory.toFixed(2).padEnd(33)} │
│  Disk Score     ${results.disk.toFixed(2).padEnd(33)} │
│  Network Score  ${results.network.toFixed(2).padEnd(33)} │
│                                                 │
│  Overall Rating ${results.overall.toFixed(2).padEnd(33)} │
│                                                 │
╰─────────────────────────────────────────────────╯
`;
      }

      default:
        throw new Error(`Unknown subcommand: ${subcommand}. Use: info, stats, processes, network, or benchmark`);
    }
  },
};

function getProgressBar(value: number, length: number): string {
  const filled = Math.round((value / 100) * length);
  return '█'.repeat(filled) + '░'.repeat(length - filled);
}

function formatSpeed(bytesPerSec: number): string {
  if (bytesPerSec > 1000000) return `${(bytesPerSec / 1000000).toFixed(2)} MB/s`;
  if (bytesPerSec > 1000) return `${(bytesPerSec / 1000).toFixed(2)} KB/s`;
  return `${bytesPerSec.toFixed(2)} B/s`;
}

function getLatencyIndicator(latency: number): string {
  if (latency < 50) return '🟢 Excellent';
  if (latency < 100) return '🟡 Good';
  if (latency < 200) return '🟠 Fair';
  return '🔴 Poor';
}

async function runBenchmark() {
  // Simulate benchmark calculations
  const cpu = Math.random() * 50 + 50;
  const memory = Math.random() * 40 + 60;
  const disk = Math.random() * 30 + 70;
  const network = Math.random() * 45 + 55;
  const overall = (cpu + memory + disk + network) / 4;
  
  return { cpu, memory, disk, network, overall };
}