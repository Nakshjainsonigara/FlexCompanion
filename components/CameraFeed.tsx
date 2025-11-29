"use client";

import { useEffect, useRef, useState } from "react";
import { analyzePosture } from "@/lib/gemini";
import { Camera, AlertCircle, CheckCircle, Volume2, VolumeX } from "lucide-react";

export default function CameraFeed() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [feedback, setFeedback] = useState<any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    const speak = (text: string) => {
        if (isMuted || !window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user" }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Camera Error:", err);
                setError("Unable to access camera. Please allow permissions.");
            }
        }

        startCamera();

        return () => {
            // Cleanup stream
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Analysis Loop
    useEffect(() => {
        const interval = setInterval(async () => {
            if (!videoRef.current || !canvasRef.current || isAnalyzing) return;

            setIsAnalyzing(true);

            try {
                // Capture frame
                const video = videoRef.current;
                const canvas = canvasRef.current;
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const base64Image = canvas.toDataURL("image/jpeg", 0.7);

                    // Send to Gemini
                    const result = await analyzePosture(base64Image);
                    setFeedback(result);

                    if (result.feedback) {
                        speak(result.feedback);
                    }
                }
            } catch (err) {
                console.error("Analysis Error:", err);
            } finally {
                setIsAnalyzing(false);
            }
        }, 3000); // Analyze every 3 seconds

        return () => clearInterval(interval);
    }, [isAnalyzing, isMuted]); // Added isMuted to dependencies to ensure speak function uses latest state

    return (
        <div className="relative w-full max-w-4xl mx-auto aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            {/* Video Feed */}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
            />

            {/* Hidden Canvas for Capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Voice Toggle */}
            <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-4 left-4 z-50 bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10 hover:bg-black/70 transition-colors text-white"
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Error Overlay */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
                    <div className="text-center p-6">
                        <Camera size={48} className="mx-auto text-red-500 mb-4" />
                        <p className="text-white text-xl">{error}</p>
                    </div>
                </div>
            )}

            {/* Feedback Overlay */}
            {feedback && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent transition-all duration-500">
                    <div className="flex items-start gap-4 max-w-2xl mx-auto">
                        <div className={`p-3 rounded-full ${feedback.status === 'good' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                            {feedback.status === 'good' ? <CheckCircle size={32} /> : <AlertCircle size={32} />}
                        </div>

                        <div>
                            <h3 className="text-white font-bold text-lg mb-1">
                                {feedback.pose || "Analyzing..."}
                            </h3>
                            <p className="text-slate-200 text-lg leading-relaxed">
                                {feedback.feedback}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Indicator */}
            {isAnalyzing && (
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white font-medium">AI Watching</span>
                </div>
            )}
        </div>
    );
}
