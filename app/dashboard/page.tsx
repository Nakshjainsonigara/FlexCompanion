import Link from "next/link";
import { Play, Flame, Search, Bell, ChevronRight, Calendar as CalendarIcon, Trophy, Target, Zap, ArrowUpRight, TrendingUp, Activity, User } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="p-6 lg:p-12 max-w-[1600px] mx-auto min-h-screen flex flex-col gap-12">
            {/* Header - Minimal & Clean */}
            <div className="flex justify-between items-end animate-fade-in">
                <div>
                    <h1 className="text-5xl font-bold text-[#1C1C1E] tracking-tight mb-2">Good Morning, Naksh</h1>
                    <p className="text-gray-500 font-medium text-xl">Ready to flow?</p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative hidden lg:block group">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-b-2 border-gray-200 py-2 pl-2 pr-10 text-lg font-medium text-gray-700 focus:border-primary transition-all w-64 outline-none placeholder:text-gray-300"
                        />
                        <Search size={20} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Bell size={24} className="text-[#1C1C1E]" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <Link href="/settings" className="w-12 h-12 rounded-full bg-[#1C1C1E] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-black/20">
                        <User size={20} />
                    </Link>
                </div>
            </div>

            {/* Hero Section - Immersive & Fluid */}
            <div className="relative w-full h-[500px] shrink-0 rounded-[48px] overflow-hidden group cursor-pointer shadow-2xl shadow-black/10 animate-slide-up">
                {/* CSS Art Background - Abstract & Premium */}
                <div className="absolute inset-0 bg-[#0a0a0a]">
                    <img src="/hero-bg.png" alt="Hero Background" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="absolute inset-0 p-8 lg:p-16 flex flex-col justify-center items-start z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-bold tracking-wider mb-6">
                        <Zap size={14} className="text-primary" fill="currentColor" />
                        DAILY PICK
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight max-w-3xl">
                        Morning <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-lime-200">Spine Flow</span>
                    </h2>
                    <p className="text-gray-300 max-w-xl text-lg lg:text-xl mb-12 leading-relaxed font-light">
                        Awaken your body with this 10-minute mobility routine. Perfect for starting your day with energy and focus.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                        <Link href="/session" className="bg-primary text-[#1C1C1E] px-12 py-6 rounded-full font-bold text-xl flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_40px_rgba(212,249,50,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:-translate-y-1">
                            <Play size={28} fill="currentColor" />
                            Start Session
                        </Link>
                        <div className="flex items-center gap-8 text-white/80 font-medium text-lg">
                            <div className="flex items-center gap-2">
                                <Flame size={20} className="text-orange-500" fill="currentColor" />
                                <span>120 Kcal</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ClockIcon size={20} />
                                <span>10 Min</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section - Fluid Grid */}
            <div className="grid grid-cols-12 gap-12 pb-12">

                {/* Left: Routines & Progress */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-12">

                    {/* Section Header */}
                    <div className="flex justify-between items-end">
                        <h3 className="text-3xl font-bold text-[#1C1C1E]">Your Routines</h3>
                        <Link href="/routines" className="text-gray-500 hover:text-[#1C1C1E] font-medium flex items-center gap-1 transition-colors">
                            View all <ChevronRight size={18} />
                        </Link>
                    </div>

                    {/* Horizontal Scroll / Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Hip Mobility & Opening",
                                subtitle: "Flexibility • 25 min",
                                gradient: "from-blue-600 to-indigo-900",
                                accent: "bg-blue-400",
                                icon: <Activity size={32} />
                            },
                            {
                                title: "Spine Health & Core",
                                subtitle: "Stability • 15 min",
                                gradient: "from-purple-600 to-fuchsia-900",
                                accent: "bg-purple-400",
                                icon: <Target size={32} />
                            }
                        ].map((item, i) => (
                            <Link href="/session" key={i} className="relative h-[280px] rounded-[40px] overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-500 shadow-xl shadow-gray-200/50">
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                                    <div className={`absolute top-0 right-0 w-48 h-48 ${item.accent} rounded-full blur-[80px] opacity-40 -translate-y-1/2 translate-x-1/2 group-hover:opacity-60 transition-opacity duration-500`}></div>
                                </div>
                                <div className="absolute inset-0 p-10 flex flex-col justify-between">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-white/70 font-medium text-lg">{item.subtitle}</p>
                                    </div>
                                </div>
                                <div className="absolute bottom-10 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1C1C1E] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                    <ArrowUpRight size={24} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right: At a Glance (Clean Vertical Strip) */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                    <h3 className="text-3xl font-bold text-[#1C1C1E]">At a Glance</h3>

                    {/* Stats Card - Minimal */}
                    <div className="bg-white p-8 rounded-[40px] shadow-xl shadow-gray-100 border border-gray-100 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 font-medium">Weekly Goal</span>
                            <span className="text-[#1C1C1E] font-bold">4/5 Days</span>
                        </div>
                        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                            <div className="bg-[#1C1C1E] w-[80%] h-full rounded-full"></div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-[#1C1C1E]">1,250</span>
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Kcal Burned</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                                <Flame size={24} fill="currentColor" />
                            </div>
                        </div>
                    </div>

                    {/* Challenge Card - Pop of Color */}
                    <Link href="/progress" className="bg-[#D4F932] p-8 rounded-[40px] relative overflow-hidden shadow-xl shadow-primary/20 group cursor-pointer hover:shadow-primary/40 transition-shadow block">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div className="bg-[#1C1C1E] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Active Challenge
                                </div>
                                <ArrowUpRight size={24} className="text-[#1C1C1E] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                            <h3 className="text-4xl font-bold text-[#1C1C1E] mb-2">Perfect Plank</h3>
                            <p className="text-[#1C1C1E]/70 font-medium">Hold for 5 mins total.</p>
                        </div>
                        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/40 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Icons
function ClockIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}
