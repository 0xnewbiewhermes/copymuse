import { NextRequest, NextResponse } from "next/server";
import { generateStream } from "@/lib/ai-provider";
import { checkRateLimit } from "@/lib/rate-limit";
import { createStreamResponse } from "@/lib/stream-utils";
import { getBlogConfig } from "@/lib/prompts/blog-writer";

export async function POST(req: NextRequest) {
  const rateCheck = checkRateLimit(req);
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: rateCheck.message }, { status: rateCheck.status });
  }

  try {
    const body = await req.json();
    const { topic, length = 1, keywords = [], tone = "casual", customTone } = body;

    if (!topic || typeof topic !== "string" || topic.trim().length < 10) {
      return NextResponse.json({ error: "Topic must be at least 10 characters." }, { status: 400 });
    }
    if (topic.length > 2000) {
      return NextResponse.json({ error: "Topic max 2000 characters." }, { status: 400 });
    }

    const lengthIdx = Math.min(Math.max(Number(length) || 1, 0), 2);
    const kw = Array.isArray(keywords) ? keywords.slice(0, 5).filter(Boolean) : [];
    const config = getBlogConfig(lengthIdx, kw, tone, customTone);

    const gen = generateStream(config.systemPrompt, topic, {
      maxTokens: config.maxTokens,
      temperature: config.temperature,
    });

    return createStreamResponse(gen, req);
  } catch (err) {
    console.error("Blog writer error:", err instanceof Error ? err.message : "Unknown");
    return NextResponse.json({ error: "Failed to generate blog post." }, { status: 500 });
  }
}
