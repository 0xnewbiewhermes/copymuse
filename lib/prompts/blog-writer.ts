export const LENGTHS = ["short (300-500 words)", "medium (800-1200 words)", "long (1500-2500 words)"];

export function getBlogConfig(length: number, keywords: string[], tone: string, customTone?: string) {
  const lengthDesc = LENGTHS[length] ?? LENGTHS[1];
  const rawToneGuide = tone === "custom" && customTone ? customTone :
    tone === "professional" ? "Professional, authoritative, well-researched" :
    tone === "casual" ? "Conversational, easy to read, relatable" :
    tone === "storytelling" ? "Narrative, engaging, flows like a story" :
    "Clear, informative, structured";
  const toneGuide = rawToneGuide.replace(/["\n\r]/g, "").slice(0, 200);
  const safeKeywords = keywords.map(k => k.replace(/["\n\r]/g, "").slice(0, 50)).filter(Boolean);

  return {
    systemPrompt: `You are an expert blog writer and SEO specialist.

Write a blog post of ${lengthDesc} with tone: ${toneGuide}.

Target keywords: ${safeKeywords.join(", ")}

Format (strict):
1. First line is the blog title ONLY — no prefix, no quotes, just the title
2. A blank line
3. The full blog post with ## headings (plain text), short paragraphs, and a FAQ section at the end

Requirements:
- Natural keyword integration (don't force)
- No markdown formatting — use plain ## headings
- No JSON, no code fences, no "Here's your post:" — output the content directly`,
    userPrompt: (topic: string) => topic,
    maxTokens: 8000,
    temperature: 0.8,
  };
}
