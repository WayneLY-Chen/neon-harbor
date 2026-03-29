import React from 'react';

const ControlTower = ({ trafficState, brightness }) => {
  const isNS = trafficState.ns !== 'red';
  const color = isNS ?
    (trafficState.ns === 'green' ? '#10b981' : '#f59e0b') :
    (trafficState.ew === 'green' ? '#10b981' : (trafficState.ew === 'amber' ? '#f59e0b' : '#f43f5e'));

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] pointer-events-none flex items-center justify-center">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0f172a] rounded-full border border-white/5 shadow-2xl" />
        <div
          className="w-4 h-4 rounded-full blur-[0.2px] transition-all duration-[600ms] shadow-2xl"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 ${brightness < 0.4 ? '40px' : '20px'} ${color}`
          }}
        />
        <div
          className="absolute inset-[-150px] pointer-events-none opacity-20 animate-beam-rotate"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, transparent 175deg, rgba(56, 189, 248, 0.4) 180deg, transparent 185deg, transparent 360deg)`,
            filter: 'blur(10px)',
          }}
        />
      </div>

      <div className="absolute top-[-95px] left-[-95px] w-4 h-4 rounded-full bg-slate-900 border border-white/10" style={{ backgroundColor: trafficState.ew === 'green' ? '#10b981' : '#ef4444', boxShadow: `0 0 10px ${trafficState.ew === 'green' ? '#10b981' : '#ef4444'}` }} />
      <div className="absolute top-[-95px] right-[-95px] w-4 h-4 rounded-full bg-slate-900 border border-white/10" style={{ backgroundColor: trafficState.ns === 'green' ? '#10b981' : '#ef4444', boxShadow: `0 0 10px ${trafficState.ns === 'green' ? '#10b981' : '#ef4444'}` }} />
      <div className="absolute bottom-[-95px] left-[-95px] w-4 h-4 rounded-full bg-slate-900 border border-white/10" style={{ backgroundColor: trafficState.ns === 'green' ? '#10b981' : '#ef4444', boxShadow: `0 0 10px ${trafficState.ns === 'green' ? '#10b981' : '#ef4444'}` }} />
      <div className="absolute bottom-[-95px] right-[-95px] w-4 h-4 rounded-full bg-slate-900 border border-white/10" style={{ backgroundColor: trafficState.ew === 'green' ? '#10b981' : '#ef4444', boxShadow: `0 0 10px ${trafficState.ew === 'green' ? '#10b981' : '#ef4444'}` }} />
    </div>
  );
};

export default ControlTower;
