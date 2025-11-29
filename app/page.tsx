import Link from "next/link";
import { ArrowRight, Play, Check, Zap, Activity, Trophy, Sparkles, HeartPulse } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4F932] selection:text-black overflow-x-hidden">
      {/* Navbar - Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D4F932] rounded-lg flex items-center justify-center">
              <Zap size={20} className="text-black fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight">FlexCompanion</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/routines" className="hover:text-white transition-colors">Routines</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
          </div>
          <Link href="/dashboard" className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section - Immersive & Dynamic */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"></div>
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D4F932]/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-bold tracking-wider mb-8 animate-fade-in">
            <Sparkles size={14} className="text-[#D4F932]" />
            AI-POWERED PHYSIOTHERAPY
          </div>
          <h1 className="text-6xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight animate-slide-up">
            Restore Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4F932] to-[#32D4F9]">Natural Movement</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-xl lg:text-2xl mb-12 leading-relaxed font-light animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Your personal AI Physiotherapist. Real-time form correction, pain relief protocols, and mobility routines tailored to your body's needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href="/dashboard" className="w-full sm:w-auto bg-[#D4F932] text-[#1C1C1E] px-10 py-5 rounded-full font-bold text-xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-[0_0_40px_rgba(212,249,50,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:-translate-y-1">
              Start Recovery
              <ArrowRight size={24} />
            </Link>
            <Link href="/routines" className="w-full sm:w-auto px-10 py-5 rounded-full font-bold text-xl text-white border border-white/20 flex items-center justify-center gap-3 hover:bg-white/10 transition-all backdrop-blur-md">
              Explore Routines
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-black/50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Correction",
                desc: "Computer vision analyzes your posture 60 times per second to prevent injury.",
                icon: <Activity size={32} />
              },
              {
                title: "Pain Relief Protocols",
                desc: "Targeted stretching routines designed by experts to alleviate back and neck pain.",
                icon: <HeartPulse size={32} />
              },
              {
                title: "Mobility & Flexibility",
                desc: "Regain your range of motion with progressive flows adapted to your limits.",
                icon: <Zap size={32} />
              }
            ].map((feature, i) => (
              <div key={i} className="bg-[#1C1C1E] p-10 rounded-[40px] border border-white/5 hover:border-[#D4F932]/50 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-[#2C2C2E] flex items-center justify-center text-white mb-8 group-hover:bg-[#D4F932] group-hover:text-[#1C1C1E] transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
