import React, { useState, useRef } from 'react';
import { Heart, Stars, Gift, Sparkles, ChevronDown, ShieldCheck, Sun, Wind, Zap, Waves, Orbit, Compass, Telescope } from 'lucide-react';
import { generateCelestialTribute, interpretWeave } from './services/geminiService';

const starClusters = [
  { id: 'anchor', label: 'The Anchor Cluster', sub: 'Stability & Rootedness', icon: <Compass className="text-blue-400" /> },
  { id: 'beacon', label: 'The Beacon Star', sub: 'Guidance & Light', icon: <Telescope className="text-yellow-400" /> },
  { id: 'horizon', label: 'The Horizon Arc', sub: 'Shared Dreams & Future', icon: <Orbit className="text-purple-400" /> },
];

const threads = [
  { id: 'kindness', label: 'Kindness', icon: <Sun size={20} />, color: '#fbbf24' },
  { id: 'strength', label: 'Strength', icon: <ShieldCheck size={20} />, color: '#ef4444' },
  { id: 'adventure', label: 'Adventure', icon: <Wind size={20} />, color: '#10b981' },
  { id: 'wisdom', label: 'Wisdom', icon: <Zap size={20} />, color: '#8b5cf6' },
  { id: 'patience', label: 'Patience', icon: <Waves size={20} />, color: '#3b82f6' },
];

