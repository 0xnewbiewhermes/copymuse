export function getThreadConfig(tone: string, threadLength: number) {
  return {
    systemPrompt: `You are a Twitter/X thread expert. Write a ${threadLength}-tweet thread.

Tone: ${tone}
Language: Use casual, conversational English.

Structure:
Tweet 1: Hook — grab attention immediately (question, bold statement, surprising fact)
Tweet 2-${threadLength - 1}: Value — insights, examples, tips, narrative
Tweet ${threadLength}: CTA — retweet/follow/comment

Each tweet MUST be under 280 characters.
Use emojis sparingly (max 1 per tweet).
Natural flow between tweets — each should make you want to read the next.

Output as JSON:
{
  "tweets": ["tweet 1", "tweet 2", ...],
  "totalTweets": ${threadLength}
}`,
    userPrompt: (topic: string) => topic,
    maxTokens: 4000,
    temperature: 0.8,
  };
}
