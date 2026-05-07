import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize the Groq SDK. 
// It will automatically use the GROQ_API_KEY environment variable.
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'missing-key',
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { message: "API key is missing! Please add GROQ_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: 'system', 
          content: `You are CodeLens, an expert senior software engineer. When a user provides code, you MUST start your response with "RANK: [S/A/B/C/D]" (S is perfect, D is poor). Then provide a concise, ruthless but helpful code review.`
        },
        ...messages
      ],
      model: 'llama-3.1-8b-instant',
    });

    return NextResponse.json({
      message: chatCompletion.choices[0]?.message?.content || "No response received.",
    });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { message: error.message || 'An error occurred while connecting to Groq.' },
      { status: 500 }
    );
  }
}
