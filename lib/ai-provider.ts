import OpenAI from "openai";

interface ProviderConfig {
  name: string;
  client: OpenAI;
  model: string;
}

const providers: ProviderConfig[] = [];

if (process.env.GROQ_API_KEY) {
  providers.push({
    name: "groq",
    client: new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
      timeout: 30000,
    }),
    model: "llama-3.3-70b-versatile",
  });
}

if (process.env.OPENROUTER_API_KEY) {
  providers.push({
    name: "openrouter",
    client: new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      timeout: 30000,
    }),
    model: "mistralai/mistral-large",
  });
}

export async function* generateStream(
  systemPrompt: string,
  userPrompt: string,
  opts?: { maxTokens?: number; temperature?: number }
): AsyncGenerator<string, void, undefined> {
  let lastError: Error | null = null;

  for (const provider of providers) {
    try {
      const stream = await provider.client.chat.completions.create({
        model: provider.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_completion_tokens: opts?.maxTokens ?? 4000,
        temperature: opts?.temperature ?? 0.8,
        stream: true,
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content;
        if (delta) yield delta;
      }
      return;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`[${provider.name}] Stream failed:`, lastError.message);
    }
  }

  throw lastError ?? new Error("No AI providers configured");
}

export async function generate(
  systemPrompt: string,
  userPrompt: string,
  opts?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  let full = "";
  for await (const chunk of generateStream(systemPrompt, userPrompt, opts)) {
    full += chunk;
  }
  return full;
}
