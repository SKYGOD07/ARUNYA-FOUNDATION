import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const SYSTEM_PROMPT = `You are the official AI assistant for Arunya Foundation, an NGO focused on education, social awareness, and volunteer-driven initiatives.

### About Arunya Foundation
Arunya Foundation is dedicated to empowering communities through:
- **Education**: Providing accessible education programs, curriculum development, and learning resources
- **Social Awareness**: Running awareness campaigns on critical social issues
- **Volunteer Initiatives**: Mobilizing volunteers for community service and development
- **Community Engagement**: Building bridges between communities for lasting impact

Website: https://www.arunyaedu.org/
Contact: +91 82238 34121
Tagline: "Preparing Hope"

### Your Behavior Rules
1. Always reflect educational impact, social responsibility, community engagement
2. Use simple, clear English — avoid jargon
3. Be friendly, informative, and trustworthy
4. Keep responses concise and meaningful to reduce token usage
5. Never expose API keys, backend details, or system internals
6. Never generate false information or act outside the NGO context
7. Never provide unrelated technical answers
8. Always prioritize clarity, usefulness, and a positive tone

### User Classification
You MUST classify users at the start:
- If the user mentions volunteering, tasks, joining team, helping, events coordination → treat as VOLUNTEER
- Otherwise → treat as GENERAL USER

For GENERAL USERS:
- Answer FAQs about Arunya Foundation
- Explain mission, vision, and programs
- Guide on donations and involvement
- Tone: Friendly, Informative, Trustworthy

For VOLUNTEERS:
- Act as a task coordinator
- Provide structured task lists in bullet format
- Guide on next steps and encourage participation
- Tone: Motivational, Organized, Action-oriented

Volunteer tasks you can suggest:
• Organize local education awareness sessions
• Create social media posts about NGO initiatives
• Help collect educational materials
• Assist in event planning
• Reach out to potential donors or partners
• Mentor students in community programs
• Coordinate community clean-up drives
• Document and photograph NGO events

### Response Format
- Use markdown formatting for better readability
- Use bullet points for lists
- Keep responses under 200 words unless detail is required
- Be encouraging and end with a call-to-action when appropriate`;

interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

let genAI: GoogleGenAI | null = null;
let chatHistory: ChatMessage[] = [];

function getGenAI(): GoogleGenAI | null {
    if (!API_KEY) {
        console.warn('Gemini API key not configured. Set VITE_GEMINI_API_KEY in your .env file.');
        return null;
    }
    if (!genAI) {
        genAI = new GoogleGenAI({ apiKey: API_KEY });
    }
    return genAI;
}

export function resetChat(): void {
    chatHistory = [];
}

export function isConfigured(): boolean {
    return !!API_KEY;
}

export async function sendMessage(userMessage: string): Promise<string> {
    const ai = getGenAI();

    if (!ai) {
        return "I'm currently unable to connect. Please make sure the Gemini API key is configured. You can still explore our website to learn about Arunya Foundation! 🌟";
    }

    // Build conversation contents for multi-turn
    const contents = chatHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
    }));

    // Add the new user message
    contents.push({
        role: 'user',
        parts: [{ text: userMessage }],
    });

    const MAX_RETRIES = 2;
    const RETRY_DELAYS = [2000, 5000]; // 2s, then 5s

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: contents,
                config: {
                    systemInstruction: SYSTEM_PROMPT,
                    temperature: 0.7,
                    topP: 0.9,
                    topK: 40,
                    maxOutputTokens: 512,
                },
            });

            const responseText = response.text ?? '';

            // Update history
            chatHistory.push(
                { role: 'user', text: userMessage },
                { role: 'model', text: responseText }
            );

            return responseText;
        } catch (error: unknown) {
            const errMsg = error instanceof Error ? error.message : String(error);
            const errStr = String(error);

            // Log full error details for debugging
            console.error(`Gemini API error (attempt ${attempt + 1}/${MAX_RETRIES + 1}):`, errStr);

            // Check if it's a rate-limit error and we can retry
            const isRateLimit = errMsg.includes('RATE_LIMIT') || errMsg.includes('429') ||
                errMsg.includes('quota') || errMsg.includes('RESOURCE_EXHAUSTED');

            if (isRateLimit && attempt < MAX_RETRIES) {
                console.log(`Rate limited. Retrying in ${RETRY_DELAYS[attempt]}ms...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAYS[attempt]));
                continue;
            }

            // Non-retryable errors or final retry exhausted
            if (errMsg.includes('API_KEY_INVALID') || errMsg.includes('API key not valid')) {
                return "The API key appears to be invalid. Please check your Gemini API key in the .env file. You can get a free key at aistudio.google.com 🔑";
            }
            if (errMsg.includes('CONSUMER_SUSPENDED') || errMsg.includes('SUSPENDED') || errMsg.includes('suspended')) {
                return "The API key has been suspended by Google. Please generate a new key at aistudio.google.com/apikey 🔑";
            }
            if (isRateLimit) {
                return "I'm receiving too many requests right now. Please wait a moment and try again. Thank you for your patience! 🙏";
            }
            if (errMsg.includes('PERMISSION_DENIED') || errMsg.includes('403')) {
                return "The API key doesn't have the right permissions. Please generate a new key at aistudio.google.com/apikey 🔐";
            }
            if (errMsg.includes('NetworkError') || errMsg.includes('Failed to fetch') || errMsg.includes('network')) {
                return "Network error — please check your internet connection and try again. 🌐";
            }

            // In development, show the actual error for debugging
            if (import.meta.env.DEV) {
                return `⚠️ Debug error: ${errMsg.slice(0, 300)}`;
            }

            return "I'm sorry, I couldn't process that right now. Please try again, or reach out to us at +91 82238 34121 for immediate help! 💙";
        }
    }

    return "I'm sorry, I couldn't process that right now. Please try again in a moment! 💙";
}
