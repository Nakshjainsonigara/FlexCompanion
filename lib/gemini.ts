import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Initialize Gemini
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export async function analyzePosture(imageBase64: string) {
    if (!genAI) {
        console.warn("Gemini API Key missing");
        return {
            feedback: "API Key missing. Please configure NEXT_PUBLIC_GEMINI_API_KEY.",
            correction: "N/A",
            status: "error"
        };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Remove header if present (data:image/jpeg;base64,)
        const base64Data = imageBase64.split(",")[1];

        const prompt = `
      You are an expert physiotherapist and stretching coach. 
      Analyze this image of a user stretching.
      1. Identify the stretch they are performing.
      2. Check their form (spine alignment, limb position).
      3. Provide BRIEF, direct feedback (max 2 sentences).
      4. If form is good, give encouragement. If bad, give specific correction.
      
      Return JSON format:
      {
        "pose": "Name of pose",
        "status": "good" | "correction_needed",
        "feedback": "Your feedback here"
      }
    `;

        const result = await model.generateContent([
            prompt,
            { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
        ]);

        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return {
            feedback: "Unable to analyze posture at the moment.",
            status: "error"
        };
    }
}
