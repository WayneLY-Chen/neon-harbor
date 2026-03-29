import { useState, useEffect } from 'react';

export const useTrafficControl = () => {
  const [traffic, setTraffic] = useState({ ns: 'green', ew: 'red' });
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [brightness, setBrightness] = useState(1);

  const TRAFFIC_CYCLE = 9000;
  const DAY_CYCLE = 30000;

  useEffect(() => {
    const startTs = performance.now();
    let frameId;

    const tick = () => {
      const now = performance.now();
      const trafficElapsed = (now - startTs) % TRAFFIC_CYCLE;
      const dayElapsed = (now - startTs) % DAY_CYCLE;

      let ns = 'red', ew = 'red';
      if (trafficElapsed < 4000) { ns = 'green'; ew = 'red'; }
      else if (trafficElapsed < 4500) { ns = 'amber'; ew = 'red'; }
      else if (trafficElapsed < 8500) { ns = 'red'; ew = 'green'; }
      else { ns = 'red'; ew = 'amber'; }

      setTraffic(prev => (prev.ns === ns && prev.ew === ew) ? prev : { ns, ew });

      let tod = 'day';
      let b = 1;
      if (dayElapsed < 12000) {
        tod = 'day'; b = 1;
      } else if (dayElapsed < 15000) {
        tod = 'sunset';
        b = 0.6 + (1 - (dayElapsed - 12000) / 3000) * 0.4;
      } else if (dayElapsed < 27000) {
        tod = 'night'; b = 0.3;
      } else {
        tod = 'sunrise';
        b = 0.3 + ((dayElapsed - 27000) / 3000) * 0.7;
      }

      setTimeOfDay(tod);
      setBrightness(b);

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return { traffic, timeOfDay, brightness };
};
