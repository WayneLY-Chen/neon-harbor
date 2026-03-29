import React from 'react';

const CloudLayer = ({ brightness }) => {
  return (
    <div className="absolute inset-[-500px] pointer-events-none z-[120] overflow-hidden opacity-30">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white transition-opacity duration-[3s] blur-[60px] rounded-full"
          style={{
            width: `${Math.random() * 300 + 200}px`,
            height: `${Math.random() * 150 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 30 + 30}s linear infinite`,
            opacity: Math.random() * 0.2 + 0.1 * brightness,
          }}
        />
      ))}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateX(-100%) translateY(0); }
          100% { transform: translateX(1000px) translateY(100px); }
        }
      `}} />
    </div>
  );
};

export default CloudLayer;
