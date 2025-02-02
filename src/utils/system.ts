export const getSystemInfo = async () => {
  const nav = window.navigator;
  const screen = window.screen;

  return {
    name: 'user',
    os: nav.platform,
    browser: nav.userAgent,
    terminal: 'React Terminal v2.0.0',
    cpu: nav.hardwareConcurrency + ' cores',
    memory: '16GB',
    resolution: `${screen.width}x${screen.height}`,
    uptime: formatUptime(performance.now()),
  };
};

const formatUptime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
};