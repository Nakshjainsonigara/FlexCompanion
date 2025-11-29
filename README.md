## FlexCompanion – AI Physiotherapy & Mobility Coach

FlexCompanion is an AI‑powered physiotherapy and mobility coach that runs entirely in the browser.  
Using your laptop camera, microphone, and Google Gemini, it guides you through stretching and mobility flows with real‑time feedback on form.

https://github.com/user-attachments/assets/dc609655-3b54-4640-918e-ad5d9fb813ba

### Key Features

- **AI Live Coach** – Two‑way audio and camera stream to a Gemini model that gives real‑time verbal guidance and encouragement.
- **Form Feedback Overlay** – Session view with timer, current move card, and success “Correct!” celebration when the AI approves your form.
- **Beautiful Dashboard** – Morning “Daily Pick” routine, active challenges, and quick links into session, routines, progress, and settings.
- **Routines Library** – Prebuilt mobility flows (spine, lower body, recovery, etc.) designed for short daily sessions.
- **Progress & Goals** – Simple kcal/volume summaries and weekly goal tracking to keep you consistent.
- **Responsive, Premium UI** – Built with modern glassmorphism, gradients, and motion, optimized for desktop web.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** `lucide-react`
- **AI:** Google Gemini (realtime WebSocket API)
- **Audio/Video:** WebRTC `getUserMedia`, custom `AudioStreamer` for PCM audio, Web Audio API

Key implementation pieces:

- `components/LiveCoach.tsx` – Live session surface, timers, overlays, and Gemini WebSocket wiring.
- `lib/audio-stream.ts` – Microphone capture and streaming of PCM audio chunks to the model.
- `lib/gemini.ts` – Client helpers for talking to Gemini.
- `app/dashboard` – Main logged‑in dashboard experience.
- `app/session` – Full‑screen live session using the LiveCoach.

---

## Getting Started

### Prerequisites

- Node.js **20+**
- npm (or another package manager like pnpm/yarn/bun)
- A Google Gemini API key with access to the realtime WebSocket endpoint

### 1. Clone and install

```bash
git clone https://github.com/Nakshjainsonigara/FlexCompanion.git
cd FlexCompanion
npm install
```

### 2. Configure environment

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

> Without this key, the app UI will still load, but the live coach will not be able to connect to Gemini and “Start Workout” sessions will not fully work.

### 3. Run the dev server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## Available Scripts

All commands are run from the project root:

- `npm run dev` – Start the Next.js development server.
- `npm run build` – Create an optimized production build.
- `npm start` – Run the built app in production mode.
- `npm run lint` – Run ESLint on the codebase.

There is also a helper script for assets:

- `node scripts/generate-assets.mjs` – Utility script for generating visual assets (if/when needed).

---

## Project Structure

Only the most important pieces are listed here:

- `app/page.tsx` – Marketing landing page for FlexCompanion.
- `app/dashboard` – Authenticated‑style dashboard and daily routine entrypoint.
- `app/session` – Live session container with the AI coach.
- `app/routines` – Routines explorer.
- `app/progress` – Progress and stats views.
- `app/settings` – Profile and app settings surface.
- `components/LiveCoach.tsx` – Main AI coaching surface.
- `components/Sidebar.tsx` – Navigation sidebar for dashboard layouts.
- `public/assets/poses/*` – Pose illustrations used in the coaching UI.

---

## How the Live Coach Works (High Level)

1. When you click **Start Workout**, the browser:
   - Opens a WebSocket to the Gemini realtime endpoint.
   - Starts capturing microphone audio and camera frames.
2. Audio is converted to PCM and streamed as base64 chunks over the WebSocket.
3. The model responds with:
   - **Audio** chunks – played back locally with the Web Audio API.
   - **Text** – used to trigger UI events (e.g., showing the “Correct!” celebration when the model says “correct”).
4. The overlay updates the current move, timer, and basic stats while you flow.

---

## Notes & Limitations

- FlexCompanion is a **technical prototype** / hackathon project and **not medical advice**.
- Always consult a licensed professional for diagnosis, treatment, or rehab guidance.
- The experience works best on a laptop/desktop with a clear camera view and a stable internet connection.

---

## License

This project is currently shared as‑is for demo and learning purposes.  
If you plan to use it commercially or contribute, please open an issue or contact the repository owner first.
