export class AudioStreamer {
    public audioContext: AudioContext | null = null;
    public isRecording: boolean = false;
    public workletNode: AudioWorkletNode | null = null;

    private mediaStream: MediaStream | null = null;
    private onDataAvailable: (data: ArrayBuffer) => void;
    private scheduledTime: number = 0;
    private processor: ScriptProcessorNode | null = null;

    constructor(onDataAvailable: (data: ArrayBuffer) => void) {
        this.onDataAvailable = onDataAvailable;
    }

    async initialize() {
        if (this.audioContext) return;

        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
            sampleRate: 24000, // Gemini Live API output sample rate
        });

        console.log("AudioStreamer initialized. Sample rate:", this.audioContext.sampleRate);
    }

    async resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
            console.log("AudioContext resumed");
        }
    }

    async startRecording() {
        await this.initialize();
        await this.resume();
        if (!this.audioContext) return;

        try {
            this.mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    sampleRate: 16000, // Desired input sample rate
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            console.log("Microphone access granted");

            // Use ScriptProcessor for simplicity in this context, ensuring 16kHz capture if possible
            // Note: The browser might not give exactly 16kHz, so we might need to downsample if strict 16kHz is required.
            // However, Gemini usually accepts standard PCM. We'll send what we get but try to request 16k.

            const source = this.audioContext.createMediaStreamSource(this.mediaStream);

            // Buffer size 4096 provides a good balance between latency and performance
            this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

            this.processor.onaudioprocess = (e) => {
                if (!this.isRecording) return;

                const inputData = e.inputBuffer.getChannelData(0);

                // Downsample to 16kHz if the context is running at a higher rate (e.g. 44.1kHz or 48kHz)
                // For this MVP, we will send the raw PCM and let the server handle it, 
                // BUT Gemini expects specific formats. 
                // Let's stick to a simple PCM conversion.

                const pcmData = this.floatTo16BitPCM(inputData);
                this.onDataAvailable(pcmData.buffer);
            };

            source.connect(this.processor);
            this.processor.connect(this.audioContext.destination);

            this.isRecording = true;
            console.log("Recording started");

        } catch (error) {
            console.error("Error starting recording:", error);
            throw error;
        }
    }

    stopRecording() {
        this.isRecording = false;
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }
        if (this.processor && this.audioContext) {
            this.processor.disconnect();
            this.processor = null;
        }
        console.log("Recording stopped");
    }

    playAudioChunk(base64Audio: string) {
        if (!this.audioContext) return;

        try {
            // 1. Decode Base64 to binary string
            const binaryString = window.atob(base64Audio);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // 2. Convert PCM (Int16) to Float32
            const int16Data = new Int16Array(bytes.buffer);
            const float32Data = new Float32Array(int16Data.length);
            for (let i = 0; i < int16Data.length; i++) {
                // Normalize to [-1.0, 1.0]
                float32Data[i] = int16Data[i] / 32768.0;
            }

            // 3. Create AudioBuffer
            // Gemini returns 24kHz audio
            const buffer = this.audioContext.createBuffer(1, float32Data.length, 24000);
            buffer.getChannelData(0).set(float32Data);

            // 4. Schedule Playback
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(this.audioContext.destination);

            const currentTime = this.audioContext.currentTime;
            // Ensure we schedule in the future, but not too far if we fell behind
            if (this.scheduledTime < currentTime) {
                this.scheduledTime = currentTime;
            }

            source.start(this.scheduledTime);
            this.scheduledTime += buffer.duration;

        } catch (error) {
            console.error("Error playing audio chunk:", error);
        }
    }

    private floatTo16BitPCM(input: Float32Array): Int16Array {
        const output = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) {
            const s = Math.max(-1, Math.min(1, input[i]));
            output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        return output;
    }
}
