export type Platform = "instagram" | "twitter" | "tiktok";

const PLATFORM_CONFIG: Record<Platform, { label: string; rules: string; charLimit: number }> = {
  instagram: {
    label: "Instagram",
    rules: "Max 2200 chars. 3-5 relevant hashtags at the end. Use line breaks for readability. Include a CTA (comment/share/save).",
    charLimit: 2200,
  },
  twitter: {
    label: "Twitter/X",
    rules: "MAX 280 CHARS. 1-3 sentences. 1-2 hashtags max. Short and impactful.",
    charLimit: 280,
  },
  tiktok: {
    label: "TikTok",
    rules: "Max 2200 chars. Strong hook in first sentence. Casual language. 3-5 hashtags. Encourage comment/follow.",
    charLimit: 2200,
  },
};

export const PLATFORMS = Object.keys(PLATFORM_CONFIG) as Platform[];

export function getCharLimit(platform: Platform): number {
  return PLATFORM_CONFIG[platform].charLimit;
}

export function getSystemPrompt(platform: Platform, tone: string, customTone?: string): string {
  const rules = PLATFORM_CONFIG[platform];
  const toneGuide = tone === "custom" && customTone ? customTone : TONE_GUIDES[tone] ?? TONE_GUIDES.casual;

  return `You are a professional social media copywriter. Write a ${rules.label} caption from the brief.

${rules.rules}

Tone: ${toneGuide}

Write ONLY the caption. No explanations, no "Here's your caption:", no prefixes.`;
}

const TONE_GUIDES: Record<string, string> = {
  casual: "Casual, friendly, everyday language.",
  professional: "Formal but approachable. Suitable for brands/business.",
  funny: "Funny, entertaining. Punchlines and wordplay welcome.",
  motivational: "Inspiring, uplifting, encouraging.",
  storytelling: "Narrative, builds curiosity from start to finish.",
  witty: "Clever and sharp. Smart wordplay.",
  educational: "Informative, structured, easy to understand.",
  promo: "Strong CTA, urgency, highlight benefits.",
};
