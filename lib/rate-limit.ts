import { NextRequest } from "next/server";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW = 60_000;
const DAILY_LIMIT = 200;
const DAILY_WINDOW = 24 * 60 * 60_000;

function getClientIp(req: NextRequest): string {
  const ip = req.headers.get("x-real-ip")
    ?? req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (ip) return ip;
  const ua = req.headers.get("user-agent") || "no-ua";
  return `anon:${ua}`;
}

export function checkRateLimit(req: NextRequest): {
  allowed: boolean;
  status: number;
  message: string;
} {
  const key = getClientIp(req);
  const now = Date.now();

  if (rateLimitMap.size > 500) {
    for (const [k, v] of rateLimitMap) {
      if (now > v.resetAt) rateLimitMap.delete(k);
    }
  }

  const shortKey = `rate:${key}`;
  const dailyKey = `daily:${key}`;

  const rateEntry = rateLimitMap.get(shortKey);
  if (rateEntry && now <= rateEntry.resetAt) {
    if (rateEntry.count >= RATE_LIMIT) {
      return { allowed: false, status: 429, message: "Too fast. Try again in a minute." };
    }
    rateEntry.count++;
  } else {
    rateLimitMap.set(shortKey, { count: 1, resetAt: now + RATE_WINDOW });
  }

  const dailyEntry = rateLimitMap.get(dailyKey);
  if (dailyEntry && now <= dailyEntry.resetAt) {
    if (dailyEntry.count >= DAILY_LIMIT) {
      return { allowed: false, status: 403, message: "Daily limit reached (200 generations). Try again tomorrow." };
    }
    dailyEntry.count++;
  } else {
    rateLimitMap.set(dailyKey, { count: 1, resetAt: now + DAILY_WINDOW });
  }

  return { allowed: true, status: 200, message: "" };
}
