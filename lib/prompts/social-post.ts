export type SocialPlatform = "linkedin" | "instagram" | "twitter" | "tiktok";

export const SOCIAL_PLATFORMS: { id: SocialPlatform; label: string; icon: string }[] = [
  { id: "linkedin", label: "LinkedIn", icon: "💼" },
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "twitter", label: "Twitter/X", icon: "🐦" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
];

const PLATFORM_GUIDES: Record<SocialPlatform, { rules: string; charLimit: number }> = {
  linkedin: {
    rules: "Professional but conversational. Max 3000 chars. Use line breaks. End with a question or CTA to encourage comments. 3-5 relevant hashtags. Can include industry insights, personal stories, or thought leadership.",
    charLimit: 3000,
  },
  instagram: {
    rules: "Visual-first. Max 2200 chars. Strong hook in first line. Line breaks for readability. 5-10 relevant hashtags at the end. Emojis welcome. CTA to engage (comment/share/save).",
    charLimit: 2200,
  },
  twitter: {
    rules: "MAX 280 CHARS. 1-3 sentences max. Hook in first 50 chars. 1-2 hashtags max. 1 emoji max. Short, punchy, impactful. Clear CTA if applicable.",
    charLimit: 280,
  },
  tiktok: {
    rules: "Casual and trendy. Max 2200 chars. Hook in first sentence. Emojis and slang welcome. 3-5 hashtags. Encourage duet/comment/follow. Short paragraphs for easy reading.",
    charLimit: 2200,
  },
};

export function getCharLimit(platform: SocialPlatform): number {
  return PLATFORM_GUIDES[platform].charLimit;
}

export function getSocialPostConfig(platform: SocialPlatform, tone: string, customTone?: string) {
  const guide = PLATFORM_GUIDES[platform];
  const toneGuide = tone === "custom" && customTone ? customTone :
    tone === "professional" ? "Professional and polished" :
    tone === "casual" ? "Casual and friendly" :
    tone === "funny" ? "Funny and entertaining" :
    tone === "motivational" ? "Inspiring and uplifting" :
    "Natural and conversational";

  return {
    systemPrompt: `You are a social media content creator. Write a ${platform} post.

Platform rules:
${guide.rules}

Tone: ${toneGuide}

Write ONLY the post content. No explanations, no "Here's your post:", no prefixes.`,
    userPrompt: (topic: string) => topic,
    maxTokens: 3000,
    temperature: 0.8,
  };
}
