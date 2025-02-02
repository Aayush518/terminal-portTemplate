import React, { useState, useEffect } from 'react';
import { GitBranch, Cpu, Boxes, Share2, Battery, Clock } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState({ level: 1, charging: false });
  const [cpuUsage, setCpuUsage] = useState(Math.random() * 30 + 20);
  const [memoryUsage, setMemoryUsage] = useState(Math.random() * 40 + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setCpuUsage(Math.random() * 30 + 20);
      setMemoryUsage(Math.random() * 40 + 30);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ('getBattery' in navigator) {
      const updateBattery = async () => {
        try {
          const bat = await (navigator as any).getBattery();
          setBattery({ level: bat.level, charging: bat.charging });
          bat.addEventListener('levelchange', () => 
            setBattery({ level: bat.level, charging: bat.charging }));
          bat.addEventListener('chargingchange', () => 
            setBattery({ level: bat.level, charging: bat.charging }));
        } catch (e) {
          console.log('Battery status not available');
        }
      };
      updateBattery();
    }
  }, []);

  return (
    <div className="sticky bottom-0 left-0 right-0 h-8 bg-gray-950/90 border-t border-emerald-900/30 flex items-center px-4 text-xs text-emerald-400 font-mono backdrop-blur-sm">
      <div className="flex items-center gap-4 overflow-hidden">
        <div className="flex items-center gap-2 min-w-fit">
          <GitBranch className="w-3.5 h-3.5" />
          <span>main</span>
        </div>
        <div className="flex items-center gap-2 min-w-fit">
          <Cpu className="w-3.5 h-3.5" />
          <span>{cpuUsage.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2 min-w-fit">
          <Boxes className="w-3.5 h-3.5" />
          <span>{memoryUsage.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2 min-w-fit">
          <Share2 className="w-3.5 h-3.5 animate-pulse" />
          <span>connected</span>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2 min-w-fit">
          <Battery className={`w-3.5 h-3.5 ${battery.charging ? 'animate-pulse' : ''}`} />
          <span>{Math.round(battery.level * 100)}%{battery.charging ? ' ⚡' : ''}</span>
        </div>
        <div className="flex items-center gap-2 min-w-fit">
          <Clock className="w-3.5 h-3.5" />
          <span>{time.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};