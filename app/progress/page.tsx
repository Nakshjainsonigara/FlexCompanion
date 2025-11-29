import { Flame, Clock, Calendar, TrendingUp, Award, Activity } from "lucide-react";

export default function ProgressPage() {
    return (
        <div className="p-6 lg:p-12 max-w-[1600px] mx-auto h-full flex flex-col gap-10">
            <div className="animate-fade-in">
                <h1 className="text-4xl font-bold text-[#1C1C1E] tracking-tight mb-2">Your Progress</h1>
                <p className="text-gray-500 font-medium text-lg">Keep up the momentum, you're doing great.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Workouts", value: "42", icon: <Award size={24} />, color: "text-purple-500", bg: "bg-purple-50" },
                    { label: "Calories Burned", value: "12.5k", icon: <Flame size={24} />, color: "text-orange-500", bg: "bg-orange-50" },
                    { label: "Minutes Active", value: "840", icon: <Clock size={24} />, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Current Streak", value: "5 Days", icon: <TrendingUp size={24} />, color: "text-green-500", bg: "bg-green-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#1C1C1E]">{stat.value}</div>
                            <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-8 pb-12">
                {/* Activity Chart (Visual Placeholder) */}
                <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold text-[#1C1C1E]">Activity Level</h3>
                        <select className="bg-gray-100 px-4 py-2 rounded-full text-sm font-bold text-gray-600 outline-none">
                            <option>This Week</option>
                            <option>This Month</option>
                        </select>
                    </div>

                    <div className="h-[300px] flex items-end justify-between gap-4 px-4">
                        {[40, 65, 30, 85, 50, 90, 60].map((h, i) => (
                            <div key={i} className="w-full bg-gray-100 rounded-t-2xl relative group overflow-hidden" style={{ height: `${h}%` }}>
                                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-2 bg-primary/20"></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-4 text-gray-400 font-bold text-sm">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Recent History */}
                <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                    <h3 className="text-2xl font-bold text-[#1C1C1E] mb-6">Recent History</h3>
                    <div className="flex flex-col gap-4">
                        {[
                            { title: "Morning Spine Flow", time: "Today, 8:00 AM", cal: "120", duration: "10m" },
                            { title: "Lower Body Power", time: "Yesterday, 6:30 PM", cal: "350", duration: "25m" },
                            { title: "Core Crusher", time: "Mon, 7:00 AM", cal: "180", duration: "15m" },
                            { title: "Quick Sweat", time: "Sun, 10:00 AM", cal: "200", duration: "12m" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-primary group-hover:text-[#1C1C1E] transition-colors">
                                        <Activity size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#1C1C1E]">{item.title}</h4>
                                        <p className="text-xs text-gray-400 font-medium">{item.time}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-[#1C1C1E]">{item.cal} kcal</div>
                                    <div className="text-xs text-gray-400 font-medium">{item.duration}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
