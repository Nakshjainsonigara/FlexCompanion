import Link from "next/link";
import { Construction } from "lucide-react";

export default function ComingSoon() {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <Construction size={48} className="text-gray-400" />
            </div>
            <h1 className="text-4xl font-bold text-[#1C1C1E] mb-4">Coming Soon</h1>
            <p className="text-gray-500 max-w-md mb-8">
                We're working hard to bring you this feature. Stay tuned for updates!
            </p>
            <Link href="/dashboard" className="bg-[#1C1C1E] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                Back to Dashboard
            </Link>
        </div>
    );
}
