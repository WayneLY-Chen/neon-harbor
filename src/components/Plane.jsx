import React from 'react';

const NeonPlaneSVG = ({ color, isMoving }) => {
  return (
    <svg viewBox="0 0 100 60" width="100" height="60" className="drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] overflow-visible">
      <defs>
        <linearGradient id={`plume-${color}`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="50%" stopColor={color} />
          <stop offset="100%" stopColor="black" stopOpacity="0.4" />
        </linearGradient>
        <filter id="glow-filter">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {isMoving && (
        <path d="M0,30 L-60,24 L-60,36 L0,30 Z" fill={`url(#plume-${color})`} className="animate-pulse" />
      )}

      <circle cx="70" cy="0" r="3" fill="#10b981" />
      <circle cx="70" cy="60" r="3.5" fill="#ef4444" className="animate-[ping_2s_infinite] shadow-[0_0_20px_#ef4444]" />
      <circle cx="70" cy="60" r="2.5" fill="#ef4444" />

      <path d="M35,30 L55,0 L70,0 L50,30 Z" fill={color} filter="url(#glow-filter)" />
      <path d="M35,30 L55,60 L70,60 L50,30 Z" fill={color} filter="url(#glow-filter)" />

      <path d="M5,30 L15,18 L25,18 L15,30 Z" fill={color} />
      <path d="M5,30 L15,42 L25,42 L15,30 Z" fill={color} />

      <path d="M5,30 C15,20 40,20 75,25 L95,30 L75,35 C40,40 15,40 5,30 Z" fill="url(#body-grad)" stroke={color} strokeWidth="0.5" />
      <circle cx="12" cy="30" r="2.5" fill="white" className="animate-pulse shadow-[0_0_10px_white]" />
    </svg>
  );
};

const Plane = ({ plane }) => {
  let rotation = 0;
  if (plane.dir === 'RL') rotation = 180;
  if (plane.dir === 'TB') rotation = 90;
  if (plane.dir === 'BT') rotation = 270;

  const color = plane.color || '#38bdf8';
  const isMoving = !plane.braking;

  const buffer = 200;
  let opacity = 1;
  if (plane.x < -buffer || plane.x > 850 + buffer || plane.y < -buffer || plane.y > 850 + buffer) {
    opacity = 0;
  }

  const flightId = plane.id.toUpperCase();
  const simulatedAlt = 12000;
  const spdLabel = Math.floor(plane.baseSpd * (isMoving ? 1 : 0.1));

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${plane.x}px, ${plane.y}px) translate(-50%, -50%)`,
        opacity: opacity,
        zIndex: 100,
        transition: 'opacity 0.6s ease'
      }}
    >
      <div
        className="relative flex items-center justify-center p-8"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div
          className="absolute left-[110%] top-[-20px] bg-sky-900/40 backdrop-blur-sm border border-white/10 p-2 rounded-sm text-[9px] font-mono leading-tight shadow-lg whitespace-nowrap transition-all duration-700"
          style={{
            transform: `rotate(${-rotation}deg)`,
            color: color,
            opacity: isMoving ? 0.9 : 0.4
          }}
        >
          <div className="font-black flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            航班 {flightId}
          </div>
          <div className="text-white/40 mt-1">速度: {spdLabel} 節</div>
          <div className="text-white/40">高度: {simulatedAlt} 呎</div>
        </div>

        <div
          className="absolute left-[60%] top-1/2 -translate-y-1/2 origin-left"
          style={{
            width: '180px',
            height: '80px',
            opacity: plane.lightIntensity * 0.35,
            background: `conic-gradient(from 240deg at 0% 50%, white, transparent 25deg, transparent 335deg, white 360deg)`,
            maskImage: `radial-gradient(circle at left, black 15%, transparent 75%)`,
            WebkitMaskImage: `radial-gradient(circle at left, black 15%, transparent 75%)`,
            filter: 'blur(12px)',
          }}
        />

        <div className="relative scale-[0.75]">
           <NeonPlaneSVG color={color} isMoving={isMoving} />
           <div className="absolute right-5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-30 shadow-[0_0_15px_white]" />
        </div>
      </div>
    </div>
  );
};

export default Plane;
