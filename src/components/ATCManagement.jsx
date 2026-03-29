import React from 'react';
import { useTrafficControl } from '../hooks/useTrafficControl';
import { usePlanePhysics } from '../hooks/usePlanePhysics';
import Plane from './Plane';
import ControlTower from './ControlTower';
import AirportScene from './AirportScene';
import CloudLayer from './CloudLayer';
import { ShieldCheck, Radar, Sun, Moon, Cpu } from 'lucide-react';

const ATCManagement = () => {
  const { traffic, timeOfDay, brightness } = useTrafficControl();
  const version = "5.7.0";
  const planes = usePlanePhysics(traffic);

  const getTimeOfDayLabel = (tod) => {
    const map = { day: '晝間航補', sunset: '黃昏降落', night: '全天夜航', sunrise: '清晨調度' };
    return map[tod] || tod;
  };

  return (
    <div key={version} className="relative w-full min-h-screen bg-[#020802] flex flex-col items-center justify-center overflow-hidden font-mono select-none">

      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1)_0%,transparent_70%)]" />
      </div>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[400] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-[250] pointer-events-none transition-all duration-1000">
        <h1 className="text-white/10 text-[20px] tracking-[1.5em] font-black mb-1.5 ml-[1.5em]">
          霓虹航港
        </h1>
        <div className="w-[500px] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mx-auto" />
        <div className="flex items-center justify-center gap-4 mt-4">
           {brightness > 0.45 ? <Sun className="w-3.5 h-3.5 text-white/10 animate-pulse" /> : <Moon className="w-3.5 h-3.5 text-white/10 animate-pulse" />}
           <span className="text-white/5 text-[10px] tracking-[0.6em] uppercase font-bold">
             未來航港終端 &middot; {getTimeOfDayLabel(timeOfDay)}
           </span>
        </div>
      </div>

      <div className="relative w-[850px] h-[850px] flex items-center justify-center shadow-[0_0_200px_rgba(0,0,0,1)] border border-white/5 rounded-sm overflow-hidden bg-[#071107]">
          <AirportScene brightness={brightness} />
          <div className="absolute inset-0 z-40 pointer-events-none">
            {planes.map((plane) => (
              <Plane key={`${version}-${plane.id}`} plane={plane} />
            ))}
          </div>
          <ControlTower trafficState={traffic} brightness={brightness} />
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-14 z-[300]">
        <div className="flex items-center gap-10">
           <LegendItem color="#38bdf8" label="D 航道 (南下)" icon={<Radar className="w-2.5 h-2.5" />} />
           <LegendItem color="#ff4b5c" label="C 航道 (東向)" />
        </div>
        <div className="w-[1px] h-8 bg-white/5" />
        <div className="flex flex-col gap-1.5 items-end">
           <div className="flex items-center gap-3 text-[10px] text-white/20 font-black tracking-widest">
              <ShieldCheck className="w-4 h-4 text-sky-400" /> 航站終端已連接
           </div>
           <div className="flex items-center gap-3 text-[9px] text-white/10 font-bold tracking-[0.4em]">
              <Cpu className="w-3 h-3 text-sky-500 animate-pulse" /> 地面管線偵測正常
           </div>
        </div>
      </div>

      <CloudLayer brightness={brightness} />
    </div>
  );
};

const LegendItem = ({ color, label, icon }) => (
  <div className="flex items-center gap-3.5 group cursor-default">
    <div className="w-3 h-3 rounded-full flex items-center justify-center shadow-[0_0_15px_currentColor] transition-all duration-500 group-hover:scale-125 border border-current" style={{ color: color }}>
       {icon}
    </div>
    <span className="text-[10px] text-white/20 font-black tracking-widest group-hover:text-white/40 transition-colors uppercase">{label}</span>
  </div>
);

export default ATCManagement;
