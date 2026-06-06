import { NextRequest, NextResponse } from "next/server";
import { generateStream, generate } from "@/lib/ai-provider";
import { checkRateLimit } from "@/lib/rate-limit";
import { createStreamResponse } from "@/lib/stream-utils";
import { getSystemPrompt, PLATFORMS } from "@/lib/prompts/caption";

export async function POST(req: NextRequest) {
  const rateCheck = checkRateLimit(req);
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: rateCheck.message }, { status: rateCheck.status });
  }

  try {
    const body = await req.json();
    const { topic, platform, tone, customTone, stream: useStream } = body;

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return NextResponse.json({ error: "Topic is required." }, { status: 400 });
    }
    if (topic.length > 2000) {
      return NextResponse.json({ error: "Topic max 2000 characters." }, { status: 400 });
    }
    if (!PLATFORMS.includes(platform)) {
      return NextResponse.json({ error: `Invalid platform. Choose: ${PLATFORMS.join(", ")}` }, { status: 400 });
    }
    if (tone === "custom" && (!customTone || !customTone.trim())) {
      return NextResponse.json({ error: "Custom tone description is required." }, { status: 400 });
    }

    const systemPrompt = getSystemPrompt(platform, tone, customTone);

    if (useStream) {
      const gen = generateStream(systemPrompt, topic, {
        maxTokens: 4000,
        temperature: 0.9,
      });
      return createStreamResponse(gen, req);
    }

    const content = await generate(systemPrompt, topic, {
      maxTokens: 4000,
      temperature: 0.9,
    });

    return NextResponse.json({ content, charCount: [...content].length });
  } catch (err) {
    console.error("Caption generation error:", err instanceof Error ? err.message : "Unknown");
    return NextResponse.json({ error: "Failed to generate caption. Please try again." }, { status: 500 });
  }
}
