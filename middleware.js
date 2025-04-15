import { updateSession } from "@/libs/supabase/middleware";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// TEMPORARY CHANGE FOR DEVELOPMENT - RESTORE BEFORE PRODUCTION
// Original routes: ["/api/extension/", "/api/chrome-extension/"]
const PROTECTED_API_ROUTES = [];

// Simple in-memory cache for subscriptions
const subscriptionCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Simple in-memory rate limiting
const rateLimit = new Map();
const WINDOW_MS = 10000; // 10 seconds
const MAX_REQUESTS = 20; // 20 requests per window

function isRateLimited(userId) {
  const now = Date.now();
  const userRequests = rateLimit.get(userId) || [];

  // Remove old requests
  const validRequests = userRequests.filter((time) => now - time < WINDOW_MS);

  if (validRequests.length >= MAX_REQUESTS) {
    return true;
  }

  validRequests.push(now);
  rateLimit.set(userId, validRequests);
  return false;
}

async function getSubscriptionStatus(supabase, userId) {
  const now = Date.now();
  const cached = subscriptionCache.get(userId);

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  subscriptionCache.set(userId, { data, timestamp: now });
  return data;
}

export async function middleware(request) {
  // First update the session
  const response = await updateSession(request);

  // Check if this is a protected API route
  const isProtectedApiRoute = PROTECTED_API_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedApiRoute) {
    // Get auth token from header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify the token and get user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check rate limit
    if (isRateLimited(user.id)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Check subscription status with caching
    const subscription = await getSubscriptionStatus(supabase, user.id);

    if (!subscription) {
      return NextResponse.json(
        {
          error: "Subscription required",
          redirectUrl: "/pricing",
        },
        { status: 403 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
