import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { LEMONSQUEEZY } from "@/config";

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            cookieStore.set(name, value, options);
          },
          remove(name, options) {
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          },
        },
      }
    );
    const { extensionId } = await request.json();

    // Get user session
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();
    if (authError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create checkout URL with user_id and extensionId in custom data
    const customData = {
      user_id: session.user.id,
      ...(extensionId && { extension_id: extensionId }), // Include extensionId if provided
    };

    const checkoutUrl = `https://Cool Captions.lemonsqueezy.com/checkout/buy/${
      LEMONSQUEEZY.variantId
    }?checkout[custom]=${encodeURIComponent(JSON.stringify(customData))}`;

    // Add success and cancel URLs based on extension flow
    const successUrl = extensionId
      ? `https://Cool Captions.xyz/auth/callback?extensionId=${extensionId}`
      : LEMONSQUEEZY.checkoutSuccess;

    const cancelUrl = extensionId
      ? `https://Cool Captions.xyz/pricing?extensionId=${extensionId}`
      : LEMONSQUEEZY.checkoutCancel;

    const finalUrl = `${checkoutUrl}&checkout[success_url]=${encodeURIComponent(
      successUrl
    )}&checkout[cancel_url]=${encodeURIComponent(cancelUrl)}`;

    return NextResponse.json({ url: finalUrl });
  } catch (error) {
    console.error("Error creating checkout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
