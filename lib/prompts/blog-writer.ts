export const LENGTHS = ["short (300-500 words)", "medium (800-1200 words)", "long (1500-2500 words)"];

export function getBlogConfig(length: number, keywords: string[], tone: string, customTone?: string) {
  const lengthDesc = LENGTHS[length] ?? LENGTHS[1];
  const toneGuide = tone === "custom" && customTone ? customTone :
    tone === "professional" ? "Professional, authoritative, well-researched" :
    tone === "casual" ? "Conversational, easy to read, relatable" :
    tone === "storytelling" ? "Narrative, engaging, flows like a story" :
    "Clear, informative, structured";

  return {
    systemPrompt: `You are an expert blog writer and SEO specialist.

Write a blog post of ${lengthDesc} with tone: ${toneGuide}.

Target keywords: ${keywords.join(", ")}

Structure:
1. Engaging title (H1)
2. Meta description (1-2 sentences)
3. Introduction with hook
4. 3-5 subheadings (H2) with content
5. Conclusion with key takeaways
6. FAQ section with 3-5 questions

Requirements:
- Natural keyword integration (don't force)
- Short paragraphs for readability
- Data/examples where relevant
- No markdown formatting in final output (use plain headings)

Output as JSON:
{
  "title": "...",
  "metaDescription": "...",
  "content": "...",
  "keywords": [...],
  "estimatedReadTime": "..."
}`,
    userPrompt: (topic: string) => topic,
    maxTokens: 8000,
    temperature: 0.8,
  };
}
