import { User, Bell, Lock, Smartphone, LogOut, ChevronRight, Moon, Volume2 } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="p-6 lg:p-12 max-w-[1000px] mx-auto h-full flex flex-col gap-10">
            <div className="animate-fade-in">
                <h1 className="text-4xl font-bold text-[#1C1C1E] tracking-tight mb-2">Settings</h1>
                <p className="text-gray-500 font-medium text-lg">Manage your preferences and account.</p>
            </div>

            {/* Profile Section */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex items-center gap-6 animate-slide-up">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-lime-500 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-[#1C1C1E]">
                    N
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#1C1C1E]">Naksh</h2>
                    <p className="text-gray-400">Premium Member</p>
                    <p className="text-gray-400">naksh@example.com</p>
                </div>
                <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full font-bold text-[#1C1C1E] transition-colors">
                    Edit Profile
                </button>
            </div>

            {/* Settings Groups */}
            <div className="space-y-6 pb-12">

                {/* Preferences */}
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-[#1C1C1E]">Preferences</h3>
                    </div>
                    <div className="divide-y divide-gray-50">
                        <SettingItem icon={<Moon size={20} />} title="Dark Mode" subtitle="Adjust appearance" toggle />
                        <SettingItem icon={<Volume2 size={20} />} title="Voice Feedback" subtitle="AI Coach volume" toggle defaultChecked />
                        <SettingItem icon={<Bell size={20} />} title="Notifications" subtitle="Workout reminders" toggle defaultChecked />
                    </div>
                </div>

                {/* Account */}
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-bold text-[#1C1C1E]">Account</h3>
                    </div>
                    <div className="divide-y divide-gray-50">
                        <SettingItem icon={<Lock size={20} />} title="Privacy & Security" subtitle="Manage your data" arrow />
                        <SettingItem icon={<Smartphone size={20} />} title="Connected Devices" subtitle="Apple Watch, Fitbit" arrow />
                        <button className="w-full p-6 flex items-center gap-4 hover:bg-red-50 transition-colors text-left group">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                <LogOut size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-red-500">Log Out</h4>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

function SettingItem({ icon, title, subtitle, toggle, arrow, defaultChecked }: any) {
    return (
        <div className="p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                {icon}
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-[#1C1C1E]">{title}</h4>
                <p className="text-sm text-gray-400 font-medium">{subtitle}</p>
            </div>
            {arrow && <ChevronRight size={20} className="text-gray-400" />}
            {toggle && (
                <div className={`w-12 h-7 rounded-full relative transition-colors ${defaultChecked ? 'bg-primary' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${defaultChecked ? 'left-6' : 'left-1'}`}></div>
                </div>
            )}
        </div>
    );
}
