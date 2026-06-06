import { NextRequest, NextResponse } from "next/server";
import { generate } from "@/lib/ai-provider";
import { checkRateLimit } from "@/lib/rate-limit";
import { getBlogConfig, LENGTHS } from "@/lib/prompts/blog-writer";

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

    const result = await generate(config.systemPrompt, topic, {
      maxTokens: config.maxTokens,
      temperature: config.temperature,
    });

    try {
      const parsed = JSON.parse(result);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({
        title: topic,
        content: result,
        keywords: kw,
        estimatedReadTime: "5 min",
      });
    }
  } catch (err) {
    console.error("Blog writer error:", err instanceof Error ? err.message : "Unknown");
    return NextResponse.json({ error: "Failed to generate blog post." }, { status: 500 });
  }
}
