import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/libs/lemonsqueezy";
import { createClient } from "@/libs/supabase/server";
import { cookies } from "next/headers";
import { LEMONSQUEEZY } from "@/config";

export async function POST(req) {
  try {
    // Verify environment variables
    if (!process.env.LEMONSQUEEZY_API_KEY) {
      console.error("[CHECKOUT] LEMONSQUEEZY_API_KEY is not set");
      return NextResponse.json(
        { error: "Payment system configuration error" },
        { status: 500 }
      );
    }

    if (!LEMONSQUEEZY.storeId) {
      console.error("[CHECKOUT] Store ID is not configured");
      return NextResponse.json(
        { error: "Payment system configuration error" },
        { status: 500 }
      );
    }

    const { variantId, success_url, cancel_url, extensionId } = await req.json();

    if (process.env.NODE_ENV === 'development') {
      console.log("[CHECKOUT] Request body:", { 
        variantId,
        storeId: LEMONSQUEEZY.storeId,
        productId: LEMONSQUEEZY.productId,
        extensionId
      });
    }

    // Initialize Supabase client
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Verify user session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check if user already has access
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("has_access")
      .eq("id", session.user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: "Failed to verify access status" },
        { status: 500 }
      );
    }

    if (profile?.has_access) {
      return NextResponse.json(
        { error: "You already have access" },
        { status: 400 }
      );
    }

    // Ensure variantId is provided and valid
    if (!variantId) {
      console.error("[CHECKOUT] Variant ID is not provided");
      return NextResponse.json(
        { error: "Variant ID is required" },
        { status: 400 }
      );
    }

    // Validate that the variantId is one of our valid variants
    const validVariantIds = [LEMONSQUEEZY.hobbyVariantId, LEMONSQUEEZY.proVariantId];
    if (!validVariantIds.includes(Number(variantId))) {
      console.error("[CHECKOUT] Invalid Variant ID:", variantId);
      return NextResponse.json(
        { error: `Invalid Variant ID for product ${LEMONSQUEEZY.productId}` },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(
        "[CHECKOUT] Creating checkout with variantId:",
        variantId,
        "Type:",
        typeof variantId
      );
    }

    const checkoutOptions = {
      storeId: LEMONSQUEEZY.storeId,
      variantId: Number(variantId),
      successUrl: success_url || LEMONSQUEEZY.checkoutSuccess,
      cancelUrl: cancel_url || LEMONSQUEEZY.checkoutCancel,
      checkoutData: {
        email: session.user.email,
        custom: {
          user_id: session.user.id,
          ...(extensionId && { extension_id: extensionId })
        }
      }
    };

    if (process.env.NODE_ENV === 'development') {
      console.log("[CHECKOUT] Creating checkout with options:", checkoutOptions);
    }

    const checkoutUrl = await createCheckoutSession(checkoutOptions);

    if (!checkoutUrl) {
      throw new Error("Failed to create checkout URL");
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("[CHECKOUT] Error creating checkout:", {
      error,
      message: error.message,
      stack: error.stack,
    });

    // Return a more specific error message
    const errorMessage = error.message.includes("LemonSqueezy client not initialized")
      ? "Payment system configuration error. Please try again later."
      : error.message || "Failed to create checkout session";

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
