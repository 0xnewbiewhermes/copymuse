export type Tone =
  | "casual" | "professional" | "funny" | "motivational"
  | "storytelling" | "witty" | "educational" | "promo" | "custom";

export interface GenerateRequest {
  topic: string;
  tone: Tone;
  customTone?: string;
}

export interface GenerateResult {
  content: string;
  charCount: number;
}

export interface ToolConfig {
  systemPrompt: string;
  userPromptTemplate: (topic: string, tone: Tone, customTone?: string) => string;
  maxTokens: number;
  temperature: number;
}
