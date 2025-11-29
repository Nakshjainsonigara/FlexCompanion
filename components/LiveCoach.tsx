"use client";

import { useEffect, useRef, useState } from "react";
import { AudioStreamer } from "@/lib/audio-stream";
import { Mic, MicOff, Video, VideoOff, X, Zap, Clock, Flame, Activity, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const HOST = "generativelanguage.googleapis.com";
const URI = `wss://${HOST}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${API_KEY}`;

export default function LiveCoach() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // State
    const [isConnected, setIsConnected] = useState(false);
    const [isMicOn, setIsMicOn] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [status, setStatus] = useState("Disconnected");
    const [time, setTime] = useState(0);
    const [currentMove, setCurrentMove] = useState(0);

    // Refs
    const wsRef = useRef<WebSocket | null>(null);
    const audioStreamerRef = useRef<AudioStreamer | null>(null);

    const [showSuccess, setShowSuccess] = useState(false);

    const moves = [
        { name: "Standing Warmup", duration: "30s", icon: "/assets/poses/standing.jpg" },
        { name: "Cobra Stretch", duration: "45s", icon: "/assets/poses/cobra-stretch.jpg" },
        { name: "Child's Pose", duration: "60s", icon: "/assets/poses/child-pose.jpg" },
        { name: "Downward Dog", duration: "45s", icon: "/assets/poses/downward-dog.jpg" },
    ];

    // Simulate move progression
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isConnected) {
            const interval = setInterval(() => {
                setCurrentMove(prev => (prev + 1) % moves.length);
            }, 10000); // Change move every 10s for demo
            return () => clearInterval(interval);
        }
    }, [isConnected]);

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isConnected) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isConnected]);

    useEffect(() => {
        audioStreamerRef.current = new AudioStreamer((data) => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                const base64Audio = btoa(
                    String.fromCharCode(...new Uint8Array(data))
                );
                wsRef.current.send(JSON.stringify({
                    realtime_input: {
                        media_chunks: [{
                            mime_type: "audio/pcm",
                            data: base64Audio
                        }]
                    }
                }));
            }
        });

        return () => {
            disconnect();
        };
    }, []);

    const connect = async () => {
        if (wsRef.current) return;

        setStatus("Connecting...");
        console.log("Initiating connection to:", URI);

        try {
            // Ensure AudioContext is resumed on user gesture
            if (audioStreamerRef.current) {
                await audioStreamerRef.current.resume();
            }

            const ws = new WebSocket(URI);
            wsRef.current = ws;

            ws.onopen = async () => {
                console.log("WebSocket Connected");
                setIsConnected(true);
                setStatus("Connected");

                // Send initial setup message
                const setupMessage = {
                    setup: {
                        model: "models/gemini-2.0-flash-exp",
                        generation_config: {
                            response_modalities: ["AUDIO", "TEXT"]
                        },
                        system_instruction: {
                            parts: [{
                                text: "You are FlexCompanion, an elite physiotherapist and mobility coach. Your goal is to guide the user through a stretching session. 1. Be concise and direct. Give clear, actionable instructions. 2. Focus on form and posture. 3. Be encouraging but professional. 4. Do not make up medical advice, but strictly guide the movement. 5. Avoid generic small talk. Focus entirely on the workout. 6. If the user performs the move correctly or you want to praise them, say the word 'Correct' clearly."
                            }]
                        }
                    }
                };
                console.log("Sending setup message:", setupMessage);
                ws.send(JSON.stringify(setupMessage));

                if (audioStreamerRef.current) {
                    await audioStreamerRef.current.startRecording();
                    setIsMicOn(true);
                    console.log("Audio recording started");
                }
            };

            ws.onmessage = async (event) => {
                let data = event.data;
                if (data instanceof Blob) {
                    data = await data.text();
                }

                try {
                    const response = JSON.parse(data);

                    if (response.serverContent?.modelTurn?.parts) {
                        const parts = response.serverContent.modelTurn.parts;
                        for (const part of parts) {
                            if (part.inlineData && part.inlineData.mimeType.startsWith("audio/")) {
                                // console.log("Received audio chunk, playing...");
                                if (audioStreamerRef.current) {
                                    audioStreamerRef.current.playAudioChunk(part.inlineData.data);
                                }
                            }
                            // Handle text response for "Hooray" trigger
                            if (part.text) {
                                console.log("AI Text:", part.text);
                                if (part.text.toLowerCase().includes("correct")) {
                                    setShowSuccess(true);
                                    setTimeout(() => setShowSuccess(false), 3000);
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.error("Error parsing message:", e);
                }
            };

            ws.onerror = (error) => {
                console.error("WebSocket Error:", error);
                setStatus("Error");
            };

            ws.onclose = (event) => {
                console.log("WebSocket Closed:", event.code, event.reason);
                setIsConnected(false);
                setStatus("Disconnected");
                setIsMicOn(false);
            };
        } catch (error) {
            console.error("Connection failed:", error);
            setStatus("Connection Failed");
        }
    };

    const disconnect = () => {
        console.log("Disconnecting...");
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        if (audioStreamerRef.current) {
            audioStreamerRef.current.stopRecording();
        }
        setIsConnected(false);
        setIsMicOn(false);
        setStatus("Disconnected");
    };

    useEffect(() => {
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 1280, height: 720 }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Camera Error:", err);
            }
        }
        startCamera();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isConnected || !wsRef.current || !canvasRef.current || !videoRef.current) return;

            const canvas = canvasRef.current;
            const video = videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const base64Image = canvas.toDataURL("image/jpeg", 0.6).split(",")[1];

                wsRef.current.send(JSON.stringify({
                    realtime_input: {
                        media_chunks: [{
                            mime_type: "image/jpeg",
                            data: base64Image
                        }]
                    }
                }));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isConnected]);

    return (
        <div className="relative w-full h-full flex flex-col bg-[#1C1C1E] rounded-[40px] overflow-hidden shadow-2xl border border-white/5 ring-1 ring-white/10">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 p-8 z-10 flex justify-between items-start bg-gradient-to-b from-black/80 via-black/40 to-transparent">
                <Link href="/dashboard" className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white hover:bg-white/20 transition-all hover:scale-105 active:scale-95 group">
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </Link>

                <div className="flex flex-col items-center animate-fade-in">
                    <h2 className="text-white font-bold text-2xl tracking-tight">Lower Body Training</h2>
                    <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/5">
                        <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isConnected ? 'bg-primary shadow-[0_0_10px_#D4F932]' : 'bg-red-500'}`}></div>
                        <span className="text-xs font-bold uppercase tracking-wider text-white/80">{status}</span>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-full text-white font-mono font-bold text-lg flex items-center gap-3 border border-white/5">
                    <Clock size={18} className="text-primary" />
                    {formatTime(time)}
                </div>
            </div>

            {/* Main Video */}
            <div className="flex-1 relative bg-black">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-700 ${!isVideoOn ? 'opacity-0' : 'opacity-100'}`}
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Current Move Overlay */}
                {isConnected && (
                    <div className="absolute top-1/4 right-8 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] w-64 animate-slide-left">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">Current Move</span>
                            <span className="text-xs font-bold text-white/60">{moves[currentMove].duration}</span>
                        </div>
                        <div className="w-full aspect-square bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/5 p-4">
                            {/* Generated SVG Asset */}
                            <img
                                src={moves[currentMove].icon as string}
                                alt={moves[currentMove].name}
                                className="w-full h-full object-contain opacity-80 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">{moves[currentMove].name}</h3>
                    </div>
                )}

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">

                    {/* Stats */}
                    <div className="bg-white/10 backdrop-blur-md rounded-[32px] p-6 border border-white/10 flex items-center gap-4 pointer-events-auto">
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                            <Flame size={24} fill="currentColor" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white leading-none mb-1">450</div>
                            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Kcal Burned</div>
                        </div>
                    </div>

                    {/* Main Controls */}
                    <div className="flex items-center gap-6 absolute left-1/2 -translate-x-1/2 bottom-8 pointer-events-auto">
                        <button
                            onClick={() => setIsMicOn(!isMicOn)}
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isMicOn ? 'bg-white text-black hover:scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            {isMicOn ? <Mic size={28} /> : <MicOff size={28} />}
                        </button>

                        {!isConnected ? (
                            <button
                                onClick={connect}
                                className="h-20 px-10 rounded-full bg-[#D4F932] hover:bg-[#c2e62d] text-black font-black text-xl tracking-tight flex items-center gap-3 transition-all hover:scale-105 shadow-[0_0_40px_rgba(212,249,50,0.3)] cursor-pointer z-50"
                            >
                                <Zap size={28} fill="currentColor" />
                                Start Workout
                            </button>
                        ) : (
                            <button
                                onClick={disconnect}
                                className="h-20 w-20 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all hover:scale-105 shadow-lg shadow-red-500/30 cursor-pointer z-50"
                            >
                                <div className="w-8 h-8 bg-white rounded-md"></div>
                            </button>
                        )}

                        <button
                            onClick={() => setIsVideoOn(!isVideoOn)}
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isVideoOn ? 'bg-white text-black hover:scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            {isVideoOn ? <Video size={28} /> : <VideoOff size={28} />}
                        </button>
                    </div>

                    <div className="w-[180px] hidden md:block"></div> {/* Spacer for balance */}
                </div>
            </div>
            );
}