const App: React.FC = () => {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [celestialReading, setCelestialReading] = useState<string>("");
  const [loadingCelestial, setLoadingCelestial] = useState(false);
  const [selectedThreads, setSelectedThreads] = useState<string[]>([]);
  const [weaveAnalysis, setWeaveAnalysis] = useState<string>("");
  const [loadingLoom, setLoadingLoom] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const handleReadStars = async (clusterId: string) => {
    setActiveCluster(clusterId);
    setLoadingCelestial(true);
    const cluster = starClusters.find(c => c.id === clusterId);
    const result = await generateCelestialTribute("Raj & Deepa", cluster?.label || "", cluster?.sub || "");
    setCelestialReading(result);
    setLoadingCelestial(false);
  };

  const toggleThread = (id: string) => {
    setSelectedThreads(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleWeaveDestiny = async () => {
    if (selectedThreads.length < 2) return;
    setLoadingLoom(true);
    const threadLabels = threads.filter(t => selectedThreads.includes(t.id)).map(t => t.label);
    const result = await interpretWeave("Raj & Deepa", threadLabels);
    setWeaveAnalysis(result);
    setLoadingLoom(false);
  };

  const scrollToLetter = () => {
    setShowLetter(true);
    setTimeout(() => {
      letterRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden selection:bg-rose-100 selection:text-rose-900">
      {/* Hero Section */}
      <section className="relative h-[100svh] flex flex-col items-center justify-center text-center p-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="absolute top-10 animate-pulse text-rose-400">
          <Heart size={40} fill="currentColor" />
        </div>
        
        <h1 className="font-serif text-4xl md:text-8xl mb-4 text-stone-800 tracking-tight leading-tight px-2">
          Happy Anniversary <br />
          <span className="text-rose-600 font-cursive italic text-5xl md:text-9xl">Raj & Deepa</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-stone-600 max-w-xl font-light px-4">
          A love written in the stars. A bond woven in time.
        </p>

        <div className="absolute bottom-10 animate-bounce cursor-pointer text-stone-400" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Section 1: The Celestial Map */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-950 text-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                opacity: Math.random()
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-3">The Celestial Map</h2>
            <p className="text-slate-400 text-sm md:text-base">Discover the constellations that align in your honor.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Interactive Sky Box */}
            <div className="relative aspect-square w-full max-w-[280px] md:max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full border border-slate-800/50 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border border-slate-700/30 animate-spin-slow-reverse"></div>
              
              <div className="relative w-full h-full flex items-center justify-center">
                {starClusters.map((cluster, i) => {
                  const angle = (i * 120);
                  return (
                    <button
                      key={cluster.id}
                      onClick={() => handleReadStars(cluster.id)}
                      className={`absolute p-4 md:p-6 rounded-full transition-all duration-500 group
                        ${activeCluster === cluster.id ? 'bg-slate-800 scale-110 md:scale-125 shadow-xl' : 'bg-transparent hover:bg-slate-900/50'}`}
                      style={{
                        transform: `rotate(${angle}deg) translate(var(--celestial-radius)) rotate(-${angle}deg)`
                      } as React.CSSProperties}
                    >
                      <div className="relative">
                         <div className={`transition-transform duration-300 group-hover:scale-110 ${activeCluster === cluster.id ? 'animate-pulse' : ''}`}>
                          {cluster.icon}
                         </div>
                         <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 md:group-hover:opacity-100 transition-opacity">
                           <span className="text-[10px] md:text-xs font-mono tracking-widest text-slate-300">{cluster.label}</span>
                         </div>
                      </div>
                    </button>
                  );
                })}
                
                <div className="bg-white/5 p-6 md:p-8 rounded-full backdrop-blur-sm border border-white/10">
                   <Stars className="text-yellow-200" size={32} />
                </div>
              </div>
            </div>

            {/* Reading Output */}
            <div className="min-h-[250px] md:min-h-[350px] flex flex-col justify-center px-2">
              {loadingCelestial ? (
                <div className="text-center space-y-4">
                  <Stars className="mx-auto text-yellow-400 animate-spin" size={32} />
                  <p className="text-slate-400 font-serif italic text-lg">Consulting the ancient charts...</p>
                </div>
              ) : celestialReading ? (
                <div className="bg-slate-900/80 p-6 md:p-10 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500">
                  <div className="flex items-center gap-2 text-yellow-400 mb-4 font-mono text-[10px] md:text-sm tracking-widest uppercase">
                    <Sparkles size={14} /> Reading: {starClusters.find(c => c.id === activeCluster)?.label}
                  </div>
                  <p className="text-xl md:text-2xl lg:text-3xl font-serif text-slate-100 leading-relaxed italic">
                    {celestialReading}
                  </p>
                </div>
              ) : (
                <div className="text-center p-8 border-2 border-dashed border-slate-800 rounded-3xl opacity-40">
                  <Telescope size={48} className="mx-auto mb-3" />
                  <p className="font-serif text-sm md:text-lg text-slate-300">Select a cluster to reveal its cosmic story.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Infinite Loom */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-stone-800 mb-3">The Infinite Loom</h2>
            <p className="text-stone-500 text-sm md:text-base">Choose the threads that define your journey.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl h-[250px] md:h-[400px] mb-8 bg-stone-50 rounded-2xl md:rounded-3xl overflow-hidden border border-stone-100">
              <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
                {threads.map((thread, i) => (
                  <g key={thread.id}>
                    <line x1="0" y1={40 + i * 60} x2="600" y2={40 + i * 60} stroke="#f3f4f6" strokeWidth="1" />
                    {selectedThreads.includes(thread.id) && (
                      <path
                        d={`M 0 ${40 + i * 60} Q 150 ${20 + i * 60}, 300 ${40 + i * 60} T 600 ${40 + i * 60}`}
                        fill="transparent"
                        stroke={thread.color}
                        strokeWidth="3"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Heart size={48} className={`text-rose-500 transition-all duration-700 ${selectedThreads.length >= 2 ? 'scale-125 opacity-100' : 'scale-0 opacity-0'}`} fill="currentColor" />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => toggleThread(thread.id)}
                  className={`flex items-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-full border-2 text-xs md:text-base transition-all ${selectedThreads.includes(thread.id) ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 text-stone-600'}`}
                >
                  {thread.icon}
                  <span className="font-medium">{thread.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleWeaveDestiny}
              disabled={selectedThreads.length < 2 || loadingLoom}
              className="px-8 py-4 md:px-12 md:py-5 bg-rose-600 text-white rounded-full text-lg md:text-xl font-bold shadow-lg disabled:opacity-30 transition-transform active:scale-95"
            >
              {loadingLoom ? "Weaving..." : "Weave Your Legacy"}
            </button>

            {weaveAnalysis && (
              <div className="mt-10 w-full max-w-2xl bg-stone-50 p-6 md:p-10 rounded-3xl border-l-4 md:border-l-8 border-rose-500 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                <p className="text-sm md:text-lg text-stone-700 leading-relaxed font-light italic">{weaveAnalysis}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Letter Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          {!showLetter ? (
            <div className="p-8 md:p-12 border-2 border-dashed border-stone-300 rounded-3xl hover:border-rose-300 transition-colors cursor-pointer bg-white/50" onClick={scrollToLetter}>
              <Gift size={48} className="mx-auto text-stone-300 mb-4" />
              <h3 className="font-serif text-2xl md:text-3xl text-stone-800 mb-2">A Heartfelt Message</h3>
              <p className="text-stone-500 text-sm">Tap to reveal my letter to you both.</p>
            </div>
          ) : (
            <div 
              ref={letterRef}
              className="bg-white p-6 md:p-16 shadow-2xl rounded-sm border border-stone-200 text-left animate-in zoom-in fade-in duration-700"
            >
              <div className="font-cursive text-2xl md:text-4xl text-stone-800 leading-relaxed space-y-6">
                <div className="font-bold border-b border-stone-100 pb-4">Dearest Mom and Dad,</div>
                <p>Happy Anniversary! Today is a celebration of the incredible foundation you've built for our entire family over the years.</p>
                <p>I realize just how rare and precious your relationship is. You've shown me what it means to grow together and prioritize love above all else.</p>
                <p>I am beyond lucky to have you. You are my anchors, my biggest cheerleaders, and my greatest examples of what "true love" really looks like.</p>
                <div className="pt-6">With all my love,</div>
                <div className="text-rose-600 font-bold">Ayush ❤️</div>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="py-10 px-6 text-center text-stone-400 bg-stone-50 border-t border-stone-200">
        <p className="text-xs tracking-widest uppercase mb-1">Forever Together • Raj & Deepa</p>
        <p className="text-[10px] italic">Handcrafted with love by Ayush</p>
      </footer>
    </div>
  );
};

export default App;