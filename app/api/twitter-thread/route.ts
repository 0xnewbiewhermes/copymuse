import { NextRequest, NextResponse } from "next/server";
import { generateStream } from "@/lib/ai-provider";
import { checkRateLimit } from "@/lib/rate-limit";
import { createStreamResponse } from "@/lib/stream-utils";
import { getThreadConfig } from "@/lib/prompts/twitter-thread";

export async function POST(req: NextRequest) {
  const rateCheck = checkRateLimit(req);
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: rateCheck.message }, { status: rateCheck.status });
  }

  try {
    const body = await req.json();
    const { topic, tone = "casual", threadLength = 5 } = body;

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return NextResponse.json({ error: "Topic is required." }, { status: 400 });
    }
    if (topic.length > 1000) {
      return NextResponse.json({ error: "Topic max 1000 characters." }, { status: 400 });
    }

    const len = Math.min(Math.max(Number(threadLength) || 5, 3), 15);
    const config = getThreadConfig(tone, len);

    const gen = generateStream(config.systemPrompt, topic, {
      maxTokens: config.maxTokens,
      temperature: config.temperature,
    });

    return createStreamResponse(gen, req);
  } catch (err) {
    console.error("Thread error:", err instanceof Error ? err.message : "Unknown");
    return NextResponse.json({ error: "Failed to generate thread." }, { status: 500 });
  }
}
