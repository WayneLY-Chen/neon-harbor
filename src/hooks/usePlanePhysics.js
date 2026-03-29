import { useState, useEffect, useRef } from 'react';

const SW = 850, SH = 850;
const STOP_L = 300, STOP_R = 550, STOP_T = 300, STOP_B = 550;

const INITIAL_PLANES = [
  { id: 'p1', axis: 'EW', dir: 'LR', x: -300, y: 500, baseSpd: 65, color: '#ff4b5c' },
  { id: 'p3', axis: 'EW', dir: 'RL', x: 1150, y: 350, baseSpd: 70, color: '#00d2ff' },
  { id: 'p5', axis: 'NS', dir: 'TB', x: 500,  y: -300, baseSpd: 68, color: '#33ff8c' },
  { id: 'p7', axis: 'NS', dir: 'BT', x: 350,  y: 1150, baseSpd: 62, color: '#ffd700' },
];

export const usePlanePhysics = (trafficState) => {
  const [planes, setPlanes] = useState(INITIAL_PLANES.map(p => ({
    ...p, braking: false, lightIntensity: 1
  })));
  const lastTs = useRef(null);

  const getApproachSpeed = (dist, maxSpd) => {
    if (dist <= 0) return 0;
    const factor = Math.max(0, Math.min(1, (dist - 40) / 200));
    const smoothedFactor = factor * factor;
    return maxSpd * smoothedFactor;
  };

  useEffect(() => {
    let frameId;
    const tick = (ts) => {
      if (!lastTs.current) lastTs.current = ts;
      const dt = Math.min((ts - lastTs.current) / 1000, 0.033);
      lastTs.current = ts;

      setPlanes((currentPlanes) => {
        const newPlanesMap = {};
        currentPlanes.forEach((p) => {
          const state = p.axis === 'NS' ? trafficState.ns : trafficState.ew;
          const isRed = state === 'red' || state === 'amber';
          let spd = p.baseSpd;
          let nx = p.x, ny = p.y;

          const stopLR = STOP_L - 80, stopRL = STOP_R + 30, stopTB = STOP_T - 80, stopBT = STOP_B + 30;

          let targetSpd = spd;
          if (isRed) {
            if (p.dir === 'LR' && p.x <= stopLR) targetSpd = getApproachSpeed(stopLR - p.x, spd);
            else if (p.dir === 'RL' && p.x >= stopRL) targetSpd = getApproachSpeed(p.x - stopRL, spd);
            else if (p.dir === 'TB' && p.y <= stopTB) targetSpd = getApproachSpeed(stopTB - p.y, spd);
            else if (p.dir === 'BT' && p.y >= stopBT) targetSpd = getApproachSpeed(p.y - stopBT, spd);
          }

          const move = targetSpd * dt;
          if (p.dir === 'LR') nx += move;
          else if (p.dir === 'RL') nx -= move;
          else if (p.dir === 'TB') ny += move;
          else if (p.dir === 'BT') ny -= move;

          const resetDist = 450;
          if (nx > SW + resetDist) nx = -resetDist;
          else if (nx < -resetDist) nx = SW + resetDist;
          if (ny > SH + resetDist) ny = -resetDist;
          else if (ny < -resetDist) ny = SH + resetDist;

          newPlanesMap[p.id] = {
            ...p, x: nx, y: ny,
            braking: targetSpd < p.baseSpd * 0.9,
            lightIntensity: (isRed && targetSpd < 10) ? 0.3 : 1
          };
        });
        return currentPlanes.map(p => newPlanesMap[p.id]);
      });
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [trafficState]);

  return planes;
};
