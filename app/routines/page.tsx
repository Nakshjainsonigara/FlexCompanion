import Link from "next/link";
import { Play, Activity, Target, Zap, Wind, Dumbbell, Heart, ArrowUpRight } from "lucide-react";

export default function RoutinesPage() {
    const routines = [
        {
            category: "Flexibility",
            title: "Morning Spine Flow",
            duration: "10 min",
            level: "Beginner",
            gradient: "from-emerald-600 to-teal-900",
            accent: "bg-emerald-400",
            icon: <Wind size={24} />
        },
        {
            category: "Strength",
            title: "Lower Body Power",
            duration: "25 min",
            level: "Intermediate",
            gradient: "from-blue-600 to-indigo-900",
            accent: "bg-blue-400",
            icon: <Dumbbell size={24} />
        },
        {
            category: "HIIT",
            title: "Core Crusher",
            duration: "15 min",
            level: "Advanced",
            gradient: "from-purple-600 to-fuchsia-900",
            accent: "bg-purple-400",
            icon: <Target size={24} />
        },
        {
            category: "Mobility",
            title: "Hip Opener",
            duration: "20 min",
            level: "All Levels",
            gradient: "from-orange-600 to-red-900",
            accent: "bg-orange-400",
            icon: <Activity size={24} />
        },
        {
            category: "Cardio",
            title: "Quick Sweat",
            duration: "12 min",
            level: "Intermediate",
            gradient: "from-pink-600 to-rose-900",
            accent: "bg-pink-400",
            icon: <Heart size={24} />
        },
        {
            category: "Strength",
            title: "Upper Body Sculpt",
            duration: "30 min",
            level: "Advanced",
            gradient: "from-cyan-600 to-blue-900",
            accent: "bg-cyan-400",
            icon: <Zap size={24} />
        }
    ];

    return (
        <div className="p-6 lg:p-12 max-w-[1600px] mx-auto h-full flex flex-col gap-10">
            <div className="flex justify-between items-end animate-fade-in">
                <div>
                    <h1 className="text-4xl font-bold text-[#1C1C1E] tracking-tight mb-2">Explore Routines</h1>
                    <p className="text-gray-500 font-medium text-lg">Find the perfect flow for your body today.</p>
                </div>

                <div className="flex gap-4">
                    {['All', 'Strength', 'Flexibility', 'Cardio'].map(cat => (
                        <button key={cat} className={`px-6 py-3 rounded-full font-bold text-sm transition-all ${cat === 'All' ? 'bg-[#1C1C1E] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                {routines.map((item, i) => (
                    <Link href="/session" key={i} className="relative h-[320px] rounded-[40px] overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-500 shadow-xl shadow-gray-200/50 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                            <div className={`absolute top-0 right-0 w-64 h-64 ${item.accent} rounded-full blur-[80px] opacity-40 -translate-y-1/2 translate-x-1/2 group-hover:opacity-60 transition-opacity duration-500`}></div>
                        </div>

                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/10">
                                    {item.icon}
                                </div>
                                <div className="px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full text-white/90 text-xs font-bold uppercase tracking-wider">
                                    {item.level}
                                </div>
                            </div>

                            <div>
                                <p className="text-white/70 font-bold text-sm mb-2 uppercase tracking-wider">{item.category}</p>
                                <h3 className="text-3xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
                                <div className="flex items-center gap-2 text-white/80 font-medium">
                                    <ClockIcon size={16} />
                                    <span>{item.duration}</span>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-8 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#1C1C1E] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-lg">
                            <Play size={24} fill="currentColor" className="ml-1" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function ClockIcon({ size = 16 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}
