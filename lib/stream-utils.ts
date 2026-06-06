import { NextRequest } from "next/server";

export function createStreamResponse(
  gen: AsyncGenerator<string, void, undefined>,
  req: NextRequest
): Response {
  const encoder = new TextEncoder();
  const abort = new AbortController();
  req.signal.addEventListener("abort", () => abort.abort());

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of gen) {
          if (abort.signal.aborted) break;
          controller.enqueue(encoder.encode(JSON.stringify({ type: "chunk", content: chunk }) + "\n"));
        }
        controller.enqueue(encoder.encode(JSON.stringify({ type: "done" }) + "\n"));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Generation failed";
        controller.enqueue(encoder.encode(JSON.stringify({ type: "error", content: msg }) + "\n"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
