import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { auditData } = await req.json();

    if (!auditData) {
      return NextResponse.json({ error: "No audit data provided" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      // Fallback to mock if no API key
      return NextResponse.json({ 
        summary: "We couldn't reach the AI advisor, but based on our algorithms, you are overspending on duplicate tools. Consider consolidating your AI assistants to save money."
      });
    }

    const prompt = `
      You are an AI finance advisor for startups.
      
      Analyze the following AI spending data for a startup:
      ${JSON.stringify(auditData, null, 2)}
      
      Return a concise report (~100 words) with:
      - Biggest waste area
      - Top 2 consolidation recommendations
      - Total potential annual savings
      
      Tone: professional, analytical, founder-friendly.
    `;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a specialized AI finance consultant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const summary = data.choices[0]?.message?.content || "Unable to generate summary.";

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("AI Summary Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
