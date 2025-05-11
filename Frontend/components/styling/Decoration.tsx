import React from 'react';

function Decoration() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft animated background elements */}
      <div className="absolute -top-20 -left-20 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-sky-400/30 via-cyan-400/20 to-transparent blur-[100px] animate-pulse-slow" />

      <div className="absolute top-1/3 -right-[10vw] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-indigo-400/25 via-purple-400/20 to-transparent blur-[100px] opacity-90 animate-pulse-slow-reverse" />

      <div className="absolute -bottom-[10vw] left-[10vw] w-[60vw] h-[40vw] max-w-[900px] max-h-[600px] rounded-full bg-gradient-to-tr from-cyan-400/30 via-sky-400/25 to-transparent blur-[100px] opacity-90 animate-pulse-slow" />

      {/* Subtle floating shapes */}
      <div
        className="absolute top-1/4 right-[10%] w-[8vw] h-[8vw] max-w-[160px] max-h-[160px]
        bg-pink-400/30 rounded-3xl 
        shadow-[0_40px_60px_-10px_rgba(251,113,133,0.25)]
        rotate-12 animate-float-slow"
      />

      <div
        className="absolute bottom-1/3 left-[15%] w-[10vw] h-[10vw] max-w-[200px] max-h-[200px]
        bg-cyan-400/30 rounded-full 
        shadow-[0_30px_50px_-10px_rgba(34,211,238,0.25)]
        -rotate-12 animate-float"
      />
      {/* <BackgroundBeams className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#06B6D4"
        />
      </div> */}

    </div>
  );
}

export default Decoration;