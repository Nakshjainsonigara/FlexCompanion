"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Activity, User, Settings, Zap, BarChart2, Calendar } from "lucide-react";

const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Explore", href: "/coming-soon", icon: Compass },
    { name: "Activity", href: "/coming-soon", icon: BarChart2 },
    { name: "Schedule", href: "/coming-soon", icon: Calendar },
    { name: "Profile", href: "/coming-soon", icon: User },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-20 lg:w-24 bg-[#1C1C1E] h-screen flex flex-col items-center py-8 border-r border-white/5 z-50">
            {/* Logo */}
            <div className="mb-10">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(212,249,50,0.3)]">
                    <Zap size={24} className="text-black fill-black" />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-4 w-full px-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (pathname === '/dashboard' && item.name === 'Home');

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 p-3 rounded-2xl transition-all group relative ${isActive
                                    ? "bg-white/10 text-primary"
                                    : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                                }`}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            {isActive && (
                                <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"></div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-auto flex flex-col gap-4">
                <button className="p-3 text-gray-500 hover:text-white transition-colors">
                    <Settings size={24} />
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 border-2 border-[#1C1C1E]"></div>
            </div>
        </aside>
    );
}
