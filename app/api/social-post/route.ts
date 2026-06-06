import { NextRequest, NextResponse } from "next/server";
import { generateStream, generate } from "@/lib/ai-provider";
import { checkRateLimit } from "@/lib/rate-limit";
import { createStreamResponse } from "@/lib/stream-utils";
import { getSocialPostConfig, SOCIAL_PLATFORMS, type SocialPlatform } from "@/lib/prompts/social-post";

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
    if (topic.length > 1000) {
      return NextResponse.json({ error: "Topic max 1000 characters." }, { status: 400 });
    }

    const validPlatforms = SOCIAL_PLATFORMS.map(p => p.id);
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json({ error: `Invalid platform. Choose: ${validPlatforms.join(", ")}` }, { status: 400 });
    }

    const config = getSocialPostConfig(platform as SocialPlatform, tone, customTone);

    if (useStream) {
      const gen = generateStream(config.systemPrompt, topic, {
        maxTokens: config.maxTokens,
        temperature: config.temperature,
      });
      return createStreamResponse(gen, req);
    }

    const content = await generate(config.systemPrompt, topic, {
      maxTokens: config.maxTokens,
      temperature: config.temperature,
    });

    return NextResponse.json({ content, charCount: [...content].length });
  } catch (err) {
    console.error("Social post error:", err instanceof Error ? err.message : "Unknown");
    return NextResponse.json({ error: "Failed to generate post." }, { status: 500 });
  }
}
