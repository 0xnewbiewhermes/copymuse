export interface SeoAnalysis {
  title: string;
  metaDescription: string;
  suggestions: string[];
  keywordDensity: { keyword: string; count: number; density: string }[];
  headingStructure: { issue: string; suggestion: string }[];
  readabilityScore: string;
  optimizedContent: string;
}

export function getSeoConfig(targetKeyword: string, contentType: string) {
  return {
    systemPrompt: `You are an SEO expert and content optimizer.

Analyze and optimize the provided content for the target keyword: "${targetKeyword}".

Content type: ${contentType || "general web content"}

Return your analysis as JSON with this exact structure:
{
  "title": "Optimized title tag (max 60 chars)",
  "metaDescription": "Optimized meta description (max 160 chars)",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3", ...],
  "keywordDensity": [
    { "keyword": "keyword", "count": 5, "density": "2.5%" }
  ],
  "headingStructure": [
    { "issue": "Missing H1", "suggestion": "Add an H1 tag containing the target keyword" }
  ],
  "readabilityScore": "Fair / Good / Excellent",
  "optimizedContent": "The full optimized version of the content"
}

Guidelines:
- Title: Include target keyword near the beginning, max 60 chars
- Meta description: Include target keyword, include CTA, max 160 chars
- Keyword density: 1-3% ideal, identify over/under optimization
- Heading structure: Should have exactly one H1, logical H2/H3 hierarchy
- Readability: Short paragraphs, transition words, active voice
- Optimized content: Rewrite the full content with SEO improvements applied`,
    userPrompt: (content: string) => content,
    maxTokens: 8000,
    temperature: 0.4,
  };
}
