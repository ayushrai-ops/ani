import React, { useState, useRef } from 'react';
import { Heart, Stars, Gift, Sparkles, Quote, ChevronDown, ShieldCheck, Sun, Wind, Zap, Waves, Orbit, Compass, Telescope } from 'lucide-react';
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
  // Celestial State
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [celestialReading, setCelestialReading] = useState<string>("");
  const [loadingCelestial, setLoadingCelestial] = useState(false);

  // Loom State
  const [selectedThreads, setSelectedThreads] = useState<string[]>([]);
  const [weaveAnalysis, setWeaveAnalysis] = useState<string>("");
  const [loadingLoom, setLoadingLoom] = useState(false);

  // Letter State
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
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="absolute top-10 animate-pulse text-rose-400">
          <Heart size={48} fill="currentColor" />
        </div>
        
        <h1 className="font-serif text-6xl md:text-8xl mb-4 text-stone-800 tracking-tight leading-tight">
          Happy Anniversary <br />
          <span className="text-rose-600 font-cursive italic">Raj & Deepa</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-stone-600 max-w-2xl font-light">
          A love written in the stars. A bond woven in time.
        </p>

        <div className="mt-12 animate-bounce cursor-pointer text-stone-400" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Section 1: The Celestial Map */}
      <section className="py-24 px-6 bg-slate-950 text-slate-200 relative overflow-hidden">
        {/* Twinkling Stars Background */}
        <div className="absolute inset-0 z-0">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                width: Math.random() * 3 + 'px',
                height: Math.random() * 3 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 5 + 's',
                opacity: Math.random()
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">The Celestial Map</h2>
            <p className="text-slate-400">Discover the constellations that align in your honor.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Interactive Sky Box */}
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full border border-slate-800/50 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border border-slate-700/30 animate-spin-slow-reverse"></div>
              
              <div className="relative w-full h-full flex items-center justify-center">
                {starClusters.map((cluster, i) => (
                  <button
                    key={cluster.id}
                    onClick={() => handleReadStars(cluster.id)}
                    className={`absolute p-6 rounded-full transition-all duration-500 group
                      ${activeCluster === cluster.id ? 'bg-slate-800 scale-125 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'bg-transparent hover:bg-slate-900/50'}`}
                    style={{
                      transform: `rotate(${i * 120}deg) translate(140px) rotate(-${i * 120}deg)`
                    }}
                  >
                    <div className="relative">
                       <div className={`transition-transform duration-300 group-hover:scale-110 ${activeCluster === cluster.id ? 'animate-pulse' : ''}`}>
                        {cluster.icon}
                       </div>
                       <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-xs font-mono tracking-widest text-slate-300">{cluster.label}</span>
                       </div>
                    </div>
                  </button>
                ))}
                
                {/* Center Sun/Heart */}
                <div className="bg-white/5 p-8 rounded-full backdrop-blur-sm border border-white/10">
                   <Stars className="text-yellow-200" size={48} />
                </div>

                {/* Connecting Constellation Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <path d="M 200 100 L 350 300 L 50 300 Z" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5,5" className="animate-dash" />
                </svg>
              </div>
            </div>

            {/* Reading Output */}
            <div className="min-h-[350px] flex flex-col justify-center">
              {loadingCelestial ? (
                <div className="text-center space-y-6">
                  <Stars className="mx-auto text-yellow-400 animate-spin" size={48} />
                  <p className="text-slate-400 font-serif italic text-xl">Consulting the ancient charts...</p>
                </div>
              ) : celestialReading ? (
                <div className="bg-slate-900/80 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-700">
                  <div className="flex items-center gap-3 text-yellow-400 mb-6 font-mono text-sm tracking-[0.2em] uppercase">
                    <Sparkles size={16} /> Reading: {starClusters.find(c => c.id === activeCluster)?.label}
                  </div>
                  <p className="text-2xl md:text-3xl font-serif text-slate-100 leading-relaxed italic">
                    {celestialReading}
                  </p>
                  <div className="mt-8 pt-6 border-t border-slate-800 text-slate-500 text-sm italic">
                    "Your love is a light that travels across generations."
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="p-8 border-2 border-dashed border-slate-800 rounded-3xl opacity-40">
                    <Telescope size={64} className="mx-auto mb-4" />
                    <p className="font-serif text-lg">Click a star cluster to reveal a celestial tribute for Raj & Deepa.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Infinite Loom */}
      <section className="py-24 px-6 relative overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-4">The Infinite Loom</h2>
            <p className="text-stone-500">Select the threads that have woven your life together.</p>
          </div>

          <div className="flex flex-col items-center">
            {/* Interactive Loom Canvas */}
            <div className="relative w-full max-w-2xl h-[400px] mb-12 bg-stone-50 rounded-3xl overflow-hidden border border-stone-100">
              <svg className="w-full h-full">
                {threads.map((thread, i) => (
                  <g key={thread.id}>
                    <line 
                      x1="0" y1={50 + i * 70} x2="100%" y2={50 + i * 70} 
                      stroke="#e5e7eb" strokeWidth="1" 
                    />
                    {selectedThreads.includes(thread.id) && (
                      <path
                        d={`M 0 ${50 + i * 70} Q ${200} ${50 + i * 70}, 400 ${50 + i * 70} T 800 ${50 + i * 70}`}
                        fill="transparent"
                        stroke={thread.color}
                        strokeWidth="4"
                        className="animate-pulse"
                      >
                        <animate attributeName="d" 
                          values={`M 0 ${50 + i * 70} Q 200 ${30 + i * 70}, 400 ${50 + i * 70} T 800 ${50 + i * 70};
                                  M 0 ${50 + i * 70} Q 200 ${70 + i * 70}, 400 ${50 + i * 70} T 800 ${50 + i * 70};
                                  M 0 ${50 + i * 70} Q 200 ${30 + i * 70}, 400 ${50 + i * 70} T 800 ${50 + i * 70}`}
                          dur="3s" repeatCount="indefinite" />
                      </path>
                    )}
                  </g>
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`p-8 rounded-full bg-white shadow-xl transition-transform duration-500 ${selectedThreads.length > 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                  <Heart size={64} className="text-rose-500 fill-rose-500" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => toggleThread(thread.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all ${selectedThreads.includes(thread.id) ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'}`}
                >
                  {thread.icon}
                  <span className="font-medium">{thread.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleWeaveDestiny}
              disabled={selectedThreads.length < 2 || loadingLoom}
              className="px-12 py-5 bg-rose-600 text-white rounded-full text-xl font-bold shadow-xl hover:bg-rose-700 transition-all disabled:opacity-30 disabled:scale-100 active:scale-95"
            >
              {loadingLoom ? "Intertwining Spirits..." : "Weave Your Legacy"}
            </button>

            {weaveAnalysis && (
              <div className="mt-12 max-w-2xl bg-stone-50 p-10 rounded-[2rem] border-l-8 border-rose-500 animate-in zoom-in-95 duration-700">
                <Sparkles className="text-rose-500 mb-4" />
                <h4 className="text-2xl font-serif text-stone-800 mb-4 italic">The Fabric of Your Love</h4>
                <p className="text-lg text-stone-600 leading-relaxed font-light">{weaveAnalysis}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Letter Section */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-3xl mx-auto text-center">
          {!showLetter ? (
            <div className="p-12 border-2 border-dashed border-stone-300 rounded-3xl hover:border-rose-400 transition-colors cursor-pointer group" onClick={scrollToLetter}>
              <Gift size={64} className="mx-auto text-stone-300 group-hover:text-rose-500 transition-colors mb-6" />
              <h3 className="font-serif text-3xl text-stone-800 mb-4">A Heartfelt Note Awaits</h3>
              <p className="text-stone-500">Click to reveal the letter I wrote for you both.</p>
            </div>
          ) : (
            <div 
              ref={letterRef}
              className="bg-white p-10 md:p-16 shadow-2xl rounded-sm border border-stone-200 transform rotate-1 animate-in zoom-in fade-in duration-1000 origin-top"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.05), inset 0 0 50px rgba(0,0,0,0.02)' }}
            >
              <div className="text-left font-cursive text-3xl md:text-4xl text-stone-800 leading-relaxed">
                <div className="mb-8">Dearest Mom and Dad (Raj & Deepa),</div>
                <p className="mb-6">Happy Anniversary! Today isn't just a celebration of the date you got married, but a celebration of the incredible foundation you've built for our entire family.</p>
                <p className="mb-6">As I grow older, I realize just how rare and precious your relationship is. In a world that often moves too fast, you've shown me what it means to stay, to grow together, and to prioritize love above everything else.</p>
                <p className="mb-8">I am beyond lucky to have parents like you. You are my anchors, my biggest cheerleaders, and my greatest examples of what "true love" really looks like.</p>
                <div>With all my love,</div>
                <div className="mt-4 text-rose-600">Your son Ayush ❤️</div>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-stone-200 text-center text-stone-400">
        <p className="text-sm tracking-widest uppercase mb-2">Forever Together • Raj & Deepa</p>
        <p className="text-xs italic">Made with love by your son Ayush</p>
      </footer>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 15s linear infinite; }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        .animate-dash {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;