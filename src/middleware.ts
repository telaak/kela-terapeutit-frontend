import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

const token = "signIn";
const limit = 5;

const tokenCache = new LRUCache({
  max: 500,
  ttl: 1000 * 60,
});

export async function middleware() {
  const tokenCount = (tokenCache.get(token) as number[]) || [0];
  if (tokenCount[0] === 0) {
    tokenCache.set(token, tokenCount);
  }
  tokenCount[0] += 1;
  const currentUsage = tokenCount[0]!;
  const isRateLimited = currentUsage >= limit;
  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", String(limit));
  response.headers.set(
    "X-RateLimit-Remaining",
    isRateLimited ? "0" : String(limit - currentUsage)
  );
  if (isRateLimited) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }
  return response;
}

export const config = {
  matcher: "/api/auth/signin/:path*",
};
