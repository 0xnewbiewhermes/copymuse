import { NextRequest, NextResponse } from "next/server";
import { generate } from "@/lib/ai-provider";
import { checkRateLimit } from "@/lib/rate-limit";
import { getSeoConfig } from "@/lib/prompts/seo-optimizer";

export async function POST(req: NextRequest) {
  const rateCheck = checkRateLimit(req);
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: rateCheck.message }, { status: rateCheck.status });
  }

  try {
    const body = await req.json();
    const { content, targetKeyword, contentType } = body;

    if (!content || typeof content !== "string" || content.trim().length < 50) {
      return NextResponse.json({ error: "Content must be at least 50 characters." }, { status: 400 });
    }
    if (content.length > 10000) {
      return NextResponse.json({ error: "Content max 10000 characters." }, { status: 400 });
    }
    if (!targetKeyword || typeof targetKeyword !== "string" || !targetKeyword.trim()) {
      return NextResponse.json({ error: "Target keyword is required." }, { status: 400 });
    }

    const config = getSeoConfig(targetKeyword.trim(), contentType || "");
    const result = await generate(config.systemPrompt, content, {
      maxTokens: config.maxTokens,
      temperature: config.temperature,
    });

    try {
      const parsed = JSON.parse(result);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({
        title: "",
        metaDescription: "",
        suggestions: ["AI returned unstructured data. Try a shorter input."],
        keywordDensity: [],
        headingStructure: [],
        readabilityScore: "N/A",
        optimizedContent: result,
      });
    }
  } catch (err) {
    console.error("SEO optimizer error:", err instanceof Error ? err.message : "Unknown");
    return NextResponse.json({ error: "Failed to analyze content." }, { status: 500 });
  }
}
