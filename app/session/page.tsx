import LiveCoach from "@/components/LiveCoach";

export default function SessionPage() {
    return (
        <div className="h-screen bg-[#0a0a0a] text-white flex flex-col relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[180px] translate-y-1/3 -translate-x-1/4"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="flex-1 w-full max-w-[1600px] mx-auto p-6 lg:p-8 z-10 flex flex-col">
                <LiveCoach />
            </div>
        </div>
    );
}
