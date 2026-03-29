import React from 'react';

const TechPipe = ({ x, y, w, h, vertical = false, color = '#38bdf8' }) => (
  <div
    className="absolute pointer-events-none opacity-20 border-white/5"
    style={{
      left: x, top: y, width: w, height: h,
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      boxShadow: `0 0 10px ${color}11`,
      [vertical ? 'borderLeftWidth' : 'borderTopWidth']: '1px',
      borderStyle: 'solid',
      borderColor: `${color}44`,
    }}
  >
    <div className={`absolute ${vertical ? 'w-1 h-full left-0' : 'h-1 w-full top-0'} bg-gradient-to-r from-transparent via-${color}/20 to-transparent`} />
  </div>
);

const StaticPlane = ({ x, y, rotation, color = '#ffffff' }) => (
  <div className="absolute opacity-10 scale-[0.35]" style={{ left: x, top: y, transform: `rotate(${rotation}deg)` }}>
    <svg viewBox="0 0 100 60" width="100" height="60" fill={color}>
       <path d="M35,30 L55,0 L70,0 L50,30 Z" />
       <path d="M35,30 L55,60 L70,60 L50,30 Z" />
       <path d="M5,30 C15,20 40,20 75,25 L95,30 L75,35 C40,40 15,40 5,30 Z" />
    </svg>
  </div>
);

const TerminalHub = ({ x, y, rotation, label }) => (
  <div className="absolute flex flex-col items-center gap-4" style={{ left: x, top: y, transform: `rotate(${rotation}deg)` }}>
    <div className="w-[180px] h-[60px] bg-slate-900/60 border border-sky-500/10 rounded-full flex items-center justify-around px-6 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400/5 to-transparent" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-4 h-2 bg-sky-400/20 rounded-sm blur-[1px]" />
        ))}
    </div>
    <div className="text-white/5 text-[10px] tracking-[1em] font-black uppercase mt-2 whitespace-nowrap">{label}</div>
    <div className="w-[20px] h-[20px] rounded-full border border-sky-400/20 flex items-center justify-center">
       <div className="w-1 h-1 bg-sky-400 animate-ping" />
    </div>
  </div>
);

const LaneArrow = ({ x, y, dir, label }) => (
  <div
    className="absolute pointer-events-none text-white/5 font-black text-[10px] tracking-[0.6em] flex flex-col items-center justify-center opacity-60 select-none"
    style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
  >
    <div className="mb-0.5">{label}</div>
    <div className={`text-[12px] font-mono leading-none ${dir === 'left' ? '-rotate-180' : dir === 'up' ? '-rotate-90' : dir === 'down' ? 'rotate-90' : ''}`}>
      {">>>"}
    </div>
  </div>
);

const AirportScene = ({ brightness }) => (
  <div
    className="absolute inset-0 transition-colors duration-[2.5s] pointer-events-none flex items-center justify-center overflow-hidden"
    style={{ backgroundColor: '#051005' }}
  >
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.05]">
       <div className="w-[1200px] h-[1200px] rounded-full border border-sky-400/20 relative animate-[spin_20s_linear_infinite]"
            style={{ background: 'conic-gradient(from 0deg, rgba(56,189,248,0.2) 0deg, transparent 90deg, transparent 360deg)' }}
       />
       {[...Array(3)].map((_, i) => (
         <div key={i} className="absolute rounded-full border border-sky-400/10" style={{ width: (i+1)*400, height: (i+1)*400 }} />
       ))}
    </div>

    <div className="absolute left-1/2 -translate-x-1/2 w-[240px] h-full bg-[#0f172a] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-x border-white/5 flex items-center justify-center overflow-hidden z-10">
        <div className="h-full w-0 border-r-[4px] border-dashed border-yellow-400/10" />
        <div className="absolute inset-0 z-10">
          <LaneArrow x="195px" y="100px" dir="down" label="D 航道" />
          <LaneArrow x="195px" y="750px" dir="down" label="D 航道" />
          <LaneArrow x="45px" y="100px" dir="up" label="B 航道" />
          <LaneArrow x="45px" y="750px" dir="up" label="B 航道" />
        </div>
    </div>

    <div className="absolute top-1/2 -translate-y-1/2 h-[240px] w-full bg-[#0f172a] shadow-[0_0_50px_rgba(0,0,0,0.5)] border-y border-white/5 flex items-center justify-center overflow-hidden z-10">
        <div className="w-full h-0 border-b-[4px] border-dashed border-yellow-400/10" />
        <div className="absolute inset-0 z-10">
          <LaneArrow x="100px" y="195px" dir="right" label="C 航道" />
          <LaneArrow x="750px" y="195px" dir="right" label="C 航道" />
          <LaneArrow x="100px" y="45px" dir="left" label="A 航道" />
          <LaneArrow x="750px" y="45px" dir="left" label="A 航道" />
        </div>
    </div>

    <TerminalHub x="50px" y="395px" rotation={90} label="中央航站總署" />
    <TerminalHub x="620px" y="395px" rotation={-90} label="衛星調度樞紐" />

    <StaticPlane x="80px" y="80px" rotation={45} color="#38bdf8" />
    <StaticPlane x="150px" y="80px" rotation={45} />
    <StaticPlane x="720px" y="750px" rotation={225} color="#ff4b5c" />

    <TechPipe x="200px" y="100px" w="150px" h="2px" />
    <TechPipe x="350px" y="100px" w="2px" h="150px" vertical />
    <TechPipe x="600px" y="600px" w="120px" h="2px" color="#ffd700" />
    <TechPipe x="100px" y="600px" w="100px" h="2px" color="#33ff8c" />
    <TechPipe x="400px" y="50px" w="2px" h="100px" vertical color="#ff4b5c" />

    <div className="absolute top-[395px] left-[120px] text-white/5 text-[32px] font-black uppercase tracking-[0.8em] pointer-events-none">
       導航區域 01
    </div>
    <div className="absolute top-[395px] right-[120px] text-white/5 text-[32px] font-black uppercase tracking-[0.8em] pointer-events-none text-right">
       安全管制區
    </div>

    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

    <div
      className="absolute inset-0 transition-opacity duration-[3s]"
      style={{
        backgroundColor: '#020617',
        opacity: (1 - brightness) * 0.75,
        mixBlendMode: 'multiply'
      }}
    />
  </div>
);

export default AirportScene;
